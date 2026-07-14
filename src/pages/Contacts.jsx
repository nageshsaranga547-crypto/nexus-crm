import { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Mail, Phone, Building2, Calendar, X } from 'lucide-react';
import { contacts, companies, activities } from '../data/mockData';

export function Contacts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = `${contact.firstName} ${contact.lastName} ${contact.email}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || contact.lifecycleStage === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const selectedCompany = selectedContact ? companies.find(c => c.id === selectedContact.companyId) : null;
  const selectedActivities = selectedContact ? activities.filter(a => a.contactId === selectedContact.id) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">Contacts</h1>
          <p className="text-sm text-[#757575]">{contacts.length} contacts total</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C] transition-colors text-sm font-medium"
        >
          <Plus size={18} />
          Add Contact
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0A0]" size={18} />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm bg-white"
        >
          <option value="all">All Stages</option>
          <option value="lead">Lead</option>
          <option value="opportunity">Opportunity</option>
          <option value="customer">Customer</option>
        </select>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-lg border border-[#E5E5E5] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F5F5F5]">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#757575] uppercase">Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#757575] uppercase">Email</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#757575] uppercase">Company</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#757575] uppercase">Title</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#757575] uppercase">Lifecycle</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#757575] uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map(contact => {
              const company = companies.find(c => c.id === contact.companyId);
              return (
                <tr
                  key={contact.id}
                  className="border-t border-[#E5E5E5] hover:bg-[#F5F5F5] cursor-pointer transition-colors"
                  onClick={() => setSelectedContact(contact)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FF7A59] flex items-center justify-center text-white text-sm font-medium">
                        {contact.firstName[0]}{contact.lastName[0]}
                      </div>
                      <span className="font-medium">{contact.firstName} {contact.lastName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#757575]">{contact.email}</td>
                  <td className="px-4 py-3 text-sm">{company?.name || '-'}</td>
                  <td className="px-4 py-3 text-sm text-[#757575]">{contact.title}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      contact.lifecycleStage === 'customer' ? 'bg-[#E6F9F6] text-[#00A78E]' :
                      contact.lifecycleStage === 'opportunity' ? 'bg-[#E6F0FF] text-[#3B86F0]' :
                      'bg-[#FFF5E6] text-[#F5A623]'
                    }`}>
                      {contact.lifecycleStage}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 hover:bg-[#E5E5E5] rounded"
                    >
                      <MoreHorizontal size={16} className="text-[#757575]" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-[#E5E5E5] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#FF7A59] flex items-center justify-center text-white text-xl font-medium">
                  {selectedContact.firstName[0]}{selectedContact.lastName[0]}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{selectedContact.firstName} {selectedContact.lastName}</h2>
                  <p className="text-[#757575]">{selectedContact.title} at {selectedCompany?.name}</p>
                </div>
              </div>
              <button onClick={() => setSelectedContact(null)} className="p-2 hover:bg-[#F5F5F5] rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-[#F5F5F5] rounded-lg">
                  <Mail size={18} className="text-[#757575]" />
                  <div>
                    <p className="text-xs text-[#A0A0A0]">Email</p>
                    <p className="text-sm font-medium">{selectedContact.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#F5F5F5] rounded-lg">
                  <Phone size={18} className="text-[#757575]" />
                  <div>
                    <p className="text-xs text-[#A0A0A0]">Phone</p>
                    <p className="text-sm font-medium">{selectedContact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#F5F5F5] rounded-lg">
                  <Building2 size={18} className="text-[#757575]" />
                  <div>
                    <p className="text-xs text-[#A0A0A0]">Company</p>
                    <p className="text-sm font-medium">{selectedCompany?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#F5F5F5] rounded-lg">
                  <Calendar size={18} className="text-[#757575]" />
                  <div>
                    <p className="text-xs text-[#A0A0A0]">Created</p>
                    <p className="text-sm font-medium">{selectedContact.createdAt}</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedContact.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-[#E5E5E5] rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Activity Timeline */}
              <div>
                <h3 className="text-sm font-semibold mb-4">Activity Timeline</h3>
                <div className="space-y-4">
                  {selectedActivities.length > 0 ? selectedActivities.map(activity => (
                    <div key={activity.id} className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#FF7A59] mt-2" />
                      <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-[#757575]">{activity.description}</p>
                        <p className="text-xs text-[#A0A0A0] mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  )) : (
                    <p className="text-sm text-[#757575]">No activity yet</p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#E5E5E5] flex justify-end gap-3">
              <button className="px-4 py-2 text-sm border border-[#E5E5E5] rounded-lg hover:bg-[#F5F5F5]">
                Edit
              </button>
              <button className="px-4 py-2 text-sm bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C]">
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-6 border-b border-[#E5E5E5]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Add New Contact</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-[#F5F5F5] rounded-lg">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#757575] mb-1">First Name *</label>
                  <input type="text" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#757575] mb-1">Last Name *</label>
                  <input type="text" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">Email *</label>
                <input type="email" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">Phone</label>
                <input type="tel" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">Company</label>
                <select className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]">
                  <option value="">Select company...</option>
                  {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">Title</label>
                <input type="text" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
              </div>
            </div>
            <div className="p-4 border-t border-[#E5E5E5] flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm border border-[#E5E5E5] rounded-lg hover:bg-[#F5F5F5]">
                Cancel
              </button>
              <button className="px-4 py-2 text-sm bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C]">
                Create Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
