"use client"
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  LayoutDashboard,
  Loader2,
  Lock,
  LogOut,
  Mail,
  ShieldCheck,
  UserPlus,
  Users
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState } from "react";
import { UserLists } from "../../../components/UserLists";
import { adminCreateUser } from "../../api/actions/adminAction";

// --- SUB-COMPONENT: ADMIN SIDEBAR ---
function AdminSidebar() {
  const pathname = usePathname();
  const menuItems = [
    { name: 'Market View', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'User Management', icon: <Users size={20} />, path: '/admin/create-user' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <Activity size={24} />
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">AdminPanel</span>
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
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
}


// --- MAIN PAGE COMPONENT ---
export default function AdminRegistration() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({ email: "", password: "", role: "USER" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (session?.user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-sm border border-slate-200">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You must have administrator privileges to access this portal.</p>
          <Link href="/dashboard" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await adminCreateUser(formData);
      setMessage({ type: "success", text: res.message });
      setFormData({ email: "", password: "", role: "USER" });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to create user" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <AdminSidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">User Management</h1>
              <p className="text-slate-500 font-medium">Create and manage team member access</p>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Left Side: Create User Form */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden sticky top-8">
                <div className="bg-indigo-600 p-8 text-white">
                  <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold">Register User</h2>
                  <p className="text-indigo-100 text-sm mt-1">Set up new account credentials</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  {message.text && (
                    <div className={`p-4 rounded-xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-2 ${
                      message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"
                    }`}>
                      {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                      <span className="font-medium">{message.text}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input 
                        type="email" 
                        value={formData.email}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900"
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input 
                        type="password" 
                        value={formData.password}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900"
                        onChange={(e) => setFormData({...formData, password: e.target.value})} 
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Role</label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <select 
                        value={formData.role}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 appearance-none cursor-pointer"
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                      >
                        <option value="USER">Standard User</option>
                        <option value="ADMIN">System Admin</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all transform active:scale-95 disabled:opacity-70 flex items-center justify-center"
                  >
                    {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : "Create Account"}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Side: User List */}
            <div className="xl:col-span-2">
              <UserLists />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}