// index.tsx (Clean Version)
import { styles } from './styles';

import React, { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Import our custom hooks and components
import { LoginScreen } from './components/auth/LoginScreen';
import { FileUploadCard } from './components/dashboard/FileUploadCard';
import { WelcomeCard } from './components/dashboard/WelcomeCard';
import { TestScreen } from './components/test/TestScreen';
import { useAIProcess } from './hooks/useAIProcess';
import { useAuth } from './hooks/useAuth';
import { useFileUpload } from './hooks/useFileUpload';
import { useForecasting } from './hooks/useForecasting';
import { useMetrics } from './hooks/useMetrics';
import { useOptimization } from './hooks/useOptimization';
import { useSimulation } from './hooks/useSimulation';

// Import developer screens
import { ForecastingScreen } from './components/developer/ForecastingScreen';
import { OptimizationScreen } from './components/developer/OptimizationScreen';
import { ReportsScreen } from './components/developer/ReportsScreen';
import { SimulationScreen } from './components/developer/SimulationScreen';

import { AdminReportsScreen } from './components/admin/AdminReportsScreen';

// Import types
import { ModalState, ReportsState } from './types/app';

export default function HomeScreen() {
  // Use custom hooks
  const { user, loginData, setLoginData, loginError, handleLogin, handleLogout } = useAuth();
  const { metrics, setMetrics } = useMetrics(user);
  const { uploadedFiles, setUploadedFiles, isUploading, handleFileUpload, clearFiles } = useFileUpload();
  const { aiProcess, startAIProcess } = useAIProcess(uploadedFiles, setMetrics);

  const { optimization, setOptimization, startOptimization } = useOptimization(uploadedFiles, setMetrics);
  const { simulation, setSimulation, runSimulation } = useSimulation(uploadedFiles);
  const { forecasting, setForecasting, runProphetModel, runLSTMModel } = useForecasting(uploadedFiles);

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

  // Modal states (sadece dataViewer)
  const [modals, setModals] = useState<ModalState>({
    notifications: false,
    fileUpload: false,
    dataViewer: false
  });

  // Developer için simulation sayfasına yönlendirme
  const goToSimulation = () => {
    setCurrentTab('simulation');
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

  // Main Dashboard Content
  const renderDashboard = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Card */}
      <WelcomeCard user={user} />

      {/* File Upload Section */}
      <FileUploadCard
        uploadedFiles={uploadedFiles}
        isUploading={isUploading}
        user={user}
        onFileUpload={handleFileUpload}
        onViewData={() => setModals(prev => ({ ...prev, dataViewer: true }))}
        onGoToSimulation={user.role === 'developer' ? goToSimulation : undefined}
      />

      {/* AI Process Control */}
      <View style={styles.aiControlCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>🤖 AI Optimization Engine</Text>
          <View style={styles.aiStatusBadge}>
            <Text style={styles.aiStatusText}>
              {aiProcess.stage === 'idle' ? 'Ready' : 
               aiProcess.stage === 'completed' ? 'Completed' : 'Processing'}
            </Text>
          </View>
        </View>
        
        {aiProcess.stage === 'idle' ? (
          <View>
            <Text style={styles.aiDescription}>
              Advanced machine learning algorithms will analyze your data and optimize transit schedules for maximum efficiency.
            </Text>
            <TouchableOpacity 
              style={[styles.primaryButton, uploadedFiles.length === 0 && styles.disabledButton]}
              onPress={startAIProcess}
              disabled={uploadedFiles.length === 0}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.buttonIcon}>🚀</Text>
                <Text style={styles.primaryButtonText}>Start AI Optimization</Text>
              </View>
            </TouchableOpacity>
            {uploadedFiles.length === 0 && (
              <Text style={styles.requirementText}>Upload data files to begin optimization</Text>
            )}
          </View>
        ) : aiProcess.stage !== 'completed' ? (
          <View style={styles.processStatus}>
            <View style={styles.processHeader}>
              <Text style={styles.processStep}>{aiProcess.currentStep}</Text>
              <Text style={styles.processProgress}>{aiProcess.progress.toFixed(0)}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${aiProcess.progress}%` }]} />
              </View>
            </View>
            <Text style={styles.processTime}>Time remaining: {aiProcess.estimatedTime}</Text>
          </View>
        ) : (
          <View style={styles.resultsCard}>
            <View style={styles.successHeader}>
              <Text style={styles.successIcon}>✨</Text>
              <Text style={styles.successTitle}>Optimization Completed!</Text>
            </View>
            
            <View style={styles.improvementGrid}>
              <View style={styles.improvementItem}>
                <Text style={styles.improvementIcon}>⏱️</Text>
                <Text style={styles.improvementValue}>-15%</Text>
                <Text style={styles.improvementLabel}>Wait Time Reduced</Text>
              </View>
              <View style={styles.improvementItem}>
                <Text style={styles.improvementIcon}>📈</Text>
                <Text style={styles.improvementValue}>+12%</Text>
                <Text style={styles.improvementLabel}>Efficiency Gained</Text>
              </View>
              <View style={styles.improvementItem}>
                <Text style={styles.improvementIcon}>🎯</Text>
                <Text style={styles.improvementValue}>-40%</Text>
                <Text style={styles.improvementLabel}>Overcrowding Cut</Text>
              </View>
              <View style={styles.improvementItem}>
                <Text style={styles.improvementIcon}>😊</Text>
                <Text style={styles.improvementValue}>+25%</Text>
                <Text style={styles.improvementLabel}>Satisfaction Up</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Developer Quick Actions */}
      {user.role === 'developer' && (
        <View style={styles.quickActionsCard}>
          <Text style={styles.cardTitle}>⚡ Development Tools</Text>
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
              <Text style={styles.quickActionDesc}>Prophet & LSTM models</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => setCurrentTab('reports')}
            >
              <Text style={styles.quickActionIcon}>📋</Text>
              <Text style={styles.quickActionText}>Reports</Text>
              <Text style={styles.quickActionDesc}>Analytics & insights</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );

  // renderContent function
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
              onRunProphet={runProphetModel}
              onRunLSTM={runLSTMModel}
            />
          );
        case 'reports':
          return (
            <ReportsScreen
              reports={reports}
              setReports={setReports}
            />
          );
        case 'test':
          return <TestScreen />;
        default:
          return renderDashboard();
      }
    }
  };

  return (
    <View style={styles.app}>
      {/* Header */}
      <View style={styles.appHeader}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Welcome, {user.username}</Text>
              <Text style={styles.userRole}>
                {user.role === 'admin' ? '👑 Administrator' : '⚙️ Developer'}
              </Text>
            </View>
            <View style={styles.headerButtons}>
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
            { key: 'test', icon: '🧪', label: 'Test' }
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

      {/* Data Viewer Modal */}
      <Modal
        visible={modals.dataViewer}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModals(prev => ({ ...prev, dataViewer: false }))}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>📊 Data Overview</Text>
              <TouchableOpacity
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
          </View>
        </View>
      </Modal>
    </View>
  );
}