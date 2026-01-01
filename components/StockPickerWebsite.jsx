"use client"
import { BarChart3, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Hero from './Hero';
const StockPickerWebsite = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('gainers');
  const [searchQuery, setSearchQuery] = useState('');
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const marketIndices = [
    { name: 'NIFTY 50', value: '21,456.65', change: '+245.30', percent: '+1.15%', trend: 'up' },
    { name: 'SENSEX', value: '71,234.50', change: '+812.45', percent: '+1.15%', trend: 'up' },
    { name: 'BANK NIFTY', value: '45,678.90', change: '-123.45', percent: '-0.27%', trend: 'down' },
  ];



  const formatVolume = (volume) => {
    if (!volume) return 'N/A';
    const vol = parseInt(volume);
    if (vol >= 10000000) return `${(vol / 10000000).toFixed(1)}Cr`;
    if (vol >= 100000) return `${(vol / 100000).toFixed(1)}L`;
    if (vol >= 1000) return `${(vol / 1000).toFixed(1)}K`;
    return vol.toString();
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StockPicker
              </span>
            </div>
            
            

            <div className="flex items-center space-x-4">
              <Link href="login" className="hidden md:block px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"> 
                Login
              </Link>
              <button className="hidden md:block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition">
                Get Started
              </button>
              <button 
                className="md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          
        </div>
      </header>

     <Hero/>

      {/* Market Indices */}
  

      {/* Stock Categories */}
   

      {/* Tabs Section */}
      {/* <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          
          {
            !loading && <NiftyOnlyTracker/>
          }
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Investing?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of smart investors making data-driven decisions</p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-xl transition text-lg">
            Create Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold text-white">StockPicker</span>
              </div>
              <p className="text-sm">Your trusted partner for smart stock market investments</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Research</a></li>
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2026 StockPicker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StockPickerWebsite;