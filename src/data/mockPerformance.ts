export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  reviewPeriod: string;
  reviewDate: string;
  reviewedBy: string;
  productivity: number;
  teamwork: number;
  leadership: number;
  communication: number;
  innovation: number;
  discipline: number;
  overallScore: number;
  status: 'Completed' | 'Pending' | 'Overdue';
  comments: string;
  recommendation: 'Promote' | 'Retain' | 'Warn' | 'Dismiss';
}

export const mockPerformance: PerformanceReview[] = [
  { id: 'PR001', employeeId: 'EMP001', employeeName: 'Adaeze Okonkwo', department: 'Engineering', reviewPeriod: 'Q2 2025', reviewDate: '2025-06-30', reviewedBy: 'Chukwuemeka Nwosu', productivity: 95, teamwork: 90, leadership: 88, communication: 92, innovation: 94, discipline: 93, overallScore: 92, status: 'Completed', comments: 'Excellent performance across all KPIs. Led the migration project that reduced downtime by 40%.', recommendation: 'Promote' },
  { id: 'PR002', employeeId: 'EMP002', employeeName: 'Chukwuemeka Nwosu', department: 'Engineering', reviewPeriod: 'Q2 2025', reviewDate: '2025-06-28', reviewedBy: 'CEO', productivity: 88, teamwork: 92, leadership: 95, communication: 90, innovation: 85, discipline: 88, overallScore: 90, status: 'Completed', comments: 'Consistent delivery and strong team leadership. Pipeline reliability improved by 28%.', recommendation: 'Retain' },
  { id: 'PR003', employeeId: 'EMP003', employeeName: 'Fatima Al-Amin', department: 'Human Resources', reviewPeriod: 'Q2 2025', reviewDate: '2025-06-30', reviewedBy: 'CEO', productivity: 96, teamwork: 94, leadership: 90, communication: 98, innovation: 92, discipline: 95, overallScore: 94, status: 'Completed', comments: 'Spearheaded the new onboarding programme. Reduced time-to-hire by 22%.', recommendation: 'Promote' },
  { id: 'PR004', employeeId: 'EMP004', employeeName: 'Babatunde Adeleke', department: 'Sales', reviewPeriod: 'Q2 2025', reviewDate: '2025-06-30', reviewedBy: 'Ngozi Eze', productivity: 72, teamwork: 78, leadership: 62, communication: 80, innovation: 70, discipline: 75, overallScore: 73, status: 'Completed', comments: 'Missed quarterly targets by 15%. Needs to improve prospecting and follow-up discipline.', recommendation: 'Retain' },
  { id: 'PR005', employeeId: 'EMP005', employeeName: 'Ngozi Eze', department: 'Sales', reviewPeriod: 'Q2 2025', reviewDate: '2025-06-27', reviewedBy: 'CEO', productivity: 88, teamwork: 86, leadership: 90, communication: 88, innovation: 82, discipline: 88, overallScore: 87, status: 'Completed', comments: 'Revenue targets exceeded by 8%. Effective team coaching led to team improvement.', recommendation: 'Retain' },
  { id: 'PR006', employeeId: 'EMP006', employeeName: 'Ibrahim Musa', department: 'Finance', reviewPeriod: 'Q2 2025', reviewDate: '2025-07-01', reviewedBy: 'Yetunde Coker', productivity: 80, teamwork: 78, leadership: 72, communication: 82, innovation: 76, discipline: 84, overallScore: 79, status: 'Pending', comments: 'Currently on approved leave. Review to be completed on return.', recommendation: 'Retain' },
  { id: 'PR007', employeeId: 'EMP007', employeeName: 'Yetunde Coker', department: 'Finance', reviewPeriod: 'Q2 2025', reviewDate: '2025-06-25', reviewedBy: 'CEO', productivity: 92, teamwork: 90, leadership: 95, communication: 90, innovation: 88, discipline: 92, overallScore: 91, status: 'Completed', comments: 'Flawless audit cycle. Implemented cost saving measures saving ₦2.4M annually.', recommendation: 'Promote' },
  { id: 'PR008', employeeId: 'EMP008', employeeName: 'Obinna Chukwu', department: 'Customer Support', reviewPeriod: 'Q2 2025', reviewDate: '2025-06-30', reviewedBy: 'Sade Williams', productivity: 68, teamwork: 72, leadership: 58, communication: 75, innovation: 62, discipline: 70, overallScore: 68, status: 'Completed', comments: 'Customer satisfaction scores below target. Needs improvement in resolution time.', recommendation: 'Warn' },
  { id: 'PR009', employeeId: 'EMP014', employeeName: 'Tunde Bakare', department: 'Sales', reviewPeriod: 'Q2 2025', reviewDate: '2025-05-30', reviewedBy: 'Ngozi Eze', productivity: 50, teamwork: 58, leadership: 45, communication: 62, innovation: 50, discipline: 45, overallScore: 52, status: 'Overdue', comments: 'Repeated policy violations and underperformance. Subject to disciplinary review.', recommendation: 'Dismiss' },
  { id: 'PR010', employeeId: 'EMP019', employeeName: 'Bola Fashola', department: 'Operations', reviewPeriod: 'Q2 2025', reviewDate: '2025-06-20', reviewedBy: 'CEO', productivity: 94, teamwork: 92, leadership: 96, communication: 92, innovation: 90, discipline: 95, overallScore: 93, status: 'Completed', comments: 'Operational efficiency improved by 35%. Key driver of company expansion into Port Harcourt.', recommendation: 'Promote' },
];

export const performanceTrend = [
  { month: 'Jan', avg: 76 },
  { month: 'Feb', avg: 78 },
  { month: 'Mar', avg: 75 },
  { month: 'Apr', avg: 80 },
  { month: 'May', avg: 82 },
  { month: 'Jun', avg: 83 },
  { month: 'Jul', avg: 85 },
];

export const departmentPerformance = [
  { dept: 'Eng', score: 90 },
  { dept: 'HR', score: 88 },
  { dept: 'Sales', score: 77 },
  { dept: 'Finance', score: 85 },
  { dept: 'CS', score: 78 },
  { dept: 'Mktg', score: 86 },
  { dept: 'Ops', score: 89 },
];
