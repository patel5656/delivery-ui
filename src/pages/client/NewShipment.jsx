import React from 'react';
import { motion } from 'framer-motion';
import { Package, MapPin, Search, ArrowRight, Truck, Info, Calendar } from 'lucide-react';

const NewShipment = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8 pb-20 font-['Inter']"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create New Shipment</h2>
        <p className="text-slate-500 font-medium mt-1">Fill in the details to book your next delivery instantly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* Pickup Details */}
         <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-soft space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
               </div>
               <h3 className="font-black text-slate-800 uppercase tracking-widest text-[10px]">Step 1: Pickup Location</h3>
            </div>
            
            <div className="space-y-4">
               <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Saved Address or New Location" className="w-full bg-slate-50 border-none rounded-xl py-3 pl-11 pr-4 text-sm font-bold placeholder:font-medium outline-primary-500" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Building/Floor" className="bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold" />
                  <input type="text" placeholder="Contact Name" className="bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold" />
               </div>
            </div>
         </div>

         {/* Delivery Details */}
         <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-soft space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Package className="w-5 h-5" />
               </div>
               <h3 className="font-black text-slate-800 uppercase tracking-widest text-[10px]">Step 2: Dropoff Details</h3>
            </div>
            
            <div className="space-y-4">
               <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Destination Address" className="w-full bg-slate-50 border-none rounded-xl py-3 pl-11 pr-4 text-sm font-bold placeholder:font-medium outline-primary-500" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Package Type" className="bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold" />
                  <input type="text" placeholder="Phone Number" className="bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold" />
               </div>
            </div>
         </div>
      </div>

      {/* Shipment Service Selection */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft">
         <h3 className="font-black text-slate-800 uppercase tracking-widest text-[10px] mb-6">Step 3: Select Service Class</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
               { name: 'Standard', time: '1-2 Days', price: '$8.50', color: 'bg-slate-50' },
               { name: 'Same Day', time: 'Today', price: '$18.00', color: 'bg-emerald-50 text-emerald-700' },
               { name: 'Express', time: '90 Mins', price: '$35.00', color: 'bg-primary-50 text-primary-700', active: true }
            ].map((service, i) => (
               <div key={i} className={`p-6 rounded-3xl border-2 cursor-pointer transition-all ${
                  service.active ? 'border-primary-600 bg-white ring-8 ring-primary-50' : 'border-slate-50 hover:border-primary-200'
               }`}>
                  <h4 className="font-black text-lg mb-1 tracking-tight">{service.name}</h4>
                  <p className="text-xs font-bold text-slate-400 mb-4 uppercase">{service.time}</p>
                  <p className="text-2xl font-black text-slate-900 leading-none">{service.price}</p>
               </div>
            ))}
         </div>
      </div>

      {/* Summary Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-slate-900 rounded-[2.5rem] text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
         <div className="relative z-10">
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Estimated Total</p>
            <h3 className="text-4xl font-black">$35.00</h3>
         </div>
         <button className="relative z-10 mt-6 md:mt-0 px-10 py-4 bg-primary-600 hover:bg-primary-700 transition-all rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-primary-900">
            Confirm Booking <ArrowRight className="w-5 h-5" />
         </button>
      </div>
    </motion.div>
  );
};

export default NewShipment;
