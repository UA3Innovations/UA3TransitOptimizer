// components/developer/SimulationScreen.tsx
import React from 'react';
import {
  ActivityIndicator,
  Alert,
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
  const hasUploadedFiles = uploadedFiles.length > 0;

  const handleRunSimulation = () => {
    if (hasUploadedFiles) {
      Alert.alert(
        'Data Already Available',
        'You have uploaded real transit data. Simulation is used to generate data when you don\'t have real data. Would you like to use the existing uploaded data instead?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Use Uploaded Data', onPress: () => {
            Alert.alert('Info', 'Please use Genetic Algorithm, Forecasting, or Reports with your uploaded data.');
          }}
        ]
      );
      return;
    }
    onRunSimulation();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🎯 Discrete-Event Simulation</Text>
        <Text style={styles.sectionSubtitle}>Generate realistic historical transit data</Text>
      </View>

      {hasUploadedFiles && (
        <View style={styles.warningCard}>
          <Text style={styles.warningIcon}>ℹ️</Text>
          <View style={styles.warningContent}>
            <Text style={styles.warningTitle}>Real Data Detected</Text>
            <Text style={styles.warningText}>
              You have uploaded {uploadedFiles.length} data file(s). Simulation is used to generate data when you don't have real data. 
              Use Genetic Algorithm, Forecasting, or Reports with your uploaded data instead.
            </Text>
            <View style={styles.warningActions}>
              <Text style={styles.warningActionText}>Available options with your data:</Text>
              <Text style={styles.warningActionItem}>• 🧬 Genetic Algorithm Optimization</Text>
              <Text style={styles.warningActionItem}>• 📈 ML Forecasting (Prophet & LSTM)</Text>
              <Text style={styles.warningActionItem}>• 📋 Advanced Analytics Reports</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.simulationCard}>
        <Text style={styles.cardTitle}>⚙️ Simulation Parameters</Text>
        
        <View style={styles.parameterGrid}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Start Date</Text>
            <TextInput
              style={[styles.numberInput, hasUploadedFiles && styles.disabledInput]}
              value={simulation.startDate || '01-01-2024'}
              onChangeText={hasUploadedFiles ? undefined : (text) => setSimulation(prev => ({ ...prev, startDate: text }))}
              placeholder="DD-MM-YYYY"
              editable={!hasUploadedFiles}
            />
            <Text style={styles.inputHint}>Format: DD-MM-YYYY</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>End Date</Text>
            <TextInput
              style={[styles.numberInput, hasUploadedFiles && styles.disabledInput]}
              value={simulation.endDate || '07-01-2024'}
              onChangeText={hasUploadedFiles ? undefined : (text) => setSimulation(prev => ({ ...prev, endDate: text }))}
              placeholder="DD-MM-YYYY"
              editable={!hasUploadedFiles}
            />
            <Text style={styles.inputHint}>Format: DD-MM-YYYY</Text>
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
          style={[
            styles.primaryButton, 
            (simulation.isRunning || hasUploadedFiles) && styles.disabledButton
          ]}
          onPress={handleRunSimulation}
          disabled={simulation.isRunning || hasUploadedFiles}
        >
          <View style={styles.buttonContent}>
            {simulation.isRunning ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonIcon}>🎯</Text>
            )}
            <Text style={styles.primaryButtonText}>
              {simulation.isRunning ? `Simulation Running... ${simulation.progress}%` : 
               hasUploadedFiles ? 'Real Data Available - Use Other Tools' : 'Start Simulation'}
            </Text>
          </View>
        </TouchableOpacity>
        
        {!hasUploadedFiles && (
          <Text style={styles.requirementText}>Simulation generates data when you don't have real data files</Text>
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
            <Text style={styles.statItem}>Start: {simulation.startDate || '01-01-2024'}</Text>
            <Text style={styles.statItem}>End: {simulation.endDate || '07-01-2024'}</Text>
            <Text style={styles.statItem}>ETA: {Math.max(0, (100 - simulation.progress) * 0.3).toFixed(1)}s</Text>
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
  
  // Warning Card
  warningCard: {
    backgroundColor: '#fff7ed',
    margin: 15,
    padding: 20,
    borderRadius: 20,
    borderLeftWidth: 6,
    borderLeftColor: '#f59e0b',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flexDirection: 'row',
  },
  warningIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#78350f',
    lineHeight: 20,
    marginBottom: 15,
  },
  warningActions: {
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    padding: 15,
    borderRadius: 10,
  },
  warningActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 8,
  },
  warningActionItem: {
    fontSize: 13,
    color: '#78350f',
    marginBottom: 4,
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
  disabledInput: {
    backgroundColor: '#f3f4f6',
    borderColor: '#d1d5db',
    color: '#9ca3af',
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
    backgroundColor: '#9ca3af',
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
});