// components/developer/OptimizationScreen.tsx
import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { OptimizationState, UploadedFile } from '../../types/app';

const { width } = Dimensions.get('window');

interface Props {
  optimization: OptimizationState;
  setOptimization: (value: OptimizationState | ((prev: OptimizationState) => OptimizationState)) => void;
  uploadedFiles: UploadedFile[];
  onStartOptimization: () => void;
}

export const OptimizationScreen: React.FC<Props> = ({
  optimization,
  setOptimization,
  uploadedFiles,
  onStartOptimization
}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🧬 Genetic Algorithm Engine</Text>
        <Text style={styles.sectionSubtitle}>Advanced multi-objective optimization system</Text>
      </View>

      <View style={styles.parameterCard}>
        <Text style={styles.cardTitle}>⚙️ Algorithm Parameters</Text>
        
        <View style={styles.parameterGrid}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Population Size</Text>
            <TextInput
              style={styles.numberInput}
              value={optimization.populationSize}
              onChangeText={(text) => setOptimization(prev => ({ ...prev, populationSize: text }))}
              keyboardType="numeric"
            />
            <Text style={styles.inputHint}>Recommended: 20-50</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Max Generations</Text>
            <TextInput
              style={styles.numberInput}
              value={optimization.maxGenerations}
              onChangeText={(text) => setOptimization(prev => ({ ...prev, maxGenerations: text }))}
              keyboardType="numeric"
            />
            <Text style={styles.inputHint}>Typical: 30-100</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Mutation Rate</Text>
            <TextInput
              style={styles.numberInput}
              value={optimization.mutationRate.toString()}
              onChangeText={(text) => setOptimization(prev => ({ ...prev, mutationRate: parseFloat(text) || 0.05 }))}
              keyboardType="numeric"
            />
            <Text style={styles.inputHint}>Range: 0.01-0.1</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Crossover Rate</Text>
            <TextInput
              style={styles.numberInput}
              value={optimization.crossoverRate.toString()}
              onChangeText={(text) => setOptimization(prev => ({ ...prev, crossoverRate: parseFloat(text) || 0.8 }))}
              keyboardType="numeric"
            />
            <Text style={styles.inputHint}>Range: 0.6-0.9</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, (optimization.isRunning || uploadedFiles.length === 0) && styles.disabledButton]}
          onPress={onStartOptimization}
          disabled={optimization.isRunning || uploadedFiles.length === 0}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonIcon}>
              {optimization.isRunning ? '⏳' : '🚀'}
            </Text>
            <Text style={styles.primaryButtonText}>
              {optimization.isRunning ? 'Optimization Running...' : 'Start Optimization'}
            </Text>
          </View>
        </TouchableOpacity>
        
        {uploadedFiles.length === 0 && (
          <Text style={styles.requirementText}>Upload data files to begin optimization</Text>
        )}
      </View>

      {optimization.isRunning && (
        <View style={styles.progressCard}>
          <Text style={styles.cardTitle}>📈 Live Optimization Progress</Text>
          <View style={styles.progressInfo}>
            <Text style={styles.progressGeneration}>
              Generation {optimization.generation} of {optimization.maxGenerations}
            </Text>
            <Text style={styles.progressPercent}>{optimization.progress.toFixed(1)}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${optimization.progress}%` }]} />
            </View>
          </View>
          <View style={styles.optimizationDetails}>
            <Text style={styles.detailItem}>
              Current Fitness: {optimization.fitnessHistory[optimization.fitnessHistory.length - 1]?.toFixed(2) || 'N/A'}
            </Text>
            <Text style={styles.detailItem}>
              Best Fitness: {Math.max(...optimization.fitnessHistory).toFixed(2) || 'N/A'}
            </Text>
            <Text style={styles.detailItem}>
              ETA: {Math.max(0, parseInt(optimization.maxGenerations) - optimization.generation) * 0.2} seconds
            </Text>
          </View>
        </View>
      )}

      {/* Fitness History Chart */}
      {optimization.fitnessHistory.length > 0 && (
        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>📊 Fitness Evolution</Text>
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
  parameterCard: {
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
    borderLeftColor: '#dc2626',
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressGeneration: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  progressPercent: {
    fontSize: 18,
    color: '#dc2626',
    fontWeight: 'bold',
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: 15,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#fecaca',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#dc2626',
    borderRadius: 6,
  },
  optimizationDetails: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#fef2f2',
    borderRadius: 10,
  },
  detailItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  chartCard: {
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
  chartContainer: {
    marginTop: 15,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 120,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  chartBar: {
    width: 8,
    height: '100%',
    justifyContent: 'flex-end',
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
  },
  chartBarFill: {
    borderRadius: 4,
    minHeight: 4,
  },
  chartDescription: {
    textAlign: 'center',
    fontSize: 12,
    color: '#64748b',
    marginTop: 10,
    fontStyle: 'italic',
  },
});