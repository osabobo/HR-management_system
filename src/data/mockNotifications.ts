export interface Notification {
  id: string;
  type: 'review_reminder' | 'attendance_alert' | 'promotion_recommendation' | 'ai_prediction_ready' | 'system' | 'message';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  avatar?: string;
  employeeId?: string;
}

export const mockNotifications: Notification[] = [
  { id: 'N001', type: 'ai_prediction_ready', title: 'AI Predictions Ready', message: '5 new employee performance predictions have been generated for Q3 2025.', timestamp: '2025-07-03T08:30:00', read: false, priority: 'high' },
  { id: 'N002', type: 'review_reminder', title: 'Performance Review Due', message: 'Ibrahim Musa\'s Q2 performance review is overdue. Please complete within 48 hours.', timestamp: '2025-07-03T07:15:00', read: false, priority: 'high', avatar: 'IM', employeeId: 'EMP006' },
  { id: 'N003', type: 'promotion_recommendation', title: 'Promotion Recommendation', message: 'AI system recommends Adaeze Okonkwo for promotion based on Q2 performance data.', timestamp: '2025-07-02T16:45:00', read: false, priority: 'medium', avatar: 'AO', employeeId: 'EMP001' },
  { id: 'N004', type: 'attendance_alert', title: 'Attendance Alert', message: 'Tunde Bakare has been absent for 4 consecutive days without prior notification.', timestamp: '2025-07-02T09:00:00', read: true, priority: 'high', avatar: 'TB', employeeId: 'EMP014' },
  { id: 'N005', type: 'system', title: 'System Update', message: 'AI-HRMS has been updated to v2.1.0. New features include improved prediction accuracy and dashboard widgets.', timestamp: '2025-07-01T23:00:00', read: true, priority: 'low' },
  { id: 'N006', type: 'review_reminder', title: 'Upcoming Annual Reviews', message: '8 employees are due for their annual performance review in the next 30 days.', timestamp: '2025-07-01T10:00:00', read: true, priority: 'medium' },
  { id: 'N007', type: 'message', title: 'New Message from HR', message: 'Fatima Al-Amin has sent you an update regarding the Q3 staffing plan.', timestamp: '2025-06-30T14:20:00', read: true, priority: 'medium', avatar: 'FA', employeeId: 'EMP003' },
  { id: 'N008', type: 'attendance_alert', title: 'Late Arrivals Report', message: '3 employees recorded late arrivals today. Check attendance dashboard for details.', timestamp: '2025-06-30T09:30:00', read: true, priority: 'low' },
  { id: 'N009', type: 'promotion_recommendation', title: 'Retention Risk Detected', message: 'Bola Fashola shows high flight risk signals. Consider compensation review.', timestamp: '2025-06-29T11:00:00', read: true, priority: 'high', avatar: 'BF', employeeId: 'EMP019' },
  { id: 'N010', type: 'system', title: 'Monthly Report Available', message: 'The June 2025 HR analytics report is now available for download.', timestamp: '2025-06-28T08:00:00', read: true, priority: 'low' },
];
