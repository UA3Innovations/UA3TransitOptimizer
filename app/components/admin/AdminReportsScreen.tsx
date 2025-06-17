// components/admin/AdminReportsScreen.tsx
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Metrics, ReportsState, UploadedFile } from '../../types/app';
import { User } from '../../types/auth';

const { width } = Dimensions.get('window');

interface Props {
  reports: ReportsState;
  setReports: (value: ReportsState | ((prev: ReportsState) => ReportsState)) => void;
  metrics: Metrics;
  uploadedFiles: UploadedFile[];
  user: User;
}

export const AdminReportsScreen: React.FC<Props> = ({
  reports,
  setReports,
  metrics,
  uploadedFiles,
  user
}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>📋 Performance Reports</Text>
        <Text style={styles.sectionSubtitle}>Simple analytics and insights for administrators</Text>
      </View>

      {/* Period Selection */}
      <View style={styles.reportCard}>
        <Text style={styles.cardTitle}>📅 Report Period</Text>
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
        <Text style={styles.cardTitle}>🎯 Performance Summary</Text>
        <View style={styles.adminMetricsGrid}>
          <View style={styles.adminMetricCard}>
            <Text style={styles.adminMetricIcon}>⏱️</Text>
            <Text style={styles.adminMetricValue}>{metrics.avgWaitTime}m</Text>
            <Text style={styles.adminMetricLabel}>Avg Wait</Text>
            <Text style={[styles.adminMetricTrend, styles.trendGood]}>↓ 12%</Text>
          </View>
          
          <View style={styles.adminMetricCard}>
            <Text style={styles.adminMetricIcon}>🚌</Text>
            <Text style={styles.adminMetricValue}>{metrics.occupancyRate}%</Text>
            <Text style={styles.adminMetricLabel}>Utilization</Text>
            <Text style={[styles.adminMetricTrend, styles.trendGood]}>↑ 8%</Text>
          </View>
          
          <View style={styles.adminMetricCard}>
            <Text style={styles.adminMetricIcon}>🎯</Text>
            <Text style={styles.adminMetricValue}>{metrics.onTimePerf}%</Text>
            <Text style={styles.adminMetricLabel}>On-Time</Text>
            <Text style={[styles.adminMetricTrend, styles.trendGood]}>↑ 5%</Text>
          </View>
          
          <View style={styles.adminMetricCard}>
            <Text style={styles.adminMetricIcon}>👥</Text>
            <Text style={styles.adminMetricValue}>24.8K</Text>
            <Text style={styles.adminMetricLabel}>Passengers</Text>
            <Text style={[styles.adminMetricTrend, styles.trendGood]}>↑ 15%</Text>
          </View>
        </View>
      </View>

      {/* Simple Performance Chart */}
      <View style={styles.reportCard}>
        <Text style={styles.cardTitle}>📈 Performance Trend (Last 7 Days)</Text>
        <View style={styles.simpleChart}>
          {reports.chartData.daily.map((day, index) => {
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
                <Text style={[styles.chartValue, {
                  color: isGood ? '#16a34a' : isOk ? '#f59e0b' : '#dc2626'
                }]}>{performance}%</Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.chartDescription}>On-time performance by day</Text>
        
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
        <Text style={styles.cardTitle}>⏱️ Wait Time Analysis</Text>
        <View style={styles.waitTimeChart}>
          {reports.chartData.daily.map((day, index) => {
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
                <Text style={styles.waitTimeValue}>{waitTime}m</Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.chartDescription}>Average passenger wait time by day</Text>
      </View>

      {/* Key Insights */}
      <View style={styles.insightsCard}>
        <Text style={styles.cardTitle}>💡 Key Insights</Text>
        <View style={styles.insightsList}>
          <View style={styles.insightItem}>
            <Text style={styles.insightIcon}>
              {metrics.onTimePerf >= 95 ? '✅' : metrics.onTimePerf >= 90 ? '⚠️' : '❌'}
            </Text>
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
            <Text style={styles.insightIcon}>
              {metrics.avgWaitTime <= 7 ? '✅' : metrics.avgWaitTime <= 9 ? '⚠️' : '❌'}
            </Text>
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
            <Text style={styles.insightIcon}>
              {metrics.occupancyRate >= 60 && metrics.occupancyRate <= 75 ? '✅' : '⚠️'}
            </Text>
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

      {/* Quick Actions */}
      <View style={styles.reportCard}>
        <Text style={styles.cardTitle}>🚀 Quick Actions</Text>
        <View style={styles.quickReportActions}>
          <TouchableOpacity 
            style={styles.reportActionButton}
            onPress={async () => {
              setReports(prev => ({ ...prev, isGenerating: true }));
              await new Promise(resolve => setTimeout(resolve, 1500));
              setReports(prev => ({ ...prev, isGenerating: false }));
            }}
          >
            <Text style={styles.reportActionIcon}>📊</Text>
            <Text style={styles.reportActionText}>Weekly Summary</Text>
            <Text style={styles.reportActionDesc}>Comprehensive report</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.reportActionButton}
            onPress={async () => {
              setReports(prev => ({ ...prev, isGenerating: true }));
              await new Promise(resolve => setTimeout(resolve, 1000));
              setReports(prev => ({ ...prev, isGenerating: false }));
              
              // Quick daily report
              const dailyReport = `Daily Transit Report - ${new Date().toLocaleDateString()}
              
Average Wait Time: ${metrics.avgWaitTime} minutes
Fleet Utilization: ${metrics.occupancyRate}%
On-Time Performance: ${metrics.onTimePerf}%
Files Processed: ${uploadedFiles.length}

Status: ${metrics.onTimePerf >= 95 ? 'Excellent' : metrics.onTimePerf >= 90 ? 'Good' : 'Needs Attention'}`;
              
              console.log('Daily report generated:', dailyReport);
            }}
          >
            <Text style={styles.reportActionIcon}>📅</Text>
            <Text style={styles.reportActionText}>Daily Report</Text>
            <Text style={styles.reportActionDesc}>Quick overview</Text>
          </TouchableOpacity>
        </View>
        
        {reports.isGenerating && (
          <View style={styles.reportGenerating}>
            <ActivityIndicator color="#dc2626" />
            <Text style={styles.reportGeneratingText}>Generating report...</Text>
          </View>
        )}
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
    padding: 25,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
    borderLeftWidth: 6,
    borderLeftColor: '#dc2626',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  reportCard: {
    backgroundColor: 'white',
    margin: 15,
    padding: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
    borderLeftWidth: 6,
    borderLeftColor: '#dc2626',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },

  // Period Selector
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: '#dc2626',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  periodButtonTextActive: {
    color: 'white',
  },

  // Admin Metrics
  adminMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  adminMetricCard: {
    width: (width - 80) / 2,
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  adminMetricIcon: {
    fontSize: 28,
    marginBottom: 10,
  },
  adminMetricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 5,
  },
  adminMetricLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
  },
  adminMetricTrend: {
    fontSize: 12,
    fontWeight: '600',
  },
  trendGood: {
    color: '#16a34a',
  },
  trendBad: {
    color: '#dc2626',
  },

  // Simple Chart
  simpleChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  chartColumn: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: 24,
    height: 100,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  chartBarFill: {
    borderRadius: 12,
    minHeight: 8,
  },
  chartLabel: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 6,
    fontWeight: '500',
  },
  chartValue: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  chartDescription: {
    textAlign: 'center',
    fontSize: 13,
    color: '#64748b',
    fontStyle: 'italic',
    marginBottom: 15,
  },

  // Chart Legend
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
  },

  // Wait Time Chart
  waitTimeChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  waitTimeColumn: {
    alignItems: 'center',
    flex: 1,
  },
  waitTimeBar: {
    width: 22,
    height: 80,
    backgroundColor: '#f1f5f9',
    borderRadius: 11,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  waitTimeBarFill: {
    borderRadius: 11,
    minHeight: 6,
  },
  waitTimeValue: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    color: '#333',
  },

  // Insights
  insightsCard: {
    backgroundColor: 'white',
    margin: 15,
    padding: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
    borderLeftWidth: 6,
    borderLeftColor: '#3b82f6',
  },
  insightsList: {
    marginTop: 10,
  },
  insightItem: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  insightIcon: {
    fontSize: 24,
    marginRight: 15,
    marginTop: 2,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  insightText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },

  // Quick Report Actions
  quickReportActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  reportActionButton: {
    flex: 1,
    backgroundColor: '#16a34a',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  reportActionIcon: {
    fontSize: 28,
    marginBottom: 8,
    color: 'white',
  },
  reportActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  reportActionDesc: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'center',
  },
  reportGenerating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fee2e2',
    borderRadius: 10,
  },
  reportGeneratingText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#dc2626',
    fontWeight: '500',
  },
});