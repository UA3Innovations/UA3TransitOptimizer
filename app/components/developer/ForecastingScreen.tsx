// components/developer/ForecastingScreen.tsx (Real Hybrid Model Integration)
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ForecastingState, SimulationState, UploadedFile } from '../../types/app';
import { DataFlowStatus } from '../common/DataFlowStatus';

const { width } = Dimensions.get('window');

interface Props {
  forecasting: ForecastingState;
  setForecasting: (value: ForecastingState | ((prev: ForecastingState) => ForecastingState)) => void;
  uploadedFiles: UploadedFile[];
  simulation: SimulationState;
  onRunHybrid: () => void;
  onStopHybrid: () => void;
  onResetHybrid: () => void;
}

export const ForecastingScreen: React.FC<Props> = ({
  forecasting,
  setForecasting,
  uploadedFiles,
  simulation,
  onRunHybrid,
  onStopHybrid,
  onResetHybrid
}) => {
  // Data availability check
  const hasRealData = uploadedFiles.length > 0;
  const hasSimulationData = simulation.results && simulation.results.totalPassengers > 0;
  const canProceed = hasRealData || hasSimulationData;

  const hybridModel = forecasting.hybridModel;
  const isRunning = hybridModel.isRunning;
  const hasResults = hybridModel.status === 'completed' && hybridModel.results;
  const hasError = hybridModel.status === 'error';

  const handleAdvancedOptions = () => {
    Alert.alert(
      'Advanced Configuration',
      'Configure hybrid model parameters',
      [
        { text: 'Quick Run (30 epochs)', onPress: () => onRunHybrid() },
        { text: 'Full Run (60 epochs)', onPress: () => onRunHybrid() },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.sectionHeader}>
        <View style={styles.headerIconContainer}>
          <Text style={styles.headerIcon}>🚀</Text>
        </View>
        <Text style={styles.sectionTitle}>Hybrid ML Forecasting Model</Text>
        <View style={styles.sectionSubtitleContainer}>
          <View style={styles.subtitleLine} />
          <Text style={styles.sectionSubtitle}>Advanced Hybrid Demand Prediction (Prophet + LSTM)</Text>
          <View style={styles.subtitleLine} />
        </View>
      </View>

      {/* Data Flow Status */}
      <DataFlowStatus 
        uploadedFiles={uploadedFiles}
        simulation={simulation}
        currentTool="forecasting"
      />

      {/* Hybrid Model */}
      <View style={styles.modelContainer}>
        <View style={styles.modelCard}>
          <View style={styles.modelHeader}>
            <View style={styles.modelTitleContainer}>
              <View style={[styles.modelIconContainer, styles.hybridIconContainer]}>
                <Text style={styles.modelIcon}>🚀</Text>
              </View>
              <Text style={styles.modelTitle}>Hybrid Model</Text>
            </View>
            <View style={styles.statusBadgeContainer}>
              {hasRealData && (
                <View style={styles.dataSourceBadge}>
                  <Text style={styles.dataSourceText}>📊 Real Data</Text>
                </View>
              )}
              {!hasRealData && hasSimulationData && (
                <View style={[styles.dataSourceBadge, styles.simulationBadge]}>
                  <Text style={styles.dataSourceText}>🎲 Simulation Data</Text>
                </View>
              )}
              <View style={[
                styles.statusBadge,
                isRunning && styles.runningBadge,
                hasResults && styles.completedBadge,
                hasError && styles.errorBadge
              ]}>
                <Text style={styles.statusText}>
                  {isRunning ? 'RUNNING' : hasResults ? 'COMPLETED' : hasError ? 'ERROR' : 'READY'}
                </Text>
              </View>
            </View>
          </View>
          
          <Text style={styles.modelDescription}>
            A hybrid model that combines Prophet and LSTM algorithms to achieve advanced forecasting accuracy
          </Text>
          
          {/* Model Features */}
          <View style={styles.modelFeatures}>
            <View style={styles.featuresHeader}>
              <View style={styles.featuresIconContainer}>
                <Text style={styles.featuresIcon}>⚡</Text>
              </View>
              <Text style={styles.featuresTitle}>Key Features</Text>
            </View>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>Prophet + LSTM ensemble approach</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>Weighted prediction averaging</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>Enhanced robustness and accuracy</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>Seasonality and trend analysis</Text>
              </View>
            </View>
          </View>
          
          {/* Model Controls */}
          <View style={styles.controlsContainer}>
            <TouchableOpacity 
              style={[styles.modelButton, (!canProceed || isRunning) && styles.disabledButton]}
              onPress={onRunHybrid}
              disabled={!canProceed || isRunning}
            >
              <View style={styles.modelButtonContent}>
                <View style={styles.modelButtonIconContainer}>
                  {isRunning ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text style={styles.modelButtonIcon}>🚀</Text>
                  )}
                </View>
                <Text style={styles.modelButtonText}>
                  {isRunning ? 'Running...' : 
                   !canProceed ? 'Data Required' : 'Run Hybrid Model'}
                </Text>
              </View>
            </TouchableOpacity>

          
          </View>
        </View>

        {/* Progress Card - Show when running */}
        {isRunning && (
          <View style={styles.progressCard}>
            <View style={styles.cardTitleContainer}>
              <View style={[styles.cardIconContainer, styles.progressIconContainer]}>
                <ActivityIndicator color="#16a34a" size="small" />
              </View>
              <Text style={styles.cardTitle}>Model Progress</Text>
            </View>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressText}>{"Model is in training process..."}</Text>

              </View>
              
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${hybridModel.progress}%` }
                  ]} 
                />
              </View>
              
              <View style={styles.progressDetails}>
                <Text style={styles.progressDetail}>
                </Text>
                {hybridModel.hybridId && (
                  <Text style={styles.progressDetail}>
                  </Text>
                )}
              </View>
            </View>
          </View>
        )}

        {/* Results Card */}
        <View style={styles.resultsCard}>
          <View style={styles.cardTitleContainer}>
            <View style={[styles.cardIconContainer, styles.resultsIconContainer]}>
              <Text style={styles.cardIcon}>📊</Text>
            </View>
            <Text style={styles.cardTitle}>Model Results</Text>
          </View>
          
          {hasError ? (
            <View style={styles.errorResults}>
              <View style={styles.errorIconContainer}>
                <Text style={styles.errorIcon}>❌</Text>
              </View>
              <Text style={styles.errorText}>Model Failed</Text>
              <Text style={styles.errorSubtext}>{hybridModel.error}</Text>
            </View>
          ) : hasResults ? (
            <View style={styles.resultsContainer}>
              <View style={styles.accuracyContainer}>
                <View style={styles.accuracyHeader}>
                  <Text style={styles.accuracyTitle}>Model Performance</Text>
                  <View style={styles.accuracyBadge}>
                    <Text style={styles.accuracyValue}>{forecasting.hybridAccuracy.toFixed(1)}%</Text>
                  </View>
                </View>
                <View style={styles.accuracyBar}>
                  <View 
                    style={[
                      styles.accuracyFill, 
                      { width: `${forecasting.hybridAccuracy}%` }
                    ]} 
                  />
                </View>
              </View>

              <View style={styles.metricsGrid}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Records Processed</Text>
                  <Text style={styles.metricValue}>
                    {hybridModel.results?.stats?.total_records?.toLocaleString() || 'N/A'}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Unique Trips</Text>
                  <Text style={styles.metricValue}>
                    {hybridModel.results?.stats?.unique_trips?.toLocaleString() || 'N/A'}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Lines Covered</Text>
                  <Text style={styles.metricValue}>
                    {hybridModel.results?.stats?.lines_covered || 'N/A'}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Status</Text>
                  <Text style={styles.metricValue}>Completed</Text>
                </View>
              </View>

              {hybridModel.completedAt && (
                <View style={styles.completionInfo}>
                  <Text style={styles.completionText}>
                    Completed: {new Date(hybridModel.completedAt).toLocaleString()}
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.emptyResults}>
              <View style={styles.emptyResultsIconContainer}>
                <Text style={styles.emptyResultsIcon}>🚀</Text>
              </View>
              <Text style={styles.emptyResultsText}>Run the Hybrid Model</Text>
              <Text style={styles.emptyResultsSubtext}>
                {!canProceed 
                  ? 'Please upload data or run a simulation first' 
                  : 'Start the hybrid model to generate advanced forecasts'}
              </Text>
            </View>
          )}
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
    padding: 28,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  headerIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#bbf7d0',
  },
  headerIcon: {
    fontSize: 28,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  sectionSubtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  subtitleLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '600',
    marginHorizontal: 16,
    letterSpacing: 0.5,
  },
  modelContainer: {
    paddingHorizontal: 15,
    gap: 16,
  },
  modelCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  modelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modelTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modelIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  hybridIconContainer: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  modelIcon: {
    fontSize: 18,
  },
  modelTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e293b',
    letterSpacing: 0.3,
  },
  statusBadgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dataSourceBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  simulationBadge: {
    backgroundColor: '#dbeafe',
    borderColor: '#bfdbfe',
  },
  statusBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  runningBadge: {
    backgroundColor: '#fef3c7',
    borderColor: '#fcd34d',
  },
  completedBadge: {
    backgroundColor: '#dcfce7',
    borderColor: '#bbf7d0',
  },
  errorBadge: {
    backgroundColor: '#fee2e2',
    borderColor: '#fca5a5',
  },
  dataSourceText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16a34a',
    letterSpacing: 0.5,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 0.5,
  },
  modelDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    lineHeight: 20,
    fontWeight: '500',
  },
  modelFeatures: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  featuresHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featuresIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  featuresIcon: {
    fontSize: 14,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: 0.5,
  },
  featuresList: {
    gap: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureBullet: {
    fontSize: 16,
    color: '#16a34a',
    marginRight: 8,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
    flex: 1,
  },
  controlsContainer: {
    gap: 12,
  },
  modelButton: {
    backgroundColor: '#16a34a',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  disabledButton: {
    backgroundColor: '#e2e8f0',
    shadowOpacity: 0,
  },
  modelButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modelButtonIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  modelButtonIcon: {
    fontSize: 14,
    color: 'white',
  },
  modelButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  secondaryControls: {
    flexDirection: 'row',
    gap: 8,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  disabledSecondaryButton: {
    backgroundColor: '#f1f5f9',
    borderColor: '#e2e8f0',
  },
  secondaryButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  progressCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  progressIconContainer: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  resultsIconContainer: {
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe',
  },
  cardIcon: {
    fontSize: 18,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b',
    letterSpacing: 0.5,
  },
  progressContainer: {
    gap: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
    flex: 1,
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: '800',
    color: '#16a34a',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#16a34a',
    borderRadius: 4,
  },
  progressDetails: {
    gap: 4,
  },
  progressDetail: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  resultsCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  
  // Error States
  errorResults: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fef2f2',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#fca5a5',
  },
  errorIcon: {
    fontSize: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#dc2626',
    marginBottom: 6,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 13,
    color: '#dc2626',
    textAlign: 'center',
    fontWeight: '500',
  },

  // Results Container
  resultsContainer: {
    gap: 20,
  },
  accuracyContainer: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  accuracyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  accuracyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  accuracyBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  accuracyValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#16a34a',
  },
  accuracyBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  accuracyFill: {
    height: '100%',
    backgroundColor: '#16a34a',
    borderRadius: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '700',
  },
  completionInfo: {
    backgroundColor: '#f0fdf4',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  completionText: {
    fontSize: 12,
    color: '#16a34a',
    fontWeight: '600',
    textAlign: 'center',
  },

  // Empty Results
  emptyResults: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  emptyResultsIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  emptyResultsIcon: {
    fontSize: 20,
  },
  emptyResultsText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#64748b',
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  emptyResultsSubtext: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    fontWeight: '500',
  },
});