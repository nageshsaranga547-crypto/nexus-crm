import { useState } from 'react';
import { Search, Plus, Mail, Clock, User, Filter, X, Send } from 'lucide-react';
import { emails, contacts } from '../data/mockData';

export function Emails() {
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredEmails = emails.filter(email =>
    filterStatus === 'all' || email.status === filterStatus
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'replied': return 'bg-[#00A78E]';
      case 'opened': return 'bg-[#3B86F0]';
      case 'sent': return 'bg-[#9E9E9E]';
      default: return 'bg-[#9E9E9E]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">Emails</h1>
          <p className="text-sm text-[#757575]">{emails.length} emails tracked</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C] transition-colors text-sm font-medium"
        >
          <Plus size={18} />
          Compose Email
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0A0]" size={18} />
          <input
            type="text"
            placeholder="Search emails..."
            className="w-full pl-10 pr-4 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm bg-white"
        >
          <option value="all">All Status</option>
          <option value="sent">Sent</option>
          <option value="opened">Opened</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
          <p className="text-sm text-[#757575]">Sent</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">{emails.filter(e => e.status === 'sent').length}</p>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
          <p className="text-sm text-[#757575]">Opened</p>
          <p className="text-2xl font-bold text-[#3B86F0]">{emails.filter(e => e.status === 'opened').length}</p>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
          <p className="text-sm text-[#757575]">Replied</p>
          <p className="text-2xl font-bold text-[#00A78E]">{emails.filter(e => e.status === 'replied').length}</p>
        </div>
      </div>

      {/* Emails List */}
      <div className="bg-white rounded-lg border border-[#E5E5E5] overflow-hidden">
        {filteredEmails.map((email, idx) => {
          const contact = contacts.find(c => c.id === email.contactId);
          return (
            <div key={email.id} className={`flex items-center gap-4 p-4 ${idx !== filteredEmails.length - 1 ? 'border-b border-[#E5E5E5]' : ''} hover:bg-[#F5F5F5] transition-colors cursor-pointer`}>
              <div className="w-10 h-10 rounded-full bg-[#3B86F0] bg-opacity-10 flex items-center justify-center">
                <Mail size={18} className="text-[#3B86F0]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{email.subject}</p>
                <p className="text-sm text-[#757575] truncate">
                  To: {contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown Contact'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs text-white capitalize ${getStatusColor(email.status)}`}>
                  {email.status}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#757575]">{email.sentAt}</p>
                <p className="text-xs text-[#A0A0A0]">{email.owner}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compose Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl">
            <div className="p-6 border-b border-[#E5E5E5]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Compose Email</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-[#F5F5F5] rounded-lg">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">To *</label>
                <select className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]">
                  <option value="">Select contact...</option>
                  {contacts.map(c => (
                    <option key={c.id} value={c.id}>{c.firstName} {c.lastName} ({c.email})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">Subject *</label>
                <input type="text" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" placeholder="Email subject..." />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">Message</label>
                <textarea className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59] h-48 resize-none" placeholder="Write your message..." />
              </div>
            </div>
            <div className="p-4 border-t border-[#E5E5E5] flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm border border-[#E5E5E5] rounded-lg hover:bg-[#F5F5F5]">
                Cancel
              </button>
              <button className="px-4 py-2 text-sm bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C] flex items-center gap-2">
                <Send size={16} />
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
