// hooks/useOptimization.ts
import { useState } from 'react';
import { Alert } from 'react-native';
import { APIService } from '../services/api';
import { Metrics, OptimizationState, UploadedFile } from '../types/app';

export const useOptimization = (
  uploadedFiles: UploadedFile[],
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
    if (uploadedFiles.length === 0) {
      Alert.alert('Warning', 'Please upload data files first');
      return;
    }

    setOptimization(prev => ({ ...prev, isRunning: true, progress: 0, generation: 0 }));
    
    try {
      // Python API'ye istek gönder
      const result = await APIService.runGeneticOptimization({
        population_size: parseInt(optimization.populationSize),
        max_generations: parseInt(optimization.maxGenerations),
        mutation_rate: optimization.mutationRate,
        crossover_rate: optimization.crossoverRate
      });

      if (result.success) {
        setOptimization(prev => ({
          ...prev,
          isRunning: false,
          progress: 100,
          generation: result.generations_completed,
          fitnessHistory: [...prev.fitnessHistory, result.best_fitness]
        }));

        // Metrikleri güncelle
        setMetrics(prev => ({
          ...prev,
          avgWaitTime: parseFloat((prev.avgWaitTime * 0.82).toFixed(1)),
          onTimePerf: parseFloat(Math.min(98, prev.onTimePerf * 1.08).toFixed(1))
        }));

        Alert.alert(
          'Success! 🧬', 
          `Genetic Algorithm completed!\n• Best fitness: ${result.best_fitness}\n• Route efficiency: +${result.improvements.route_efficiency}%`
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to Genetic Algorithm API');
      setOptimization(prev => ({ ...prev, isRunning: false }));
    }
  };

  return {
    optimization,
    setOptimization,
    startOptimization
  };
};