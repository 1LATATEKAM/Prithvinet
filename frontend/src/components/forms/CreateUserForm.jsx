import React, { useState } from 'react';
import { UserPlus, Mail, Shield, User, Briefcase, MapPin, X } from 'lucide-react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

const CreateUserForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Regional Officer',
    region: '',
    officeId: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Initial password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const roles = [
    'Admin',
    'Regional Officer',
    'Monitoring Team',
    'Industry User'
  ];

  return (
    <div className="bg-[#0a0a0c] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
      
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/30 shadow-lg shadow-indigo-500/10">
            <UserPlus className="text-indigo-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">Provision Identity</h2>
            <p className="text-text-muted text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 mt-1">
              <Shield size={12} className="text-indigo-500" /> Access Control Level 4
            </p>
          </div>
        </div>
        <button 
          onClick={onCancel}
          className="p-3 hover:bg-white/5 rounded-xl text-text-muted transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormInput
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="e.g. Rajesh Kumar"
            icon={<User size={18} />}
          />
          <FormInput
            label="Gov Email / Agency ID"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="id@cecb.gov.in"
            icon={<Mail size={18} />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormInput
            label="Temporary Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="••••••••"
            icon={<Shield size={18} />}
          />
          <FormSelect
            label="Authorization Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={roles}
            error={errors.role}
            icon={<Briefcase size={18} />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormInput
            label="Assigned Region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            placeholder="e.g. Raipur Zone"
            icon={<MapPin size={18} />}
          />
          <FormInput
            label="Office Identifier"
            name="officeId"
            value={formData.officeId}
            onChange={handleChange}
            placeholder="e.g. RO-RAI-01"
            icon={<Briefcase size={18} />}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:bg-white/10 hover:text-white transition-all shadow-xl"
          >
            Abort Protocol
          </button>
          <button
            type="submit"
            className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-2xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all uppercase italic tracking-widest text-sm flex items-center justify-center gap-3"
          >
            Authorize <UserPlus size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
