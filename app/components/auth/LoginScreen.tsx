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
            <View style={styles.logoIconContainer}>
              <Text style={styles.logoIcon}>🚌</Text>
            </View>
            <Text style={styles.loginTitle}>AI Transit Optimizer</Text>
            <View style={styles.brandContainer}>
              <View style={styles.brandLine} />
              <Text style={styles.loginSubtitle}>BY UA3INNOVATIONS</Text>
              <View style={styles.brandLine} />
            </View>
          </View>
          
          {loginError ? (
            <View style={styles.errorContainer}>
              <View style={styles.errorIconContainer}>
                <Text style={styles.errorIcon}>⚠️</Text>
              </View>
              <Text style={styles.errorText}>{loginError}</Text>
            </View>
          ) : null}
          
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.inputIconContainer}>
                <Text style={styles.inputIcon}>👤</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#94a3b8"
                value={loginData.username}
                onChangeText={(text) => setLoginData(prev => ({ ...prev, username: text }))}
                autoCapitalize="none"
              />
              <View style={styles.inputFocusLine} />
            </View>
            
            <View style={styles.inputContainer}>
              <View style={styles.inputIconContainer}>
                <Text style={styles.inputIcon}>🔒</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#94a3b8"
                value={loginData.password}
                onChangeText={(text) => setLoginData(prev => ({ ...prev, password: text }))}
                secureTextEntry
              />
              <View style={styles.inputFocusLine} />
            </View>
            
            <View style={styles.roleContainer}>
              <Text style={styles.roleLabel}>Access Level</Text>
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
                    <View style={styles.roleButtonContent}>
                      <View style={[
                        styles.roleIconContainer,
                        loginData.role === role && styles.roleIconContainerActive
                      ]}>
                        <Text style={[
                          styles.roleIcon,
                          loginData.role === role && styles.roleIconActive
                        ]}>
                          {role === 'admin' ? '👑' : '⚙️'}
                        </Text>
                      </View>
                      <Text style={[
                        styles.roleButtonText,
                        loginData.role === role && styles.roleButtonTextActive
                      ]}>
                        {role === 'admin' ? 'Administrator' : 'Developer'}
                      </Text>
                    </View>
                    {loginData.role === role && <View style={styles.activeIndicator} />}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <View style={styles.loginButtonGradient}>
                <View style={styles.loginButtonContent}>
                  <View style={styles.loginButtonIconContainer}>
                    <Text style={styles.loginButtonIcon}>🚀</Text>
                  </View>
                  <Text style={styles.loginButtonText}>Launch Platform</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.footerContainer}>
            <View style={styles.divider} />
            <View style={styles.credentialsContainer}>
              <Text style={styles.loginFooter}>Demo Credentials</Text>
              <View style={styles.credentialsBadge}>
                <Text style={styles.credentialsText}>admin / admin123 • developer / dev123</Text>
              </View>
            </View>
          </View>
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
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 28,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#fecaca',
  },
  logoIcon: {
    fontSize: 28,
  },
  loginTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#dc2626',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  brandLine: {
    height: 1,
    backgroundColor: '#e5e7eb',
    flex: 1,
    marginHorizontal: 16,
  },
  loginSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 2,
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    borderWidth: 2,
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorIconContainer: {
    marginRight: 12,
  },
  errorIcon: {
    fontSize: 20,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
    width: '100%',
  },
  inputIconContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  inputIcon: {
    fontSize: 20,
    color: '#64748b',
  },
  input: {
    height: 56,
    backgroundColor: '#f8fafc',
    borderRadius: 18,
    paddingLeft: 56,
    paddingRight: 16,
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputFocusLine: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: '#dc2626',
    borderRadius: 1,
    opacity: 0,
  },
  roleContainer: {
    width: '100%',
    marginBottom: 20,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f8fafc',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  roleButtonActive: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
    shadowColor: '#dc2626',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    transform: [{ scale: 1.02 }],
  },
  roleButtonContent: {
    padding: 16,
    alignItems: 'center',
  },
  roleIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  roleIconContainerActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  roleIcon: {
    fontSize: 20,
    color: '#64748b',
  },
  roleIconActive: {
    color: 'white',
  },
  roleButtonText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  roleButtonTextActive: {
    color: 'white',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  loginButton: {
    width: '100%',
    height: 56,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  loginButtonGradient: {
    flex: 1,
    backgroundColor: '#dc2626',
  },
  loginButtonContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  loginButtonIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  loginButtonIcon: {
    fontSize: 16,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  footerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#f1f5f9',
    marginBottom: 20,
  },
  credentialsContainer: {
    alignItems: 'center',
  },
  loginFooter: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  credentialsBadge: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  credentialsText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '600',
  },
});