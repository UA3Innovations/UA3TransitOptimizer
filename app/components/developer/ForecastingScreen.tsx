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
        {(forecasting.prophetRunning || forecasting.lstmRunning) ? (
          <View style={styles.loadingComparison}>
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text style={styles.loadingText}>Running models to generate comparison...</Text>
          </View>
        ) : (forecasting.prophetAccuracy > 87.3 || forecasting.lstmAccuracy > 91.2) ? (
          <View style={styles.comparisonGrid}>
            <View style={styles.comparisonHeader}>
              <Text style={styles.comparisonMetric}>Metric</Text>
              <Text style={styles.comparisonModel}>Prophet</Text>
              <Text style={styles.comparisonModel}>LSTM</Text>
            </View>
            
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonMetric}>Accuracy</Text>
              <Text style={[styles.comparisonValue, forecasting.prophetAccuracy > forecasting.lstmAccuracy && styles.comparisonBest]}>
                {forecasting.prophetAccuracy.toFixed(1)}%
              </Text>
              <Text style={[styles.comparisonValue, forecasting.lstmAccuracy > forecasting.prophetAccuracy && styles.comparisonBest]}>
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
        ) : (
          <View style={styles.emptyComparison}>
            <Text style={styles.emptyComparisonIcon}>📊</Text>
            <Text style={styles.emptyComparisonText}>Run models to see comparison results</Text>
            <Text style={styles.emptyComparisonSubtext}>Start Prophet or LSTM model to populate this section</Text>
          </View>
        )}
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
  
  // Loading and Empty States
  loadingComparison: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  emptyComparison: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#f8fafc',
    borderRadius: 15,
    margin: 15,
  },
  emptyComparisonIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  emptyComparisonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyComparisonSubtext: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
});