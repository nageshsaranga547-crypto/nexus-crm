import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Briefcase, CheckSquare, Settings, 
  ChevronDown, LogOut, Zap, Menu, X
} from 'lucide-react';
import { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { classNames } from '../../utils/helpers';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/contacts', icon: Users, label: 'Contacts' },
  { path: '/deals', icon: Briefcase, label: 'Deals' },
  { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
];

export function Sidebar() {
  const { state } = useCrm();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={classNames(
        'fixed lg:static inset-y-0 left-0 z-40 w-[260px] bg-[#0F172A] flex flex-col transition-transform duration-300',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg">Nexus CRM</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={classNames(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                  isActive 
                    ? 'bg-[#2563EB] text-white' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                )}
              >
                <Icon size={20} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-3 border-t border-white/10">
          <NavLink
            to="/settings"
            onClick={() => setMobileOpen(false)}
            className={classNames(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
              location.pathname === '/settings'
                ? 'bg-[#2563EB] text-white'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            )}
          >
            <Settings size={20} />
            Settings
          </NavLink>
        </div>

        {/* Workspace selector */}
        <div className="p-3 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-white text-xs font-bold">
              NS
            </div>
            <div className="flex-1 text-left">
              <p className="text-white text-sm font-medium truncate">{state.workspace.name}</p>
              <p className="text-white/40 text-xs">{state.workspace.plan} Plan</p>
            </div>
            <ChevronDown size={16} className="text-white/40" />
          </button>
        </div>
      </aside>
    </>
  );
}
