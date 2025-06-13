// hooks/useAuth.ts
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { LoginData, User, validCredentials } from '../types/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: '',
    role: 'admin'
  });
  const [loginError, setLoginError] = useState('');

  // Check for saved login credentials
  const checkAutoLogin = async () => {
    try {
      // Only try SecureStore on mobile platforms
      if (Platform.OS !== 'web') {
        const savedUser = await SecureStore.getItemAsync('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      }
    } catch (error) {
      console.log('No saved login found or SecureStore not available');
    }
  };

  // Enhanced login function with credential validation
  const handleLogin = async () => {
    console.log('Login attempt:', loginData); // Debug log
    setLoginError('');
    
    if (!loginData.username || !loginData.password) {
      setLoginError('Please fill in all fields');
      return;
    }

    console.log('Valid credentials:', validCredentials); // Debug log
    const validUser = validCredentials[loginData.username as keyof typeof validCredentials];
    console.log('Found user:', validUser); // Debug log
    
    if (!validUser) {
      setLoginError('User not found');
      return;
    }
    
    if (validUser.password !== loginData.password) {
      setLoginError('Invalid password');
      return;
    }
    
    if (validUser.role !== loginData.role) {
      setLoginError('Role mismatch');
      return;
    }

    const newUser: User = {
      username: loginData.username,
      role: loginData.role,
      loginTime: new Date().toISOString()
    };

    console.log('Login successful, setting user:', newUser); // Debug log

    try {
      // Try to save to SecureStore, but don't fail if it doesn't work (web compatibility)
      if (Platform.OS !== 'web') {
        await SecureStore.setItemAsync('user', JSON.stringify(newUser));
      }
      setUser(newUser);
      Alert.alert('Success', `Welcome, ${loginData.username}!`);
    } catch (error) {
      console.log('SecureStore error (continuing anyway):', error);
      // Still set user even if SecureStore fails
      setUser(newUser);
      Alert.alert('Success', `Welcome, ${loginData.username}!`);
    }
  };

  // Enhanced logout function
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              if (Platform.OS !== 'web') {
                await SecureStore.deleteItemAsync('user');
              }
              setUser(null);
              setLoginData({ username: '', password: '', role: 'admin' });
            } catch (error) {
              console.log('Error clearing stored data (continuing anyway)');
              // Still logout even if SecureStore fails
              setUser(null);
              setLoginData({ username: '', password: '', role: 'admin' });
            }
          }
        }
      ]
    );
  };

  // Auto-login check on startup
  useEffect(() => {
    checkAutoLogin();
  }, []);

  return {
    user,
    loginData,
    setLoginData,
    loginError,
    handleLogin,
    handleLogout
  };
};