// components/dashboard/FileUploadCard.tsx
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { UploadedFile } from '../../types/app';
import { User } from '../../types/auth';

interface Props {
  uploadedFiles: UploadedFile[];
  isUploading: boolean;
  user: User;
  onFileUpload: () => void;
  onViewData: () => void;
  onGoToSimulation?: () => void;
}

export const FileUploadCard: React.FC<Props> = ({
  uploadedFiles,
  isUploading,
  user,
  onFileUpload,
  onViewData,
  onGoToSimulation
}) => {
  return (
    <View style={styles.uploadCard}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <View style={styles.cardIconContainer}>
            <Text style={styles.cardIcon}>📁</Text>
          </View>
          <Text style={styles.cardTitle}>Data Management</Text>
        </View>
        <TouchableOpacity 
          style={styles.viewDataButton}
          onPress={onViewData}
        >
          <View style={styles.viewDataButtonContent}>
            <Text style={styles.viewDataIcon}>👁️</Text>
            <Text style={styles.viewDataText}>View Data</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      {/* Developer için iki seçenek */}
      {user.role === 'developer' ? (
        <View style={styles.developerOptions}>
          <View style={styles.optionsTitleContainer}>
            <View style={styles.optionsDivider} />
            <Text style={styles.optionsTitle}>Choose Data Source</Text>
            <View style={styles.optionsDivider} />
          </View>
          
          {/* Option 1: Upload your own files */}
          <TouchableOpacity 
            style={[styles.optionCard, styles.uploadOptionCard]}
            onPress={onFileUpload}
            disabled={isUploading}
          >
            {isUploading ? (
              <View style={styles.uploadLoading}>
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#dc2626" />
                </View>
                <Text style={styles.uploadLoadingText}>Processing files...</Text>
                <View style={styles.loadingDots}>
                  <Text style={styles.loadingDot}>•</Text>
                  <Text style={styles.loadingDot}>•</Text>
                  <Text style={styles.loadingDot}>•</Text>
                </View>
              </View>
            ) : (
              <View style={styles.optionContent}>
                <View style={styles.optionIconContainer}>
                  <Text style={styles.optionIcon}>📤</Text>
                </View>
                <Text style={styles.optionTitle}>Upload Historical Data</Text>
                <Text style={styles.optionDescription}>
                  Use your own CSV transit data files
                </Text>
                <View style={styles.optionButton}>
                  <Text style={styles.optionButtonText}>Browse Files</Text>
                  <Text style={styles.optionButtonArrow}>→</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>

          {/* Option 2: Generate from simulation */}
          <TouchableOpacity 
            style={[styles.optionCard, styles.simulationOptionCard]}
            onPress={onGoToSimulation}
            disabled={isUploading}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionIconContainer}>
                <Text style={styles.optionIcon}>🎯</Text>
              </View>
              <Text style={styles.optionTitle}>Generate from Simulation</Text>
              <Text style={styles.optionDescription}>
                Create realistic historical data using our simulation engine
              </Text>
              <View style={[styles.optionButton, styles.simulationButton]}>
                <Text style={styles.optionButtonText}>Go to Simulation</Text>
                <Text style={styles.optionButtonArrow}>→</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        /* Admin için sadece upload seçeneği */
        <TouchableOpacity 
          style={styles.uploadZone}
          onPress={onFileUpload}
          disabled={isUploading}
        >
          {isUploading ? (
            <View style={styles.uploadLoading}>
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#dc2626" />
              </View>
              <Text style={styles.uploadLoadingText}>Processing files...</Text>
              <View style={styles.loadingDots}>
                <Text style={styles.loadingDot}>•</Text>
                <Text style={styles.loadingDot}>•</Text>
                <Text style={styles.loadingDot}>•</Text>
              </View>
            </View>
          ) : (
            <View style={styles.uploadContent}>
              <View style={styles.uploadIconContainer}>
                <Text style={styles.uploadIcon}>📤</Text>
              </View>
              <Text style={styles.uploadText}>Upload Transit Data</Text>
              <Text style={styles.uploadSubtext}>
                Upload your historical transit data files (CSV)
              </Text>
              <View style={styles.uploadHint}>
                <Text style={styles.uploadHintText}>Tap to browse files</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      )}
      
      {uploadedFiles.length > 0 && (
        <View style={styles.fileList}>
          <View style={styles.fileListHeader}>
            <View style={styles.fileListTitleContainer}>
              <Text style={styles.fileListIcon}>📋</Text>
              <Text style={styles.fileListTitle}>Uploaded Files</Text>
            </View>
            <View style={styles.fileCountBadge}>
              <Text style={styles.fileCountText}>{uploadedFiles.length}</Text>
            </View>
          </View>
          
          <View style={styles.fileItemsContainer}>
            {uploadedFiles.slice(-3).map((file, index) => (
              <View key={index} style={styles.fileItem}>
                <View style={styles.fileIconContainer}>
                  <Text style={styles.fileItemIcon}>✅</Text>
                </View>
                <View style={styles.fileInfo}>
                  <Text style={styles.fileName}>{file.name}</Text>
                  <View style={styles.fileDetailsContainer}>
                    <View style={styles.fileSizeBadge}>
                      <Text style={styles.fileSize}>{file.size} MB</Text>
                    </View>
                    <Text style={styles.fileDetailsSeparator}>•</Text>
                    <Text style={styles.fileRows}>{file.rows?.toLocaleString()} rows</Text>
                  </View>
                </View>
              </View>
            ))}
            
            {uploadedFiles.length > 3 && (
              <View style={styles.moreFilesContainer}>
                <View style={styles.moreFilesDivider} />
                <Text style={styles.moreFiles}>+ {uploadedFiles.length - 3} more files</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  uploadCard: {
    backgroundColor: 'white',
    margin: 15,
    padding: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#fecaca',
  },
  cardIcon: {
    fontSize: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b',
    letterSpacing: 0.5,
  },
  viewDataButton: {
    backgroundColor: '#fef2f2',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
    overflow: 'hidden',
  },
  viewDataButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  viewDataIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  viewDataText: {
    color: '#dc2626',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Developer Options
  developerOptions: {
    marginBottom: 20,
  },
  optionsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  optionsDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#64748b',
    marginHorizontal: 16,
    letterSpacing: 1,
  },
  optionCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  uploadOptionCard: {
    backgroundColor: '#fef2f2',
    borderWidth: 2,
    borderColor: '#fecaca',
  },
  simulationOptionCard: {
    backgroundColor: '#eff6ff',
    borderWidth: 2,
    borderColor: '#bfdbfe',
  },
  optionContent: {
    alignItems: 'center',
  },
  optionIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  optionIcon: {
    fontSize: 28,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  optionDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    fontWeight: '500',
  },
  optionButton: {
    backgroundColor: '#dc2626',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  simulationButton: {
    backgroundColor: '#3b82f6',
    shadowColor: '#3b82f6',
  },
  optionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginRight: 8,
  },
  optionButtonArrow: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Admin Upload Zone
  uploadZone: {
    borderWidth: 2,
    borderColor: '#fecaca',
    borderStyle: 'dashed',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#fef2f2',
  },
  uploadContent: {
    alignItems: 'center',
  },
  uploadIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  uploadIcon: {
    fontSize: 36,
  },
  uploadText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
    fontWeight: '500',
  },
  uploadHint: {
    backgroundColor: '#dc2626',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 16,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  uploadHintText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    marginRight: 6,
    letterSpacing: 0.5,
  },
  uploadHintArrow: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Loading state
  uploadLoading: {
    alignItems: 'center',
  },
  loadingContainer: {
    marginBottom: 16,
  },
  uploadLoadingText: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 8,
  },
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingDot: {
    fontSize: 24,
    color: '#dc2626',
    marginHorizontal: 2,
  },

  // File list
  fileList: {
    marginTop: 24,
    padding: 20,
    backgroundColor: '#f8fafc',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  fileListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  fileListTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileListIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  fileListTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: 0.5,
  },
  fileCountBadge: {
    backgroundColor: '#dc2626',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  fileCountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  fileItemsContainer: {
    gap: 12,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  fileIconContainer: {
    marginRight: 12,
  },
  fileItemIcon: {
    fontSize: 16,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '600',
    marginBottom: 4,
  },
  fileDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileSizeBadge: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  fileSize: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
  },
  fileDetailsSeparator: {
    fontSize: 12,
    color: '#94a3b8',
    marginHorizontal: 8,
  },
  fileRows: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  moreFilesContainer: {
    alignItems: 'center',
    paddingTop: 12,
  },
  moreFilesDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#e2e8f0',
    marginBottom: 12,
  },
  moreFiles: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    fontStyle: 'italic',
  },
});