// services/export/pdfExporter.ts
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert, Platform } from 'react-native';
import { ForecastingState, Metrics, OptimizationState, SimulationState, UploadedFile } from '../../types/app';
import { User } from '../../types/auth';

interface ExportData {
  user: User;
  metrics: Metrics;
  uploadedFiles: UploadedFile[];
  optimization: OptimizationState;
  simulation: SimulationState;
  forecasting: ForecastingState;
}

export class PDFExporter {
  // Developer için detaylı rapor
  static async exportToPDF(data: ExportData) {
    try {
      const htmlContent = this.generateHTML(data);
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Success', 'PDF generated successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF');
    }
  }

  // Admin için basit rapor
  static async exportAdminReport(data: { user: User; metrics: Metrics; uploadedFiles: UploadedFile[] }) {
    try {
      const htmlContent = this.generateAdminHTML(data);
      const { uri } = await Print.printToFileAsync({ 
        html: htmlContent,
        width: 612,
        height: 792,
        base64: false
      });
      
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Share Admin Transit Report',
          UTI: 'com.adobe.pdf'
        });
      } else {
        Alert.alert('Success', 'Admin report generated successfully!');
      }
    } catch (error) {
      console.error('Error generating admin report:', error);
      Alert.alert('Error', 'Failed to generate admin report. Please try again.');
    }
  }

  // Haftalık özet rapor
  static async exportSimpleReport(data: { user: User; metrics: Metrics; uploadedFiles: UploadedFile[] }) {
    try {
      const htmlContent = this.generateSimpleHTML(data);
      const { uri } = await Print.printToFileAsync({ 
        html: htmlContent,
        width: 612,
        height: 792,
        base64: false
      });
      
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Share Weekly Transit Report',
          UTI: 'com.adobe.pdf'
        });
      } else {
        Alert.alert('Success', 'Weekly summary report generated successfully!');
      }
    } catch (error) {
      console.error('Error generating simple report:', error);
      Alert.alert('Error', 'Failed to generate weekly summary report. Please try again.');
    }
  }

  // Developer için detaylı HTML
  private static generateHTML(data: ExportData): string {
    const { user, metrics, uploadedFiles, optimization, simulation, forecasting } = data;
    
    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; color: #dc2626; margin-bottom: 30px; }
            .section { margin-bottom: 20px; }
            .metric { display: inline-block; margin: 10px; padding: 10px; border: 1px solid #ddd; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🚍 UA3 Transit Optimization Report</h1>
            <p>Generated: ${new Date().toLocaleString()}</p>
            <p>User: ${user.username} (${user.role})</p>
          </div>
          
          <div class="section">
            <h2>📊 System Metrics</h2>
            <div class="metric">
              <strong>Average Wait Time:</strong> ${metrics.avgWaitTime} minutes
            </div>
            <div class="metric">
              <strong>Fleet Utilization:</strong> ${metrics.occupancyRate}%
            </div>
            <div class="metric">
              <strong>On-Time Performance:</strong> ${metrics.onTimePerf}%
            </div>
            <div class="metric">
              <strong>Overcrowding Rate:</strong> ${metrics.overcrowdingRate}%
            </div>
          </div>

          <div class="section">
            <h2>📁 Uploaded Files (${uploadedFiles.length})</h2>
            <table>
              <tr>
                <th>File Name</th>
                <th>Size (MB)</th>
                <th>Rows</th>
                <th>Upload Time</th>
              </tr>
              ${uploadedFiles.map(file => `
                <tr>
                  <td>${file.name}</td>
                  <td>${file.size}</td>
                  <td>${file.rows?.toLocaleString()}</td>
                  <td>${new Date(file.uploadTime).toLocaleString()}</td>
                </tr>
              `).join('')}
            </table>
          </div>

          <div class="section">
            <h2>🧬 Optimization Results</h2>
            <p><strong>Population Size:</strong> ${optimization.populationSize}</p>
            <p><strong>Max Generations:</strong> ${optimization.maxGenerations}</p>
            <p><strong>Current Generation:</strong> ${optimization.generation}</p>
            <p><strong>Mutation Rate:</strong> ${optimization.mutationRate}</p>
          </div>

          <div class="section">
            <h2>🎯 Simulation Results</h2>
            <p><strong>Total Passengers:</strong> ${simulation.results.totalPassengers.toLocaleString()}</p>
            <p><strong>Bus Assignments:</strong> ${simulation.results.busAssignments.toLocaleString()}</p>
            <p><strong>Stop Utilization:</strong> ${simulation.results.stopUtilization}%</p>
            <p><strong>Max Occupancy:</strong> ${simulation.results.maxOccupancy}%</p>
          </div>

          <div class="section">
            <h2>📈 Forecasting Results</h2>
            <p><strong>Prophet Accuracy:</strong> ${forecasting.prophetAccuracy.toFixed(1)}%</p>
            <p><strong>LSTM Accuracy:</strong> ${forecasting.lstmAccuracy.toFixed(1)}%</p>
            <p><strong>Next Week Passengers:</strong> ${forecasting.results.nextWeekPassengers.toLocaleString()}</p>
            <p><strong>Peak Hour:</strong> ${forecasting.results.peakHour}</p>
            <p><strong>Busiest Route:</strong> ${forecasting.results.busiestRoute}</p>
          </div>
        </body>
      </html>
    `;
  }

  // Admin için basit HTML
  private static generateAdminHTML(data: { user: User; metrics: Metrics; uploadedFiles: UploadedFile[] }): string {
    const { user, metrics, uploadedFiles } = data;
    
    return `
      <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              color: #333; 
              line-height: 1.6;
            }
            .header { 
              text-align: center; 
              color: #dc2626; 
              margin-bottom: 30px; 
              border-bottom: 3px solid #dc2626; 
              padding-bottom: 20px; 
            }
            .logo { font-size: 48px; margin-bottom: 10px; }
            .summary-card { 
              background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); 
              padding: 25px; 
              margin: 20px 0; 
              border-radius: 12px; 
              border-left: 6px solid #dc2626; 
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .metrics-grid { 
              display: grid; 
              grid-template-columns: repeat(2, 1fr); 
              gap: 20px; 
              margin: 20px 0; 
            }
            .metric-card { 
              background: white; 
              padding: 20px; 
              border-radius: 10px; 
              text-align: center; 
              border: 2px solid #fecaca;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            }
            .metric-value { 
              font-size: 32px; 
              font-weight: bold; 
              color: #dc2626; 
              display: block; 
              margin-bottom: 8px;
            }
            .metric-label { 
              color: #666; 
              font-size: 14px; 
              text-transform: uppercase; 
              letter-spacing: 1px;
              font-weight: 600;
            }
            .status-section {
              background: #f0f9ff;
              padding: 20px;
              border-radius: 10px;
              margin: 20px 0;
              border-left: 4px solid #3b82f6;
            }
            .status-item {
              display: flex;
              justify-content: space-between;
              margin: 10px 0;
              padding: 10px;
              background: white;
              border-radius: 5px;
            }
            .status-good { color: #16a34a; font-weight: bold; }
            .status-warning { color: #f59e0b; font-weight: bold; }
            .status-poor { color: #dc2626; font-weight: bold; }
            .footer { 
              text-align: center; 
              margin-top: 40px; 
              padding-top: 20px; 
              border-top: 2px solid #e2e8f0; 
              color: #64748b;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">🚍</div>
            <h1>UA3 Transit System</h1>
            <h2>Administrator Performance Report</h2>
            <p><strong>Report Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Generated by:</strong> ${user.username} (Administrator)</p>
          </div>
          
          <div class="summary-card">
            <h2>📊 System Performance Overview</h2>
            <p>This report provides a clear overview of transit system performance for administrators. All metrics are updated in real-time to ensure accurate decision-making.</p>
          </div>

          <div class="metrics-grid">
            <div class="metric-card">
              <span class="metric-value">${metrics.avgWaitTime}</span>
              <div class="metric-label">Minutes Average Wait</div>
            </div>
            <div class="metric-card">
              <span class="metric-value">${metrics.occupancyRate}%</span>
              <div class="metric-label">Fleet Utilization</div>
            </div>
            <div class="metric-card">
              <span class="metric-value">${metrics.onTimePerf}%</span>
              <div class="metric-label">On-Time Performance</div>
            </div>
            <div class="metric-card">
              <span class="metric-value">${uploadedFiles.length}</span>
              <div class="metric-label">Data Files Processed</div>
            </div>
          </div>

          <div class="status-section">
            <h3>🎯 Performance Status</h3>
            <div class="status-item">
              <span>Wait Time Status:</span>
              <span class="${metrics.avgWaitTime < 7 ? 'status-good' : metrics.avgWaitTime < 9 ? 'status-warning' : 'status-poor'}">
                ${metrics.avgWaitTime < 7 ? 'Excellent' : 
                  metrics.avgWaitTime < 9 ? 'Good' : 
                  'Needs Attention'}
              </span>
            </div>
            <div class="status-item">
              <span>Fleet Efficiency:</span>
              <span class="${metrics.occupancyRate > 75 ? 'status-warning' : metrics.occupancyRate > 60 ? 'status-good' : 'status-poor'}">
                ${metrics.occupancyRate > 75 ? 'High Utilization' : 
                  metrics.occupancyRate > 60 ? 'Optimal Range' : 
                  'Low Utilization'}
              </span>
            </div>
            <div class="status-item">
              <span>Overall System Health:</span>
              <span class="${metrics.onTimePerf > 90 && metrics.avgWaitTime < 8 ? 'status-good' : 'status-warning'}">
                ${metrics.onTimePerf > 90 && metrics.avgWaitTime < 8 ? 'Healthy' : 'Monitor Required'}
              </span>
            </div>
          </div>

          <div class="footer">
            <p><strong>EGO Ankara Transportation Authority</strong></p>
            <p>UA3 Transit Optimization System</p>
            <p>This report was automatically generated for administrative review.</p>
          </div>
        </body>
      </html>
    `;
  }

  // Haftalık özet HTML
  private static generateSimpleHTML(data: { user: User; metrics: Metrics; uploadedFiles: UploadedFile[] }): string {
    const { user, metrics, uploadedFiles } = data;
    
    return `
      <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              color: #333; 
              line-height: 1.6;
            }
            .header { 
              text-align: center; 
              color: #dc2626; 
              margin-bottom: 30px; 
              border-bottom: 3px solid #dc2626; 
              padding-bottom: 20px; 
            }
            .logo { font-size: 48px; margin-bottom: 10px; }
            .summary-card { 
              background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); 
              padding: 25px; 
              margin: 20px 0; 
              border-radius: 12px; 
              border-left: 6px solid #dc2626; 
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .metrics-grid { 
              display: grid; 
              grid-template-columns: repeat(2, 1fr); 
              gap: 20px; 
              margin: 20px 0; 
            }
            .metric-card { 
              background: white; 
              padding: 20px; 
              border-radius: 10px; 
              text-align: center; 
              border: 2px solid #fecaca;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            }
            .metric-value { 
              font-size: 32px; 
              font-weight: bold; 
              color: #dc2626; 
              display: block; 
              margin-bottom: 8px;
            }
            .metric-label { 
              color: #666; 
              font-size: 14px; 
              text-transform: uppercase; 
              letter-spacing: 1px;
              font-weight: 600;
            }
            .insights { 
              background: #f0f9ff; 
              padding: 20px; 
              border-radius: 10px; 
              margin: 20px 0; 
              border-left: 4px solid #0ea5e9;
            }
            .insights h3 { 
              color: #0369a1; 
              margin-top: 0; 
            }
            .footer { 
              text-align: center; 
              margin-top: 40px; 
              padding-top: 20px; 
              border-top: 2px solid #e2e8f0; 
              color: #64748b;
            }
            .status-good { color: #16a34a; font-weight: bold; }
            .status-warning { color: #f59e0b; font-weight: bold; }
            .status-poor { color: #dc2626; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">🚍</div>
            <h1>UA3 Transit Optimization</h1>
            <h2>Weekly Performance Summary</h2>
            <p><strong>Report Period:</strong> ${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()} - ${new Date().toLocaleDateString()}</p>
            <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Administrator:</strong> ${user.username}</p>
          </div>
          
          <div class="summary-card">
            <h2>📊 Executive Summary</h2>
            <p>This report provides a comprehensive overview of transit system performance over the past week. Key performance indicators show ${metrics.onTimePerf > 95 ? 'excellent' : metrics.onTimePerf > 90 ? 'good' : 'improvable'} system operation with ${metrics.avgWaitTime < 8 ? 'acceptable' : 'elevated'} passenger wait times.</p>
          </div>

          <div class="metrics-grid">
            <div class="metric-card">
              <span class="metric-value">${metrics.avgWaitTime}</span>
              <div class="metric-label">Minutes Average Wait</div>
            </div>
            <div class="metric-card">
              <span class="metric-value">${metrics.occupancyRate}%</span>
              <div class="metric-label">Fleet Utilization</div>
            </div>
            <div class="metric-card">
              <span class="metric-value">${metrics.onTimePerf}%</span>
              <div class="metric-label">On-Time Performance</div>
            </div>
            <div class="metric-card">
              <span class="metric-value">${metrics.overcrowdingRate}%</span>
              <div class="metric-label">Overcrowding Rate</div>
            </div>
          </div>

          <div class="insights">
            <h3>💡 Key Performance Insights</h3>
            <ul>
              <li><strong>Wait Time Status:</strong> 
                <span class="${metrics.avgWaitTime < 7 ? 'status-good' : metrics.avgWaitTime < 9 ? 'status-warning' : 'status-poor'}">
                  ${metrics.avgWaitTime < 7 ? 'Excellent - Below 7 minutes' : 
                    metrics.avgWaitTime < 9 ? 'Good - Within acceptable range' : 
                    'Needs Attention - Above target threshold'}
                </span>
              </li>
              <li><strong>Fleet Efficiency:</strong> 
                <span class="${metrics.occupancyRate > 75 ? 'status-warning' : metrics.occupancyRate > 60 ? 'status-good' : 'status-poor'}">
                  ${metrics.occupancyRate > 75 ? 'High utilization - Monitor capacity' : 
                    metrics.occupancyRate > 60 ? 'Optimal utilization range' : 
                    'Low utilization - Consider route optimization'}
                </span>
              </li>
            </ul>
          </div>

          <div class="footer">
            <p><strong>EGO Ankara Transportation Authority</strong></p>
            <p>UA3 Transit Optimization System • Automated Report Generation</p>
          </div>
        </body>
      </html>
    `;
  }
}