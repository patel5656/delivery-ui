import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Phone, Mail, Settings, LogOut, ChevronRight, Star } from 'lucide-react';

const DriverProfile = () => {
  return (
    <div className="space-y-8 font-['Inter']">
       <div className="flex flex-col items-center">
          <div className="relative">
             <div className="w-24 h-24 rounded-[2.5rem] bg-slate-200 border-4 border-white shadow-xl overflow-hidden ring-8 ring-primary-50">
                <img src="https://i.pravatar.cc/150?u=driver1" className="w-full h-full object-cover" />
             </div>
             <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-50">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
             </div>
          </div>
          <h3 className="text-xl font-black text-slate-800 mt-6 tracking-tight">Alex Johnson</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Certified Gold Driver</p>
       </div>

       <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden">
          <div className="divide-y divide-slate-50">
             {[
               { icon: User, label: 'Personal Information', sub: 'Edit names, photo' },
               { icon: Shield, label: 'License & Documents', sub: 'Verified (Expires 2028)' },
               { icon: Phone, label: 'Communications', sub: 'SMS, Live Chat' },
               { icon: Settings, label: 'Preferences', sub: 'Theme, Dark Mode' }
             ].map((item, i) => (
                <div key={i} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:text-primary-600 group-hover:bg-primary-50 transition-colors">
                         <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="text-sm font-black text-slate-800">{item.label}</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.sub}</p>
                      </div>
                   </div>
                   <ChevronRight className="w-5 h-5 text-slate-300" />
                </div>
             ))}
          </div>
       </div>

    </div>
  );
};

export default DriverProfile;
