import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, 
  TrendingUp, 
  Users, 
  Truck, 
  Package, 
  Clock, 
  MapPin,
  ChevronRight,
  MoreVertical,
  Plus,
  X,
  User,
  Navigation
} from 'lucide-react';

import { Routes, Route } from 'react-router-dom';
import OrdersManagement from './tenant-admin/OrdersManagement';
import DriverManagement from './tenant-admin/DriverManagement';
import FleetManagement from './tenant-admin/FleetManagement';
import ZoneManagement from './tenant-admin/ZoneManagement';

const QuickStat = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">{label}</p>
      <p className="text-xl font-black text-slate-800 mt-1">{value}</p>
    </div>
  </div>
);

const TenantAdminOverview = () => {
  const [showDispatchModal, setShowDispatchModal] = React.useState(false);
  const [showReportsModal, setShowReportsModal] = React.useState(false);
  const recentOrders = [
    { id: 'ORD-101', customer: 'Alice Wong', destination: 'Brooklyn, NY', status: 'In Transit', time: '10:45 AM' },
    { id: 'ORD-102', customer: 'Bob Smith', destination: 'Queens, NY', status: 'Delivered', time: '09:30 AM' },
    { id: 'ORD-103', customer: 'Charlie Davis', destination: 'Manhattan, NY', status: 'Pending', time: '11:15 AM' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Top Section */}
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Morning, Swift Delivery!</h2>
            <p className="text-slate-500 font-medium">Your operations are running at 94% efficiency today.</p>
         </div>
         <div className="flex gap-3">
            <button 
              onClick={() => setShowReportsModal(true)}
              className="px-4 py-2 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Reports
            </button>
            <button 
              onClick={() => setShowDispatchModal(true)}
              className="btn-primary flex items-center gap-2"
            >
               <Plus className="w-5 h-5" /> New Dispatch
            </button>
         </div>
      </div>

      {/* Reports Generation Modal */}
      <AnimatePresence>
        {showReportsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReportsModal(false)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[2rem] w-full max-w-md relative z-10 shadow-2xl font-['Inter'] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <BarChart className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Generate Report</h3>
                    <p className="text-slate-500 font-medium text-xs">Analyze your business performance.</p>
                  </div>
                </div>
                <button onClick={() => setShowReportsModal(false)} className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Report Category</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Revenue', 'Fleet', 'Drivers', 'Delivery'].map(type => (
                      <button key={type} className="px-4 py-3 border-2 border-slate-50 rounded-2xl text-xs font-bold text-slate-600 hover:border-primary-500/30 hover:bg-primary-50 transition-all text-left flex items-center justify-between group">
                        {type}
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-primary-500"></div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Time Period</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all">
                    <option>Last 24 Hours</option>
                    <option>Last 7 Days</option>
                    <option>Current Month</option>
                    <option>Custom Range</option>
                  </select>
                </div>
              </div>

              <div className="p-6 bg-slate-50/50 border-t border-slate-50 flex gap-3">
                <button onClick={() => setShowReportsModal(false)} className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">Cancel</button>
                <button onClick={() => setShowReportsModal(false)} className="flex-1 py-3 bg-primary-600 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all">Download Report</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* New Dispatch Modal */}
      <AnimatePresence>
        {showDispatchModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDispatchModal(false)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-lg relative z-10 shadow-2xl font-['Inter'] overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-200">
                    <Navigation className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Create New Dispatch</h3>
                    <p className="text-slate-500 font-medium text-xs">Instantly assign a new job to your drivers.</p>
                  </div>
                </div>
                <button onClick={() => setShowDispatchModal(false)} className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 border border-transparent hover:border-slate-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto">
                {/* Customer Section */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] flex items-center gap-2">
                    <User className="w-3 h-3" /> Customer Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Customer Name</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" placeholder="e.g. Acme Corp" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Contact Phone</label>
                      <input type="tel" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                </div>

                {/* Logistics Section */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Logistics Details
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Pickup Address</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" placeholder="Enter pickup location" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Delivery Destination</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" placeholder="Enter delivery location" />
                    </div>
                  </div>
                </div>

                {/* Assignment Section */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Truck className="w-3 h-3" /> Fleet Assignment
                  </h4>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Select Driver</label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 outline-none transition-all cursor-pointer">
                      <option>Next Available Driver (Auto-match)</option>
                      <option>John Smith (Active - 1.2km away)</option>
                      <option>Emily Post (Active - 2.5km away)</option>
                      <option>Michael Scott (On Break)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                <button onClick={() => setShowDispatchModal(false)} className="flex-1 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">Save as Draft</button>
                <button onClick={() => setShowDispatchModal(false)} className="flex-1 py-3.5 bg-primary-600 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all">Launch Dispatch</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         <QuickStat label="Active Orders" value="42" icon={Package} color="bg-blue-50 text-blue-600" />
         <QuickStat label="Drivers Online" value="18" icon={Users} color="bg-emerald-50 text-emerald-600" />
         <QuickStat label="Fleet Utilization" value="82%" icon={Truck} color="bg-amber-50 text-amber-600" />
         <QuickStat label="Today's Revenue" value="$4,280" icon={TrendingUp} color="bg-primary-50 text-primary-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Activity Area */}
         <div className="lg:col-span-2 space-y-8">
            {/* Order Trend Mockup */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="font-black text-slate-800">Orders Delivery Trend</h3>
                  <select className="bg-slate-50 border-none rounded-lg text-xs font-bold text-slate-500 py-1.5 focus:ring-0">
                     <option>Last 7 Days</option>
                     <option>Last 30 Days</option>
                  </select>
               </div>
               <div className="h-64 flex items-end justify-between gap-2 px-2">
                  {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      key={i} 
                      className="flex-1 bg-primary-500/10 rounded-t-xl relative group"
                    >
                       <motion.div 
                         initial={{ height: 0 }}
                         animate={{ height: '100%' }}
                         transition={{ delay: i * 0.1 }}
                         className="absolute bottom-0 left-0 right-0 bg-primary-600 rounded-t-xl group-hover:bg-primary-700 transition-colors"
                       ></motion.div>
                    </motion.div>
                  ))}
               </div>
               <div className="flex justify-between mt-4 px-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                    <span key={d} className="text-[10px] font-bold text-slate-400 uppercase">{d}</span>
                  ))}
               </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden">
               <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                  <h3 className="font-black text-slate-800">Live Dispatches</h3>
                  <button className="text-primary-600 font-bold text-xs">View Queue</button>
               </div>
               <div className="divide-y divide-slate-50">
                  {recentOrders.map(order => (
                     <div key={order.id} className="p-4 flex items-center justify-between group hover:bg-slate-50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              order.status === 'Delivered' ? 'bg-emerald-500 text-emerald-600' : 'bg-blue-50 text-blue-600'
                           }`}>
                              <Package className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="font-bold text-slate-800 text-sm">{order.customer}</p>
                              <p className="text-xs text-slate-500 font-medium">To: {order.destination}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="text-right">
                              <p className="text-xs font-black text-slate-700 leading-none">{order.status}</p>
                              <p className="text-[10px] text-slate-400 font-bold mt-1">{order.time}</p>
                           </div>
                           <button className="p-2 text-slate-300 group-hover:text-slate-600">
                              <ChevronRight className="w-5 h-5" />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Sidebar Info Area */}
         <div className="space-y-8">
            {/* Driver Status Card */}
            <div className="bg-sidebar-dark rounded-3xl p-6 text-white overflow-hidden relative">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-600/20 rounded-full blur-3xl"></div>
               <h3 className="font-bold mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary-400" />
                  Driver Status
               </h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <span className="text-sm text-slate-300 font-medium tracking-wide">On Trip</span>
                     <span className="font-black">12</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[60%]"></div>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-sm text-slate-300 font-medium tracking-wide">Waiting</span>
                     <span className="font-black">4</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-amber-500 w-[20%]"></div>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-sm text-slate-300 font-medium tracking-wide">Inactive</span>
                     <span className="font-black">2</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-slate-700 w-[10%]"></div>
                  </div>
               </div>
               <button className="w-full mt-6 py-3 bg-slate-800 hover:bg-slate-700 transition-colors rounded-xl text-xs font-bold">
                  Manage Drivers
               </button>
            </div>

            {/* Announcements / Alerts */}
            <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl">
               <h4 className="text-rose-600 font-black text-xs uppercase tracking-widest mb-3">Live Alert</h4>
               <p className="text-slate-800 text-sm font-bold leading-relaxed">
                  Heavy traffic detected in Bronx area. Expected delay ~20 mins for all pending orders.
               </p>
               <button className="mt-4 text-xs font-black text-rose-600 hover:underline">Re-route All</button>
            </div>
         </div>
      </div>
    </div>
  );
};

const TenantAdminDashboard = () => {
  const menuItems = [
    { label: 'Dashboard', icon: <Package className="w-5 h-5" />, path: '/tenant-admin' },
    { label: 'Orders', icon: <Clock className="w-5 h-5" />, path: '/tenant-admin/orders' },
    { label: 'Drivers', icon: <Users className="w-5 h-5" />, path: '/tenant-admin/drivers' },
    { label: 'Fleet', icon: <Truck className="w-5 h-5" />, path: '/tenant-admin/fleet' },
    { label: 'Zones', icon: <MapPin className="w-5 h-5" />, path: '/tenant-admin/zones' },
  ];

  return (
    <DashboardLayout 
      title="Business Command Center" 
      menuItems={menuItems}
      user={{ name: 'Swift Admin', role: 'Tenant Manager' }}
    >
      <Routes>
        <Route path="/" element={<TenantAdminOverview />} />
        <Route path="/orders" element={<OrdersManagement />} />
        <Route path="/drivers" element={<DriverManagement />} />
        <Route path="/fleet" element={<FleetManagement />} />
        <Route path="/zones" element={<ZoneManagement />} />
      </Routes>
    </DashboardLayout>
  );
};

export default TenantAdminDashboard;
