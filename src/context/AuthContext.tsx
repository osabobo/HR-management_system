import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type UserRole = 'Administrator' | 'HR Manager' | 'Employee';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar: string;
  position: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  register: async () => false,
});

const mockUsers: Record<string, AuthUser> = {
  'admin@hrms.ng': { id: 'U001', name: 'Chukwuemeka Nwosu', email: 'admin@hrms.ng', role: 'Administrator', department: 'Engineering', avatar: 'CN', position: 'System Administrator' },
  'hr@hrms.ng':    { id: 'U002', name: 'Fatima Al-Amin', email: 'hr@hrms.ng', role: 'HR Manager', department: 'Human Resources', avatar: 'FA', position: 'HR Manager' },
  'emp@hrms.ng':   { id: 'U003', name: 'Adaeze Okonkwo', email: 'emp@hrms.ng', role: 'Employee', department: 'Engineering', avatar: 'AO', position: 'Senior Software Engineer' },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('hrms-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, _password: string, role: UserRole): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 1200)); // simulate network
    const found = mockUsers[email] || {
      id: 'U_GUEST', name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email, role, department: role === 'HR Manager' ? 'Human Resources' : 'General', avatar: email.substring(0, 2).toUpperCase(), position: role,
    };
    const authUser = { ...found, role };
    setUser(authUser);
    localStorage.setItem('hrms-user', JSON.stringify(authUser));
    return true;
  };

  const register = async (name: string, email: string, _password: string, role: UserRole): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 1400));
    const newUser: AuthUser = {
      id: 'U_NEW', name, email, role,
      department: role === 'HR Manager' ? 'Human Resources' : 'General',
      avatar: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      position: role,
    };
    setUser(newUser);
    localStorage.setItem('hrms-user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hrms-user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
