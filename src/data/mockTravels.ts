export interface TravelRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  avatar: string;
  purpose: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  estimatedCost: number;
  advanceRequested: number;
  advancePaid: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed' | 'Cancelled';
  approvedBy: string;
  submittedDate: string;
  travelMode: 'Air' | 'Road' | 'Rail';
  category: 'Client Visit' | 'Conference' | 'Training' | 'Field Work' | 'Government Liaison';
}

export const mockTravelRequests: TravelRequest[] = [
  { id: 'TRV001', employeeId: 'EMP005', employeeName: 'Ngozi Eze', department: 'Sales', avatar: 'NE', purpose: 'Client presentation to Dangote Group', destination: 'Abuja', departureDate: '2025-07-22', returnDate: '2025-07-24', estimatedCost: 185000, advanceRequested: 150000, advancePaid: 150000, status: 'Approved', approvedBy: 'CEO', submittedDate: '2025-07-15', travelMode: 'Air', category: 'Client Visit' },
  { id: 'TRV002', employeeId: 'EMP002', employeeName: 'Chukwuemeka Nwosu', department: 'Engineering', avatar: 'CN', purpose: 'AWS re:Invent conference participation', destination: 'Lagos (Eko Hotel)', departureDate: '2025-07-28', returnDate: '2025-07-30', estimatedCost: 95000, advanceRequested: 80000, advancePaid: 80000, status: 'Approved', approvedBy: 'CEO', submittedDate: '2025-07-10', travelMode: 'Road', category: 'Conference' },
  { id: 'TRV003', employeeId: 'EMP015', employeeName: 'Oluwakemi Adeyemi', department: 'Operations', avatar: 'OA', purpose: 'Vendor audit and site inspection', destination: 'Kano', departureDate: '2025-08-05', returnDate: '2025-08-07', estimatedCost: 220000, advanceRequested: 200000, advancePaid: 0, status: 'Pending', approvedBy: '', submittedDate: '2025-07-18', travelMode: 'Air', category: 'Field Work' },
  { id: 'TRV004', employeeId: 'EMP003', employeeName: 'Fatima Al-Amin', department: 'Human Resources', avatar: 'FA', purpose: 'CIPM Annual HR Summit', destination: 'Abuja', departureDate: '2025-08-12', returnDate: '2025-08-14', estimatedCost: 175000, advanceRequested: 160000, advancePaid: 0, status: 'Pending', approvedBy: '', submittedDate: '2025-07-19', travelMode: 'Air', category: 'Conference' },
  { id: 'TRV005', employeeId: 'EMP007', employeeName: 'Yetunde Coker', department: 'Finance', avatar: 'YC', purpose: 'FIRS tax consultation meeting', destination: 'Abuja', departureDate: '2025-07-10', returnDate: '2025-07-11', estimatedCost: 130000, advanceRequested: 120000, advancePaid: 120000, status: 'Completed', approvedBy: 'CEO', submittedDate: '2025-07-03', travelMode: 'Air', category: 'Government Liaison' },
  { id: 'TRV006', employeeId: 'EMP011', employeeName: 'Chiamaka Obi', department: 'Marketing', avatar: 'CO', purpose: 'Brand activation launch – Port Harcourt', destination: 'Port Harcourt', departureDate: '2025-07-14', returnDate: '2025-07-16', estimatedCost: 145000, advanceRequested: 130000, advancePaid: 130000, status: 'Completed', approvedBy: 'CEO', submittedDate: '2025-07-07', travelMode: 'Air', category: 'Field Work' },
  { id: 'TRV007', employeeId: 'EMP004', employeeName: 'Babatunde Adeleke', department: 'Sales', avatar: 'BA', purpose: 'Distributor visit – Ibadan region', destination: 'Ibadan', departureDate: '2025-08-01', returnDate: '2025-08-02', estimatedCost: 45000, advanceRequested: 40000, advancePaid: 0, status: 'Rejected', approvedBy: 'Ngozi Eze', submittedDate: '2025-07-17', travelMode: 'Road', category: 'Client Visit' },
  { id: 'TRV008', employeeId: 'EMP016', employeeName: 'Emeka Ogbu', department: 'Engineering', avatar: 'EO', purpose: 'Cloud infrastructure training – Microsoft', destination: 'Lagos (Ikeja)', departureDate: '2025-08-18', returnDate: '2025-08-20', estimatedCost: 110000, advanceRequested: 100000, advancePaid: 0, status: 'Pending', approvedBy: '', submittedDate: '2025-07-19', travelMode: 'Road', category: 'Training' },
];

export const travelSpendByDept = [
  { dept: 'Engineering', spend: 205000 },
  { dept: 'Sales', spend: 230000 },
  { dept: 'Finance', spend: 130000 },
  { dept: 'HR', spend: 175000 },
  { dept: 'Marketing', spend: 145000 },
  { dept: 'Operations', spend: 220000 },
];

export const monthlyTravelSpend = [
  { month: 'Jan', spend: 280000, trips: 3 },
  { month: 'Feb', spend: 195000, trips: 2 },
  { month: 'Mar', spend: 420000, trips: 5 },
  { month: 'Apr', spend: 310000, trips: 4 },
  { month: 'May', spend: 250000, trips: 3 },
  { month: 'Jun', spend: 375000, trips: 4 },
  { month: 'Jul', spend: 555000, trips: 6 },
];
