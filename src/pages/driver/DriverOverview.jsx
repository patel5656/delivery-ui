import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, ChevronRight, Package } from 'lucide-react';

const JobCard = ({ job }) => (
  <motion.div 
    whileHover={{ x: 4 }}
    className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm mb-4 relative overflow-hidden group transition-all hover:border-primary-200"
  >
    <div className={`absolute top-0 left-0 w-1 h-full ${
      job.status === 'Priority' ? 'bg-rose-500' : 'bg-primary-500'
    }`}></div>
    
    <div className="flex justify-between items-center mb-3">
      <div>
         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">#{job.id}</span>
         <h3 className="font-black text-slate-800 text-base">{job.customer}</h3>
      </div>
      <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
         job.status === 'Priority' ? 'bg-rose-50 text-rose-600' : 'bg-primary-50 text-primary-600'
      }`}>{job.status}</div>
    </div>

    <div className="space-y-2">
       <p className="text-xs text-slate-500 font-medium truncate flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> {job.pickup}
       </p>
       <p className="text-xs text-slate-500 font-medium truncate flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div> {job.dropoff}
       </p>
    </div>
  </motion.div>
);

const DriverOverview = () => {
  const jobs = [
    { id: '8821', customer: 'Global Mart Inc.', pickup: 'Warehouse A1, Port Rd', dropoff: '122 East Side, Plaza', status: 'Priority' },
    { id: '8822', customer: 'Sarah Jenkins', pickup: 'Global Mart Hub', dropoff: '88 Baker St, Apt 4B', status: 'Standard' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-['Inter']">
      {/* Earnings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-primary-600 p-8 rounded-[2rem] text-white relative overflow-hidden shadow-xl shadow-primary-100">
            <Wallet className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10" />
            <p className="text-primary-100 text-[10px] font-black uppercase tracking-widest mb-2">Today's Earnings</p>
            <div className="flex items-end justify-between">
               <h3 className="text-4xl font-black">$142.50</h3>
               <div className="flex items-center gap-1 text-emerald-300 text-xs font-bold">
                  <TrendingUp className="w-4 h-4" /> +12%
               </div>
            </div>
         </div>
         
         <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-soft flex items-center justify-between">
            <div>
               <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Active Tasks</p>
               <h3 className="text-3xl font-black text-slate-800">12</h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300">
               <Package className="w-8 h-8" />
            </div>
         </div>
      </div>

      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-800 tracking-tight">Current Assigned Jobs</h3>
            <button className="text-primary-600 text-xs font-black uppercase tracking-widest flex items-center gap-1">Details <ChevronRight className="w-4 h-4" /></button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
         </div>
      </div>
    </div>
  );
};

export default DriverOverview;
