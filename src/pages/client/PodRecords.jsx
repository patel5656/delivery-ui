import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Download, Eye, Calendar, User, Camera } from 'lucide-react';

const PodRecords = () => {
  const pods = [
    { id: 'DP-9801', recipient: 'Sarah Connor', date: 'Apr 18, 2026', type: 'Digital Sign', preview: '/images/pod_sign.png' },
    { id: 'DP-9755', recipient: 'John Wick', date: 'Apr 12, 2026', type: 'Photo Proof', preview: '/images/pod_package.png' },
    { id: 'DP-9721', recipient: 'Marcus A.', date: 'Apr 08, 2026', type: 'Digital Sign', preview: '/images/pod_receipt.png' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-7xl mx-auto space-y-8 pb-12 font-['Inter']"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Proof of Delivery</h2>
          <p className="text-slate-500 font-medium">Access digital signatures and photo evidence for all shipments.</p>
        </div>
        <div className="max-w-md w-full relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
           <input type="text" placeholder="Search by Order ID..." className="w-full bg-white border-2 border-slate-100 rounded-2xl py-3 pl-11 pr-4 font-black text-slate-800 outline-primary-500 shadow-soft" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pods.map((pod, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -8 }}
            className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden group"
          >
             <div className="aspect-[4/3] rounded-[2rem] bg-slate-50 overflow-hidden mb-6 relative border border-slate-100">
                <img src={pod.preview} alt="POD Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                   <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-xl"><Eye className="w-5 h-5" /></button>
                   <button className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary-900/40"><Download className="w-5 h-5" /></button>
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-800 shadow-sm border border-white">
                   {pod.type === 'Photo Proof' ? <Camera className="w-3 h-3 inline mr-1" /> : <FileText className="w-3 h-3 inline mr-1" />}
                   {pod.type}
                </div>
             </div>

             <div className="space-y-4">
                <div className="flex justify-between items-start">
                   <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Shipment Reference</p>
                      <h4 className="text-lg font-black text-slate-800">{pod.id}</h4>
                   </div>
                   <div className="text-right">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Delivered On</p>
                      <p className="text-sm font-bold text-slate-700">{pod.date}</p>
                   </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                   <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-300" />
                      <span className="text-xs font-bold text-slate-600">{pod.recipient}</span>
                   </div>
                   <div className="w-px h-4 bg-slate-100"></div>
                   <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-300" />
                      <span className="text-xs font-bold text-slate-600">Archived</span>
                   </div>
                </div>
             </div>
          </motion.div>
        ))}

        {/* Empty State / Add More */}
        <div className="border-2 border-dashed border-slate-100 rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-4 text-slate-300 hover:border-primary-200 hover:text-primary-400 transition-all cursor-pointer">
           <FileText className="w-12 h-12 opacity-20" />
           <p className="text-xs font-black uppercase tracking-widest">Request Manual POD</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PodRecords;
