// components/developer/ReportsScreen.tsx
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { ReportsState } from '../../types/app';

const { width } = Dimensions.get('window');

interface Props {
  reports: ReportsState;
  setReports: (value: ReportsState | ((prev: ReportsState) => ReportsState)) => void;
}

export const ReportsScreen: React.FC<Props> = ({
  reports,
  setReports
}) => {
  // Fixed metrics
  const metrics = {
    avgWaitTime: 7.8,
    occupancyRate: 66,
    onTimePerf: 94,
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.sectionHeader}>
        <View style={styles.headerIconContainer}>
          <Text style={styles.headerIcon}>📋</Text>
        </View>
        <Text style={styles.sectionTitle}>Performance Reports</Text>
        <View style={styles.sectionSubtitleContainer}>
          <View style={styles.subtitleLine} />
          <Text style={styles.sectionSubtitle}>Analytics & Insights for Developers</Text>
          <View style={styles.subtitleLine} />
        </View>
      </View>

      {/* Key Metrics Summary */}
      <View style={styles.reportCard}>
        <View style={styles.cardTitleContainer}>
          <View style={styles.cardIconContainer}>
            <Text style={styles.cardIcon}>🎯</Text>
          </View>
          <Text style={styles.cardTitle}>Performance Summary</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 16 }}>
          <View style={{ flex: 1, backgroundColor: 'white', padding: 24, borderRadius: 20, alignItems: 'center', borderWidth: 2, borderColor: '#f1f5f9', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 8 }}>
            <View style={styles.metricIconContainer}>
              <Text style={styles.adminMetricIcon}>⏱️</Text>
            </View>
            <Text style={styles.adminMetricLabel}>Warning: Analysis will be ready when the whole process completed!</Text>
          </View>
        </View>
      </View>

      {/* Key Insights */}
      <View style={styles.insightsCard}>
        <View style={styles.cardTitleContainer}>
          <View style={[styles.cardIconContainer, styles.insightsCardIconContainer]}>
            <Text style={styles.cardIcon}>💡</Text>
          </View>
          <Text style={styles.cardTitle}>Key Insights</Text>
        </View>
        <View style={styles.insightsList}>
          <View style={styles.insightItem}>
            <View style={styles.insightIconContainer}>
              <Text style={styles.insightIcon}>
                {metrics.onTimePerf >= 95 ? '✅' : metrics.onTimePerf >= 90 ? '⚠️' : '❌'}
              </Text>
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>On-Time Performance</Text>
              <Text style={styles.insightText}>
                {metrics.onTimePerf >= 95 
                  ? 'Excellent! System is performing above target.' 
                  : metrics.onTimePerf >= 90 
                  ? 'Good performance with room for improvement.'
                  : 'Below target. Consider schedule adjustments.'}
              </Text>
            </View>
          </View>

          <View style={styles.insightItem}>
            <View style={styles.insightIconContainer}>
              <Text style={styles.insightIcon}>
                {metrics.avgWaitTime <= 7 ? '✅' : metrics.avgWaitTime <= 9 ? '⚠️' : '❌'}
              </Text>
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Wait Times</Text>
              <Text style={styles.insightText}>
                {metrics.avgWaitTime <= 7 
                  ? 'Great! Wait times are within acceptable range.' 
                  : metrics.avgWaitTime <= 9 
                  ? 'Acceptable wait times, monitoring recommended.'
                  : 'High wait times detected. Action needed.'}
              </Text>
            </View>
          </View>

          <View style={styles.insightItem}>
            <View style={styles.insightIconContainer}>
              <Text style={styles.insightIcon}>
                {metrics.occupancyRate >= 60 && metrics.occupancyRate <= 75 ? '✅' : '⚠️'}
              </Text>
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Fleet Utilization</Text>
              <Text style={styles.insightText}>
                {metrics.occupancyRate >= 60 && metrics.occupancyRate <= 75
                  ? 'Optimal fleet utilization achieved.'
                  : metrics.occupancyRate > 75 
                  ? 'High utilization - monitor capacity.'
                  : 'Low utilization - optimize routes.'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef2f2',
  },
  sectionHeader: {
    backgroundColor: 'white',
    margin: 15,
    padding: 28,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  headerIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#fecaca',
  },
  headerIcon: {
    fontSize: 28,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  sectionSubtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  subtitleLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '600',
    marginHorizontal: 16,
    letterSpacing: 0.5,
  },
  reportCard: {
    backgroundColor: 'white',
    margin: 15,
    padding: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  cardIcon: {
    fontSize: 18,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b',
    letterSpacing: 0.5,
  },

  // Admin Metrics
  metricIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#fecaca',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  adminMetricIcon: {
    fontSize: 24,
  },
  adminMetricValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#dc2626',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  adminMetricLabel: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  trendContainer: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  adminMetricTrend: {
    fontSize: 12,
    fontWeight: '700',
  },
  trendGood: {
    color: '#16a34a',
  },
  trendBad: {
    color: '#dc2626',
  },

  // Insights
  insightsCard: {
    backgroundColor: 'white',
    margin: 15,
    padding: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  insightsCardIconContainer: {
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe',
  },
  insightsList: {
    marginTop: 8,
    gap: 12,
  },
  insightItem: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 16,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  insightIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  insightIcon: {
    fontSize: 18,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  insightText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    fontWeight: '500',
  },
});