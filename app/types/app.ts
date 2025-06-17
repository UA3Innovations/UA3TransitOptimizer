// types/app.ts
export interface Metrics {
  avgWaitTime: number;
  occupancyRate: number;
  onTimePerf: number;
  overcrowdingRate: number;
}

export interface AIProcess {
  stage: 'idle' | 'data-processing' | 'training' | 'optimizing' | 'completed';
  progress: number;
  currentStep: string;
  estimatedTime: string;
}

export interface UploadedFile {
  name: string;
  size: string;
  type: string;
  uri: string;
  rows?: number;
  uploadTime: string;
}

export interface OptimizationState {
  isRunning: boolean;
  progress: number;
  generation: number;
  populationSize: string;
  maxGenerations: string;
  mutationRate: number;
  crossoverRate: number;
  eliteSize: string;
  fitnessHistory: number[];
}

export interface ForecastingState {
  prophetRunning: boolean;
  lstmRunning: boolean;
  prophetAccuracy: number;
  lstmAccuracy: number;
  selectedModel: string;
  forecastDays: string;
  results: {
    nextWeekPassengers: number;
    peakHour: string;
    busiestRoute: string;
    improvement: number;
  };
}
export interface SimulationState {
  isRunning: boolean;
  startDate?: string;  // Yeni eklenen
  endDate?: string;    // Yeni eklenen
  duration: string;    // Eski - opsiyonel tutabilirsiniz
  timeStep: string;    // Eski - opsiyonel tutabilirsiniz
  results: {
    totalPassengers: number;
    busAssignments: number;
    stopUtilization: string;
    maxOccupancy: number;
  };
  progress: number;
}
export interface ReportsState {
  isGenerating: boolean;
  selectedPeriod: string;
  selectedMetrics: string[];
  chartData: {
    daily: Array<{
      name: string;
      waitTime: number;
      occupancy: number;
      onTime: number;
    }>;
    heatmapData: Array<{
      hour: number;
      day: string;
      value: number;
    }>;
    routeAnalysis: Array<{
      route: string;
      passengers: number;
      efficiency: number;
      revenue: number;
    }>;
  };
}

export interface ModalState {
  notifications: boolean;
  fileUpload: boolean;
  dataViewer: boolean;
}