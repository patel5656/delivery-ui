import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { 
  Users, 
  Building2, 
  CreditCard, 
  BarChart3, 
  Settings, 
  ShieldCheck, 
  Plus,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TenantManagement from './super-admin/TenantManagement';
import SubscriptionPlans from './super-admin/SubscriptionPlans';
import SystemUsers from './super-admin/SystemUsers';
import PlatformSettings from './super-admin/PlatformSettings';

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-soft"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        <div className="flex items-center mt-2">
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            {change}
          </span>
        </div>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </motion.div>
);

const SuperAdminOverview = () => {
  const navigate = useNavigate();
  const tenants = [
    { id: 1, name: 'Swift Delivery Co.', plan: 'Enterprise', status: 'Active', revenue: '$12,400', users: 45 },
    { id: 2, name: 'Metro Couriers', plan: 'Professional', status: 'Active', revenue: '$8,200', users: 12 },
    { id: 3, name: 'Global Logistics', plan: 'Enterprise', status: 'Pending', revenue: '$0', users: 0 },
    { id: 4, name: 'FastTrack Solutions', plan: 'Basic', status: 'Active', revenue: '$1,500', users: 5 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Welcome Back, Admin</h2>
          <p className="text-sm md:text-base text-slate-500">Here's what's happening across the platform today.</p>
        </div>

      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Total Tenants" 
          value="124" 
          change="+12%" 
          icon={Building2} 
          color="bg-blue-50 text-blue-600" 
        />
        <StatCard 
          title="Total Revenue" 
          value="$45,280" 
          change="+8.5%" 
          icon={CreditCard} 
          color="bg-emerald-50 text-emerald-600" 
        />
        <StatCard 
          title="Active Users" 
          value="1,842" 
          change="+24%" 
          icon={Users} 
          color="bg-amber-50 text-amber-600" 
        />
        <StatCard 
          title="Deliveries" 
          value="12.5k" 
          change="+15%" 
          icon={ShieldCheck} 
          color="bg-indigo-50 text-indigo-600" 
        />
      </div>

      {/* Recent Tenants Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Recent Tenant Onboarding</h3>
          <button className="text-primary-600 font-semibold text-sm hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] md:text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-4 md:px-6 py-4">Company Name</th>
                <th className="px-4 md:px-6 py-4 hidden sm:table-cell">Subscription Plan</th>
                <th className="px-4 md:px-6 py-4">Status</th>
                <th className="px-4 md:px-6 py-4 hidden lg:table-cell">Users</th>
                <th className="px-4 md:px-6 py-4 text-right sm:text-left">MTD Revenue</th>
                <th className="px-4 md:px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                        {tenant.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-700">{tenant.name}</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 hidden sm:table-cell">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      tenant.plan === 'Enterprise' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {tenant.plan}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        tenant.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}></div>
                      <span className="text-xs md:text-sm text-slate-600 font-medium">{tenant.status}</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm font-medium text-slate-600 hidden lg:table-cell">{tenant.users}</td>
                  <td className="px-4 md:px-6 py-4 text-sm font-bold text-slate-800 text-right sm:text-left">{tenant.revenue}</td>
                  <td className="px-4 md:px-6 py-4 text-right">
                    <button 
                      onClick={() => navigate('/super-admin/tenants')}
                      className="px-4 py-2 bg-white hover:bg-primary-600 text-slate-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-slate-200 hover:border-primary-600 shadow-sm hover:shadow-lg hover:shadow-primary-200"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SuperAdminDashboard = () => {
  const menuItems = [
    { label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" />, path: '/super-admin' },
    { label: 'Tenants', icon: <Building2 className="w-5 h-5" />, path: '/super-admin/tenants' },
    { label: 'Plans', icon: <CreditCard className="w-5 h-5" />, path: '/super-admin/plans' },
    { label: 'Users', icon: <Users className="w-5 h-5" />, path: '/super-admin/users' },
    { label: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/super-admin/settings' },
  ];

  return (
    <DashboardLayout 
      title="Platform Overview" 
      menuItems={menuItems}
      user={{ name: 'SaaS Admin', role: 'Super Administrator' }}
    >
      <Routes>
        <Route path="/" element={<SuperAdminOverview />} />
        <Route path="/tenants" element={<TenantManagement />} />
        <Route path="/plans" element={<SubscriptionPlans />} />
        <Route path="/users" element={<SystemUsers />} />
        <Route path="/settings" element={<PlatformSettings />} />
      </Routes>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
