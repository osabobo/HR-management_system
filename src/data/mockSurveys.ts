export interface Survey {
  id: string;
  title: string;
  type: 'Engagement' | 'Satisfaction' | 'Exit' | 'Pulse' | 'Onboarding';
  launchedDate: string;
  closedDate: string;
  targetAudience: string;
  sent: number;
  responses: number;
  avgScore: number;
  status: 'Active' | 'Closed' | 'Draft';
}

export interface SurveyResponse {
  department: string;
  engagementScore: number;
  satisfactionScore: number;
  npsScore: number;
  responseRate: number;
}

export const mockSurveys: Survey[] = [
  { id: 'SRV001', title: 'Q2 2025 Employee Engagement Survey', type: 'Engagement', launchedDate: '2025-06-01', closedDate: '2025-06-15', targetAudience: 'All Staff', sent: 20, responses: 17, avgScore: 78, status: 'Closed' },
  { id: 'SRV002', title: 'Job Satisfaction – Mid-Year Check', type: 'Satisfaction', launchedDate: '2025-07-01', closedDate: '2025-07-10', targetAudience: 'All Staff', sent: 20, responses: 15, avgScore: 74, status: 'Closed' },
  { id: 'SRV003', title: 'July 2025 Pulse Survey', type: 'Pulse', launchedDate: '2025-07-15', closedDate: '2025-07-18', targetAudience: 'All Staff', sent: 20, responses: 18, avgScore: 81, status: 'Closed' },
  { id: 'SRV004', title: 'Exit Survey – Resigned Employees', type: 'Exit', launchedDate: '2025-05-01', closedDate: '2025-06-30', targetAudience: 'Exiting Staff', sent: 3, responses: 2, avgScore: 65, status: 'Closed' },
  { id: 'SRV005', title: 'New Hire Onboarding Experience', type: 'Onboarding', launchedDate: '2025-07-10', closedDate: '2025-07-25', targetAudience: 'New Joiners', sent: 5, responses: 4, avgScore: 86, status: 'Closed' },
  { id: 'SRV006', title: 'Q3 2025 Employee Engagement Survey', type: 'Engagement', launchedDate: '2025-07-18', closedDate: '2025-08-01', targetAudience: 'All Staff', sent: 20, responses: 8, avgScore: 0, status: 'Active' },
];

export const surveyResponsesByDept: SurveyResponse[] = [
  { department: 'Engineering', engagementScore: 82, satisfactionScore: 79, npsScore: 42, responseRate: 90 },
  { department: 'Sales', engagementScore: 70, satisfactionScore: 65, npsScore: 28, responseRate: 75 },
  { department: 'Finance', engagementScore: 78, satisfactionScore: 76, npsScore: 35, responseRate: 85 },
  { department: 'Human Resources', engagementScore: 88, satisfactionScore: 84, npsScore: 55, responseRate: 100 },
  { department: 'Marketing', engagementScore: 75, satisfactionScore: 72, npsScore: 32, responseRate: 80 },
  { department: 'Customer Support', engagementScore: 68, satisfactionScore: 64, npsScore: 20, responseRate: 70 },
  { department: 'Operations', engagementScore: 80, satisfactionScore: 77, npsScore: 38, responseRate: 95 },
];

export const engagementTrend = [
  { period: 'Q1 2024', engagement: 72, satisfaction: 68 },
  { period: 'Q2 2024', engagement: 74, satisfaction: 70 },
  { period: 'Q3 2024', engagement: 71, satisfaction: 67 },
  { period: 'Q4 2024', engagement: 76, satisfaction: 73 },
  { period: 'Q1 2025', engagement: 78, satisfaction: 74 },
  { period: 'Q2 2025', engagement: 78, satisfaction: 74 },
];

export const exitReasonsData = [
  { reason: 'Better Opportunity', value: 45 },
  { reason: 'Work-Life Balance', value: 20 },
  { reason: 'Compensation', value: 18 },
  { reason: 'Management Issues', value: 10 },
  { reason: 'Relocation', value: 7 },
];
