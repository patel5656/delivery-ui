import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Plus, Search, Filter, Globe, User, Edit3, Power, BarChart3, Trash2, X, Bell, LayoutDashboard, Download, CreditCard } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const TenantManagement = () => {
  const location = useLocation();
  const [showAddModal, setShowAddModal] = useState(location.state?.addTenant || false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState({ type: '', title: '', message: '' });

  const [tenants, setTenants] = useState([
    { id: 1, name: 'Swift Delivery Co.', owner: 'Alex Wong', domain: 'swift.deliverypro.com', plan: 'Enterprise', status: 'Active', drivers: 45, joined: '2024-03-12' },
    { id: 2, name: 'Metro Couriers', owner: 'Bob Smith', domain: 'metro.deliverypro.com', plan: 'Professional', status: 'Active', drivers: 12, joined: '2024-04-01' },
    { id: 3, name: 'Global Logistics', owner: 'Charlie Davis', domain: 'global.deliverypro.com', plan: 'Starter', status: 'Pending', drivers: 0, joined: '2024-04-10' },
    { id: 4, name: 'FastTrack Solutions', owner: 'Emma Watson', domain: 'fasttrack.deliverypro.com', plan: 'Enterprise', status: 'Active', drivers: 98, joined: '2024-01-15' },
    { id: 5, name: 'Prime Express', owner: 'David Chen', domain: 'prime.deliverypro.com', plan: 'Professional', status: 'Inactive', drivers: 5, joined: '2023-11-20' },
  ]);

  const triggerAction = (type, tenant, fromConfirmation = false) => {
    setSelectedTenant(tenant);
    
    if (type === 'edit' && !fromConfirmation) {
      setShowEditModal(true);
      return;
    } 
    
    if (type === 'analytics' && !fromConfirmation) {
      setShowAnalyticsModal(true);
      return;
    }
    
    if (type === 'suspend' && !fromConfirmation) {
      setConfirmAction({
        type: 'suspend',
        title: tenant.status === 'Active' ? 'Suspend Tenant' : 'Reactivate Tenant',
        message: `Are you sure you want to ${tenant.status === 'Active' ? 'suspend' : 'reactivate'} ${tenant.name}? This will affect all their sub-users.`
      });
      setShowConfirmModal(true);
      return;
    } 
    
    if (type === 'delete' && !fromConfirmation) {
      setConfirmAction({
        type: 'delete',
        title: 'Archive Tenant',
        message: `You are about to archive ${tenant.name}. This action will hide the tenant from the active list but preserve their data.`
      });
      setShowConfirmModal(true);
      return;
    }

    // Actual Logic Execution
    if (type === 'delete') {
      setTenants(prev => prev.filter(t => t.id !== tenant.id));
    } else if (type === 'suspend') {
      setTenants(prev => prev.map(t => 
        t.id === tenant.id 
        ? { ...t, status: t.status === 'Active' ? 'Inactive' : 'Active' } 
        : t
      ));
    }

    const id = Date.now();
    const newNotif = { id, type, tenantName: tenant.name };
    setNotifications(prev => [...prev, newNotif]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  // Filtering Logic
  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = 
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.domain.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'All' || tenant.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Export to CSV Function
  const handleExportCSV = () => {
    const headers = ['ID', 'Company Name', 'Owner', 'Domain', 'Plan', 'Status', 'Fleet Size', 'Joined Date'];
    const csvRows = [
      headers.join(','),
      ...filteredTenants.map(tenant => [
        tenant.id,
        `"${tenant.name}"`,
        `"${tenant.owner}"`,
        tenant.domain,
        tenant.plan,
        tenant.status,
        tenant.drivers,
        tenant.joined
      ].join(','))
    ];
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `tenants_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Download PDF Function (Generates a minimal valid PDF)
  const handleDownloadPDF = (tenant) => {
    // Minimal valid PDF base64 string
    const base64PDF = 'JVBERi0xLjEKJcKlwrHDqwoxIDAgb2JqCjw8IC9UeXBlIC9DYXRhbG9nCi9QYWdlcyAyIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PCAvVHlwZSAvUGFnZXMKL0tpZHMgWzMgMCBSXQovQ291bnQgMQo+PgplbmRvYmoKMyAwIG9iago8PCAvVHlwZSAvUGFnZQovUGFyZW50IDIgMCBSCi9SZXNvdXJjZXMgPDwKL0ZvbnQgPDwgL0YxIDQgMCBSID4+Cj4+Ci9NZWRpYUJveCBbMCAwIDU5NSA4NDJdCi9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKNCAwIG9iago8PCAvVHlwZSAvRm9udAovU3VidHlwZSAvVHlwZTEKL0Jhc2VGb250IC9IZWx2ZXRpY2EKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKPj4KZW5kb2JqCjUgMCBvYmoKPDwgL0xlbmd0aCA0NiA+PgpzdHJlYW0KQlQKMTggVGwKL0YxIDE4IFRmCjUwIDc1MCBUZAooQW5hbHl0aWNzIFJlcG9ydCBEb3dubG9hZGVkKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxOCAwMDAwMCBuIAowMDAwMDAwMDc3IDAwMDAwIG4gCjAwMDAwMDAxMzQgMDAwMDAgbiAKMDAwMDAwMDI0NyAwMDAwMCBuIAowMDAwMDAwMzU1IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDUyCiUlRU9GCg==';
    
    // Convert base64 to Blob
    const byteCharacters = atob(base64PDF);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: 'application/pdf'});
    
    // Trigger Download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tenant.name.replace(/\s+/g, '_')}_Insights_Report.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show notification
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type: 'download', tenantName: tenant.name }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Tenant Management</h2>
          <p className="text-sm md:text-base text-slate-500 font-medium font-['Inter']">Manage and monitor all courier companies on your platform.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 sm:py-2.5"
        >
          <Plus className="w-5 h-5" />
          Onboard New Tenant
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-soft flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between font-['Inter']">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search tenants by name, owner or domain..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 sm:gap-3 relative">
          <div className="relative">
            <button 
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`flex-1 sm:flex-none justify-center px-4 py-2.5 bg-white border rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                filterStatus !== 'All' ? 'border-primary-600 text-primary-600 bg-primary-50' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Filter className="w-4 h-4" /> {filterStatus === 'All' ? 'Filters' : filterStatus}
            </button>
            
            <AnimatePresence>
              {showFilterMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowFilterMenu(false)}></div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-20 py-2"
                  >
                    {['All', 'Active', 'Pending', 'Inactive'].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setFilterStatus(status);
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors ${
                          filterStatus === status ? 'text-primary-600 bg-primary-50/50' : 'text-slate-600'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          
          <button 
            onClick={handleExportCSV}
            className="flex-1 sm:flex-none justify-center px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-['Inter']">
            <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-widest font-black border-b border-slate-100">
              <tr>
                <th className="px-4 md:px-6 py-5">Company Information</th>
                <th className="px-4 md:px-6 py-5 hidden sm:table-cell">Subscription</th>
                <th className="px-4 md:px-6 py-5">Status</th>
                <th className="px-4 md:px-6 py-5 hidden lg:table-cell">Fleet Size</th>
                <th className="px-4 md:px-6 py-5 hidden xl:table-cell">Onboarded</th>
                <th className="px-4 md:px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center font-bold text-primary-600 text-lg shadow-sm border border-primary-100/50">
                        {tenant.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 leading-none">{tenant.name}</p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <Globe className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-400 font-medium">{tenant.domain}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <User className="w-3 h-3 text-slate-400" />
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{tenant.owner}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-5 hidden sm:table-cell">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${
                      tenant.plan === 'Enterprise' ? 'bg-indigo-50 text-indigo-600' : 
                      tenant.plan === 'Professional' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {tenant.plan}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        tenant.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 
                        tenant.status === 'Pending' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]' : 'bg-slate-300'
                      }`}></div>
                      <span className="text-xs md:text-sm text-slate-700 font-bold">{tenant.status}</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-5 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                        <span className="text-sm font-black text-slate-700">{tenant.drivers}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Drivers</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-5 text-xs md:text-sm font-bold text-slate-500 hidden xl:table-cell">{tenant.joined}</td>
                   <td className="px-6 py-5 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <div className="flex gap-1">
                        <button 
                          onClick={() => triggerAction('analytics', tenant)}
                          className="p-2 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="View Analytics"
                        >
                          <BarChart3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => triggerAction('edit', tenant)}
                          className="p-2 bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                          title="Edit Tenant"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => triggerAction('suspend', tenant)}
                          className={`p-2 bg-slate-50 rounded-lg transition-all ${
                            tenant.status === 'Active' 
                            ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50' 
                            : 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                          }`}
                          title={tenant.status === 'Active' ? 'Suspend Tenant' : 'Activate Tenant'}
                        >
                          <Power className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => triggerAction('delete', tenant)}
                          className="p-2 bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Archive Tenant"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </motion.div>

      {/* Add Modal Placeholder */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 w-full max-w-lg relative z-10 shadow-2xl"
            >
              <h3 className="text-2xl font-black text-slate-900 mb-2">Onboard New Tenant</h3>
              <p className="text-slate-500 mb-6 font-medium">Please fill in the company details to create a new tenant.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Company Name</label>
                  <input type="text" className="input-field" placeholder="e.g. Swift Delivery Co." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Subdomain</label>
                  <div className="flex">
                    <input type="text" className="input-field rounded-r-none" placeholder="swift" />
                    <span className="bg-slate-50 border border-l-0 border-slate-200 rounded-r-lg px-3 flex items-center text-slate-400 text-sm font-bold">.deliverypro.com</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Plan</label>
                    <select className="input-field">
                      <option>Starter</option>
                      <option>Professional</option>
                      <option>Enterprise</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Admin Email</label>
                    <input type="email" className="input-field" placeholder="admin@swift.com" />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">Cancel</button>
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all">Create Tenant</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Tenant Modal */}
      <AnimatePresence>
        {showEditModal && selectedTenant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 w-full max-w-lg relative z-10 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 leading-tight">Edit {selectedTenant.name}</h3>
                  <p className="text-slate-500 font-medium text-sm mt-1">Update subscription and organization parameters.</p>
                </div>
                <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Company Primary Name</label>
                    <input type="text" defaultValue={selectedTenant.name} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-primary-500/10" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Active Plan</label>
                    <select defaultValue={selectedTenant.plan} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none appearance-none cursor-pointer">
                      <option>Starter</option>
                      <option>Professional</option>
                      <option>Enterprise</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Owner Seat</label>
                    <input type="text" defaultValue={selectedTenant.owner} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                <button onClick={() => setShowEditModal(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-all">Discard</button>
                <button onClick={() => {
                  setShowEditModal(false);
                  triggerAction('success_notif', selectedTenant);
                }} className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary-500/30 hover:bg-primary-700 transition-all">Apply Changes</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && selectedTenant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowConfirmModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-3xl p-8 w-full max-w-sm relative z-10 shadow-2xl text-center">
              <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6 ${confirmAction.type === 'delete' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
                {confirmAction.type === 'delete' ? <Trash2 className="w-8 h-8" /> : <Power className="w-8 h-8" />}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">{confirmAction.title}</h3>
              <p className="text-slate-500 font-medium text-sm mb-8 leading-relaxed">{confirmAction.message}</p>
              <div className="flex gap-3">
                <button onClick={() => setShowConfirmModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
                <button onClick={() => {
                  setShowConfirmModal(false);
                  triggerAction(confirmAction.type, selectedTenant, true);
                }} className={`flex-[2] py-3 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg transition-all ${
                  confirmAction.type === 'delete' ? 'bg-rose-600 shadow-rose-200 hover:bg-rose-700' : 'bg-amber-600 shadow-amber-200 hover:bg-amber-700'
                }`}>Confirm Action</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Analytics Modal */}
      <AnimatePresence>
        {showAnalyticsModal && selectedTenant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAnalyticsModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              className="bg-white rounded-[2.5rem] w-full max-w-3xl relative z-10 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 bg-slate-900 text-white flex justify-between items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-1">
                    <BarChart3 className="w-4 h-4 text-primary-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-400">Company Intelligence</span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">{selectedTenant.name} <span className="text-slate-500 text-base font-medium ml-2">Insights</span></h3>
                </div>
                <button onClick={() => setShowAnalyticsModal(false)} className="relative z-10 p-3 hover:bg-white/10 rounded-2xl transition-colors text-white/50 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 bg-slate-50/50">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Monthly Revenue</p>
                       <h4 className="text-xl font-black text-slate-900 leading-none">$12,840.00</h4>
                        <div className="flex items-center gap-2 mt-2 text-emerald-600">
                           <span className="text-[10px] font-black">+14.2%</span>
                        </div>
                     </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Active Fleet</p>
                       <h4 className="text-xl font-black text-slate-900 leading-none">{selectedTenant.drivers} <span className="text-sm text-slate-400 font-medium">Units</span></h4>
                       <div className="flex items-center gap-2 mt-2 text-primary-600">
                          <span className="text-[10px] font-black">98.4%</span>
                          <span className="text-[9px] font-bold uppercase tracking-tighter opacity-60">Availability</span>
                       </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Delivery Success</p>
                       <h4 className="text-xl font-black text-slate-900 leading-none">99.2%</h4>
                       <div className="flex items-center gap-2 mt-2 text-emerald-600">
                          <span className="text-[10px] font-black">Stable</span>
                          <span className="text-[9px] font-bold uppercase tracking-tighter opacity-60">Operations</span>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                       <h5 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                          <LayoutDashboard className="w-4 h-4 text-primary-600" /> Subscription Health
                       </h5>
                       <div className="space-y-4">
                          <div>
                             <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-slate-500">Resource Usage</span>
                                <span className="text-slate-900">72%</span>
                             </div>
                             <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary-600 rounded-full" style={{ width: '72%' }}></div>
                             </div>
                          </div>
                          <div className="pt-3 border-t border-slate-50 grid grid-cols-2 gap-4">
                             <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Plan Type</p>
                                <p className="text-sm font-bold text-slate-900">{selectedTenant.plan}</p>
                             </div>
                             <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Billing Cycle</p>
                                <p className="text-sm font-bold text-slate-900">Monthly</p>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="bg-slate-900 p-5 rounded-xl text-white relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                       <h5 className="font-black mb-4 relative z-10">Quick Actions</h5>
                       <div className="grid grid-cols-2 gap-2 relative z-10">
                          <button onClick={() => handleDownloadPDF(selectedTenant)} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex flex-col items-center justify-center gap-2">
                             <Download className="w-4 h-4 opacity-80" />
                             Download PDF
                          </button>
                          <button onClick={() => {
                            setShowAnalyticsModal(false);
                            triggerAction('billing_portal', selectedTenant);
                          }} className="p-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex flex-col items-center justify-center gap-2">
                             <CreditCard className="w-4 h-4 text-primary-600" />
                             Billing Portal
                          </button>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-5 bg-white border-t border-slate-100 flex justify-end">
                <button onClick={() => setShowAnalyticsModal(false)} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">Close Dashboard</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notifications Portal */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[320px] border border-slate-800"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest">System Alert</p>
                <p className="text-sm font-bold text-slate-200">
                  {notif.type === 'impersonate' && `Logging into ${notif.tenantName}...`}
                  {notif.type === 'analytics' && `Fetching analytics for ${notif.tenantName}`}
                  {notif.type === 'edit' && `Opening editor for ${notif.tenantName}`}
                  {notif.type === 'suspend' && `Status toggled for ${notif.tenantName}`}
                  {notif.type === 'delete' && `${notif.tenantName} has been archived.`}
                  {notif.type === 'download' && `Report downloaded for ${notif.tenantName}.`}
                  {notif.type === 'billing_portal' && `Redirecting to billing portal...`}
                </p>
              </div>
              <button 
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default TenantManagement;
