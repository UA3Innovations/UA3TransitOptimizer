// hooks/useAIProcess.ts
import { useState } from 'react';
import { Alert } from 'react-native';
import { APIService } from '../services/api';
import { AIProcess, Metrics, UploadedFile } from '../types/app';

export const useAIProcess = (
  uploadedFiles: UploadedFile[], 
  setMetrics: (metrics: Metrics | ((prev: Metrics) => Metrics)) => void
) => {
  const [aiProcess, setAIProcess] = useState<AIProcess>({
    stage: 'idle',
    progress: 0,
    currentStep: 'Ready to start',
    estimatedTime: '0 min'
  });

  // Start AI Process with Python API integration
  const startAIProcess = async () => {
    if (uploadedFiles.length === 0) {
      Alert.alert('Warning', 'Please upload data files first');
      return;
    }

    // Stage 1: Başlangıç
    setAIProcess({ 
      stage: 'data-processing', 
      progress: 25, 
      currentStep: 'Connecting to Python AI...', 
      estimatedTime: '3 min' 
    });

    try {
      // Stage 2: Python API'ye bağlanma
      setAIProcess({ 
        stage: 'training', 
        progress: 50, 
        currentStep: 'Sending data to Python...', 
        estimatedTime: '2 min' 
      });

      // Stage 3: API çağrısı
      setAIProcess({ 
        stage: 'optimizing', 
        progress: 75, 
        currentStep: 'Python AI processing...', 
        estimatedTime: '1 min' 
      });

      // Python API'ye gerçek istek gönder
      const result = await APIService.runAIOptimization(uploadedFiles.length);
      
      if (result.success) {
        // Stage 4: Tamamlandı
        setAIProcess({
          stage: 'completed',
          progress: 100,
          currentStep: 'AI optimization completed!',
          estimatedTime: '0 min'
        });

        // Metrikleri Python'dan gelen verilerle güncelle
        setMetrics(result.new_metrics);
        
        Alert.alert(
          'Success! 🎉', 
          `AI optimization completed!\n` +
          `• Wait time reduced by ${result.improvements.wait_time_reduction}%\n` +
          `• Efficiency gained ${result.improvements.efficiency_gain}%\n` +
          `• Processed ${result.processed_files} files`
        );
      } else {
        throw new Error('API returned error');
      }

    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Failed to connect to Python API. Make sure the server is running.');
      
      // Hata durumunda idle'a dön
      setAIProcess({ 
        stage: 'idle', 
        progress: 0, 
        currentStep: 'Ready to start', 
        estimatedTime: '0 min' 
      });
    }
  };

  return {
    aiProcess,
    startAIProcess
  };
};