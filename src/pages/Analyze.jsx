import React, { useState } from 'react';
import { MessageSquare, Link as LinkIcon, Sparkles, RotateCcw, Loader2, ArrowRight } from 'lucide-react';
import { analyzeMessage, analyzeUrl } from '../utils/scamDetector';
import { saveAnalysis } from '../utils/storage';
import RiskResult from '../components/RiskResult';

export default function Analyze() {
  const [activeTab, setActiveTab] = useState('message'); // 'message' | 'url'
  
  // Message tab state
  const [messageInput, setMessageInput] = useState('');
  
  // URL tab state
  const [urlInput, setUrlInput] = useState('');
  
  // Active analysis results & state
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [analyzedInput, setAnalyzedInput] = useState('');

  // Sample demo presets
  const messagePresets = [
    {
      label: 'Bank Scam',
      text: 'URGENT! Your bank account will be blocked today. Verify your account immediately by clicking http://secure-bank-login.com and share your OTP.'
    },
    {
      label: 'Prize Lottery',
      text: 'Congratulations! You have won ₹50,000. Click this link immediately to claim your prize.'
    },
    {
      label: 'Safe Appointment',
      text: 'Your appointment is confirmed for tomorrow at 10 AM. Reply CANCEL to reschedule.'
    }
  ];

  const urlPresets = [
    {
      label: 'Deceptive Login',
      url: 'http://secure-account-verification-login.com/verify'
    },
    {
      label: 'URL Shortener',
      url: 'http://bit.ly/claim-your-bonus-now'
    },
    {
      label: 'Safe Domain',
      url: 'https://www.wikipedia.org'
    }
  ];

  const handleAnalyze = (e) => {
    if (e) e.preventDefault();

    const textToAnalyze = activeTab === 'message' ? messageInput : urlInput;
    if (!textToAnalyze || textToAnalyze.trim() === '') return;

    setLoading(true);
    setResult(null);

    // Simulate realistic 400ms loading delay for polished UX
    setTimeout(() => {
      let res = null;
      if (activeTab === 'message') {
        res = analyzeMessage(messageInput);
      } else {
        res = analyzeUrl(urlInput);
      }

      setResult(res);
      setAnalyzedInput(textToAnalyze);

      // Save to localStorage history
      saveAnalysis({
        type: activeTab,
        input: textToAnalyze,
        score: res.score,
        level: res.level,
        indicators: res.indicators,
        explanation: res.explanation,
        recommendation: res.recommendation
      });

      setLoading(false);
    }, 450);
  };

  const handleClear = () => {
    if (activeTab === 'message') {
      setMessageInput('');
    } else {
      setUrlInput('');
    }
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Analyze Suspicious Content
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
          Select standard text or web URL mode below to scan for risk indicators using client-side heuristic security analysis.
        </p>
      </div>

      {/* Main Analyzer Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/80">
          <button
            type="button"
            onClick={() => {
              setActiveTab('message');
              setResult(null);
            }}
            className={`flex-1 py-4 px-6 text-sm font-bold flex items-center justify-center space-x-2 transition-all border-b-2 ${
              activeTab === 'message'
                ? 'border-blue-600 text-blue-600 bg-white shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Message / Email</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('url');
              setResult(null);
            }}
            className={`flex-1 py-4 px-6 text-sm font-bold flex items-center justify-center space-x-2 transition-all border-b-2 ${
              activeTab === 'url'
                ? 'border-blue-600 text-blue-600 bg-white shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>URL Analysis</span>
          </button>
        </div>

        {/* Tab Form Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <form onSubmit={handleAnalyze} className="space-y-6">
            
            {activeTab === 'message' ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label htmlFor="message-text" className="block text-sm font-bold text-slate-900">
                    Suspicious Message or Email Content
                  </label>
                  <span className="text-xs text-slate-400 font-mono">
                    {messageInput.length} chars
                  </span>
                </div>

                <textarea
                  id="message-text"
                  rows={5}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Paste a suspicious SMS, WhatsApp message, or email here..."
                  className="w-full p-4 text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-sm transition-all resize-y"
                  required
                />

                {/* Preset Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-semibold text-slate-400 flex items-center mr-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500 mr-1" />
                    Try Preset Example:
                  </span>
                  {messagePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setMessageInput(preset.text);
                        setResult(null);
                      }}
                      className="text-xs font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <label htmlFor="url-input" className="block text-sm font-bold text-slate-900">
                  Suspicious Website Link / URL
                </label>

                <div className="relative">
                  <input
                    id="url-input"
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Enter suspicious URL (e.g. http://example-login-security.com)..."
                    className="w-full p-4 pl-11 text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-sm transition-all"
                    required
                  />
                  <LinkIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-semibold text-slate-400 flex items-center mr-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500 mr-1" />
                    Try Preset Example:
                  </span>
                  {urlPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setUrlInput(preset.url);
                        setResult(null);
                      }}
                      className="text-xs font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={handleClear}
                disabled={!(activeTab === 'message' ? messageInput : urlInput)}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-1.5" />
                Clear
              </button>

              <button
                type="submit"
                disabled={loading || !(activeTab === 'message' ? messageInput.trim() : urlInput.trim())}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50 shadow-md shadow-blue-600/20 transition-all transform active:scale-95"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>{activeTab === 'message' ? 'Analyze Message' : 'Analyze URL'}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>

          </form>

        </div>
      </div>

      {/* Render Analysis Result Card when ready */}
      {result && (
        <div className="pt-4">
          <RiskResult
            result={result}
            inputContent={analyzedInput}
            type={activeTab}
          />
        </div>
      )}

    </div>
  );
}
