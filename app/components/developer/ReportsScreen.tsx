// components/developer/ReportsScreen.tsx
import React from 'react';
import {
    Alert,
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
  onExportPDF: () => void;
}

export const ReportsScreen: React.FC<Props> = ({
  reports,
  setReports,
  onExportPDF
}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>📊 Advanced Analytics</Text>
        <Text style={styles.sectionSubtitle}>Comprehensive data analysis and insights</Text>
      </View>

      {/* Analytics Dashboard */}
      <View style={styles.reportCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>🔥 Usage Heatmap</Text>
          <TouchableOpacity style={styles.exportMiniButton}>
            <Text style={styles.exportMiniText}>Export</Text>
          </TouchableOpacity>
        </View>
        
        {/* Simple Heatmap Representation */}
        <View style={styles.heatmapContainer}>
          <View style={styles.heatmapHeader}>
            <Text style={styles.heatmapTitle}>Passenger Density by Hour & Day</Text>
          </View>
          <View style={styles.heatmapGrid}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dayIndex) => (
              <View key={day} style={styles.heatmapRow}>
                <Text style={styles.heatmapDayLabel}>{day}</Text>
                {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((hour) => {
                  const intensity = Math.random();
                  return (
                    <View 
                      key={hour} 
                      style={[
                        styles.heatmapCell,
                        { 
                          backgroundColor: intensity > 0.8 ? '#dc2626' : 
                                         intensity > 0.6 ? '#f97316' : 
                                         intensity > 0.4 ? '#eab308' : 
                                         intensity > 0.2 ? '#22c55e' : '#e5e7eb'
                        }
                      ]}
                    />
                  );
                })}
              </View>
            ))}
          </View>
          <View style={styles.heatmapLegend}>
            <Text style={styles.legendText}>Low</Text>
            <View style={styles.legendGradient}>
              {[0.1, 0.3, 0.5, 0.7, 0.9].map((intensity, i) => (
                <View 
                  key={i}
                  style={[
                    styles.legendColor,
                    { backgroundColor: intensity > 0.8 ? '#dc2626' : 
                                     intensity > 0.6 ? '#f97316' : 
                                     intensity > 0.4 ? '#eab308' : 
                                     intensity > 0.2 ? '#22c55e' : '#e5e7eb' }
                  ]}
                />
              ))}
            </View>
            <Text style={styles.legendText}>High</Text>
          </View>
        </View>
      </View>

      {/* Route Performance Analysis */}
      <View style={styles.reportCard}>
        <Text style={styles.cardTitle}>🚌 Route Performance Analysis</Text>
        <View style={styles.routeAnalysisContainer}>
          {reports.chartData.routeAnalysis.map((route, index) => (
            <View key={index} style={styles.routeAnalysisItem}>
              <View style={styles.routeInfo}>
                <Text style={styles.routeName}>{route.route}</Text>
                <Text style={styles.routePassengers}>{route.passengers.toLocaleString()} passengers</Text>
              </View>
              <View style={styles.routeMetrics}>
                <View style={styles.routeMetric}>
                  <Text style={styles.routeMetricValue}>{route.efficiency}%</Text>
                  <Text style={styles.routeMetricLabel}>Efficiency</Text>
                </View>
                <View style={styles.routeMetric}>
                  <Text style={styles.routeMetricValue}>₺{(route.revenue/1000).toFixed(1)}K</Text>
                  <Text style={styles.routeMetricLabel}>Revenue</Text>
                </View>
                <View style={styles.routeMetric}>
                  <Text style={styles.routeMetricValue}>{((route.passengers / 15420) * 100).toFixed(0)}%</Text>
                  <Text style={styles.routeMetricLabel}>Share</Text>
                </View>
              </View>
              <View style={styles.routeProgressBar}>
                <View 
                  style={[
                    styles.routeProgress, 
                    { width: `${route.efficiency}%` }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Multi-Chart Analysis */}
      <View style={styles.reportCard}>
        <Text style={styles.cardTitle}>📈 Performance Charts</Text>
        
        {/* Wait Time Trend */}
        <View style={styles.chartSection}>
          <Text style={styles.chartSectionTitle}>Average Wait Time Trend</Text>
          <View style={styles.lineChart}>
            {reports.chartData.daily.map((day, index) => (
              <View key={index} style={styles.lineChartPoint}>
                <View 
                  style={[
                    styles.lineChartDot,
                    { bottom: `${(day.waitTime / 10) * 100}%` }
                  ]}
                />
                <Text style={styles.lineChartLabel}>{day.name}</Text>
              </View>
            ))}
          </View>
          <View style={styles.chartStats}>
            <Text style={styles.chartStat}>Avg: 7.8 min</Text>
            <Text style={styles.chartStat}>Best: 6.2 min (Sun)</Text>
            <Text style={styles.chartStat}>Worst: 9.1 min (Fri)</Text>
          </View>
        </View>

        {/* Occupancy Analysis */}
        <View style={styles.chartSection}>
          <Text style={styles.chartSectionTitle}>Fleet Utilization</Text>
          <View style={styles.barChart}>
            {reports.chartData.daily.map((day, index) => (
              <View key={index} style={styles.barChartColumn}>
                <View 
                  style={[
                    styles.barChartBar,
                    { height: `${day.occupancy}%` }
                  ]}
                />
                <Text style={styles.barChartLabel}>{day.name}</Text>
                <Text style={styles.barChartValue}>{day.occupancy}%</Text>
              </View>
            ))}
          </View>
          <View style={styles.chartStats}>
            <Text style={styles.chartStat}>Avg: 66%</Text>
            <Text style={styles.chartStat}>Peak: 75% (Fri)</Text>
            <Text style={styles.chartStat}>Low: 52% (Sun)</Text>
          </View>
        </View>
      </View>

      {/* Performance Insights */}
      <View style={styles.insightsCard}>
        <Text style={styles.cardTitle}>💡 AI-Generated Insights</Text>
        <View style={styles.insightsList}>
          <View style={styles.insightItem}>
            <Text style={styles.insightIcon}>🔍</Text>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Peak Hour Optimization</Text>
              <Text style={styles.insightText}>
                Friday 17:00-18:00 shows highest overcrowding. Consider deploying 3 additional buses.
              </Text>
              <Text style={styles.insightImpact}>Impact: -23% wait time</Text>
            </View>
          </View>

          <View style={styles.insightItem}>
            <Text style={styles.insightIcon}>📊</Text>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Route Efficiency</Text>
              <Text style={styles.insightText}>
                Route 101 operates at 92% efficiency. Routes 103-105 could benefit from schedule adjustment.
              </Text>
              <Text style={styles.insightImpact}>Impact: +15% efficiency</Text>
            </View>
          </View>

          <View style={styles.insightItem}>
            <Text style={styles.insightIcon}>⚡</Text>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Cost Optimization</Text>
              <Text style={styles.insightText}>
                Weekend services show 48% lower utilization. Dynamic scheduling could reduce costs.
              </Text>
              <Text style={styles.insightImpact}>Impact: ₺85K/month savings</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Advanced Export Options */}
      <View style={styles.reportCard}>
        <Text style={styles.cardTitle}>📋 Export Options</Text>
        <View style={styles.exportGrid}>
          <TouchableOpacity 
            style={styles.exportOptionButton}
            onPress={onExportPDF}
          >
            <Text style={styles.exportOptionIcon}>📊</Text>
            <Text style={styles.exportOptionText}>Complete Analytics</Text>
            <Text style={styles.exportOptionDesc}>All charts & data</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.exportOptionButton}
            onPress={() => {
              Alert.alert('Export', 'Heatmap data exported to CSV');
            }}
          >
            <Text style={styles.exportOptionIcon}>🔥</Text>
            <Text style={styles.exportOptionText}>Heatmap Data</Text>
            <Text style={styles.exportOptionDesc}>CSV format</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.exportOptionButton}
            onPress={() => {
              Alert.alert('Export', 'Route analysis exported');
            }}
          >
            <Text style={styles.exportOptionIcon}>🚌</Text>
            <Text style={styles.exportOptionText}>Route Analysis</Text>
            <Text style={styles.exportOptionDesc}>Excel report</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.exportOptionButton}
            onPress={() => {
              Alert.alert('Export', 'Custom dashboard configured');
            }}
          >
            <Text style={styles.exportOptionIcon}>⚙️</Text>
            <Text style={styles.exportOptionText}>Custom Report</Text>
            <Text style={styles.exportOptionDesc}>Configure metrics</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Real-time Monitoring */}
      <View style={styles.monitoringCard}>
        <Text style={styles.cardTitle}>📡 Real-time Monitoring</Text>
        <View style={styles.monitoringGrid}>
          <View style={styles.monitoringItem}>
            <Text style={styles.monitoringIcon}>📍</Text>
            <Text style={styles.monitoringValue}>245</Text>
            <Text style={styles.monitoringLabel}>Active Stops</Text>
            <Text style={styles.monitoringStatus}>Operational</Text>
          </View>

          <View style={styles.monitoringItem}>
            <Text style={styles.monitoringIcon}>👥</Text>
            <Text style={styles.monitoringValue}>8.2K</Text>
            <Text style={styles.monitoringLabel}>Current Passengers</Text>
            <Text style={styles.monitoringStatus}>Normal</Text>
          </View>

          <View style={styles.monitoringItem}>
            <Text style={styles.monitoringIcon}>⚠️</Text>
            <Text style={styles.monitoringValue}>3</Text>
            <Text style={styles.monitoringLabel}>Alerts</Text>
            <Text style={[styles.monitoringStatus, styles.alertStatus]}>Attention</Text>
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
    marginBottom: 20,
  },
  exportMiniButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  exportMiniText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Heatmap Styles
  heatmapContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 20,
    marginTop: 15,
  },
  heatmapHeader: {
    marginBottom: 15,
  },
  heatmapTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
  },
  heatmapGrid: {
    marginBottom: 15,
  },
  heatmapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  heatmapDayLabel: {
    width: 40,
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  heatmapCell: {
    width: 16,
    height: 16,
    marginRight: 2,
    borderRadius: 2,
  },
  heatmapLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendText: {
    fontSize: 12,
    color: '#64748b',
    marginHorizontal: 8,
  },
  legendGradient: {
    flexDirection: 'row',
  },
  legendColor: {
    width: 12,
    height: 12,
    marginHorizontal: 1,
    borderRadius: 2,
  },

  // Route Analysis
  routeAnalysisContainer: {
    marginTop: 15,
  },
  routeAnalysisItem: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#dc2626',
  },
  routeInfo: {
    marginBottom: 10,
  },
  routeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
  },
  routePassengers: {
    fontSize: 14,
    color: '#64748b',
  },
  routeMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  routeMetric: {
    alignItems: 'center',
  },
  routeMetricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  routeMetricLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  routeProgressBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  routeProgress: {
    height: '100%',
    backgroundColor: '#16a34a',
    borderRadius: 3,
  },

  // Chart Sections
  chartSection: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
  },
  chartSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 15,
    textAlign: 'center',
  },

  // Line Chart
  lineChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 100,
    position: 'relative',
    marginBottom: 15,
  },
  lineChartPoint: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  lineChartDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#dc2626',
    position: 'absolute',
  },
  lineChartLabel: {
    fontSize: 10,
    color: '#64748b',
    position: 'absolute',
    bottom: -20,
  },

  // Bar Chart
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 15,
  },
  barChartColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barChartBar: {
    width: 20,
    backgroundColor: '#dc2626',
    borderRadius: 10,
    marginBottom: 8,
  },
  barChartLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 4,
  },
  barChartValue: {
    fontSize: 10,
    fontWeight: '600',
    color: '#dc2626',
    marginTop: 2,
  },

  // Chart Stats
  chartStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  chartStat: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
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
    marginTop: 15,
  },
  insightItem: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  insightIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 5,
  },
  insightText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 8,
  },
  insightImpact: {
    fontSize: 12,
    color: '#16a34a',
    fontWeight: '600',
  },

  // Export Options
  exportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  exportOptionButton: {
    width: (width - 80) / 2,
    backgroundColor: '#f1f5f9',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  exportOptionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  exportOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
  },
  exportOptionDesc: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },

  // Real-time Monitoring
  monitoringCard: {
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
    borderLeftColor: '#16a34a',
    marginBottom: 30,
  },
  monitoringGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  monitoringItem: {
    width: (width - 80) / 2,
    backgroundColor: '#f0fdf4',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  monitoringIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  monitoringValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 5,
  },
  monitoringLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 5,
  },
  monitoringStatus: {
    fontSize: 10,
    color: '#16a34a',
    fontWeight: '600',
    textTransform: 'uppercase',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  alertStatus: {
    color: '#dc2626',
    backgroundColor: '#fee2e2',
  },
});