"use client"
import {
    Activity,
    Bell,
    ChevronRight,
    LayoutDashboard,
    LogOut,
    PieChart,
    Search,
    TrendingUp,
    Wallet
} from 'lucide-react';
import { useState } from 'react';
import NiftyOnlyTracker from '../../components/NiftyOnlyTracker'; // Adjust path accordingly

export default function page() {
  const [activeTab, setActiveTab] = useState('Overview');

  const menuItems = [
    { name: 'Overview', icon: <LayoutDashboard size={20} /> },
    { name: 'Markets', icon: <TrendingUp size={20} /> },
    { name: 'Portfolio', icon: <Wallet size={20} /> },
    { name: 'Analytics', icon: <PieChart size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Activity className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
            NiftyView
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === item.name 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="font-semibold">{item.name}</span>
              </div>
              {activeTab === item.name && <ChevronRight size={16} />}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 transition-colors">
            <LogOut size={20} />
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search stocks (e.g. RELIANCE)..." 
              className="w-full bg-slate-100 border-none rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">Aryan Sharma</p>
                <p className="text-xs text-slate-500 font-medium">Pro Investor</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 border-2 border-white shadow-md"></div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto space-y-8">
            
            {/* Market Health Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Value" value="₹24,50,000" change="+12.5%" trend="up" />
              <StatCard title="Day Gain" value="₹18,200" change="+2.4%" trend="up" />
              <StatCard title="Portfolio Risk" value="Low" change="Stable" trend="neutral" />
              <StatCard title="Market Sentiment" value="Bullish" change="High" trend="up" />
            </div>

            {/* The Main Tracker Component */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-1">
                    <NiftyOnlyTracker />
                </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, change, trend }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-sm font-semibold text-slate-500 mb-2">{title}</p>
      <div className="flex items-end justify-between">
        <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
          trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'
        }`}>
          {change}
        </span>
      </div>
    </div>
  );
}