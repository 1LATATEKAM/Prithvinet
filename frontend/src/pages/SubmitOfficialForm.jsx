import React, { useState } from 'react';
import { 
  Upload, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Loader2,
  FileText,
  Building
} from 'lucide-react';
import api from '../api/client';

const SubmitOfficialForm = () => {
  const [formData, setFormData] = useState({
    formReference: '',
    applicantName: '',
    mobile: '',
    email: '',
    district: ''
  });
  const [signedForm, setSignedForm] = useState(null);
  const [letterhead, setLetterhead] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const districts = ['Raipur', 'Bilaspur', 'Durg', 'Korba', 'Raigarh', 'Bastar', 'Surguja'];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!signedForm) return alert('Signed form is required');
    
    setIsSubmitting(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('signedForm', signedForm);
    if (letterhead) data.append('letterhead', letterhead);

    try {
      await api.post('/industries/submit-form', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess(true);
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Verification failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 animate-fade-in text-center">
         <div className="w-full max-w-2xl glass-morphism rounded-[4rem] p-16 border border-white/10 shadow-2xl relative">
            <div className="w-24 h-24 bg-emerald-500 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-emerald-500/30 mb-10">
               <CheckCircle2 className="text-white" size={48} />
            </div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-6 selection:bg-emerald-500">Submission Synchronized</h2>
            <p className="text-text-muted font-bold tracking-[0.2em] uppercase text-xs mb-10 leading-relaxed mx-auto max-w-md">
               Your signed documentation has been transmitted to the CECB Central Grid. Identity nodes will be activated upon regional oversight approval.
            </p>
            <div className="p-8 bg-white/5 border border-white/5 rounded-3xl mb-12">
               <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2 italic">Batch Reference</p>
               <p className="text-xl font-black italic text-white">{formData.formReference}</p>
            </div>
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full py-6 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase italic tracking-widest text-sm hover:bg-white/10 transition-all"
            >
               Return to Base
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060608] py-20 px-6 lg:px-12 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-16">
           <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter uppercase mb-4 leading-none text-glow">Verification <span className="text-primary">& Filing</span></h1>
           <p className="text-text-muted font-bold tracking-[0.3em] uppercase text-[10px] italic">Official CECB Document Submission Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           {/* Section 1: Verification Metadata */}
           <div className="glass-morphism rounded-[3rem] p-10 border border-white/5 space-y-8 h-full">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                    <ShieldCheck size={20} />
                 </div>
                 <h3 className="text-xl font-black uppercase italic tracking-tight">Identity Verification</h3>
              </div>

              <div className="space-y-6">
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-3 block italic ml-1">WC Reference Number</label>
                    <input 
                      name="formReference"
                      value={formData.formReference}
                      onChange={handleInputChange}
                      placeholder="WC-YYYYMMDD-..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm font-black italic uppercase tracking-wider text-primary"
                    />
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-3 block italic ml-1">Applicant Name</label>
                       <input 
                         name="applicantName"
                         value={formData.applicantName}
                         onChange={handleInputChange}
                         placeholder="Mr./Ms."
                         className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-white/20 transition-all text-sm font-black italic uppercase"
                       />
                    </div>
                    <div>
                       <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-3 block italic ml-1">Contact Mobile</label>
                       <input 
                         name="mobile"
                         value={formData.mobile}
                         onChange={handleInputChange}
                         placeholder="91-..."
                         className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-white/20 transition-all text-sm font-black italic uppercase"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-3 block italic ml-1">Agency Email</label>
                       <input 
                         name="email"
                         value={formData.email}
                         onChange={handleInputChange}
                         placeholder="id@corp.in"
                         className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-white/20 transition-all text-sm font-black italic uppercase"
                       />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-3 block italic ml-1">District</label>
                        <select 
                          name="district"
                          value={formData.district}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-white/20 transition-all text-sm font-black italic uppercase appearance-none"
                        >
                           <option value="" className="bg-black">Select District</option>
                           {districts.map(d => <option key={d} value={d} className="bg-black">{d}</option>)}
                        </select>
                    </div>
                 </div>
              </div>
           </div>

           {/* Section 2: Document Ingestion */}
           <div className="glass-morphism rounded-[3rem] p-10 border border-white/5 space-y-8 flex flex-col justify-between h-full">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                    <Upload size={20} />
                 </div>
                 <h3 className="text-xl font-black uppercase italic tracking-tight">Official Document Ingestion</h3>
              </div>

              <div className="space-y-6 flex-1">
                 {/* Signed Form Upload */}
                 <div className="relative group cursor-pointer h-32 overflow-hidden border-2 border-dashed border-white/10 rounded-3xl hover:border-emerald-500/50 transition-all">
                    <input 
                       type="file" 
                       onChange={(e) => handleFileChange(e, setSignedForm)}
                       className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                       accept="application/pdf"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                       {signedForm ? (
                          <div className="flex flex-col items-center text-emerald-500">
                             <CheckCircle2 size={32} />
                             <span className="text-[9px] font-black uppercase tracking-[0.2em] mt-2 truncate w-40 text-center">{signedForm.name}</span>
                          </div>
                       ) : (
                          <>
                             <FileText size={32} className="text-white/20 group-hover:text-emerald-500 transition-colors" />
                             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted">Upload Signed Intimation Form (Max 10MB)</span>
                          </>
                       )}
                    </div>
                 </div>

                 {/* Letterhead Upload */}
                 <div className="relative group cursor-pointer h-32 overflow-hidden border-2 border-dashed border-white/10 rounded-3xl hover:border-primary/50 transition-all">
                    <input 
                       type="file" 
                       onChange={(e) => handleFileChange(e, setLetterhead)}
                       className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                       accept="application/pdf"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                       {letterhead ? (
                          <div className="flex flex-col items-center text-primary">
                             <CheckCircle2 size={32} />
                             <span className="text-[9px] font-black uppercase tracking-[0.2em] mt-2 truncate w-40 text-center">{letterhead.name}</span>
                          </div>
                       ) : (
                          <>
                             <Building size={32} className="text-white/20 group-hover:text-primary transition-colors" />
                             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted">Upload Letterhead PDF (Max 5MB)</span>
                          </>
                       )}
                    </div>
                 </div>
              </div>

              <div className="pt-8">
                 <button 
                   type="submit"
                   disabled={isSubmitting}
                   className="w-full py-6 bg-emerald-600 text-white rounded-2xl font-black uppercase italic tracking-widest text-sm shadow-2xl shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group"
                 >
                    {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : (
                       <>Verify & Transmit <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" /></>
                    )}
                 </button>
              </div>
           </div>
        </form>

        <div className="mt-12 flex items-start gap-4 p-8 bg-white/5 border border-white/5 rounded-[2.5rem]">
           <AlertCircle className="text-text-muted flex-shrink-0" size={24} />
           <div className="space-y-4">
              <p className="text-[10px] text-text-muted font-black uppercase tracking-[0.3em] italic">Submission Notice:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   'Verify reference number before submission',
                   'Ensure PDF is digitally signed or stamped',
                   'File must match the generated WC Intimation',
                   'Admin verification takes 2-4 working days'
                 ].map((note, i) => (
                    <li key={i} className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-white/40">
                       <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                       {note}
                    </li>
                 ))}
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitOfficialForm;
