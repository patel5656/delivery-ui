import React from 'react';
import { MapPin, Plus, Navigation, Layers, Info, Trash2, Edit3, X, ChevronDown, DollarSign, Percent } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ZoneCard = ({ zone }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft font-['Inter'] relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl -mr-12 -mt-12 transition-all group-hover:scale-150 ${zone.color} opacity-20`}></div>
    
    <div className="flex items-start justify-between mb-6 relative z-10">
      <div className="flex items-center gap-3">
         <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${zone.color} text-white shadow-lg shadow-gray-200`}>
            <MapPin className="w-5 h-5" />
         </div>
         <div>
            <h4 className="font-black text-slate-800 leading-tight">{zone.name}</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{zone.orders} Orders Today</p>
         </div>
      </div>
      <div className="flex gap-1">
         <button className="p-2 text-slate-300 hover:text-primary-600 transition-colors"><Edit3 className="w-4 h-4" /></button>
         <button className="p-2 text-slate-300 hover:text-rose-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
      </div>
    </div>

    <div className="space-y-3 mb-6 relative z-10">
      <div className="flex justify-between text-xs font-bold">
         <span className="text-slate-400 uppercase tracking-tighter">Base Rate</span>
         <span className="text-slate-800">${zone.rate.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-xs font-bold">
         <span className="text-slate-400 uppercase tracking-tighter">Surcharge</span>
         <span className="text-emerald-600">+{zone.surcharge}%</span>
      </div>
      <div className="flex justify-between text-xs font-bold pt-2 border-t border-slate-50">
         <span className="text-slate-400 uppercase tracking-tighter">Avg Delivery</span>
         <span className="text-slate-800">{zone.avgTime} min</span>
      </div>
    </div>

    <div className="flex gap-2 relative z-10">
       <button className="flex-1 py-2 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
          <Navigation className="w-3.5 h-3.5" /> Boundaries
       </button>
    </div>
  </div>
);

const ZoneManagement = () => {
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const zones = [
    { name: 'Manhattan Core', orders: 142, rate: 12.50, surcharge: 25, avgTime: 18, color: 'bg-primary-600' },
    { name: 'Brooklyn Hub', orders: 89, rate: 8.00, surcharge: 10, avgTime: 24, color: 'bg-indigo-600' },
    { name: 'Queens North', orders: 56, rate: 9.50, surcharge: 15, avgTime: 32, color: 'bg-amber-600' },
    { name: 'Financial District', orders: 204, rate: 15.00, surcharge: 40, avgTime: 12, color: 'bg-rose-600' },
    { name: 'Jersey City', orders: 34, rate: 18.00, surcharge: 5, avgTime: 45, color: 'bg-emerald-600' },
    { name: 'Astoria Zone', orders: 67, rate: 7.00, surcharge: 0, avgTime: 22, color: 'bg-blue-600' },
  ];

  return (
    <>
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-['Inter']">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg relative z-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-primary-600">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight leading-none">New Service Zone</h3>
                    <p className="text-primary-100 font-medium text-xs mt-1.5 opacity-80 uppercase tracking-widest">Pricing & Radius Configuration</p>
                  </div>
                </div>
                <button onClick={() => setShowCreateModal(false)} className="p-3 hover:bg-white/10 rounded-xl transition-colors text-white/50 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-8 overflow-y-auto">
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] ml-1">Zone Designation</label>
                      <input type="text" placeholder="e.g. Downtown Logistics Hub" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-300" />
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] ml-1">Base Delivery Rate</label>
                        <div className="relative">
                           <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                           <input type="number" placeholder="0.00" className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-300" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] ml-1">Dynamic Surcharge</label>
                        <div className="relative">
                           <Percent className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                           <input type="number" placeholder="0" className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-300" />
                        </div>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] ml-1">Radius Type</label>
                      <div className="grid grid-cols-2 gap-4">
                         <button className="p-4 bg-slate-50 border-2 border-primary-100 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold text-primary-600 group hover:border-primary-300 transition-all">
                            <Navigation className="w-4 h-4" /> Polygon Map
                         </button>
                         <button className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all">
                            <Layers className="w-4 h-4" /> Custom Radius
                         </button>
                      </div>
                   </div>

                </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">Discard</button>
                <button onClick={() => setShowCreateModal(false)} className="flex-[2] py-4 bg-primary-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary-500/30 hover:bg-primary-700 transition-all flex items-center justify-center gap-2">
                   Open Map Editor <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-7xl mx-auto space-y-8 font-['Inter']"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Service Zones & Pricing</h2>
            <p className="text-slate-500 font-medium text-sm">Geofence your operations and set location-based delivery rates.</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center justify-center gap-2 px-6 hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5" />
            Create New Zone
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8 self-start">
             <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                <Layers className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10" />
                <h3 className="text-xl font-black mb-4">Gis Mapping Tool</h3>
                <p className="text-slate-400 text-sm font-medium mb-8">Draw custom polygons on the map to define your delivery radiuses and surge pricing areas.</p>
                <div className="space-y-3">
                   <button 
                    onClick={() => setShowCreateModal(true)}
                    className="w-full py-3 bg-primary-600 hover:bg-primary-700 transition-all rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary-900/50"
                   >
                      <Navigation className="w-4 h-4" /> Start Mapping
                   </button>
                   <button className="w-full py-3 bg-white/5 hover:bg-white/10 transition-all rounded-2xl text-xs font-black uppercase tracking-widest text-slate-300">
                      Import GeoJSON
                   </button>
                </div>
             </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
             {zones.map((z, i) => (
               <ZoneCard key={i} zone={z} />
             ))}
             <button 
              onClick={() => setShowCreateModal(true)}
              className="border-2 border-dashed border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center gap-3 text-slate-300 hover:border-primary-200 hover:text-primary-400 transition-all group"
             >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                   <Plus className="w-6 h-6" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest">Add Service Zone</span>
             </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ZoneManagement;
