// components/developer/SimulationScreen.tsx
import React from 'react';
import {
    ActivityIndicator,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SimulationState, UploadedFile } from '../../types/app';

const { width } = Dimensions.get('window');

interface Props {
  simulation: SimulationState;
  setSimulation: (value: SimulationState | ((prev: SimulationState) => SimulationState)) => void;
  uploadedFiles: UploadedFile[];
  onRunSimulation: () => void;
}

export const SimulationScreen: React.FC<Props> = ({
  simulation,
  setSimulation,
  uploadedFiles,
  onRunSimulation
}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🎯 Discrete-Event Simulation</Text>
        <Text style={styles.sectionSubtitle}>Advanced system performance modeling</Text>
      </View>

      <View style={styles.simulationCard}>
        <Text style={styles.cardTitle}>⚙️ Simulation Parameters</Text>
        
        <View style={styles.parameterGrid}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Simulation Duration (days)</Text>
            <TextInput
              style={styles.numberInput}
              value={simulation.duration}
              onChangeText={(text) => setSimulation(prev => ({ ...prev, duration: text }))}
              keyboardType="numeric"
            />
            <Text style={styles.inputHint}>1-30 days</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Time Step (minutes)</Text>
            <TextInput
              style={styles.numberInput}
              value={simulation.timeStep}
              onChangeText={(text) => setSimulation(prev => ({ ...prev, timeStep: text }))}
              keyboardType="numeric"
            />
            <Text style={styles.inputHint}>1-60 minutes</Text>
          </View>
        </View>

        <View style={styles.simulationInfo}>
          <Text style={styles.infoTitle}>🔬 Simulation Model Features</Text>
          <Text style={styles.infoItem}>• Passenger arrival patterns</Text>
          <Text style={styles.infoItem}>• Bus capacity constraints</Text>
          <Text style={styles.infoItem}>• Route optimization</Text>
          <Text style={styles.infoItem}>• Real-time decision making</Text>
          <Text style={styles.infoItem}>• Traffic delay modeling</Text>
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, (simulation.isRunning || uploadedFiles.length === 0) && styles.disabledButton]}
          onPress={onRunSimulation}
          disabled={simulation.isRunning || uploadedFiles.length === 0}
        >
          <View style={styles.buttonContent}>
            {simulation.isRunning ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonIcon}>🎯</Text>
            )}
            <Text style={styles.primaryButtonText}>
              {simulation.isRunning ? `Simulation Running... ${simulation.progress}%` : 'Start Simulation'}
            </Text>
          </View>
        </TouchableOpacity>
        
        {uploadedFiles.length === 0 && (
          <Text style={styles.requirementText}>Upload data files to begin simulation</Text>
        )}
      </View>

      {/* Progress Bar */}
      {simulation.isRunning && (
        <View style={styles.progressCard}>
          <Text style={styles.cardTitle}>⏱️ Simulation Progress</Text>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>Running discrete-event simulation...</Text>
            <Text style={styles.progressPercent}>{simulation.progress.toFixed(1)}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${simulation.progress}%` }]} />
            </View>
          </View>
          <View style={styles.simulationStats}>
            <Text style={styles.statItem}>Duration: {simulation.duration} days</Text>
            <Text style={styles.statItem}>Time Step: {simulation.timeStep} minutes</Text>
            <Text style={styles.statItem}>ETA: {Math.max(0, (100 - simulation.progress) * 0.3).toFixed(1)}s</Text>
          </View>
        </View>
      )}

      {/* Results */}
      <View style={styles.simulationResults}>
        <Text style={styles.cardTitle}>📊 Simulation Results</Text>
        <View style={styles.resultGrid}>
          <View style={styles.resultCard}>
            <Text style={styles.resultIcon}>👥</Text>
            <Text style={styles.resultValue}>{simulation.results.totalPassengers.toLocaleString()}</Text>
            <Text style={styles.resultLabel}>Total Boardings</Text>
            <Text style={styles.resultTrend}>↑ 12.3%</Text>
          </View>
          
          <View style={styles.resultCard}>
            <Text style={styles.resultIcon}>🚌</Text>
            <Text style={styles.resultValue}>{simulation.results.busAssignments.toLocaleString()}</Text>
            <Text style={styles.resultLabel}>Bus Assignments</Text>
            <Text style={styles.resultTrend}>↓ 5.7%</Text>
          </View>
          
          <View style={styles.resultCard}>
            <Text style={styles.resultIcon}>📍</Text>
            <Text style={styles.resultValue}>{simulation.results.stopUtilization}%</Text>
            <Text style={styles.resultLabel}>Stop Utilization</Text>
            <Text style={styles.resultTrend}>↑ 8.1%</Text>
          </View>
          
          <View style={styles.resultCard}>
            <Text style={styles.resultIcon}>📈</Text>
            <Text style={styles.resultValue}>{simulation.results.maxOccupancy}%</Text>
            <Text style={styles.resultLabel}>Peak Occupancy</Text>
            <Text style={styles.resultTrend}>→ 0.2%</Text>
          </View>
        </View>

        {/* Detailed Analysis */}
        <View style={styles.analysisCard}>
          <Text style={styles.analysisTitle}>🔍 Performance Analysis</Text>
          <View style={styles.analysisItem}>
            <Text style={styles.analysisMetric}>Efficiency Score</Text>
            <Text style={styles.analysisValue}>87.4%</Text>
          </View>
          <View style={styles.analysisItem}>
            <Text style={styles.analysisMetric}>Cost Reduction</Text>
            <Text style={styles.analysisValue}>₺124,850</Text>
          </View>
          <View style={styles.analysisItem}>
            <Text style={styles.analysisMetric}>Passenger Satisfaction</Text>
            <Text style={styles.analysisValue}>92.1%</Text>
          </View>
          <View style={styles.analysisItem}>
            <Text style={styles.analysisMetric}>Environmental Impact</Text>
            <Text style={styles.analysisValue}>-15.3% CO₂</Text>
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
  simulationCard: {
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
    borderLeftColor: '#dc2626',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  parameterGrid: {
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  numberInput: {
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#fecaca',
  },
  inputHint: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
  simulationInfo: {
    backgroundColor: '#f0f9ff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 15,
  },
  infoItem: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 8,
    paddingLeft: 10,
  },
  primaryButton: {
    backgroundColor: '#dc2626',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  buttonIcon: {
    fontSize: 18,
    marginRight: 10,
    color: 'white',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  disabledButton: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
  },
  requirementText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  progressCard: {
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
    borderLeftColor: '#f59e0b',
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  progressPercent: {
    fontSize: 18,
    color: '#f59e0b',
    fontWeight: 'bold',
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: 15,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#fef3c7',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#f59e0b',
    borderRadius: 6,
  },
  simulationStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    padding: 15,
    backgroundColor: '#fffbeb',
    borderRadius: 10,
  },
  statItem: {
    fontSize: 12,
    color: '#92400e',
    fontWeight: '500',
  },
  simulationResults: {
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
  resultGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  resultCard: {
    width: (width - 80) / 2,
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  resultIcon: {
    fontSize: 24,
    marginBottom: 10,
  },
  resultValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 8,
  },
  resultLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 5,
  },
  resultTrend: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16a34a',
  },
  analysisCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  analysisTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 15,
  },
  analysisItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  analysisMetric: {
    fontSize: 14,
    color: '#64748b',
  },
  analysisValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
  },
});