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

  // Tarih validasyonu YYYY-MM-DD formatı için
  const isValidDate = (dateStr: string): boolean => {
    if (!dateStr || dateStr.length !== 10) return false;
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) return false;
    
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && 
           date.getMonth() === month - 1 && 
           date.getDate() === day;
  };

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

    // Tarih validasyonu
    if (!isValidDate(simulation.startDate)) {
      Alert.alert('Hata', 'Başlangıç tarihi geçerli değil. Format: DD-MM-YYYY');
      return;
    }

    if (!isValidDate(simulation.endDate)) {
      Alert.alert('Hata', 'Bitiş tarihi geçerli değil. Format: DD-MM-YYYY');
      return;
    }

    // Tarih mantık kontrolü (YYYY-MM-DD formatında)
    const startDate = new Date(simulation.startDate);
    const endDate = new Date(simulation.endDate);
    
    if (startDate >= endDate) {
      Alert.alert('Hata', 'Başlangıç tarihi bitiş tarihinden önce olmalı');
      return;
    }

    onRunSimulation();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.sectionHeader}>
        <View style={styles.headerIconContainer}>
          <Text style={styles.headerIcon}>🎯</Text>
        </View>
        <Text style={styles.sectionTitle}>Discrete-Event Simulation</Text>
        <View style={styles.sectionSubtitleContainer}>
          <View style={styles.subtitleLine} />
          <Text style={styles.sectionSubtitle}>Generate Realistic Historical Transit Data</Text>
          <View style={styles.subtitleLine} />
        </View>
      </View>

      {hasUploadedFiles && (
        <View style={styles.warningCard}>
          <View style={styles.warningIconContainer}>
            <Text style={styles.warningIcon}>ℹ️</Text>
          </View>
          <View style={styles.warningContent}>
            <Text style={styles.warningTitle}>Real Data Detected</Text>
            <Text style={styles.warningText}>
              You have uploaded {uploadedFiles.length} data file(s). Simulation is used to generate data when you don't have real data. 
              Use Genetic Algorithm, Forecasting, or Reports with your uploaded data instead.
            </Text>
            <View style={styles.warningActions}>
              <Text style={styles.warningActionText}>Available options with your data:</Text>
              <View style={styles.actionItem}>
                <Text style={styles.actionIcon}>🧬</Text>
                <Text style={styles.warningActionItem}>Genetic Algorithm Optimization</Text>
              </View>
              <View style={styles.actionItem}>
                <Text style={styles.actionIcon}>📈</Text>
                <Text style={styles.warningActionItem}>ML Forecasting (Prophet & LSTM & Hibrit)</Text>
              </View>
              <View style={styles.actionItem}>
                <Text style={styles.actionIcon}>📋</Text>
                <Text style={styles.warningActionItem}>Advanced Analytics Reports</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      <View style={styles.simulationCard}>
        <View style={styles.cardTitleContainer}>
          <View style={styles.cardIconContainer}>
            <Text style={styles.cardIcon}>⚙️</Text>
          </View>
          <Text style={styles.cardTitle}>Simulation Parameters</Text>
        </View>
        
        <View style={styles.parameterGrid}>
          <View style={styles.inputGroup}>
            <View style={styles.inputLabelContainer}>
              <View style={styles.inputIconContainer}>
                <Text style={styles.inputIcon}>📅</Text>
              </View>
              <Text style={styles.inputLabel}>Start Date</Text>
            </View>
            <TextInput
              style={[
                styles.numberInput, 
                hasUploadedFiles && styles.disabledInput,
                !isValidDate(simulation.startDate) && simulation.startDate && styles.errorInput
              ]}
              value={simulation.startDate || '2024-01-01'}
              onChangeText={hasUploadedFiles ? undefined : (text) => {
                setSimulation(prev => ({ ...prev, startDate: text }));
              }}
              placeholder="YYYY-MM-DD"
              editable={!hasUploadedFiles}
              maxLength={10}
            />
            <Text style={[
              styles.inputHint,
              !isValidDate(simulation.startDate) && simulation.startDate && styles.errorHint
            ]}>
              {!isValidDate(simulation.startDate) && simulation.startDate 
                ? 'Geçersiz tarih formatı!' 
                : 'Format: YYYY-MM-DD (örn: 2024-01-01)'}
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputLabelContainer}>
              <View style={styles.inputIconContainer}>
                <Text style={styles.inputIcon}>📅</Text>
              </View>
              <Text style={styles.inputLabel}>End Date</Text>
            </View>
            <TextInput
              style={[
                styles.numberInput, 
                hasUploadedFiles && styles.disabledInput,
                !isValidDate(simulation.endDate) && simulation.endDate && styles.errorInput
              ]}
              value={simulation.endDate || '2024-01-07'}
              onChangeText={hasUploadedFiles ? undefined : (text) => {
                setSimulation(prev => ({ ...prev, endDate: text }));
              }}
              placeholder="YYYY-MM-DD"
              editable={!hasUploadedFiles}
              maxLength={10}
            />
            <Text style={[
              styles.inputHint,
              !isValidDate(simulation.endDate) && simulation.endDate && styles.errorHint
            ]}>
              {!isValidDate(simulation.endDate) && simulation.endDate 
                ? 'Geçersiz tarih formatı!' 
                : 'Format: YYYY-MM-DD (örn: 2024-01-07)'}
            </Text>
          </View>
        </View>

        <View style={styles.simulationInfo}>
          <View style={styles.infoTitleContainer}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoTitleIcon}>🔬</Text>
            </View>
            <Text style={styles.infoTitle}>Simulation Model Features</Text>
          </View>
          <View style={styles.infoList}>
            <View style={styles.infoItemContainer}>
              <View style={styles.infoItemIcon}>
                <Text style={styles.bulletIcon}>👥</Text>
              </View>
              <Text style={styles.infoItem}>Passenger arrival patterns</Text>
            </View>
            <View style={styles.infoItemContainer}>
              <View style={styles.infoItemIcon}>
                <Text style={styles.bulletIcon}>🚌</Text>
              </View>
              <Text style={styles.infoItem}>Bus capacity constraints</Text>
            </View>
            <View style={styles.infoItemContainer}>
              <View style={styles.infoItemIcon}>
                <Text style={styles.bulletIcon}>🗺️</Text>
              </View>
              <Text style={styles.infoItem}>Route optimization</Text>
            </View>
            <View style={styles.infoItemContainer}>
              <View style={styles.infoItemIcon}>
                <Text style={styles.bulletIcon}>⚡</Text>
              </View>
              <Text style={styles.infoItem}>Real-time decision making</Text>
            </View>
            <View style={styles.infoItemContainer}>
              <View style={styles.infoItemIcon}>
                <Text style={styles.bulletIcon}>🚦</Text>
              </View>
              <Text style={styles.infoItem}>Traffic delay modeling</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.primaryButton, 
            (simulation.isRunning || hasUploadedFiles || 
             !isValidDate(simulation.startDate) || 
             !isValidDate(simulation.endDate)) && styles.disabledButton
          ]}
          onPress={handleRunSimulation}
          disabled={simulation.isRunning || hasUploadedFiles || 
                   !isValidDate(simulation.startDate) || 
                   !isValidDate(simulation.endDate)}
        >
          <View style={styles.buttonContent}>
            <View style={styles.buttonIconContainer}>
              {simulation.isRunning ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.buttonIcon}>🎯</Text>
              )}
            </View>
            <Text style={styles.primaryButtonText}>
              {simulation.isRunning ? `Simulation Running... ${simulation.progress}%` : 
               hasUploadedFiles ? 'Real Data Available - Use Other Tools' : 
               (!isValidDate(simulation.startDate) || !isValidDate(simulation.endDate)) ? 'Check Date Format' :
               'Start Simulation'}
            </Text>
          </View>
        </TouchableOpacity>
        
        {!hasUploadedFiles && (
          <View style={styles.requirementContainer}>
            <Text style={styles.requirementText}>
              {(!isValidDate(simulation.startDate) || !isValidDate(simulation.endDate)) 
                ? 'Please enter valid dates in YYYY-MM-DD format'
                : 'Simulation generates data when you don\'t have real data files'}
            </Text>
          </View>
        )}
      </View>

      {/* Progress Bar */}
      {simulation.isRunning && (
        <View style={styles.progressCard}>
          <View style={styles.cardTitleContainer}>
            <View style={[styles.cardIconContainer, styles.progressCardIconContainer]}>
              <Text style={styles.cardIcon}>⏱️</Text>
            </View>
            <Text style={styles.cardTitle}>Simulation Progress</Text>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressInfo}>
              <View style={styles.progressInfoItem}>
                <Text style={styles.progressLabel}>Status</Text>
                <Text style={styles.progressText}>Running discrete-event simulation...</Text>
              </View>
              <View style={styles.progressPercentContainer}>
                <Text style={styles.progressPercent}>{simulation.progress.toFixed(1)}%</Text>
              </View>
            </View>
            
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${simulation.progress}%` }]} />
              </View>
            </View>
          </View>

          <View style={styles.simulationStats}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Start</Text>
              <Text style={styles.statValue}>{simulation.startDate || '2024-01-01'}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>End</Text>
              <Text style={styles.statValue}>{simulation.endDate || '2024-01-07'}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>ETA</Text>
              <Text style={styles.statValue}>{Math.max(0, (100 - simulation.progress) * 0.3).toFixed(1)}s</Text>
            </View>
          </View>
        </View>
      )}

      {/* Results Card */}
      {simulation.results && !simulation.isRunning && (
        <View style={styles.resultsCard}>
          <View style={styles.cardTitleContainer}>
            <View style={styles.cardIconContainer}>
              <Text style={styles.cardIcon}>📊</Text>
            </View>
            <Text style={styles.cardTitle}>Simulation Results</Text>
          </View>
          
          <View style={styles.resultsGrid}>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Total Passengers</Text>
              <Text style={styles.resultValue}>{simulation.results.totalPassengers?.toLocaleString() || 0}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Total Boardings</Text>
              <Text style={styles.resultValue}>{simulation.results.totalBoardings?.toLocaleString() || simulation.results.busAssignments || 0}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Total Alightings</Text>
              <Text style={styles.resultValue}>{simulation.results.totalAlightings?.toLocaleString() || 0}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Overcrowding Rate</Text>
              <Text style={styles.resultValue}>{simulation.results.overcrowdingPercentage?.toFixed(1) || 0}%</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Severe Overcrowding</Text>
              <Text style={styles.resultValue}>{simulation.results.severeOvercrowdingPercentage?.toFixed(1) || simulation.results.maxOccupancy || 0}%</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Overcrowded Instances</Text>
              <Text style={styles.resultValue}>{simulation.results.overcrowdedInstances?.toLocaleString() || 0}</Text>
            </View>
          </View>
          
          {/* Summary Box */}
          <View style={styles.summaryBox}>
            <View style={styles.summaryHeader}>
              <Text style={styles.summaryIcon}>📈</Text>
              <Text style={styles.summaryTitle}>Key Insights</Text>
            </View>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryText}>
                • {simulation.results.totalPassengers?.toLocaleString() || 0} passengers simulated over the period
              </Text>
              <Text style={styles.summaryText}>
                • {simulation.results.overcrowdingPercentage?.toFixed(1) || 0}% of instances experienced overcrowding
              </Text>
              <Text style={styles.summaryText}>
                • {simulation.results.severeOvercrowdingPercentage?.toFixed(1) || 0}% had severe overcrowding (150% capacity)
              </Text>
              <Text style={styles.summaryText}>
                • Peak efficiency: {simulation.results.totalBoardings && simulation.results.totalAlightings ? 
                    ((simulation.results.totalAlightings / simulation.results.totalBoardings) * 100).toFixed(1) : 0}% passenger completion rate
              </Text>
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
  
  // Warning Card
  warningCard: {
    backgroundColor: '#fffbeb',
    margin: 15,
    padding: 24,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fed7aa',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    flexDirection: 'row',
  },
  warningIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff7ed',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  warningIcon: {
    fontSize: 20,
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#92400e',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  warningText: {
    fontSize: 14,
    color: '#78350f',
    lineHeight: 20,
    marginBottom: 16,
    fontWeight: '500',
  },
  warningActions: {
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fcd34d',
  },
  warningActionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#92400e',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  warningActionItem: {
    fontSize: 13,
    color: '#78350f',
    fontWeight: '600',
  },

  simulationCard: {
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
  parameterGrid: {
    marginBottom: 24,
    gap: 16,
  },
  inputGroup: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  errorInput: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  errorHint: {
    color: '#ef4444',
    fontWeight: '600',
  },
  resultsCard: {
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
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  resultItem: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  resultLabel: {
    fontSize: 12,
    color: '#1e40af',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
    textAlign: 'center',
  },
  resultValue: {
    fontSize: 16,
    color: '#1e3a8a',
    fontWeight: '800',
    textAlign: 'center',
  },
  inputLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputIconContainer: {
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
  inputIcon: {
    fontSize: 14,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: 0.3,
  },
  numberInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    fontWeight: '600',
    color: '#1e293b',
  },
  disabledInput: {
    backgroundColor: '#f3f4f6',
    borderColor: '#d1d5db',
    color: '#9ca3af',
  },
  inputHint: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 8,
    fontWeight: '500',
  },
  simulationInfo: {
    backgroundColor: '#f0f9ff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#bae6fd',
  },
  infoTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  infoTitleIcon: {
    fontSize: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e40af',
    letterSpacing: 0.3,
  },
  infoList: {
    gap: 12,
  },
  infoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0f2fe',
  },
  infoItemIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0f9ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  bulletIcon: {
    fontSize: 12,
  },
  infoItem: {
    fontSize: 14,
    color: '#1e40af',
    fontWeight: '600',
    flex: 1,
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
    backgroundColor: '#9ca3af',
    shadowOpacity: 0,
  },
  requirementContainer: {
    backgroundColor: '#fef3f2',
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  requirementText: {
    fontSize: 14,
    color: '#dc2626',
    textAlign: 'center',
    fontWeight: '600',
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
  progressCardIconContainer: {
    backgroundColor: '#fffbeb',
    borderColor: '#fed7aa',
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
  progressText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '700',
  },
  progressPercentContainer: {
    backgroundColor: '#f59e0b',
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
    backgroundColor: '#fef3c7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#f59e0b',
    borderRadius: 4,
  },
  simulationStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fffbeb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  statLabel: {
    fontSize: 11,
    color: '#92400e',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    color: '#78350f',
    fontWeight: '800',
  },
  summaryBox: {
    backgroundColor: '#f0f9ff',
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#bae6fd',
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e40af',
    letterSpacing: 0.5,
  },
  summaryContent: {
    gap: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#1e40af',
    fontWeight: '600',
    lineHeight: 20,
  },
});