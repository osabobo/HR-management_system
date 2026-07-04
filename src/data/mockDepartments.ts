export interface Department {
  id: string;
  name: string;
  code: string;
  headOfDept: string;
  employeeCount: number;
  budget: number;
  budgetUsed: number;
  productivity: number;
  location: string;
  description: string;
  color: string;
  icon: string;
  established: string;
}

export const mockDepartments: Department[] = [
  { id: 'DEPT001', name: 'Engineering', code: 'ENG', headOfDept: 'Chukwuemeka Nwosu', employeeCount: 5, budget: 5000000, budgetUsed: 3800000, productivity: 91, location: 'Lagos', description: 'Responsible for product development, software engineering, and technical infrastructure.', color: '#4f46e5', icon: 'FiCode', established: '2017-01-01' },
  { id: 'DEPT002', name: 'Human Resources', code: 'HR', headOfDept: 'Fatima Al-Amin', employeeCount: 2, budget: 2000000, budgetUsed: 1350000, productivity: 88, location: 'Abuja', description: 'Manages recruitment, employee relations, payroll, and organisational development.', color: '#10b981', icon: 'FiUsers', established: '2017-01-01' },
  { id: 'DEPT003', name: 'Sales', code: 'SLS', headOfDept: 'Ngozi Eze', employeeCount: 3, budget: 3500000, budgetUsed: 2700000, productivity: 79, location: 'Port Harcourt', description: 'Drives revenue growth through B2B and B2C sales strategies and client relationship management.', color: '#f59e0b', icon: 'FiTrendingUp', established: '2017-01-01' },
  { id: 'DEPT004', name: 'Finance', code: 'FIN', headOfDept: 'Yetunde Coker', employeeCount: 3, budget: 2500000, budgetUsed: 1600000, productivity: 85, location: 'Lagos', description: 'Oversees financial planning, reporting, budgeting, and statutory compliance.', color: '#06b6d4', icon: 'FiDollarSign', established: '2017-01-01' },
  { id: 'DEPT005', name: 'Customer Support', code: 'CS', headOfDept: 'Sade Williams', employeeCount: 3, budget: 1800000, budgetUsed: 1200000, productivity: 82, location: 'Lagos', description: 'Ensures excellent post-sale customer experience, ticketing, and technical support.', color: '#8b5cf6', icon: 'FiHeadphones', established: '2018-03-01' },
  { id: 'DEPT006', name: 'Marketing', code: 'MKT', headOfDept: 'Chiamaka Obi', employeeCount: 3, budget: 2800000, budgetUsed: 2100000, productivity: 86, location: 'Lagos', description: 'Responsible for brand management, digital marketing, content strategy, and campaigns.', color: '#f43f5e', icon: 'FiBarChart2', established: '2017-06-01' },
  { id: 'DEPT007', name: 'Operations', code: 'OPS', headOfDept: 'Bola Fashola', employeeCount: 2, budget: 3200000, budgetUsed: 2400000, productivity: 89, location: 'Lagos', description: 'Manages business operations, logistics, process optimisation and cross-departmental coordination.', color: '#14b8a6', icon: 'FiSettings', established: '2017-01-01' },
];
