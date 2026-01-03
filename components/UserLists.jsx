import { ChevronLeft, ChevronRight, Loader2, Trash2, UserX } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllUsers } from "../app/api/actions/adminAction";

export function UserLists() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, total: 1 });
  const LIMIT = 10;

  const loadUsers = async (page = 1) => {
    try {
      setLoading(true);
      const res = await getAllUsers(page, LIMIT);
      setUsers(res.users);
      setPagination({ current: res.currentPage, total: res.totalPages });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
        <h3 className="text-lg font-bold text-slate-900">System Users</h3>
        <button onClick={() => loadUsers(pagination.current)} className="text-xs text-indigo-600 font-bold hover:underline">
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan="3" className="px-6 py-10 text-center"><Loader2 className="animate-spin inline" /></td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 truncate max-w-[200px]">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${user.role === 'ADMIN' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-600'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-1">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600"><UserX size={18} /></button>
                    <button className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- PAGINATION FOOTER --- */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <p className="text-sm text-slate-500 font-medium">
          Page <span className="text-slate-900 font-bold">{pagination.current}</span> of <span className="text-slate-900 font-bold">{pagination.total}</span>
        </p>
        <div className="flex gap-2">
          <button
            disabled={pagination.current === 1 || loading}
            onClick={() => loadUsers(pagination.current - 1)}
            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 transition-all"
          >
            <ChevronLeft size={18} className="text-slate-600" />
          </button>
          
          <button
            disabled={pagination.current === pagination.total || loading}
            onClick={() => loadUsers(pagination.current + 1)}
            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 transition-all"
          >
            <ChevronRight size={18} className="text-slate-600" />
          </button>
        </div>
      </div>
    </div>
  );
}