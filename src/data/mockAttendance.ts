export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: 'Present' | 'Absent' | 'Leave' | 'Late' | 'Holiday';
  hoursWorked: number;
  notes?: string;
}

const genDate = (offset: number) => {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  return d.toISOString().split('T')[0];
};

export const mockAttendance: AttendanceRecord[] = [
  { id: 'ATT001', employeeId: 'EMP001', employeeName: 'Adaeze Okonkwo', department: 'Engineering', date: genDate(0), checkIn: '08:02', checkOut: '17:15', status: 'Present', hoursWorked: 9.2 },
  { id: 'ATT002', employeeId: 'EMP002', employeeName: 'Chukwuemeka Nwosu', department: 'Engineering', date: genDate(0), checkIn: '07:55', checkOut: '18:00', status: 'Present', hoursWorked: 10.1 },
  { id: 'ATT003', employeeId: 'EMP003', employeeName: 'Fatima Al-Amin', department: 'Human Resources', date: genDate(0), checkIn: '09:20', checkOut: '17:00', status: 'Late', hoursWorked: 7.7, notes: 'Traffic delay reported' },
  { id: 'ATT004', employeeId: 'EMP004', employeeName: 'Babatunde Adeleke', department: 'Sales', date: genDate(0), checkIn: '08:30', checkOut: '17:30', status: 'Present', hoursWorked: 9.0 },
  { id: 'ATT005', employeeId: 'EMP005', employeeName: 'Ngozi Eze', department: 'Sales', date: genDate(0), checkIn: null, checkOut: null, status: 'Absent', hoursWorked: 0 },
  { id: 'ATT006', employeeId: 'EMP006', employeeName: 'Ibrahim Musa', department: 'Finance', date: genDate(0), checkIn: null, checkOut: null, status: 'Leave', hoursWorked: 0, notes: 'Annual leave approved' },
  { id: 'ATT007', employeeId: 'EMP007', employeeName: 'Yetunde Coker', department: 'Finance', date: genDate(0), checkIn: '08:00', checkOut: '17:00', status: 'Present', hoursWorked: 9.0 },
  { id: 'ATT008', employeeId: 'EMP008', employeeName: 'Obinna Chukwu', department: 'Customer Support', date: genDate(0), checkIn: '08:45', checkOut: '17:15', status: 'Present', hoursWorked: 8.5 },
  { id: 'ATT009', employeeId: 'EMP009', employeeName: 'Sade Williams', department: 'Customer Support', date: genDate(0), checkIn: '08:05', checkOut: '18:30', status: 'Present', hoursWorked: 10.4 },
  { id: 'ATT010', employeeId: 'EMP010', employeeName: 'Abdullahi Garba', department: 'Marketing', date: genDate(0), checkIn: '09:00', checkOut: '17:00', status: 'Present', hoursWorked: 8.0 },
  // Yesterday
  { id: 'ATT011', employeeId: 'EMP001', employeeName: 'Adaeze Okonkwo', department: 'Engineering', date: genDate(1), checkIn: '08:10', checkOut: '17:20', status: 'Present', hoursWorked: 9.2 },
  { id: 'ATT012', employeeId: 'EMP002', employeeName: 'Chukwuemeka Nwosu', department: 'Engineering', date: genDate(1), checkIn: '08:00', checkOut: '18:10', status: 'Present', hoursWorked: 10.2 },
  { id: 'ATT013', employeeId: 'EMP003', employeeName: 'Fatima Al-Amin', department: 'Human Resources', date: genDate(1), checkIn: '08:00', checkOut: '17:00', status: 'Present', hoursWorked: 9.0 },
  { id: 'ATT014', employeeId: 'EMP004', employeeName: 'Babatunde Adeleke', department: 'Sales', date: genDate(1), checkIn: null, checkOut: null, status: 'Absent', hoursWorked: 0 },
  { id: 'ATT015', employeeId: 'EMP005', employeeName: 'Ngozi Eze', department: 'Sales', date: genDate(1), checkIn: '09:30', checkOut: '17:30', status: 'Late', hoursWorked: 8.0, notes: 'Client meeting overrun' },
  { id: 'ATT016', employeeId: 'EMP011', employeeName: 'Chiamaka Obi', department: 'Marketing', date: genDate(1), checkIn: '08:00', checkOut: '17:00', status: 'Present', hoursWorked: 9.0 },
  { id: 'ATT017', employeeId: 'EMP015', employeeName: 'Oluwakemi Adeyemi', department: 'Operations', date: genDate(1), checkIn: '07:50', checkOut: '16:55', status: 'Present', hoursWorked: 9.1 },
  { id: 'ATT018', employeeId: 'EMP016', employeeName: 'Emeka Ogbu', department: 'Engineering', date: genDate(1), checkIn: '08:20', checkOut: '18:00', status: 'Present', hoursWorked: 9.7 },
  { id: 'ATT019', employeeId: 'EMP019', employeeName: 'Bola Fashola', department: 'Operations', date: genDate(1), checkIn: '07:45', checkOut: '17:30', status: 'Present', hoursWorked: 9.8 },
  { id: 'ATT020', employeeId: 'EMP020', employeeName: 'Grace Adeola', department: 'Customer Support', date: genDate(1), checkIn: null, checkOut: null, status: 'Leave', hoursWorked: 0, notes: 'Sick leave' },
];

export const attendanceTrendData = [
  { month: 'Jan', present: 88, absent: 5, late: 7 },
  { month: 'Feb', present: 91, absent: 4, late: 5 },
  { month: 'Mar', present: 86, absent: 7, late: 7 },
  { month: 'Apr', present: 89, absent: 4, late: 7 },
  { month: 'May', present: 92, absent: 3, late: 5 },
  { month: 'Jun', present: 87, absent: 6, late: 7 },
  { month: 'Jul', present: 90, absent: 4, late: 6 },
];
