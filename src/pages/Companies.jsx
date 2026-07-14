import { useState } from 'react';
import { Search, Plus, Building2, Users, DollarSign, MoreHorizontal, X } from 'lucide-react';
import { companies, contacts, deals } from '../data/mockData';

export function Companies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const companyContacts = selectedCompany ? contacts.filter(c => c.companyId === selectedCompany.id) : [];
  const companyDeals = selectedCompany ? deals.filter(d => d.companyId === selectedCompany.id) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">Companies</h1>
          <p className="text-sm text-[#757575]">{companies.length} companies total</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C] transition-colors text-sm font-medium"
        >
          <Plus size={18} />
          Add Company
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0A0]" size={18} />
        <input
          type="text"
          placeholder="Search companies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]"
        />
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map(company => {
          const companyContacts = contacts.filter(c => c.companyId === company.id);
          const companyDeals = deals.filter(d => d.companyId === company.id);
          const totalDealValue = companyDeals.reduce((sum, d) => sum + d.amount, 0);

          return (
            <div
              key={company.id}
              onClick={() => setSelectedCompany(company)}
              className="bg-white rounded-lg border border-[#E5E5E5] p-5 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                    <Building2 size={24} className="text-[#757575]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{company.name}</h3>
                    <p className="text-xs text-[#757575]">{company.domain}</p>
                  </div>
                </div>
                <button onClick={(e) => e.stopPropagation()} className="p-1 hover:bg-[#F5F5F5] rounded">
                  <MoreHorizontal size={16} className="text-[#757575]" />
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#757575] flex items-center gap-2">
                    <Users size={14} />
                    Industry
                  </span>
                  <span className="font-medium">{company.industry}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#757575] flex items-center gap-2">
                    <Users size={14} />
                    Employees
                  </span>
                  <span className="font-medium">{company.employees.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#757575] flex items-center gap-2">
                    <DollarSign size={14} />
                    Revenue
                  </span>
                  <span className="font-medium">${(company.revenue / 1000000).toFixed(1)}M</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#757575]">
                <span>{companyContacts.length} contacts</span>
                <span>{companyDeals.length} deals</span>
                <span>${(totalDealValue / 1000).toFixed(0)}K pipeline</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Company Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-[#E5E5E5] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                  <Building2 size={32} className="text-[#757575]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{selectedCompany.name}</h2>
                  <p className="text-[#757575]">{selectedCompany.domain}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCompany(null)} className="p-2 hover:bg-[#F5F5F5] rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-[#F5F5F5] rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-[#1A1A1A]">{companyContacts.length}</p>
                  <p className="text-xs text-[#757575]">Contacts</p>
                </div>
                <div className="bg-[#F5F5F5] rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-[#1A1A1A]">{companyDeals.length}</p>
                  <p className="text-xs text-[#757575]">Deals</p>
                </div>
                <div className="bg-[#F5F5F5] rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-[#1A1A1A]">${(selectedCompany.revenue / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-[#757575]">Revenue</p>
                </div>
              </div>

              {/* Company Details */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3">Company Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-[#757575]">Industry:</span> {selectedCompany.industry}</div>
                  <div><span className="text-[#757575]">Employees:</span> {selectedCompany.employees.toLocaleString()}</div>
                  <div><span className="text-[#757575]">Address:</span> {selectedCompany.address}</div>
                  <div><span className="text-[#757575]">Created:</span> {selectedCompany.createdAt}</div>
                </div>
              </div>

              {/* Contacts */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3">Contacts</h3>
                <div className="space-y-2">
                  {companyContacts.map(contact => (
                    <div key={contact.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F5F5F5]">
                      <div className="w-8 h-8 rounded-full bg-[#FF7A59] flex items-center justify-center text-white text-xs font-medium">
                        {contact.firstName[0]}{contact.lastName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{contact.firstName} {contact.lastName}</p>
                        <p className="text-xs text-[#757575]">{contact.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deals */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Deals</h3>
                <div className="space-y-2">
                  {companyDeals.map(deal => (
                    <div key={deal.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F5F5F5]">
                      <p className="text-sm font-medium">{deal.title}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">${(deal.amount / 1000).toFixed(0)}K</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          deal.stage === 'closedWon' ? 'bg-[#E6F9F6] text-[#00A78E]' :
                          deal.stage === 'closedLost' ? 'bg-[#FEE6E6] text-[#E52E33]' :
                          'bg-[#E6F0FF] text-[#3B86F0]'
                        }`}>
                          {deal.stage.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#E5E5E5] flex justify-end gap-3">
              <button className="px-4 py-2 text-sm border border-[#E5E5E5] rounded-lg hover:bg-[#F5F5F5]">
                Edit
              </button>
              <button className="px-4 py-2 text-sm bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C]">
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Company Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-6 border-b border-[#E5E5E5]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Add New Company</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-[#F5F5F5] rounded-lg">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">Company Name *</label>
                <input type="text" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">Domain</label>
                <input type="text" placeholder="example.com" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#757575] mb-1">Industry</label>
                  <select className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]">
                    <option value="">Select...</option>
                    <option>Technology</option>
                    <option>Manufacturing</option>
                    <option>Software</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#757575] mb-1">Employees</label>
                  <input type="number" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">Address</label>
                <input type="text" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
              </div>
            </div>
            <div className="p-4 border-t border-[#E5E5E5] flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm border border-[#E5E5E5] rounded-lg hover:bg-[#F5F5F5]">
                Cancel
              </button>
              <button className="px-4 py-2 text-sm bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C]">
                Create Company
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
