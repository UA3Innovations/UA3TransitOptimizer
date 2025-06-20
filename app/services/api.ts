// services/api.ts
const API_BASE_URL = "http://localhost:5000"; // ✅ Flask API URL'i

export class APIService {
  static async testConnection() {
    try {
      const response = await fetch(`${API_BASE_URL}/test`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Connection test failed:', error);
      throw error;
    }
  }

  static async runSimulation(startDate: string, endDate: string) {
    try {
      console.log('Sending simulation request:', { startDate, endDate });
      
      const response = await fetch(`${API_BASE_URL}/simulation/start`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          start_date: startDate,  // ✅ YYYY-MM-DD formatında
          end_date: endDate       // ✅ YYYY-MM-DD formatında
        })
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Simulation result:', result);
      return result;
      
    } catch (error) {
      console.error('Simulation request failed:', error);
      throw error;
    }
  }

  static async getSimulationStatus() {
    try {
      const response = await fetch(`${API_BASE_URL}/simulation/status`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Status check failed:', error);
      throw error;
    }
  }

  static async getSimulationResults(simulationId: number) {
    try {
      const response = await fetch(`${API_BASE_URL}/simulation/results/${simulationId}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Results fetch failed:', error);
      throw error;
    }
  }

  static async stopSimulation() {
    try {
      const response = await fetch(`${API_BASE_URL}/simulation/stop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Stop simulation failed:', error);
      throw error;
    }
  }

  static async getSimulationHistory() {
    try {
      const response = await fetch(`${API_BASE_URL}/simulation/history`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('History fetch failed:', error);
      throw error;
    }
  }

  // Diğer API fonksiyonları...
  static async runAIOptimization(fileCount: number) {
    const response = await fetch(`${API_BASE_URL}/api/ai-optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file_count: fileCount })
    });
    return await response.json();
  }

  static async runGeneticOptimization(params: any) {
    try {
      console.log('Sending genetic algorithm request:', params);
      
      const response = await fetch(`${API_BASE_URL}/genetic-algorithm/start`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(params)
      });

      console.log('GA Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('GA Server error response:', errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('GA result:', result);
      return result;
      
    } catch (error) {
      console.error('GA request failed:', error);
      throw error;
    }
  }

  static async getGeneticAlgorithmStatus() {
    try {
      const response = await fetch(`${API_BASE_URL}/genetic-algorithm/status`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('GA Status check failed:', error);
      throw error;
    }
  }

  static async getGeneticAlgorithmResults(gaId: number) {
    try {
      const response = await fetch(`${API_BASE_URL}/genetic-algorithm/results/${gaId}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('GA Results fetch failed:', error);
      throw error;
    }
  }

  static async stopGeneticAlgorithm() {
    try {
      const response = await fetch(`${API_BASE_URL}/genetic-algorithm/stop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Stop GA failed:', error);
      throw error;
    }
  }

  static async runLSTMForecast() {
    const response = await fetch(`${API_BASE_URL}/api/lstm-forecast`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    return await response.json();
  }

  static async runProphetForecast() {
    const response = await fetch(`${API_BASE_URL}/api/prophet-forecast`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    return await response.json();
  }


// ✅ COMPLETE PIPELINE ENDPOINTS
  static async runCompletePipeline(config: {
    start_date: string;
    end_date: string;
    population_size?: number;
    generations?: number;
    hybrid_epochs?: number;
  }) {
    try {
      console.log('Sending complete pipeline request:', config);
      
      const response = await fetch(`${API_BASE_URL}/pipeline/start`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(config)
      });

      console.log('Pipeline response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Pipeline server error:', errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Pipeline result:', result);
      return result;
      
    } catch (error) {
      console.error('Pipeline request failed:', error);
      throw error;
    }
  }

  static async getPipelineStatus() {
    try {
      const response = await fetch(`${API_BASE_URL}/pipeline/status`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Pipeline status check failed:', error);
      throw error;
    }
  }

  static async getPipelineResults(pipelineId: number) {
    try {
      const response = await fetch(`${API_BASE_URL}/pipeline/results/${pipelineId}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Pipeline results fetch failed:', error);
      throw error;
    }
  }

  static async stopPipeline() {
    try {
      const response = await fetch(`${API_BASE_URL}/pipeline/stop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Stop pipeline failed:', error);
      throw error;
    }
  }

  static async resetPipeline() {
    try {
      const response = await fetch(`${API_BASE_URL}/pipeline/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      return await response.json();
    } catch (error) {
      console.error('Reset pipeline failed:', error);
      throw error;
    }
  }

  static async getPipelineFiles() {
    try {
      const response = await fetch(`${API_BASE_URL}/pipeline/files`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Pipeline files fetch failed:', error);
      throw error;
    }
  }

  static async getDefaultConfig() {
    try {
      const response = await fetch(`${API_BASE_URL}/config/default`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Default config fetch failed:', error);
      throw error;
    }
  }

  static async getAllStatus() {
    try {
      const response = await fetch(`${API_BASE_URL}/status/all`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('All status fetch failed:', error);
      throw error;
    }
  }


// ✅ HYBRID MODEL ENDPOINTS
  static async runHybridForecast(config?: {
    historical_file?: string;
    future_file?: string;
    stops_file?: string;
    sequence_length?: number;
    epochs?: number;
    save_models?: boolean;
    load_pretrained?: boolean;
    enable_route_adjustments?: boolean;
    enable_realistic_constraints?: boolean;
    enable_night_constraints?: boolean;
    timeout?: number;
  }) {
    try {
      console.log('Sending hybrid model request:', config);
      
      // Default configuration - try to auto-detect files
      const defaultConfig = {
        historical_file: config?.historical_file || 'output/passenger_flow_results.csv',
        future_file: config?.future_file || 'ga_optimization_output/ga_optimized_passenger_flow.csv',
        stops_file: config?.stops_file || 'ankara_bus_stops_10.csv',
        sequence_length: config?.sequence_length || 48,
        epochs: config?.epochs || 60,
        save_models: config?.save_models ?? true,
        load_pretrained: config?.load_pretrained ?? false,
        enable_route_adjustments: config?.enable_route_adjustments ?? true,
        enable_realistic_constraints: config?.enable_realistic_constraints ?? true,
        enable_night_constraints: config?.enable_night_constraints ?? true,
        timeout: config?.timeout || 1800
      };
      
      const response = await fetch(`${API_BASE_URL}/hybrid-model/start`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(defaultConfig)
      });

      console.log('Hybrid model response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Hybrid model server error:', errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Hybrid model result:', result);
      return { success: true, ...result };
      
    } catch (error) {
      console.error('Hybrid model request failed:', error);
      return { success: false, error: error };
    }
  }

  static async getHybridModelStatus() {
    try {
      const response = await fetch(`${API_BASE_URL}/hybrid-model/status`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Hybrid model status check failed:', error);
      throw error;
    }
  }

  static async getHybridModelResults(hybridId: number) {
    try {
      const response = await fetch(`${API_BASE_URL}/hybrid-model/results/${hybridId}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Hybrid model results fetch failed:', error);
      throw error;
    }
  }

  static async stopHybridModel() {
    try {
      const response = await fetch(`${API_BASE_URL}/hybrid-model/stop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Stop hybrid model failed:', error);
      throw error;
    }
  }

  static async resetHybridModel() {
    try {
      const response = await fetch(`${API_BASE_URL}/hybrid-model/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      return await response.json();
    } catch (error) {
      console.error('Reset hybrid model failed:', error);
      throw error;
    }
  }

  static async getHybridModelFiles() {
    try {
      const response = await fetch(`${API_BASE_URL}/hybrid-model/files`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Hybrid model files fetch failed:', error);
      throw error;
    }
  }

  static async cleanHybridModelFiles() {
    try {
      const response = await fetch(`${API_BASE_URL}/hybrid-model/clean`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      return await response.json();
    } catch (error) {
      console.error('Clean hybrid model files failed:', error);
      throw error;
    }
  }


  static async getPlotsList() {
    try {
      const response = await fetch(`${API_BASE_URL}/plots`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Plots list fetch failed:', error);
      throw error;
    }
  }

  static async getPlotImage(filename: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/plots/${filename}/base64`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Plot image fetch failed for ${filename}:`, error);
      throw error;
    }
  }

  static async getAllPlotsBase64() {
    try {
      const response = await fetch(`${API_BASE_URL}/plots/all/base64`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('All plots fetch failed:', error);
      throw error;
    }
  }

  static async getEvaluationPlotsList() {
    try {
      const response = await fetch(`${API_BASE_URL}/evaluation/plots`);
      if (!response.ok) {
        // Fallback to regular plots if evaluation plots not found
        return await APIService.getPlotsList();
      }
      return await response.json();
    } catch (error) {
      console.error('Evaluation plots list fetch failed:', error);
      // Fallback to regular plots
      return await APIService.getPlotsList();
    }
  }

  static async getEvaluationPlotImage(filename: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/evaluation/plots/${filename}/base64`);
      if (!response.ok) {
        // Fallback to regular plots
        return await APIService.getPlotImage(filename);
      }
      return await response.json();
    } catch (error) {
      console.error(`Evaluation plot image fetch failed for ${filename}:`, error);
      // Fallback to regular plots
      return await APIService.getPlotImage(filename);
    }
  }

  static async getAllEvaluationPlotsBase64() {
    try {
      const response = await fetch(`${API_BASE_URL}/evaluation/plots/all/base64`);
      if (!response.ok) {
        // Fallback to regular plots
        return await APIService.getAllPlotsBase64();
      }
      return await response.json();
    } catch (error) {
      console.error('All evaluation plots fetch failed:', error);
      // Fallback to regular plots
      return await APIService.getAllPlotsBase64();
    }
  }

  static getPlotDownloadUrl(filename: string) {
    return `${API_BASE_URL}/plots/${filename}`;
  }

  static getEvaluationPlotDownloadUrl(filename: string) {
    return `${API_BASE_URL}/evaluation/plots/${filename}`;
  }

  
  }