"use client"
import Lottie from 'lottie-react';
import { ArrowDownRight, ArrowUpRight, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

// This is a high-quality stock market growth animation URL
const LOADING_LOTTIE_URL = "https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json";

const NiftyOnlyTracker = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true); // Start as true for initial load
  const [isRefreshing, setIsRefreshing] = useState(false); // For the small button spin
  const [error, setError] = useState(null);
  const [animationData, setAnimationData] = useState(null);

  // Fetch the Lottie JSON (standard practice to avoid bundle bloat)
  useEffect(() => {
    fetch("https://lottie.host/80172e90-95d6-417d-8153-625d2b7f032e/7vIe8lF9oG.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  useEffect(() => {
    fetchNiftyData();
    const interval = setInterval(() => fetchNiftyData(), 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNiftyData = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch('/api/stocks');
      if (!response.ok) throw new Error('Failed to fetch');
      const json = await response.json();
      setStockData(json.NIFTY.data || []);
      setError(null);
    } catch (err) {
      if (stockData.length === 0) setError('Live NIFTY data unavailable.');
    } finally {
      setIsRefreshing(false);
      setLoading(false); // Disable full-screen loader after first fetch
    }
  };

  const formatVolume = (volume) => {
    if (!volume) return 'N/A';
    if (volume >= 10000000) return `${(volume / 10000000).toFixed(2)} Cr`;
    if (volume >= 100000) return `${(volume / 100000).toFixed(2)} L`;
    return volume.toLocaleString();
  };

  // --- FULL SCREEN LOADING STATE ---
  if (loading && animationData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-64 h-64">
          <Lottie animationData={animationData} loop={true} />
        </div>
        <p className="text-gray-500 font-medium animate-pulse mt-4">
          Analyzing Market Data...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 transition-opacity duration-500">
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden border-gray-200">
          <div className="p-6 border-b flex justify-between items-center bg-white">
            <div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">NIFTY 50 Constituents</h3>
                <p className="text-sm text-gray-500">Real-time market updates</p>
            </div>
            <button 
              onClick={fetchNiftyData}
              className="group p-2.5 hover:bg-blue-50 rounded-xl border border-gray-200 transition-all shadow-sm bg-white active:scale-90"
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-5 h-5 text-blue-600 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            </button>
          </div>

          {error && <div className="p-4 bg-red-50 text-red-700 border-b font-medium">{error}</div>}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs uppercase text-gray-400 font-bold border-b bg-gray-50/50">
                  <th className="px-6 py-5">Symbol</th>
                  <th className="px-6 py-5 text-right">LTP (₹)</th>
                  <th className="px-6 py-5 text-right">Change %</th>
                  <th className="px-6 py-5 text-right hidden md:table-cell">Volume</th>
                  <th className="px-6 py-5 hidden lg:table-cell">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stockData.map((stock) => {
                  const isPositive = stock.perChange >= 0;
                  return (
                    <tr key={stock.symbol} className="hover:bg-blue-50/40 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{stock.symbol}</div>
                        <div className="text-[10px] text-gray-400 font-semibold tracking-wider">{stock.series}</div>
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-gray-600 font-bold">
                        {stock.ltp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className={`px-6 py-4 text-right font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                        <div className="flex items-center justify-end gap-1">
                          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                          {Math.abs(stock.perChange)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-500 hidden md:table-cell text-sm font-medium">
                        {formatVolume(stock.trade_quantity)}
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        {stock.ca_purpose !== "-" ? (
                          <span className="inline-flex items-center bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-[10px] font-bold ring-1 ring-inset ring-indigo-700/10">
                            {stock.ca_purpose.split('-')[0]}
                          </span>
                        ) : (
                          <span className="text-gray-200">——</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {!loading && stockData.length === 0 && (
            <div className="p-20 text-center">
                <div className="text-gray-400 font-medium italic">No market data available right now.</div>
            </div>
          )}
        </div>
    </div>
  );
};

export default NiftyOnlyTracker;