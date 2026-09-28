import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { History as HistoryIcon, Trash2, Eye, MessageSquare, Link as LinkIcon, AlertTriangle, ShieldCheck, ShieldAlert, ArrowRight, X } from 'lucide-react';
import { getHistory, deleteHistoryItem, clearHistory } from '../utils/storage';
import RiskResult from '../components/RiskResult';

export default function History() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'message' | 'url'
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setItems(getHistory());
  }, []);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    const updated = deleteHistoryItem(id);
    setItems(updated);
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem(null);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all analysis history?')) {
      const updated = clearHistory();
      setItems(updated);
      setSelectedItem(null);
    }
  };

  const filteredItems = items.filter((item) => {
    if (filter === 'message') return item.type === 'message';
    if (filter === 'url') return item.type === 'url';
    return true;
  });

  const getRiskBadge = (level) => {
    switch (level) {
      case 'HIGH':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center">
            <HistoryIcon className="w-8 h-8 text-blue-600 mr-3" />
            Analysis History
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Local record of your previous message and URL scam risk scans stored in browser localStorage.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={handleClearAll}
            className="inline-flex items-center px-3.5 py-2 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors self-start sm:self-center"
          >
            <Trash2 className="w-4 h-4 mr-1.5" />
            Clear History
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      {items.length > 0 && (
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
          <span className="text-xs font-semibold text-slate-400 mr-2">Filter:</span>
          {['all', 'message', 'url'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                filter === f
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f === 'all' ? 'All Records' : f === 'message' ? 'Messages' : 'URLs'}
            </button>
          ))}
        </div>
      )}

      {/* Main List or Empty State */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <HistoryIcon className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No analysis history yet</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            {items.length === 0
              ? 'Perform your first scam scan to view safety records and warning logs here.'
              : 'No history records match the selected filter.'}
          </p>
          <div className="pt-2">
            <Link
              to="/analyze"
              className="inline-flex items-center px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-600/20"
            >
              <span>Analyze Now</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                <div className={`p-2.5 rounded-xl text-slate-700 bg-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-0.5`}>
                  {item.type === 'url' ? <LinkIcon className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      {item.type === 'url' ? 'URL Link' : 'Message'}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-400">{item.date}</span>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 truncate">
                    "{item.input}"
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {item.indicators?.length || 0} warning sign(s) detected
                  </p>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center space-x-3 self-end sm:self-center flex-shrink-0">
                
                {/* Risk Score */}
                <div className="text-right">
                  <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-md border ${getRiskBadge(item.level)}`}>
                    {item.level} ({item.score}/100)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(item);
                  }}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={(e) => handleDelete(item.id, e)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Item Detail Modal View */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 sticky top-0 z-10">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                Saved Analysis Detail
              </h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Submitted Input Content
                </span>
                <p className="text-sm text-slate-800 font-mono break-all whitespace-pre-wrap">
                  {selectedItem.input}
                </p>
              </div>

              <RiskResult
                result={{
                  score: selectedItem.score,
                  level: selectedItem.level,
                  indicators: selectedItem.indicators || [],
                  explanation: selectedItem.explanation,
                  recommendation: selectedItem.recommendation
                }}
                inputContent={selectedItem.input}
                type={selectedItem.type}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
