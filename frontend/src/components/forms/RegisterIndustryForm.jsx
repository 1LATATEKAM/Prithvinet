import React, { useState } from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormMultiSelect from './FormMultiSelect';
import FormDate from './FormDate';
import FormTextarea from './FormTextarea';
import { Send, RotateCcw, X } from 'lucide-react';

const RegisterIndustryForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    industryName: '',
    industryType: '',
    industryCategory: '',
    ownerName: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    city: '',
    district: '',
    state: '',
    latitude: '',
    longitude: '',
    emissionParameters: [],
    approval_status: 'Pending',
    consentExpiryDate: ''
  });

  const [errors, setErrors] = useState({});

  const typeOptions = ['Steel Plant', 'Power Plant', 'Cement Plant', 'Chemical Plant', 'Sponge Iron Plant', 'Brick Kiln', 'Manufacturing'];
  const categoryOptions = ['Red', 'Orange', 'Green', 'White'];
  const parameterOptions = ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'Noise'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.industryName) newErrors.industryName = 'Industry name is required';
    if (!formData.industryType) newErrors.industryType = 'Select industry type';
    if (!formData.industryCategory) newErrors.industryCategory = 'Select category';
    if (!formData.ownerName) newErrors.ownerName = 'Owner name is required';
    if (!formData.contactEmail || !/\S+@\S+\.\S+/.test(formData.contactEmail)) newErrors.contactEmail = 'Valid email is required';
    if (!formData.contactPhone) newErrors.contactPhone = 'Phone is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.consentExpiryDate) newErrors.consentExpiryDate = 'Expiry date is required';
    if (!formData.latitude || formData.latitude < -90 || formData.latitude > 90) newErrors.latitude = 'Invalid latitude';
    if (!formData.longitude || formData.longitude < -180 || formData.longitude > 180) newErrors.longitude = 'Invalid longitude';
    
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
        <h2 className="text-xl font-black text-white italic tracking-tight uppercase">Register Industry Unit</h2>
        <button type="button" onClick={onCancel} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50">
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <FormInput 
          label="Industry Name" 
          name="industryName" 
          value={formData.industryName} 
          onChange={handleChange} 
          error={errors.industryName} 
        />
        <FormSelect 
          label="Industry Type" 
          name="industryType" 
          value={formData.industryType} 
          onChange={handleChange} 
          options={typeOptions}
          error={errors.industryType} 
        />
        <FormSelect 
          label="Category" 
          name="industryCategory" 
          value={formData.industryCategory} 
          onChange={handleChange} 
          options={categoryOptions}
          error={errors.industryCategory} 
        />
        <FormInput 
          label="Owner/Representative Name" 
          name="ownerName" 
          value={formData.ownerName} 
          onChange={handleChange} 
          error={errors.ownerName} 
        />
        <FormInput 
          label="Contact Email" 
          name="contactEmail" 
          type="email"
          value={formData.contactEmail} 
          onChange={handleChange} 
          error={errors.contactEmail} 
        />
        <FormInput 
          label="Contact Phone" 
          name="contactPhone" 
          value={formData.contactPhone} 
          onChange={handleChange} 
          error={errors.contactPhone} 
        />
        <div className="md:col-span-2">
           <FormTextarea 
             label="Complete Address" 
             name="address" 
             value={formData.address} 
             onChange={handleChange} 
             error={errors.address} 
           />
        </div>
        <FormInput label="City" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
        <FormInput label="District" name="district" value={formData.district} onChange={handleChange} />
        <FormInput label="State" name="state" value={formData.state} onChange={handleChange} error={errors.state} />
        <FormDate label="Consent Expiry Date" name="consentExpiryDate" value={formData.consentExpiryDate} onChange={handleChange} error={errors.consentExpiryDate} />
        <FormInput label="Latitude" name="latitude" type="number" step="0.0001" value={formData.latitude} onChange={handleChange} error={errors.latitude} />
        <FormInput label="Longitude" name="longitude" type="number" step="0.0001" value={formData.longitude} onChange={handleChange} error={errors.longitude} />
        
        <div className="md:col-span-2">
          <FormMultiSelect 
            label="Emission/Monitoring Parameters" 
            name="emissionParameters" 
            selectedOptions={formData.emissionParameters} 
            onChange={handleChange} 
            options={parameterOptions}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button 
          type="submit" 
          className="flex-1 py-4 bg-orange-500 text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Send size={18} /> REGISTER UNIT
        </button>
        <button 
          type="button" 
          onClick={() => setFormData({ ...formData, industryName: '', emissionParameters: [] })}
          className="px-6 py-4 bg-white/5 text-white/50 font-bold rounded-2xl border border-white/5 hover:bg-white/10 transition-all"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </form>
  );
};

export default RegisterIndustryForm;
