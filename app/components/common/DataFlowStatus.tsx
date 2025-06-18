// components/common/DataFlowStatus.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SimulationState, UploadedFile } from '../../types/app';

interface Props {
  uploadedFiles: UploadedFile[];
  simulation: SimulationState;
  currentTool: 'genetic' | 'forecasting' | 'reports';
}

export const DataFlowStatus: React.FC<Props> = ({ uploadedFiles, simulation, currentTool }) => {
  const hasRealData = uploadedFiles.length > 0;
  const hasSimulationData = simulation.results && simulation.results.totalPassengers > 0;
  
  // Determine data availability for current tool
  const getDataStatus = () => {
    if (hasRealData) {
      return {
        status: 'real_data',
        icon: '📊',
        title: 'Using Real Data',
        description: `${uploadedFiles.length} data file(s) uploaded`,
        canProceed: true,
        color: '#16a34a'
      };
    } else if (hasSimulationData) {
      return {
        status: 'simulation_data',
        icon: '🎲',
        title: 'Using Simulation Data',
        description: `${simulation.results.totalPassengers.toLocaleString()} passengers simulated`,
        canProceed: true,
        color: '#3b82f6'
      };
    } else {
      return {
        status: 'no_data',
        icon: '⚠️',
        title: 'No Data Available',
        description: 'Run simulation or upload real data first',
        canProceed: false,
        color: '#dc2626'
      };
    }
  };

  const dataStatus = getDataStatus();

  return (
    <View style={[styles.container, { borderColor: dataStatus.color }]}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${dataStatus.color}20` }]}>
          <Text style={styles.icon}>{dataStatus.icon}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: dataStatus.color }]}>
            {dataStatus.title}
          </Text>
          <Text style={styles.description}>
            {dataStatus.description}
          </Text>
        </View>
      </View>

      {/* Data Source Selector */}
      {hasRealData && hasSimulationData && (
        <View style={styles.selectorContainer}>
          <Text style={styles.selectorTitle}>Choose Data Source:</Text>
          <View style={styles.selectorOptions}>
            <View style={styles.option}>
              <Text style={styles.optionIcon}>📊</Text>
              <Text style={styles.optionText}>Real Data ({uploadedFiles.length} files)</Text>
            </View>
            <View style={styles.option}>
              <Text style={styles.optionIcon}>🎲</Text>
              <Text style={styles.optionText}>Simulation Data ({simulation.results.totalPassengers.toLocaleString()} passengers)</Text>
            </View>
          </View>
        </View>
      )}

      {/* Recommendations */}
      {!dataStatus.canProceed && (
        <View style={styles.recommendations}>
          <Text style={styles.recommendationTitle}>To use {currentTool}:</Text>
          <View style={styles.recommendationItem}>
            <Text style={styles.recommendationBullet}>•</Text>
            <Text style={styles.recommendationText}>Upload real transit data files, OR</Text>
          </View>
          <View style={styles.recommendationItem}>
            <Text style={styles.recommendationBullet}>•</Text>
            <Text style={styles.recommendationText}>Run simulation to generate synthetic data</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 20,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
  },
  selectorContainer: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectorTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  selectorOptions: {
    gap: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  optionIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  optionText: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '600',
    flex: 1,
  },
  recommendations: {
    backgroundColor: '#fef3f2',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#dc2626',
    marginBottom: 8,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  recommendationBullet: {
    fontSize: 16,
    color: '#dc2626',
    marginRight: 8,
    fontWeight: 'bold',
  },
  recommendationText: {
    fontSize: 13,
    color: '#991b1b',
    fontWeight: '600',
    flex: 1,
    lineHeight: 18,
  },
});