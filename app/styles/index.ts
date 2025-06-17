// styles/index.ts
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
});