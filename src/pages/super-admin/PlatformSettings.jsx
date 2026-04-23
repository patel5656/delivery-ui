import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Shield, Bell, Database, Globe, Cpu, Save, X, Check, Loader2, Mail, Clock, Lock, CreditCard } from 'lucide-react';

const SettingGroup = ({ icon: Icon, title, description, children }) => (
  <div className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden font-['Inter']">
    <div className="p-6 border-b border-slate-50 flex items-start gap-4">
      <div className="p-3 bg-slate-50 rounded-2xl">
        <Icon className="w-6 h-6 text-slate-600" />
      </div>
      <div>
        <h3 className="font-black text-slate-800 tracking-tight">{title}</h3>
        <p className="text-slate-400 text-sm font-medium leading-none mt-1.5">{description}</p>
      </div>
    </div>
    <div className="p-6 space-y-6">
      {children}
    </div>
  </div>
);

const PlatformSettings = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleUpdate = () => {
    setIsUpdating(true);
    setProgress(0);
    setIsSuccess(false);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUpdating(false);
          setIsSuccess(true);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 300);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setIsSuccess(false);
      setProgress(0);
    }, 300);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-8 relative"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">System Configuration</h2>
          <p className="text-slate-500 font-medium font-['Inter']">Manage global SaaS platform variables and API integrations.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-200"
        >
          <Save className="w-5 h-5" />
          Update All Settings
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
        {/* Core Platform Branding */}
        <SettingGroup 
          icon={Globe} 
          title="Platform Branding" 
          description="Control how your SaaS looks to your tenants."
        >
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Software Name</label>
              <input type="text" defaultValue="DeliveryPro SaaS" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-primary-500/20" />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Primary Brand Color</label>
              <div className="flex gap-3">
                 <div className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-600"></div>
                    <span className="text-sm font-black text-slate-800">#2563EB</span>
                 </div>
                 <button className="px-4 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-tighter">Change</button>
              </div>
            </div>
          </div>
        </SettingGroup>

        {/* API & Cloud Keys */}
        <SettingGroup 
          icon={Cpu} 
          title="System Integrations" 
          description="Connect third-party cloud services for platform operations."
        >
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Google Maps API Key</label>
              <input type="password" value="AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none" disabled />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Twilio SMS SID</label>
                  <input type="text" placeholder="SKXXXXXX" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none" />
               </div>
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">AWS S3 Region</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none appearance-none">
                     <option>us-east-2 (Ohio)</option>
                     <option>eu-west-1 (Ireland)</option>
                  </select>
               </div>
            </div>
          </div>
        </SettingGroup>

        {/* Database & Backups */}
        <SettingGroup 
          icon={Database} 
          title="Backup & Data Policies" 
          description="Protect system integrity and tenant data separation."
        >
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100">
             <div>
                <p className="text-sm font-black text-slate-800">Nightly Database Snapshot</p>
                <p className="text-xs text-slate-400 font-medium">Automatic backup will run at 02:00 AM daily.</p>
             </div>
             <div className="w-12 h-6 bg-primary-600 rounded-full relative cursor-pointer shadow-inner">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
             </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100">
             <div>
                <p className="text-sm font-black text-slate-800">Auto-Purge Logs</p>
                <p className="text-xs text-slate-400 font-medium">System logs will be deleted after 90 days.</p>
             </div>
             <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer transition-colors shadow-inner">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
             </div>
          </div>
        </SettingGroup>

        {/* Global Security */}
        <SettingGroup 
          icon={Shield} 
          title="Global Security Policies" 
          description="Define platform-wide safety and authentication rules."
        >
          <div className="space-y-4">
             <div className="flex gap-4">
                <div className="flex-1 bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-rose-600 shadow-sm">
                      <Shield className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest leading-none mb-1">Advanced Defense</p>
                      <p className="text-sm font-black text-rose-700">WAF Protection Active</p>
                   </div>
                </div>
                <div className="flex-1 bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-3 opacity-50">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                      <Bell className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Security Alerts</p>
                      <p className="text-sm font-black text-slate-500">Alerts Paused</p>
                   </div>
                </div>
             </div>
             <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-bold text-slate-700">Enforce 2FA for Admins</span>
                </div>
                <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer shadow-inner">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
             </div>
             <button className="w-full py-3 bg-slate-50 text-slate-800 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-200">
                Manage IP Allowlist
             </button>
          </div>
        </SettingGroup>

        {/* Communication & SMTP */}
        <SettingGroup 
          icon={Mail} 
          title="Communication & SMTP" 
          description="Configure global email server for system notifications."
        >
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">SMTP Host</label>
              <input type="text" placeholder="smtp.sendgrid.net" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">SMTP Port</label>
                  <input type="text" placeholder="587" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none" />
               </div>
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Encryption</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none appearance-none">
                     <option>TLS</option>
                     <option>SSL</option>
                  </select>
               </div>
            </div>
          </div>
        </SettingGroup>

        {/* Operational Controls */}
        <SettingGroup 
          icon={Clock} 
          title="Operational Controls" 
          description="Manage platform-wide availability and regional defaults."
        >
          <div className="space-y-4">
             <div className="flex items-center justify-between p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                <div>
                    <p className="text-sm font-black text-rose-900">Maintenance Mode</p>
                    <p className="text-[10px] text-rose-500 font-bold uppercase tracking-tight">Offline for all tenants</p>
                </div>
                <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer shadow-inner">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Global Currency</label>
                   <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none appearance-none">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>INR (₹)</option>
                      <option>GBP (£)</option>
                   </select>
                </div>
                <div>
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">System Timezone</label>
                   <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none appearance-none">
                      <option>UTC (Default)</option>
                      <option>EST (New York)</option>
                      <option>IST (Mumbai)</option>
                   </select>
                </div>
             </div>
          </div>
        </SettingGroup>
      </div>

      {/* Update Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={!isUpdating ? closeModal : undefined}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">System Update</h3>
                  {!isUpdating && (
                    <button onClick={closeModal} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                      <X className="w-6 h-6 text-slate-400" />
                    </button>
                  )}
                </div>

                {!isUpdating && !isSuccess && (
                  <div className="space-y-6">
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">
                        You are about to push platform-wide configuration changes. This will affect all active tenants and API integrations.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={closeModal}
                        className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleUpdate}
                        className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary-200 hover:bg-primary-700 transition-all"
                      >
                        Confirm & Push
                      </button>
                    </div>
                  </div>
                )}

                {isUpdating && (
                  <div className="py-8 space-y-8 text-center">
                    <div className="relative w-24 h-24 mx-auto">
                      <Loader2 className="w-24 h-24 text-primary-600 animate-spin opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-black text-primary-600">{Math.round(progress)}%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                       <h4 className="font-black text-slate-800">Synchronizing Nodes...</h4>
                       <p className="text-xs text-slate-400 font-medium">Applying global variables to all regional clusters.</p>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                       <motion.div 
                        className="h-full bg-primary-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                       />
                    </div>
                  </div>
                )}

                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-2">Platform Updated</h4>
                    <p className="text-slate-500 font-medium mb-8">All system configurations have been successfully propagated.</p>
                    <button 
                      onClick={closeModal}
                      className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all"
                    >
                      Return to Overview
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

export default PlatformSettings;
