import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { 
  Play, 
  Clock, 
  MapPin, 
  AlertCircle, 
  Users, 
  Truck, 
  Package, 
  Navigation,
  Activity,
  Zap
} from 'lucide-react';
import { Routes, Route } from 'react-router-dom';
import OrderQueue from './dispatcher/OrderQueue';
import RoutePlanner from './dispatcher/RoutePlanner';
import ExceptionsControl from './dispatcher/ExceptionsControl';
import DispatcherDrivers from './dispatcher/DispatcherDrivers';
import DispatcherOverview from './dispatcher/DispatcherOverview';

const DispatcherDashboard = () => {
  const menuItems = [
    { label: 'Live Operations', icon: <Play className="w-5 h-5" />, path: '/dispatcher' },
    { label: 'Order Queue', icon: <Package className="w-5 h-5" />, path: '/dispatcher/orders' },
    { label: 'Route Planner', icon: <Navigation className="w-5 h-5" />, path: '/dispatcher/routes' },
    { label: 'Exceptions', icon: <AlertCircle className="w-5 h-5" />, path: '/dispatcher/exceptions' },
    { label: 'Drivers', icon: <Users className="w-5 h-5" />, path: '/dispatcher/drivers' },
  ];

  return (
    <DashboardLayout 
      title="Live Operations Command" 
      menuItems={menuItems}
      user={{ name: 'Maria Rodriguez', role: 'Main Dispatcher' }}
    >
      <Routes>
        <Route path="/" element={<DispatcherOverview />} />
        <Route path="/orders" element={<OrderQueue />} />
        <Route path="/routes" element={<RoutePlanner />} />
        <Route path="/exceptions" element={<ExceptionsControl />} />
        <Route path="/drivers" element={<DispatcherDrivers />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DispatcherDashboard;
