import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Download, Plus, Clock, ArrowUpRight, TrendingUp, Shield, X, Check } from 'lucide-react';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ClientBilling = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [amount, setAmount] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [step, setStep] = React.useState(1); // 1: Amount, 2: Success

  const invoices = [
    { id: 'INV-2026-001', date: 'Apr 01, 2026', amount: '$1,242.50', status: 'Paid' },
    { id: 'INV-2026-002', date: 'Mar 01, 2026', amount: '$982.00', status: 'Paid' },
    { id: 'INV-2026-003', date: 'Feb 01, 2026', amount: '$1,550.00', status: 'Paid' },
  ];

  const handleDownloadInvoice = (invoice) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(30, 41, 59); // slate-800
    doc.text('INVOICE', 14, 25);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Invoice Number: ${invoice.id}`, 14, 35);
    doc.text(`Date Issued: ${invoice.date}`, 14, 40);
    doc.text(`Status: ${invoice.status}`, 14, 45);
    
    // Company Info
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.text('DeliveryPro SaaS', 140, 25);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('123 Logistics Way', 140, 32);
    doc.text('New York, NY 10001', 140, 37);
    doc.text('support@deliverypro.com', 140, 42);
    
    // Separator line
    doc.setDrawColor(241, 245, 249); // slate-100
    doc.line(14, 55, 196, 55);
    
    // Billing Table
    autoTable(doc, {
      startY: 65,
      head: [['Description', 'Quantity', 'Rate', 'Total']],
      body: [
        ['Monthly Delivery Platform Usage', '1', invoice.amount, invoice.amount],
        ['Fleet Management Tools', '1', '$0.00', '$0.00'],
        ['Real-time Tracking API Access', 'Included', '-', '-'],
      ],
      theme: 'striped',
      headStyles: { fillColor: [79, 70, 229], fontStyle: 'bold' },
      styles: { fontSize: 9, cellPadding: 5 },
    });
    
    // Summary
    const finalY = doc.lastAutoTable.finalY;
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text('Subtotal:', 140, finalY + 15);
    doc.text(invoice.amount, 175, finalY + 15);
    
    doc.setFontSize(14);
    doc.setTextColor(79, 70, 229); // primary-600
    doc.text('Grand Total:', 140, finalY + 25);
    doc.text(invoice.amount, 175, finalY + 25);
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text('Thank you for choosing DeliveryPro. We appreciate your business.', 14, finalY + 50);
    
    doc.save(`invoice_${invoice.id}.pdf`);
  };

  const handleProceed = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 2000);
  };

  const closeModal = () => {
    setShowModal(false);
    setStep(1);
    setAmount('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-7xl mx-auto space-y-8 pb-12 font-['Inter'] relative"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Payments & Ledger</h2>
          <p className="text-slate-500 font-medium">Manage your balance, payment methods and billing history.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center justify-center gap-2 px-6 shadow-xl shadow-primary-100 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all"
        >
           <Plus className="w-5 h-5" /> Add Balance
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Cards Area */}
         <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Available Credit</p>
                  <h3 className="text-4xl font-black mb-6">$842.00</h3>
                  <div className="flex items-center gap-4">
                     <button className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-all rounded-xl text-xs font-bold border border-white/5">View Ledger</button>
                     <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase">
                        <TrendingUp className="w-4 h-4" /> Account Health Good
                     </div>
                  </div>
               </div>

               <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Linked Method</p>
                  <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-slate-900 rounded-lg flex items-center justify-center gap-1">
                           <div className="w-3 h-3 bg-rose-500 rounded-full opacity-80"></div>
                           <div className="w-3 h-3 bg-amber-500 rounded-full opacity-80 -ml-1.5"></div>
                        </div>
                        <div>
                           <p className="text-sm font-black text-slate-800 tracking-tight">•••• 4242</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase">Expires: 12/28</p>
                        </div>
                     </div>
                     <button className="text-[10px] font-black text-primary-600 uppercase tracking-widest">Update</button>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-medium">
                     <Shield className="w-4 h-4" /> Encrypted & PCI Compliant
                  </div>
               </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden">
               <div className="p-6 border-b border-slate-50">
                  <h3 className="font-black text-slate-800">Monthly Invoices</h3>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                        <tr>
                           <th className="px-8 py-5">Invoice Reference</th>
                           <th className="px-8 py-5">Date issued</th>
                           <th className="px-8 py-5">Total amount</th>
                           <th className="px-8 py-5">Status</th>
                           <th className="px-8 py-5 text-right">Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {invoices.map((inv, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                             <td className="px-8 py-5 font-black text-slate-800 text-sm">{inv.id}</td>
                             <td className="px-8 py-5 text-xs font-bold text-slate-500">{inv.date}</td>
                             <td className="px-8 py-5 font-black text-slate-800 text-sm">{inv.amount}</td>
                             <td className="px-8 py-5">
                                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-50 text-emerald-600">{inv.status}</span>
                             </td>
                             <td className="px-8 py-5 text-right">
                                <button 
                                  onClick={() => handleDownloadInvoice(inv)}
                                  className="p-2 text-slate-300 group-hover:text-primary-600 transition-colors"
                                >
                                   <Download className="w-5 h-5" />
                                </button>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Right Details Area */}
         <div className="space-y-8">
            <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-[2.5rem]">
               <h4 className="font-black text-indigo-900 mb-2">Usage Summary</h4>
               <p className="text-xs text-indigo-700 font-medium leading-relaxed mb-6">You have consumed 14% of your current allocated credit for April.</p>
               <div className="space-y-4">
                  <div>
                     <div className="flex justify-between text-[10px] font-black uppercase text-indigo-400 mb-2">
                        <span>Allocated</span>
                        <span>$5,000</span>
                     </div>
                     <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.4)]" style={{ width: '14%' }}></div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-soft">
               <h4 className="font-black text-slate-800 mb-4">Pricing Plans</h4>
               <p className="text-xs text-slate-500 font-medium mb-6">Enjoy lower rates with our volume-based enterprise scaling.</p>
               <button className="w-full py-4 bg-slate-50 text-slate-800 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                  Upgrade Package <ArrowUpRight className="w-4 h-4" />
               </button>
            </div>
         </div>
      </div>

      {/* Add Balance Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Top-up Balance</h3>
                  <button onClick={closeModal} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                {step === 1 ? (
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Enter Amount (USD)</label>
                      <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-300">$</span>
                        <input 
                          type="number" 
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full bg-slate-50 border-none rounded-2xl py-6 pl-12 pr-6 text-3xl font-black text-slate-900 outline-none ring-primary-600/10 focus:ring-4 placeholder:text-slate-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {['50', '100', '500'].map((preset) => (
                        <button 
                          key={preset}
                          onClick={() => setAmount(preset)}
                          className={`py-3 rounded-xl border-2 font-black text-sm transition-all ${amount === preset ? 'border-primary-600 bg-primary-50 text-primary-600' : 'border-slate-50 bg-slate-50 text-slate-500 hover:border-slate-200'}`}
                        >
                          +${preset}
                        </button>
                      ))}
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Payment Method</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-6 bg-slate-900 rounded flex items-center justify-center gap-0.5">
                              <div className="w-2 h-2 bg-rose-500 rounded-full opacity-80"></div>
                              <div className="w-2 h-2 bg-amber-500 rounded-full opacity-80 -ml-1"></div>
                           </div>
                           <p className="text-sm font-black text-slate-700">•••• 4242</p>
                        </div>
                        <button className="text-[10px] font-black text-primary-600 uppercase">Change</button>
                      </div>
                    </div>

                    <button 
                      onClick={handleProceed}
                      disabled={!amount || isProcessing}
                      className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary-200 hover:bg-primary-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        `Pay $${amount || '0.00'}`
                      )}
                    </button>
                    <p className="text-center text-[10px] font-bold text-slate-400">Secure transaction powered by Stripe</p>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-2">Success!</h4>
                    <p className="text-slate-500 font-medium mb-8">Your balance has been updated with ${amount}.</p>
                    <button 
                      onClick={closeModal}
                      className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all"
                    >
                      Close Window
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ClientBilling;
