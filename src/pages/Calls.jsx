import { useState } from 'react';
import { Search, Plus, Phone, Clock, User, Filter, X } from 'lucide-react';
import { calls, contacts } from '../data/mockData';

export function Calls() {
  const [showModal, setShowModal] = useState(false);
  const [filterOutcome, setFilterOutcome] = useState('all');

  const filteredCalls = calls.filter(call =>
    filterOutcome === 'all' || call.outcome === filterOutcome
  );

  const getOutcomeColor = (outcome) => {
    switch (outcome) {
      case 'connected': return 'bg-[#00A78E]';
      case 'missed': return 'bg-[#E52E33]';
      case 'voicemail': return 'bg-[#F5A623]';
      default: return 'bg-[#9E9E9E]';
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">Calls</h1>
          <p className="text-sm text-[#757575]">{calls.length} calls logged</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C] transition-colors text-sm font-medium"
        >
          <Plus size={18} />
          Log Call
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0A0]" size={18} />
          <input
            type="text"
            placeholder="Search calls..."
            className="w-full pl-10 pr-4 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]"
          />
        </div>
        <select
          value={filterOutcome}
          onChange={(e) => setFilterOutcome(e.target.value)}
          className="px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm bg-white"
        >
          <option value="all">All Outcomes</option>
          <option value="connected">Connected</option>
          <option value="missed">Missed</option>
          <option value="voicemail">Voicemail</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
          <p className="text-sm text-[#757575]">Connected</p>
          <p className="text-2xl font-bold text-[#00A78E]">{calls.filter(c => c.outcome === 'connected').length}</p>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
          <p className="text-sm text-[#757575]">Missed</p>
          <p className="text-2xl font-bold text-[#E52E33]">{calls.filter(c => c.outcome === 'missed').length}</p>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
          <p className="text-sm text-[#757575]">Avg Duration</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">
            {formatDuration(Math.round(calls.reduce((sum, c) => sum + c.duration, 0) / calls.length))}
          </p>
        </div>
      </div>

      {/* Calls List */}
      <div className="bg-white rounded-lg border border-[#E5E5E5] overflow-hidden">
        {filteredCalls.map((call, idx) => {
          const contact = contacts.find(c => c.id === call.contactId);
          return (
            <div key={call.id} className={`flex items-center gap-4 p-4 ${idx !== filteredCalls.length - 1 ? 'border-b border-[#E5E5E5]' : ''} hover:bg-[#F5F5F5] transition-colors`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getOutcomeColor(call.outcome)} text-white`}>
                <Phone size={18} />
              </div>
              <div className="flex-1">
                <p className="font-medium">{call.subject}</p>
                <p className="text-sm text-[#757575]">
                  {contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown Contact'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium capitalize">{call.outcome}</p>
                <p className="text-xs text-[#757575]">{call.date}</p>
              </div>
              <div className="flex items-center gap-1 text-sm text-[#757575]">
                <Clock size={14} />
                {formatDuration(call.duration)}
              </div>
              <div className="text-xs text-[#A0A0A0]">
                {call.owner}
              </div>
            </div>
          );
        })}
      </div>

      {/* Log Call Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-6 border-b border-[#E5E5E5]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Log Call</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-[#F5F5F5] rounded-lg">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">Contact *</label>
                <select className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]">
                  <option value="">Select contact...</option>
                  {contacts.map(c => (
                    <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">Subject *</label>
                <input type="text" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" placeholder="Call subject..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#757575] mb-1">Duration (seconds)</label>
                  <input type="number" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" placeholder="300" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#757575] mb-1">Outcome</label>
                  <select className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]">
                    <option>Connected</option>
                    <option>Missed</option>
                    <option>Voicemail</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">Notes</label>
                <textarea className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59] h-24 resize-none" placeholder="Call notes..." />
              </div>
            </div>
            <div className="p-4 border-t border-[#E5E5E5] flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm border border-[#E5E5E5] rounded-lg hover:bg-[#F5F5F5]">
                Cancel
              </button>
              <button className="px-4 py-2 text-sm bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C]">
                Log Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
