// components/dashboard/MetricsCard.tsx
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Metrics } from '../../types/app';

const { width } = Dimensions.get('window');

interface Props {
  metrics: Metrics;
}

export const MetricsCard: React.FC<Props> = ({ metrics }) => {
  return (
    <View style={styles.metricsCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>📊 Live System Performance</Text>
        <View style={styles.liveBadge}>
          <View style={styles.liveIndicator} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>
      <View style={styles.metricsGrid}>
        <View style={styles.metricItem}>
          <View style={styles.metricIconContainer}>
            <Text style={styles.metricIcon}>⏱️</Text>
          </View>
          <Text style={styles.metricValue}>{metrics.avgWaitTime}</Text>
          <Text style={styles.metricUnit}>minutes</Text>
          <Text style={styles.metricLabel}>Average Wait Time</Text>
        </View>
        <View style={styles.metricItem}>
          <View style={styles.metricIconContainer}>
            <Text style={styles.metricIcon}>🚌</Text>
          </View>
          <Text style={styles.metricValue}>{metrics.occupancyRate}</Text>
          <Text style={styles.metricUnit}>percent</Text>
          <Text style={styles.metricLabel}>Fleet Utilization</Text>
        </View>
        <View style={styles.metricItem}>
          <View style={styles.metricIconContainer}>
            <Text style={styles.metricIcon}>🎯</Text>
          </View>
          <Text style={styles.metricValue}>{metrics.onTimePerf}</Text>
          <Text style={styles.metricUnit}>percent</Text>
          <Text style={styles.metricLabel}>On-Time Performance</Text>
        </View>
        <View style={styles.metricItem}>
          <View style={styles.metricIconContainer}>
            <Text style={styles.metricIcon}>⚠️</Text>
          </View>
          <Text style={styles.metricValue}>{metrics.overcrowdingRate}</Text>
          <Text style={styles.metricUnit}>percent</Text>
          <Text style={styles.metricLabel}>Overcrowding Rate</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  metricsCard: {
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
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#dc2626',
    marginRight: 6,
  },
  liveText: {
    color: '#dc2626',
    fontSize: 10,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItem: {
    width: (width - 80) / 2,
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fef2f2',
    borderRadius: 15,
  },
  metricIconContainer: {
    marginBottom: 10,
  },
  metricIcon: {
    fontSize: 24,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 2,
  },
  metricUnit: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
  },
});