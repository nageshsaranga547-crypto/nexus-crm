import { useState } from 'react';
import { Plus, Search, Filter, Mail, Phone, Building2, MoreVertical, Edit2, Trash2, UserPlus } from 'lucide-react';
import { useContacts, useCrm } from '../context/CrmContext';
import { Card, Button, Input, Textarea, Select, Modal, Badge, Avatar, EmptyState, ConfirmModal } from '../components/ui';
import { formatDate } from '../utils/helpers';

export function Contacts() {
  const { contacts, addContact, updateContact, deleteContact } = useContacts();
  const { state } = useCrm();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    tags: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingContact(null);
    setFormData({ name: '', email: '', phone: '', company: '', tags: '', notes: '' });
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
      tags: contact.tags?.join(', ') || '',
      notes: contact.notes,
    });
    setErrors({});
    setShowModal(true);
    setActiveMenu(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.company.trim()) newErrors.company = 'Company is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const contactData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    if (editingContact) {
      updateContact({ ...editingContact, ...contactData });
    } else {
      addContact(contactData);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    deleteContact(id);
    setShowDeleteConfirm(false);
    setActiveMenu(null);
  };

  const viewContact = (contact) => {
    setSelectedContact(contact);
    setShowDetailModal(true);
    setActiveMenu(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Contacts</h1>
          <p className="text-[#64748B] mt-1">Manage your contacts and relationships</p>
        </div>
        <Button onClick={openAddModal}>
          <Plus size={18} className="mr-2" />
          Add Contact
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 h-10 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] transition-colors">
            <Filter size={18} />
            <span className="text-sm">Filters</span>
          </button>
        </div>
      </Card>

      {/* Contacts Table */}
      <Card className="overflow-hidden">
        {filteredContacts.length === 0 ? (
          <EmptyState
            icon="👥"
            title="No contacts found"
            description={searchQuery ? "Try adjusting your search terms" : "Add your first contact to get started"}
            action={!searchQuery && (
              <Button onClick={openAddModal}>
                <UserPlus size={18} className="mr-2" />
                Add Contact
              </Button>
            )}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide">Contact</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide hidden md:table-cell">Company</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide hidden lg:table-cell">Tags</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide hidden sm:table-cell">Created</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filteredContacts.map((contact, index) => (
                  <tr 
                    key={contact.id} 
                    className={`${index % 2 === 1 ? 'bg-[#FAFBFC]' : ''} hover:bg-[#F8FAFC] transition-colors cursor-pointer`}
                    onClick={() => viewContact(contact)}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={contact.name} size="sm" />
                        <div>
                          <p className="text-sm font-medium text-[#1E293B]">{contact.name}</p>
                          <p className="text-xs text-[#64748B]">{contact.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Building2 size={16} className="text-[#94A3B8]" />
                        <span className="text-sm text-[#1E293B]">{contact.company}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {contact.tags?.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="primary" className="text-xs">{tag}</Badge>
                        ))}
                        {contact.tags?.length > 2 && (
                          <Badge variant="default" className="text-xs">+{contact.tags.length - 2}</Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="text-sm text-[#64748B]">{formatDate(contact.createdAt)}</span>
                    </td>
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="relative">
                        <button
                          onClick={() => setActiveMenu(activeMenu === contact.id ? null : contact.id)}
                          className="p-1.5 rounded-lg hover:bg-[#F1F5F9] text-[#64748B] transition-colors"
                        >
                          <MoreVertical size={18} />
                        </button>
                        {activeMenu === contact.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-40" 
                              onClick={() => setActiveMenu(null)}
                            />
                            <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-[#E2E8F0] py-1 z-50">
                              <button
                                onClick={() => openEditModal(contact)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
                              >
                                <Edit2 size={16} />
                                Edit
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
                              >
                                <Trash2 size={16} />
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title={editingContact ? 'Edit Contact' : 'Add New Contact'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            placeholder="John Smith"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />
            <Input
              label="Phone"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <Input
            label="Company"
            placeholder="Acme Inc."
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            error={errors.company}
          />
          <Input
            label="Tags"
            placeholder="enterprise, hot-lead (comma separated)"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
          <Textarea
            label="Notes"
            placeholder="Additional notes about this contact..."
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingContact ? 'Save Changes' : 'Add Contact'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Contact Detail Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title={selectedContact?.name}
        size="md"
      >
        {selectedContact && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar name={selectedContact.name} size="xl" />
              <div>
                <h3 className="text-lg font-semibold text-[#1E293B]">{selectedContact.name}</h3>
                <p className="text-[#64748B]">{selectedContact.company}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={18} className="text-[#64748B]" />
                <a href={`mailto:${selectedContact.email}`} className="text-[#2563EB] hover:underline">
                  {selectedContact.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={18} className="text-[#64748B]" />
                <span className="text-[#1E293B]">{selectedContact.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building2 size={18} className="text-[#64748B]" />
                <span className="text-[#1E293B]">{selectedContact.company}</span>
              </div>
            </div>

            {selectedContact.tags?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-[#64748B] uppercase mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {selectedContact.tags.map(tag => (
                    <Badge key={tag} variant="primary">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedContact.notes && (
              <div>
                <p className="text-xs font-semibold text-[#64748B] uppercase mb-2">Notes</p>
                <p className="text-sm text-[#1E293B] bg-[#F8FAFC] rounded-lg p-3">{selectedContact.notes}</p>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-[#E2E8F0]">
              <Button variant="ghost" onClick={() => openEditModal(selectedContact)}>
                <Edit2 size={16} className="mr-2" />
                Edit
              </Button>
              <Button variant="danger" onClick={() => { setShowDetailModal(false); setShowDeleteConfirm(true); }}>
                <Trash2 size={16} className="mr-2" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => handleDelete(selectedContact?.id)}
        title="Delete Contact"
        message={`Are you sure you want to delete ${selectedContact?.name}? This action cannot be undone.`}
      />
    </div>
  );
}
