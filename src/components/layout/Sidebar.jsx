import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  PieChart,
  CheckSquare,
  Calendar,
  Phone,
  Mail,
  FileText,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';

const mainNavItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/contacts', label: 'Contacts', icon: Users },
  { path: '/companies', label: 'Companies', icon: Building2 },
  { path: '/deals', label: 'Deals', icon: PieChart },
  { path: '/tasks', label: 'Tasks', icon: CheckSquare },
  { path: '/calendar', label: 'Calendar', icon: Calendar },
  { path: '/calls', label: 'Calls', icon: Phone },
  { path: '/emails', label: 'Emails', icon: Mail },
  { path: '/quotes', label: 'Quotes', icon: FileText },
  { path: '/reports', label: 'Reports', icon: BarChart3 },
];

export function Sidebar() {
  const [collapsedSections, setCollapsedSections] = useState({});

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className="w-60 bg-[#2D2D2D] text-white flex flex-col h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-4 border-b border-[#404040]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FF7A59] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <div>
            <h1 className="font-semibold text-base">Nexus CRM</h1>
            <p className="text-xs text-gray-400">Sales Hub</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {/* CRM Section */}
        <div className="px-3 mb-2">
          <div
            className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
            onClick={() => toggleSection('crm')}
          >
            <span>CRM</span>
            {collapsedSections.crm ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
          </div>
          {!collapsedSections.crm && (
            <div className="space-y-1 mt-1">
              {mainNavItems.slice(0, 5).map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? 'bg-[#FF7A59] text-white'
                        : 'text-gray-300 hover:bg-[#404040] hover:text-white'
                    }`
                  }
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Sales Section */}
        <div className="px-3 mb-2">
          <div
            className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
            onClick={() => toggleSection('sales')}
          >
            <span>Sales</span>
            {collapsedSections.sales ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
          </div>
          {!collapsedSections.sales && (
            <div className="space-y-1 mt-1">
              {mainNavItems.slice(5, 8).map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? 'bg-[#FF7A59] text-white'
                        : 'text-gray-300 hover:bg-[#404040] hover:text-white'
                    }`
                  }
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Operations Section */}
        <div className="px-3 mb-2">
          <div
            className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
            onClick={() => toggleSection('operations')}
          >
            <span>Operations</span>
            {collapsedSections.operations ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
          </div>
          {!collapsedSections.operations && (
            <div className="space-y-1 mt-1">
              {mainNavItems.slice(8).map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? 'bg-[#FF7A59] text-white'
                        : 'text-gray-300 hover:bg-[#404040] hover:text-white'
                    }`
                  }
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-[#404040] p-3">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
              isActive
                ? 'bg-[#FF7A59] text-white'
                : 'text-gray-300 hover:bg-[#404040] hover:text-white'
            }`
          }
        >
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-[#404040] hover:text-white transition-colors">
          <HelpCircle size={18} />
          <span>Help & Support</span>
        </button>

        {/* User Profile */}
        <div className="mt-3 flex items-center gap-3 px-3 py-2 rounded-md bg-[#404040]">
          <div className="w-8 h-8 rounded-full bg-[#FF7A59] flex items-center justify-center text-sm font-medium">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-gray-400 truncate">Sales Manager</p>
          </div>
          <button className="text-gray-400 hover:text-white">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
