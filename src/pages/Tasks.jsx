import { useState } from 'react';
import { Plus, Check, Calendar, AlertCircle, Filter, MoreVertical, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { useTasks, useCrm } from '../context/CrmContext';
import { Card, Button, Input, Textarea, Select, Modal, Badge, Avatar, EmptyState, ConfirmModal } from '../components/ui';
import { formatDate, getPriorityColor, classNames } from '../utils/helpers';

export function Tasks() {
  const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const { state } = useCrm();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending',
    assigneeId: '',
  });
  const [errors, setErrors] = useState({});

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'high') return task.priority === 'high' && task.status === 'pending';
    return true;
  }).sort((a, b) => {
    // Sort by status (pending first), then by priority, then by due date
    if (a.status !== b.status) return a.status === 'pending' ? -1 : 1;
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  const openAddModal = () => {
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'medium',
      status: 'pending',
      assigneeId: state.currentUser?.id?.toString() || '',
    });
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
      assigneeId: task.assigneeId?.toString() || '',
    });
    setErrors({});
    setShowModal(true);
    setActiveMenu(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const taskData = {
      ...formData,
      assigneeId: formData.assigneeId ? parseInt(formData.assigneeId) : null,
    };

    if (editingTask) {
      updateTask({ ...editingTask, ...taskData });
    } else {
      addTask(taskData);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    deleteTask(id);
    setShowDeleteConfirm(false);
    setActiveMenu(null);
  };

  const handleToggle = (id) => {
    toggleTask(id);
    setActiveMenu(null);
  };

  const getAssignee = (assigneeId) => {
    return state.users.find(u => u.id === assigneeId);
  };

  const isOverdue = (task) => {
    return task.status === 'pending' && new Date(task.dueDate) < new Date(new Date().toDateString());
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Tasks</h1>
          <p className="text-[#64748B] mt-1">Manage your tasks and track progress</p>
        </div>
        <Button onClick={openAddModal}>
          <Plus size={18} className="mr-2" />
          Add Task
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-4 flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'All Tasks' },
            { value: 'pending', label: 'Pending' },
            { value: 'completed', label: 'Completed' },
            { value: 'high', label: 'High Priority' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={classNames(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                filter === option.value
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Tasks List */}
      <Card className="overflow-hidden">
        {filteredTasks.length === 0 ? (
          <EmptyState
            icon="✅"
            title="No tasks found"
            description={filter !== 'all' ? "Try changing your filter" : "Create your first task to get started"}
            action={filter === 'all' && (
              <Button onClick={openAddModal}>
                <Plus size={18} className="mr-2" />
                Add Task
              </Button>
            )}
          />
        ) : (
          <div className="divide-y divide-[#E2E8F0]">
            {filteredTasks.map((task) => {
              const assignee = getAssignee(task.assigneeId);
              const overdue = isOverdue(task);
              
              return (
                <div 
                  key={task.id} 
                  className={classNames(
                    'px-5 py-4 flex items-start gap-4 hover:bg-[#F8FAFC] transition-colors',
                    task.status === 'completed' && 'opacity-60'
                  )}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggle(task.id)}
                    className={classNames(
                      'mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0',
                      task.status === 'completed'
                        ? 'bg-[#22C55E] border-[#22C55E] text-white'
                        : 'border-[#CBD5E1] hover:border-[#2563EB]'
                    )}
                  >
                    {task.status === 'completed' && <Check size={14} />}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className={classNames(
                          'text-sm font-medium',
                          task.status === 'completed' ? 'text-[#94A3B8] line-through' : 'text-[#1E293B]'
                        )}>
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="text-xs text-[#64748B] mt-1 line-clamp-2">{task.description}</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="relative flex-shrink-0">
                        <button
                          onClick={() => setActiveMenu(activeMenu === task.id ? null : task.id)}
                          className="p-1.5 rounded-lg hover:bg-[#F1F5F9] text-[#64748B] transition-colors"
                        >
                          <MoreVertical size={18} />
                        </button>
                        {activeMenu === task.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-40" 
                              onClick={() => setActiveMenu(null)}
                            />
                            <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-[#E2E8F0] py-1 z-50">
                              <button
                                onClick={() => openEditModal(task)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
                              >
                                <Edit2 size={16} />
                                Edit
                              </button>
                              <button
                                onClick={() => { setSelectedTask(task); setShowDeleteConfirm(true); }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
                              >
                                <Trash2 size={16} />
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 mt-2">
                      {/* Priority */}
                      <div className="flex items-center gap-1.5">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getPriorityColor(task.priority) }}
                        />
                        <span className="text-xs text-[#64748B] capitalize">{task.priority}</span>
                      </div>

                      {/* Due date */}
                      <div className={classNames(
                        'flex items-center gap-1.5',
                        overdue ? 'text-[#EF4444]' : 'text-[#64748B]'
                      )}>
                        {overdue && <AlertCircle size={14} />}
                        <Calendar size={14} />
                        <span className="text-xs">{formatDate(task.dueDate)}</span>
                      </div>

                      {/* Assignee */}
                      {assignee && (
                        <div className="flex items-center gap-1.5">
                          <Avatar name={assignee.name} size="sm" className="w-5 h-5 text-[10px]" />
                          <span className="text-xs text-[#64748B]">{assignee.name}</span>
                        </div>
                      )}

                      {/* Status */}
                      {task.status === 'completed' && (
                        <Badge variant="success" className="text-xs">
                          <CheckCircle2 size={12} className="mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="!p-4 text-center">
          <p className="text-2xl font-bold text-[#1E293B]">{tasks.length}</p>
          <p className="text-xs text-[#64748B]">Total Tasks</p>
        </Card>
        <Card className="!p-4 text-center">
          <p className="text-2xl font-bold text-[#EF4444]">{tasks.filter(t => t.status === 'pending' && isOverdue(t)).length}</p>
          <p className="text-xs text-[#64748B]">Overdue</p>
        </Card>
        <Card className="!p-4 text-center">
          <p className="text-2xl font-bold text-[#F59E0B]">{tasks.filter(t => t.priority === 'high' && t.status === 'pending').length}</p>
          <p className="text-xs text-[#64748B]">High Priority</p>
        </Card>
        <Card className="!p-4 text-center">
          <p className="text-2xl font-bold text-[#22C55E]">{tasks.filter(t => t.status === 'completed').length}</p>
          <p className="text-xs text-[#64748B]">Completed</p>
        </Card>
      </div>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title={editingTask ? 'Edit Task' : 'Add New Task'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            placeholder="Review proposal"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={errors.title}
          />
          
          <Textarea
            label="Description"
            placeholder="Add more details..."
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              error={errors.dueDate}
            />
            <Select
              label="Priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Assignee"
              value={formData.assigneeId}
              onChange={(e) => setFormData({ ...formData, assigneeId: e.target.value })}
            >
              <option value="">Unassigned</option>
              {state.users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </Select>
            <Select
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingTask ? 'Save Changes' : 'Add Task'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => handleDelete(selectedTask?.id)}
        title="Delete Task"
        message={`Are you sure you want to delete "${selectedTask?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}
