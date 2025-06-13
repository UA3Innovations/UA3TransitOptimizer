from flask import Flask, jsonify, request
from flask_cors import CORS
import time
import random

app = Flask(__name__)
CORS(app)

# Basit test endpoint
@app.route('/test', methods=['GET'])
def test_endpoint():
    return jsonify({
        "message": "Merhaba Aleyna",
        "status": "success"
    })

# AI Optimization endpoint
@app.route('/api/ai-optimize', methods=['POST'])
def ai_optimize():
    data = request.json
    file_count = data.get('file_count', 0)
    
    # Simülasyon: AI işlemi yapıyormuş gibi bekle
    time.sleep(2)
    
    return jsonify({
        "success": True,
        "improvements": {
            "wait_time_reduction": round(random.uniform(10, 20), 1),
            "efficiency_gain": round(random.uniform(8, 15), 1),
            "overcrowding_reduction": round(random.uniform(30, 50), 1),
            "satisfaction_increase": round(random.uniform(20, 30), 1)
        },
        "new_metrics": {
            "avgWaitTime": round(random.uniform(6, 8), 1),
            "occupancyRate": random.randint(65, 80),
            "onTimePerf": round(random.uniform(92, 98), 1),
            "overcrowdingRate": round(random.uniform(0.01, 0.03), 3)
        },
        "processed_files": file_count
    })

# Genetic Algorithm endpoint
@app.route('/api/genetic-optimize', methods=['POST'])
def genetic_optimize():
    data = request.json
    population_size = data.get('population_size', 20)
    max_generations = data.get('max_generations', 30)
    
    time.sleep(1)
    
    return jsonify({
        "success": True,
        "best_fitness": round(random.uniform(85, 95), 2),
        "generations_completed": max_generations,
        "optimization_complete": True,
        "improvements": {
            "route_efficiency": round(random.uniform(15, 25), 1),
            "cost_reduction": round(random.uniform(10000, 50000), 0)
        }
    })

# LSTM Model endpoint
@app.route('/api/lstm-forecast', methods=['POST'])
def lstm_forecast():
    time.sleep(3)
    
    return jsonify({
        "success": True,
        "model": "LSTM",
        "accuracy": round(random.uniform(88, 94), 1),
        "forecast": {
            "next_week_passengers": random.randint(2500000, 3000000),
            "peak_hour": "08:00-09:00",
            "busiest_route": "101 Kızılay-Çankaya",
            "confidence": round(random.uniform(85, 95), 1)
        }
    })

# Prophet Model endpoint
@app.route('/api/prophet-forecast', methods=['POST'])
def prophet_forecast():
    time.sleep(2)
    
    return jsonify({
        "success": True,
        "model": "Prophet",
        "accuracy": round(random.uniform(85, 91), 1),
        "forecast": {
            "next_week_passengers": random.randint(2400000, 2900000),
            "peak_hour": "17:00-18:00",
            "busiest_route": "102 Ulus-Bahçelievler",
            "confidence": round(random.uniform(80, 90), 1)
        }
    })

# Simulation endpoint
@app.route('/api/run-simulation', methods=['POST'])
def run_simulation():
    data = request.json
    duration = data.get('duration', 7)
    
    time.sleep(2)
    
    return jsonify({
        "success": True,
        "simulation_results": {
            "total_passengers": random.randint(300000, 400000),
            "bus_assignments": random.randint(2000, 2500),
            "stop_utilization": round(random.uniform(95, 99), 1),
            "max_occupancy": random.randint(150, 180),
            "efficiency_score": round(random.uniform(85, 92), 1),
            "cost_reduction": random.randint(100000, 150000)
        },
        "duration_days": duration
    })

if __name__ == '__main__':
    print("🐍 Python API başlatılıyor...")
    print("📡 Endpoints:")
    print("   GET  /test")
    print("   POST /api/ai-optimize")
    print("   POST /api/genetic-optimize") 
    print("   POST /api/lstm-forecast")
    print("   POST /api/prophet-forecast")
    print("   POST /api/run-simulation")
    app.run(debug=True, host='0.0.0.0', port=5000)