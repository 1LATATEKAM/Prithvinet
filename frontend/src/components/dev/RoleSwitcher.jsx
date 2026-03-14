import React, { useState } from 'react';
import { 
  Terminal, 
  User, 
  Shield, 
  Building2, 
  Activity, 
  ChevronUp, 
  ChevronDown,
  RefreshCcw,
  Eye
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const RoleSwitcher = () => {
  const { user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    { name: 'Admin', icon: Shield, color: 'text-purple-500' },
    { name: 'Regional Officer', icon: User, color: 'text-blue-500' },
    { name: 'Monitoring Team', icon: Activity, color: 'text-emerald-500' },
    { name: 'Industry User', icon: Building2, color: 'text-amber-500' },
  ];

  const switchRole = (roleName) => {
    if (!user) return;
    
    const updatedUser = { 
      ...user, 
      role: roleName,
      // Add fake references for testing if needed
      assigned_region: roleName === 'Regional Officer' ? '65f2a1b2c3d4e5f67890abcd' : user.assigned_region,
      industry_id: roleName === 'Industry User' ? '65f2b1b2c3d4e5f678901234' : user.industry_id
    };
    
    // Update local storage and context
    localStorage.setItem('user', JSON.stringify(updatedUser));
    window.location.reload(); // Force reload to re-run jurisdictional filters
  };

  if (process.env.NODE_ENV === 'production' && false) return null; // Safety for prod

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <div className={`bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl transition-all duration-500 overflow-hidden shadow-2xl ${isOpen ? 'w-64 h-auto p-4 mb-4' : 'w-0 h-0 p-0 mb-0 opacity-0'}`}>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
           <Terminal size={18} className="text-primary" />
           <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Dev Role Switcher</span>
        </div>
        
        <div className="space-y-2">
           {roles.map((r, i) => (
              <button 
                key={i}
                onClick={() => switchRole(r.name)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all hover:bg-white/5 border border-transparent ${user?.role === r.name ? 'bg-white/10 border-white/20' : ''}`}
              >
                 <div className="flex items-center gap-3">
                    <r.icon size={16} className={r.color} />
                    <span className="text-[11px] font-bold text-white">{r.name}</span>
                 </div>
                 {user?.role === r.name && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>}
              </button>
           ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10">
           <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest leading-relaxed">
              * Switches role locally for UI testing. May require valid DB references for full functionality.
           </p>
        </div>
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-90 shadow-2xl ${isOpen ? 'rotate-180 bg-primary/20 border-primary/30' : ''}`}
      >
        {isOpen ? <ChevronDown className="text-primary" size={24} /> : <Terminal className="text-white" size={24} />}
      </button>
    </div>
  );
};

export default RoleSwitcher;
