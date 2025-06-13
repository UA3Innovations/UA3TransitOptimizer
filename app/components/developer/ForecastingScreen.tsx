// components/developer/ForecastingScreen.tsx
import React from 'react';
import {
    ActivityIndicator,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { ForecastingState, UploadedFile } from '../../types/app';

const { width } = Dimensions.get('window');

interface Props {
  forecasting: ForecastingState;
  setForecasting: (value: ForecastingState | ((prev: ForecastingState) => ForecastingState)) => void;
  uploadedFiles: UploadedFile[];
  onRunProphet: () => void;
  onRunLSTM: () => void;
}

export const ForecastingScreen: React.FC<Props> = ({
  forecasting,
  setForecasting,
  uploadedFiles,
  onRunProphet,
  onRunLSTM
}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>📈 ML Forecasting Models</Text>
        <Text style={styles.sectionSubtitle}>Advanced demand prediction with Prophet & LSTM</Text>
      </View>

      <View style={styles.modelGrid}>
        <View style={styles.modelCard}>
          <View style={styles.modelHeader}>
            <Text style={styles.modelTitle}>📊 Prophet Model</Text>
            <View style={styles.accuracyBadge}>
              <Text style={styles.accuracyText}>{forecasting.prophetAccuracy.toFixed(1)}%</Text>
            </View>
          </View>
          <Text style={styles.modelDescription}>
            Seasonal decomposition and trend analysis for time series forecasting
          </Text>
          <View style={styles.modelStats}>
            <Text style={styles.modelStat}>MAE: <Text style={styles.statGood}>0.127</Text></Text>
            <Text style={styles.modelStat}>Training: <Text style={styles.statInfo}>2.4 min</Text></Text>
          </View>
          <View style={styles.modelFeatures}>
            <Text style={styles.featureItem}>• Automatic seasonality detection</Text>
            <Text style={styles.featureItem}>• Holiday effects modeling</Text>
            <Text style={styles.featureItem}>• Trend changepoint detection</Text>
            <Text style={styles.featureItem}>• Uncertainty intervals</Text>
          </View>
          <TouchableOpacity 
            style={[styles.modelButton, (forecasting.prophetRunning || uploadedFiles.length === 0) && styles.disabledButton]}
            onPress={onRunProphet}
            disabled={forecasting.prophetRunning || uploadedFiles.length === 0}
          >
            {forecasting.prophetRunning ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.modelButtonText}>Run Prophet</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.modelCard}>
          <View style={styles.modelHeader}>
            <Text style={styles.modelTitle}>🧠 LSTM Model</Text>
            <View style={styles.accuracyBadge}>
              <Text style={styles.accuracyText}>{forecasting.lstmAccuracy.toFixed(1)}%</Text>
            </View>
          </View>
          <Text style={styles.modelDescription}>
            Deep learning neural network for complex pattern recognition
          </Text>
          <View style={styles.modelStats}>
            <Text style={styles.modelStat}>RMSE: <Text style={styles.statGood}>0.184</Text></Text>
            <Text style={styles.modelStat}>Training: <Text style={styles.statInfo}>12.4 min</Text></Text>
          </View>
          <View style={styles.modelFeatures}>
            <Text style={styles.featureItem}>• Long-term memory retention</Text>
            <Text style={styles.featureItem}>• Non-linear pattern learning</Text>
            <Text style={styles.featureItem}>• Multi-variate inputs</Text>
            <Text style={styles.featureItem}>• Deep architecture</Text>
          </View>
          <TouchableOpacity 
            style={[styles.modelButton, (forecasting.lstmRunning || uploadedFiles.length === 0) && styles.disabledButton]}
            onPress={onRunLSTM}
            disabled={forecasting.lstmRunning || uploadedFiles.length === 0}
          >
            {forecasting.lstmRunning ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.modelButtonText}>Run LSTM</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {uploadedFiles.length === 0 && (
        <View style={styles.requirementCard}>
          <Text style={styles.requirementTitle}>⚠️ Data Required</Text>
          <Text style={styles.requirementText}>Upload passenger data to train forecasting models</Text>
        </View>
      )}

      {/* Model Comparison */}
      <View style={styles.comparisonCard}>
        <Text style={styles.cardTitle}>🔄 Model Comparison</Text>
        <View style={styles.comparisonGrid}>
          <View style={styles.comparisonHeader}>
            <Text style={styles.comparisonMetric}>Metric</Text>
            <Text style={styles.comparisonModel}>Prophet</Text>
            <Text style={styles.comparisonModel}>LSTM</Text>
          </View>
          
          <View style={styles.comparisonRow}>
            <Text style={styles.comparisonMetric}>Accuracy</Text>
            <Text style={styles.comparisonValue}>{forecasting.prophetAccuracy.toFixed(1)}%</Text>
            <Text style={[styles.comparisonValue, styles.comparisonBest]}>
              {forecasting.lstmAccuracy.toFixed(1)}%
            </Text>
          </View>
          
          <View style={styles.comparisonRow}>
            <Text style={styles.comparisonMetric}>Training Speed</Text>
            <Text style={[styles.comparisonValue, styles.comparisonBest]}>Fast</Text>
            <Text style={styles.comparisonValue}>Slow</Text>
          </View>
          
          <View style={styles.comparisonRow}>
            <Text style={styles.comparisonMetric}>Interpretability</Text>
            <Text style={[styles.comparisonValue, styles.comparisonBest]}>High</Text>
            <Text style={styles.comparisonValue}>Low</Text>
          </View>
          
          <View style={styles.comparisonRow}>
            <Text style={styles.comparisonMetric}>Complexity</Text>
            <Text style={[styles.comparisonValue, styles.comparisonBest]}>Low</Text>
            <Text style={styles.comparisonValue}>High</Text>
          </View>
        </View>
      </View>

      {/* Forecast Results */}
      <View style={styles.forecastCard}>
        <Text style={styles.cardTitle}>🎯 Forecast Results</Text>
        <View style={styles.forecastResult}>
          <Text style={styles.forecastLine}>Next week passenger forecast:</Text>
          <Text style={styles.forecastValue}>{forecasting.results.nextWeekPassengers.toLocaleString()}</Text>
          <Text style={styles.forecastChange}>+{forecasting.results.improvement.toFixed(1)}% from last week</Text>
        </View>
        
        <View style={styles.forecastDetails}>
          <View style={styles.forecastDetail}>
            <Text style={styles.forecastDetailIcon}>🕐</Text>
            <Text style={styles.forecastDetailText}>Peak hour: {forecasting.results.peakHour}</Text>
          </View>
          <View style={styles.forecastDetail}>
            <Text style={styles.forecastDetailIcon}>🚌</Text>
            <Text style={styles.forecastDetailText}>Busiest route: {forecasting.results.busiestRoute}</Text>
          </View>
          <View style={styles.forecastDetail}>
            <Text style={styles.forecastDetailIcon}>📍</Text>
            <Text style={styles.forecastDetailText}>Critical stops: Kızılay, Ulus, Çankaya</Text>
          </View>
          <View style={styles.forecastDetail}>
            <Text style={styles.forecastDetailIcon}>📊</Text>
            <Text style={styles.forecastDetailText}>Confidence interval: 85-95%</Text>
          </View>
        </View>

        {/* Weekly Forecast Chart */}
        <View style={styles.weeklyChart}>
          <Text style={styles.chartTitle}>📅 7-Day Forecast</Text>
          <View style={styles.chartContainer}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const value = Math.floor(Math.random() * 30 + 70);
              return (
                <View key={day} style={styles.chartColumn}>
                  <View style={styles.chartBar}>
                    <View 
                      style={[
                        styles.chartBarFill, 
                        { 
                          height: `${value}%`,
                          backgroundColor: index < 2 ? '#16a34a' : '#3b82f6'
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.chartLabel}>{day}</Text>
                  <Text style={styles.chartValue}>{value}K</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#16a34a' }]} />
              <Text style={styles.legendText}>Historical</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#3b82f6' }]} />
              <Text style={styles.legendText}>Forecast</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef2f2',
  },
  sectionHeader: {
    backgroundColor: 'white',
    margin: 15,
    padding: 25,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
    borderLeftWidth: 6,
    borderLeftColor: '#dc2626',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  modelGrid: {
    paddingHorizontal: 15,
  },
  modelCard: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
    borderLeftWidth: 6,
    borderLeftColor: '#dc2626',
  },
  modelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  accuracyBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  accuracyText: {
    fontSize: 12,
    color: '#16a34a',
    fontWeight: '600',
  },
  modelDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  modelStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  modelStat: {
    fontSize: 14,
    color: '#666',
  },
  statGood: {
    color: '#16a34a',
    fontWeight: 'bold',
  },
  statInfo: {
    color: '#dc2626',
    fontWeight: 'bold',
  },
  modelFeatures: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  featureItem: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 5,
  },
  modelButton: {
    backgroundColor: '#dc2626',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  modelButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  requirementCard: {
    backgroundColor: '#fef2f2',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fecaca',
  },
  requirementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  comparisonCard: {
    backgroundColor: 'white',
    margin: 15,
    padding: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
    borderLeftWidth: 6,
    borderLeftColor: '#3b82f6',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  comparisonGrid: {
    marginTop: 15,
  },
  comparisonHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#e2e8f0',
    marginBottom: 10,
  },
  comparisonRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  comparisonMetric: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  comparisonModel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
    textAlign: 'center',
  },
  comparisonValue: {
    flex: 1,
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  comparisonBest: {
    color: '#16a34a',
    fontWeight: '600',
  },
  forecastCard: {
    backgroundColor: 'white',
    margin: 15,
    padding: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
    borderLeftWidth: 6,
    borderLeftColor: '#16a34a',
  },
  forecastResult: {
    alignItems: 'center',
    marginBottom: 25,
  },
  forecastLine: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  forecastValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 8,
  },
  forecastChange: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '600',
  },
  forecastDetails: {
    backgroundColor: '#f0fdf4',
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
  },
  forecastDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  forecastDetailIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  forecastDetailText: {
    fontSize: 14,
    color: '#333',
  },
  weeklyChart: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 15,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 15,
    textAlign: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 15,
  },
  chartColumn: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: 20,
    height: 80,
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  chartBarFill: {
    borderRadius: 10,
    minHeight: 4,
  },
  chartLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 4,
  },
  chartValue: {
    fontSize: 10,
    fontWeight: '600',
    color: '#334155',
    marginTop: 2,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#64748b',
  },
});