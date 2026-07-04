export interface AIPrediction {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  predictionDate: string;
  prediction: 'High Performer' | 'Medium Performer' | 'Low Performer';
  confidence: number;
  attendanceScore: number;
  experienceScore: number;
  kpiScore: number;
  trainingScore: number;
  leaveImpact: number;
  previousRating: number;
  featureImportance: { feature: string; impact: number; direction: 'positive' | 'negative' }[];
  recommendations: string[];
  riskFactors: string[];
}

export const mockPredictions: AIPrediction[] = [
  {
    id: 'AI001', employeeId: 'EMP001', employeeName: 'Adaeze Okonkwo', department: 'Engineering',
    predictionDate: '2025-07-01', prediction: 'High Performer', confidence: 94,
    attendanceScore: 96, experienceScore: 88, kpiScore: 92, trainingScore: 85, leaveImpact: 5, previousRating: 90,
    featureImportance: [
      { feature: 'KPI Score', impact: 32, direction: 'positive' },
      { feature: 'Attendance', impact: 28, direction: 'positive' },
      { feature: 'Training Completed', impact: 18, direction: 'positive' },
      { feature: 'Experience', impact: 15, direction: 'positive' },
      { feature: 'Leave Days', impact: 7, direction: 'negative' },
    ],
    recommendations: ['Recommend for Senior Lead promotion track', 'Assign mentorship role for junior engineers', 'Include in leadership development programme'],
    riskFactors: ['None significant'],
  },
  {
    id: 'AI002', employeeId: 'EMP004', employeeName: 'Babatunde Adeleke', department: 'Sales',
    predictionDate: '2025-07-01', prediction: 'Medium Performer', confidence: 78,
    attendanceScore: 80, experienceScore: 65, kpiScore: 74, trainingScore: 55, leaveImpact: 12, previousRating: 72,
    featureImportance: [
      { feature: 'KPI Score', impact: 30, direction: 'positive' },
      { feature: 'Attendance', impact: 22, direction: 'positive' },
      { feature: 'Leave Days', impact: 25, direction: 'negative' },
      { feature: 'Training Completed', impact: 15, direction: 'negative' },
      { feature: 'Experience', impact: 8, direction: 'positive' },
    ],
    recommendations: ['Enrol in advanced sales techniques training', 'Set monthly OKRs with line manager', 'Reduce unapproved absences through engagement programme'],
    riskFactors: ['High leave frequency', 'Below average training completion', 'Missed Q2 targets'],
  },
  {
    id: 'AI003', employeeId: 'EMP014', employeeName: 'Tunde Bakare', department: 'Sales',
    predictionDate: '2025-07-01', prediction: 'Low Performer', confidence: 89,
    attendanceScore: 55, experienceScore: 60, kpiScore: 50, trainingScore: 35, leaveImpact: 30, previousRating: 52,
    featureImportance: [
      { feature: 'Disciplinary Records', impact: 38, direction: 'negative' },
      { feature: 'Attendance', impact: 26, direction: 'negative' },
      { feature: 'KPI Score', impact: 20, direction: 'negative' },
      { feature: 'Training Completed', impact: 10, direction: 'negative' },
      { feature: 'Experience', impact: 6, direction: 'positive' },
    ],
    recommendations: ['Initiate formal Performance Improvement Plan (PIP)', 'Weekly check-in with HR Manager', 'Evaluate fit within current role'],
    riskFactors: ['Active disciplinary record', 'Very high absenteeism', 'Consecutive missed targets', 'Low training completion rate'],
  },
  {
    id: 'AI004', employeeId: 'EMP019', employeeName: 'Bola Fashola', department: 'Operations',
    predictionDate: '2025-07-01', prediction: 'High Performer', confidence: 97,
    attendanceScore: 98, experienceScore: 95, kpiScore: 93, trainingScore: 92, leaveImpact: 2, previousRating: 93,
    featureImportance: [
      { feature: 'KPI Score', impact: 30, direction: 'positive' },
      { feature: 'Experience', impact: 25, direction: 'positive' },
      { feature: 'Training Completed', impact: 22, direction: 'positive' },
      { feature: 'Attendance', impact: 18, direction: 'positive' },
      { feature: 'Leave Days', impact: 5, direction: 'negative' },
    ],
    recommendations: ['Nominate for Executive Leadership Programme', 'Consider for COO succession planning', 'Increase compensation to retention band'],
    riskFactors: ['Flight risk if not promoted within 12 months'],
  },
  {
    id: 'AI005', employeeId: 'EMP008', employeeName: 'Obinna Chukwu', department: 'Customer Support',
    predictionDate: '2025-07-01', prediction: 'Low Performer', confidence: 72,
    attendanceScore: 74, experienceScore: 45, kpiScore: 68, trainingScore: 42, leaveImpact: 18, previousRating: 65,
    featureImportance: [
      { feature: 'KPI Score', impact: 28, direction: 'negative' },
      { feature: 'Training Completed', impact: 24, direction: 'negative' },
      { feature: 'Attendance', impact: 20, direction: 'negative' },
      { feature: 'Experience', impact: 18, direction: 'negative' },
      { feature: 'Leave Impact', impact: 10, direction: 'negative' },
    ],
    recommendations: ['Mandatory customer service certification programme', 'Pair with high performer for shadow sessions', 'Review workload distribution'],
    riskFactors: ['Below minimum KPI threshold', 'Low customer satisfaction scores', 'Training gap identified'],
  },
];

export const predictionTimeline = [
  { month: 'Jan', high: 5, medium: 9, low: 6 },
  { month: 'Feb', high: 6, medium: 8, low: 6 },
  { month: 'Mar', high: 7, medium: 8, low: 5 },
  { month: 'Apr', high: 8, medium: 7, low: 5 },
  { month: 'May', high: 9, medium: 7, low: 4 },
  { month: 'Jun', high: 10, medium: 6, low: 4 },
  { month: 'Jul', high: 11, medium: 6, low: 3 },
];
