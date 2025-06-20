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



// Simulasyon sonuçları için ayrı interface
export interface SimulationResults {
  totalPassengers: number;
  busAssignments: number;
  stopUtilization: string;
  maxOccupancy: number;
  totalBoardings?: number;
  totalAlightings?: number;
  overcrowdedInstances?: number;
  overcrowdingPercentage?: number;
  severeOvercrowding?: number;
  severeOvercrowdingPercentage?: number;
}

// Simulasyon state'i için güncellenmiş interface
export interface SimulationState {
  isRunning: boolean;
  startDate: string;
  endDate: string;
  duration: string;
  timeStep: string;
  progress: number;
  results: SimulationResults; // Sonuçlar ayrı interface'de
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
  fileUpload: boolean;
  dataViewer: boolean;
}

export interface PipelineState {
  isRunning: boolean;
  progress: number;
  currentStep: string;
  pipelineId?: number;
  status: 'idle' | 'running' | 'completed' | 'error' | 'cancelled';
  startedAt?: string;
  completedAt?: string;
  error?: string;
  config?: PipelineConfig;
  results?: PipelineResults;
  estimatedTime: string;
}

export interface PipelineConfig {
  start_date: string;
  end_date: string;
  population_size: number;
  generations: number;
  hybrid_epochs: number;
}

export interface PipelineResults {
  pipeline_id: number;
  status: string;
  successful_steps: number;
  total_steps: number;
  step_results: {
    simulation?: any;
    genetic_algorithm?: any;
    passenger_flow_generation?: any;
    hybrid_model?: any;
    evaluation?: any;
  };
  final_outputs: {
    simulation_data?: string;
    optimized_schedule?: string;
    optimized_passenger_flow?: string;
    hybrid_predictions?: string;
    evaluation_report?: string;
  };
}
// types/app.ts - Güncellenmiş ForecastingState ve yeni HybridModelState

export interface HybridModelState {
  isRunning: boolean;
  progress: number;
  currentStep: string;
  hybridId?: number;
  status: 'idle' | 'running' | 'completed' | 'error' | 'timeout';
  startedAt?: string;
  completedAt?: string;
  error?: string;
  config?: HybridModelConfig;
  results?: HybridModelResults;
  estimatedDuration: string;
}

export interface HybridModelConfig {
  historical_file: string;
  future_file: string;
  stops_file: string;
  sequence_length: number;
  epochs: number;
  save_models: boolean;
  load_pretrained: boolean;
  enable_route_adjustments: boolean;
  enable_realistic_constraints: boolean;
  enable_night_constraints: boolean;
  timeout: number;
}

export interface HybridModelResults {
  hybrid_id: number;
  status: string;
  completed_at: string;
  output_dir: string;
  config: HybridModelConfig;
  files: {
    prediction_file: string;
    final_prediction_file: string;
    model_dir: string;
    output_dir: string;
  };
  stats: {
    total_records: number;
    unique_trips: number;
    unique_buses: number;
    lines_covered: number;
    date_range: {
      start: string;
      end: string;
    };
  };
  stdout: string;
  command: string;
}

// Güncellenmiş ForecastingState
export interface ForecastingState {
  hybridRunning: boolean;
  hybridAccuracy: number;
  forecastDays: string;
  hybridModel: HybridModelState; // Yeni eklenen
  results: {
    nextWeekPassengers: number;
    peakHour: string;
    busiestRoute: string;
    improvement: number;
  };
}