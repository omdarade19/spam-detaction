import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-1.5 bg-blue-600 rounded-lg text-white">
                <Shield className="w-4 h-4 fill-current" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                SCAM <span className="text-blue-500">SHIELD</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm">
              "Stay alert. Stay informed. Stay safe."
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center space-x-6 text-sm font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/analyze" className="hover:text-white transition-colors">Analyze</Link>
            <Link to="/history" className="hover:text-white transition-colors">History</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
          </div>

          {/* Privacy Note */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-500 bg-slate-800/80 px-3 py-1.5 rounded-full">
            <Lock className="w-3.5 h-3.5 text-blue-400" />
            <span>100% Client-Side Local Analysis</span>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© 2026 Scam Shield. Designed for educational cybersecurity awareness.</p>
        </div>
      </div>
    </footer>
  );
}
