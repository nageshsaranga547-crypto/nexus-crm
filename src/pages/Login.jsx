import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('demo@nexuscrm.com');
  const [password, setPassword] = useState('demo123');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo, just navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF7A59] to-[#FF9B85] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <span className="text-[#FF7A59] font-bold text-2xl">N</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Nexus CRM</h1>
          <p className="text-white/80">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0A0]" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#FF7A59] focus:ring-2 focus:ring-[#FF7A59]/20"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A0A0]" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#FF7A59] focus:ring-2 focus:ring-[#FF7A59]/20"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0A0A0] hover:text-[#757575]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded border-[#E5E5E5] text-[#FF7A59] focus:ring-[#FF7A59]" />
                <span className="text-sm text-[#757575]">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#FF7A59] hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#FF7A59] text-white font-medium rounded-lg hover:bg-[#E85A3C] transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#757575]">
              Don't have an account?{' '}
              <a href="#" className="text-[#FF7A59] font-medium hover:underline">Sign up</a>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-[#E5E5E5]">
            <p className="text-xs text-center text-[#A0A0A0]">
              Demo credentials: demo@nexuscrm.com / demo123
            </p>
          </div>
        </div>

        <p className="text-center text-white/60 text-sm mt-6">
          © 2024 Nexus CRM. All rights reserved.
        </p>
      </div>
    </div>
  );
}
