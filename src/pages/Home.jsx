import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MessageSquare, Link as LinkIcon, Brain, ShieldCheck, ArrowRight, Lock, CheckCircle, Search, AlertOctagon } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

export default function Home() {
  const features = [
    {
      icon: MessageSquare,
      title: 'Message Analysis',
      description: 'Check suspicious SMS, WhatsApp messages and emails for scam indicators.'
    },
    {
      icon: LinkIcon,
      title: 'URL Detection',
      description: 'Analyze website links and identify suspicious, fake, or unencrypted URLs.'
    },
    {
      icon: Brain,
      title: 'Smart Detection',
      description: 'Uses rule-based security analysis to detect common scam patterns instantly.'
    },
    {
      icon: ShieldCheck,
      title: 'Stay Safe',
      description: 'Get clear risk scores, detailed explanations, and safety recommendations.'
    }
  ];

  const workflowSteps = [
    { number: '01', title: 'Paste Content', desc: 'Copy and paste suspicious SMS, emails, or web links.' },
    { number: '02', title: 'Analyze', desc: 'Click analyze to trigger instant rule-based scanning.' },
    { number: '03', title: 'Understand Risk', desc: 'Review detected indicators and threat severity scores.' },
    { number: '04', title: 'Stay Safe', desc: 'Follow tailored cybersecurity precautions and recommendations.' }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-20 lg:py-28 border-b border-slate-800">
        
        {/* Background Subtle Gradient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full text-blue-400 text-xs font-semibold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>Next-Gen Scam Awareness Engine</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                SCAM <span className="text-blue-500">SHIELD</span>
              </h1>

              <p className="text-xl font-bold text-blue-300">
                Detect scams before they detect you.
              </p>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Analyze suspicious messages, emails, and URLs and understand the risk before you click or respond.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/analyze"
                  className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  <span>Analyze Now</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>

                <Link
                  to="/history"
                  className="w-full sm:w-auto px-7 py-3.5 text-base font-bold text-slate-200 bg-slate-900 border border-slate-700 rounded-xl hover:bg-slate-800 transition-all duration-200 flex items-center justify-center"
                >
                  View History
                </Link>
              </div>

            </div>

            {/* Hero Cybersecurity Visual (Pure CSS/Icons) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                
                {/* Visual Card Stack */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm relative z-10">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Live Shield Guard</h4>
                        <p className="text-xs text-slate-400">Heuristic Analysis Active</p>
                      </div>
                    </div>
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  </div>

                  {/* Simulated Analysis Pulse */}
                  <div className="mt-6 space-y-3">
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <MessageSquare className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-slate-300 font-mono">SMS Verification Request</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">PASSED</span>
                    </div>

                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <LinkIcon className="w-4 h-4 text-amber-400" />
                        <span className="text-xs text-slate-300 font-mono">http://bank-login-update.com</span>
                      </div>
                      <span className="text-[10px] font-bold text-red-400 bg-red-950 border border-red-800 px-2 py-0.5 rounded">HIGH RISK</span>
                    </div>

                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <Search className="w-4 h-4 text-slate-400" />
                        <span className="text-xs text-slate-300 font-mono">Rule Matching Engine</span>
                      </div>
                      <span className="text-[10px] font-bold text-blue-400 bg-blue-950 border border-blue-800 px-2 py-0.5 rounded">READY</span>
                    </div>
                  </div>

                  {/* Floating Shield Status Badge */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-400 mr-1.5" />
                      Client-Side Privacy Safe
                    </span>
                    <span className="font-mono text-blue-400">v1.0.0</span>
                  </div>

                </div>

                {/* Decorative Ambient Background Ring */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl opacity-20 blur-xl pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Scam Protection
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Protect yourself against modern phishing attacks, fraudulent SMS text offers, and deceptive links.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <FeatureCard
              key={idx}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-slate-800">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-900/50 px-3 py-1 rounded-full border border-blue-700/50">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-3">
              How Scam Shield Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <div key={index} className="relative bg-slate-950/60 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-3xl font-black text-blue-500/40 mb-3 block">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
