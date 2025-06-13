// components/auth/LoginScreen.tsx
import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { LoginData } from '../../types/auth';

const { width } = Dimensions.get('window');

interface Props {
  loginData: LoginData;
  setLoginData: (data: LoginData | ((prev: LoginData) => LoginData)) => void;
  loginError: string;
  handleLogin: () => void;
}

export const LoginScreen: React.FC<Props> = ({
  loginData,
  setLoginData,
  loginError,
  handleLogin
}) => {
  return (
    <View style={styles.loginContainer}>
      <SafeAreaView style={styles.loginContent}>
        <View style={styles.loginCard}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🚍</Text>
            <Text style={styles.loginTitle}>UA3 Transit Optimizer</Text>
          </View>
          <Text style={styles.loginSubtitle}>EGO Ankara Transportation Authority</Text>
          <Text style={styles.loginDescription}>
            Next-generation AI-powered transit optimization platform
          </Text>
          
          {loginError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{loginError}</Text>
            </View>
          ) : null}
          
          <View style={styles.inputContainer}>
            <View style={styles.inputIconContainer}>
              <Text style={styles.inputIcon}>👤</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#999"
              value={loginData.username}
              onChangeText={(text) => setLoginData(prev => ({ ...prev, username: text }))}
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <View style={styles.inputIconContainer}>
              <Text style={styles.inputIcon}>🔒</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              value={loginData.password}
              onChangeText={(text) => setLoginData(prev => ({ ...prev, password: text }))}
              secureTextEntry
            />
          </View>
          
          <View style={styles.roleContainer}>
            <Text style={styles.roleLabel}>Select Access Level</Text>
            <View style={styles.roleButtons}>
              {(['admin', 'developer'] as const).map((role) => (
                <TouchableOpacity
                  key={role}
                  style={[
                    styles.roleButton,
                    loginData.role === role && styles.roleButtonActive
                  ]}
                  onPress={() => setLoginData(prev => ({ ...prev, role }))}
                >
                  <Text style={styles.roleIcon}>
                    {role === 'admin' ? '👑' : '⚙️'}
                  </Text>
                  <Text style={[
                    styles.roleButtonText,
                    loginData.role === role && styles.roleButtonTextActive
                  ]}>
                    {role === 'admin' ? 'Administrator' : 'Developer'}
                  </Text>
                  <Text style={[
                    styles.roleDescription,
                    loginData.role === role && styles.roleDescriptionActive
                  ]}>
                    {role === 'admin' ? 'Simple AI Control' : 'Full System Access'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <View style={styles.loginButtonContent}>
              <Text style={styles.loginButtonIcon}>🔐</Text>
              <Text style={styles.loginButtonText}>Secure Login</Text>
            </View>
          </TouchableOpacity>
          
          <Text style={styles.loginFooter}>
            Demo: admin/admin123 or developer/dev123
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#dc2626',
  },
  loginContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 30,
    padding: 40,
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  logoIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 8,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  loginDescription: {
    fontSize: 14,
    color: '#888',
    marginBottom: 35,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    borderColor: '#fecaca',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    width: '100%',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 18,
    marginBottom: 20,
    width: '100%',
    height: 60,
    borderWidth: 2,
    borderColor: '#fecaca',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIconContainer: {
    width: 50,
    alignItems: 'center',
  },
  inputIcon: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingRight: 15,
  },
  roleContainer: {
    width: '100%',
    marginBottom: 30,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  roleButton: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fecaca',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  roleButtonActive: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
    transform: [{ scale: 1.02 }],
  },
  roleIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  roleButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    marginBottom: 4,
  },
  roleButtonTextActive: {
    color: 'white',
    fontWeight: '700',
  },
  roleDescription: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  roleDescriptionActive: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  loginButton: {
    width: '100%',
    height: 60,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  loginButtonContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc2626',
  },
  loginButtonIcon: {
    fontSize: 20,
    marginRight: 10,
    color: 'white',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  loginFooter: {
    marginTop: 30,
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
});