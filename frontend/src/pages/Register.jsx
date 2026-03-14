import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Shield, 
  Mail, 
  Lock, 
  User, 
  Briefcase, 
  MapPin, 
  ArrowRight, 
  Loader2,
  AlertCircle,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { register } from '../api/auth';
import PageBranding from '../components/PageBranding';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Citizen',
    region: '',
    officeId: ''
  });
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await register(formData);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. System encryption active.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <PageBranding title="System Enrollment" />
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="w-full max-w-2xl relative z-10 animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 bg-primary rounded-2xl items-center justify-center shadow-2xl shadow-primary/30 mb-6">
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2 uppercase italic">Prithvi<span className="text-primary">Net</span> Registry</h1>
          <p className="text-text-muted font-black uppercase tracking-[0.4em] text-xs">Authorize New Identity Node</p>
        </div>

        <div className="glass-morphism rounded-[3rem] p-12 border border-white/10 shadow-2xl">
          {success ? (
            <div className="text-center py-20 animate-in zoom-in duration-500">
               <div className="w-20 h-20 bg-emerald-500 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-emerald-500/30 mb-8">
                  <CheckCircle2 className="text-white" size={40} />
               </div>
               <h2 className="text-3xl font-black text-white uppercase italic tracking-tight mb-4 text-glow">Identity Initialized</h2>
               <p className="text-text-muted font-bold tracking-widest uppercase text-xs">Neutralizing security buffers... Redirecting to uplink.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-1 italic">Full Identity</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-all" size={18} />
                    <input
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Anand Satpathy"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm font-black uppercase italic"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-1 italic">Comms / Agency Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-all" size={18} />
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="id@grid.gov.in"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm font-black uppercase italic"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-1 italic">Security Credential</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-all" size={18} />
                    <input
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm font-black italic"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-1 italic">Authorization Request</label>
                   <div className="relative group">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-all" size={18} />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm font-black uppercase italic appearance-none"
                    >
                      <option value="Citizen" className="bg-background">Citizen Overseer</option>
                      <option value="Industry Representative" className="bg-background">Commercial Liaison</option>
                    </select>
                   </div>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-4 p-5 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-500 text-xs font-black uppercase italic tracking-widest animate-shake">
                  <AlertCircle size={20} />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-black font-black py-5 rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:opacity-50 uppercase italic tracking-widest"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    Initialize Identity <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <p className="mt-10 text-center text-sm font-black uppercase italic tracking-[0.2em] text-text-muted">
          Existing Identity? <Link to="/login" className="text-primary hover:text-white transition-colors ml-2 underline">Re-Authorize</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
