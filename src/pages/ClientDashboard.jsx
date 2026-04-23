import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  Package, 
  Search, 
  MapPin, 
  Clock, 
  FileText, 
  CreditCard,
  Plus,
  ArrowRight,
  Download,
  Camera
} from 'lucide-react';
import { motion } from 'framer-motion';

import { Routes, Route } from 'react-router-dom';
import NewShipment from './client/NewShipment';
import CLTracking from './client/CLTracking';
import ShipmentHistory from './client/ShipmentHistory';
import PodRecords from './client/PodRecords';
import ClientBilling from './client/ClientBilling';

const ClientOverview = () => {
  const activeShipments = [
    { id: 'DP-9921', status: 'In Transit', origin: 'Brooklyn Hub', destination: 'Financial District, NY', eft: '25 mins', driver: 'Alex J.' },
    { id: 'DP-9922', status: 'Scheduled', origin: 'WareHouse A', destination: 'Long Island City', eft: 'Tomorrow', driver: 'TBD' },
  ];

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text('Client Invoice Report', 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
    doc.text('DeliveryPro - Logistics & Shipping Services', 14, 33);

    // Filter summary
    doc.setDrawColor(241, 245, 249); // slate-100
    doc.line(14, 40, 196, 40);

    const tableColumn = ["Order ID", "Date", "Description", "Amount", "Status"];
    const tableRows = [
      ["DP-9921", "2023-10-15", "Express Delivery to Financial District", "$125.00", "Paid"],
      ["DP-9922", "2023-10-14", "Standard Shipping to Long Island City", "$45.00", "Pending"],
      ["DP-9918", "2023-10-10", "Bulk Freight to Newark", "$850.00", "Paid"]
    ];

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      theme: 'grid',
      headStyles: {
        fillColor: [37, 99, 235], // primary-600
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
    });

    doc.save(`Invoice_Report_${new Date().getTime()}.pdf`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-indigo-700 rounded-[2rem] p-8 md:p-12 text-white shadow-xl shadow-primary-200 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
         <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Track your shipments <br/> in real-time.</h2>
            <div className="max-w-lg relative mt-8">
               <input 
                 type="text" 
                 placeholder="Enter Order ID (e.g. DP-XXXX)" 
                 className="w-full bg-white text-slate-800 rounded-2xl py-4 pl-6 pr-32 outline-none shadow-lg font-bold placeholder:text-slate-400 placeholder:font-medium"
               />
               <button className="absolute right-2 top-2 bottom-2 px-6 bg-primary-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all">
                  Track Now
                  <ArrowRight className="w-4 h-4" />
               </button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Active Shipments */}
         <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-black text-slate-800">Active Shipments</h3>
               <button className="text-primary-600 text-sm font-bold flex items-center gap-1">
                  Book New <Plus className="w-4 h-4" />
               </button>
            </div>

            {activeShipments.map((shipment) => (
              <motion.div 
                key={shipment.id}
                whileHover={{ y: -2 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft"
              >
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-primary-50 rounded-2xl">
                          <Package className="w-6 h-6 text-primary-600" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Order ID</p>
                          <h4 className="text-lg font-black text-slate-800">{shipment.id}</h4>
                       </div>
                    </div>

                    <div className="flex-1 md:px-8">
                       <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase mb-2">
                          <span>{shipment.origin}</span>
                          <span>{shipment.destination}</span>
                       </div>
                       <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '65%' }}
                            className="absolute top-0 left-0 h-full bg-primary-500 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                          ></motion.div>
                       </div>
                    </div>

                    <div className="text-right shrink-0">
                       <p className="text-xs font-black text-primary-600 mb-1">{shipment.status}</p>
                       <p className="text-sm font-bold text-slate-800">ETA: {shipment.eft}</p>
                    </div>
                 </div>
              </motion.div>
            ))}
         </div>

         {/* Quick Stats & Records */}
         <div className="space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
               <h3 className="font-black text-slate-800 mb-6">Quick Actions</h3>
               <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={handleDownloadInvoice}
                    className="p-4 bg-slate-50 hover:bg-primary-50 hover:text-primary-600 transition-all rounded-2xl flex flex-col items-center gap-2 group"
                  >
                     <Download className="w-6 h-6 text-slate-400 group-hover:text-primary-600" />
                     <span className="text-[10px] font-black uppercase">Invoices</span>
                  </button>
                  <button className="p-4 bg-slate-50 hover:bg-primary-50 hover:text-primary-600 transition-all rounded-2xl flex flex-col items-center gap-2 group">
                     <FileText className="w-6 h-6 text-slate-400 group-hover:text-primary-600" />
                     <span className="text-[10px] font-black uppercase">POD Docs</span>
                  </button>
               </div>
            </div>

            {/* Support Card */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-32 h-32 bg-primary-600/20 rounded-full -ml-16 -mt-16 blur-2xl"></div>
               <h4 className="font-black mb-2 relative z-10">Need Help?</h4>
               <p className="text-slate-400 text-xs font-medium mb-6 relative z-10">Our 24/7 dedicated support team is here to assist you with any deliveries.</p>
               <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all relative z-10">
                  Open Ticket
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

const ClientPortal = () => {
  const menuItems = [
    { label: 'My Orders', icon: <Package className="w-5 h-5" />, path: '/client' },
    { label: 'New Shipment', icon: <Plus className="w-5 h-5" />, path: '/client/new' },
    { label: 'Tracking', icon: <MapPin className="w-5 h-5" />, path: '/client/track' },
    { label: 'Order History', icon: <Clock className="w-5 h-5" />, path: '/client/history' },
    { label: 'POD Records', icon: <FileText className="w-5 h-5" />, path: '/client/pod' },
    { label: 'Billing', icon: <CreditCard className="w-5 h-5" />, path: '/client/billing' },
  ];

  return (
    <DashboardLayout title="Client Self-Service Portal" menuItems={menuItems}>
      <Routes>
        <Route path="/" element={<ClientOverview />} />
        <Route path="/new" element={<NewShipment />} />
        <Route path="/track" element={<CLTracking />} />
        <Route path="/history" element={<ShipmentHistory />} />
        <Route path="/pod" element={<PodRecords />} />
        <Route path="/billing" element={<ClientBilling />} />
      </Routes>
    </DashboardLayout>
  );
};

export default ClientPortal;
