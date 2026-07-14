import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { dashboardMetrics, deals, contacts, pipelineStats } from '../data/mockData';

const monthlyData = [
  { month: 'Jan', deals: 4, revenue: 180000 },
  { month: 'Feb', deals: 6, revenue: 320000 },
  { month: 'Mar', deals: 8, revenue: 680000 },
  { month: 'Apr', deals: 5, revenue: 520000 },
  { month: 'May', deals: 7, revenue: 875000 },
  { month: 'Jun', deals: 9, revenue: 950000 },
];

const stageDistribution = pipelineStats.map(s => ({
  name: s.name,
  value: s.deals.length,
  color: s.color,
}));

const leadSourceData = [
  { name: 'Organic Search', value: 35 },
  { name: 'Direct', value: 25 },
  { name: 'Referral', value: 20 },
  { name: 'Social Media', value: 15 },
  { name: 'Email', value: 5 },
];

const COLORS = ['#FF7A59', '#3B86F0', '#00A78E', '#F5A623', '#8F87F5'];

export function Reports() {
  const wonDeals = deals.filter(d => d.stage === 'closedWon');
  const lostDeals = deals.filter(d => d.stage === 'closedLost');
  const winRate = wonDeals.length + lostDeals.length > 0 
    ? Math.round((wonDeals.length / (wonDeals.length + lostDeals.length)) * 100) 
    : 0;

  const avgDealSize = wonDeals.length > 0 
    ? Math.round(wonDeals.reduce((sum, d) => sum + d.amount, 0) / wonDeals.length) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">Reports</h1>
          <p className="text-sm text-[#757575]">Analytics and insights</p>
        </div>
        <select className="px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm bg-white">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>This year</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-5">
          <p className="text-sm text-[#757575] mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">${(dashboardMetrics.revenue / 1000).toFixed(0)}K</p>
          <p className="text-xs text-[#00A78E] mt-1">+{dashboardMetrics.revenueChange}% from last period</p>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-5">
          <p className="text-sm text-[#757575] mb-1">Win Rate</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">{winRate}%</p>
          <p className="text-xs text-[#757575] mt-1">{wonDeals.length} deals won</p>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-5">
          <p className="text-sm text-[#757575] mb-1">Avg Deal Size</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">${(avgDealSize / 1000).toFixed(0)}K</p>
          <p className="text-xs text-[#757575] mt-1">Across {wonDeals.length} deals</p>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-5">
          <p className="text-sm text-[#757575] mb-1">New Contacts</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">{dashboardMetrics.newContactsThisMonth}</p>
          <p className="text-xs text-[#00A78E] mt-1">+{dashboardMetrics.contactsChange}% from last month</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Revenue Over Time */}
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
          <h3 className="text-base font-semibold mb-4">Revenue Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis dataKey="month" stroke="#757575" fontSize={12} />
                <YAxis stroke="#757575" fontSize={12} tickFormatter={(v) => `$${v / 1000}K`} />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Line type="monotone" dataKey="revenue" stroke="#FF7A59" strokeWidth={2} dot={{ fill: '#FF7A59' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Deals by Stage */}
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
          <h3 className="text-base font-semibold mb-4">Deals by Stage</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stageDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {stageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* More Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Deals by Month */}
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
          <h3 className="text-base font-semibold mb-4">Deals Closed by Month</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis dataKey="month" stroke="#757575" fontSize={12} />
                <YAxis stroke="#757575" fontSize={12} />
                <Tooltip />
                <Bar dataKey="deals" fill="#3B86F0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
          <h3 className="text-base font-semibold mb-4">Lead Sources</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Deals Table */}
      <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
        <h3 className="text-base font-semibold mb-4">Recent Won Deals</h3>
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-semibold text-[#757575] uppercase border-b border-[#E5E5E5]">
              <th className="pb-3">Deal</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Close Date</th>
              <th className="pb-3">Owner</th>
            </tr>
          </thead>
          <tbody>
            {wonDeals.slice(0, 5).map(deal => (
              <tr key={deal.id} className="border-b border-[#E5E5E5] last:border-0">
                <td className="py-3 font-medium">{deal.title}</td>
                <td className="py-3">${deal.amount.toLocaleString()}</td>
                <td className="py-3 text-[#757575]">{deal.closeDate}</td>
                <td className="py-3 text-[#757575]">{deal.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
