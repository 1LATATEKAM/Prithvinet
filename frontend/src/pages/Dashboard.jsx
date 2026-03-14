import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import RegionalOfficerDashboard from './RegionalOfficerDashboard';
import MonitoringTeamDashboard from './MonitoringTeamDashboard';
import IndustryDashboard from './IndustryDashboard';
import CitizenComplaint from './CitizenComplaint';

const Dashboard = () => {
  const { user, isAdmin, isRegionalOfficer, isMonitoringTeam, isIndustryUser } = useAuth();

  if (!user) return <div className="p-20 text-center italic text-text-muted">Loading session...</div>;

  if (isAdmin) return <AdminDashboard />;
  if (isRegionalOfficer) return <RegionalOfficerDashboard />;
  if (isMonitoringTeam) return <MonitoringTeamDashboard />;
  if (isIndustryUser) return <IndustryDashboard />;

  return (
    <div className="p-12 glass-morphism rounded-[3rem] text-center border border-white/5">
      <h1 className="text-3xl font-black italic mb-4 text-primary uppercase tracking-tighter">PrithviNet Portal</h1>
      <p className="text-text-muted font-bold tracking-widest uppercase text-xs">Welcome, {user.name}. Your role does not have a specialized dashboard yet.</p>
    </div>
  );
};

export default Dashboard;
