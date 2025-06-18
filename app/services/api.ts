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
}