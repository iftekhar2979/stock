import { ArrowRight, LayoutDashboard, ShieldCheck, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#FAFBFF] py-20 lg:py-32">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] bg-purple-100/40 rounded-full blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        {/* Animated Feature Badge */}
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-2xl shadow-sm mb-10 hover:border-blue-300 transition-colors cursor-default">
          <Zap size={16} className="text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold text-gray-700">AI-Powered Insights Now Live</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-8 leading-tight">
          Smart Stock Picks for
          <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Smarter Investors
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-12 leading-relaxed">
          The only platform combining institutional sentiment analysis with real-time technical indicators to give you an unfair advantage in the markets.
        </p>

        {/* The Primary Button */}
        <div className="flex flex-col items-center gap-6">
          <Link href='dashboard' className="group relative flex items-center gap-3 bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all duration-300 shadow-2xl shadow-blue-200 active:scale-95">
            <LayoutDashboard size={22} className="group-hover:rotate-12 transition-transform" />
            Go to Dashboard
            <ArrowRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          {/* Micro-Features with Icons */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-500 mt-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-500" />
              <span>Real-time tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-blue-500" />
              <span>Institutional Grade</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;