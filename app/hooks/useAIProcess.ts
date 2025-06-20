// hooks/useAIProcess.ts - Pipeline'ı entegre edin
import { Alert } from 'react-native';
import { AIProcess, Metrics, UploadedFile } from '../types/app';
import { usePipeline } from './usePipeline';

export const useAIProcess = (
  uploadedFiles: UploadedFile[], 
  setMetrics: (metrics: Metrics | ((prev: Metrics) => Metrics)) => void
) => {
  // Pipeline hook'unu kullan
  const {
    pipeline,
    pipelineConfig,
    setPipelineConfig,
    startCompletePipeline,
    stopPipeline,
    resetPipeline,
  } = usePipeline(uploadedFiles, setMetrics);

  // Eski AI Process state'ini pipeline state'ine map et
  const aiProcess: AIProcess = {
    stage: pipeline.status === 'idle' ? 'idle' :
           pipeline.status === 'running' ? 'training' :
           pipeline.status === 'completed' ? 'completed' : 'idle',
    progress: pipeline.progress,
    currentStep: pipeline.currentStep,
    estimatedTime: pipeline.estimatedTime
  };

  // AI Process'i pipeline ile değiştir
  const startAIProcess = async () => {
    if (uploadedFiles.length === 0) {
      Alert.alert('Warning', 'Please upload data files first');
      return;
    }

    // Kullanıcıya seçenek sun
    Alert.alert(
      '🚀 Choose Optimization Type',
      'Select the type of optimization to run:',
      [
        {
        },
        {
          text: '🎯 Full Pipeline (15-20 min)',
          onPress: () => startCompletePipeline()
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  return {
    aiProcess,
    startAIProcess,
    // Pipeline metodlarını da expose et
    pipeline,
    pipelineConfig,
    setPipelineConfig,
    startCompletePipeline,
    stopPipeline,
    resetPipeline,
  };
};
