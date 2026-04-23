import React from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Search, Filter, ArrowUpRight, Download, Calendar, MoreVertical, MapPin, X, FileUp, Info, Eye, Edit2, Trash2, Clock } from 'lucide-react';

const OrdersManagement = () => {
  const [showImportModal, setShowImportModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showViewModal, setShowViewModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [activeOrder, setActiveOrder] = React.useState(null);
  const [showDateDropdown, setShowDateDropdown] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectedDateLabel, setSelectedDateLabel] = React.useState('Today');
  const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split('T')[0]);
  
  const fileInputRef = React.useRef(null);
  const dateInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setSelectedDateLabel(date);
    setShowDateDropdown(false);
  };

  const handlePresetDate = (preset) => {
    const today = new Date();
    let targetDate = new Date();
    
    if (preset === 'Yesterday') {
      targetDate.setDate(today.getDate() - 1);
    } else if (preset === 'Tomorrow') {
      targetDate.setDate(today.getDate() + 1);
    }
    
    const dateStr = targetDate.toISOString().split('T')[0];
    setSelectedDate(dateStr);
    setSelectedDateLabel(preset);
    setShowDateDropdown(false);
  };

  const allOrders = [
    { id: 'ORD-5501', client: 'Walmart Store #44', pickup: 'Whale Warehouse A', dropoff: 'Downtown NY', status: 'In Transit', driver: 'Alex J.', urgency: 'High', et: '14:20' },
    { id: 'ORD-5502', client: 'CVS Pharmacy', pickup: 'Distribution Hub', dropoff: 'Brooklyn Heights', status: 'Delivered', driver: 'Sarah M.', urgency: 'Normal', et: '09:45' },
    { id: 'ORD-5503', client: 'Local Restaurant', pickup: 'Kitchen Central', dropoff: 'Upper East Side', status: 'Pending', driver: 'TBD', urgency: 'Urgent', et: '16:00' },
    { id: 'ORD-5504', client: 'Amazon Hub', pickup: 'JFK Airport', dropoff: 'Long Island City', status: 'In Transit', driver: 'Mike K.', urgency: 'High', et: '13:10' },
    { id: 'ORD-5505', client: 'Best Buy', pickup: 'Retail Storage', dropoff: 'Jersey City', status: 'Failed', driver: 'John D.', urgency: 'Normal', et: '10:30' },
    // Page 2
    { id: 'ORD-5506', client: 'Target', pickup: 'Brooklyn Pier', dropoff: 'Staten Island', status: 'In Transit', driver: 'Sarah M.', urgency: 'Normal', et: '11:15' },
    { id: 'ORD-5507', client: 'Walgreens', pickup: 'Central Depot', dropoff: 'Queens Mall', status: 'Delivered', driver: 'Alex J.', urgency: 'High', et: '08:30' },
    { id: 'ORD-5508', client: 'Whole Foods', pickup: 'Organics Hub', dropoff: 'Chelsea Market', status: 'Pending', driver: 'TBD', urgency: 'Urgent', et: '17:45' },
    { id: 'ORD-5509', client: 'Apple Store', pickup: 'Retail Hub', dropoff: '5th Ave', status: 'In Transit', driver: 'Mike K.', urgency: 'Normal', et: '12:00' },
    { id: 'ORD-5510', client: 'H&M', pickup: 'Fashion District', dropoff: 'SoHo', status: 'Delivered', driver: 'John D.', urgency: 'Normal', et: '15:20' },
  ];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const orders = allOrders.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(allOrders.length / itemsPerPage);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Header section
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text('Orders & Shipments Report', 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
    doc.text('Confidential Logistics Data - Business Command Center', 14, 33);

    // Filter summary
    doc.setDrawColor(241, 245, 249); // slate-100
    doc.line(14, 40, 196, 40);

    const tableColumn = ["Order ID", "Client", "Destination", "Driver", "Urgency", "Status", "ETA"];
    const tableRows = [];

    orders.forEach(order => {
      const orderData = [
        order.id,
        order.client,
        order.dropoff,
        order.driver,
        order.urgency,
        order.status,
        order.et
      ];
      tableRows.push(orderData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      theme: 'grid',
      headStyles: {
        fillColor: [79, 70, 229], // primary-600
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold',
        halign: 'left'
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [51, 65, 85], // slate-700
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252], // slate-50
      },
      margin: { top: 45 },
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(8);
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(`Page ${i} of ${pageCount}`, 196, 285, { align: 'right' });
    }

    doc.save(`orders_report_${new Date().getTime()}.pdf`);
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && activeOrder && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[2rem] w-full max-w-sm relative z-10 shadow-2xl font-['Inter'] overflow-hidden text-center p-8"
            >
              <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Trash2 className="w-10 h-10 text-rose-500" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Delete Shipment?</h3>
              <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
                This action is irreversible. Are you sure you want to delete order <span className="text-slate-900 font-black">{activeOrder.id}</span>?
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-rose-200 hover:bg-rose-700 transition-all"
                >
                  Confirm Delete
                </button>
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="w-full py-4 bg-slate-50 text-slate-400 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-100 transition-all border border-slate-100"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Details Modal */}
      <AnimatePresence>
        {showViewModal && activeOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowViewModal(false)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg relative z-10 shadow-2xl font-['Inter'] overflow-hidden"
            >
               <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-primary-600 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight">Shipment Details</h3>
                      <p className="text-primary-100 font-bold text-xs uppercase tracking-widest">{activeOrder.id} • Live Update</p>
                    </div>
                  </div>
                  <button onClick={() => setShowViewModal(false)} className="p-3 hover:bg-white/10 rounded-xl transition-colors text-white/50 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
               </div>

               <div className="p-8 space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                     <div className="space-y-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</span>
                        <p className="text-sm font-black text-slate-800">{activeOrder.client}</p>
                     </div>
                     <div className="space-y-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Driver</span>
                        <p className="text-sm font-black text-slate-800">{activeOrder.driver}</p>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Status</span>
                     <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div className={`w-3 h-3 rounded-full ${
                          activeOrder.status === 'Delivered' ? 'bg-emerald-500' : 'bg-blue-500'
                        }`} />
                        <span className="text-sm font-black text-slate-700 uppercase tracking-tight">{activeOrder.status}</span>
                        <div className="ml-auto flex items-center gap-1 text-[10px] font-black text-slate-400">
                           <Clock className="w-3 h-3" /> Updated 2m ago
                        </div>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Route Overview</span>
                        <span className="text-[10px] font-black text-primary-600">Track Live Map</span>
                     </div>
                     <div className="space-y-6 relative ml-2">
                        <div className="absolute left-0 top-1 bottom-1 w-[1px] bg-slate-200 dashed-border" />
                        <div className="flex items-start gap-4 relative">
                           <div className="w-2 h-2 rounded-full bg-slate-300 -ml-1 mt-1.5" />
                           <div>
                              <p className="text-xs font-black text-slate-800 uppercase tracking-tighter leading-none">Pickup</p>
                              <p className="text-xs text-slate-500 font-medium mt-1">{activeOrder.pickup}</p>
                           </div>
                        </div>
                        <div className="flex items-start gap-4 relative">
                           <div className="w-2 h-2 rounded-full bg-primary-600 -ml-1 mt-1.5 scale-125" />
                           <div>
                              <p className="text-xs font-black text-slate-800 uppercase tracking-tighter leading-none">Destination</p>
                              <p className="text-xs text-slate-500 font-medium mt-1">{activeOrder.dropoff}</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                  <button onClick={() => setShowViewModal(false)} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary-500/30">Close View</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Order Modal */}
      <AnimatePresence>
        {showEditModal && activeOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditModal(false)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg relative z-10 shadow-2xl font-['Inter'] overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-200">
                    <Edit2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Edit Shipment</h3>
                    <p className="text-slate-500 font-medium text-xs">Modifying order <span className="text-amber-600 font-black">{activeOrder.id}</span></p>
                  </div>
                </div>
                <button onClick={() => setShowEditModal(false)} className="p-3 hover:bg-white rounded-xl transition-colors text-slate-400 border border-transparent hover:border-slate-100">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-8 overflow-y-auto">
                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] ml-1">Destination Address</label>
                  <div className="relative">
                     <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                     <input 
                       type="text" 
                       defaultValue={activeOrder.dropoff}
                       className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all" 
                     />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] ml-1">Assign Driver</label>
                    <select className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all cursor-pointer appearance-none">
                       <option>{activeOrder.driver}</option>
                       <option>Alex J.</option>
                       <option>Sarah M.</option>
                       <option>John D.</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] ml-1">Urgency Level</label>
                    <select className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all cursor-pointer appearance-none">
                       <option>{activeOrder.urgency}</option>
                       <option>Normal</option>
                       <option>High</option>
                       <option>Urgent</option>
                    </select>
                  </div>
                </div>


              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                <button onClick={() => setShowEditModal(false)} className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">Discard Changes</button>
                <button onClick={() => setShowEditModal(false)} className="flex-1 py-4 bg-amber-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-amber-500/30 hover:bg-amber-600 transition-all">Update Shipment</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bulk Import Modal */}
      <AnimatePresence>
        {showImportModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowImportModal(false)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-md relative z-10 shadow-2xl font-['Inter'] overflow-hidden"
            >
              <div className="p-6 border-b border-slate-50 flex items-center justify-between shadow-sm bg-slate-50/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center shadow-inner">
                    <FileUp className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Bulk Import</h3>
                    <p className="text-slate-500 font-medium text-xs">Mass-upload order batch.</p>
                  </div>
                </div>
                <button onClick={() => setShowImportModal(false)} className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 border border-transparent hover:border-slate-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                 <div 
                   onClick={() => fileInputRef.current?.click()}
                   className="border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-primary-300 transition-all cursor-pointer group"
                 >
                    <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                       {selectedFile ? (
                         <Package className="w-6 h-6 text-emerald-500" />
                       ) : (
                         <Download className="w-6 h-6 text-slate-300 group-hover:text-primary-600 rotate-180" />
                       )}
                    </div>
                    {selectedFile ? (
                      <div className="text-center">
                        <p className="text-sm font-black text-slate-800 mb-1">{selectedFile.name}</p>
                        <p className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase mb-3">Ready to Import</p>
                        <button 
                          onClick={handleRemoveFile}
                          className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline"
                        >
                          Remove File
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm font-black text-slate-800 mb-1">Click to select files</p>
                        <p className="text-xs text-slate-400 font-medium tracking-tight">Batch limit: 500 rows (.csv, .xlsx)</p>
                      </>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden" 
                      accept=".csv,.xlsx,.xls"
                    />
                 </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                <button onClick={() => setShowImportModal(false)} className="flex-1 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">Cancel</button>
                <button onClick={() => setShowImportModal(false)} className="flex-1 py-3.5 bg-primary-600 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all">Start Validation</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-7xl mx-auto space-y-6 focus:outline-none"
      >
      {/* Header Side */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Orders & Shipments</h2>
          <p className="text-slate-500 font-medium">Monitor and manage the entire lifecycle of your logistics operations.</p>
        </div>
        <div className="flex gap-3 font-['Inter']">
          <button 
            onClick={handleExportPDF}
            className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-black text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" /> Export Report
          </button>
          <button 
            onClick={() => setShowImportModal(true)}
            className="btn-primary px-6 py-2.5 text-sm"
          >
            Bulk Import
          </button>
        </div>
      </div>

      {/* Analytics Mini Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: 'Out for Delivery', val: '142', color: 'bg-blue-600' },
           { label: 'Pending Dispatch', val: '28', color: 'bg-primary-600' },
           { label: 'Exceptions', val: '4', color: 'bg-rose-500' },
           { label: 'Successfully Completed', val: '894', color: 'bg-emerald-500' }
         ].map((stat, i) => (
           <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-soft">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                 <p className="text-2xl font-black text-slate-800 tracking-tight">{stat.val}</p>
                 <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
              </div>
           </div>
         ))}
      </div>

      {/* Filter Row */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-soft flex flex-wrap gap-4 items-center justify-between font-['Inter']">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by Order ID, Client, or Driver..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500/10 outline-none"
          />
        </div>
        <div className="flex gap-2 relative">
           <div className="relative group">
             <button 
               onClick={() => setShowDateDropdown(!showDateDropdown)}
               className={`px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black uppercase flex items-center gap-2 hover:bg-slate-100 transition-all ${
                 showDateDropdown ? 'ring-2 ring-primary-500/20 text-primary-600 border-primary-100' : 'text-slate-500'
               }`}
             >
                <Calendar className={`w-4 h-4 ${showDateDropdown ? 'text-primary-500' : 'text-slate-400'}`} /> 
                {selectedDateLabel}
             </button>

             <AnimatePresence>
               {showDateDropdown && (
                 <>
                   <div 
                     className="fixed inset-0 z-40" 
                     onClick={() => setShowDateDropdown(false)}
                   />
                   <motion.div 
                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: 10, scale: 0.95 }}
                     className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl border border-slate-100 shadow-2xl z-50 overflow-hidden font-['Inter']"
                   >
                     <div className="p-2 space-y-1">
                        {['Yesterday', 'Today', 'Tomorrow'].map((preset) => (
                           <button 
                             key={preset}
                             onClick={() => handlePresetDate(preset)}
                             className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                               selectedDateLabel === preset ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-50'
                             }`}
                           >
                              {preset}
                           </button>
                        ))}
                        <div className="h-px bg-slate-50 my-1" />
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDateDropdown(false);
                            // Brief timeout ensures the dropdown UI doesn't interfere with the system calendar pop-up
                            setTimeout(() => {
                              if (dateInputRef.current?.showPicker) {
                                dateInputRef.current.showPicker();
                              } else {
                                dateInputRef.current?.click();
                              }
                            }, 50);
                          }}
                          className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-between"
                        >
                           Custom Date
                           <ArrowUpRight className="w-3 h-3 text-slate-400" />
                        </button>
                     </div>
                   </motion.div>
                 </>
               )}
             </AnimatePresence>

             <input 
               type="date" 
               ref={dateInputRef}
               onChange={handleDateChange}
               className="absolute w-0 h-0 opacity-0 pointer-events-none" 
             />
           </div>
           
           <button className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black text-slate-500 uppercase flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" /> Advanced
           </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-['Inter']">
            <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-widest font-black border-b border-slate-100">
              <tr>
                <th className="px-6 py-5">Shipment ID</th>
                <th className="px-6 py-5">Client & Destination</th>
                <th className="px-6 py-5">Timeline</th>
                <th className="px-6 py-5">Personnel</th>
                <th className="px-6 py-5">Urgency</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                       <span className="font-black text-slate-800 text-sm tracking-tight">{order.id}</span>
                       <span className="text-[10px] font-bold text-primary-500 uppercase">Express</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-bold text-slate-800 text-sm">{order.client}</p>
                    <div className="flex items-center gap-1 mt-1 text-slate-400">
                       <MapPin className="w-3 h-3 shrink-0" />
                       <span className="text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">{order.dropoff}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                     <p className="text-sm font-black text-slate-700">ETA {order.et}</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase">Today</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                       <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center font-black text-[10px] text-slate-500 shadow-inner">
                          {order.driver.charAt(0)}
                       </div>
                       <span className="text-xs font-bold text-slate-600">{order.driver}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${
                      order.urgency === 'Urgent' ? 'bg-rose-50 text-rose-600' : 
                      order.urgency === 'High' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {order.urgency}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${
                          order.status === 'Delivered' ? 'bg-emerald-500' :
                          order.status === 'In Transit' ? 'bg-blue-500 animate-pulse' :
                          order.status === 'Failed' ? 'bg-rose-500' : 'bg-slate-300'
                       }`}></div>
                       <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{order.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => {
                          setActiveOrder(order);
                          setShowViewModal(true);
                        }}
                        className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          setActiveOrder(order);
                          setShowEditModal(true);
                        }}
                        className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                        title="Edit Order"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          setActiveOrder(order);
                          setShowDeleteModal(true);
                        }}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                        title="Delete Order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between font-['Inter']">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Page {currentPage} of {totalPages}
           </div>
           <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black transition-all ${
                  currentPage === 1 ? 'opacity-30 cursor-not-allowed text-slate-300' : 'text-slate-500 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                Prev
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  currentPage === totalPages ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-primary-600 text-white shadow-lg shadow-primary-500/20 hover:bg-primary-700'
                }`}
              >
                Next
              </button>
           </div>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default OrdersManagement;
