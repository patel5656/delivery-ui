import React from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';

const DriverJobs = ({ jobs }) => {
  const defaultJobs = [
    { id: '8821', customer: 'Global Mart Inc.', pickup: 'Warehouse A1, Port Rd', dropoff: '122 East Side, Plaza', time: '12:30 PM', status: 'Priority' },
    { id: '8822', customer: 'Sarah Jenkins', pickup: 'Global Mart Hub', dropoff: '88 Baker St, Apt 4B', time: '01:15 PM', status: 'Standard' },
    { id: '8823', customer: 'Tech Store Ltd', pickup: 'Warehouse B2, South', dropoff: '45 Industrial Ave', time: '02:00 PM', status: 'Standard' },
  ];

  const displayJobs = jobs && jobs.length > 0 ? jobs : defaultJobs;

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Active Duty</h3>
          <span className="text-[10px] font-black uppercase text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">{displayJobs.length} Tasks Left</span>
       </div>
       
       <div className="space-y-4">
          {displayJobs.map(job => (
            <div key={job.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-soft">
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Trip ID</p>
                     <h4 className="text-base font-black text-slate-800">#{job.id}</h4>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-full">
                     <Clock className="w-3.5 h-3.5" /> {job.time}
                  </div>
               </div>

               <div className="space-y-4 mb-6">
                  <div className="flex gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 outline outline-4 outline-emerald-50"></div>
                     <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Pickup</p>
                        <p className="text-xs font-bold text-slate-700 leading-tight">{job.pickup}</p>
                     </div>
                  </div>
                  <div className="flex gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 outline outline-4 outline-primary-50"></div>
                     <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Dropoff</p>
                        <p className="text-xs font-bold text-slate-700 leading-tight">{job.dropoff}</p>
                     </div>
                  </div>
               </div>

               <div className="flex justify-center">
                  <button className="px-8 py-2 bg-slate-900 hover:bg-primary-600 transition-all text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                     View On Map <ArrowRight className="w-4 h-4" />
                  </button>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};

export default DriverJobs;
