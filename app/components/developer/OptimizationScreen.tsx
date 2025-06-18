// components/developer/OptimizationScreen.tsx (Updated)
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { OptimizationState, SimulationState, UploadedFile } from '../../types/app';
import { DataFlowStatus } from '../common/DataFlowStatus';

const { width } = Dimensions.get('window');

interface Props {
  optimization: OptimizationState;
  setOptimization: (value: OptimizationState | ((prev: OptimizationState) => OptimizationState)) => void;
  uploadedFiles: UploadedFile[];
  simulation: SimulationState; // Yeni eklenen prop
  onStartOptimization: () => void;
}

export const OptimizationScreen: React.FC<Props> = ({
  optimization,
  setOptimization,
  uploadedFiles,
  simulation, // Yeni prop
  onStartOptimization
}) => {
  // Data availability check
  const hasRealData = uploadedFiles.length > 0;
  const hasSimulationData = simulation.results && simulation.results.totalPassengers > 0;
  const canProceed = hasRealData || hasSimulationData;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.sectionHeader}>
        <View style={styles.headerIconContainer}>
          <Text style={styles.headerIcon}>🧬</Text>
        </View>
        <Text style={styles.sectionTitle}>Genetic Algorithm Engine</Text>
        <View style={styles.sectionSubtitleContainer}>
          <View style={styles.subtitleLine} />
          <Text style={styles.sectionSubtitle}>Advanced Multi-Objective Optimization</Text>
          <View style={styles.subtitleLine} />
        </View>
      </View>

      {/* Data Flow Status */}
      <DataFlowStatus 
        uploadedFiles={uploadedFiles}
        simulation={simulation}
        currentTool="genetic"
      />

      <View style={styles.startCard}>
        <View style={styles.cardTitleContainer}>
          <View style={styles.cardIconContainer}>
            <Text style={styles.cardIcon}>🎯</Text>
          </View>
          <Text style={styles.cardTitle}>Optimization Control</Text>
        </View>

        <View style={styles.algorithmDescription}>
          <View style={styles.descriptionIconContainer}>
            <Text style={styles.descriptionIcon}>⚡</Text>
          </View>
          <Text style={styles.descriptionText}>
            Multi-objective genetic algorithm optimizing route efficiency, wait times, and passenger satisfaction simultaneously.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, (optimization.isRunning || !canProceed) && styles.disabledButton]}
          onPress={onStartOptimization}
          disabled={optimization.isRunning || !canProceed}
        >
          <View style={styles.buttonContent}>
            <View style={styles.buttonIconContainer}>
              <Text style={styles.buttonIcon}>
                {optimization.isRunning ? '⏳' : '🚀'}
              </Text>
            </View>
            <Text style={styles.primaryButtonText}>
              {optimization.isRunning ? 'Optimization Running...' : 
               !canProceed ? 'Need Data to Start' :
               'Start Genetic Optimization'}
            </Text>
          </View>
        </TouchableOpacity>
        
        {!canProceed && (
          <View style={styles.requirementContainer}>
            <View style={styles.requirementHeader}>
              <Text style={styles.requirementIcon}>💡</Text>
              <Text style={styles.requirementTitle}>Next Steps</Text>
            </View>
            <View style={styles.requirementOptions}>
              <View style={styles.requirementOption}>
                <Text style={styles.optionNumber}>1</Text>
                <Text style={styles.optionText}>Upload real transit data files, OR</Text>
              </View>
              <View style={styles.requirementOption}>
                <Text style={styles.optionNumber}>2</Text>
                <Text style={styles.optionText}>Go to Simulation tab and generate synthetic data</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {optimization.isRunning && (
        <View style={styles.progressCard}>
          <View style={styles.cardTitleContainer}>
            <View style={styles.cardIconContainer}>
              <Text style={styles.cardIcon}>📈</Text>
            </View>
            <Text style={styles.cardTitle}>Live Optimization Progress</Text>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressInfo}>
              <View style={styles.progressInfoItem}>
                <Text style={styles.progressLabel}>Generation</Text>
                <Text style={styles.progressGeneration}>
                  {optimization.generation} / {optimization.maxGenerations}
                </Text>
              </View>
              <View style={styles.progressPercentContainer}>
                <Text style={styles.progressPercent}>{optimization.progress.toFixed(1)}%</Text>
              </View>
            </View>
            
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${optimization.progress}%` }]} />
              </View>
            </View>
          </View>

          <View style={styles.optimizationDetails}>
            <View style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                <Text style={styles.detailIcon}>🧬</Text>
              </View>
              <Text style={styles.detailText}>
                Evolving population for optimal route configurations
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                <Text style={styles.detailIcon}>📊</Text>
              </View>
              <Text style={styles.detailText}>
                Data Source: {hasRealData ? `Real Data (${uploadedFiles.length} files)` : 
                            hasSimulationData ? `Simulation (${simulation.results.totalPassengers.toLocaleString()} passengers)` : 'Unknown'}
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                <Text style={styles.detailIcon}>📊</Text>
              </View>
              <Text style={styles.detailText}>
                Current Fitness: {optimization.fitnessHistory[optimization.fitnessHistory.length - 1]?.toFixed(2) || 'Calculating...'}
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                <Text style={styles.detailIcon}>⏱️</Text>
              </View>
              <Text style={styles.detailText}>
                ETA: {Math.max(0, parseInt(optimization.maxGenerations) - optimization.generation) * 0.2} seconds
              </Text>
            </View>
          </View>
        </View>
      )}

      {optimization.fitnessHistory.length > 0 && (
        <View style={styles.chartCard}>
          <View style={styles.cardTitleContainer}>
            <View style={[styles.cardIconContainer, styles.chartCardIconContainer]}>
              <Text style={styles.cardIcon}>📊</Text>
            </View>
            <Text style={styles.cardTitle}>Fitness Evolution</Text>
          </View>
          
          <View style={styles.chartContainer}>
            <View style={styles.chart}>
              {optimization.fitnessHistory.slice(-20).map((fitness, index) => (
                <View key={index} style={styles.chartBar}>
                  <View 
                    style={[
                      styles.chartBarFill, 
                      { 
                        height: `${(fitness / Math.max(...optimization.fitnessHistory)) * 100}%`,
                        backgroundColor: index === optimization.fitnessHistory.length - 1 ? '#dc2626' : '#fecaca'
                      }
                    ]} 
                  />
                </View>
              ))}
            </View>
            <Text style={styles.chartDescription}>Last 20 generations fitness values</Text>
            
            <View style={styles.fitnessStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Best</Text>
                <Text style={styles.statValue}>{Math.max(...optimization.fitnessHistory).toFixed(2)}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Average</Text>
                <Text style={styles.statValue}>
                  {(optimization.fitnessHistory.reduce((a, b) => a + b, 0) / optimization.fitnessHistory.length).toFixed(2)}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Current</Text>
                <Text style={styles.statValue}>
                  {optimization.fitnessHistory[optimization.fitnessHistory.length - 1]?.toFixed(2) || '0.00'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
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
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#fecaca',
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
  startCard: {
    backgroundColor: 'white',
    margin: 15,
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
  cardIcon: {
    fontSize: 18,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b',
    letterSpacing: 0.5,
  },
  algorithmDescription: {
    backgroundColor: '#fffbeb',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#fed7aa',
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff7ed',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  descriptionIcon: {
    fontSize: 18,
  },
  descriptionText: {
    flex: 1,
    fontSize: 15,
    color: '#92400e',
    lineHeight: 22,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#dc2626',
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  buttonIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  buttonIcon: {
    fontSize: 16,
    color: 'white',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  disabledButton: {
    backgroundColor: '#e2e8f0',
    shadowOpacity: 0,
  },
  requirementContainer: {
    backgroundColor: '#f0f9ff',
    padding: 20,
    borderRadius: 16,
    marginTop: 16,
    borderWidth: 2,
    borderColor: '#bae6fd',
  },
  requirementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  requirementIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  requirementTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1e40af',
    letterSpacing: 0.3,
  },
  requirementOptions: {
    gap: 12,
  },
  requirementOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0f2fe',
  },
  optionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    color: 'white',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 12,
  },
  optionText: {
    fontSize: 14,
    color: '#1e40af',
    fontWeight: '600',
    flex: 1,
  },
  progressCard: {
    backgroundColor: 'white',
    margin: 15,
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
  progressContainer: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressInfoItem: {
    flex: 1,
  },
  progressLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  progressGeneration: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '700',
  },
  progressPercentContainer: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  progressPercent: {
    fontSize: 18,
    color: 'white',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  progressBarContainer: {
    width: '100%',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#fee2e2',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#dc2626',
    borderRadius: 4,
  },
  optimizationDetails: {
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  detailIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  detailIcon: {
    fontSize: 14,
  },
  detailText: {
    flex: 1,
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
  },
  chartCard: {
    backgroundColor: 'white',
    margin: 15,
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
  chartCardIconContainer: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  chartContainer: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 100,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  chartBar: {
    width: 6,
    height: '100%',
    justifyContent: 'flex-end',
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
  },
  chartBarFill: {
    borderRadius: 3,
    minHeight: 2,
  },
  chartDescription: {
    textAlign: 'center',
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 16,
  },
  fitnessStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '800',
  },
});