import { mockEmployees } from './mockEmployees';

export interface WorkforceEmployee {
  id: string;
  name: string;
  department: string;
  position: string;
  location: string;
  gender: string;
  age: number;
  hireDate: string;
  salary: number;
  lastPromotion: string;
  employmentType: 'Permanent' | 'Contract' | 'Part-time';
  manager: string;
  status: string;
}

export const mockWorkforce: WorkforceEmployee[] = mockEmployees.map((e, i) => ({
  id: e.id,
  name: e.name,
  department: e.department,
  position: e.position,
  location: e.location,
  gender: e.gender,
  age: 24 + (i * 3) % 22,
  hireDate: e.hireDate,
  salary: e.salary,
  lastPromotion: `202${2 - (i % 3)}-0${(i % 9) + 1}-15`,
  employmentType: i % 8 === 6 ? 'Contract' : i % 8 === 7 ? 'Part-time' : 'Permanent',
  manager: e.manager,
  status: e.status,
}));

export const headcountByDept = [
  { dept: 'Engineering', count: 5 },
  { dept: 'Sales', count: 3 },
  { dept: 'Finance', count: 3 },
  { dept: 'Human Resources', count: 2 },
  { dept: 'Marketing', count: 3 },
  { dept: 'Customer Support', count: 3 },
  { dept: 'Operations', count: 1 },
];

export const salaryBandData = [
  { band: '₦100k–₦200k', count: 3 },
  { band: '₦200k–₦300k', count: 5 },
  { band: '₦300k–₦400k', count: 4 },
  { band: '₦400k–₦500k', count: 4 },
  { band: '₦500k–₦600k', count: 2 },
  { band: '₦600k+', count: 2 },
];

export const tenureDistribution = [
  { range: '0–1 yr', count: 4 },
  { range: '1–3 yrs', count: 5 },
  { range: '3–5 yrs', count: 5 },
  { range: '5–8 yrs', count: 4 },
  { range: '8+ yrs', count: 2 },
];

export const turnoverTrend = [
  { month: 'Jan', hired: 2, exited: 1 },
  { month: 'Feb', hired: 1, exited: 0 },
  { month: 'Mar', hired: 3, exited: 1 },
  { month: 'Apr', hired: 2, exited: 2 },
  { month: 'May', hired: 4, exited: 1 },
  { month: 'Jun', hired: 3, exited: 1 },
  { month: 'Jul', hired: 2, exited: 0 },
];
