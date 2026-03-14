import React from 'react';
import { 
  X, 
  Factory, 
  MapPin, 
  Activity, 
  ShieldCheck, 
  ShieldAlert,
  Calendar,
  Layers,
  Container,
  User,
  Phone,
  Mail,
  FileText,
  BadgeCheck,
  Ban,
  RotateCcw
} from 'lucide-react';

const IndustryReviewModal = ({ industry, credentials, onApprove, onReject, onCancel }) => {
  if (!industry) return null;

  return (
    <div className="bg-[#0f1115] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
      {/* Header */}
      <div className="p-8 border-b border-white/5 bg-gradient-to-r from-rose-500/10 to-transparent flex items-center justify-between">
        <div className="flex items-center gap-5">
           <div className="w-14 h-14 bg-rose-500 rounded-2xl flex items-center justify-center shadow-xl shadow-rose-500/20">
              <Factory className="text-white" size={32} />
           </div>
           <div>
              <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{industry.industryName}</h2>
              <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.3em] mt-1 italic">
                 Regulatory Verification Protocol
              </p>
           </div>
        </div>
        <button 
           onClick={onCancel}
           className="p-3 bg-white/5 hover:bg-rose-500 text-white/50 hover:text-white rounded-2xl transition-all border border-white/10"
        >
           <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-10 space-y-12 no-scrollbar">
        {/* Basic Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white/5 p-6 rounded-3xl border border-white/5 flex flex-col gap-2">
              <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest">Industry Classification</p>
              <p className="text-lg font-black text-white italic uppercase tracking-tight">{industry.industryType}</p>
           </div>
           <div className="bg-white/5 p-6 rounded-3xl border border-white/5 flex flex-col gap-2">
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Regional Jurisdiction</p>
              <p className="text-lg font-black text-white italic uppercase tracking-tight">{industry.district}</p>
           </div>
             <div className="bg-white/5 p-6 rounded-3xl border border-white/5 flex flex-col gap-2">
                <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Compliance Status</p>
                <p className="text-lg font-black text-white italic uppercase tracking-tight">{industry.approval_status || 'Under Review'}</p>
             </div>
        </div>

        {/* Core Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           {/* Technical Specs */}
           <div className="space-y-6">
              <h3 className="text-xs font-black text-rose-500 uppercase tracking-[0.3em] mb-4 border-l-4 border-rose-500 pl-4">Technical Specifications</h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3 text-text-muted">
                       <Container size={18} />
                       <span className="text-[10px] font-black uppercase tracking-widest font-bold">Product Spectrum</span>
                    </div>
                    <span className="font-black text-white italic uppercase">{industry.productName}</span>
                 </div>
                 <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3 text-text-muted">
                       <Activity size={18} />
                       <span className="text-[10px] font-black uppercase tracking-widest font-bold">Planned Activity</span>
                    </div>
                    <span className="font-black text-white italic uppercase">{industry.productActivity}</span>
                 </div>
                 <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3 text-text-muted">
                       <Layers size={18} />
                       <span className="text-[10px] font-black uppercase tracking-widest font-bold">Production Yield</span>
                    </div>
                    <span className="font-black text-white italic uppercase">{industry.productionCapacity} {industry.unit}/YR</span>
                 </div>
              </div>
           </div>

           {/* Legal & Entity */}
           <div className="space-y-6">
              <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.3em] mb-4 border-l-4 border-blue-500 pl-4">Statutory Evidence</h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3 text-text-muted">
                       <FileText size={18} />
                       <span className="text-[10px] font-black uppercase tracking-widest font-bold">GST Identification</span>
                    </div>
                    <span className="font-black text-white italic uppercase">{industry.gstNumber}</span>
                 </div>
                 <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3 text-text-muted">
                       <FileText size={18} />
                       <span className="text-[10px] font-black uppercase tracking-widest font-bold">Tax PAN Code</span>
                    </div>
                    <span className="font-black text-white italic uppercase">{industry.panNumber}</span>
                 </div>
                 <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3 text-text-muted">
                       <BadgeCheck size={18} />
                       <span className="text-[10px] font-black uppercase tracking-widest font-bold">Registration Ref</span>
                    </div>
                    <span className="font-black text-white italic uppercase">{industry.registrationNumber}</span>
                 </div>
              </div>
           </div>

           {/* Contact Channels */}
           <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em] mb-4 border-l-4 border-emerald-500 pl-4">Executive Contact Grid</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4">
                    <div className="flex items-center gap-3 text-text-muted font-bold text-[10px] uppercase tracking-widest">
                       <User size={16} /> Lead Representative
                    </div>
                    <p className="font-black text-white italic uppercase">{industry.ownerName}</p>
                 </div>
                 <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4">
                    <div className="flex items-center gap-3 text-text-muted font-bold text-[10px] uppercase tracking-widest">
                       <Phone size={16} /> Secure Mobile
                    </div>
                    <p className="font-black text-white italic uppercase">{industry.contactMobile}</p>
                 </div>
                 <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4">
                    <div className="flex items-center gap-3 text-text-muted font-bold text-[10px] uppercase tracking-widest">
                       <Mail size={16} /> Authorized Email
                    </div>
                    <p className="font-black text-white italic lowercase text-xs">{industry.contactEmail}</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Actions / Credentials Footer */}
      <div className="p-8 border-t border-white/5 bg-white/5">
         {credentials ? (
           <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] p-8 animate-in slide-in-from-bottom duration-500">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20">
                    <BadgeCheck className="text-white" size={24} />
                 </div>
                 <div>
                    <h4 className="text-xl font-black text-white italic uppercase tracking-tight">Access Credentials Generated</h4>
                    <p className="text-emerald-500/60 text-[10px] font-bold uppercase tracking-widest italic leading-tight">Synchronize these details with the industrial node</p>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-2">
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest flex items-center gap-2">
                       <Mail size={12} /> Authorized ID
                    </p>
                    <p className="font-black text-white italic truncate">{credentials.email}</p>
                 </div>
                 <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-2">
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest flex items-center gap-2">
                       <ShieldCheck size={12} /> Temporal Key
                    </p>
                    <p className="font-black text-emerald-500 italic text-xl tracking-wider select-all">{credentials.temporaryPassword}</p>
                 </div>
              </div>
           </div>
         ) : (
           <div className="flex gap-4">
              {industry.approval_status !== 'Approved' ? (
                <>
                  <button 
                    onClick={() => onApprove(industry._id)}
                    className="flex-1 py-5 bg-emerald-500 text-white rounded-[1.5rem] font-black shadow-2xl shadow-emerald-500/30 hover:scale-[1.02] transition-all uppercase italic tracking-widest flex items-center justify-center gap-3"
                  >
                    <BadgeCheck size={24} /> Authorize Deployment
                  </button>
                  <button 
                    onClick={() => onReject(industry._id)}
                    className="flex-1 py-5 bg-rose-500 text-white rounded-[1.5rem] font-black shadow-2xl shadow-rose-500/30 hover:scale-[1.02] transition-all uppercase italic tracking-widest flex items-center justify-center gap-3"
                  >
                    <Ban size={24} /> Deny Synchronization
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => onApprove(industry._id)}
                  className="flex-1 py-5 bg-blue-600 text-white rounded-[1.5rem] font-black shadow-2xl shadow-blue-600/30 hover:scale-[1.02] transition-all uppercase italic tracking-widest flex items-center justify-center gap-3"
                >
                  <RotateCcw size={24} /> Regenerate Login Credentials
                </button>
              )}
           </div>
         )}
      </div>
    </div>
  );
};

export default IndustryReviewModal;
