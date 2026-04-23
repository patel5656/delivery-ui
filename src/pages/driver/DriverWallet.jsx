import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, History, ArrowDownToLine, CreditCard } from 'lucide-react';

const DriverWallet = () => {
  const transactions = [
    { id: 'TX-440', type: 'Delivery Payout', order: '#8820', amount: '+$14.50', time: '10:15 AM' },
    { id: 'TX-439', type: 'Bonus Trigger', order: 'SLA Milestone', amount: '+$5.00', time: '09:30 AM' },
    { id: 'TX-438', type: 'Withdrawal', order: 'Chase Bank', amount: '-$120.00', time: 'Yesterday' },
  ];

  return (
    <div className="space-y-8 font-['Inter']">
       <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Withdrawable Balance</p>
          <div className="flex items-end justify-between">
             <h3 className="text-4xl font-black">$482.25</h3>
             <button className="p-4 bg-primary-600 rounded-2xl text-white shadow-xl shadow-primary-900/50">
                <ArrowDownToLine className="w-6 h-6" />
             </button>
          </div>
       </div>

       <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-soft">
             <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Month Total</p>
             <p className="text-xl font-black text-slate-800">$4,120</p>
             <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-bold mt-1">
                <TrendingUp className="w-3.5 h-3.5" /> +14%
             </div>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-soft flex flex-col justify-between">
             <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Method</p>
             <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-black text-slate-800 tracking-tighter">Visa •••• 12</span>
             </div>
          </div>
       </div>

       <div className="space-y-4">
          <div className="flex items-center justify-between">
             <h3 className="text-lg font-black text-slate-800">Recent Activity</h3>
             <History className="w-5 h-5 text-slate-300" />
          </div>
          
          <div className="divide-y divide-slate-50">
             {transactions.map((tx, i) => (
               <div key={i} className="py-4 flex items-center justify-between">
                  <div>
                     <p className="text-sm font-bold text-slate-800 leading-tight">{tx.type}</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase">{tx.order} • {tx.time}</p>
                  </div>
                  <p className={`text-sm font-black ${tx.amount.startsWith('+') ? 'text-emerald-500' : 'text-slate-800'}`}>
                     {tx.amount}
                  </p>
               </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default DriverWallet;
