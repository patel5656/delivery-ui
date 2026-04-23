import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, MapPin, Phone, MessageSquare, CornerUpRight, CheckCircle, Zap } from 'lucide-react';

const ExceptionCard = ({ item }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-soft flex flex-col md:flex-row gap-6 group font-['Inter']">
     <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 ${
        item.type === 'Danger' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
     }`}>
        <AlertCircle className="w-8 h-8" />
     </div>

     <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Issue #{item.id}</span>
           <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
              item.severity === 'High' ? 'bg-rose-600 text-white shadow-lg shadow-rose-100' : 'bg-amber-500 text-white shadow-lg shadow-amber-100'
           }`}>{item.severity} SEVERITY</span>
        </div>
        <h3 className="text-lg font-black text-slate-800 tracking-tight mb-2">{item.title}</h3>
        <p className="text-slate-500 text-sm font-medium mb-4 line-clamp-2">{item.description}</p>
        
        <div className="flex flex-wrap gap-4 items-center">
           <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.location}
           </div>
           <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
              <Zap className="w-3.5 h-3.5 text-primary-500" /> Assigned: {item.driver}
           </div>
        </div>
     </div>

     <div className="flex flex-col gap-2 justify-center shrink-0 w-full md:w-auto">
        <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 flex items-center justify-center gap-2">
           <CornerUpRight className="w-4 h-4" /> Re-assign
        </button>
        <button className="px-6 py-2.5 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2">
           <Phone className="w-4 h-4" /> Call Driver
        </button>
        <button className="px-6 py-2.5 text-xs font-black uppercase tracking-tighter text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
           Mark Resolved
        </button>
     </div>
  </div>
);

const ExceptionsControl = () => {
  const exceptions = [
    { 
      id: 'EX-4021', 
      title: 'Vehicle Breakdown: Truck-02', 
      description: 'Rear tire puncture near Queensboro Bridge. 14 orders pending on board.', 
      driver: 'John Wick', 
      location: 'Queens, NY', 
      type: 'Danger', 
      severity: 'High' 
    },
    { 
      id: 'EX-4022', 
      title: 'Customer Not Found: ORD-881', 
      description: 'Recipient not answering gate intercom. Driver waiting on site for 10 mins.', 
      driver: 'Sarah Connor', 
      location: 'Manhattan, NY', 
      type: 'Warning', 
      severity: 'Medium' 
    },
    { 
      id: 'EX-4023', 
      title: 'Traffic Gridlock: Route A2', 
      description: 'Major accident on I-95. All deliveries in this zone will be delayed by 45+ mins.', 
      driver: 'Multiple (4)', 
      location: 'Bronx, NY', 
      type: 'Warning', 
      severity: 'High' 
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Exceptions Control</h2>
          <p className="text-slate-500 font-medium">Critical issues requiring immediate dispatcher intervention.</p>
        </div>
        <div className="flex gap-4 p-2 bg-white rounded-2xl border border-slate-100 shadow-soft">
           <div className="px-4 py-2 border-r border-slate-50 text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase">Open</p>
              <p className="text-lg font-black text-slate-800">14</p>
           </div>
           <div className="px-4 py-2 text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase">Resolved</p>
              <p className="text-lg font-black text-emerald-500">82</p>
           </div>
        </div>
      </div>

      <div className="space-y-6">
         {exceptions.map(ex => (
           <ExceptionCard key={ex.id} item={ex} />
         ))}
      </div>

      {/* Action Stats */}
      <div className="bg-primary-600 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
         <div className="relative z-10 max-w-sm">
            <h3 className="text-2xl font-black mb-2">Platform Health Status</h3>
            <p className="text-primary-100/80 font-medium text-sm">System is currently processing 842 orders with an exception rate of 0.82% — below average (1.2%).</p>
         </div>
         <div className="flex gap-4 relative z-10">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-[1.5rem] border border-white/10 text-center flex-1 min-w-[120px]">
               <CheckCircle className="w-6 h-6 mx-auto mb-2 text-primary-200" />
               <p className="text-[10px] font-black uppercase">Service Availability</p>
               <p className="text-2xl font-black">99.9%</p>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-[1.5rem] border border-white/10 text-center flex-1 min-w-[120px]">
               <MessageSquare className="w-6 h-6 mx-auto mb-2 text-primary-200" />
               <p className="text-[10px] font-black uppercase">Avg Response Time</p>
               <p className="text-2xl font-black">2.4m</p>
            </div>
         </div>
      </div>
    </motion.div>
  );
};

export default ExceptionsControl;
