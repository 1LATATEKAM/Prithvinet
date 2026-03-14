import React, { useState } from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormMultiSelect from './FormMultiSelect';
import { Send, RotateCcw, X } from 'lucide-react';

const RegisterWaterSourceForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    sourceName: '',
    sourceType: '',
    region: '',
    district: '',
    latitude: '',
    longitude: '',
    monitoringParameters: [],
    usageType: '',
    pollutionRiskLevel: 'Low'
  });

  const [errors, setErrors] = useState({});

  const typeOptions = ['River', 'Lake', 'Reservoir', 'Groundwater', 'Canal', 'Industrial Effluent Channel'];
  const usageOptions = ['Drinking', 'Agriculture', 'Industrial', 'Mixed'];
  const riskOptions = ['Low', 'Moderate', 'High'];
  const parameterOptions = ['PH', 'Dissolved Oxygen', 'BOD', 'COD', 'Turbidity', 'Temperature', 'Heavy Metals'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.sourceName) newErrors.sourceName = 'Source name is required';
    if (!formData.sourceType) newErrors.sourceType = 'Select source type';
    if (!formData.region) newErrors.region = 'Region is required';
    if (!formData.usageType) newErrors.usageType = 'Select usage type';
    if (!formData.latitude) newErrors.latitude = 'Latitude required';
    if (!formData.longitude) newErrors.longitude = 'Longitude required';
    
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
        <h2 className="text-xl font-black text-white italic tracking-tight uppercase">Register Water Source</h2>
        <button type="button" onClick={onCancel} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50">
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <FormInput label="Source Name" name="sourceName" value={formData.sourceName} onChange={handleChange} error={errors.sourceName} />
        <FormSelect label="Source Type" name="sourceType" value={formData.sourceType} onChange={handleChange} options={typeOptions} error={errors.sourceType} />
        <FormInput label="Region" name="region" value={formData.region} onChange={handleChange} error={errors.region} />
        <FormInput label="District" name="district" value={formData.district} onChange={handleChange} />
        <FormInput label="Latitude" name="latitude" type="number" step="0.0001" value={formData.latitude} onChange={handleChange} error={errors.latitude} />
        <FormInput label="Longitude" name="longitude" type="number" step="0.0001" value={formData.longitude} onChange={handleChange} error={errors.longitude} />
        <FormSelect label="Usage Type" name="usageType" value={formData.usageType} onChange={handleChange} options={usageOptions} error={errors.usageType} />
        <FormSelect label="Risk Level" name="pollutionRiskLevel" value={formData.pollutionRiskLevel} onChange={handleChange} options={riskOptions} />
        
        <div className="md:col-span-2">
          <FormMultiSelect 
            label="Monitoring Parameters" 
            name="monitoringParameters" 
            selectedOptions={formData.monitoringParameters} 
            onChange={handleChange} 
            options={parameterOptions}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button 
          type="submit" 
          className="flex-1 py-4 bg-teal-500 text-white font-black rounded-2xl shadow-xl shadow-teal-500/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
        >
          <Send size={18} /> REGISTER SOURCE
        </button>
        <button 
          type="button" 
          onClick={() => setFormData({ ...formData, sourceName: '', monitoringParameters: [] })}
          className="px-6 py-4 bg-white/5 text-white/50 font-bold rounded-2xl border border-white/5 hover:bg-white/10 transition-all"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </form>
  );
};

export default RegisterWaterSourceForm;
