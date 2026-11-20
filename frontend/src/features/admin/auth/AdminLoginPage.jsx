import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Lock, Mail, Eye, EyeOff, Shield } from 'lucide-react';
import { toast } from 'react-toastify';
import { loginAdmin, clearError } from '../../auth/authSlice';
import Button from '../../../shared/ui/Button';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    const result = await dispatch(loginAdmin({ email, password }));
    if (loginAdmin.fulfilled.match(result)) {
      toast.success('Welcome back, Admin!');
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[var(--surface)] text-[var(--text)] transition-colors">
      <div className="w-full max-w-md p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[var(--primary)] text-white mx-auto flex items-center justify-center font-bold text-xl shadow-xs">
            K
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text)]">
            Admin Authentication
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Enter authorized administrator credentials to manage portfolio CMS.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--text-muted)]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@khushisiddhapura.dev"
                className="w-full rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm pl-10 pr-3.5 py-2.5 text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--text-muted)]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm pl-10 pr-10 py-2.5 text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            className="w-full mt-2"
          >
            Sign In to Dashboard
          </Button>
        </form>

        <div className="pt-4 border-t border-[var(--border)] text-center text-xs text-[var(--text-muted)] flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-[var(--primary)]" />
          <span>Restricted administrative portal. All actions logged.</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
