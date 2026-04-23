import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Package, Clock, Truck, ShieldCheck, Map, Phone } from 'lucide-react';

const CLTracking = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-7xl mx-auto space-y-8 pb-12 font-['Inter']"
    >
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Live Tracking</h2>
          <p className="text-slate-500 font-medium mt-1">Satellite tracking of your ongoing shipments.</p>
        </div>
        <div className="max-w-md w-full relative">
           <input type="text" defaultValue="DP-9921-X9L" className="w-full bg-white border-2 border-slate-100 rounded-2xl py-3.5 pl-5 pr-32 font-black text-slate-800 outline-primary-500 shadow-soft" />
           <button className="absolute right-2 top-2 bottom-2 px-6 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest">Update</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Live Track Sidebar */}
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-100">
                     <Package className="w-8 h-8" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expected Arrival</p>
                     <p className="text-2xl font-black text-slate-900">14:45 PM</p>
                  </div>
               </div>

               {/* Timeline */}
               <div className="space-y-8 relative">
                  <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                  
                  {[
                    { title: 'Out for Delivery', time: '14:02 PM', status: 'current', msg: 'Driver is approaching your neighborhood.' },
                    { title: 'Arrived at Hub North', time: '12:30 PM', status: 'done', msg: 'Package sorted and loaded for dispatch.' },
                    { title: 'Picked Up', time: '10:15 AM', status: 'done', msg: 'Successfully collected from Manhattan WareHouse.' },
                    { title: 'Order Confirmed', time: '09:45 AM', status: 'done', msg: 'Payment verified and courier assigned.' }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4 relative z-10">
                       <div className={`w-4 h-4 rounded-full border-4 border-white shadow-sm mt-1 shrink-0 ${
                          step.status === 'current' ? 'bg-primary-600 ring-4 ring-primary-50 animate-pulse' : 'bg-slate-300'
                       }`}></div>
                       <div>
                          <div className="flex items-baseline gap-2">
                             <h4 className={`text-sm font-black ${step.status === 'current' ? 'text-slate-800' : 'text-slate-400'}`}>{step.title}</h4>
                             <span className="text-[10px] font-bold text-slate-400">{step.time}</span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">{step.msg}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Driver Contact */}
            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200">
                     <img src="https://i.pravatar.cc/150?u=driver1" className="w-full h-full object-cover" />
                  </div>
                  <div>
                     <p className="text-xs font-black text-slate-800">Alex Johnson</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Your Driver</p>
                  </div>
               </div>
               <button className="w-10 h-10 rounded-full bg-white text-primary-600 shadow-sm flex items-center justify-center border border-slate-100 hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
               </button>
            </div>
         </div>

         {/* Map Visualization Area */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-100 rounded-[3rem] aspect-video md:aspect-[16/10] border-8 border-white shadow-soft relative overflow-hidden flex items-center justify-center">
                <Map className="w-24 h-24 text-slate-200 stroke-[1px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.7)_70%)] pointer-events-none"></div>

                {/* Tracking UI Overlays */}
                <div className="absolute top-8 left-8 flex gap-3">
                   <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-800 border border-white shadow-lg">Live Satellite</div>
                   <div className="bg-primary-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-primary-200">920m Away</div>
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-8 right-8 flex gap-2">
                   <button className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-600"><ShieldCheck className="w-5 h-5" /></button>
                   <button className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-600"><Truck className="w-5 h-5" /></button>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft">
               <h3 className="font-black text-slate-800 mb-6">Shipment Details</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Service Type</p>
                     <p className="text-sm font-black text-slate-700">Priority Express</p>
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Weight</p>
                     <p className="text-sm font-black text-slate-700">2.5 KG</p>
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Origin</p>
                     <p className="text-sm font-black text-slate-700">Brooklyn, NY</p>
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fragile</p>
                     <p className="text-sm font-black text-rose-500">Yes</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </motion.div>
  );
};

export default CLTracking;
