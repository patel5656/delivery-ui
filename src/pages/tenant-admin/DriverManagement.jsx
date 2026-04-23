import React from 'react';
import { Package, Users, UserPlus, Phone, MapPin, Truck, AlertTriangle, MoreHorizontal, CheckCircle2, X, Camera, FileText, Calendar, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DriverManagement = () => {
  const [showOnboardModal, setShowOnboardModal] = React.useState(false);
  const drivers = [
    { id: 1, name: 'Alex Johnson', phone: '+1 (555) 012-3456', vehicle: 'Van-08', status: 'On Duty', shift: 'Morning', rating: 4.9, location: 'Queens, NY' },
    { id: 2, name: 'Sarah Connor', phone: '+1 (555) 987-6543', vehicle: 'Truck-02', status: 'Available', shift: 'Night', rating: 4.7, location: 'Brooklyn Hub' },
    { id: 3, name: 'Michael Smith', phone: '+1 (555) 456-7890', vehicle: 'Bike-05', status: 'On Break', shift: 'Evening', rating: 4.5, location: 'Manhattan, NY' },
    { id: 4, name: 'David Lee', phone: '+1 (555) 246-8135', vehicle: 'Van-12', status: 'Offline', shift: 'Morning', rating: 4.8, location: 'Last seen: NJ' },
    { id: 5, name: 'Emma Wilson', phone: '+1 (555) 135-7924', vehicle: 'Truck-04', status: 'Emergency', shift: 'Night', rating: 4.2, location: 'Bronx, NY' },
  ];

  return (
    <>
      {/* Onboarding Modal */}
      <AnimatePresence>
        {showOnboardModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOnboardModal(false)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg relative z-10 shadow-2xl font-['Inter'] overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-200">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Onboard Driver</h3>
                    <p className="text-slate-500 font-medium text-xs">Add a new personnel to your delivery force.</p>
                  </div>
                </div>
                <button onClick={() => setShowOnboardModal(false)} className="p-3 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 border border-transparent hover:border-slate-100">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-8 overflow-y-auto">
                <div className="flex justify-center">
                   <div className="relative group">
                      <div className="w-24 h-24 rounded-[2rem] bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center group-hover:border-primary-400 transition-colors cursor-pointer overflow-hidden">
                         <Camera className="w-8 h-8 text-slate-300 group-hover:text-primary-500" />
                         <span className="text-[10px] font-black text-slate-400 mt-1">UPLOAD</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary-600 border-4 border-white flex items-center justify-center text-white shadow-lg shadow-primary-200">
                         <UserPlus className="w-3 h-3" />
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-primary-600 uppercase tracking-widest ml-1">Full Name</label>
                        <input type="text" placeholder="John Doe" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-300" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-primary-600 uppercase tracking-widest ml-1">Contact Number</label>
                        <div className="relative">
                           <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                           <input type="text" placeholder="+1 (555) 000-0000" className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-300" />
                        </div>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary-600 uppercase tracking-widest ml-1">License Number</label>
                      <div className="relative">
                         <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                         <input type="text" placeholder="DL-XXXX-XXXX-XXXX" className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-300" />
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-primary-600 uppercase tracking-widest ml-1">Vehicle Type</label>
                        <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-500/10 outline-none transition-all cursor-pointer">
                           <option>Van</option>
                           <option>Truck (Heavy)</option>
                           <option>Motorcycle</option>
                           <option>Bicycle</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-primary-600 uppercase tracking-widest ml-1">Hire Date</label>
                        <div className="relative">
                           <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                           <input type="date" className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-500/10 outline-none transition-all" />
                        </div>
                      </div>
                   </div>
                </div>

                <div className="p-5 bg-primary-50 rounded-3xl border border-primary-100/50 flex gap-4">
                   <Info className="w-6 h-6 text-primary-600 shrink-0 mt-0.5" />
                   <div className="space-y-1">
                      <p className="text-[11px] text-primary-900 font-bold leading-relaxed">
                         By onboarding, the driver will receive an SMS invite to download the DeliveryPro driver app and set their login credentials.
                      </p>
                   </div>
                </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                <button onClick={() => setShowOnboardModal(false)} className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">Cancel</button>
                <button onClick={() => setShowOnboardModal(false)} className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary-500/30 hover:bg-primary-700 transition-all">Invite Driver</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-['Inter']">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Driver Network</h2>
            <p className="text-slate-500 font-medium text-sm">Manage your delivery force, active shifts, and performance metrics.</p>
          </div>
          <button 
            onClick={() => setShowOnboardModal(true)}
            className="btn-primary flex items-center justify-center gap-2 group transition-all"
          >
            <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Onboard New Driver
          </button>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Fleet', val: '24', icon: Users, color: 'text-slate-600' },
          { label: 'Active Now', val: '18', icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'Incidents', val: '1', icon: AlertTriangle, color: 'text-rose-500' },
          { label: 'Avg Rating', val: '4.8', icon: Truck, color: 'text-primary-500' },
          { label: 'Open Shifts', val: '3', icon: Phone, color: 'text-amber-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-soft">
            <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className="text-xl font-black text-slate-800 tracking-tight">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-['Inter']">
        {drivers.map(driver => (
          <motion.div 
            key={driver.id} 
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-soft group relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-primary-50`}></div>
            
            <div className="flex items-start justify-between relative z-10 mb-6">
              <div className="flex gap-4">
                 <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden border-2 border-white shadow-sm">
                    <img src={`https://i.pravatar.cc/150?u=${driver.id}`} alt={driver.name} className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <h4 className="font-black text-slate-800 leading-tight">{driver.name}</h4>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter mt-1">{driver.shift} Shift</p>
                 </div>
              </div>
              <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                 <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 relative z-10">
               <div className="flex items-center gap-3 text-slate-500">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-bold tracking-tight">{driver.phone}</span>
               </div>
               <div className="flex items-center gap-3 text-slate-500">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium truncate">{driver.location}</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight flex items-center gap-1.5 ${
                    driver.status === 'On Duty' ? 'bg-emerald-50 text-emerald-600' :
                    driver.status === 'Available' ? 'bg-blue-50 text-blue-600' :
                    driver.status === 'Emergency' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                       driver.status === 'On Duty' ? 'bg-emerald-500' :
                       driver.status === 'Available' ? 'bg-blue-500' :
                       driver.status === 'Emergency' ? 'bg-rose-500 animate-ping' : 'bg-slate-400'
                    }`}></div>
                    {driver.status}
                  </div>
                  <span className="text-xs font-black text-slate-700 bg-slate-50 px-2 py-1 rounded-lg">⭐ {driver.rating}</span>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between relative z-10">
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Vehicle</p>
                  <p className="text-sm font-black text-slate-800">{driver.vehicle}</p>
               </div>
               <button className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary-700 shadow-lg shadow-primary-200 transition-all">
                  Track Live
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
    </>
  );
};

export default DriverManagement;
