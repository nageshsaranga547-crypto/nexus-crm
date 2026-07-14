import { useState } from 'react';
import { User, Building2, Bell, Shield, Palette, Users, Save } from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'workspace', label: 'Workspace', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'team', label: 'Team', icon: Users },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1A1A1A]">Settings</h1>
        <p className="text-sm text-[#757575]">Manage your account and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Tabs */}
        <div className="w-56 flex-shrink-0">
          <div className="bg-white rounded-lg border border-[#E5E5E5] p-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#FF7A59] text-white'
                    : 'text-[#757575] hover:bg-[#F5F5F5]'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-lg border border-[#E5E5E5] p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-[#FF7A59] flex items-center justify-center text-white text-2xl font-medium">
                    JD
                  </div>
                  <button className="px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm hover:bg-[#F5F5F5]">
                    Change Photo
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#757575] mb-1">First Name</label>
                    <input type="text" defaultValue="John" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#757575] mb-1">Last Name</label>
                    <input type="text" defaultValue="Doe" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#757575] mb-1">Email</label>
                    <input type="email" defaultValue="john@nexuscrm.com" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#757575] mb-1">Phone</label>
                    <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#757575] mb-1">Job Title</label>
                    <input type="text" defaultValue="Sales Manager" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#757575] mb-1">Timezone</label>
                    <select className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]">
                      <option>America/Los_Angeles</option>
                      <option>America/New_York</option>
                      <option>Europe/London</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C] transition-colors text-sm font-medium">
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'workspace' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Workspace Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#757575] mb-1">Workspace Name</label>
                    <input type="text" defaultValue="Nexus CRM" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#757575] mb-1">Default Currency</label>
                    <select className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#757575] mb-1">Date Format</label>
                    <select className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C] transition-colors text-sm font-medium">
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { label: 'New contact assigned', desc: 'Get notified when a new contact is assigned to you' },
                    { label: 'Deal stage changed', desc: 'Get notified when a deal moves to a new stage' },
                    { label: 'Task due reminder', desc: 'Get reminded about upcoming task deadlines' },
                    { label: 'Daily digest', desc: 'Receive a daily summary of your CRM activity' },
                    { label: 'Weekly report', desc: 'Receive weekly sales and activity reports' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-[#E5E5E5] last:border-0">
                      <div>
                        <p className="font-medium text-sm">{item.label}</p>
                        <p className="text-xs text-[#757575]">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-[#E5E5E5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF7A59]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C] transition-colors text-sm font-medium">
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#757575] mb-1">Current Password</label>
                    <input type="password" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#757575] mb-1">New Password</label>
                    <input type="password" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#757575] mb-1">Confirm New Password</label>
                    <input type="password" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#FF7A59]" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-t border-[#E5E5E5]">
                    <div>
                      <p className="font-medium text-sm">Two-Factor Authentication</p>
                      <p className="text-xs text-[#757575]">Add an extra layer of security</p>
                    </div>
                    <button className="px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm hover:bg-[#F5F5F5]">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C] transition-colors text-sm font-medium">
                  <Save size={16} />
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Team Members</h2>
                <button className="px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C] transition-colors text-sm font-medium">
                  Invite Member
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'John Doe', email: 'john@nexuscrm.com', role: 'Admin' },
                  { name: 'Sarah Smith', email: 'sarah@nexuscrm.com', role: 'Member' },
                  { name: 'Mike Johnson', email: 'mike@nexuscrm.com', role: 'Member' },
                ].map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF7A59] flex items-center justify-center text-white text-sm font-medium">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-[#757575]">{member.email}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-white rounded-full text-xs font-medium">{member.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
