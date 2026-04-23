import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Shield, Mail, Key, MoreHorizontal, Activity, X } from 'lucide-react';

const SystemUsers = () => {
  const [showInviteModal, setShowInviteModal] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeUserMenu, setActiveUserMenu] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);

  const triggerAction = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const users = [
    { id: 1, name: 'Admin Root', email: 'owner@deliverypro.io', role: 'Super Admin', status: 'Active', activity: '2 mins ago', color: 'bg-rose-100 text-rose-600' },
    { id: 2, name: 'Sarah Connor', email: 'sarah.support@deliverypro.io', role: 'Support Lead', status: 'Active', activity: 'Active now', color: 'bg-blue-100 text-blue-600' },
    { id: 3, name: 'John Wick', email: 'wick@deliverypro.io', role: 'Financial Manager', status: 'Away', activity: '45 mins ago', color: 'bg-amber-100 text-amber-600' },
    { id: 4, name: 'Marcus Aurelius', email: 'marcus@deliverypro.io', role: 'System Auditor', status: 'Active', activity: '10 mins ago', color: 'bg-emerald-100 text-emerald-600' },
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Toast Notifications */}
      <div className="fixed bottom-8 right-8 z-[200] space-y-3 pointer-events-none">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border pointer-events-auto backdrop-blur-xl ${
                n.type === 'success' ? 'bg-emerald-600/90 text-white border-emerald-400/50' : 'bg-primary-600/90 text-white border-primary-400/50'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest leading-none">System Alert</p>
                <p className="text-[13px] font-bold mt-1 text-white/90">{n.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {/* ... existing invite modal code ... */}
        {showInviteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInviteModal(false)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-md relative z-10 shadow-2xl font-['Inter'] overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Invite Staff</h3>
                    <p className="text-slate-500 font-medium text-xs">Send an invitation to join the team.</p>
                  </div>
                </div>
                <button onClick={() => setShowInviteModal(false)} className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 overflow-y-auto">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" placeholder="e.g. Robert Fox" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                  <input type="email" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" placeholder="robert@deliverypro.io" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Access Role</label>
                  <div className="relative">
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 outline-none transition-all appearance-none cursor-pointer">
                      <option>Super Admin</option>
                      <option>Support Lead</option>
                      <option>Financial Manager</option>
                      <option>System Auditor</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <MoreHorizontal className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50/50 border-t border-slate-50 flex gap-3">
                <button onClick={() => setShowInviteModal(false)} className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">Cancel</button>
                <button 
                  onClick={() => {
                    setShowInviteModal(false);
                    triggerAction("Invitation successfully sent to staff email.");
                  }} 
                  className="flex-1 py-3 bg-primary-600 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all"
                >
                  Send Invitation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8 focus:outline-none font-['Inter']"
      >
        {/* ... existing header and summary row code ... */}
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">System Administrators</h2>
            <p className="text-slate-500 font-medium">Manage cross-platform staff and their permission levels.</p>
          </div>
          <button 
            onClick={() => setShowInviteModal(true)}
            className="px-6 py-3 bg-primary-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary-200 hover:bg-primary-700 transition-all"
          >
            <UserPlus className="w-5 h-5" />
            Invite Platform Staff
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Permission Groups Summary - Now in Row */}
          <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-slate-100 shadow-soft">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
               <h3 className="font-black text-slate-800 uppercase tracking-tighter text-xs">Role Distribution</h3>
               <button className="px-4 py-1.5 border border-slate-100 rounded-xl text-[10px] font-black text-slate-400 hover:bg-slate-50 transition-all uppercase tracking-widest">
                  Manage Roles
               </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Super Admins', count: 2, color: 'bg-primary-600' },
                { name: 'Support Staff', count: 8, color: 'bg-blue-500' },
                { name: 'Billing/Fin', count: 3, color: 'bg-amber-500' },
                { name: 'Audit/Safety', count: 1, color: 'bg-emerald-500' }
              ].map((role, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50/50 border border-slate-50">
                  <div className="flex items-center justify-between text-xs font-bold mb-3">
                    <span className="text-slate-500">{role.name}</span>
                    <span className="text-slate-800">{role.count}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white rounded-full overflow-hidden shadow-inner">
                    <div className={`${role.color} h-full`} style={{ width: `${(role.count / 14) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 bg-primary-600 rounded-3xl p-6 text-white relative overflow-hidden group hover:shadow-xl hover:shadow-primary-100 transition-all cursor-pointer flex flex-col justify-center text-center">
             <Key className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 group-hover:scale-110 transition-transform" />
             <h4 className="text-lg font-black leading-tight mb-2">Security Status</h4>
             <p className="text-primary-100 text-xs font-medium uppercase tracking-widest font-black">100% MFA Protected</p>
          </div>
        </div>

        {/* User Table Area - Now Full Width */}
        <div className="w-full space-y-6">
           <div className="bg-white rounded-[2rem] border border-slate-100 shadow-soft overflow-hidden">
              <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
                <h3 className="font-black text-slate-800">Operational Staff</h3>
                <div className="flex gap-2">
                   <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Search by email..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-primary-500/20 outline-none w-48 font-bold" 
                      />
                   </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full h-full text-left">
                   <thead className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-50">
                      <tr>
                         <th className="px-6 py-4">Full Identity</th>
                         <th className="px-6 py-4">Auth Role</th>
                         <th className="px-6 py-4">State</th>
                         <th className="px-6 py-4">Last Event</th>
                         <th className="px-6 py-4 text-right">Settings</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                          <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                   <div className={`w-10 h-10 rounded-xl ${user.color} flex items-center justify-center font-black text-xs`}>
                                      {user.name.split(' ').map(n => n[0]).join('')}
                                   </div>
                                   <div>
                                      <p className="font-black text-slate-800 text-sm whitespace-nowrap">{user.name}</p>
                                      <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                   <Shield className="w-3.5 h-3.5 text-primary-500" />
                                   <span className="text-xs font-bold text-slate-600">{user.role}</span>
                                </div>
                             </td>
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5">
                                   <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                                   <span className="text-xs font-black text-slate-500 uppercase tracking-tight">{user.status}</span>
                                </div>
                             </td>
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-slate-400">
                                   <Activity className="w-3.5 h-3.5" />
                                   <span className="text-xs font-medium">{user.activity}</span>
                                </div>
                             </td>
                             <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                   <button 
                                     onClick={() => triggerAction(`Editing permissions for ${user.name}...`)}
                                     title="Edit Permissions"
                                     className="p-2.5 text-primary-600 bg-primary-50/50 hover:bg-primary-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-primary-100"
                                   >
                                      <Shield className="w-4.5 h-4.5" />
                                   </button>
                                   <button 
                                     onClick={() => triggerAction(`MFA Reset command sent to ${user.email}`, 'info')}
                                     title="Reset MFA"
                                     className="p-2.5 text-amber-600 bg-amber-50/50 hover:bg-amber-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-amber-100"
                                   >
                                      <Key className="w-4.5 h-4.5" />
                                   </button>
                                   <div className="w-px h-6 bg-slate-100 mx-1"></div>
                                   <button 
                                     onClick={() => triggerAction(`Staff account ${user.name} has been deactivated.`, 'success')}
                                     title="Deactivate Staff"
                                     className="p-2.5 text-rose-500 bg-rose-50/50 hover:bg-rose-500 hover:text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-rose-100"
                                   >
                                      <Activity className="w-4.5 h-4.5" />
                                   </button>
                                </div>
                             </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-12 text-center">
                             <div className="flex flex-col items-center gap-2 opacity-30">
                                <Mail className="w-8 h-8" />
                                <p className="text-xs font-black uppercase tracking-widest">No staff found matching "{searchTerm}"</p>
                             </div>
                          </td>
                        </tr>
                      )}
                   </tbody>
                </table>
              </div>
           </div>
        </div>
      </motion.div>
    </>
  );
};

export default SystemUsers;
