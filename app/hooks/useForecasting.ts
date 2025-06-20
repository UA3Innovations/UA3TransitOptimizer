// hooks/useForecasting.ts (Updated with real hybrid model integration)
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { APIService } from '../services/api';
import { ForecastingState, SimulationState, UploadedFile } from '../types/app';

export const useForecasting = (uploadedFiles: UploadedFile[], simulation?: SimulationState) => {
  const [forecasting, setForecasting] = useState<ForecastingState>({
    hybridRunning: false,
    hybridAccuracy: 0,
    forecastDays: '7',
    hybridModel: {
      isRunning: false,
      progress: 0,
      currentStep: 'Ready',
      status: 'idle',
      estimatedDuration: '30 minutes'
    },
    results: {
      nextWeekPassengers: 2847293,
      peakHour: '08:00-09:00',
      busiestRoute: '101 Kızılay-Çankaya',
      improvement: 12.4
    }
  });

  // Hybrid model durumunu kontrol etmek için polling
  useEffect(() => {
    let pollInterval: ReturnType<typeof setInterval>;

    if (forecasting.hybridModel.isRunning) {
      pollInterval = setInterval(async () => {
        try {
          const status = await APIService.getHybridModelStatus();
          
          if (status.is_running && status.current_hybrid) {
            // Çalışıyor - progress güncelle
            setForecasting(prev => ({
              ...prev,
              hybridModel: {
                ...prev.hybridModel,
                progress: status.current_hybrid.progress || 0,
                currentStep: status.current_hybrid.current_step || 'Processing...'
              }
            }));
          } else if (!status.is_running && status.last_result) {
            // Tamamlandı - sonuçları güncelle
            const result = status.last_result;
            
            setForecasting(prev => ({
              ...prev,
              hybridRunning: false,
              hybridModel: {
                ...prev.hybridModel,
                isRunning: false,
                progress: 100,
                currentStep: 'Completed',
                status: result.status,
                completedAt: result.completed_at,
                results: result.status === 'completed' ? result : undefined,
                error: result.status === 'error' ? result.error : undefined
              },
              hybridAccuracy: result.status === 'completed' ? 92.5 : 0 // Mock accuracy
            }));

            if (result.status === 'completed') {
              Alert.alert('Success 🚀', 'Hybrid model completed successfully!');
            } else if (result.status === 'error') {
              Alert.alert('Error ❌', `Hybrid model failed: ${result.error}`);
            } else if (result.status === 'timeout') {
              Alert.alert('Timeout ⏰', 'Hybrid model timed out. Please try again.');
            }

            clearInterval(pollInterval);
          }
        } catch (error) {
          console.error('Status polling error:', error);
          // Hata durumunda polling'i durdur
          clearInterval(pollInterval);
          setForecasting(prev => ({
            ...prev,
            hybridRunning: false,
            hybridModel: {
              ...prev.hybridModel,
              isRunning: false,
              status: 'error',
              error: 'Failed to check status'
            }
          }));
        }
      }, 3000); // Her 3 saniyede bir kontrol et
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [forecasting.hybridModel.isRunning]);

  const runHybridModel = async (customConfig?: any) => {
    const hasRealData = uploadedFiles.length > 0;
    const hasSimulationData = simulation?.results && simulation.results.totalPassengers > 0;

    if (!hasRealData && !hasSimulationData) {
      Alert.alert('No Data Available', 'Please run simulation or upload real data to start hybrid forecasting.');
      return;
    }

    // Önceki çalışan modeli durdur (varsa)
    if (forecasting.hybridModel.isRunning) {
      try {
        await APIService.stopHybridModel();
      } catch (error) {
        console.warn('Failed to stop previous hybrid model:', error);
      }
    }

    setForecasting(prev => ({ 
      ...prev, 
      hybridRunning: true,
      hybridModel: {
        ...prev.hybridModel,
        isRunning: true,
        progress: 0,
        currentStep: 'Starting...',
        status: 'running',
        startedAt: new Date().toISOString(),
        error: undefined
      }
    }));

    try {
      // Hybrid model konfigürasyonu
      const config = {
        historical_file: customConfig?.historical_file || 'output/passenger_flow_results.csv',
        future_file: customConfig?.future_file || 'ga_optimization_output/ga_optimized_passenger_flow.csv',
        stops_file: customConfig?.stops_file || 'ankara_bus_stops_10.csv',
        sequence_length: customConfig?.sequence_length || 48,
        epochs: customConfig?.epochs || 60,
        save_models: customConfig?.save_models ?? true,
        load_pretrained: customConfig?.load_pretrained ?? false,
        enable_route_adjustments: customConfig?.enable_route_adjustments ?? true,
        enable_realistic_constraints: customConfig?.enable_realistic_constraints ?? true,
        enable_night_constraints: customConfig?.enable_night_constraints ?? true,
        timeout: customConfig?.timeout || 1800
      };

      const result = await APIService.runHybridForecast(config);
      
      if (result.success) {
        // Başarıyla başlatıldı - polling ile takip edilecek
        setForecasting(prev => ({
          ...prev,
          hybridModel: {
            ...prev.hybridModel,
            hybridId: result.hybrid_id,
            config: result.config,
            currentStep: 'Model started successfully'
          }
        }));
        
        Alert.alert('Started 🚀', 'Hybrid model started successfully. Progress will be tracked automatically.');
      } else {
        throw new Error(result.error || 'Hybrid model failed to start');
      }
    } catch (err: any) {
      console.error('Hybrid model error:', err);
      Alert.alert('Error', `Failed to run hybrid model: ${err.message}`);
      
      setForecasting(prev => ({ 
        ...prev, 
        hybridRunning: false,
        hybridModel: {
          ...prev.hybridModel,
          isRunning: false,
          status: 'error',
          error: err.message,
          completedAt: new Date().toISOString()
        }
      }));
    }
  };

  const stopHybridModel = async () => {
    try {
      await APIService.stopHybridModel();
      setForecasting(prev => ({
        ...prev,
        hybridRunning: false,
        hybridModel: {
          ...prev.hybridModel,
          isRunning: false,
          status: 'idle',
          currentStep: 'Stopped by user',
          completedAt: new Date().toISOString()
        }
      }));
      Alert.alert('Stopped', 'Hybrid model stopped successfully.');
    } catch (error: any) {
      console.error('Stop hybrid model error:', error);
      Alert.alert('Error', `Failed to stop hybrid model: ${error.message}`);
    }
  };

  const resetHybridModel = async () => {
    try {
      await APIService.resetHybridModel();
      setForecasting(prev => ({
        ...prev,
        hybridRunning: false,
        hybridAccuracy: 0,
        hybridModel: {
          isRunning: false,
          progress: 0,
          currentStep: 'Ready',
          status: 'idle',
          estimatedDuration: '30 minutes'
        }
      }));
      Alert.alert('Reset', 'Hybrid model status reset successfully.');
    } catch (error: any) {
      console.error('Reset hybrid model error:', error);
      Alert.alert('Error', `Failed to reset hybrid model: ${error.message}`);
    }
  };

  return {
    forecasting,
    setForecasting,
    runHybridModel,
    stopHybridModel,
    resetHybridModel
  };
};