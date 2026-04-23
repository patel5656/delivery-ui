import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, MapPin, Clock, Search, Filter, ArrowRight, Play, MoreVertical, X, CheckCircle2 } from 'lucide-react';

const OrderItem = ({ order, onAssign }) => (
  <motion.div 
    whileHover={{ x: 4 }}
    className="bg-white p-5 rounded-3xl border border-slate-100 shadow-soft flex items-center gap-6 group transition-all hover:border-primary-200"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
       order.priority === 'Critical' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'
    }`}>
       <Package className="w-6 h-6" />
    </div>

    <div className="flex-1 min-w-0 font-['Inter']">
       <div className="flex items-center gap-2 mb-1">
          <span className="font-black text-slate-800 tracking-tight">{order.id}</span>
          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
             order.type === 'Express' ? 'bg-primary-50 text-primary-600' : 'bg-slate-100 text-slate-500'
          }`}>{order.type}</span>
       </div>
       <div className="flex items-center gap-1.5 text-slate-400">
          <MapPin className="w-3.5 h-3.5" />
          <p className="text-xs font-medium truncate">{order.destination}</p>
       </div>
    </div>

    <div className="hidden md:block w-32 shrink-0 font-['Inter']">
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">SLA Deadline</p>
       <div className="flex items-center gap-2 font-black text-xs text-slate-700">
          <Clock className="w-3.5 h-3.5" /> {order.deadline}
       </div>
    </div>

    <div className="flex items-center gap-4">
       <button onClick={() => onAssign(order)} className="px-5 py-2.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-600 transition-all flex items-center gap-2 shadow-lg shadow-slate-200">
          Assign <ArrowRight className="w-3.5 h-3.5" />
       </button>
       <button className="p-2.5 text-slate-300 hover:text-slate-600">
          <MoreVertical className="w-5 h-5" />
       </button>
    </div>
  </motion.div>
);

