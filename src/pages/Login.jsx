import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCrm } from '../context/CrmContext';
import { Button, Input } from '../components/ui';
import { Zap, Mail, Lock, ArrowRight } from 'lucide-react';

export function Login() {
  const { dispatch } = useCrm();
  const navigate = useNavigate();
  const [email, setEmail] = useState('alex@nexuscrm.io');
  const [password, setPassword] = useState('password');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';

    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      dispatch({ type: 'LOGIN', payload: { id: 1, name: 'Alex Morgan', email, role: 'admin' } });
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center">
            <Zap size={28} className="text-white" />
          </div>
          <span className="text-white font-bold text-2xl">Nexus CRM</span>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#1E293B]">Welcome back</h1>
            <p className="text-[#64748B] mt-2">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-11 text-[#94A3B8]" />
              <Input
                label="Email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Lock size={18} className="absolute left-3 top-11 text-[#94A3B8]" />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                className="pl-10"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]" />
                <span className="text-sm text-[#64748B]">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#2563EB] hover:text-[#1D4ED8]">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign in
                  <ArrowRight size={18} />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E2E8F0] text-center">
            <p className="text-sm text-[#64748B]">
              Don't have an account?{' '}
              <a href="#" className="text-[#2563EB] hover:text-[#1D4ED8] font-medium">
                Start free trial
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-white/40 text-sm mt-6">
          © 2025 Nexus CRM. All rights reserved.
        </p>
      </div>
    </div>
  );
}
