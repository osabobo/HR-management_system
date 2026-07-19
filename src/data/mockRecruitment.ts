export interface JobOpening {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  location: string;
  postedDate: string;
  deadline: string;
  applications: number;
  screened: number;
  interviewed: number;
  offered: number;
  accepted: number;
  status: 'Open' | 'Closed' | 'On Hold';
  hiringManager: string;
  salaryRange: string;
}

export interface Applicant {
  id: string;
  name: string;
  jobId: string;
  jobTitle: string;
  department: string;
  appliedDate: string;
  stage: 'Applied' | 'Screened' | 'Interviewed' | 'Offered' | 'Accepted' | 'Rejected';
  source: 'LinkedIn' | 'Jobberman' | 'Indeed' | 'Referral' | 'Career Site' | 'Walk-in';
  email: string;
  phone: string;
}

export const mockJobOpenings: JobOpening[] = [
  { id: 'JOB001', title: 'Senior Software Engineer', department: 'Engineering', type: 'Full-time', location: 'Lagos', postedDate: '2025-06-01', deadline: '2025-07-31', applications: 87, screened: 42, interviewed: 18, offered: 4, accepted: 3, status: 'Open', hiringManager: 'Chukwuemeka Nwosu', salaryRange: '₦400k – ₦550k/mo' },
  { id: 'JOB002', title: 'Sales Executive', department: 'Sales', type: 'Full-time', location: 'Lagos', postedDate: '2025-06-10', deadline: '2025-07-20', applications: 124, screened: 55, interviewed: 22, offered: 6, accepted: 5, status: 'Open', hiringManager: 'Ngozi Eze', salaryRange: '₦200k – ₦300k/mo' },
  { id: 'JOB003', title: 'HR Officer', department: 'Human Resources', type: 'Full-time', location: 'Abuja', postedDate: '2025-05-20', deadline: '2025-06-30', applications: 61, screened: 28, interviewed: 10, offered: 2, accepted: 2, status: 'Closed', hiringManager: 'Fatima Al-Amin', salaryRange: '₦180k – ₦250k/mo' },
  { id: 'JOB004', title: 'Financial Analyst', department: 'Finance', type: 'Full-time', location: 'Lagos', postedDate: '2025-06-15', deadline: '2025-08-01', applications: 48, screened: 20, interviewed: 8, offered: 2, accepted: 1, status: 'Open', hiringManager: 'Yetunde Coker', salaryRange: '₦300k – ₦420k/mo' },
  { id: 'JOB005', title: 'Marketing Specialist', department: 'Marketing', type: 'Full-time', location: 'Lagos', postedDate: '2025-07-01', deadline: '2025-08-15', applications: 39, screened: 15, interviewed: 5, offered: 1, accepted: 0, status: 'Open', hiringManager: 'Chiamaka Obi', salaryRange: '₦200k – ₦280k/mo' },
  { id: 'JOB006', title: 'DevOps Engineer', department: 'Engineering', type: 'Contract', location: 'Remote', postedDate: '2025-06-20', deadline: '2025-07-25', applications: 33, screened: 18, interviewed: 7, offered: 2, accepted: 2, status: 'Closed', hiringManager: 'Chukwuemeka Nwosu', salaryRange: '₦350k – ₦500k/mo' },
  { id: 'JOB007', title: 'Customer Support Lead', department: 'Customer Support', type: 'Full-time', location: 'Port Harcourt', postedDate: '2025-07-05', deadline: '2025-08-10', applications: 27, screened: 10, interviewed: 3, offered: 0, accepted: 0, status: 'Open', hiringManager: 'Sade Williams', salaryRange: '₦250k – ₦360k/mo' },
  { id: 'JOB008', title: 'Operations Analyst', department: 'Operations', type: 'Full-time', location: 'Lagos', postedDate: '2025-05-10', deadline: '2025-06-15', applications: 52, screened: 25, interviewed: 9, offered: 3, accepted: 3, status: 'Closed', hiringManager: 'Bola Fashola', salaryRange: '₦220k – ₦320k/mo' },
];

