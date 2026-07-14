import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Building2, DollarSign, CheckSquare, Mail, Phone, Calendar } from 'lucide-react';
import { dashboardMetrics, deals, tasks, activities, getContactById, pipelineStats } from '../data/mockData';

const monthlyData = [
  { month: 'Jan', deals: 4, revenue: 180000 },
  { month: 'Feb', deals: 6, revenue: 320000 },
  { month: 'Mar', deals: 8, revenue: 680000 },
  { month: 'Apr', deals: 5, revenue: 520000 },
  { month: 'May', deals: 7, revenue: 875000 },
  { month: 'Jun', deals: 9, revenue: 950000 },
];

const recentDeals = deals.filter(d => d.stage !== 'closedLost').slice(0, 5);
const upcomingTasks = tasks.filter(t => t.status !== 'completed').slice(0, 4);

export function Dashboard() {
  const metricCards = [
    { label: 'Open Deals', value: dashboardMetrics.openDeals, change: dashboardMetrics.dealsChange, icon: DollarSign, color: '#FF7A59' },
    { label: 'Total Contacts', value: dashboardMetrics.totalContacts, change: dashboardMetrics.contactsChange, icon: Users, color: '#3B86F0' },
    { label: 'Companies', value: dashboardMetrics.totalCompanies, change: dashboardMetrics.companiesChange, icon: Building2, color: '#00A78E' },
    { label: 'Tasks Due Today', value: dashboardMetrics.tasksDueToday, change: dashboardMetrics.tasksChange, icon: CheckSquare, color: '#F5A623' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">Dashboard</h1>
          <p className="text-sm text-[#757575]">Welcome back, John. Here's what's happening.</p>
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm bg-white">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
          </select>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((metric, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-[#E5E5E5] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${metric.color}15` }}>
                <metric.icon size={20} style={{ color: metric.color }} />
              </div>
              <span className="text-xs text-[#00A78E] bg-[#E6F9F6] px-2 py-1 rounded-full flex items-center gap-1">
                <TrendingUp size={12} />
                +{metric.change}%
              </span>
            </div>
            <p className="text-2xl font-bold text-[#1A1A1A]">{metric.value}</p>
            <p className="text-sm text-[#757575]">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
          <h3 className="text-base font-semibold mb-4">Revenue & Deals</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis dataKey="month" stroke="#757575" fontSize={12} />
                <YAxis stroke="#757575" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#FF7A59" strokeWidth={2} name="Revenue ($)" />
                <Line type="monotone" dataKey="deals" stroke="#3B86F0" strokeWidth={2} name="Deals" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline Overview */}
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
          <h3 className="text-base font-semibold mb-4">Pipeline Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineStats.filter(s => !['closedWon', 'closedLost'].includes(s.id))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis dataKey="name" stroke="#757575" fontSize={10} angle={-20} textAnchor="end" height={60} />
                <YAxis stroke="#757575" fontSize={12} />
                <Tooltip formatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Bar dataKey="totalValue" fill="#FF7A59" radius={[4, 4, 0, 0]} name="Value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Deals */}
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold">Recent Deals</h3>
            <a href="/deals" className="text-sm text-[#FF7A59] hover:underline">View all</a>
          </div>
          <div className="space-y-4">
            {recentDeals.map(deal => {
              const contact = getContactById(deal.contactId);
              return (
                <div key={deal.id} className="flex items-center justify-between py-2 border-b border-[#E5E5E5] last:border-0">
                  <div>
                    <p className="font-medium text-sm">{deal.title}</p>
                    <p className="text-xs text-[#757575]">{contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">${(deal.amount / 1000).toFixed(0)}K</p>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: pipelineStats.find(s => s.id === deal.stage)?.color + '20', color: pipelineStats.find(s => s.id === deal.stage)?.color }}>
                      {deal.stage.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold">Upcoming Tasks</h3>
            <a href="/tasks" className="text-sm text-[#FF7A59] hover:underline">View all</a>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map(task => (
              <div key={task.id} className="flex items-start gap-3 py-2 border-b border-[#E5E5E5] last:border-0">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  task.priority === 'high' ? 'bg-[#E52E33]' :
                  task.priority === 'medium' ? 'bg-[#F5A623]' : 'bg-[#00A78E]'
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-sm">{task.title}</p>
                  <p className="text-xs text-[#757575] flex items-center gap-1 mt-1">
                    <Calendar size={12} />
                    {task.dueDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
          <h3 className="text-base font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {activities.slice(0, 5).map(activity => (
              <div key={activity.id} className="flex gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'email' ? 'bg-[#3B86F0] bg-opacity-10' :
                  activity.type === 'call' ? 'bg-[#00A78E] bg-opacity-10' :
                  activity.type === 'meeting' ? 'bg-[#8F87F5] bg-opacity-10' :
                  'bg-[#FF7A59] bg-opacity-10'
                }`}>
                  {activity.type === 'email' ? <Mail size={14} className="text-[#3B86F0]" /> :
                   activity.type === 'call' ? <Phone size={14} className="text-[#00A78E]" /> :
                   activity.type === 'meeting' ? <Calendar size={14} className="text-[#8F87F5]" /> :
                   <DollarSign size={14} className="text-[#FF7A59]" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-[#757575]">{activity.description}</p>
                  <p className="text-xs text-[#A0A0A0] mt-1">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
