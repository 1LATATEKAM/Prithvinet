import React, { useState, useEffect } from 'react';
import { Send, MapPin, Database, Loader2 } from 'lucide-react';
import { getStations, submitPollutionData } from '../../api/monitoring';

const WaterSubmission = () => {
  const [formData, setFormData] = useState({
    station_id: '',
    ph: '',
    dissolved_oxygen: '',
    bod: '',
    cod: '',
    turbidity: ''
  });
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchStations = async () => {
      setLoading(true);
      try {
        const { data } = await getStations();
        setStations(data.filter(s => s.monitoring_type === 'Water'));
      } catch (error) {
        console.error('Failed to fetch stations', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { station_id, ...water_data } = formData;
      await submitPollutionData({
        stationId: station_id,
        reading_type: 'Water',
        data: Object.fromEntries(
          Object.entries(water_data).map(([k, v]) => [k, parseFloat(v)])
        )
      });
      alert('Water quality data submitted successfully!');
      setFormData({
        station_id: '',
        ph: '',
        dissolved_oxygen: '',
        bod: '',
        cod: '',
        turbidity: ''
      });
    } catch (error) {
      alert('Error submitting data: ' + (error.response?.data?.message || error.message));
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-primary">Water Quality Monitoring</h2>
          <p className="text-text-muted text-sm mt-1">Submit chemical and physical parameters of water bodies.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 uppercase tracking-widest">
          <Database size={14} /> Secure Link Established
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-muted block flex items-center gap-2">
              <MapPin size={14} className="text-primary" /> Water Source Registry
            </label>
            <select 
              name="station_id"
              value={formData.station_id}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all appearance-none"
              required
              disabled={loading}
            >
              <option value="">{loading ? 'Loading stations...' : 'Choose a water source...'}</option>
              {stations.map(s => <option key={s._id} value={s._id}>{s.location_name}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <InputGroup label="pH Level" name="ph" value={formData.ph} onChange={handleChange} placeholder="e.g. 7.2" />
          <InputGroup label="Dissolved Oxygen (mg/L)" name="dissolved_oxygen" value={formData.dissolved_oxygen} onChange={handleChange} placeholder="e.g. 6.5" />
          <InputGroup label="B.O.D (mg/L)" name="bod" value={formData.bod} onChange={handleChange} placeholder="e.g. 2.1" />
          <InputGroup label="C.O.D (mg/L)" name="cod" value={formData.cod} onChange={handleChange} placeholder="e.g. 15.4" />
          <InputGroup label="Turbidity (NTU)" name="turbidity" value={formData.turbidity} onChange={handleChange} placeholder="e.g. 3.2" />
        </div>

        <div className="pt-6 border-t border-white/5">
          <button 
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50"
          >
            {submitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            {submitting ? 'Recording...' : 'Record Water Data'}
          </button>
        </div>
      </form>
    </div>
  );
};

const InputGroup = ({ label, name, value, onChange, placeholder }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-text-muted">{label}</label>
    <input
      type="number"
      step="0.01"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all placeholder:text-white/10"
      required
    />
  </div>
);

export default WaterSubmission;
