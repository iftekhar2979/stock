"use client"
import { ArrowRight, BarChart3, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. AUTO-REDIRECT LOGIC
  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role === "ADMIN") {
        router.replace("/admin/create-user");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [status, session, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else {
        // Redirect logic after successful login
        const response = await fetch('/api/auth/session');
        const updatedSession = await response.json();
        
        if (updatedSession?.user?.role === "ADMIN") {
          router.push("/admin/create-user");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  // 2. PREVENT FLASHING: Show loading screen while checking session
  if (status === "loading" || status === "authenticated") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">Checking session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center px-8 py-12 md:px-16 lg:px-24">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-500">Access your NiftyView portfolio dashboard.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  required
                  className="block w-full pl-10 pr-3 py-3 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition"
                  placeholder="admin@niftyview.com"
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  required
                  className="block w-full pl-10 pr-10 py-3 text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition"
                  placeholder="••••••••"
                  onChange={handleChange}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </button>
          </form>
        </div>
      </div>
      
      {/* Right side branding remains the same... */}
      <div className="hidden md:flex flex-1 bg-blue-600 items-center justify-center p-12">
          <div className="text-center text-white">
              <BarChart3 className="w-16 h-16 mx-auto mb-6 text-blue-200" />
              <h2 className="text-3xl font-bold mb-4">Market Analytics Simplified</h2>
              <p className="text-blue-100">Real-time tracking for NIFTY 50 and BANK NIFTY.</p>
          </div>
      </div>
    </div>
  );
};

export default LoginPage;