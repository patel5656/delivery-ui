import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import TenantAdminDashboard from './pages/TenantAdminDashboard';
import DispatcherDashboard from './pages/DispatcherDashboard';
import DriverMobileDashboard from './pages/DriverDashboard';
import ClientPortal from './pages/ClientDashboard';

// Placeholder components for Dashboards - to be built in detail later
const DashboardPlaceholder = ({ title }) => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-10">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">{title}</h1>
      <p className="text-slate-600 mb-8">This is the production-ready UI for {title}. Features are being implemented...</p>
      <button 
        onClick={() => window.location.href = '/'}
        className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium"
      >
        Back to Login
      </button>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<Navigate to="/" />} />
        
        {/* Dashboards */}
        <Route path="/super-admin/*" element={<SuperAdminDashboard />} />
        <Route path="/tenant-admin/*" element={<TenantAdminDashboard />} />
        <Route path="/dispatcher/*" element={<DispatcherDashboard />} />
        <Route path="/driver/*" element={<DriverMobileDashboard />} />
        <Route path="/client/*" element={<ClientPortal />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
