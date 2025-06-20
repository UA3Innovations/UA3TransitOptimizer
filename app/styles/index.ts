// styles/index.ts - Düzeltilmiş tam versiyon
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fef2f2',
  },
  
  // Header Styles - Enhanced
  appHeader: {
    backgroundColor: '#dc2626',
    paddingTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    color: 'white',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  userRole: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginTop: 4,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerButtonText: {
    fontSize: 18,
  },

  // Content Styles
  content: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fef2f2',
  },

  // Card Styles - Enhanced
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1e293b',
    letterSpacing: 0.5,
  },

  // AI Control Styles - Enhanced
  aiControlCard: {
    backgroundColor: 'white',
    margin: 15,
    padding: 28,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 15,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    position: 'relative',
    overflow: 'hidden',
  },
  aiStatusBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  aiStatusText: {
    color: '#16a34a',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  aiDescription: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 26,
    marginBottom: 28,
    textAlign: 'center',
    fontWeight: '500',
  },
  requirementText: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
    fontWeight: '500',
  },

  // Process Status - Enhanced
  processStatus: {
    alignItems: 'center',
  },
  processHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  processStep: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1e293b',
    flex: 1,
    letterSpacing: 0.5,
  },
  processProgress: {
    fontSize: 24,
    fontWeight: '800',
    color: '#dc2626',
    letterSpacing: 1,
  },
  processTime: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 12,
    fontWeight: '600',
  },

  // Progress Bar - Enhanced
  progressBarContainer: {
    width: '100%',
    marginBottom: 16,
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
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  // Results - Enhanced
  resultsCard: {
    backgroundColor: '#f0f9ff',
    padding: 24,
    borderRadius: 20,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#e0f2fe',
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  successIcon: {
    fontSize: 52,
    marginBottom: 12,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#16a34a',
    letterSpacing: 0.5,
  },
  improvementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 28,
    gap: 12,
  },
  improvementItem: {
    width: (width - 92) / 2,
    alignItems: 'center',
    padding: 18,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  improvementIcon: {
    fontSize: 28,
    marginBottom: 12,
  },
  improvementValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#16a34a',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  improvementLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 1,
  },

  // Button Styles - Enhanced
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
  buttonIcon: {
    fontSize: 20,
    marginRight: 12,
    color: 'white',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  disabledButton: {
    backgroundColor: '#e2e8f0',
    shadowOpacity: 0,
  },

  // Quick Actions - Enhanced & Compact
  quickActionsCard: {
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 20,
  },
  quickActionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#fef2f2',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fecaca',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
    minHeight: 100,
    justifyContent: 'center',
  },
  quickActionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#1e293b',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  quickActionDesc: {
    fontSize: 9,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 12,
    paddingHorizontal: 2,
  },

  // Bottom Navigation - Enhanced
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#fee2e2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 16,
    marginHorizontal: 2,
  },
  navItemActive: {
    backgroundColor: 'rgba(220, 38, 38, 0.08)',
    transform: [{ scale: 1.05 }],
  },
  navIcon: {
    fontSize: 18,
    marginBottom: 6,
  },
  navIconActive: {
    fontSize: 22,
  },
  navText: {
    fontSize: 9,
    color: '#64748b',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  navTextActive: {
    color: '#dc2626',
    fontWeight: '800',
  },

  // Modal Styles - Enhanced
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: height * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 28,
    borderBottomWidth: 1,
    borderBottomColor: '#fee2e2',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1e293b',
    letterSpacing: 0.5,
  },
  modalCloseButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  modalClose: {
    fontSize: 18,
    color: '#64748b',
    fontWeight: '600',
  },
  modalFooter: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#fee2e2',
    backgroundColor: '#fef2f2',
  },
  modalBackButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  modalBackText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Data Viewer - Enhanced
  dataViewerContent: {
    padding: 28,
  },
  dataFileItem: {
    padding: 20,
    backgroundColor: '#fef2f2',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dataFileName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  dataFileInfo: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 6,
    fontWeight: '600',
  },
  dataFileSchema: {
    fontSize: 12,
    color: '#94a3b8',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#64748b',
    marginTop: 24,
    fontWeight: '600',
  },

  // Admin Bottom Navigation - Enhanced
  adminBottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: '#fee2e2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 20,
  },
  adminNavButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginHorizontal: 24,
    borderRadius: 16,
  },
  adminNavButtonActive: {
    backgroundColor: 'rgba(220, 38, 38, 0.08)',
    transform: [{ scale: 1.02 }],
  },
  adminNavIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  adminNavText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  // ✅ PIPELINE STYLES - Tüm pipeline stilleri burada
  // Pipeline Options Container
  pipelineOptionsContainer: {
    marginTop: 15,
    gap: 12,
  },
  
  fullPipelineButton: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  
  configButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
  },
  
  configButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  
  buttonTextContainer: {
    flex: 1,
  },
  
  buttonSubtext: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  
  // Pipeline Progress
  processFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  
  stopButton: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
  
  stopButtonText: {
    color: '#dc2626',
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Steps Progress
  stepsProgress: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
  },
  
  stepsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  
  stepsList: {
    gap: 8,
  },
  
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  
  stepIcon: {
    fontSize: 16,
    width: 24,
    textAlign: 'center',
  },
  
  stepContent: {
    flex: 1,
  },
  
  stepName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  
  stepProgressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  
  stepProgressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 2,
  },
  
  stepPercent: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '500',
    minWidth: 32,
    textAlign: 'right',
  },
  
  // Pipeline Success
  pipelineSuccessDescription: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  
  pipelineStepsCompleted: {
    marginBottom: 20,
    gap: 8,
  },
  
  completedStep: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  
  completedStepIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  
  completedStepText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  
  completedStepStatus: {
    fontSize: 16,
  },
  
  runAgainButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  
  runAgainButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Pipeline Error
  errorCard: {
    padding: 20,
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  
  errorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  
  errorIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  
  errorDescription: {
    fontSize: 14,
    color: '#7f1d1d',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  
  errorActions: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  
  retryButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  
  retryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  
  resetButton: {
    backgroundColor: '#6b7280',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  
  resetButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Quick Actions Update
  quickActionsDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 15,
    textAlign: 'center',
  },
  
  // Configuration Modal
  configModalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 20,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  
  configContent: {
    maxHeight: 400,
  },
  
  configSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  
  configSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 12,
  },
  
  dateInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  
  dateInput: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  
  dateLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 4,
  },
  
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  
  parameterInput: {
    marginBottom: 16,
  },
  
  parameterLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  
  sliderButton: {
    width: 36,
    height: 36,
    backgroundColor: '#3b82f6',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  sliderButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  sliderValue: {
    minWidth: 60,
    height: 36,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  
  sliderValueText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
  },
  
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  
  toggleIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  
  toggleText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  
  configModalFooter: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  
  configCancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  
  configCancelText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '600',
  },
  
  configStartButton: {
    flex: 2,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
  },
  
  configStartText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});