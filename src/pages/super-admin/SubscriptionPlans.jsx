import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Edit2, Plus, Zap, Shield, Rocket } from 'lucide-react';

const PlanCard = ({ plan }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className={`bg-white p-8 rounded-[2.5rem] border-2 transition-all relative overflow-hidden flex flex-col ${
      plan.popular ? 'border-primary-500 shadow-xl shadow-primary-100/50' : 'border-slate-100 hover:border-primary-200'
    }`}
  >
    {plan.popular && (
      <div className="absolute top-6 right-6 bg-primary-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-primary-200">
        Best Seller
      </div>
    )}

    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${plan.color}`}>
      <plan.icon className="w-8 h-8" />
    </div>

    <div className="mb-8">
      <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{plan.name}</h3>
      <p className="text-slate-500 text-sm font-medium mt-1">{plan.description}</p>
    </div>

    <div className="mb-8 flex items-baseline gap-1">
      <span className="text-4xl font-black text-slate-900">${plan.price}</span>
      <span className="text-slate-400 font-bold text-sm uppercase">/ Month</span>
    </div>

    <ul className="space-y-4 mb-10 flex-1">
      {plan.features.map((feature, i) => (
        <li key={i} className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-emerald-600 stroke-[3px]" />
          </div>
          <span className="text-sm font-bold text-slate-600">{feature}</span>
        </li>
      ))}
    </ul>

    <div className="space-y-3">
      <button className={`w-full py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
        plan.popular ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-200' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
      }`}>
        {plan.popular ? 'Optimize Plan' : 'Edit Details'}
      </button>
    </div>
  </motion.div>
);

const SubscriptionPlans = () => {
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [plans, setPlans] = React.useState([
    {
      name: 'Starter',
      description: 'Perfect for small local delivery shops.',
      price: '99',
      icon: Zap,
      color: 'bg-amber-50 text-amber-600',
      popular: false,
      features: ['Up to 5 Drivers', '500 Orders / Month', 'Basic Real-time Tracking', 'Mobile App for Drivers', 'Standard Client Portal', 'Email Support']
    },
    {
      name: 'Professional',
      description: 'Ideal for growing courier businesses.',
      price: '299',
      icon: Rocket,
      color: 'bg-primary-50 text-primary-600',
      popular: true,
      features: ['Up to 25 Drivers', '3000 Orders / Month', 'Advanced Route Optimization', 'Branded Client Portal', 'Priority Dispatch Queue', 'Live SMS Notifications', '24/7 Priority Support']
    },
    {
      name: 'Enterprise',
      description: 'Scalable solution for major logistics.',
      price: '999',
      icon: Shield,
      color: 'bg-indigo-50 text-indigo-600',
      popular: false,
      features: ['Unlimited Drivers', 'Unlimited Orders', 'Dedicated Domain Branding', 'Custom API Integrations', 'Multi-zone Management', 'Full System Analytics', 'Dedicated Account Manager']
    }
  ]);

  return (
    <>
      {/* Create New Plan Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 w-full max-w-md relative z-10 shadow-2xl font-['Inter']"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                  <Plus className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Create New Tier</h3>
                  <p className="text-slate-500 font-medium text-xs">Define a new subscription package.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Plan Name</label>
                    <input type="text" className="w-full px-4 py-2 border border-slate-100 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" placeholder="e.g. Diamond" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Price ($/mo)</label>
                    <input type="number" className="w-full px-4 py-2 border border-slate-100 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Description</label>
                  <textarea className="w-full px-4 py-2 border border-slate-100 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 outline-none transition-all min-h-[60px] resize-none" placeholder="Briefly describe this plan..."></textarea>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Core Features (one per line)</label>
                  <textarea className="w-full px-4 py-2 border border-slate-100 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 outline-none transition-all min-h-[100px] resize-none" placeholder="Unlimited Drivers&#10;Custom Domain&#10;24/7 Support"></textarea>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 bg-slate-50 text-slate-600 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 bg-primary-600 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all"
                >
                  Publish Plan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-10 focus:outline-none"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Subscription Tiers</h2>
            <p className="text-slate-500 font-medium font-['Inter']">Manage SaaS pricing, limits and feature availability.</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Plan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-['Inter']">
          {plans.map((plan, i) => (
            <PlanCard key={i} plan={plan} />
          ))}
        </div>
        
        {/* Stats Mini Section */}
        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-2">Revenue Statistics</h3>
            <p className="text-slate-400 font-medium max-w-md">The Professional plan currently generates 68% of your total platform MRR.</p>
          </div>
          <div className="flex gap-6 relative z-10">
            <div className="text-center px-6 border-r border-slate-800">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total MRR</p>
              <p className="text-3xl font-black">$45,280</p>
            </div>
            <div className="text-center px-6 border-r border-slate-800">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Churn Rate</p>
              <p className="text-3xl font-black text-rose-500">2.4%</p>
            </div>
            <div className="text-center px-6">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Growth</p>
              <p className="text-3xl font-black text-emerald-500">+12%</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SubscriptionPlans;
