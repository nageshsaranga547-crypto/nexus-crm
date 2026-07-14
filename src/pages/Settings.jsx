import { useState } from 'react';
import { User, Building2, Shield, Bell, Key, Users, Globe } from 'lucide-react';
import { useCrm } from '../context/CrmContext';
import { Card, CardBody, CardHeader, Button, Input, Avatar, Badge } from '../components/ui';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'workspace', label: 'Workspace', icon: Building2 },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
];

export function Settings() {
  const { state } = useCrm();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: state.currentUser?.name || '',
    email: state.currentUser?.email || '',
    role: state.currentUser?.role || 'member',
    phone: '+1 (555) 123-4567',
    timezone: 'America/New_York',
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1E293B]">Settings</h1>
        <p className="text-[#64748B] mt-1">Manage your account and workspace settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <Card>
            <nav className="p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#2563EB] text-white'
                        : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B]'
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-[#1E293B]">Profile Information</h2>
                <p className="text-sm text-[#64748B] mt-1">Update your personal information</p>
              </CardHeader>
              <CardBody className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar name={profileData.name} size="xl" />
                  <div>
                    <Button variant="secondary" size="sm">Change Photo</Button>
                    <p className="text-xs text-[#94A3B8] mt-2">JPG, PNG or GIF. Max 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                  <div>
                    <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
                      Timezone
                    </label>
                    <select
                      value={profileData.timezone}
                      onChange={(e) => setProfileData({ ...profileData, timezone: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#1E293B] text-sm"
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Europe/Paris">Paris (CET)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-[#E2E8F0]">
                  <Button>Save Changes</Button>
                </div>
              </CardBody>
            </Card>
          )}

          {activeTab === 'workspace' && (
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-[#1E293B]">Workspace Settings</h2>
                <p className="text-sm text-[#64748B] mt-1">Manage your workspace details</p>
              </CardHeader>
              <CardBody className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-white font-bold">
                      NS
                    </div>
                    <div>
                      <p className="font-medium text-[#1E293B]">{state.workspace.name}</p>
                      <p className="text-sm text-[#64748B]">Created {state.workspace.createdAt}</p>
                    </div>
                  </div>
                  <Badge variant="success">{state.workspace.plan}</Badge>
                </div>

                <Input
                  label="Workspace Name"
                  defaultValue={state.workspace.name}
                />

                <div>
                  <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
                    Industry
                  </label>
                  <select className="w-full h-10 px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#1E293B] text-sm">
                    <option>Technology</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>Retail</option>
                    <option>Education</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="flex justify-end pt-4 border-t border-[#E2E8F0]">
                  <Button>Save Changes</Button>
                </div>
              </CardBody>
            </Card>
          )}

          {activeTab === 'team' && (
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-[#1E293B]">Team Members</h2>
                  <p className="text-sm text-[#64748B] mt-1">{state.users.length} members in this workspace</p>
                </div>
                <Button>
                  <Users size={16} className="mr-2" />
                  Invite
                </Button>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {state.users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl">
                      <div className="flex items-center gap-4">
                        <Avatar name={user.name} size="md" />
                        <div>
                          <p className="font-medium text-[#1E293B]">{user.name}</p>
                          <p className="text-sm text-[#64748B]">{user.email}</p>
                        </div>
                      </div>
                      <Badge variant={user.role === 'admin' ? 'primary' : 'default'}>
                        {user.role === 'admin' ? 'Admin' : 'Member'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-[#1E293B]">Notification Preferences</h2>
                <p className="text-sm text-[#64748B] mt-1">Choose how you want to be notified</p>
              </CardHeader>
              <CardBody className="space-y-6">
                {[
                  { title: 'Deal updates', description: 'Get notified when deals move stages', enabled: true },
                  { title: 'Task reminders', description: 'Receive reminders for upcoming tasks', enabled: true },
                  { title: 'New contacts', description: 'Notifications for new contact additions', enabled: false },
                  { title: 'Weekly reports', description: 'Receive weekly pipeline summaries', enabled: true },
                  { title: 'Email notifications', description: 'Get important updates via email', enabled: true },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-[#E2E8F0] last:border-0">
                    <div>
                      <p className="text-sm font-medium text-[#1E293B]">{item.title}</p>
                      <p className="text-xs text-[#64748B]">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={item.enabled} />
                      <div className="w-11 h-6 bg-[#E2E8F0] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2563EB]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
                    </label>
                  </div>
                ))}
              </CardBody>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-[#1E293B]">Security Settings</h2>
                <p className="text-sm text-[#64748B] mt-1">Manage your account security</p>
              </CardHeader>
              <CardBody className="space-y-6">
                <div className="p-4 bg-[#F8FAFC] rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Key size={20} className="text-[#64748B]" />
                    <p className="font-medium text-[#1E293B]">Password</p>
                  </div>
                  <p className="text-sm text-[#64748B] mb-4">Last changed 3 months ago</p>
                  <Button variant="secondary">Change Password</Button>
                </div>

                <div className="p-4 bg-[#F8FAFC] rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield size={20} className="text-[#64748B]" />
                    <p className="font-medium text-[#1E293B]">Two-Factor Authentication</p>
                  </div>
                  <p className="text-sm text-[#64748B] mb-4">Add an extra layer of security to your account</p>
                  <Button variant="secondary">Enable 2FA</Button>
                </div>

                <div className="p-4 bg-[#FEF2F2] rounded-xl border border-[#FECACA]">
                  <p className="font-medium text-[#DC2626]">Danger Zone</p>
                  <p className="text-sm text-[#64748B] mt-1 mb-4">Once you delete your account, there is no going back.</p>
                  <Button variant="danger">Delete Account</Button>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
