import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, Map, List, Layers, Plus, Save, RotateCcw, TrendingDown, X, Info, ChevronDown, CheckCircle } from 'lucide-react';

const RoutePlanner = () => {
  const [showSaveModal, setShowSaveModal] = React.useState(false);
  const [isResetting, setIsResetting] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);

  const triggerAction = (message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleResetView = () => {
    if (isResetting) return;
    setIsResetting(true);
    setTimeout(() => {
      setIsResetting(false);
      triggerAction("Map view and route layers have been reset to default.");
    }, 800);
  };

  const activeRoutes = [
    { name: 'Midtown Express Loop', drivers: 3, orders: 42, efficiency: 98 },
    { name: 'Brooklyn North Distribution', drivers: 5, orders: 128, efficiency: 82 },
    { name: 'Queens Hub Connector', drivers: 2, orders: 15, efficiency: 74 }
  ];

  return (
    <>
      {/* Save Plan Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-['Inter']">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSaveModal(false)}
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
                    <Save className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight leading-none text-left">Save Routing Plan</h3>
                    <p className="text-primary-100 font-medium text-[10px] mt-1.5 uppercase tracking-widest opacity-80 text-left">Optimization Deployment</p>
                  </div>
                </div>
                <button onClick={() => setShowSaveModal(false)} className="p-3 hover:bg-white/10 rounded-xl transition-colors text-white/50 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-8 overflow-y-auto">
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] ml-1 text-left block">Plan Designation</label>
                      <input type="text" placeholder="e.g. Afternoon Peak Optimization NYC" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-300" />
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] ml-1 text-left block">Deployment Strategy</label>
                      <div className="grid grid-cols-2 gap-4">
                         <button className="p-4 bg-slate-50 border-2 border-primary-100 rounded-2xl flex flex-col items-center justify-center gap-2 text-primary-600 group hover:border-primary-300 transition-all">
                            <span className="text-xs font-black uppercase tracking-widest leading-none">Auto-Deploy</span>
                            <span className="text-[9px] font-medium opacity-60">Broadcast to Drivers</span>
                         </button>
                         <button className="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:bg-slate-50 transition-all">
                            <span className="text-xs font-black uppercase tracking-widest leading-none">Draft Mode</span>
                            <span className="text-[9px] font-medium opacity-60">Manual Review Only</span>
                         </button>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] ml-1 text-left block">Optimization Goals</label>
                      <div className="space-y-2">
                         {['Minimum Distance', 'Fastest Time Service', 'Fuel Economy Focus'].map((goal, i) => (
                           <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100 cursor-pointer hover:bg-slate-100/50 transition-all">
                              <span className="text-xs font-bold text-slate-700">{goal}</span>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${i === 0 ? 'border-primary-600 bg-primary-600' : 'border-slate-200'}`}>
                                 {i === 0 && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>


                </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                <button onClick={() => setShowSaveModal(false)} className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">Discard</button>
                <button onClick={() => setShowSaveModal(false)} className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-primary-600 transition-all flex items-center justify-center gap-2">
                   Save & Initialize <ChevronDown className="w-4 h-4" />
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
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight text-left leading-none uppercase">AI Route Optimization</h2>
            <p className="text-slate-500 font-medium text-sm mt-1 text-left">Reduce travel time and fuel costs with automated sequence planning.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleResetView}
              className={`px-5 py-2.5 bg-white border-2 border-slate-50 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-2 ${isResetting ? 'text-primary-500' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <RotateCcw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} /> 
              {isResetting ? 'Resetting...' : 'Reset View'}
            </button>
            <button 
              onClick={() => setShowSaveModal(true)}
              className="px-6 py-3 bg-primary-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30 flex items-center gap-2"
            >
              <Save className="w-5 h-5" /> Save Plan
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group text-left">
               <Navigation className="absolute -right-4 -top-4 w-24 h-24 opacity-10 group-hover:scale-110 transition-transform" />
               <h3 className="text-xl font-black mb-2">Smart Sequence</h3>
               <p className="text-slate-400 text-sm mb-8 leading-relaxed">Re-order 142 pending stops to save 24% in total distance.</p>
               <button className="w-full py-4 bg-primary-600 hover:bg-primary-700 transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary-900/40">
                  Optimize Now
               </button>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-soft text-left">
               <h4 className="font-black text-slate-800 uppercase tracking-widest text-[10px] mb-4">Route Layers</h4>
               <div className="space-y-3">
                  {['Driver Live Locations', 'Traffic Heatmap', 'Service Zone Limits', 'Weather Overlay'].map((layer, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                       <span className="text-xs font-bold text-slate-600">{layer}</span>
                       <div className={`w-4 h-4 rounded border-2 transition-all ${i < 2 ? 'bg-primary-600 border-primary-600' : 'border-slate-300'}`}></div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Center Canvas Area (Abstract Map Visual) */}
          <div className="lg:col-span-3 space-y-6">
             <div className="bg-slate-100/50 rounded-[3rem] aspect-video border-[6px] border-white shadow-inner relative flex items-center justify-center overflow-hidden">
                <Map className="w-16 h-16 text-slate-200 stroke-[1px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.8)_80%)] pointer-events-none"></div>
                
                {/* Fake Optimized Route Badge */}
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white shadow-xl flex items-center gap-4 text-left">
                   <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                      <TrendingDown className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Potential Savings</p>
                      <p className="text-xl font-black text-slate-800 leading-none">-$242.00 <span className="text-xs text-slate-400">gas</span></p>
                   </div>
                </div>

                <div className="absolute bottom-8 right-8 flex gap-2">
                   <button className="w-12 h-12 bg-white rounded-2xl shadow-xl border border-slate-50 flex items-center justify-center text-slate-600 hover:text-primary-600 transition-all shadow-slate-200">
                      <List className="w-5 h-5" />
                   </button>
                   <button className="w-12 h-12 bg-white rounded-2xl shadow-xl border border-slate-50 flex items-center justify-center text-slate-600 hover:text-primary-600 transition-all font-black shadow-slate-200 text-xs">
                      2D
                   </button>
                </div>
             </div>

             {/* Active Optimized Routes */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-['Inter']">
                {activeRoutes.map((route, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft text-left group hover:border-primary-100 transition-all cursor-pointer">
                     <div className="flex justify-between items-start mb-4">
                        <h4 className="text-sm font-black text-slate-800 leading-tight pr-4">{route.name}</h4>
                        <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                          route.efficiency > 90 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>{route.efficiency}% Efcy</div>
                     </div>
                     <div className="flex gap-4">
                        <div>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter leading-none mb-1">Drivers</p>
                           <p className="text-lg font-black text-slate-700 leading-none">{route.drivers}</p>
                        </div>
                        <div className="w-px h-8 bg-slate-100 my-auto"></div>
                        <div>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter leading-none mb-1">Drops</p>
                           <p className="text-lg font-black text-slate-700 leading-none">{route.orders}</p>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </motion.div>

      {/* Notifications Portal */}
      <div className="fixed bottom-8 right-8 z-[200] flex flex-col gap-3 font-['Inter'] pointer-events-none">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[320px] pointer-events-auto"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest leading-none mb-1">System Notice</p>
                <p className="text-sm font-bold text-slate-200 leading-tight">{notif.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default RoutePlanner;
