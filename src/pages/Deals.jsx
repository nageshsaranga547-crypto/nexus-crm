import { useState } from 'react';
import { Plus, GripVertical, Calendar, DollarSign } from 'lucide-react';
import { useDeals, useContacts } from '../context/CrmContext';
import { Card, Button, Input, Textarea, Select, Modal, Badge } from '../components/ui';
import { formatCurrency, formatDate, getStageColor, classNames } from '../utils/helpers';
import { dealStages } from '../data/mockData';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function DealCard({ deal, contact, onClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={classNames(
        'bg-white rounded-lg border border-[#E2E8F0] p-3 cursor-pointer transition-all hover:shadow-md',
        isDragging && 'opacity-50 shadow-lg'
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-2">
        <button
          className="mt-1 p-0.5 text-[#CBD5E1] hover:text-[#64748B] cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={16} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#1E293B] truncate">{deal.title}</p>
          {contact && (
            <p className="text-xs text-[#64748B] mt-0.5 truncate">{contact.name}</p>
          )}
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-semibold text-[#10B981]">{formatCurrency(deal.value)}</span>
            <Badge 
              variant={
                deal.probability === 100 ? 'success' :
                deal.probability >= 50 ? 'warning' : 'default'
              }
              className="text-xs"
            >
              {deal.probability}%
            </Badge>
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs text-[#94A3B8]">
            <Calendar size={12} />
            {formatDate(deal.expectedClose)}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Deals() {
  const { deals, addDeal, updateDeal, deleteDeal, moveDeal } = useDeals();
  const { contacts } = useContacts();
  const [showModal, setShowModal] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    value: '',
    stage: 'Lead',
    contactId: '',
    probability: 20,
    expectedClose: '',
  });
  const [errors, setErrors] = useState({});

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getDealsByStage = (stage) => deals.filter(deal => deal.stage === stage);
  
  const getContact = (contactId) => contacts.find(c => c.id === contactId);

  const getStageTotal = (stage) => {
    return getDealsByStage(stage).reduce((sum, deal) => sum + deal.value, 0);
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const dealId = active.id;
    const overId = over.id;

    // Check if dropped on a stage column
    if (dealStages.includes(overId)) {
      moveDeal(dealId, overId);
    } else {
      // Find the deal that was dropped over
      const overDeal = deals.find(d => d.id === overId);
      if (overDeal && overDeal.stage !== deals.find(d => d.id === dealId)?.stage) {
        moveDeal(dealId, overDeal.stage);
      }
    }
  };

  const openAddModal = (stage) => {
    setEditingDeal(null);
    setFormData({
      title: '',
      value: '',
      stage: stage || 'Lead',
      contactId: '',
      probability: 20,
      expectedClose: '',
    });
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (deal) => {
    setEditingDeal(deal);
    setFormData({
      title: deal.title,
      value: deal.value.toString(),
      stage: deal.stage,
      contactId: deal.contactId?.toString() || '',
      probability: deal.probability,
      expectedClose: deal.expectedClose,
    });
    setErrors({});
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.value || parseFloat(formData.value) <= 0) newErrors.value = 'Valid value is required';
    if (!formData.expectedClose) newErrors.expectedClose = 'Expected close date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const dealData = {
      title: formData.title,
      value: parseFloat(formData.value),
      stage: formData.stage,
      contactId: formData.contactId ? parseInt(formData.contactId) : null,
      probability: parseInt(formData.probability),
      expectedClose: formData.expectedClose,
    };

    if (editingDeal) {
      updateDeal({ ...editingDeal, ...dealData });
    } else {
      addDeal(dealData);
    }
    setShowModal(false);
  };

  const activeDeal = activeId ? deals.find(d => d.id === activeId) : null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Deal Pipeline</h1>
          <p className="text-[#64748B] mt-1">Manage your deals across stages</p>
        </div>
        <Button onClick={() => openAddModal()}>
          <Plus size={18} className="mr-2" />
          Add Deal
        </Button>
      </div>

      {/* Pipeline Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
          {dealStages.map((stage) => (
            <div
              key={stage}
              className="flex-shrink-0 w-72"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getStageColor(stage) }}
                  />
                  <h3 className="font-semibold text-[#1E293B]">{stage}</h3>
                  <span className="text-xs text-[#94A3B8] bg-[#F1F5F9] px-2 py-0.5 rounded-full">
                    {getDealsByStage(stage).length}
                  </span>
                </div>
              </div>
              
              <div className="text-xs font-medium text-[#10B981] mb-3 px-1">
                {formatCurrency(getStageTotal(stage))}
              </div>

              <SortableContext
                items={getDealsByStage(stage).map(d => d.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2 min-h-[200px]">
                  {getDealsByStage(stage).map((deal) => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      contact={getContact(deal.contactId)}
                      onClick={() => openEditModal(deal)}
                    />
                  ))}
                  
                  {getDealsByStage(stage).length === 0 && (
                    <div 
                      className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-4 text-center"
                      onClick={() => openAddModal(stage)}
                    >
                      <p className="text-sm text-[#94A3B8]">Drop deals here</p>
                    </div>
                  )}
                </div>
              </SortableContext>

              <button
                onClick={() => openAddModal(stage)}
                className="w-full mt-2 py-2 text-sm text-[#64748B] hover:text-[#2563EB] hover:bg-[#F8FAFC] rounded-lg transition-colors flex items-center justify-center gap-1"
              >
                <Plus size={16} />
                Add deal
              </button>
            </div>
          ))}
        </div>

        <DragOverlay>
          {activeDeal && (
            <div className="bg-white rounded-lg border border-[#2563EB] shadow-xl p-3 w-72">
              <p className="text-sm font-medium text-[#1E293B]">{activeDeal.title}</p>
              <p className="text-sm font-semibold text-[#10B981]">{formatCurrency(activeDeal.value)}</p>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title={editingDeal ? 'Edit Deal' : 'Add New Deal'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Deal Title"
            placeholder="Enterprise License"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={errors.title}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Value"
              type="number"
              placeholder="50000"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              error={errors.value}
            />
            <Select
              label="Stage"
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
            >
              {dealStages.map(stage => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Contact"
              value={formData.contactId}
              onChange={(e) => setFormData({ ...formData, contactId: e.target.value })}
            >
              <option value="">Select contact</option>
              {contacts.map(contact => (
                <option key={contact.id} value={contact.id}>{contact.name}</option>
              ))}
            </Select>
            <Input
              label="Expected Close"
              type="date"
              value={formData.expectedClose}
              onChange={(e) => setFormData({ ...formData, expectedClose: e.target.value })}
              error={errors.expectedClose}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
              Probability: {formData.probability}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={formData.probability}
              onChange={(e) => setFormData({ ...formData, probability: e.target.value })}
              className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingDeal ? 'Save Changes' : 'Add Deal'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
