import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Package,
  Navigation,
  Settings,
  Bell,
  LogOut,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarItem = ({ icon, label, path, active, collapsed }) => (
  <Link
    to={path}
    className={`group flex items-center relative py-3.5 mx-1.5 px-3 rounded-xl transition-all duration-300 ${active
      ? 'bg-white/10 text-white'
      : 'text-blue-100/70 hover:bg-white/10 hover:text-white'
      }`}
  >
    <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
      {React.cloneElement(icon, {
        size: 24,
        className: active ? 'text-white' : 'text-blue-100/70 group-hover:text-white'
      })}
    </div>

    {!collapsed && (
      <span className={`ml-3 text-[15px] font-bold tracking-wide transition-colors ${active ? 'text-white' : 'text-blue-100/70 group-hover:text-white'
        }`}>
        {label}
      </span>
    )}
  </Link>
);

const BottomNavItem = ({ icon, label, path, active }) => (
  <Link
    to={path}
    className={`flex flex-col items-center justify-center flex-1 py-3 transition-all relative ${active ? 'text-primary-600' : 'text-slate-400'
      }`}
  >
    <div className={`transition-all duration-300 ${active ? '-translate-y-1 scale-110' : ''}`}>
      {React.cloneElement(icon, { size: 22 })}
    </div>
    <span className={`text-[9px] font-black uppercase tracking-widest mt-1 transition-all ${active ? 'opacity-100' : 'opacity-0 h-0'}`}>
      {label.split(' ')[0]}
    </span>
    {active && (
      <motion.div
        layoutId="activeTab"
        className="absolute -top-px left-1/4 right-1/4 h-1 bg-primary-600 rounded-b-full"
      />
    )}
  </Link>
);

const DashboardLayout = ({ children, title, menuItems, user = { name: 'Demo User', role: 'Administrator' } }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-['Inter']">
      {/* Sidebar - Desktop */}
      <aside
        className={`bg-sidebar-dark hidden md:flex flex-col transition-all duration-300 ease-in-out border-r border-white/10 ${collapsed ? 'w-20' : 'w-48'
          }`}
      >
        <div className="h-[90px] flex items-center justify-center bg-white border-b border-slate-100 overflow-hidden">
          {!collapsed ? (
            <img src="/truck-image.png" alt="Logo" className="h-[75px] w-auto object-contain" />
          ) : (
            <img src="/truck-image.png" alt="Logo" className="h-12 w-auto object-contain" />
          )}
        </div>

        <nav className="flex-1 px-2 space-y-1 mt-4 overflow-y-auto">
          {menuItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              path={item.path}
              active={
                location.pathname === item.path ||
                (item.path !== '/' &&
                  location.pathname.startsWith(item.path + '/') &&
                  !menuItems.some(m => m.path !== item.path && (location.pathname === m.path || location.pathname.startsWith(m.path + '/'))))
              }
              collapsed={collapsed}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <SidebarItem
            icon={<LogOut className="w-5 h-5" />}
            label="Logout"
            path="/"
            collapsed={collapsed}
          />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Topbar */}
        <header className="h-[90px] sticky top-0 bg-white flex items-center justify-between px-4 md:px-8 z-20 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-4">
            <div className="md:hidden w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/20 mr-1">
              <img src="/truck-logo1.jfif" alt="Logo" className="h-5 w-auto object-contain" />
            </div>
            <h1 className="text-lg font-black text-[#1a1a1a] tracking-tight truncate">{title}</h1>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 pl-2 hover:bg-slate-50 p-1 rounded-xl transition-all"
              >
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-black text-slate-800 leading-none">{user.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-1.5">{user.role}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center overflow-hidden text-white font-bold shadow-lg shadow-primary-500/20">
                  {getInitials(user.name)}
                </div>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setProfileOpen(false)}
                    ></div>
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-40"
                    >
                      <div className="px-4 py-2 border-b border-slate-50 mb-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account</p>
                      </div>
                      <button className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary-600 transition-colors">Profile Settings</button>
                      <button className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary-600 transition-colors">Notifications</button>
                      <div className="h-px bg-slate-100 my-1"></div>
                      <button
                        onClick={() => window.location.href = '/'}
                        className="w-full text-left px-4 py-2 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 pb-24 md:pb-8">
          {children}
        </div>

        {/* Bottom Navigation - Mobile Only */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 flex items-center justify-around z-50 pb-safe shadow-[0_-8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md bg-white/90">
          {menuItems.map((item, index) => (
            <BottomNavItem
              key={index}
              icon={item.icon}
              label={item.label}
              path={item.path}
              active={location.pathname === item.path}
            />
          ))}
        </nav>
      </main>
    </div>
  );
};

export default DashboardLayout;
