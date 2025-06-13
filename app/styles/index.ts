// styles/index.ts
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fef2f2',
  },
  
  // Header Styles
  appHeader: {
    backgroundColor: '#dc2626',
    paddingTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  userRole: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 2,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
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

  // Card Styles
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  // AI Control Styles
  aiControlCard: {
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
  aiStatusBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  aiStatusText: {
    color: '#16a34a',
    fontSize: 12,
    fontWeight: '600',
  },
  aiDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 25,
    textAlign: 'center',
  },
  requirementText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },

  // Process Status
  processStatus: {
    alignItems: 'center',
  },
  processHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  processStep: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  processProgress: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  processTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },

  // Progress Bar
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

  // Results
  resultsCard: {
    backgroundColor: '#f0f9ff',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  successIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  improvementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  improvementItem: {
    width: (width - 80) / 2,
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  improvementIcon: {
    fontSize: 24,
    marginBottom: 10,
  },
  improvementValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 5,
  },
  improvementLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Button Styles
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

  // Quick Actions
  quickActionsCard: {
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
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: (width - 110) / 4,
    alignItems: 'center',
    padding: 16,
    marginBottom: 15,
    backgroundColor: '#fef2f2',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fecaca',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },
  quickActionDesc: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },

  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#fecaca',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 15,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  navItemActive: {
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    borderRadius: 12,
    marginHorizontal: 2,
  },
  navIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  navIconActive: {
    fontSize: 20,
  },
  navText: {
    fontSize: 9,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  navTextActive: {
    color: '#dc2626',
    fontWeight: '700',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: height * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#fecaca',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalClose: {
    fontSize: 24,
    color: '#666',
    padding: 5,
  },

  // Data Viewer
  dataViewerContent: {
    padding: 25,
  },
  dataFileItem: {
    padding: 15,
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    marginBottom: 10,
  },
  dataFileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  dataFileInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  dataFileSchema: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },

  // Admin Bottom Navigation (styles/index.ts'e ekleyin)
  adminBottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#fecaca',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 15,
  },
  adminNavButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  adminNavButtonActive: {
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
  },
  adminNavIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  adminNavText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    textAlign: 'center',
  },

  // Notification Styles
  notificationList: {
    padding: 25,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    marginBottom: 10,
  },
  notificationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 15,
    marginTop: 5,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  notificationDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#888',
  },
});