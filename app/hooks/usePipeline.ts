// hooks/usePipeline.ts - React Native timer type ile
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { APIService } from '../services/api';
import { Metrics, PipelineConfig, PipelineState, UploadedFile } from '../types/app';

export const usePipeline = (
  uploadedFiles: UploadedFile[],
  setMetrics: (metrics: Metrics | ((prev: Metrics) => Metrics)) => void
) => {
  const [pipeline, setPipeline] = useState<PipelineState>({
    isRunning: false,
    progress: 0,
    currentStep: 'Ready to start complete optimization',
    status: 'idle',
    estimatedTime: '0 min'
  });

  const [pipelineConfig, setPipelineConfig] = useState<PipelineConfig>({
    start_date: '2025-06-02',
    end_date: '2025-06-09',
    population_size: 25,
    generations: 35,
    hybrid_epochs: 60,
  });

  // ✅ React Native için daha güvenli timer type
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (pipeline.isRunning) {
      interval = setInterval(async () => {
        try {
          const status = await APIService.getPipelineStatus();
          
          if (status.is_running && status.current_pipeline) {
            const currentPipeline = status.current_pipeline;
            setPipeline(prev => ({
              ...prev,
              progress: currentPipeline.progress || 0,
              currentStep: currentPipeline.current_step || 'Processing...',
              estimatedTime: calculateEstimatedTime(currentPipeline.progress)
            }));
          } else if (status.last_result) {
            // Pipeline tamamlandı
            const result = status.last_result;
            setPipeline(prev => ({
              ...prev,
              isRunning: false,
              status: result.status === 'completed' ? 'completed' : 'error',
              progress: 100,
              currentStep: result.status === 'completed' ? 'All steps completed!' : 'Pipeline failed',
              completedAt: result.completed_at,
              results: result,
              error: result.error,
              estimatedTime: '0 min'
            }));

            // Başarılı ise metrikleri güncelle
            if (result.status === 'completed') {
              updateMetricsFromPipelineResults(result);
            }
          }
        } catch (error) {
          console.error('Pipeline status check error:', error);
        }
      }, 2000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [pipeline.isRunning]);

  const calculateEstimatedTime = (progress: number): string => {
    if (progress >= 100) return '0 min';
    if (progress <= 0) return '15-20 min';
    
    const totalMinutes = 18;
    const remainingProgress = 100 - progress;
    const remainingTime = Math.round((remainingProgress / 100) * totalMinutes);
    
    return remainingTime > 1 ? `${remainingTime} min` : '< 1 min';
  };

  const updateMetricsFromPipelineResults = (results: any) => {
    setMetrics(prev => ({
      ...prev,
      avgWaitTime: Math.max(0, prev.avgWaitTime * 0.85),
      occupancyRate: Math.min(100, prev.occupancyRate * 1.12),
      onTimePerf: Math.min(100, prev.onTimePerf * 1.08),
      overcrowdingRate: Math.max(0, prev.overcrowdingRate * 0.6),
    }));
  };

  const startCompletePipeline = async (customConfig?: Partial<PipelineConfig>) => {
    if (uploadedFiles.length === 0) {
      Alert.alert('Warning', 'Please upload data files first');
      return;
    }

    const config = { ...pipelineConfig, ...customConfig };

    try {
      setPipeline(prev => ({
        ...prev,
        isRunning: true,
        status: 'running',
        progress: 0,
        currentStep: 'Initializing complete pipeline...',
        startedAt: new Date().toISOString(),
        config: config,
        error: undefined,
        results: undefined
      }));

      const result = await APIService.runCompletePipeline(config);
      
      if (result.status === 'started') {
        setPipeline(prev => ({
          ...prev,
          pipelineId: result.pipeline_id,
          currentStep: 'Pipeline started successfully',
          progress: 5
        }));
      } else {
        throw new Error('Pipeline start failed');
      }

    } catch (error) {
      console.error('Pipeline start error:', error);
      setPipeline(prev => ({
        ...prev,
        isRunning: false,
        status: 'error',
        currentStep: 'Failed to start pipeline',
        error: error instanceof Error ? error.message : 'Unknown error',
        estimatedTime: '0 min'
      }));

      Alert.alert(
        'Error',
        'Failed to start complete pipeline. Make sure the server is running and try again.'
      );
    }
  };

  const stopPipeline = async () => {
    try {
      await APIService.stopPipeline();
      setPipeline(prev => ({
        ...prev,
        isRunning: false,
        status: 'cancelled',
        currentStep: 'Pipeline cancelled by user',
        estimatedTime: '0 min'
      }));
      Alert.alert('Pipeline Stopped', 'The optimization pipeline has been cancelled.');
    } catch (error) {
      console.error('Stop pipeline error:', error);
      Alert.alert('Error', 'Failed to stop pipeline');
    }
  };

  const resetPipeline = async () => {
    try {
      await APIService.resetPipeline();
      setPipeline({
        isRunning: false,
        progress: 0,
        currentStep: 'Ready to start complete optimization',
        status: 'idle',
        estimatedTime: '0 min'
      });
    } catch (error) {
      console.error('Reset pipeline error:', error);
    }
  };

  return {
    pipeline,
    pipelineConfig,
    setPipelineConfig,
    startCompletePipeline,
    stopPipeline,
    resetPipeline,
  };
};