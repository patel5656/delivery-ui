import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Building2,
  Navigation,
  Truck,
  UserCircle2,
  Lock,
  Mail,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const roles = [
    {
      id: 'super-admin',
      title: 'Super Admin',
      icon: <ShieldCheck className="w-5 h-5" />,
      email: 'admin@platform.com',
      password: 'password123',
      color: 'bg-primary-50 text-primary-600 border-primary-100',
      path: '/super-admin'
    },
    {
      id: 'tenant-admin',
      title: 'Tenant Admin',
      icon: <Building2 className="w-5 h-5" />,
      email: 'owner@courier.com',
      password: 'password123',
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      path: '/tenant-admin'
    },
    {
      id: 'dispatcher',
      title: 'Dispatcher',
      icon: <Navigation className="w-5 h-5" />,
      email: 'ops@courier.com',
      password: 'password123',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      path: '/dispatcher'
    },
    {
      id: 'driver',
      title: 'Driver',
      icon: <Truck className="w-5 h-5" />,
      email: 'driver@courier.com',
      password: 'password123',
      color: 'bg-sky-50 text-sky-600 border-sky-100',
      path: '/driver'
    },
    {
      id: 'client',
      title: 'Client Portal',
      icon: <UserCircle2 className="w-5 h-5" />,
      email: 'customer@business.com',
      password: 'password123',
      color: 'bg-slate-50 text-slate-600 border-slate-200',
      path: '/client'
    }
  ];

  const handleRoleSelect = (role) => {
    setFormData({
      email: role.email,
      password: role.password
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Determine which path to navigate to based on the email
    const selectedRole = roles.find(r => r.email === formData.email);

    setTimeout(() => {
      setLoading(false);
      if (selectedRole) {
        navigate(selectedRole.path);
      } else {
        // Default to super admin for demo if not found
        navigate('/super-admin');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-['Inter']">
      {/* Premium Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[50%] h-[50%] bg-primary-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[5%] w-[50%] h-[50%] bg-primary-400/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-max-w-md relative z-10"
      >
        <div className="flex justify-center mb-8">
          <img src="/truck-image.png" alt="Logo" className="h-[120px] w-auto object-contain" />
        </div>
      </motion.div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <div className="bg-white py-8 px-4 shadow-soft sm:rounded-3xl sm:px-10 border border-slate-100">
          <div className="mb-8">
            <label className="text-sm font-semibold text-slate-700 mb-4 block">Quick Demo Login</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-200 group ${formData.email === role.email
                    ? `${role.color.split(' ')[0]} border-primary-500 ring-2 ring-primary-500/10`
                    : 'bg-slate-50 border-slate-100 hover:border-slate-200 hover:bg-white'
                    }`}
                >
                  <div className={`p-2 rounded-xl mb-2 transition-transform duration-300 group-hover:scale-110 ${role.color}`}>
                    {role.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{role.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 h-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 block w-full border-slate-200 rounded-xl shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-3 transition-all duration-200"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 h-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 block w-full border-slate-200 rounded-xl shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-3 transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 disabled:opacity-70 group"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>

      <p className="mt-8 text-center text-xs text-slate-500">
        &copy; 2026 Delivery Pro SaaS Inc. All rights reserved.
      </p>
    </div>
  );
};

export default LoginPage;
