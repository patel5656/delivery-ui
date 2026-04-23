import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Search, Download, CheckCircle, XCircle, ArrowUpRight, Filter, Eye, MapPin, X } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ShipmentHistory = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [classFilter, setClassFilter] = React.useState('All');
  const [showFilterMenu, setShowFilterMenu] = React.useState(false);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const history = [
    { id: 'DP-9801', date: 'Apr 18, 2026', destination: 'Financial District, NY', status: 'Delivered', amount: '$42.00', class: 'Express' },
    { id: 'DP-9799', date: 'Apr 15, 2026', destination: 'Jersey City Terminal', status: 'Cancelled', amount: '$0.00', class: 'Standard' },
    { id: 'DP-9755', date: 'Apr 12, 2026', destination: 'Brooklyn Heights, NY', status: 'Delivered', amount: '$15.50', class: 'Standard' },
    { id: 'DP-9721', date: 'Apr 08, 2026', destination: 'Queens North Hub', status: 'Delivered', amount: '$18.00', class: 'Same Day' },
    { id: 'DP-9688', date: 'Apr 02, 2026', destination: 'Manhattan Midtown', status: 'Delivered', amount: '$35.00', class: 'Express' },
  ];

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesClass = classFilter === 'All' || item.class === classFilter;
    return matchesSearch && matchesStatus && matchesClass;
  });

  const handleDownloadAll = () => {
    const doc = new jsPDF();
    
    // Add Title
    doc.setFontSize(20);
    doc.text('Order Archives - Shipment History', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    
    // Define table columns and rows
    const tableColumn = ["Order Reference", "Booking Date", "Destination Area", "Class", "Value", "Outcome"];
    const tableRows = filteredHistory.map(order => [
      order.id,
      order.date,
      order.destination,
      order.class,
      order.amount,
      order.status
    ]);

    // Generate table
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229] }, // primary-600 color
      styles: { fontSize: 9, font: 'helvetica' },
    });

    // Save the PDF
    doc.save('shipment_history.pdf');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-8 font-['Inter']"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Order Archives</h2>
          <p className="text-slate-500 font-medium mt-1">Review your completed and past shipment history.</p>
        </div>
        <button 
          onClick={handleDownloadAll}
          className="px-5 py-2.5 bg-white border-2 border-slate-50 rounded-xl text-xs font-black text-slate-500 uppercase tracking-widest hover:bg-slate-50 flex items-center gap-2"
        >
           <Download className="w-4 h-4" /> Download Result
        </button>
      </div>

      {/* Filter Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Total Volume', val: '124', icon: CheckCircle, color: 'text-primary-600' },
           { label: 'Deliveries', val: '121', icon: CheckCircle, color: 'text-emerald-500' },
           { label: 'Cancelled', val: '3', icon: XCircle, color: 'text-rose-500' },
           { label: 'Spend YTD', val: '$4,120', icon: Clock, color: 'text-slate-700' }
         ].map((stat, i) => (
           <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-soft">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
              <div className="flex items-center justify-between">
                 <p className="text-xl font-black text-slate-800 tracking-tight">{stat.val}</p>
                 <stat.icon className={`w-5 h-5 ${stat.color} opacity-20`} />
              </div>
           </div>
         ))}
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-soft overflow-hidden">
         <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row gap-4 items-center justify-between relative">
            <div className="relative flex-1 max-w-md w-full">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                type="text" 
                placeholder="Search by Order ID or Destination..." 
                className="w-full bg-slate-50 border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm font-bold outline-none ring-primary-500/10 focus:ring-4" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className={`p-2.5 rounded-xl transition-all ${showFilterMenu ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-slate-50 text-slate-400 hover:text-slate-600'}`}
              >
                 <Filter className="w-5 h-5" />
              </button>

              {showFilterMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50">
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Outcome Status</p>
                      <div className="flex flex-wrap gap-2">
                        {['All', 'Delivered', 'Cancelled'].map((status) => (
                          <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${statusFilter === status ? 'bg-primary-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Service Class</p>
                      <div className="flex flex-wrap gap-2">
                        {['All', 'Express', 'Standard', 'Same Day'].map((cls) => (
                          <button
                            key={cls}
                            onClick={() => setClassFilter(cls)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${classFilter === cls ? 'bg-primary-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                          >
                            {cls}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-50">
                      <button 
                        onClick={() => { setStatusFilter('All'); setClassFilter('All'); setSearchTerm(''); }}
                        className="w-full py-2 text-[10px] font-black text-rose-500 uppercase tracking-widest hover:bg-rose-50 rounded-lg transition-all"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
         </div>
         
         <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left">
               <thead className="bg-slate-50/50 text-[10px] uppercase font-black tracking-widest text-slate-400 border-b border-slate-50">
                  <tr>
                     <th className="px-8 py-5">Order Reference</th>
                     <th className="px-8 py-5">Booking Date</th>
                     <th className="px-8 py-5">Destination Area</th>
                     <th className="px-8 py-5">Class</th>
                     <th className="px-8 py-5">Value</th>
                     <th className="px-8 py-5">Outcome</th>
                     <th className="px-8 py-5 text-right">Details</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {filteredHistory.length > 0 ? filteredHistory.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                       <td className="px-8 py-5 font-black text-slate-800 text-sm tracking-tight">{order.id}</td>
                       <td className="px-8 py-5 text-xs font-bold text-slate-500">{order.date}</td>
                       <td className="px-8 py-5 text-xs font-bold text-slate-700">{order.destination}</td>
                       <td className="px-8 py-5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-slate-100 text-slate-500 tracking-tighter">{order.class}</span>
                       </td>
                       <td className="px-8 py-5 font-black text-slate-800 text-sm">{order.amount}</td>
                       <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                             <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                             <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{order.status}</span>
                          </div>
                       </td>
                       <td className="px-8 py-5 text-right">
                          <button 
                            onClick={() => { setSelectedOrder(order); setShowDetailsModal(true); }}
                            className="px-4 py-2 bg-white hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-slate-200 hover:border-slate-900 shadow-sm hover:shadow-lg hover:shadow-slate-200"
                          >
                             View Details
                          </button>
                       </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="7" className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="p-4 bg-slate-50 rounded-full">
                            <Search className="w-8 h-8 text-slate-300" />
                          </div>
                          <p className="text-slate-400 font-bold">No shipments found matching your criteria.</p>
                          <button 
                            onClick={() => { setStatusFilter('All'); setClassFilter('All'); setSearchTerm(''); }}
                            className="text-primary-600 text-xs font-black uppercase tracking-widest"
                          >
                            Clear Filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
         
         <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing {filteredHistory.length} of {history.length} results</p>
            <div className="flex gap-2">
               <button className="px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-300 pointer-events-none">Back</button>
               <button className="px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-600 hover:bg-slate-50">Next Page</button>
            </div>
         </div>
      </div>

      {/* View Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetailsModal(false)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg relative z-10 shadow-2xl font-['Inter'] overflow-hidden"
            >
               <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-900 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight">Order Details</h3>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{selectedOrder.id} • Archived</p>
                    </div>
                  </div>
                  <button onClick={() => setShowDetailsModal(false)} className="p-3 hover:bg-white/10 rounded-xl transition-colors text-white/50 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
               </div>

               <div className="p-8 space-y-8">
                  <div className="grid grid-cols-2 gap-8 text-left">
                     <div className="space-y-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Booking Date</span>
                        <p className="text-sm font-black text-slate-800">{selectedOrder.date}</p>
                     </div>
                     <div className="space-y-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Value</span>
                        <p className="text-sm font-black text-slate-800">{selectedOrder.amount}</p>
                     </div>
                  </div>

                  <div className="space-y-3 text-left">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Final Status</span>
                     <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div className={`w-3 h-3 rounded-full ${
                          selectedOrder.status === 'Delivered' ? 'bg-emerald-500' : 'bg-rose-500'
                        }`} />
                        <span className="text-sm font-black text-slate-700 uppercase tracking-tight">{selectedOrder.status}</span>
                        <div className="ml-auto flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase">
                           <CheckCircle className="w-3 h-3" /> System Verified
                        </div>
                     </div>
                  </div>

                  <div className="space-y-3 text-left">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Route Area</span>
                     </div>
                     <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <MapPin className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                        <div>
                           <p className="text-sm font-black text-slate-800">{selectedOrder.destination}</p>
                           <p className="text-xs text-slate-400 font-medium mt-1">Order processed via Brooklyn Distribution Center</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="p-8 bg-slate-50 border-t border-slate-100">
                  <button onClick={() => setShowDetailsModal(false)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-slate-900/30">Close Details</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ShipmentHistory;
