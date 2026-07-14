import { useState } from 'react';
import { Plus, DollarSign, Calendar, User, GripVertical, X, LayoutGrid, List } from 'lucide-react';
import { deals as initialDeals, dealStages, getContactById, getCompanyById } from '../data/mockData';

export function Deals() {
  const [deals, setDeals] = useState(initialDeals);
  const [viewMode, setViewMode] = useState('board');
  const [showModal, setShowModal] = useState(false);
  const [draggedDeal, setDraggedDeal] = useState(null);

  const handleDragStart = (e, deal) => {
    setDraggedDeal(deal);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, stageId) => {
    e.preventDefault();
    if (draggedDeal && draggedDeal.stage !== stageId) {
      setDeals(prev => prev.map(d =>
        d.id === draggedDeal.id ? { ...d, stage: stageId } : d
      ));
    }
    setDraggedDeal(null);
  };

  const getStageColor = (stageId) => {
    const stage = dealStages.find(s => s.id === stageId);
    return stage?.color || '#9E9E9E';
  };

  const wonDeals = deals.filter(d => d.stage === 'closedWon');
  const lostDeals = deals.filter(d => d.stage === 'closedLost');
  const openDeals = deals.filter(d => !['closedWon', 'closedLost'].includes(d.stage));
  const totalPipeline = openDeals.reduce((sum, d) => sum + d.amount, 0);
  const totalWon = wonDeals.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">Deals</h1>
          <p className="text-sm text-[#757575]">{deals.length} deals total</p>
        </div>
        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <div className="flex border border-[#E5E5E5] rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('board')}
              className={`px-3 py-1.5 text-sm ${viewMode === 'board' ? 'bg-[#FF7A59] text-white' : 'bg-white text-[#757575] hover:bg-[#F5F5F5]'}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-sm ${viewMode === 'list' ? 'bg-[#FF7A59] text-white' : 'bg-white text-[#757575] hover:bg-[#F5F5F5]'}`}
            >
              <List size={16} />
            </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C] transition-colors text-sm font-medium"
          >
            <Plus size={18} />
            Add Deal
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
          <p className="text-sm text-[#757575]">Open Pipeline</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">${(totalPipeline / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
          <p className="text-sm text-[#757575]">Closed Won</p>
          <p className="text-2xl font-bold text-[#00A78E]">${(totalWon / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
          <p className="text-sm text-[#757575]">Active Deals</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">{openDeals.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
          <p className="text-sm text-[#757575]">Win Rate</p>
          <p className="text-2xl font-bold text-[#3B86F0]">{wonDeals.length + lostDeals.length > 0 ? Math.round((wonDeals.length / (wonDeals.length + lostDeals.length)) * 100) : 0}%</p>
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {dealStages.map(stage => {
            const stageDeals = deals.filter(d => d.stage === stage.id);
            const stageTotal = stageDeals.reduce((sum, d) => sum + d.amount, 0);

            return (
              <div
                key={stage.id}
                className="w-72 flex-shrink-0"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                <div className="bg-[#F5F5F5] rounded-lg p-3">
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
                      <h3 className="font-semibold text-sm">{stage.name}</h3>
                      <span className="text-xs text-[#757575] bg-white px-2 py-0.5 rounded-full">
                        {stageDeals.length}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#757575] mb-3">${(stageTotal / 1000).toFixed(0)}K</p>

                  {/* Cards */}
                  <div className="space-y-2 min-h-[200px]">
                    {stageDeals.map(deal => {
                      const contact = getContactById(deal.contactId);
                      return (
                        <div
                          key={deal.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, deal)}
                          className={`bg-white rounded-lg p-3 border border-[#E5E5E5] cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow ${
                            draggedDeal?.id === deal.id ? 'opacity-50' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <p className="font-medium text-sm line-clamp-2">{deal.title}</p>
                            <GripVertical size={14} className="text-[#A0A0A0] flex-shrink-0" />
                          </div>
                          <p className="text-lg font-bold text-[#1A1A1A] mb-2">${(deal.amount / 1000).toFixed(0)}K</p>
                          <div className="flex items-center justify-between text-xs text-[#757575]">
                            <span className="flex items-center gap-1">
                              <User size={12} />
                              {contact ? `${contact.firstName} ${contact.lastName[0]}.` : 'Unknown'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {deal.closeDate?.slice(5)}
                            </span>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{ width: `${deal.probability}%`, backgroundColor: stage.color }}
                                />
                              </div>
                              <span className="text-xs text-[#A0A0A0]">{deal.probability}%</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add Deal Button */}
                  <button className="w-full mt-2 p-2 border border-dashed border-[#E5E5E5] rounded-lg text-sm text-[#757575] hover:border-[#FF7A59] hover:text-[#FF7A59] transition-colors flex items-center justify-center gap-1">
                    <Plus size={14} />
                    Add deal
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Deal Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-6 border-b border-[#E5E5E5]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Add New Deal</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-[#F5F5F5] rounded-lg">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">Deal Title *</label>
                <input type="text" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" placeholder="e.g., Enterprise License Agreement" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#757575] mb-1">Amount *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#757575]">$</span>
                    <input type="number" className="w-full pl-7 pr-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" placeholder="0" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#757575] mb-1">Stage</label>
                  <select className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]">
                    {dealStages.filter(s => !['closedWon', 'closedLost'].includes(s.id)).map(stage => (
                      <option key={stage.id} value={stage.id}>{stage.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#757575] mb-1">Close Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#757575] mb-1">Probability</label>
                  <input type="number" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" placeholder="50" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">Owner</label>
                <input type="text" value="John Doe" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm bg-[#F5F5F5]" readOnly />
              </div>
            </div>
            <div className="p-4 border-t border-[#E5E5E5] flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm border border-[#E5E5E5] rounded-lg hover:bg-[#F5F5F5]">
                Cancel
              </button>
              <button className="px-4 py-2 text-sm bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C]">
                Create Deal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
