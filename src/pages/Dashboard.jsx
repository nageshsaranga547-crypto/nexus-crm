import { Link } from 'react-router-dom';
import { 
  TrendingUp, Users, DollarSign, CheckSquare, 
  ArrowRight, Activity, Calendar
} from 'lucide-react';
import { useCrm } from '../context/CrmContext';
import { Card, CardBody, Badge } from '../components/ui';
import { formatCurrency, formatRelativeTime, getActivityIcon } from '../utils/helpers';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function Dashboard() {
  const { state } = useCrm();
  const { contacts, deals, tasks, activities } = state;

  const totalDeals = deals.length;
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const totalContacts = contacts.length;
  const tasksDue = tasks.filter(t => t.status === 'pending' && new Date(t.dueDate) <= new Date()).length;

  const pipelineData = [
    { name: 'Lead', value: deals.filter(d => d.stage === 'Lead').reduce((sum, d) => sum + d.value, 0) },
    { name: 'Qualified', value: deals.filter(d => d.stage === 'Qualified').reduce((sum, d) => sum + d.value, 0) },
    { name: 'Proposal', value: deals.filter(d => d.stage === 'Proposal').reduce((sum, d) => sum + d.value, 0) },
    { name: 'Negotiation', value: deals.filter(d => d.stage === 'Negotiation').reduce((sum, d) => sum + d.value, 0) },
    { name: 'Won', value: deals.filter(d => d.stage === 'Won').reduce((sum, d) => sum + d.value, 0) },
    { name: 'Lost', value: deals.filter(d => d.stage === 'Lost').reduce((sum, d) => sum + d.value, 0) },
  ];

  const stageColors = ['#94A3B8', '#3B82F6', '#8B5CF6', '#F59E0B', '#22C55E', '#EF4444'];

  const COLORS = ['#2563EB', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];

  const pieData = [
    { name: 'High', value: tasks.filter(t => t.priority === 'high').length },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'medium').length },
    { name: 'Low', value: tasks.filter(t => t.priority === 'low').length },
  ];

  const upcomingTasks = tasks
    .filter(t => t.status === 'pending')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Dashboard</h1>
          <p className="text-[#64748B] mt-1">Welcome back! Here's what's happening today.</p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="!p-0">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
                <TrendingUp size={24} className="text-[#2563EB]" />
              </div>
              <Badge variant="success">+12%</Badge>
            </div>
            <p className="text-[#64748B] text-sm mt-4">Active Deals</p>
            <p className="text-2xl font-bold text-[#1E293B] mt-1">{totalDeals}</p>
          </div>
        </Card>

        <Card className="!p-0">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] flex items-center justify-center">
                <DollarSign size={24} className="text-[#10B981]" />
              </div>
              <Badge variant="success">+8%</Badge>
            </div>
            <p className="text-[#64748B] text-sm mt-4">Pipeline Value</p>
            <p className="text-2xl font-bold text-[#1E293B] mt-1">{formatCurrency(totalValue)}</p>
          </div>
        </Card>

        <Card className="!p-0">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] flex items-center justify-center">
                <Users size={24} className="text-[#F59E0B]" />
              </div>
            </div>
            <p className="text-[#64748B] text-sm mt-4">Total Contacts</p>
            <p className="text-2xl font-bold text-[#1E293B] mt-1">{totalContacts}</p>
          </div>
        </Card>

        <Card className="!p-0">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] flex items-center justify-center">
                <CheckSquare size={24} className="text-[#EF4444]" />
              </div>
              <Badge variant="danger">{tasksDue} due</Badge>
            </div>
            <p className="text-[#64748B] text-sm mt-4">Tasks Due</p>
            <p className="text-2xl font-bold text-[#1E293B] mt-1">{tasksDue}</p>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Chart */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
            <h2 className="font-semibold text-[#1E293B]">Pipeline Overview</h2>
            <Link to="/deals" className="text-sm text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1">
              View Pipeline <ArrowRight size={16} />
            </Link>
          </div>
          <CardBody>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pipelineData} layout="vertical">
                  <XAxis type="number" tickFormatter={(v) => `$${v/1000}k`} />
                  <YAxis type="category" dataKey="name" width={80} />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {pipelineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={stageColors[index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        {/* Task Priority Distribution */}
        <Card>
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
            <h2 className="font-semibold text-[#1E293B]">Task Priority</h2>
            <Link to="/tasks" className="text-sm text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <CardBody>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {pieData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-xs text-[#64748B]">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
            <h2 className="font-semibold text-[#1E293B]">Recent Activity</h2>
          </div>
          <div className="divide-y divide-[#E2E8F0]">
            {activities.slice(0, 6).map((activity) => (
              <div key={activity.id} className="px-5 py-3 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F1F5F9] flex items-center justify-center text-sm flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1E293B]">{activity.description}</p>
                  {activity.amount && (
                    <p className="text-sm font-medium text-[#10B981]">{formatCurrency(activity.amount)}</p>
                  )}
                  <p className="text-xs text-[#94A3B8] mt-1">{formatRelativeTime(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
            <h2 className="font-semibold text-[#1E293B]">Upcoming Tasks</h2>
            <Link to="/tasks" className="text-sm text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="divide-y divide-[#E2E8F0]">
            {upcomingTasks.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <Calendar size={32} className="mx-auto text-[#CBD5E1] mb-2" />
                <p className="text-sm text-[#64748B]">No upcoming tasks</p>
              </div>
            ) : (
              upcomingTasks.map((task) => (
                <div key={task.id} className="px-5 py-3 flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    task.priority === 'high' ? 'bg-[#EF4444]' :
                    task.priority === 'medium' ? 'bg-[#F59E0B]' : 'bg-[#22C55E]'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#1E293B] truncate">{task.title}</p>
                    <p className="text-xs text-[#94A3B8]">{task.dueDate}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
