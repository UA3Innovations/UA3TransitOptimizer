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
  onExportPDF: () => void;
  onViewData: () => void;
}

export const FileUploadCard: React.FC<Props> = ({
  uploadedFiles,
  isUploading,
  user,
  onFileUpload,
  onExportPDF,
  onViewData
}) => {
  return (
    <View style={styles.uploadCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>📁 Data Management</Text>
        <View style={styles.cardHeaderActions}>
          {user.role === 'developer' && (
            <TouchableOpacity 
              style={styles.exportButton}
              onPress={onExportPDF}
            >
              <Text style={styles.exportButtonText}>📥 Export PDF</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={styles.viewDataButton}
            onPress={onViewData}
          >
            <Text style={styles.viewDataText}>👁️ View Data</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.uploadZone}
        onPress={onFileUpload}
        disabled={isUploading}
      >
        {isUploading ? (
          <View style={styles.uploadLoading}>
            <ActivityIndicator size="large" color="#dc2626" />
            <Text style={styles.uploadLoadingText}>Processing files...</Text>
          </View>
        ) : (
          <View style={styles.uploadContent}>
            <View style={styles.uploadIconContainer}>
              <Text style={styles.uploadIcon}>📤</Text>
            </View>
            <Text style={styles.uploadText}>Upload Transit Data</Text>
            <Text style={styles.uploadSubtext}>CSV, Excel, JSON files supported</Text>
            <View style={styles.uploadHint}>
              <Text style={styles.uploadHintText}>Tap to browse files</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
      
      {uploadedFiles.length > 0 && (
        <View style={styles.fileList}>
          <Text style={styles.fileListTitle}>📋 Uploaded Files ({uploadedFiles.length})</Text>
          {uploadedFiles.slice(-3).map((file, index) => (
            <View key={index} style={styles.fileItem}>
              <Text style={styles.fileIcon}>✅</Text>
              <View style={styles.fileInfo}>
                <Text style={styles.fileName}>{file.name}</Text>
                <Text style={styles.fileDetails}>{file.size} MB • {file.rows?.toLocaleString()} rows</Text>
              </View>
            </View>
          ))}
          {uploadedFiles.length > 3 && (
            <Text style={styles.moreFiles}>+ {uploadedFiles.length - 3} more files</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  uploadCard: {
    backgroundColor: 'white',
    margin: 15,
    padding: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 15,
    borderLeftWidth: 6,
    borderLeftColor: '#dc2626',
  },
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
  cardHeaderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  exportButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
  },
  exportButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  viewDataButton: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  viewDataText: {
    color: '#dc2626',
    fontSize: 12,
    fontWeight: '600',
  },
  uploadZone: {
    borderWidth: 3,
    borderColor: '#fecaca',
    borderStyle: 'dashed',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    backgroundColor: '#fef2f2',
  },
  uploadContent: {
    alignItems: 'center',
  },
  uploadIconContainer: {
    marginBottom: 15,
  },
  uploadIcon: {
    fontSize: 48,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  uploadHint: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  uploadHintText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  uploadLoading: {
    alignItems: 'center',
  },
  uploadLoadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  fileList: {
    marginTop: 25,
    padding: 20,
    backgroundColor: '#f9fafb',
    borderRadius: 15,
  },
  fileListTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  fileIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  fileDetails: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  moreFiles: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
  },
});