// ─── Mock Employees ───────────────────────────────────────────────────────────
export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: 'Active' | 'On Leave' | 'Suspended' | 'Resigned';
  gender: 'Male' | 'Female';
  hireDate: string;
  salary: number;
  performanceScore: number;
  avatar: string;
  experience: number; // years
  trainingCompleted: number;
  location: string;
  manager: string;
}

export const mockEmployees: Employee[] = [
  { id: 'EMP001', name: 'Adaeze Okonkwo', email: 'adaeze.okonkwo@company.ng', phone: '+234 812 345 6789', department: 'Engineering', position: 'Senior Software Engineer', status: 'Active', gender: 'Female', hireDate: '2021-03-15', salary: 420000, performanceScore: 92, avatar: 'AO', experience: 5, trainingCompleted: 8, location: 'Lagos', manager: 'Emeka Nwosu' },
  { id: 'EMP002', name: 'Chukwuemeka Nwosu', email: 'emeka.nwosu@company.ng', phone: '+234 803 456 7890', department: 'Engineering', position: 'Engineering Manager', status: 'Active', gender: 'Male', hireDate: '2019-07-01', salary: 580000, performanceScore: 88, avatar: 'CN', experience: 8, trainingCompleted: 12, location: 'Lagos', manager: 'CEO' },
  { id: 'EMP003', name: 'Fatima Al-Amin', email: 'fatima.alamin@company.ng', phone: '+234 705 678 9012', department: 'Human Resources', position: 'HR Manager', status: 'Active', gender: 'Female', hireDate: '2020-01-10', salary: 390000, performanceScore: 95, avatar: 'FA', experience: 6, trainingCompleted: 10, location: 'Abuja', manager: 'CEO' },
  { id: 'EMP004', name: 'Babatunde Adeleke', email: 'babatunde.adeleke@company.ng', phone: '+234 901 789 0123', department: 'Sales', position: 'Sales Representative', status: 'Active', gender: 'Male', hireDate: '2022-05-20', salary: 280000, performanceScore: 74, avatar: 'BA', experience: 3, trainingCompleted: 4, location: 'Lagos', manager: 'Ngozi Eze' },
  { id: 'EMP005', name: 'Ngozi Eze', email: 'ngozi.eze@company.ng', phone: '+234 816 890 1234', department: 'Sales', position: 'Sales Manager', status: 'Active', gender: 'Female', hireDate: '2018-11-05', salary: 480000, performanceScore: 87, avatar: 'NE', experience: 9, trainingCompleted: 14, location: 'Port Harcourt', manager: 'CEO' },
  { id: 'EMP006', name: 'Ibrahim Musa', email: 'ibrahim.musa@company.ng', phone: '+234 702 901 2345', department: 'Finance', position: 'Financial Analyst', status: 'On Leave', gender: 'Male', hireDate: '2021-09-12', salary: 340000, performanceScore: 79, avatar: 'IM', experience: 4, trainingCompleted: 6, location: 'Kano', manager: 'Yetunde Coker' },
  { id: 'EMP007', name: 'Yetunde Coker', email: 'yetunde.coker@company.ng', phone: '+234 808 012 3456', department: 'Finance', position: 'Finance Director', status: 'Active', gender: 'Female', hireDate: '2017-04-18', salary: 650000, performanceScore: 91, avatar: 'YC', experience: 12, trainingCompleted: 18, location: 'Lagos', manager: 'CEO' },
  { id: 'EMP008', name: 'Obinna Chukwu', email: 'obinna.chukwu@company.ng', phone: '+234 903 123 4567', department: 'Customer Support', position: 'Support Specialist', status: 'Active', gender: 'Male', hireDate: '2023-01-09', salary: 190000, performanceScore: 68, avatar: 'OC', experience: 1, trainingCompleted: 3, location: 'Enugu', manager: 'Sade Williams' },
  { id: 'EMP009', name: 'Sade Williams', email: 'sade.williams@company.ng', phone: '+234 811 234 5678', department: 'Customer Support', position: 'Support Manager', status: 'Active', gender: 'Female', hireDate: '2020-06-22', salary: 360000, performanceScore: 83, avatar: 'SW', experience: 7, trainingCompleted: 9, location: 'Lagos', manager: 'CEO' },
  { id: 'EMP010', name: 'Abdullahi Garba', email: 'abdullahi.garba@company.ng', phone: '+234 704 345 6789', department: 'Marketing', position: 'Marketing Specialist', status: 'Active', gender: 'Male', hireDate: '2022-03-14', salary: 260000, performanceScore: 76, avatar: 'AG', experience: 2, trainingCompleted: 5, location: 'Abuja', manager: 'Chiamaka Obi' },
  { id: 'EMP011', name: 'Chiamaka Obi', email: 'chiamaka.obi@company.ng', phone: '+234 815 456 7890', department: 'Marketing', position: 'Marketing Manager', status: 'Active', gender: 'Female', hireDate: '2019-02-28', salary: 440000, performanceScore: 90, avatar: 'CO', experience: 8, trainingCompleted: 11, location: 'Lagos', manager: 'CEO' },
  { id: 'EMP012', name: 'Usman Bello', email: 'usman.bello@company.ng', phone: '+234 901 567 8901', department: 'Engineering', position: 'Junior Developer', status: 'Active', gender: 'Male', hireDate: '2023-08-01', salary: 200000, performanceScore: 72, avatar: 'UB', experience: 1, trainingCompleted: 2, location: 'Abuja', manager: 'Chukwuemeka Nwosu' },
  { id: 'EMP013', name: 'Aisha Suleiman', email: 'aisha.suleiman@company.ng', phone: '+234 806 678 9012', department: 'Human Resources', position: 'HR Officer', status: 'Active', gender: 'Female', hireDate: '2022-11-15', salary: 240000, performanceScore: 81, avatar: 'AS', experience: 3, trainingCompleted: 7, location: 'Kano', manager: 'Fatima Al-Amin' },
  { id: 'EMP014', name: 'Tunde Bakare', email: 'tunde.bakare@company.ng', phone: '+234 703 789 0123', department: 'Sales', position: 'Sales Executive', status: 'Suspended', gender: 'Male', hireDate: '2021-07-30', salary: 250000, performanceScore: 55, avatar: 'TB', experience: 4, trainingCompleted: 3, location: 'Ibadan', manager: 'Ngozi Eze' },
  { id: 'EMP015', name: 'Oluwakemi Adeyemi', email: 'kemi.adeyemi@company.ng', phone: '+234 812 890 1234', department: 'Operations', position: 'Operations Analyst', status: 'Active', gender: 'Female', hireDate: '2020-09-07', salary: 310000, performanceScore: 85, avatar: 'OA', experience: 5, trainingCompleted: 8, location: 'Lagos', manager: 'CEO' },
  { id: 'EMP016', name: 'Emeka Ogbu', email: 'emeka.ogbu@company.ng', phone: '+234 805 901 2345', department: 'Engineering', position: 'DevOps Engineer', status: 'Active', gender: 'Male', hireDate: '2020-12-01', salary: 380000, performanceScore: 89, avatar: 'EO', experience: 6, trainingCompleted: 10, location: 'Lagos', manager: 'Chukwuemeka Nwosu' },
  { id: 'EMP017', name: 'Hauwa Ibrahim', email: 'hauwa.ibrahim@company.ng', phone: '+234 708 012 3456', department: 'Marketing', position: 'Content Creator', status: 'Active', gender: 'Female', hireDate: '2023-02-20', salary: 210000, performanceScore: 78, avatar: 'HI', experience: 2, trainingCompleted: 4, location: 'Kaduna', manager: 'Chiamaka Obi' },
  { id: 'EMP018', name: 'Chidi Okeke', email: 'chidi.okeke@company.ng', phone: '+234 901 123 4567', department: 'Finance', position: 'Accountant', status: 'On Leave', gender: 'Male', hireDate: '2021-05-17', salary: 295000, performanceScore: 77, avatar: 'CO', experience: 4, trainingCompleted: 6, location: 'Onitsha', manager: 'Yetunde Coker' },
  { id: 'EMP019', name: 'Bola Fashola', email: 'bola.fashola@company.ng', phone: '+234 813 234 5678', department: 'Operations', position: 'Operations Manager', status: 'Active', gender: 'Male', hireDate: '2018-08-22', salary: 520000, performanceScore: 93, avatar: 'BF', experience: 10, trainingCompleted: 15, location: 'Lagos', manager: 'CEO' },
  { id: 'EMP020', name: 'Grace Adeola', email: 'grace.adeola@company.ng', phone: '+234 704 345 6780', department: 'Customer Support', position: 'QA Analyst', status: 'Active', gender: 'Female', hireDate: '2022-09-12', salary: 230000, performanceScore: 82, avatar: 'GA', experience: 3, trainingCompleted: 5, location: 'Lagos', manager: 'Sade Williams' },
];
