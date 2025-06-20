// index.tsx (güncellenmiş versiyon - Complete Pipeline ile)
import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { styles } from './styles';

// Import our custom hooks and components
import { LoginScreen } from './components/auth/LoginScreen';
import { FileUploadCard } from './components/dashboard/FileUploadCard';
import { useAIProcess } from './hooks/useAIProcess'; // Updated with pipeline
import { useAuth } from './hooks/useAuth';
import { useFileUpload } from './hooks/useFileUpload';
import { useForecasting } from './hooks/useForecasting';
import { useMetrics } from './hooks/useMetrics';
import { useOptimization } from './hooks/useOptimization';
import { useSimulation } from './hooks/useSimulation';

// Import developer screens
import { AdminReportsScreen } from './components/admin/AdminReportsScreen';
import { ForecastingScreen } from './components/developer/ForecastingScreen';
import { OptimizationScreen } from './components/developer/OptimizationScreen';
import { ReportsScreen } from './components/developer/ReportsScreen';
import { SimulationScreen } from './components/developer/SimulationScreen';

// Import types
import { ModalState, ReportsState } from './types/app';
const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  // Use custom hooks
  const { user, loginData, setLoginData, loginError, handleLogin, handleLogout } = useAuth();
  const { metrics, setMetrics } = useMetrics(user);
  const { uploadedFiles, setUploadedFiles, isUploading, handleFileUpload, clearFiles } = useFileUpload();
  
  // ✅ Updated AI Process hook with complete pipeline
  const { 
    aiProcess, 
    startAIProcess,
    pipeline,
    pipelineConfig,
    setPipelineConfig,
    startCompletePipeline,
    resetPipeline,
  } = useAIProcess(uploadedFiles, setMetrics);
  
  const { simulation, setSimulation, runSimulation } = useSimulation(uploadedFiles);
  const { optimization, setOptimization, startOptimization } = useOptimization(uploadedFiles, simulation, setMetrics)
