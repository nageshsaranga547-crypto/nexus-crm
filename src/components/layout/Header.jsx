import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Plus, User, LogOut, Settings, ChevronDown } from 'lucide-react';

const quickCreateOptions = [
  { label: 'Contact', icon: '👤', color: '#00A78E' },
  { label: 'Company', icon: '🏢', color: '#3B86F0' },
  { label: 'Deal', icon: '💰', color: '#FF7A59' },
  { label: 'Task', icon: '✅', color: '#F5A623' },
  { label: 'Call', icon: '📞', color: '#8F87F5' },
  { label: 'Email', icon: '✉️', color: '#00C853' },
  { label: 'Quote', icon: '📄', color: '#335FCT' },
  { label: 'Meeting', icon: '📅', color: '#E52E33' },
];

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
        setShowQuickCreate(false);
        setShowUserMenu(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="h-14 bg-white border-b border-[#E5E5E5] flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Search */}
      <div className="flex-1 max-w-xl" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0A0]" size={18} />
          <input
            type="text"
            placeholder="Search contacts, companies, deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSearch(true)}
            className="w-full pl-10 pr-20 py-2 bg-[#F5F5F5] border border-transparent rounded-lg text-sm focus:outline-none focus:border-[#FF7A59] focus:bg-white transition-colors"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-[#A0A0A0]">
            <kbd className="px-1.5 py-0.5 bg-white border border-[#E5E5E5] rounded text-[10px] font-mono">⌘</kbd>
            <kbd className="px-1.5 py-0.5 bg-white border border-[#E5E5E5] rounded text-[10px] font-mono">K</kbd>
          </div>
        </div>

        {/* Search Results Dropdown */}
        {showSearch && searchQuery && (
          <div className="absolute mt-2 w-full max-w-xl bg-white rounded-lg shadow-lg border border-[#E5E5E5] py-2 max-h-96 overflow-y-auto">
            <div className="px-4 py-2 text-xs font-semibold text-[#A0A0A0] uppercase">Recent Searches</div>
            <div className="px-4 py-2 text-sm text-[#757575] hover:bg-[#F5F5F5] cursor-pointer flex items-center gap-3">
              <Search size={14} />
              <span>Acme Corporation</span>
              <span className="text-xs text-[#A0A0A0] ml-auto">Company</span>
            </div>
            <div className="px-4 py-2 text-sm text-[#757575] hover:bg-[#F5F5F5] cursor-pointer flex items-center gap-3">
              <Search size={14} />
              <span>Sarah Johnson</span>
              <span className="text-xs text-[#A0A0A0] ml-auto">Contact</span>
            </div>
            <div className="px-4 py-2 text-sm text-[#757575] hover:bg-[#F5F5F5] cursor-pointer flex items-center gap-3">
              <Search size={14} />
              <span>Enterprise Deal Q4</span>
              <span className="text-xs text-[#A0A0A0] ml-auto">Deal</span>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 ml-6">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors">
          <Bell size={20} className="text-[#757575]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#E52E33] rounded-full"></span>
        </button>

        {/* Quick Create */}
        <div className="relative">
          <button
            onClick={() => setShowQuickCreate(!showQuickCreate)}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C] transition-colors text-sm font-medium"
          >
            <Plus size={18} />
            <span>Create</span>
            <ChevronDown size={14} />
          </button>

          {showQuickCreate && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-[#E5E5E5] py-2 z-50">
              {quickCreateOptions.map((option) => (
                <button
                  key={option.label}
                  className="w-full px-4 py-2 flex items-center gap-3 text-sm hover:bg-[#F5F5F5] transition-colors"
                >
                  <span style={{ fontSize: '18px' }}>{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 hover:bg-[#F5F5F5] rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#FF7A59] flex items-center justify-center text-white text-sm font-medium">
              JD
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#E5E5E5] py-2 z-50">
              <div className="px-4 py-2 border-b border-[#E5E5E5]">
                <p className="font-medium text-sm">John Doe</p>
                <p className="text-xs text-[#A0A0A0]">john@nexuscrm.com</p>
              </div>
              <button className="w-full px-4 py-2 flex items-center gap-3 text-sm hover:bg-[#F5F5F5] transition-colors">
                <User size={16} />
                <span>My Profile</span>
              </button>
              <button className="w-full px-4 py-2 flex items-center gap-3 text-sm hover:bg-[#F5F5F5] transition-colors">
                <Settings size={16} />
                <span>Settings</span>
              </button>
              <div className="border-t border-[#E5E5E5] mt-2 pt-2">
                <button className="w-full px-4 py-2 flex items-center gap-3 text-sm hover:bg-[#F5F5F5] transition-colors text-[#E52E33]">
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
