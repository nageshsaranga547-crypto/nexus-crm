import { useState } from 'react';
import { Search, Plus, Check, Calendar, User, X, LayoutGrid, List, Filter } from 'lucide-react';
import { tasks as initialTasks } from '../data/mockData';

const taskStatuses = ['not_started', 'in_progress', 'completed', 'deferred'];
const taskPriorities = ['high', 'medium', 'low'];

export function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [viewMode, setViewMode] = useState('list');
  const [showModal, setShowModal] = useState(false);
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(t =>
      t.id === taskId
        ? { ...t, status: t.status === 'completed' ? 'not_started' : 'completed' }
        : t
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-[#00A78E]';
      case 'in_progress': return 'bg-[#3B86F0]';
      case 'deferred': return 'bg-[#9E9E9E]';
      default: return 'bg-[#E5E5E5]';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-[#E52E33]';
      case 'medium': return 'text-[#F5A623]';
      default: return 'text-[#00A78E]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">Tasks</h1>
          <p className="text-sm text-[#757575]">{tasks.length} tasks total</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C] transition-colors text-sm font-medium"
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0A0]" size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]"
          />
        </div>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm bg-white"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm bg-white"
        >
          <option value="all">All Status</option>
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="deferred">Deferred</option>
        </select>
        <div className="flex border border-[#E5E5E5] rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-[#FF7A59] text-white' : 'bg-white text-[#757575] hover:bg-[#F5F5F5]'}`}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setViewMode('board')}
            className={`px-3 py-2 text-sm ${viewMode === 'board' ? 'bg-[#FF7A59] text-white' : 'bg-white text-[#757575] hover:bg-[#F5F5F5]'}`}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-lg border border-[#E5E5E5] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#F5F5F5]">
              <tr>
                <th className="w-12 text-left px-4 py-3"></th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#757575] uppercase">Task</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#757575] uppercase">Due Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#757575] uppercase">Priority</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#757575] uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#757575] uppercase">Owner</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task.id} className="border-t border-[#E5E5E5] hover:bg-[#F5F5F5] transition-colors">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        task.status === 'completed'
                          ? 'bg-[#00A78E] border-[#00A78E] text-white'
                          : 'border-[#E5E5E5] hover:border-[#00A78E]'
                      }`}
                    >
                      {task.status === 'completed' && <Check size={12} />}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <p className={`font-medium ${task.status === 'completed' ? 'line-through text-[#A0A0A0]' : ''}`}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-xs text-[#757575] mt-0.5 line-clamp-1">{task.description}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-[#A0A0A0]" />
                      {task.dueDate}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium capitalize ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-[#F5F5F5] capitalize">
                      {task.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="flex items-center gap-1">
                      <User size={14} className="text-[#A0A0A0]" />
                      {task.owner}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Board View */}
      {viewMode === 'board' && (
        <div className="grid grid-cols-4 gap-4">
          {taskStatuses.map(status => {
            const statusTasks = filteredTasks.filter(t => t.status === status);
            return (
              <div key={status} className="bg-[#F5F5F5] rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`} />
                    <h3 className="font-semibold text-sm capitalize">{status.replace('_', ' ')}</h3>
                  </div>
                  <span className="text-xs text-[#757575] bg-white px-2 py-0.5 rounded-full">
                    {statusTasks.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {statusTasks.map(task => (
                    <div
                      key={task.id}
                      className="bg-white rounded-lg p-3 border border-[#E5E5E5] hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-medium text-sm">{task.title}</p>
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`p-1 rounded ${task.status === 'completed' ? 'text-[#00A78E]' : 'text-[#A0A0A0] hover:text-[#00A78E]'}`}
                        >
                          <Check size={14} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#757575]">
                        <span className={`font-medium capitalize ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {task.dueDate?.slice(5)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-6 border-b border-[#E5E5E5]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Add New Task</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-[#F5F5F5] rounded-lg">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">Task Title *</label>
                <input type="text" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" placeholder="What needs to be done?" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#757575] mb-1">Description</label>
                <textarea className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59] h-24 resize-none" placeholder="Add more details..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#757575] mb-1">Due Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#757575] mb-1">Priority</label>
                  <select className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]">
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="low">Low</option>
                  </select>
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
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
