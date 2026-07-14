import { useState } from 'react';
import { Search, Plus, FileText, DollarSign, Calendar, X } from 'lucide-react';
import { quotes, contacts, companies } from '../data/mockData';

export function Quotes() {
  const [showModal, setShowModal] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-[#00A78E]';
      case 'sent': return 'bg-[#3B86F0]';
      case 'draft': return 'bg-[#9E9E9E]';
      case 'declined': return 'bg-[#E52E33]';
      default: return 'bg-[#9E9E9E]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">Quotes</h1>
          <p className="text-sm text-[#757575]">{quotes.length} quotes total</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C] transition-colors text-sm font-medium"
        >
          <Plus size={18} />
          Create Quote
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0A0]" size={18} />
          <input
            type="text"
            placeholder="Search quotes..."
            className="w-full pl-10 pr-4 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
          <p className="text-sm text-[#757575]">Total Quotes</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">{quotes.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
          <p className="text-sm text-[#757575]">Draft</p>
          <p className="text-2xl font-bold text-[#9E9E9E]">{quotes.filter(q => q.status === 'draft').length}</p>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
          <p className="text-sm text-[#757575]">Sent</p>
          <p className="text-2xl font-bold text-[#3B86F0]">{quotes.filter(q => q.status === 'sent').length}</p>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
          <p className="text-sm text-[#757575]">Accepted</p>
          <p className="text-2xl font-bold text-[#00A78E]">{quotes.filter(q => q.status === 'accepted').length}</p>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-lg border border-[#E5E5E5] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F5F5F5]">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#757575] uppercase">Quote #</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#757575] uppercase">Contact</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#757575] uppercase">Company</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#757575] uppercase">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#757575] uppercase">Valid Until</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#757575] uppercase">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#757575] uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map(quote => {
              const contact = contacts.find(c => c.id === quote.contactId);
              const company = companies.find(c => c.id === quote.companyId);
              return (
                <tr key={quote.id} className="border-t border-[#E5E5E5] hover:bg-[#F5F5F5] transition-colors">
                  <td className="px-4 py-3 font-medium">{quote.number}</td>
                  <td className="px-4 py-3 text-sm">{contact ? `${contact.firstName} ${contact.lastName}` : '-'}</td>
                  <td className="px-4 py-3 text-sm">{company?.name || '-'}</td>
                  <td className="px-4 py-3 font-semibold">${quote.total.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-[#757575] flex items-center gap-1">
                    <Calendar size={14} />
                    {quote.validUntil}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs text-white capitalize ${getStatusColor(quote.status)}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs border border-[#E5E5E5] rounded hover:bg-[#F5F5F5]">View</button>
                      <button className="px-3 py-1 text-xs border border-[#E5E5E5] rounded hover:bg-[#F5F5F5]">PDF</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Create Quote Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-6 border-b border-[#E5E5E5]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Create Quote</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-[#F5F5F5] rounded-lg">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">Quote Number</label>
                <input type="text" value="Q-2024-006" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm bg-[#F5F5F5]" readOnly />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                  <label className="block text-xs font-medium text-[#757575] mb-1">Company</label>
                  <select className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]">
                    <option value="">Select company...</option>
                    {companies.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">Total Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#757575]">$</span>
                  <input type="number" className="w-full pl-7 pr-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" placeholder="0" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">Valid Until</label>
                <input type="date" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
              </div>
            </div>
            <div className="p-4 border-t border-[#E5E5E5] flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm border border-[#E5E5E5] rounded-lg hover:bg-[#F5F5F5]">
                Cancel
              </button>
              <button className="px-4 py-2 text-sm bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C]">
                Create Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
