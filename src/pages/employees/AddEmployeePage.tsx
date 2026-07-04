import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface EmployeeForm {
  name: string; email: string; phone: string; department: string;
  position: string; status: string; gender: string; hireDate: string;
  salary: number; experience: number; location: string; manager: string;
}

const departments = ['Engineering', 'Human Resources', 'Sales', 'Finance', 'Customer Support', 'Marketing', 'Operations'];
const statuses = ['Active', 'On Leave', 'Suspended', 'Resigned'];

const AddEmployeePage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<EmployeeForm>({
    defaultValues: { status: 'Active', gender: 'Male', department: 'Engineering' },
  });

  const onSubmit = async (_data: EmployeeForm) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    toast.success('Employee added successfully (mock)!');
    navigate('/employees');
  };

  const Field = ({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) => (
    <div>
      <label className="form-label">{label}</label>
      {children}
      {error && <p className="form-error">{error}</p>}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <button className="btn btn-ghost" onClick={() => navigate('/employees')}>
          <FiArrowLeft size={16} /> Back
        </button>
        <div>
          <h1 className="page-title">Add New Employee</h1>
          <p className="page-subtitle">Fill in the form to onboard a new team member</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card" style={{ padding: 28, marginBottom: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 20 }}>Personal Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Full Name" error={errors.name?.message}>
              <input type="text" className="form-input" placeholder="Adaeze Okonkwo"
                {...register('name', { required: 'Full name is required', minLength: { value: 3, message: 'Min 3 characters' } })} />
            </Field>
            <Field label="Email Address" error={errors.email?.message}>
              <input type="email" className="form-input" placeholder="adaeze@company.ng"
                {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })} />
            </Field>
            <Field label="Phone Number" error={errors.phone?.message}>
              <input type="tel" className="form-input" placeholder="+234 812 345 6789"
                {...register('phone', { required: 'Phone is required' })} />
            </Field>
            <Field label="Gender">
              <select className="form-input" {...register('gender', { required: true })}>
                <option>Male</option>
                <option>Female</option>
              </select>
            </Field>
            <Field label="Location" error={errors.location?.message}>
              <input type="text" className="form-input" placeholder="Lagos" {...register('location', { required: 'Location is required' })} />
            </Field>
            <Field label="Hire Date" error={errors.hireDate?.message}>
              <input type="date" className="form-input" {...register('hireDate', { required: 'Hire date is required' })} />
            </Field>
          </div>
        </div>

        <div className="card" style={{ padding: 28, marginBottom: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)', marginBottom: 20 }}>Employment Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Department">
              <select className="form-input" {...register('department', { required: true })}>
                {departments.map(d => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Position / Job Title" error={errors.position?.message}>
              <input type="text" className="form-input" placeholder="Senior Software Engineer"
                {...register('position', { required: 'Position is required' })} />
            </Field>
            <Field label="Employment Status">
              <select className="form-input" {...register('status')}>
                {statuses.map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Manager" error={errors.manager?.message}>
              <input type="text" className="form-input" placeholder="Manager name"
                {...register('manager', { required: 'Manager is required' })} />
            </Field>
            <Field label="Monthly Salary (₦)" error={errors.salary?.message}>
              <input type="number" className="form-input" placeholder="350000"
                {...register('salary', { required: 'Salary is required', min: { value: 1000, message: 'Invalid salary' } })} />
            </Field>
            <Field label="Years of Experience" error={errors.experience?.message}>
              <input type="number" className="form-input" placeholder="3"
                {...register('experience', { required: 'Experience is required', min: { value: 0, message: 'Min 0' } })} />
            </Field>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-outline" onClick={() => navigate('/employees')}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />
                Saving…
              </span>
            ) : <><FiSave size={15} /> Save Employee</>}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddEmployeePage;
