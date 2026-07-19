export interface TrainingProgram {
  id: string;
  title: string;
  category: 'Technical' | 'Soft Skills' | 'Compliance' | 'Leadership' | 'Safety';
  provider: string;
  duration: number; // hours
  enrolled: number;
  completed: number;
  avgQuizScore: number;
  certificationOffered: boolean;
  status: 'Active' | 'Completed' | 'Upcoming';
  startDate: string;
  endDate: string;
}

export interface EmployeeTraining {
  employeeId: string;
  employeeName: string;
  department: string;
  program: string;
  category: string;
  completionDate: string;
  quizScore: number;
  certified: boolean;
  hoursCompleted: number;
}

export const mockTrainingPrograms: TrainingProgram[] = [
  { id: 'TRN001', title: 'Advanced JavaScript & TypeScript', category: 'Technical', provider: 'Udemy for Business', duration: 40, enrolled: 6, completed: 5, avgQuizScore: 88, certificationOffered: true, status: 'Completed', startDate: '2025-03-01', endDate: '2025-04-30' },
  { id: 'TRN002', title: 'Leadership & Team Management', category: 'Leadership', provider: 'Coursera', duration: 24, enrolled: 8, completed: 7, avgQuizScore: 82, certificationOffered: true, status: 'Completed', startDate: '2025-04-15', endDate: '2025-05-31' },
  { id: 'TRN003', title: 'GDPR & Data Privacy Compliance', category: 'Compliance', provider: 'Internal', duration: 8, enrolled: 20, completed: 18, avgQuizScore: 91, certificationOffered: true, status: 'Completed', startDate: '2025-05-01', endDate: '2025-05-15' },
  { id: 'TRN004', title: 'Communication & Presentation Skills', category: 'Soft Skills', provider: 'LinkedIn Learning', duration: 16, enrolled: 12, completed: 10, avgQuizScore: 79, certificationOffered: false, status: 'Completed', startDate: '2025-05-20', endDate: '2025-06-20' },
  { id: 'TRN005', title: 'Financial Modelling in Excel', category: 'Technical', provider: 'CFI', duration: 30, enrolled: 5, completed: 4, avgQuizScore: 85, certificationOffered: true, status: 'Active', startDate: '2025-06-01', endDate: '2025-07-31' },
  { id: 'TRN006', title: 'Workplace Safety & Health', category: 'Safety', provider: 'Internal', duration: 6, enrolled: 20, completed: 20, avgQuizScore: 94, certificationOffered: true, status: 'Completed', startDate: '2025-01-10', endDate: '2025-01-12' },
  { id: 'TRN007', title: 'Sales Excellence & CRM', category: 'Technical', provider: 'Salesforce Trailhead', duration: 20, enrolled: 5, completed: 3, avgQuizScore: 77, certificationOffered: true, status: 'Active', startDate: '2025-07-01', endDate: '2025-08-15' },
  { id: 'TRN008', title: 'Digital Marketing & SEO', category: 'Technical', provider: 'Google Skillshop', duration: 18, enrolled: 4, completed: 2, avgQuizScore: 81, certificationOffered: true, status: 'Active', startDate: '2025-07-05', endDate: '2025-08-20' },
  { id: 'TRN009', title: 'Emotional Intelligence at Work', category: 'Soft Skills', provider: 'Coursera', duration: 12, enrolled: 15, completed: 0, avgQuizScore: 0, certificationOffered: false, status: 'Upcoming', startDate: '2025-08-01', endDate: '2025-08-31' },
  { id: 'TRN010', title: 'AWS Cloud Practitioner', category: 'Technical', provider: 'AWS Training', duration: 35, enrolled: 4, completed: 0, avgQuizScore: 0, certificationOffered: true, status: 'Upcoming', startDate: '2025-08-10', endDate: '2025-09-30' },
];

export const mockEmployeeTraining: EmployeeTraining[] = [
  { employeeId: 'EMP001', employeeName: 'Adaeze Okonkwo', department: 'Engineering', program: 'Advanced JavaScript & TypeScript', category: 'Technical', completionDate: '2025-04-28', quizScore: 95, certified: true, hoursCompleted: 40 },
  { employeeId: 'EMP001', employeeName: 'Adaeze Okonkwo', department: 'Engineering', program: 'GDPR & Data Privacy Compliance', category: 'Compliance', completionDate: '2025-05-14', quizScore: 92, certified: true, hoursCompleted: 8 },
  { employeeId: 'EMP002', employeeName: 'Chukwuemeka Nwosu', department: 'Engineering', program: 'Leadership & Team Management', category: 'Leadership', completionDate: '2025-05-29', quizScore: 88, certified: true, hoursCompleted: 24 },
  { employeeId: 'EMP003', employeeName: 'Fatima Al-Amin', department: 'Human Resources', program: 'Communication & Presentation Skills', category: 'Soft Skills', completionDate: '2025-06-18', quizScore: 91, certified: false, hoursCompleted: 16 },
  { employeeId: 'EMP004', employeeName: 'Babatunde Adeleke', department: 'Sales', program: 'Sales Excellence & CRM', category: 'Technical', completionDate: '', quizScore: 0, certified: false, hoursCompleted: 10 },
  { employeeId: 'EMP005', employeeName: 'Ngozi Eze', department: 'Sales', program: 'Leadership & Team Management', category: 'Leadership', completionDate: '2025-05-30', quizScore: 85, certified: true, hoursCompleted: 24 },
  { employeeId: 'EMP007', employeeName: 'Yetunde Coker', department: 'Finance', program: 'Financial Modelling in Excel', category: 'Technical', completionDate: '2025-07-25', quizScore: 90, certified: true, hoursCompleted: 30 },
];

export const completionByDept = [
  { dept: 'Engineering', rate: 88 },
  { dept: 'Sales', rate: 72 },
  { dept: 'Finance', rate: 85 },
  { dept: 'HR', rate: 95 },
  { dept: 'Marketing', rate: 78 },
  { dept: 'Support', rate: 70 },
  { dept: 'Operations', rate: 90 },
];

export const trainingHoursTrend = [
  { month: 'Jan', hours: 120 },
  { month: 'Feb', hours: 95 },
  { month: 'Mar', hours: 180 },
  { month: 'Apr', hours: 210 },
  { month: 'May', hours: 175 },
  { month: 'Jun', hours: 230 },
  { month: 'Jul', hours: 160 },
];

export const skillsMatrix = [
  { skill: 'Leadership', level: 72 },
  { skill: 'Technical', level: 85 },
  { skill: 'Communication', level: 78 },
  { skill: 'Data Analysis', level: 65 },
  { skill: 'Compliance', level: 91 },
  { skill: 'Customer Service', level: 80 },
];
