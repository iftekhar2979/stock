"use client"
import { Activity, LayoutDashboard, LogOut, UserPlus, Users } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'User Management', icon: <Users size={20} />, path: '/admin/users' },
    { name: 'Create User', icon: <UserPlus size={20} />, path: '/admin/create-user' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <Activity className="text-white" size={24} />
        </div>
        <span className="text-xl font-bold text-slate-900">AdminPanel</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer mb-2 ${
              pathname === item.path ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'
            }`}>
              {item.icon}
              <span className="font-semibold">{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
}