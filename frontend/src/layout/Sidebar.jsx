import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Map, 
  Users, 
  Factory, 
  Waves, 
  Activity, 
  FileWarning, 
  FileText, 
  ShieldCheck, 
  Cpu, 
  Box,
  LogOut,
  X,
  Building2
} from 'lucide-react';


const Sidebar = ({ isOpen, close }) => {
  const { user, logout, isAdmin, isRegionalOfficer, isMonitoringTeam, isIndustryUser } = useAuth();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', show: !isIndustryUser },
    { name: 'Regional Hub', icon: Map, path: '/regional', show: isRegionalOfficer },
    { name: 'Field Entry', icon: Activity, path: '/monitoring', show: isMonitoringTeam },
    { name: 'Corporate Grid', icon: Factory, path: '/industry', show: false },
    { name: 'Upload Report', icon: FileText, path: '/upload-report', show: isIndustryUser },
    { name: 'Monitoring Stations', icon: Activity, path: '/stations', show: isAdmin || isRegionalOfficer },
    { name: 'Industries', icon: Factory, path: '/industries', show: isAdmin || isRegionalOfficer },
    { name: 'Water Sources', icon: Waves, path: '/water-sources', show: isAdmin || isRegionalOfficer },
    { name: 'Alerts', icon: FileWarning, path: '/alerts', show: (isAdmin || isRegionalOfficer) },
    { name: 'Reports', icon: FileText, path: '/reports', show: isAdmin || isRegionalOfficer || isMonitoringTeam },
    { name: 'AI Copilot', icon: Cpu, path: '/ai-copilot', show: isAdmin || isRegionalOfficer },
    { name: '3D Simulation', icon: Box, path: '/simulation', show: !isIndustryUser },
    { name: 'User Management', icon: Users, path: '/users', show: isAdmin },

  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={close}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 w-64 h-screen glass-morphism z-50 flex flex-col p-4 border-r border-white/5
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:block
      `}>

        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-white">PrithviNet</h1>
              <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">CECB Monitoring</p>
            </div>

          </div>
          <button 
            onClick={close}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar no-scrollbar">
          {navItems.filter(item => item.show).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) close();
              }}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                    : 'text-text-muted hover:bg-white/5 hover:text-white'
                }`
              }

            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/5 pt-4">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white text-xs font-bold uppercase shadow-lg shadow-secondary/20">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-white">{user?.name}</p>
              <p className="text-[10px] text-text-muted truncate uppercase tracking-wider font-bold">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-text-muted hover:bg-rose-500/10 hover:text-rose-500 rounded-xl transition-all group"
          >
            <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>
        </div>

      </div>
    </>
  );
};

export default Sidebar;
