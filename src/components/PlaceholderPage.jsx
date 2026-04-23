import React from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

const PlaceholderPage = ({ title, description }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto"
    >
      <div className="bg-white rounded-[2rem] p-12 border border-slate-100 shadow-soft flex flex-col items-center text-center space-y-6">
        <div className="w-24 h-24 bg-primary-50 rounded-3xl flex items-center justify-center">
          <Construction className="w-12 h-12 text-primary-600" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-800">{title}</h2>
          <p className="text-slate-500 mt-2 max-w-md mx-auto">
            {description || "We're currently building out this feature. It will be available in the production version soon."}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-slate-50 rounded-2xl border border-dashed border-slate-200 animate-pulse"></div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceholderPage;
