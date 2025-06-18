// hooks/useSimulation.ts
import { useState } from 'react';
import { Alert } from 'react-native';
import { APIService } from '../services/api';
import { SimulationState, UploadedFile } from '../types/app';

export const useSimulation = (uploadedFiles: UploadedFile[]) => {
  const [simulation, setSimulation] = useState<SimulationState>({
    isRunning: false,
    startDate: '2024-01-01',  // ✅ YYYY-MM-DD formatında varsayılan değer
    endDate: '2024-01-07',    // ✅ YYYY-MM-DD formatında varsayılan değer
    duration: '7',
    timeStep: '5',
    results: {
      totalPassengers: 0,
      busAssignments: 0,
      stopUtilization: '0%',
      maxOccupancy: 0,
    },
    progress: 0,
  });

  const runSimulation = async () => {
    // Simülasyon durumunu güncelle
    setSimulation(prev => ({ ...prev, isRunning: true, progress: 0 }));

    try {
      console.log('Sending simulation request:', { 
        startDate: simulation.startDate, 
        endDate: simulation.endDate 
      });

      // API'ye doğrudan YYYY-MM-DD formatında gönder
      const result = await APIService.runSimulation(simulation.startDate, simulation.endDate);

      console.log('Simulation API response:', result);

      if (result.status === 'started') {
        Alert.alert('Başarılı', 'Simülasyon başlatıldı ve arka planda çalışıyor!');
        
        // Simulasyon durumunu periyodik olarak kontrol et
        const checkInterval = setInterval(async () => {
          try {
            const statusResult = await APIService.getSimulationStatus();
            console.log('Status check:', statusResult);
            
            if (!statusResult.is_running && statusResult.last_result) {
              clearInterval(checkInterval);
              
              if (statusResult.last_result.status === 'completed') {
                // Simulasyon tamamlandı, sonuçları al
                const finalResults = statusResult.last_result.frontend_results || {
                  totalPassengers: 0,
                  busAssignments: 0,
                  stopUtilization: "0%",
                  maxOccupancy: 0
                };
                
                setSimulation(prev => ({
                  ...prev,
                  progress: 100,
                  isRunning: false,
                  results: finalResults
                }));
                
                Alert.alert('Tamamlandı!', 
                  `Simülasyon başarıyla tamamlandı!\n\n` +
                  `📊 Toplam Yolcu: ${finalResults.totalPassengers}\n` +
                  `🚌 Toplam Biniş: ${finalResults.totalBoardings}\n` +
                  `📈 Aşırı Doluluk: ${finalResults.overcrowdingPercentage}%`
                );
              } else {
                // Simulasyon başarısız
                setSimulation(prev => ({ ...prev, isRunning: false, progress: 0 }));
                Alert.alert('Hata', `Simülasyon başarısız: ${statusResult.last_result.error || 'Bilinmeyen hata'}`);
              }
            } else {
              // Hala çalışıyor, progress güncelle
              setSimulation(prev => ({ 
                ...prev, 
                progress: Math.min(prev.progress + 15, 95) // Yavaşça artır
              }));
            }
          } catch (error) {
            console.error('Status check error:', error);
          }
        }, 2000); // Her 2 saniyede bir kontrol et
        
      } else {
        Alert.alert('Hata', 'Simülasyon başlatılamadı');
        setSimulation(prev => ({ ...prev, isRunning: false, progress: 0 }));
      }

    } catch (error) {
      console.error('Simulation error:', error);
      
      let errorMessage = 'Simülasyon başarısız oldu.';
      
      if (error instanceof Error) {
        if (error.message.includes('400')) {
          errorMessage = 'Tarih formatı hatalı. YYYY-MM-DD formatını kullanın.';
        } else if (error.message.includes('500')) {
          errorMessage = 'Sunucu hatası. Lütfen tekrar deneyin.';
        } else if (error.message.includes('network')) {
          errorMessage = 'Bağlantı hatası. İnternet bağlantınızı kontrol edin.';
        } else {
          errorMessage = `Hata: ${error.message}`;
        }
      }
      
      Alert.alert('Hata', errorMessage);
      setSimulation(prev => ({ ...prev, isRunning: false, progress: 0 }));
    }
  };

  return {
    simulation,
    setSimulation,
    runSimulation,
  };
};