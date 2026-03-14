import React, { useState, useEffect } from 'react';
import { 
  Factory, 
  MapPin, 
  Activity, 
  Plus, 
  Search, 
  ShieldCheck,
  ShieldAlert,
  Loader2,
  RefreshCw,
  X
} from 'lucide-react';

import { getIndustries, createIndustry, deleteIndustry, updateIndustry } from '../api/monitoring';
import RegisterIndustryForm from '../components/forms/RegisterIndustryForm';
import IndustryReviewModal from '../components/modals/IndustryReviewModal';
import api from '../api/client';

const Industries = () => {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState(null);

  const fetchIndustries = async () => {
    setRefreshing(true);
    try {
      const res = await getIndustries();
      setIndustries(res.data);
    } catch (error) {
      console.error('Error fetching industries:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  const handleRegister = async (formData) => {
    try {
      await createIndustry(formData);
      setShowForm(false);
      fetchIndustries();
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Failed to register industry: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleApprove = async (id) => {
    try {
      // Logic for approval, similar to AdminDashboard
      // We'll need a way for the user to select the regional officer or use a default
      // For now, let's assume we use the centralized API
      const res = await api.post('/admin/approve-industry', { 
         industryId: id, 
         status: 'Approved'
      });
      
      if (res.data.credentials) {
        setGeneratedCredentials(res.data.credentials);
        // Update selected industry status locally so the modal reflects the change
        setSelectedIndustry(prev => ({ ...prev, approval_status: 'Approved' }));
      } else {
        alert('Industry Approved Successfully');
        setShowReviewModal(false);
      }
      fetchIndustries();
    } catch (error) {
       alert('Approval failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleReject = async (id) => {
    try {
      await api.post('/admin/approve-industry', { 
         industryId: id, 
         status: 'Rejected'
      });
      alert('Industry Rejected');
      setShowReviewModal(false);
      fetchIndustries();
    } catch (error) {
       alert('Rejection failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const filteredIndustries = industries.filter(ind => 
    ind.industryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ind.industryType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in relative min-h-screen">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-rose-500/10 p-8 rounded-[2.5rem] border border-rose-500/20 shadow-2xl shadow-rose-500/5">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-rose-500 rounded-2xl flex items-center justify-center shadow-xl shadow-rose-500/30">
            <Factory className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Industrial Assets</h1>
            <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 mt-1">
              <Activity size={12} className="text-rose-500 animate-pulse" /> Compliance Synchronization
            </p>
          </div>
        </div>
        
        <div className="flex gap-4">
           <div className="relative group flex-1 md:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-rose-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search Assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-rose-500/50 w-full md:w-64 transition-all uppercase placeholder:italic"
              />
           </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-[500px]">
          <Loader2 className="animate-spin text-rose-500 mb-8" size={64} />
          <p className="text-text-muted font-black italic animate-pulse tracking-[0.5em] uppercase text-xs">Querying Regional Database...</p>
        </div>
      ) : (
        <div className="glass-morphism rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl pb-10">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left min-w-[1000px]">
              <thead>
                <tr className="bg-white/[0.03] text-text-muted text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/5">
                  <th className="py-8 px-10">Industrial Profile</th>
                  <th className="py-8 px-10">Asset Type</th>
                  <th className="py-8 px-10">Zone / District</th>
                  <th className="py-8 px-10">Compliance Status</th>
                  <th className="py-8 px-10 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredIndustries.length > 0 ? (
                  filteredIndustries.map(industry => (
                    <tr 
                      key={industry._id} 
                      onClick={() => { setSelectedIndustry(industry); setShowReviewModal(true); }}
                      className="hover:bg-white/[0.04] transition-colors group cursor-pointer"
                    >
                      <td className="py-8 px-10">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-text-muted group-hover:text-rose-500 group-hover:bg-rose-500/10 transition-all shadow-inner border border-white/5">
                            <Factory size={22} />
                          </div>
                          <div>
                            <p className="font-black text-lg text-white tracking-tight uppercase italic">{industry.industryName}</p>
                            <p className="text-[9px] text-text-muted font-black uppercase tracking-[0.2em] mt-1">{industry.ownerName || 'Unknown Custodian'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-8 px-10">
                        <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-muted group-hover:text-rose-500 transition-colors">
                          {industry.industryType}
                        </span>
                      </td>
                      <td className="py-8 px-10">
                        <div className="flex items-center gap-2 text-xs font-black text-text-muted uppercase tracking-wider italic">
                          <MapPin size={14} className="text-rose-500" />
                          {industry.district || 'Central District'}
                        </div>
                      </td>
                      <td className="py-8 px-10">
                        <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] flex items-center w-fit gap-2 shadow-xl
                          ${industry.approval_status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                            industry.approval_status === 'Rejected' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 
                            'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
                          {industry.approval_status === 'Approved' ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                          {industry.approval_status || 'Pending'}
                        </span>
                      </td>
                      <td className="py-8 px-10 text-right">
                        <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="px-6 py-2 bg-rose-500/10 text-rose-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-rose-500/20">
                             Review Node
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-32 text-center text-text-muted italic font-black uppercase tracking-[0.4em] text-xs">
                      No matching industrial nodes detected.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl bg-black/70 animate-in zoom-in duration-300">
           <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto no-scrollbar">
              <RegisterIndustryForm onSubmit={handleRegister} onCancel={() => setShowForm(false)} />
           </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl bg-black/70 animate-in fade-in duration-300">
           <div className="w-full max-w-5xl overflow-hidden">
              <IndustryReviewModal 
                 industry={selectedIndustry} 
                 credentials={generatedCredentials}
                 onApprove={handleApprove}
                 onReject={handleReject}
                 onCancel={() => {
                   setShowReviewModal(false);
                   setGeneratedCredentials(null);
                 }} 
              />
           </div>
        </div>
      )}
    </div>
  );
};

export default Industries;
