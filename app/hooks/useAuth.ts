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

  // Düzeltilmiş logout fonksiyonu
  const handleLogout = async () => {
    console.log('Logout button pressed'); // Debug log
    
    try {
      // Platform kontrolü ile Alert kullanımı
      if (Platform.OS === 'web') {
        // Web için basit confirm kullan
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
          await performLogout();
        }
      } else {
        // Mobil için Alert kullan
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            { 
              text: 'Cancel', 
              style: 'cancel',
              onPress: () => console.log('Logout cancelled')
            },
            {
              text: 'Yes',
              style: 'destructive',
              onPress: async () => {
                console.log('Logout confirmed');
                await performLogout();
              }
            }
          ],
          { cancelable: true }
        );
      }
    } catch (error) {
      console.log('Error in handleLogout:', error);
      // Hata durumunda direkt çıkış yap
      await performLogout();
    }
  };

  // Çıkış işlemini gerçekleştiren ayrı fonksiyon
  const performLogout = async () => {
    try {
      console.log('Performing logout...');
      
      // SecureStore'dan temizle
      if (Platform.OS !== 'web') {
        await SecureStore.deleteItemAsync('user');
        console.log('SecureStore cleared');
      }
      
      // State'leri sıfırla
      setUser(null);
      setLoginData({ username: '', password: '', role: 'admin' });
      setLoginError('');
      
      console.log('Logout completed successfully');
    } catch (error) {
      console.log('Error during logout (continuing anyway):', error);
      // Hata olsa bile çıkış yap
      setUser(null);
      setLoginData({ username: '', password: '', role: 'admin' });
      setLoginError('');
    }
  };

  // Acil çıkış fonksiyonu (Alert olmadan direkt çıkış)
  const forceLogout = async () => {
    console.log('Force logout initiated');
    await performLogout();
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
    handleLogout,
    forceLogout // Acil durum için ek fonksiyon
  };
};