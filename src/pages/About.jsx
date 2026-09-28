import React from 'react';
import { Shield, CheckCircle2, AlertTriangle, Lock, Cpu, Database, EyeOff, Sparkles } from 'lucide-react';

export default function About() {
  const featureList = [
    {
      title: 'Message Analysis',
      desc: 'Detects artificial urgency, prize claims, banking requests, threats, and suspicious call-to-actions in SMS and emails.'
    },
    {
      title: 'URL Detection',
      desc: 'Checks for insecure HTTP protocols, numerical IP hostnames, link shorteners, excessive hyphens, and high-risk TLDs.'
    },
    {
      title: 'Risk Scoring (0-100)',
      desc: 'Calculates an intuitive threat score paired with transparent LOW, MEDIUM, or HIGH risk status levels.'
    },
    {
      title: 'Scam Indicators',
      desc: 'Highlights specific warning signs so users learn why certain phrasing or web structures are dangerous.'
    },
    {
      title: 'Safety Recommendations',
      desc: 'Provides actionable step-by-step guidance on how to respond safely to suspicious communications.'
    },
    {
      title: 'Local Analysis History',
      desc: 'Stores past scans privately in your browser localStorage without sending personal data to external servers.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full text-blue-700 text-xs font-semibold">
          <Shield className="w-4 h-4 text-blue-600" />
          <span>Cybersecurity Education & Awareness</span>
        </div>

        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          About Scam Shield
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Scam Shield is a simple cybersecurity awareness tool that helps users identify common warning signs in suspicious messages and URLs.
        </p>
      </div>

      {/* Core Mission Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 space-y-6 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Sparkles className="w-6 h-6 text-blue-400 mr-2.5" />
          Our Mission
        </h2>

        <p className="text-slate-300 leading-relaxed text-base">
          Phishing and digital scams remain among the most common threats faced by Internet users daily. Scam Shield was designed to demystify scam patterns by giving users instant, client-side risk assessments before they click unknown links or respond to deceptive messages.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-center">
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <Cpu className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white">Rule Engine</h4>
            <p className="text-xs text-slate-400 mt-0.5">Transparent Heuristics</p>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <EyeOff className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white">100% Private</h4>
            <p className="text-xs text-slate-400 mt-0.5">Zero Data Tracking</p>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <Database className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white">Local Storage</h4>
            <p className="text-xs text-slate-400 mt-0.5">Saved In Browser</p>
          </div>
        </div>
      </div>

      {/* Feature Breakdown */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center">
          Key Features & Capability
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featureList.map((item, idx) => (
            <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm flex items-start space-x-3.5">
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Tips Card */}
      <div className="bg-blue-50/60 rounded-2xl p-6 sm:p-8 border border-blue-100 space-y-4">
        <h3 className="text-lg font-bold text-blue-900 flex items-center">
          <Lock className="w-5 h-5 text-blue-600 mr-2" />
          Golden Rules of Digital Safety
        </h3>
        
        <ul className="space-y-2.5 text-sm text-blue-950">
          <li className="flex items-start">
            <span className="font-bold mr-2">•</span>
            Never share One-Time Passwords (OTPs), PINs, or passwords over SMS or phone calls.
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2">•</span>
            Verify banking notices by logging into your official bank portal directly, never via text message links.
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2">•</span>
            Be skeptical of messages demanding immediate action or promising unexpected lottery prize rewards.
          </li>
        </ul>
      </div>

      {/* Important Educational Disclaimer */}
      <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 text-amber-900 space-y-2">
        <div className="flex items-center space-x-2 text-amber-800 font-bold text-sm uppercase tracking-wider">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span>Educational Disclaimer</span>
        </div>
        <p className="text-xs leading-relaxed text-amber-950">
          Scam Shield provides heuristic analysis for educational and awareness purposes. A low-risk result does not guarantee that content is safe, and a high-risk result does not prove malicious intent. Always exercise personal caution when interacting with digital communications.
        </p>
      </div>

    </div>
  );
}
