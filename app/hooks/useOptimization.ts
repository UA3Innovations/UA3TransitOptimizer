// hooks/useOptimization.ts (Updated)
import { useState } from 'react';
import { Alert } from 'react-native';
import { APIService } from '../services/api';
import { Metrics, OptimizationState, SimulationState, UploadedFile } from '../types/app';

export const useOptimization = (
  uploadedFiles: UploadedFile[],
  simulation: SimulationState,
  setMetrics: (metrics: Metrics | ((prev: Metrics) => Metrics)) => void
) => {
  const [optimization, setOptimization] = useState<OptimizationState>({
    isRunning: false,
    progress: 0,
    generation: 0,
    populationSize: '20',
    maxGenerations: '30',
    mutationRate: 0.05,
    crossoverRate: 0.8,
    eliteSize: '2',
    fitnessHistory: []
  });

  const startOptimization = async () => {
    if (optimization.isRunning) return;
    
    // Data availability check
    const hasRealData = uploadedFiles.length > 0;
    const hasSimulationData = simulation.results && simulation.results.totalPassengers > 0;
    
    if (!hasRealData && !hasSimulationData) {
      Alert.alert(
        'No Data Available', 
        'Please run simulation first or upload real data to start genetic algorithm optimization.'
      );
      return;
    }

    setOptimization(prev => ({ 
      ...prev, 
      isRunning: true, 
      progress: 0, 
      generation: 0,
      fitnessHistory: []
    }));
    
    try {
      console.log('Starting genetic algorithm optimization...');
      
      // API'ye istek gönder
      const result = await APIService.runGeneticOptimization({
        population_size: parseInt(optimization.populationSize),
        max_generations: parseInt(optimization.maxGenerations),
        mutation_rate: optimization.mutationRate,
        crossover_rate: optimization.crossoverRate,
        data_source: hasRealData ? 'uploaded_data' : 'simulation_data'
      });

      if (result.status === 'started') {
        Alert.alert('Started! 🧬', 'Genetic Algorithm başlatıldı ve arka planda çalışıyor!');
        
        // GA durumunu periyodik olarak kontrol et
        const checkInterval = setInterval(async () => {
          try {
            const statusResult = await APIService.getGeneticAlgorithmStatus();
            console.log('GA Status check:', statusResult);
            
            if (!statusResult.is_running && statusResult.last_result) {
              clearInterval(checkInterval);
              
              if (statusResult.last_result.status === 'completed') {
                // GA tamamlandı, sonuçları al
                const finalResult = statusResult.last_result;
                
                setOptimization(prev => ({
                  ...prev,
                  progress: 100,
                  generation: finalResult.max_generations,
                  isRunning: false,
                  fitnessHistory: [...prev.fitnessHistory, finalResult.final_fitness]
                }));
                
                // Metrikleri güncelle (iyileştirmeler)
                if (finalResult.improvements) {
                  setMetrics(prev => ({
                    ...prev,
                    avgWaitTime: parseFloat((prev.avgWaitTime * (1 - finalResult.improvements.wait_time_reduction / 100)).toFixed(1)),
                    onTimePerf: parseFloat(Math.min(98, prev.onTimePerf * (1 + finalResult.improvements.route_efficiency / 100)).toFixed(1)),
                    occupancyRate: parseFloat(Math.min(95, prev.occupancyRate * 1.08).toFixed(1))
                  }));
                }
                
                Alert.alert(
                  'Completed! 🎉', 
                  `Genetic Algorithm tamamlandı!\n\n` +
                  `🧬 Final Fitness: ${finalResult.final_fitness.toFixed(3)}\n` +
                  `📈 Route Efficiency: +${finalResult.improvements?.route_efficiency?.toFixed(1)}%\n` +
                  `⏱️ Wait Time: -${finalResult.improvements?.wait_time_reduction?.toFixed(1)}%\n` +
                  `😊 Satisfaction: +${finalResult.improvements?.passenger_satisfaction?.toFixed(1)}%`
                );
              } else {
                // GA başarısız
                setOptimization(prev => ({ ...prev, isRunning: false, progress: 0 }));
                Alert.alert('Error', `Genetic Algorithm başarısız: ${statusResult.last_result.error || 'Bilinmeyen hata'}`);
              }
            } else if (statusResult.current_ga) {
              // Hala çalışıyor, progress güncelle
              const currentGA = statusResult.current_ga;
              setOptimization(prev => ({ 
                ...prev, 
                progress: currentGA.progress || Math.min(prev.progress + 5, 95),
                generation: currentGA.current_generation || prev.generation,
                fitnessHistory: currentGA.current_fitness 
                  ? [...prev.fitnessHistory.slice(-19), currentGA.current_fitness]
                  : prev.fitnessHistory
              }));
            }
          } catch (error) {
            console.error('GA Status check error:', error);
          }
        }, 2000); // Her 2 saniyede bir kontrol et
        
      } else {
        Alert.alert('Error', 'Genetic Algorithm başlatılamadı');
        setOptimization(prev => ({ ...prev, isRunning: false, progress: 0 }));
      }

    } catch (error) {
      console.error('Genetic Algorithm error:', error);
      
      let errorMessage = 'Genetic Algorithm başarısız oldu.';
      
      if (error instanceof Error) {
        if (error.message.includes('400')) {
          errorMessage = 'Önce simulasyon çalıştırın veya veri yükleyin.';
        } else if (error.message.includes('500')) {
          errorMessage = 'Sunucu hatası. Lütfen tekrar deneyin.';
        } else if (error.message.includes('network')) {
          errorMessage = 'Bağlantı hatası. İnternet bağlantınızı kontrol edin.';
        } else {
          errorMessage = `Hata: ${error.message}`;
        }
      }
      
      Alert.alert('Error', errorMessage);
      setOptimization(prev => ({ ...prev, isRunning: false, progress: 0 }));
    }
  };

  return {
    optimization,
    setOptimization,
    startOptimization
  };
};