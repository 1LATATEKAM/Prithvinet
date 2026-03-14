import React, { useState } from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormTextarea from './FormTextarea';
import { Send, RotateCcw, X } from 'lucide-react';

const CreateEntityForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    entityName: '',
    entityType: '',
    registrationNumber: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    city: '',
    state: '',
    latitude: '',
    longitude: ''
  });

  const [errors, setErrors] = useState({});

  const typeOptions = ['Industry', 'Regional Office', 'Monitoring Agency', 'Laboratory', 'Government Department'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.entityName) newErrors.entityName = 'Entity name is required';
    if (!formData.entityType) newErrors.entityType = 'Select entity type';
    if (!formData.registrationNumber) newErrors.registrationNumber = 'Registration number required';
    if (!formData.contactPerson) newErrors.contactPerson = 'Contact person required';
    if (!formData.contactEmail || !/\S+@\S+\.\S+/.test(formData.contactEmail)) newErrors.contactEmail = 'Valid email required';
    if (!formData.contactPhone) newErrors.contactPhone = 'Phone required';
    if (!formData.address) newErrors.address = 'Address required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-900/40 rounded-3xl border border-white/5 shadow-2xl animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-white italic tracking-tight uppercase">Create Organization Entity</h2>
        <button type="button" onClick={onCancel} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50">
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <FormInput label="Entity Name" name="entityName" value={formData.entityName} onChange={handleChange} error={errors.entityName} />
        <FormSelect label="Entity Type" name="entityType" value={formData.entityType} onChange={handleChange} options={typeOptions} error={errors.entityType} />
        <FormInput label="Registration/License No." name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} error={errors.registrationNumber} />
        <FormInput label="Contact Person" name="contactPerson" value={formData.contactPerson} onChange={handleChange} error={errors.contactPerson} />
        <FormInput label="Contact Email" name="contactEmail" type="email" value={formData.contactEmail} onChange={handleChange} error={errors.contactEmail} />
        <FormInput label="Contact Phone" name="contactPhone" value={formData.contactPhone} onChange={handleChange} error={errors.contactPhone} />
        <div className="md:col-span-2">
           <FormTextarea label="Office Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
        </div>
        <FormInput label="City" name="city" value={formData.city} onChange={handleChange} />
        <FormInput label="State" name="state" value={formData.state} onChange={handleChange} />
        <FormInput label="Latitude" name="latitude" type="number" step="0.0001" value={formData.latitude} onChange={handleChange} />
        <FormInput label="Longitude" name="longitude" type="number" step="0.0001" value={formData.longitude} onChange={handleChange} />
      </div>

      <div className="flex gap-4 mt-6">
        <button 
          type="submit" 
          className="flex-1 py-4 bg-blue-500 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
        >
          <Send size={18} /> CREATE ENTITY
        </button>
        <button 
          type="button" 
          onClick={() => setFormData({ ...formData, entityName: '' })}
          className="px-6 py-4 bg-white/5 text-white/50 font-bold rounded-2xl border border-white/5 hover:bg-white/10 transition-all"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </form>
  );
};

export default CreateEntityForm;
