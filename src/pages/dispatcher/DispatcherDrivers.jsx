import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Truck, MessageCircle, Map, MoreVertical, Battery, Signal, X, Send, AlertTriangle } from 'lucide-react';

const DriverLiveCard = ({ driver }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-soft font-['Inter'] relative overflow-hidden group">
    <div className="flex items-start justify-between mb-6">
       <div className="flex items-center gap-4">
          <div className="relative">
             <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${driver.id}`} alt={driver.name} className="w-full h-full object-cover" />
             </div>
             <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                driver.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'
             }`}></div>
          </div>
          <div>
             <h4 className="font-black text-slate-800 leading-tight">{driver.name}</h4>
             <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">{driver.vehicle}</p>
          </div>
       </div>
       <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
          <MoreVertical className="w-5 h-5" />
       </button>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-6">
       <div className="space-y-1">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Current Load</p>
          <div className="flex items-center justify-between font-black text-sm text-slate-700 font-['Inter']">
             <span>{driver.load}%</span>
             <div className="w-16 h-1.5 bg-slate-50 rounded-full overflow-hidden">
                <div className="h-full bg-primary-600" style={{ width: `${driver.load}%` }}></div>
             </div>
          </div>
       </div>
       <div className="space-y-1">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Efficiency</p>
          <p className="text-sm font-black text-emerald-600">{driver.efficiency}%</p>
       </div>
    </div>

    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl mb-6">
       <div className="flex items-center gap-2 text-slate-500">
          <Battery className={`w-4 h-4 ${driver.battery < 20 ? 'text-rose-500 animate-pulse' : 'text-emerald-500'}`} />
          <span className="text-[10px] font-bold">{driver.battery}%</span>
       </div>
       <div className="flex items-center gap-2 text-slate-500">
          <Signal className="w-4 h-4 text-primary-500" />
          <span className="text-[10px] font-bold">{driver.signal}</span>
       </div>
       <div className="flex items-center gap-2 text-slate-500">
          <Map className="w-4 h-4 text-slate-400" />
          <span className="text-[10px] font-bold">{driver.proximity}m</span>
       </div>
    </div>

    <div className="flex gap-2">
       <button className="flex-1 py-3 bg-slate-900 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-primary-600 transition-all flex items-center justify-center gap-2">
          <MessageCircle className="w-4 h-4" /> Message
       </button>
       <button className="p-3 bg-slate-50 text-slate-400 rounded-[1.5rem] hover:text-primary-600 transition-colors">
          <Map className="w-5 h-5" />
       </button>
    </div>
  </div>
);

const DispatcherDrivers = () => {
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [urgency, setUrgency] = useState('Normal');

  const drivers = [
    { id: 101, name: 'Alex Johnson', vehicle: 'Van-08', status: 'Active', load: 84, efficiency: 98, battery: 92, signal: 'Excellent', proximity: '240' },
    { id: 102, name: 'Sarah Connor', vehicle: 'Truck-02', status: 'Warning', load: 15, efficiency: 72, battery: 14, signal: 'Poor', proximity: '1.2k' },
    { id: 103, name: 'Michael Smith', vehicle: 'Bike-05', status: 'Active', load: 45, efficiency: 91, battery: 68, signal: 'Good', proximity: '850' },
    { id: 104, name: 'Emma Wilson', vehicle: 'Van-12', status: 'Active', load: 0, efficiency: 100, battery: 85, signal: 'Excellent', proximity: '120' },
  ];

  const handleBroadcast = () => {
    // In a real app, you would send this to an API.
    console.log('Broadcasting message:', { message: broadcastMessage, urgency });
    setShowBroadcastModal(false);
    setBroadcastMessage('');
    setUrgency('Normal');
  };

  return (
    <>
      <AnimatePresence>
        {showBroadcastModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-['Inter']">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBroadcastModal(false)}
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
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight leading-none text-left">Broadcast Message</h3>
                    <p className="text-primary-100 font-medium text-[10px] mt-1.5 uppercase tracking-widest opacity-80 text-left">To Active Fleet</p>
                  </div>
                </div>
                <button onClick={() => setShowBroadcastModal(false)} className="p-3 hover:bg-white/10 rounded-xl transition-colors text-white/50 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-8 overflow-y-auto text-left">
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] ml-1 block">Message Content</label>
                      <textarea 
                        rows={4}
                        placeholder="Enter the broadcast message..." 
                        value={broadcastMessage}
                        onChange={(e) => setBroadcastMessage(e.target.value)}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-300 resize-none" 
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] ml-1 block">Urgency Level</label>
                      <div className="grid grid-cols-3 gap-3">
                         {['Normal', 'Important', 'Critical'].map(level => (
                           <button 
                              key={level}
                              onClick={() => setUrgency(level)}
                              className={`p-3 border-2 rounded-xl flex items-center justify-center gap-2 transition-all ${
                                urgency === level 
                                  ? 'border-primary-600 bg-primary-50 text-primary-700' 
                                  : 'border-slate-100 bg-white text-slate-500 hover:bg-slate-50'
                              }`}
                           >
                              {level === 'Critical' && <AlertTriangle className="w-4 h-4" />}
                              <span className="text-xs font-black uppercase tracking-widest">{level}</span>
                           </button>
                         ))}
                      </div>
                   </div>
                </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                <button onClick={() => setShowBroadcastModal(false)} className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">Cancel</button>
                <button 
                  onClick={handleBroadcast}
                  disabled={!broadcastMessage.trim()}
                  className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-primary-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-slate-900"
                >
                   Send Broadcast <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Driver Fleet</h2>
          <p className="text-slate-500 font-medium font-['Inter']">Monitor real-time telemetry, location and communication with your fleet.</p>
        </div>
        <div className="flex gap-3">
           <div className="hidden md:flex flex-col items-end justify-center px-4 border-r border-slate-100">
              <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Avg Proximity</p>
              <p className="text-xl font-black text-slate-800 leading-none">840m</p>
           </div>
           <button 
              onClick={() => setShowBroadcastModal(true)}
              className="btn-primary flex items-center justify-center gap-2 px-6"
           >
              <Users className="w-5 h-5" /> Broadcast Message
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {drivers.map(d => (
          <DriverLiveCard key={d.id} driver={d} />
        ))}
        <button className="border-2 border-dashed border-slate-100 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-3 text-slate-300 hover:border-primary-200 hover:text-primary-400 transition-all group">
           <div className="w-12 h-12 rounded-[1.5rem] bg-slate-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
              <Truck className="w-6 h-6" />
           </div>
           <span className="text-xs font-black uppercase tracking-widest">Summon Spare Fleet</span>
        </button>
      </div>
    </motion.div>
    </>
  );
};

export default DispatcherDrivers;
