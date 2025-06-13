// hooks/useSimulation.ts
import { useState } from 'react';
import { Alert } from 'react-native';
import { APIService } from '../services/api';
import { SimulationState, UploadedFile } from '../types/app';

export const useSimulation = (uploadedFiles: UploadedFile[]) => {
  const [simulation, setSimulation] = useState<SimulationState>({
    isRunning: false,
    duration: '7',
    timeStep: '5',
    results: {
      totalPassengers: 346735,
      busAssignments: 2429,
      stopUtilization: '97.4',
      maxOccupancy: 172
    },
    progress: 0
  });

  const runSimulation = async () => {
    if (simulation.isRunning) return;
    if (uploadedFiles.length === 0) {
      Alert.alert('Warning', 'Please upload data files first');
      return;
    }

    setSimulation(prev => ({ ...prev, isRunning: true, progress: 0 }));

    try {
      const result = await APIService.runSimulation(simulation.duration, simulation.timeStep);
      
      if (result.success) {
        setSimulation(prev => ({
          ...prev,
          isRunning: false,
          progress: 100,
          results: {
            totalPassengers: result.simulation_results.total_passengers,
            busAssignments: result.simulation_results.bus_assignments,
            stopUtilization: result.simulation_results.stop_utilization.toString(),
            maxOccupancy: result.simulation_results.max_occupancy
          }
        }));

        Alert.alert(
          'Success! 🎯', 
          `Simulation completed!\n• Efficiency: ${result.simulation_results.efficiency_score}%\n• Cost reduction: ₺${result.simulation_results.cost_reduction}`
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to Simulation API');
      setSimulation(prev => ({ ...prev, isRunning: false }));
    }
  };

  return {
    simulation,
    setSimulation,
    runSimulation
  };
};