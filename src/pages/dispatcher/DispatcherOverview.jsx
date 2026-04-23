import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Package, Truck, Activity, TrendingUp, ChevronRight, MapPin, X, Clock, CheckCircle, Info } from 'lucide-react';

const DispatcherOverview = () => {
  const [isShiftActive, setIsShiftActive] = React.useState(false);
  const [showShiftModal, setShowShiftModal] = React.useState(false);

  const toggleShift = () => {
    if (isShiftActive) {
      setIsShiftActive(false);
    } else {
      setShowShiftModal(true);
    }
  };

  const confirmStartShift = () => {
    setIsShiftActive(true);
    setShowShiftModal(false);
  };

  return (
    <>
      {/* Shift Briefing Modal */}
      <AnimatePresence>
        {showShiftModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShiftModal(false)}
              className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-md relative z-10 shadow-2xl font-['Inter'] overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-primary-600">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight leading-none text-left">Morning Briefing</h3>
                    <p className="text-primary-100 font-medium text-[10px] mt-1.5 uppercase tracking-widest opacity-80 text-left">Shift Prep Checklist</p>
                  </div>
                </div>
                <button onClick={() => setShowShiftModal(false)} className="p-3 hover:bg-white/10 rounded-xl transition-colors text-white/50 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-4">
                   {[
                     'Verify all 28 active driver credentials',
                     'Review 42 pending priority assignments',
                     'Sync real-time traffic data (API status: OK)',
                     'Check vehicle maintenance alerts'
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span className="text-xs font-bold text-slate-600">{item}</span>
                     </div>
                   ))}
                </div>

                <div className="p-5 bg-blue-50 rounded-3xl border border-blue-100/50 flex gap-4">
                   <Info className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                   <p className="text-[11px] text-blue-800 font-bold leading-relaxed text-left">
                      Starting your shift will broadcast your status to the entire driver fleet and initialize the automated routing engine.
                   </p>
                </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                <button onClick={() => setShowShiftModal(false)} className="flex-1 py-4 border border-slate-200 bg-white text-slate-400 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:text-slate-600 transition-all">Cancel</button>
                <button onClick={confirmStartShift} className="flex-[2] py-4 bg-primary-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary-500/30 hover:bg-primary-700 transition-all">Go On-Duty</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-8 font-['Inter']">
        {/* Top Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden relative gap-6">
           <div className={`absolute top-0 right-0 w-64 h-64 ${isShiftActive ? 'bg-emerald-500/5' : 'bg-primary-600/5'} rounded-full blur-3xl -mr-20 -mt-20`}></div>
           <div className="relative z-10">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none text-left">
                 {isShiftActive ? 'Shift in Progress' : 'System Operational'}
              </h2>
              <p className="text-slate-500 font-medium mt-1 text-left">142 orders pending dispatch • 28 drivers currently active.</p>
           </div>
           <button 
              onClick={toggleShift}
              className={`relative z-10 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg ${
                 isShiftActive 
                 ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 shadow-rose-200' 
                 : 'bg-slate-900 text-white hover:bg-primary-600 shadow-slate-200'
              }`}
           >
              {isShiftActive ? (
                 <X className="w-4 h-4" />
              ) : (
                 <Play className="w-4 h-4 fill-current" />
              )}
              {isShiftActive ? 'Finish Shift' : 'Start Morning Shift'}
           </button>
        </div>

        {/* Real-time Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Unassigned', val: '42', icon: Package, color: 'text-primary-600', bg: 'bg-primary-50' },
             { label: 'Drivers Out', val: '18', icon: Truck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
             { label: 'Fleet Utility', val: '92%', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
             { label: 'Exp. Revenue', val: '$1.2k', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
           ].map((stat, i) => (
             <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-soft">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                   <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none text-left">{stat.label}</p>
                <p className="text-2xl font-black text-slate-800 tracking-tight leading-none text-left mt-1">{stat.val}</p>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Live Activity Feed */}
           <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden text-left">
                 <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                    <h3 className="font-black text-slate-800 text-left">Operational Log</h3>
                    <button className="text-xs font-black text-primary-600 uppercase tracking-widest leading-none">Full Feed</button>
                 </div>
                 <div className="divide-y divide-slate-50">
                    {[
                      { type: 'Dispatch', text: 'Order #ORD-102 assigned to Alex J.', time: '2m ago', loc: 'Downtown NY' },
                      { type: 'Delayed', text: 'Truck-02 stuck in traffic on I-95', time: '14m ago', loc: 'Queens' },
                      { type: 'Delivered', text: 'Package #ORD-092 successfully dropped', time: '18m ago', loc: 'Brooklyn' }
                    ].map((log, i) => (
                      <div key={i} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors cursor-pointer">
                         <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 rounded-full ${log.type === 'Delayed' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                            <div>
                               <p className="text-sm font-bold text-slate-700 leading-tight">{log.text}</p>
                               <div className="flex items-center gap-2 mt-1 leading-none">
                                  <MapPin className="w-3 h-3 text-slate-300" />
                                  <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">{log.loc}</span>
                               </div>
                            </div>
                         </div>
                         <span className="text-[10px] font-black text-slate-300 uppercase leading-none">{log.time}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Proximity Alerts */}
           <div className="space-y-6">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden text-left">
                 <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary-600/20 rounded-full blur-2xl"></div>
                 <h4 className="text-lg font-black mb-4 flex items-center gap-2 leading-none">
                    <Activity className="w-5 h-5 text-primary-400" /> System Health
                 </h4>
                 <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                       <p className="text-[10px] font-black text-slate-500 uppercase mb-1 leading-none">Average Wait Time</p>
                       <p className="text-xl font-black leading-none mt-1">1.2 mins <span className="text-[10px] text-emerald-400 leading-none">Stable</span></p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                       <p className="text-[10px] font-black text-slate-500 uppercase mb-1 leading-none">Fleet Congestion</p>
                       <p className="text-xl font-black leading-none mt-1">Medium <span className="text-[10px] text-amber-400 leading-none">+12%</span></p>
                    </div>
                 </div>
                 <button className="w-full mt-6 py-3 bg-primary-600 hover:bg-primary-700 transition-all rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-900 leading-none">
                    Analyze Bottlenecks
                 </button>
              </div>
           </div>
        </div>
      </div>
    </>
  );
};

export default DispatcherOverview;
