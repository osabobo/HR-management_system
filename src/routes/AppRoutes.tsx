import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';

import DashboardPage from '../pages/dashboard/DashboardPage';
import EmployeeListPage from '../pages/employees/EmployeeListPage';
import EmployeeDetailPage from '../pages/employees/EmployeeDetailPage';
import AddEmployeePage from '../pages/employees/AddEmployeePage';
import DepartmentsPage from '../pages/departments/DepartmentsPage';
import AttendancePage from '../pages/attendance/AttendancePage';
import PerformancePage from '../pages/performance/PerformancePage';
import AIPredictionPage from '../pages/ai/AIPredictionPage';
import AnalyticsPage from '../pages/analytics/AnalyticsPage';
import ReportsPage from '../pages/reports/ReportsPage';
import NotificationsPage from '../pages/notifications/NotificationsPage';
import SettingsPage from '../pages/settings/SettingsPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

const AdminHRRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user?.role !== 'Employee' ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route element={<PublicRoute><AuthLayout /></PublicRoute>}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* App routes */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/employees" element={<AdminHRRoute><EmployeeListPage /></AdminHRRoute>} />
          <Route path="/employees/:id" element={<AdminHRRoute><EmployeeDetailPage /></AdminHRRoute>} />
          <Route path="/employees/new" element={<AdminHRRoute><AddEmployeePage /></AdminHRRoute>} />
          <Route path="/departments" element={<AdminHRRoute><DepartmentsPage /></AdminHRRoute>} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/performance" element={<AdminHRRoute><PerformancePage /></AdminHRRoute>} />
          <Route path="/ai-prediction" element={<AdminHRRoute><AIPredictionPage /></AdminHRRoute>} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/reports" element={<AdminHRRoute><ReportsPage /></AdminHRRoute>} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
