import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Bell, ChevronRight, LogOut, User, Settings } from 'lucide-react';
import { useCrm } from '../../context/CrmContext';
import { Avatar } from '../ui/Avatar';
import { classNames } from '../../utils/helpers';

const pageNames = {
  '/dashboard': 'Dashboard',
  '/contacts': 'Contacts',
  '/deals': 'Deal Pipeline',
  '/tasks': 'Tasks',
  '/settings': 'Settings',
};

export function Header() {
  const { state, dispatch } = useCrm();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const pageName = pageNames[location.pathname] || 'Dashboard';

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-6">
      {/* Left side - Breadcrumb */}
      <div className="flex items-center gap-2">
        <Link to="/dashboard" className="text-[#64748B] hover:text-[#2563EB] transition-colors">
          Home
        </Link>
        <ChevronRight size={16} className="text-[#CBD5E1]" />
        <span className="text-[#1E293B] font-medium">{pageName}</span>
      </div>

      {/* Right side - Search & Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 h-9 pl-10 pr-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-[#F1F5F9] transition-colors">
          <Bell size={20} className="text-[#64748B]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full" />
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors"
          >
            <Avatar name={state.currentUser?.name || 'User'} size="sm" />
            <span className="text-sm font-medium text-[#1E293B] hidden sm:block">
              {state.currentUser?.name}
            </span>
          </button>

          {showUserMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E2E8F0] py-2 z-50">
                <div className="px-4 py-2 border-b border-[#E2E8F0]">
                  <p className="text-sm font-medium text-[#1E293B]">{state.currentUser?.name}</p>
                  <p className="text-xs text-[#64748B]">{state.currentUser?.email}</p>
                </div>
                <Link
                  to="/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
                >
                  <User size={16} />
                  Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
                >
                  <Settings size={16} />
                  Settings
                </Link>
                <div className="border-t border-[#E2E8F0] mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-[#EF4444] hover:bg-[#FEF2F2] transition-colors w-full"
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
