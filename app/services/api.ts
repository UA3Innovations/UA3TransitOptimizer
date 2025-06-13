const API_BASE_URL = 'http://10.10.203.107:5000';

export class APIService {
  
  static async testConnection() {
    const response = await fetch(`${API_BASE_URL}/test`);
    return await response.json();
  }

  static async runAIOptimization(fileCount: number) {
    const response = await fetch(`${API_BASE_URL}/api/ai-optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file_count: fileCount })
    });
    return await response.json();
  }

  static async runGeneticOptimization(params: any) {
    const response = await fetch(`${API_BASE_URL}/api/genetic-optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    return await response.json();
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

  static async runSimulation(duration: string, timeStep: string) {
    const response = await fetch(`${API_BASE_URL}/api/run-simulation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ duration: parseInt(duration), time_step: parseInt(timeStep) })
    });
    return await response.json();
  }
}