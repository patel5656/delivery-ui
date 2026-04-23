import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { 
  Home, 
  Package, 
  Wallet, 
  User, 
  Navigation,
} from 'lucide-react';
import { Routes, Route } from 'react-router-dom';
import DriverOverview from './driver/DriverOverview';
import DriverJobs from './driver/DriverJobs';
import DriverWallet from './driver/DriverWallet';
import DriverProfile from './driver/DriverProfile';

const DriverDashboard = () => {
  const menuItems = [
    { label: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/driver' },
    { label: 'My Tasks', icon: <Package className="w-5 h-5" />, path: '/driver/jobs' },
    { label: 'Map & Navigate', icon: <Navigation className="w-5 h-5" />, path: '/driver/map' },
    { label: 'Finance', icon: <Wallet className="w-5 h-5" />, path: '/driver/wallet' },
    { label: 'Profile Settings', icon: <User className="w-5 h-5" />, path: '/driver/profile' },
  ];

  return (
    <DashboardLayout title="Driver Command Center" menuItems={menuItems}>
      <Routes>
        <Route path="/" element={<DriverOverview />} />
        <Route path="/jobs" element={<DriverJobs jobs={[]} />} /> {/* Pass real jobs from state/context later */}
        <Route path="/wallet" element={<DriverWallet />} />
        <Route path="/profile" element={<DriverProfile />} />
        <Route path="/map" element={
          <div className="bg-slate-100 rounded-[2.5rem] aspect-video flex items-center justify-center border-8 border-white shadow-soft">
             <div className="text-center">
                <Navigation className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Live Navigation Active</p>
             </div>
          </div>
        } />
      </Routes>
    </DashboardLayout>
  );
};

export default DriverDashboard;
