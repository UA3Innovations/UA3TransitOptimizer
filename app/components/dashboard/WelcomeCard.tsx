// components/dashboard/WelcomeCard.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { User } from '../../types/auth';

interface Props {
  user: User;
}

export const WelcomeCard: React.FC<Props> = ({ user }) => {
  return (
    <View style={styles.welcomeCard}>
      <View style={styles.welcomeHeader}>
        <Text style={styles.welcomeTitle}>
          {user.role === 'admin' ? '🎯 AI Transit Optimization' : '⚙️ Developer Console'}
        </Text>
        <Text style={styles.welcomeSubtitle}>
          {user.role === 'admin' 
            ? 'Streamlined. Intelligent. Results-driven.' 
            : 'Full system access • Advanced controls • Real-time monitoring'
          }
        </Text>
      </View>
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>System Operational</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeCard: {
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
  welcomeHeader: {
    marginBottom: 15,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#16a34a',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});