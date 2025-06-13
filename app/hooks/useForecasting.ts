// hooks/useForecasting.ts
import { useState } from 'react';
import { Alert } from 'react-native';
import { APIService } from '../services/api';
import { ForecastingState, UploadedFile } from '../types/app';

export const useForecasting = (uploadedFiles: UploadedFile[]) => {
  const [forecasting, setForecasting] = useState<ForecastingState>({
    prophetRunning: false,
    lstmRunning: false,
    prophetAccuracy: 87.3,
    lstmAccuracy: 91.2,
    selectedModel: 'prophet',
    forecastDays: '7',
    results: {
      nextWeekPassengers: 2847293,
      peakHour: '08:00-09:00',
      busiestRoute: '101 Kızılay-Çankaya',
      improvement: 12.4
    }
  });

  const runProphetModel = async () => {
    if (uploadedFiles.length === 0) {
      Alert.alert('Warning', 'Please upload data files first');
      return;
    }

    setForecasting(prev => ({ ...prev, prophetRunning: true }));
    
    try {
      const result = await APIService.runProphetForecast();
      
      if (result.success) {
        setForecasting(prev => ({
          ...prev,
          prophetRunning: false,
          prophetAccuracy: result.accuracy,
          results: {
            ...prev.results,
            nextWeekPassengers: result.forecast.next_week_passengers,
            peakHour: result.forecast.peak_hour,
            busiestRoute: result.forecast.busiest_route
          }
        }));

        Alert.alert('Success! 📊', `Prophet model completed!\nAccuracy: ${result.accuracy}%`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to Prophet API');
      setForecasting(prev => ({ ...prev, prophetRunning: false }));
    }
  };

  const runLSTMModel = async () => {
    if (uploadedFiles.length === 0) {
      Alert.alert('Warning', 'Please upload data files first');
      return;
    }

    setForecasting(prev => ({ ...prev, lstmRunning: true }));
    
    try {
      const result = await APIService.runLSTMForecast();
      
      if (result.success) {
        setForecasting(prev => ({
          ...prev,
          lstmRunning: false,
          lstmAccuracy: result.accuracy,
          results: {
            ...prev.results,
            nextWeekPassengers: result.forecast.next_week_passengers,
            peakHour: result.forecast.peak_hour,
            busiestRoute: result.forecast.busiest_route
          }
        }));

        Alert.alert('Success! 🧠', `LSTM model completed!\nAccuracy: ${result.accuracy}%`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to LSTM API');
      setForecasting(prev => ({ ...prev, lstmRunning: false }));
    }
  };

  return {
    forecasting,
    setForecasting,
    runProphetModel,
    runLSTMModel
  };
};