const { 
  forecasting, 
  setForecasting, 
  runHybridModel,
  stopHybridModel,    // EKSIK OLAN
  resetHybridModel    // EKSIK OLAN
} = useForecasting(uploadedFiles, simulation);
  // App State
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  // Reports state
  const [reports, setReports] = useState<ReportsState>({
    isGenerating: false,
    selectedPeriod: 'week',
    selectedMetrics: ['avgWaitTime', 'occupancyRate', 'onTimePerf'],
    chartData: {
      daily: [
        { name: 'Mon', waitTime: 8.2, occupancy: 65, onTime: 92 },
        { name: 'Tue', waitTime: 7.8, occupancy: 70, onTime: 94 },
        { name: 'Wed', waitTime: 8.5, occupancy: 68, onTime: 91 },
        { name: 'Thu', waitTime: 7.2, occupancy: 72, onTime: 96 },
        { name: 'Fri', waitTime: 9.1, occupancy: 75, onTime: 89 },
        { name: 'Sat', waitTime: 6.8, occupancy: 58, onTime: 95 },
        { name: 'Sun', waitTime: 6.2, occupancy: 52, onTime: 97 }
      ],
      heatmapData: [
        { hour: 6, day: 'Monday', value: 45 },
        { hour: 7, day: 'Monday', value: 78 }
      ],
      routeAnalysis: [
        { route: '101 Kızılay-Çankaya', passengers: 15420, efficiency: 92, revenue: 54180 },
        { route: '102 Ulus-Bahçelievler', passengers: 12850, efficiency: 88, revenue: 45125 },
        { route: '103 Sincan-Dikmen', passengers: 11200, efficiency: 85, revenue: 39340 },
        { route: '104 Keçiören-Emek', passengers: 9800, efficiency: 90, revenue: 34420 },
        { route: '105 Mamak-Çukurambar', passengers: 8650, efficiency: 87, revenue: 30385 }
      ]
    }
  });

  // Modal states
  const [modals, setModals] = useState<ModalState>({
    fileUpload: false,
    dataViewer: false
  });

  // Navigation handler for simulation
  const handleGoToSimulation = () => {
    console.log('Navigating to simulation...');
    setCurrentTab('simulation');
  };

  // ✅ Pipeline Configuration Modal
  const [showPipelineConfig, setShowPipelineConfig] = useState(false);

  const handleConfigurePipeline = () => {
    setShowPipelineConfig(true);
  };

  const handleStartCustomPipeline = () => {
    startCompletePipeline(pipelineConfig);
    setShowPipelineConfig(false);
  };

  // Login screen
  if (!user) {
    return (
      <LoginScreen
        loginData={loginData}
        setLoginData={setLoginData}
        loginError={loginError}
        handleLogin={handleLogin}
      />
    );
  }

  // ✅ Updated AI Control Card with Complete Pipeline
  const renderAIControlCard = () => (
    <View style={styles.aiControlCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>🚀 Complete Optimization Pipeline</Text>
        <View style={styles.aiStatusBadge}>
          <Text style={styles.aiStatusText}>
            {pipeline.status === 'idle' ? 'Ready' : 
             pipeline.status === 'running' ? 'Running' :
             pipeline.status === 'completed' ? 'Completed' : 
             pipeline.status === 'error' ? 'Error' : 'Ready'}
          </Text>
        </View>
      </View>
      
      {pipeline.status === 'idle' ? (
        <View>
          <Text style={styles.aiDescription}>
            Complete 5-step optimization pipeline: Simulation → Genetic Algorithm → Passenger Flow → Hybrid ML → Evaluation
          </Text>
          
          <View style={styles.pipelineOptionsContainer}>

            <TouchableOpacity 
              style={[styles.fullPipelineButton, uploadedFiles.length === 0 && styles.disabledButton]}
              onPress={() => startCompletePipeline()}
              disabled={uploadedFiles.length === 0}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.buttonIcon}>🎯</Text>
                <View style={styles.buttonTextContainer}>
                  <Text style={styles.primaryButtonText}>Pipeline</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.configButton, uploadedFiles.length === 0 && styles.disabledButton]}
              onPress={handleConfigurePipeline}
              disabled={uploadedFiles.length === 0}
            >
              <Text style={styles.configButtonText}>⚙️ Configure Pipeline</Text>
            </TouchableOpacity>
          </View>
          
          {uploadedFiles.length === 0 && (
            <Text style={styles.requirementText}>Upload data files to begin optimization</Text>
          )}
        </View>
      ) : pipeline.status === 'running' ? (
        <View style={styles.processStatus}>
          <View style={styles.processHeader}>
            <Text style={styles.processStep}>{pipeline.currentStep}</Text>
            <Text style={styles.processProgress}>{pipeline.progress.toFixed(0)}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${pipeline.progress}%` }]} />
            </View>
          </View>
          


        </View>
      ) : pipeline.status === 'completed' ? (
        <View style={styles.resultsCard}>
          <View style={styles.successHeader}>
            <Text style={styles.successIcon}>✨</Text>
            <Text style={styles.successTitle}>Complete Pipeline Finished!</Text>
          </View>
          
          <Text style={styles.pipelineSuccessDescription}>
            All 5 optimization steps completed successfully. Results are available in each section.
          </Text>
          
          <View style={styles.pipelineStepsCompleted}>
            <View style={styles.completedStep}>
              <Text style={styles.completedStepIcon}>🚇</Text>
              <Text style={styles.completedStepText}>Simulation</Text>
              <Text style={styles.completedStepStatus}>✅</Text>
            </View>
            <View style={styles.completedStep}>
              <Text style={styles.completedStepIcon}>🧬</Text>
              <Text style={styles.completedStepText}>Genetic Algorithm</Text>
              <Text style={styles.completedStepStatus}>✅</Text>
            </View>
            <View style={styles.completedStep}>
              <Text style={styles.completedStepIcon}>👥</Text>
              <Text style={styles.completedStepText}>Passenger Flow</Text>
              <Text style={styles.completedStepStatus}>✅</Text>
            </View>
            <View style={styles.completedStep}>
              <Text style={styles.completedStepIcon}>🤖</Text>
              <Text style={styles.completedStepText}>Hybrid Model</Text>
              <Text style={styles.completedStepStatus}>✅</Text>
            </View>
            <View style={styles.completedStep}>
              <Text style={styles.completedStepIcon}>📊</Text>
              <Text style={styles.completedStepText}>Evaluation</Text>
              <Text style={styles.completedStepStatus}>✅</Text>
            </View>
          </View>

          <View style={styles.improvementGrid}>
            <View style={styles.improvementItem}>
              <Text style={styles.improvementIcon}>⏱️</Text>
              <Text style={styles.improvementLabel}>Wait Time Reduced</Text>
            </View>
            <View style={styles.improvementItem}>
              <Text style={styles.improvementIcon}>📈</Text>
              <Text style={styles.improvementLabel}>Efficiency Gained</Text>
            </View>
            <View style={styles.improvementItem}>
              <Text style={styles.improvementIcon}>🎯</Text>
              <Text style={styles.improvementLabel}>Overcrowding Cut</Text>
            </View>
            <View style={styles.improvementItem}>
              <Text style={styles.improvementIcon}>😊</Text>
              <Text style={styles.improvementLabel}>Satisfaction Up</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.runAgainButton}
            onPress={() => startCompletePipeline()}
          >
            <Text style={styles.runAgainButtonText}>🔄 Run Pipeline Again</Text>
          </TouchableOpacity>
        </View>
      ) : pipeline.status === 'error' ? (
        <View style={styles.errorCard}>
          <View style={styles.errorHeader}>
            <Text style={styles.errorIcon}>❌</Text>
            <Text style={styles.errorTitle}>Pipeline Failed</Text>
          </View>
          <Text style={styles.errorDescription}>
            {pipeline.error || 'An unknown error occurred during pipeline execution.'}
          </Text>
          <View style={styles.errorActions}>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => startCompletePipeline()}
            >
              <Text style={styles.retryButtonText}>🔄 Retry Pipeline</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={resetPipeline}
            >
              <Text style={styles.resetButtonText}>↺ Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );

  // Main Dashboard Content
  const renderDashboard = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* File Upload Section */}
      <FileUploadCard
        uploadedFiles={uploadedFiles}
        isUploading={isUploading}
        user={user}
        onFileUpload={handleFileUpload}
        onViewData={() => setModals(prev => ({ ...prev, dataViewer: true }))}
        onGoToSimulation={handleGoToSimulation}
      />

      {/* ✅ Updated AI Control Card */}
      {renderAIControlCard()}

      {/* Developer Quick Actions */}
      {user.role === 'developer' && (
        <View style={styles.quickActionsCard}>
          <Text style={styles.cardTitle}>⚡ Development Tools</Text>
          <Text style={styles.quickActionsDescription}>
            Individual components of the complete pipeline for testing and development
          </Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => setCurrentTab('optimization')}
            >
              <Text style={styles.quickActionIcon}>🧬</Text>
              <Text style={styles.quickActionText}>Genetic Algorithm</Text>
              <Text style={styles.quickActionDesc}>Multi-objective optimization</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => setCurrentTab('simulation')}
            >
              <Text style={styles.quickActionIcon}>🎯</Text>
              <Text style={styles.quickActionText}>Simulation Engine</Text>
              <Text style={styles.quickActionDesc}>Discrete-event modeling</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => setCurrentTab('forecasting')}
            >
              <Text style={styles.quickActionIcon}>📈</Text>
              <Text style={styles.quickActionText}>ML Forecasting</Text>
              <Text style={styles.quickActionDesc}>Prophet & LSTM & Hybrid models</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );

  const renderContent = () => {
    if (user?.role === 'admin') {
      if (currentTab === 'reports') {
        return (
          <AdminReportsScreen
            reports={reports}
            setReports={setReports}
            metrics={metrics}
            uploadedFiles={uploadedFiles}
            user={user}
          />
        );
      }
      return renderDashboard();
    } else {
      // Developer view
      switch (currentTab) {
        case 'dashboard':
          return renderDashboard();
        case 'optimization':
          return (
            <OptimizationScreen
              optimization={optimization}
              setOptimization={setOptimization}
              uploadedFiles={uploadedFiles}
              simulation={simulation}
              onStartOptimization={startOptimization}
            />
          );
        case 'simulation':
          return (
            <SimulationScreen
              simulation={simulation}
              setSimulation={setSimulation}
              uploadedFiles={uploadedFiles}
              onRunSimulation={runSimulation}
            />
          );
        case 'forecasting':
          return (
            <ForecastingScreen
              forecasting={forecasting}
              setForecasting={setForecasting}
              uploadedFiles={uploadedFiles}
              simulation={simulation}
              onRunHybrid={runHybridModel}
              onStopHybrid={stopHybridModel}    // EKSIK OLAN
              onResetHybrid={resetHybridModel}  // EKSIK OLAN
            />
          );
        case 'reports':
          return (
            <ReportsScreen
              reports={reports}
              setReports={setReports}
            />
          );
        default:
          return renderDashboard();
      }
    }
  };

  return (
    <View style={styles.app}>
      <View style={styles.appHeader}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>Welcome, {user.username}</Text>
                <Text style={styles.userRole}>
                  {user.role === 'admin' ? '👑 Administrator' : '⚙️ Developer'}
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={handleLogout}
              >
                <Text style={styles.headerButtonText}>🚪</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderContent()}
      </View>

      {/* Bottom Navigation - Only for Developer */}
      {user?.role === 'developer' && (
        <View style={styles.bottomNav}>
          {[
            { key: 'dashboard', icon: '📊', label: 'Dashboard' },
            { key: 'optimization', icon: '🧬', label: 'Genetic' },
            { key: 'simulation', icon: '🎯', label: 'Simulation' },
            { key: 'forecasting', icon: '📈', label: 'ML Models' },
            { key: 'reports', icon: '📋', label: 'Reports' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.navItem, currentTab === tab.key && styles.navItemActive]}
              onPress={() => setCurrentTab(tab.key)}
            >
              <Text style={[
                styles.navIcon,
                currentTab === tab.key && styles.navIconActive
              ]}>
                {tab.icon}
              </Text>
              <Text style={[
                styles.navText,
                currentTab === tab.key && styles.navTextActive
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Admin Simple Bottom Navigation */}
      {user?.role === 'admin' && (
        <View style={styles.adminBottomNav}>
          <TouchableOpacity
            style={[styles.adminNavButton, currentTab === 'dashboard' && styles.adminNavButtonActive]}
            onPress={() => setCurrentTab('dashboard')}
          >
            <Text style={styles.adminNavIcon}>📊</Text>
            <Text style={styles.adminNavText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.adminNavButton, currentTab === 'reports' && styles.adminNavButtonActive]}
            onPress={() => setCurrentTab('reports')}
          >
            <Text style={styles.adminNavIcon}>📋</Text>
            <Text style={styles.adminNavText}>Reports</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ✅ Pipeline Configuration Modal */}
      <Modal
        visible={showPipelineConfig}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPipelineConfig(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowPipelineConfig(false)}
        >
          <TouchableOpacity 
            style={styles.configModalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>⚙️ Pipeline Configuration</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowPipelineConfig(false)}
              >
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.configContent}>
              <View style={styles.configSection}>
                <Text style={styles.configSectionTitle}>📅 Simulation Period</Text>
                <View style={styles.dateInputs}>
                  <View style={styles.dateInput}>
                    <Text style={styles.dateLabel}>Start Date:</Text>
                    <Text style={styles.dateValue}>{pipelineConfig.start_date}</Text>
                  </View>
                  <View style={styles.dateInput}>
                    <Text style={styles.dateLabel}>End Date:</Text>
                    <Text style={styles.dateValue}>{pipelineConfig.end_date}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.configSection}>
                <Text style={styles.configSectionTitle}>🧬 Genetic Algorithm</Text>
                <View style={styles.parameterInput}>
                  <Text style={styles.parameterLabel}>Population Size: {pipelineConfig.population_size}</Text>
                  <View style={styles.sliderContainer}>
                    <TouchableOpacity 
                      style={styles.sliderButton}
                      onPress={() => setPipelineConfig(prev => ({ 
                        ...prev, 
                        population_size: Math.max(10, prev.population_size - 5) 
                      }))}
                    >
                      <Text style={styles.sliderButtonText}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.sliderValue}>
                      <Text style={styles.sliderValueText}>{pipelineConfig.population_size}</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.sliderButton}
                      onPress={() => setPipelineConfig(prev => ({ 
                        ...prev, 
                        population_size: Math.min(50, prev.population_size + 5) 
                      }))}
                    >
                      <Text style={styles.sliderButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.parameterInput}>
                  <Text style={styles.parameterLabel}>Generations: {pipelineConfig.generations}</Text>
                  <View style={styles.sliderContainer}>
                    <TouchableOpacity 
                      style={styles.sliderButton}
                      onPress={() => setPipelineConfig(prev => ({ 
                        ...prev, 
                        generations: Math.max(10, prev.generations - 5) 
                      }))}
                    >
                      <Text style={styles.sliderButtonText}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.sliderValue}>
                      <Text style={styles.sliderValueText}>{pipelineConfig.generations}</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.sliderButton}
                      onPress={() => setPipelineConfig(prev => ({ 
                        ...prev, 
                        generations: Math.min(100, prev.generations + 5) 
                      }))}
                    >
                      <Text style={styles.sliderButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.configSection}>
                <Text style={styles.configSectionTitle}>🤖 Hybrid Model</Text>
                <View style={styles.parameterInput}>
                  <Text style={styles.parameterLabel}>Training Epochs: {pipelineConfig.hybrid_epochs}</Text>
                  <View style={styles.sliderContainer}>
                    <TouchableOpacity 
                      style={styles.sliderButton}
                      onPress={() => setPipelineConfig(prev => ({ 
                        ...prev, 
                        hybrid_epochs: Math.max(20, prev.hybrid_epochs - 10) 
                      }))}
                    >
                      <Text style={styles.sliderButtonText}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.sliderValue}>
                      <Text style={styles.sliderValueText}>{pipelineConfig.hybrid_epochs}</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.sliderButton}
                      onPress={() => setPipelineConfig(prev => ({ 
                        ...prev, 
                        hybrid_epochs: Math.min(200, prev.hybrid_epochs + 10) 
                      }))}
                    >
                      <Text style={styles.sliderButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.configSection}>

              </View>
            </ScrollView>
            
            <View style={styles.configModalFooter}>
              <TouchableOpacity
                style={styles.configCancelButton}
                onPress={() => setShowPipelineConfig(false)}
              >
                <Text style={styles.configCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.configStartButton}
                onPress={handleStartCustomPipeline}
              >
                <Text style={styles.configStartText}>🚀 Start Pipeline</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Data Viewer Modal */}
      <Modal
        visible={modals.dataViewer}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModals(prev => ({ ...prev, dataViewer: false }))}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModals(prev => ({ ...prev, dataViewer: false }))}
        >
          <TouchableOpacity 
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>📊 Data Overview</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModals(prev => ({ ...prev, dataViewer: false }))}
              >
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.dataViewerContent}>
              {uploadedFiles.map((file, index) => (
                <View key={index} style={styles.dataFileItem}>
                  <Text style={styles.dataFileName}>{file.name}</Text>
                  <Text style={styles.dataFileInfo}>
                    {file.size} MB • {file.rows?.toLocaleString()} rows
                  </Text>
                  <Text style={styles.dataFileSchema}>
                    Columns: timestamp, bus_id, stop_id, boarding, alighting
                  </Text>
                </View>
              ))}
              {uploadedFiles.length === 0 && (
                <Text style={styles.noDataText}>No data files uploaded yet</Text>
              )}
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalBackButton}
                onPress={() => setModals(prev => ({ ...prev, dataViewer: false }))}
              >
                <Text style={styles.modalBackText}>← Back to Dashboard</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}