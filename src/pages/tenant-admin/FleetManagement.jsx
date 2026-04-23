import React from 'react';
import { Truck, Fuel, Wrench, Activity, ChevronRight, Zap, AlertCircle, TrendingUp, X, Camera, Info, Calendar, BarChart3, Download, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const VehicleCard = ({ vehicle }) => (
  <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-soft flex flex-col font-['Inter']">
    <div className="flex justify-between items-start mb-6">
      <div className={`p-3 rounded-2xl ${vehicle.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        <Truck className="w-6 h-6" />
      </div>
      <div className="text-right">
        <p className="text-sm font-black text-slate-800 tracking-tight">{vehicle.id}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase">{vehicle.type}</p>
      </div>
    </div>

    <div className="space-y-4 mb-6">
       <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Health</span>
          <span className="text-xs font-black text-slate-700">{vehicle.health}%</span>
       </div>
       <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
          <div className={`h-full ${vehicle.health > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${vehicle.health}%` }}></div>
       </div>
    </div>

    <div className="grid grid-cols-2 gap-3 mb-6">
       <div className="bg-slate-50 p-2 rounded-xl text-center">
          <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Fuel</p>
          <p className="text-xs font-black text-slate-800">{vehicle.fuel}%</p>
       </div>
       <div className="bg-slate-50 p-2 rounded-xl text-center">
          <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Milage</p>
          <p className="text-xs font-black text-slate-800">{vehicle.milage}k</p>
       </div>
    </div>

    <div className="flex gap-2">
       <button className="flex-1 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Service</button>
       <button className="p-2 bg-slate-100 text-slate-400 rounded-xl hover:text-slate-600"><Activity className="w-4 h-4" /></button>
    </div>
  </div>
);

const FleetManagement = () => {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showReportsModal, setShowReportsModal] = React.useState(false);
  const [reportFormat, setReportFormat] = React.useState('PDF');

  const handleGenerateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59);
    doc.text('Fleet Intelligence Report', 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
    
    autoTable(doc, {
      startY: 40,
      head: [['Asset ID', 'Type', 'Status', 'Health', 'Fuel', 'Milage']],
      body: vehicles.map(v => [v.id, v.type, v.status, `${v.health}%`, `${v.fuel}%`, `${v.milage}k`]),
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229], textColor: 255 },
      styles: { font: 'helvetica', fontSize: 9 }
    });
    
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.text(`Total Assets: ${vehicles.length}`, 14, finalY);
    doc.text(`Average Fleet Health: ${(vehicles.reduce((acc, v) => acc + v.health, 0) / vehicles.length).toFixed(1)}%`, 14, finalY + 7);

    doc.save(`Fleet_Report_${new Date().getTime()}.pdf`);
    setShowReportsModal(false);
  };

  const vehicles = [
    { id: 'VAN-NY-1021', type: 'Sprinter Van', status: 'Active', health: 94, fuel: 82, milage: 12.5 },
    { id: 'TNK-NY-992', type: 'Heavy Truck', status: 'Service', health: 42, fuel: 15, milage: 142.8 },
    { id: 'VAN-NY-1024', type: 'Box Truck', status: 'Active', health: 88, fuel: 45, milage: 24.1 },
    { id: 'BIK-NY-001', type: 'E-Bike', status: 'Active', health: 91, fuel: 95, milage: 1.2 },
    { id: 'VAN-NY-1100', type: 'Sprinter Van', status: 'Active', health: 76, fuel: 32, milage: 48.4 },
    { id: 'VAN-NY-1105', type: 'Box Truck', status: 'Active', health: 98, fuel: 100, milage: 0.5 },
  ];

  return (
    <>
      {/* Fleet Reports Modal */}
      <AnimatePresence>
        {showReportsModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReportsModal(false)}
              className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-md relative z-10 shadow-2xl font-['Inter'] overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-200">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none">Fleet Reports</h3>
                    <p className="text-slate-500 font-bold text-[9px] uppercase tracking-widest mt-1">Analytics Intelligence</p>
                  </div>
                </div>
                <button onClick={() => setShowReportsModal(false)} className="p-2.5 hover:bg-white rounded-xl transition-colors text-slate-400 border border-transparent hover:border-slate-100 shadow-sm">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto">
                {/* Visual Analytics Placeholder */}
                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Efficiency Trend</span>
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                   </div>
                   <div className="h-16 flex items-end gap-1.5 px-1">
                      {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                         <motion.div 
                           key={i}
                           initial={{ height: 0 }}
                           animate={{ height: `${h}%` }}
                           className="flex-1 bg-primary-500/80 rounded-t-md"
                         />
                      ))}
                   </div>
                </div>

                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Configuration</label>
                   <div className="space-y-3">
                      <div className="relative">
                         <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                         <select className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none hover:bg-slate-100 transition-all appearance-none cursor-pointer">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>This Quarter</option>
                            <option>Year to Date</option>
                         </select>
                         <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                      <div className="relative">
                         <Truck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                         <select className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none hover:bg-slate-100 transition-all appearance-none cursor-pointer">
                            <option>Total Assets (All)</option>
                            <option>Sprinter Vans Only</option>
                            <option>Heavy Logistics Units</option>
                            <option>Maintenance Required</option>
                         </select>
                         <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                   </div>
                </div>

                <div className="p-4 rounded-2xl border border-dashed border-slate-100 flex flex-col items-center gap-3">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Select Output Protocol</p>
                   <div className="flex gap-2">
                      {['PDF', 'EXCEL', 'CSV'].map(ext => (
                         <button 
                           key={ext} 
                           onClick={() => setReportFormat(ext)}
                           className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${
                             reportFormat === ext 
                             ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                             : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                           }`}
                         >
                            {ext}
                         </button>
                      ))}
                   </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                <button 
                  onClick={() => setShowReportsModal(false)} 
                  className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all"
                >
                   Close
                </button>
                <button 
                  onClick={handleGenerateReport}
                  className="flex-[2] py-4 bg-primary-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary-500/30 hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
                >
                   <Download className="w-4 h-4" /> Download {reportFormat}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Vehicle Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg relative z-10 shadow-2xl font-['Inter'] overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-primary-600 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">Add New Asset</h3>
                    <p className="text-primary-100 font-medium text-xs">Register a new vehicle to your delivery fleet.</p>
                  </div>
                </div>
                <button onClick={() => setShowAddModal(false)} className="p-3 hover:bg-white/10 rounded-xl transition-colors text-white/50 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-8 overflow-y-auto">
                <div className="flex justify-center">
                   <div className="relative group">
                      <div className="w-24 h-24 rounded-[2rem] bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center group-hover:border-primary-400 transition-colors cursor-pointer overflow-hidden">
                         <Camera className="w-8 h-8 text-slate-300 group-hover:text-primary-500" />
                         <span className="text-[10px] font-black text-slate-400 mt-1">UPLOAD PHOTO</span>
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-primary-600 uppercase tracking-widest ml-1">Asset ID / Plate</label>
                        <input type="text" placeholder="VAN-NY-2024" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-300" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-primary-600 uppercase tracking-widest ml-1">Vehicle Type</label>
                        <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-500/10 outline-none transition-all cursor-pointer appearance-none">
                           <option>Sprinter Van</option>
                           <option>Box Truck</option>
                           <option>Heavy Truck</option>
                           <option>Electric Bike</option>
                        </select>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-primary-600 uppercase tracking-widest ml-1">Make & Model</label>
                        <input type="text" placeholder="Mercedes Sprinter" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-300" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-primary-600 uppercase tracking-widest ml-1">Initial Milage</label>
                        <input type="number" placeholder="0.0" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-300" />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary-600 uppercase tracking-widest ml-1">Assign to Station</label>
                      <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary-500/10 outline-none transition-all cursor-pointer appearance-none">
                         <option>New York Downtown Hub</option>
                         <option>Brooklyn Distribution Center</option>
                         <option>Queens Logistics Base</option>
                         <option>NJ Warehouse A</option>
                      </select>
                   </div>
                </div>

              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">Discard</button>
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary-500/30 hover:bg-primary-700 transition-all">Initialize Asset</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-['Inter']">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Fleet Asset Inventory</h2>
            <p className="text-slate-500 font-medium text-sm">Track vehicle health, fuel levels and maintenance schedules.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowReportsModal(true)}
              className="px-4 py-2 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
               Reports
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="btn-primary px-6 hover:scale-105 transition-all shadow-lg shadow-primary-200"
            >
              Add Vehicle
            </button>
          </div>
        </div>

      {/* Fleet Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         <div className="bg-primary-600 p-4 rounded-2xl text-white relative overflow-hidden shadow-lg shadow-primary-100">
            <Zap className="absolute -right-3 -top-3 w-16 h-16 opacity-10 animate-pulse" />
            <p className="text-primary-100 text-[9px] font-black uppercase tracking-widest mb-1">Fuel Efficiency</p>
            <h3 className="text-xl font-black mb-2">12.4 km/L</h3>
            <div className="flex items-center gap-1.5 text-emerald-300 text-[10px] font-bold">
               <TrendingUp className="w-3.5 h-3.5" /> +4.2%
            </div>
         </div>
         <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-soft">
            <Wrench className="w-5 h-5 text-amber-500 mb-3" />
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">In Maintenance</p>
            <h3 className="text-xl font-black text-slate-800">2 Units</h3>
            <p className="text-slate-400 text-[10px] font-bold mt-1">Today 2PM</p>
         </div>
         <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-soft">
            <Fuel className="w-5 h-5 text-rose-500 mb-3" />
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">Fuel Spend</p>
            <h3 className="text-xl font-black text-slate-800">$1,420</h3>
            <p className="text-slate-400 text-[10px] font-bold mt-1">Week-to-date</p>
         </div>
         <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-soft">
            <AlertCircle className="w-5 h-5 text-blue-500 mb-3" />
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">Alerts</p>
            <h3 className="text-xl font-black text-slate-800">4 Unread</h3>
            <p className="text-slate-400 text-[10px] font-bold mt-1">Critical system</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((v, i) => (
          <VehicleCard key={i} vehicle={v} />
        ))}
      </div>
    </motion.div>
    </>
  );
};

export default FleetManagement;
