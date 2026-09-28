import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, ShieldAlert, CheckCircle2, Copy, Check, Info } from 'lucide-react';

export default function RiskResult({ result, inputContent, type }) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const { score, level, indicators, explanation, recommendation } = result;

  // Level configuration maps
  const levelConfig = {
    HIGH: {
      badgeBg: 'bg-red-500/10 border-red-500/30 text-red-700',
      icon: ShieldAlert,
      iconColor: 'text-red-600',
      barColor: 'bg-red-500',
      borderAccent: 'border-l-4 border-l-red-500',
      titleText: 'HIGH RISK DETECTED',
    },
    MEDIUM: {
      badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-700',
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
      barColor: 'bg-amber-500',
      borderAccent: 'border-l-4 border-l-amber-500',
      titleText: 'MODERATE RISK DETECTED',
    },
    LOW: {
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700',
      icon: ShieldCheck,
      iconColor: 'text-emerald-600',
      barColor: 'bg-emerald-500',
      borderAccent: 'border-l-4 border-l-emerald-500',
      titleText: 'LOW RISK DETECTED',
    },
  };

  const config = levelConfig[level] || levelConfig.LOW;
  const LevelIcon = config.icon;

  const handleCopy = () => {
    const textToCopy = `Scam Shield Analysis Result:
Type: ${type === 'url' ? 'URL Analysis' : 'Message Analysis'}
Risk Level: ${level} (${score}/100)
Detected Issues: ${indicators.map((i) => i.title).join(', ') || 'None'}
Recommendation: ${recommendation}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden ${config.borderAccent} transition-all duration-300`}>
      
      {/* Header section with Score & Badge */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl bg-white shadow-sm border border-slate-200/80 ${config.iconColor}`}>
              <LevelIcon className="w-8 h-8" />
            </div>
            <div>
              <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full border mb-1 ${config.badgeBg}`}>
                {config.titleText}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Risk Score: {score} <span className="text-sm font-normal text-slate-500">/ 100</span>
              </h3>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-sm transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 mr-1.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500 mr-1.5" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>

        {/* Risk Visual Meter */}
        <div className="mt-5">
          <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
            <span>Safe (0)</span>
            <span>Caution (50)</span>
            <span>Critical (100)</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3.5 overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-700 ${config.barColor}`}
              style={{ width: `${Math.max(5, score)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Detected Warning Signs */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center">
            <AlertTriangle className="w-4 h-4 text-amber-500 mr-1.5" />
            Detected Warning Signs ({indicators.length})
          </h4>
          
          {indicators.length === 0 ? (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-emerald-800">
                No high-risk scam keywords or suspicious structural anomalies were detected.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {indicators.map((ind, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{ind.title}</p>
                      <p className="text-xs text-slate-600 mt-0.5">{ind.detail}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200 flex-shrink-0">
                    +{ind.weight}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Explanation Card */}
        <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
          <h4 className="text-sm font-bold text-blue-900 mb-1 flex items-center">
            <Info className="w-4 h-4 text-blue-600 mr-1.5" />
            Why this may be dangerous
          </h4>
          <p className="text-sm text-blue-950 leading-relaxed">
            {explanation}
          </p>
        </div>

        {/* Safety Recommendation */}
        <div className={`p-4 rounded-xl border ${level === 'HIGH' ? 'bg-red-50 border-red-200 text-red-900' : 'bg-slate-900 text-white border-slate-800'}`}>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-1 flex items-center">
            <ShieldCheck className={`w-4 h-4 mr-1.5 ${level === 'HIGH' ? 'text-red-600' : 'text-blue-400'}`} />
            Safety Recommendation
          </h4>
          <p className="text-sm leading-relaxed opacity-95">
            {recommendation}
          </p>
        </div>

      </div>
    </div>
  );
}