const OrderQueue = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('All');
  const [showFilters, setShowFilters] = React.useState(false);
  const [showAutoDispatchModal, setShowAutoDispatchModal] = React.useState(false);
  const [isAutoDispatchOn, setIsAutoDispatchOn] = React.useState(true);
  const [showAssignModal, setShowAssignModal] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const orders = [
    { id: 'TKT-99201', type: 'Express', destination: 'Financial District, NY', deadline: '24 mins left', priority: 'Critical' },
    { id: 'TKT-99202', type: 'Standard', destination: 'Queens North Hub', deadline: '2.4 hrs left', priority: 'Normal' },
    { id: 'TKT-99203', type: 'Express', destination: 'Brooklyn Heights, NY', deadline: '45 mins left', priority: 'High' },
    { id: 'TKT-99204', type: 'Same Day', destination: 'Jersey City Terminal', deadline: '1.2 hrs left', priority: 'Normal' },
    { id: 'TKT-99205', type: 'Express', destination: 'Midtown Manhattan', deadline: '12 mins left', priority: 'Critical' },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || order.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-7xl mx-auto space-y-6 font-['Inter']"
      >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none text-left">Incoming Order Queue</h2>
          <p className="text-slate-500 font-medium text-sm mt-1 text-left">Real-time unassigned orders awaiting dispatch action.</p>
        </div>
        <div className="flex gap-3">
           <button onClick={() => setShowAutoDispatchModal(true)} className="px-5 py-3 bg-white border-2 border-slate-50 rounded-[1.5rem] flex items-center justify-center gap-2 font-black text-xs text-slate-500 uppercase tracking-widest hover:bg-slate-50 shadow-sm transition-all">
              {isAutoDispatchOn ? (
                 <><Play className="w-4 h-4 text-emerald-500 fill-current" /> Auto-Dispatch On</>
              ) : (
                 <><Play className="w-4 h-4 text-slate-300" /> Auto-Dispatch Off</>
              )}
           </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-soft flex flex-wrap gap-4 items-center">
         <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search orders by ID or location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary-500/10 transition-all placeholder:text-slate-300" 
            />
         </div>
         <div className="relative">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3.5 rounded-2xl transition-all border-2 ${
                activeFilter !== 'All' 
                ? 'bg-primary-50 border-primary-200 text-primary-600' 
                : 'bg-slate-50 border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
               <Filter className="w-5 h-5" />
            </button>
            
            <AnimatePresence>
              {showFilters && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowFilters(false)} />
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden"
                  >
                    <div className="p-2 space-y-1">
                      {['All', 'Express', 'Standard', 'Same Day'].map(type => (
                        <button
                          key={type}
                          onClick={() => {
                            setActiveFilter(type);
                            setShowFilters(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${
                            activeFilter === type 
                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' 
                            : 'text-slate-500 hover:bg-slate-50'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
         </div>
      </div>

      <div className="space-y-4">
         {filteredOrders.length > 0 ? (
           filteredOrders.map(order => (
             <OrderItem key={order.id} order={order} onAssign={(o) => { setSelectedOrder(o); setShowAssignModal(true); }} />
           ))
         ) : (
           <div className="py-20 text-center bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-100">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
                 <Search className="w-8 h-8 text-slate-200" />
              </div>
              <p className="text-slate-400 font-bold">No orders match your current filters</p>
              <button 
                onClick={() => { setSearchTerm(''); setActiveFilter('All'); }}
                className="mt-4 text-xs font-black text-primary-600 uppercase tracking-widest"
              >
                Clear all filters
              </button>
           </div>
         )}
      </div>

      {filteredOrders.length > 0 && (
        <div className="flex items-center justify-center py-8">
           <button className="px-8 py-3 bg-white border border-slate-100 text-slate-400 rounded-full font-black text-xs uppercase tracking-widest hover:text-slate-600 hover:border-slate-200 transition-all shadow-sm">
              Load More Pendings
           </button>
        </div>
      )}
      </motion.div>

      {/* Auto-Dispatch Modal */}
      <AnimatePresence>
        {showAutoDispatchModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAutoDispatchModal(false)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[2rem] w-full max-w-sm relative z-10 shadow-2xl font-['Inter'] overflow-hidden text-center p-8"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isAutoDispatchOn ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'}`}>
                 <Play className="w-10 h-10 fill-current" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Toggle Auto-Dispatch?</h3>
              <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
                You are about to turn {isAutoDispatchOn ? 'OFF' : 'ON'} the automatic dispatching engine. 
                {isAutoDispatchOn ? ' Orders will need manual assignment.' : ' Incoming orders will be automatically assigned to the best available drivers.'}
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setIsAutoDispatchOn(!isAutoDispatchOn);
                    setShowAutoDispatchModal(false);
                  }}
                  className={`w-full py-4 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl transition-all ${isAutoDispatchOn ? 'bg-amber-500 shadow-amber-200 hover:bg-amber-600' : 'bg-emerald-500 shadow-emerald-200 hover:bg-emerald-600'}`}
                >
                  Confirm {isAutoDispatchOn ? 'Turn Off' : 'Turn On'}
                </button>
                <button 
                  onClick={() => setShowAutoDispatchModal(false)}
                  className="w-full py-4 bg-slate-50 text-slate-400 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-100 transition-all border border-slate-100"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Assign Driver Modal */}
      <AnimatePresence>
        {showAssignModal && selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAssignModal(false)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[2rem] w-full max-w-md relative z-10 shadow-2xl font-['Inter'] overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Assign Courier</h3>
                  <p className="text-slate-500 font-medium text-xs mt-1">Select an available driver for <span className="font-black text-primary-600">{selectedOrder.id}</span></p>
                </div>
                <button onClick={() => setShowAssignModal(false)} className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4">
                 {[
                   { name: 'Alex Johnson', status: 'Available', distance: '1.2 km away', eta: '5 mins' },
                   { name: 'Maria Garcia', status: 'Available', distance: '3.4 km away', eta: '12 mins' },
                   { name: 'David Smith', status: 'Available', distance: '4.1 km away', eta: '15 mins' }
                 ].map((driver, idx) => (
                   <label key={idx} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:border-primary-200 hover:bg-primary-50/50 transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                         <input type="radio" name="driver" className="w-4 h-4 text-primary-600 focus:ring-primary-500" defaultChecked={idx === 0} />
                         <div>
                            <p className="font-black text-sm text-slate-900">{driver.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{driver.status} • {driver.distance}</span>
                            </div>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">ETA</p>
                         <p className="text-sm font-black text-slate-800">{driver.eta}</p>
                      </div>
                   </label>
                 ))}
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                <button onClick={() => setShowAssignModal(false)} className="flex-1 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">Cancel</button>
                <button onClick={() => {
                  setShowAssignModal(false);
                  // Optional: add triggerAction logic here if global notification state exists
                }} className="flex-1 py-3.5 bg-slate-900 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-slate-900/20 hover:bg-primary-600 transition-all flex items-center justify-center gap-2">
                  Confirm Assignment <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OrderQueue;
