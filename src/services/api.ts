// Placeholder Axios API service layer – ready for future backend integration

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5678/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Attach auth token automatically
apiClient.interceptors.request.use(config => {
  const user = localStorage.getItem('hrms-user');
  if (user) {
    const parsed = JSON.parse(user);
    config.headers.Authorization = `Bearer ${parsed.id}`;
  }
  return config;
});

// ─── Employee Services ────────────────────────────────────
export const employeeService = {
  getAll: () => apiClient.get('/employees'),
  getById: (id: string) => apiClient.get(`/employees/${id}`),
  create: (data: object) => apiClient.post('/employees', data),
  update: (id: string, data: object) => apiClient.put(`/employees/${id}`, data),
  delete: (id: string) => apiClient.delete(`/employees/${id}`),
};

// ─── Department Services ──────────────────────────────────
export const departmentService = {
  getAll: () => apiClient.get('/departments'),
  getById: (id: string) => apiClient.get(`/departments/${id}`),
  create: (data: object) => apiClient.post('/departments', data),
  update: (id: string, data: object) => apiClient.put(`/departments/${id}`, data),
  delete: (id: string) => apiClient.delete(`/departments/${id}`),
};

// ─── Attendance Services ──────────────────────────────────
export const attendanceService = {
  getAll: () => apiClient.get('/attendance'),
  getByEmployee: (employeeId: string) => apiClient.get(`/attendance/employee/${employeeId}`),
  getByDate: (date: string) => apiClient.get(`/attendance/date/${date}`),
  checkIn: (employeeId: string) => apiClient.post('/attendance/check-in', { employeeId }),
  checkOut: (employeeId: string) => apiClient.post('/attendance/check-out', { employeeId }),
};

// ─── Performance Services ─────────────────────────────────
export const performanceService = {
  getAll: () => apiClient.get('/performance'),
  getByEmployee: (employeeId: string) => apiClient.get(`/performance/employee/${employeeId}`),
  create: (data: object) => apiClient.post('/performance', data),
  update: (id: string, data: object) => apiClient.put(`/performance/${id}`, data),
};

// ─── AI Prediction Services ───────────────────────────────
export const predictionService = {
  getAll: () => apiClient.get('/predictions'),
  getByEmployee: (employeeId: string) => apiClient.get(`/predictions/employee/${employeeId}`),
  predict: (employeeId: string, inputs: object) => apiClient.post('/predictions/predict', { employeeId, ...inputs }),
};

// ─── Auth Services ────────────────────────────────────────
export const authService = {
  login: (email: string, password: string, role: string) => apiClient.post('/auth/login', { email, password, role }),
  register: (name: string, email: string, password: string, role: string) => apiClient.post('/auth/register', { name, email, password, role }),
  logout: () => apiClient.post('/auth/logout'),
  me: () => apiClient.get('/auth/me'),
};

// ─── Analytics Services ───────────────────────────────────
export const analyticsService = {
  getDashboard: () => apiClient.get('/analytics/dashboard'),
  getEmployeeGrowth: () => apiClient.get('/analytics/employee-growth'),
  getAttendanceTrend: () => apiClient.get('/analytics/attendance-trend'),
  getPerformanceDistribution: () => apiClient.get('/analytics/performance-distribution'),
};

// ─── Notification Services ────────────────────────────────
export const notificationService = {
  getAll: () => apiClient.get('/notifications'),
  markRead: (id: string) => apiClient.patch(`/notifications/${id}/read`),
  markAllRead: () => apiClient.patch('/notifications/read-all'),
  delete: (id: string) => apiClient.delete(`/notifications/${id}`),
};

// ─── Report Services ──────────────────────────────────────
export const reportService = {
  getEmployeeReport: () => apiClient.get('/reports/employees'),
  getAttendanceReport: (month: string, year: string) => apiClient.get(`/reports/attendance?month=${month}&year=${year}`),
  getPerformanceReport: (period: string) => apiClient.get(`/reports/performance?period=${period}`),
  getPredictionReport: () => apiClient.get('/reports/predictions'),
  exportPDF: (reportType: string) => apiClient.post('/reports/export/pdf', { type: reportType }, { responseType: 'blob' }),
  exportExcel: (reportType: string) => apiClient.post('/reports/export/excel', { type: reportType }, { responseType: 'blob' }),
};

export default apiClient;
