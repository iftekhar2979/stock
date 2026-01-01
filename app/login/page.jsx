"use client"
import { ArrowRight, BarChart3, Eye, EyeOff, Github, Lock, Mail } from 'lucide-react';
import { useState } from 'react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
    // Add authentication logic here
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      
      {/* Left Side: Login Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 md:px-16 lg:px-24">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-10 md:hidden">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">NiftyView</span>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-500">Please enter your details to access your portfolio.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border text-black border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  placeholder="name@company.com"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-500">Forgot?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-3 text-black border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
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

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Keep me logged in
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.01]"
            >
              Sign in
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.02 1.024-2.6 2.104-5.912 2.104-5.332 0-9.444-4.324-9.444-9.656s4.112-9.656 9.444-9.656c2.88 0 5.12 1.136 6.68 2.624l2.32-2.32c-2.12-2.04-5.2-3.6-9-3.6-6.624 0-12 5.376-12 12s5.376 12 12 12c3.584 0 6.68-1.184 9.12-3.6 2.528-2.528 3.4-6.08 3.4-8.8 0-.68-.04-1.32-.12-1.92h-12.48z" />
                </svg>
              </button>
              <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Github className="h-5 w-5 text-gray-900" />
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="font-bold text-blue-600 hover:text-blue-500">Sign up for free</a>
          </p>
        </div>
      </div>

      {/* Right Side: Branding/Marketing */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 items-center justify-center p-12 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full -ml-48 -mb-48 blur-3xl" />
        
        <div className="relative z-10 max-w-lg text-center">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <BarChart3 className="w-12 h-12 text-blue-300" />
            {/* <span className="text-4xl font-bold text-white">NiftyView</span> */}
          </div>
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Analyze the market like a professional.
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Get real-time insights into NIFTY 50 and BANK NIFTY movements. Track your dividends and portfolio growth in one place.
          </p>
          
          {/* Simple Stat Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="text-blue-300 text-sm font-medium mb-1">Users</div>
              <div className="text-white text-2xl font-bold">100k+</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="text-blue-300 text-sm font-medium mb-1">Accuracy</div>
              <div className="text-white text-2xl font-bold">99.9%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;