// components/developer/ReportsScreen.tsx
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
  // Period'a göre farklı metrikler
  const getMetricsForPeriod = () => {
    switch (reports.selectedPeriod) {
      case 'today':
        return {
          avgWaitTime: 6.2,
          occupancyRate: 58,
          onTimePerf: 97,
        };
      case 'week':
        return {
          avgWaitTime: 7.8,
          occupancyRate: 66,
          onTimePerf: 94,
        };
      case 'month':
        return {
          avgWaitTime: 8.4,
          occupancyRate: 72,
          onTimePerf: 91,
        };
      default:
        return {
          avgWaitTime: 7.8,
          occupancyRate: 66,
          onTimePerf: 94,
        };
    }
  };

  const metrics = getMetricsForPeriod();

  // Period'a göre chart data
  const getChartDataForPeriod = () => {
    switch (reports.selectedPeriod) {
      case 'today':
        return [
          { name: '6AM', waitTime: 5.2, occupancy: 45, onTime: 98 },
          { name: '9AM', waitTime: 7.8, occupancy: 75, onTime: 95 },
          { name: '12PM', waitTime: 6.5, occupancy: 65, onTime: 97 },
          { name: '3PM', waitTime: 8.1, occupancy: 80, onTime: 94 },
          { name: '6PM', waitTime: 9.2, occupancy: 85, onTime: 92 },
          { name: '9PM', waitTime: 4.8, occupancy: 35, onTime: 99 },
        ];
      case 'month':
        return [
          { name: 'W1', waitTime: 8.2, occupancy: 68, onTime: 92 },
          { name: 'W2', waitTime: 7.9, occupancy: 71, onTime: 93 },
          { name: 'W3', waitTime: 8.8, occupancy: 74, onTime: 90 },
          { name: 'W4', waitTime: 8.1, occupancy: 69, onTime: 91 },
        ];
      default: // week
        return reports.chartData.daily;
    }
  };

  const currentChartData = getChartDataForPeriod();

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

      {/* Period Selection */}
      <View style={styles.reportCard}>
        <View style={styles.cardTitleContainer}>
          <View style={styles.cardIconContainer}>
            <Text style={styles.cardIcon}>📅</Text>
          </View>
          <Text style={styles.cardTitle}>Report Period</Text>
        </View>
        <View style={styles.periodSelector}>
          {['Today', 'Week', 'Month'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                reports.selectedPeriod === period.toLowerCase() && styles.periodButtonActive
              ]}
              onPress={() => setReports(prev => ({ ...prev, selectedPeriod: period.toLowerCase() }))}
            >
              <Text style={[
                styles.periodButtonText,
                reports.selectedPeriod === period.toLowerCase() && styles.periodButtonTextActive
              ]}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
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
            <Text style={styles.adminMetricValue}>{metrics.avgWaitTime}m</Text>
            <Text style={styles.adminMetricLabel}>Avg Wait</Text>
            <View style={styles.trendContainer}>
              <Text style={[styles.adminMetricTrend, styles.trendGood]}>↓ 12%</Text>
            </View>
          </View>
          
          <View style={{ flex: 1, backgroundColor: 'white', padding: 24, borderRadius: 20, alignItems: 'center', borderWidth: 2, borderColor: '#f1f5f9', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 8 }}>
            <View style={styles.metricIconContainer}>
              <Text style={styles.adminMetricIcon}>🚌</Text>
            </View>
            <Text style={styles.adminMetricValue}>{metrics.occupancyRate}%</Text>
            <Text style={styles.adminMetricLabel}>Utilization</Text>
            <View style={styles.trendContainer}>
              <Text style={[styles.adminMetricTrend, styles.trendGood]}>↑ 8%</Text>
            </View>
          </View>
          
          <View style={{ flex: 1, backgroundColor: 'white', padding: 24, borderRadius: 20, alignItems: 'center', borderWidth: 2, borderColor: '#f1f5f9', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 8 }}>
            <View style={styles.metricIconContainer}>
              <Text style={styles.adminMetricIcon}>🎯</Text>
            </View>
            <Text style={styles.adminMetricValue}>{metrics.onTimePerf}%</Text>
            <Text style={styles.adminMetricLabel}>On-Time</Text>
            <View style={styles.trendContainer}>
              <Text style={[styles.adminMetricTrend, styles.trendGood]}>↑ 5%</Text>
            </View>
          </View>
          
          <View style={{ flex: 1, backgroundColor: 'white', padding: 24, borderRadius: 20, alignItems: 'center', borderWidth: 2, borderColor: '#f1f5f9', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 8 }}>
            <View style={styles.metricIconContainer}>
              <Text style={styles.adminMetricIcon}>👥</Text>
            </View>
            <Text style={styles.adminMetricValue}>24.8K</Text>
            <Text style={styles.adminMetricLabel}>Passengers</Text>
            <View style={styles.trendContainer}>
              <Text style={[styles.adminMetricTrend, styles.trendGood]}>↑ 15%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Simple Performance Chart */}
      <View style={styles.reportCard}>
        <View style={styles.cardTitleContainer}>
          <View style={styles.cardIconContainer}>
            <Text style={styles.cardIcon}>📈</Text>
          </View>
          <Text style={styles.cardTitle}>Performance Trend (Last 7 Days)</Text>
        </View>
        <View style={styles.chartContainer}>
          <View style={styles.simpleChart}>
            {currentChartData.map((day, index) => {
              const performance = day.onTime;
              const isGood = performance >= 95;
              const isOk = performance >= 90;
              
              return (
                <View key={index} style={styles.chartColumn}>
                  <View style={styles.chartBar}>
                    <View 
                      style={[
                        styles.chartBarFill, 
                        { 
                          height: `${performance}%`,
                          backgroundColor: isGood ? '#16a34a' : isOk ? '#f59e0b' : '#dc2626'
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.chartLabel}>{day.name}</Text>
                  <View style={styles.chartValueContainer}>
                    <Text style={[styles.chartValue, {
                      color: isGood ? '#16a34a' : isOk ? '#f59e0b' : '#dc2626'
                    }]}>{performance}%</Text>
                  </View>
                </View>
              );
            })}
          </View>
          <Text style={styles.chartDescription}>
            {reports.selectedPeriod === 'today' ? 'On-time performance by hour' :
             reports.selectedPeriod === 'month' ? 'On-time performance by week' :
             'On-time performance by day'}
          </Text>
        </View>
        
        <View style={styles.chartLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, {backgroundColor: '#16a34a'}]} />
            <Text style={styles.legendText}>Excellent (95%+)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, {backgroundColor: '#f59e0b'}]} />
            <Text style={styles.legendText}>Good (90-95%)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, {backgroundColor: '#dc2626'}]} />
            <Text style={styles.legendText}>Needs Attention (90%)</Text>
          </View>
        </View>
      </View>

      {/* Wait Time Analysis */}
      <View style={styles.reportCard}>
        <View style={styles.cardTitleContainer}>
          <View style={styles.cardIconContainer}>
            <Text style={styles.cardIcon}>⏱️</Text>
          </View>
          <Text style={styles.cardTitle}>Wait Time Analysis</Text>
        </View>
        <View style={styles.chartContainer}>
          <View style={styles.waitTimeChart}>
            {currentChartData.map((day, index) => {
              const waitTime = day.waitTime;
              const barHeight = (waitTime / 10) * 100; // Max 10 minutes scale
              
              return (
                <View key={index} style={styles.waitTimeColumn}>
                  <View style={styles.waitTimeBar}>
                    <View 
                      style={[
                        styles.waitTimeBarFill, 
                        { 
                          height: `${Math.min(barHeight, 100)}%`,
                          backgroundColor: waitTime <= 7 ? '#16a34a' : waitTime <= 9 ? '#f59e0b' : '#dc2626'
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.chartLabel}>{day.name}</Text>
                  <View style={styles.waitTimeValueContainer}>
                    <Text style={styles.waitTimeValue}>{waitTime}m</Text>
                  </View>
                </View>
              );
            })}
          </View>
          <Text style={styles.chartDescription}>
            {reports.selectedPeriod === 'today' ? 'Average wait time by hour' :
             reports.selectedPeriod === 'month' ? 'Average wait time by week' :
             'Average passenger wait time by day'}
          </Text>
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

  // Period Selector
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  periodButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
  },
  periodButtonActive: {
    backgroundColor: '#dc2626',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 0.5,
  },
  periodButtonTextActive: {
    color: 'white',
  },

  // Admin Metrics
  adminMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  adminMetricCard: {
    width: (width - 86) / 2,
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    position: 'relative',
    overflow: 'hidden',
  },
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

  // Chart Container
  chartContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  // Simple Chart
  simpleChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  chartColumn: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: 20,
    height: 80,
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  chartBarFill: {
    borderRadius: 10,
    minHeight: 4,
  },
  chartLabel: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 6,
    fontWeight: '600',
  },
  chartValueContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  chartValue: {
    fontSize: 10,
    fontWeight: '700',
  },
  chartDescription: {
    textAlign: 'center',
    fontSize: 13,
    color: '#64748b',
    fontStyle: 'italic',
    fontWeight: '500',
  },

  // Chart Legend
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
  },

  // Wait Time Chart
  waitTimeChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: 12,
    paddingTop: 28,
    paddingBottom: 16,
    marginBottom: 20,
  },
  waitTimeColumn: {
    alignItems: 'center',
    flex: 1,
  },
  waitTimeBar: {
    width: 18,
    height: 60,
    backgroundColor: '#e2e8f0',
    borderRadius: 9,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  waitTimeBarFill: {
    borderRadius: 9,
    minHeight: 3,
  },
  waitTimeValueContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  waitTimeValue: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1e293b',
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