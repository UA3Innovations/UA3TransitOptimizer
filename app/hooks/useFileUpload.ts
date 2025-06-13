// hooks/useFileUpload.ts
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { Alert } from 'react-native';
import { UploadedFile } from '../types/app';

export const useFileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Enhanced file upload with real file picker
  const handleFileUpload = async () => {
    try {
      setIsUploading(true);
      
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/json'],
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets) {
        for (const asset of result.assets) {
          const fileInfo: UploadedFile = {
            name: asset.name,
            size: (asset.size ? (asset.size / (1024 * 1024)).toFixed(2) : '0.00'),
            type: asset.mimeType || 'unknown',
            uri: asset.uri,
            rows: Math.floor(Math.random() * 50000 + 10000), // Simulated row count
            uploadTime: new Date().toISOString()
          };
          
          setUploadedFiles(prev => [...prev, fileInfo]);
        }
        
        Alert.alert('Success', `${result.assets.length} file(s) uploaded successfully!`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload files');
    } finally {
      setIsUploading(false);
    }
  };

  const clearFiles = () => {
    setUploadedFiles([]);
  };

  return {
    uploadedFiles,
    setUploadedFiles,
    isUploading,
    handleFileUpload,
    clearFiles
  };
};