export const mockApplicants: Applicant[] = [
  { id: 'APP001', name: 'Emeka Osei', jobId: 'JOB001', jobTitle: 'Senior Software Engineer', department: 'Engineering', appliedDate: '2025-06-05', stage: 'Interviewed', source: 'LinkedIn', email: 'emeka.osei@email.com', phone: '+234 801 111 2222' },
  { id: 'APP002', name: 'Zainab Musa', jobId: 'JOB001', jobTitle: 'Senior Software Engineer', department: 'Engineering', appliedDate: '2025-06-07', stage: 'Offered', source: 'Referral', email: 'zainab.musa@email.com', phone: '+234 802 222 3333' },
  { id: 'APP003', name: 'David Oke', jobId: 'JOB002', jobTitle: 'Sales Executive', department: 'Sales', appliedDate: '2025-06-12', stage: 'Accepted', source: 'Jobberman', email: 'david.oke@email.com', phone: '+234 803 333 4444' },
  { id: 'APP004', name: 'Halima Yusuf', jobId: 'JOB002', jobTitle: 'Sales Executive', department: 'Sales', appliedDate: '2025-06-14', stage: 'Screened', source: 'Indeed', email: 'halima.yusuf@email.com', phone: '+234 804 444 5555' },
  { id: 'APP005', name: 'Tochukwu Obi', jobId: 'JOB004', jobTitle: 'Financial Analyst', department: 'Finance', appliedDate: '2025-06-18', stage: 'Interviewed', source: 'Career Site', email: 'tochukwu.obi@email.com', phone: '+234 805 555 6666' },
  { id: 'APP006', name: 'Amira Lawal', jobId: 'JOB005', jobTitle: 'Marketing Specialist', department: 'Marketing', appliedDate: '2025-07-03', stage: 'Applied', source: 'LinkedIn', email: 'amira.lawal@email.com', phone: '+234 806 666 7777' },
  { id: 'APP007', name: 'Seun Afolabi', jobId: 'JOB007', jobTitle: 'Customer Support Lead', department: 'Customer Support', appliedDate: '2025-07-08', stage: 'Screened', source: 'Walk-in', email: 'seun.afolabi@email.com', phone: '+234 807 777 8888' },
  { id: 'APP008', name: 'Chibike Eze', jobId: 'JOB001', jobTitle: 'Senior Software Engineer', department: 'Engineering', appliedDate: '2025-06-10', stage: 'Rejected', source: 'Career Site', email: 'chibike.eze@email.com', phone: '+234 808 888 9999' },
];

export const applicationsByMonth = [
  { month: 'Jan', applications: 45, hires: 3 },
  { month: 'Feb', applications: 62, hires: 5 },
  { month: 'Mar', applications: 58, hires: 4 },
  { month: 'Apr', applications: 80, hires: 6 },
  { month: 'May', applications: 95, hires: 7 },
  { month: 'Jun', applications: 112, hires: 8 },
  { month: 'Jul', applications: 78, hires: 5 },
];

export const hiringFunnelData = [
  { stage: 'Applied', count: 471 },
  { stage: 'Screened', count: 213 },
  { stage: 'Interviewed', count: 82 },
  { stage: 'Offered', count: 20 },
  { stage: 'Accepted', count: 16 },
];

export const sourceBreakdown = [
  { name: 'LinkedIn', value: 38 },
  { name: 'Jobberman', value: 22 },
  { name: 'Indeed', value: 18 },
  { name: 'Referral', value: 12 },
  { name: 'Career Site', value: 7 },
  { name: 'Walk-in', value: 3 },
];

export const timeToHireByDept = [
  { dept: 'Engineering', days: 32 },
  { dept: 'Sales', days: 21 },
  { dept: 'Finance', days: 28 },
  { dept: 'HR', days: 18 },
  { dept: 'Marketing', days: 24 },
  { dept: 'Operations', days: 20 },
  { dept: 'Support', days: 15 },
];
