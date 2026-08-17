import * as React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff, Zap, GraduationCap, Users, BarChart3, Shield } from 'lucide-react';
import { VFSelect } from '@vidyamaxx/ui';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

const FEATURES = [
  { icon: Shield, text: 'Automated Admission Screening' },
  { icon: GraduationCap, text: 'Real-time Attendance Analytics' },
  { icon: BarChart3, text: 'Automated Fee Defaulter Alerts' },
  { icon: Users, text: 'Comprehensive Student 360' },
];

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [form, setForm] = React.useState({ email: '', password: '' });
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    // Simulate auth — replace with real API
    await new Promise((r) => setTimeout(r, 1200));
    if (form.email && form.password) {
      navigate({ to: '/' });
    } else {
      setError('Please enter your email and password.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* ── Left Panel: Branding ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden bg-card border-r border-border">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(24 95% 53% / 0.15) 0%, transparent 70%)' }}
        />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <img src="/logo.png" alt="VidyaMaxx Logo" className="h-10 w-10 object-contain drop-shadow-md shrink-0" />
          <span className="text-2xl font-black tracking-tight text-foreground">
            Vidya<span className="text-primary">Maxx</span>
          </span>
        </div>

        {/* Main copy */}
        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-full text-xs font-medium">
            <Zap className="h-3.5 w-3.5" />
            Unified School Management Platform
          </div>
          <h2 className="text-4xl font-black text-foreground leading-tight">
            Manage your school<br />
            <span className="text-primary">seamlessly.</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
            VidyaMaxx unifies every corner of school administration — from smart admissions to real-time analytics. Built for the modern school.
          </p>

          {/* Feature list */}
          <div className="space-y-3 mt-8">
            {FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{text}</span>
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary/60" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="relative text-xs text-muted-foreground">
          © 2026 VidyaMaxx · All rights reserved
        </p>
      </div>

      {/* ── Right Panel: Login Form ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <img src="/logo.png" alt="VidyaMaxx Logo" className="h-10 w-10 object-contain drop-shadow-md shrink-0" />
          <span className="text-2xl font-black tracking-tight text-foreground">
            Vidya<span className="text-primary">Maxx</span>
          </span>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to your school management dashboard
            </p>
          </div>

          {/* Security Badge */}
          <div className="mb-6 flex items-center gap-2 bg-primary/5 border border-primary/15 rounded-lg px-4 py-3">
            <Shield className="h-4 w-4 text-primary shrink-0" />
            <p className="text-xs text-muted-foreground">
              Enterprise grade security · All data encrypted in transit & at rest.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="admin@school.edu.in"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full bg-muted border border-border text-foreground placeholder-muted-foreground rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground" htmlFor="password">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="w-full bg-muted border border-border text-foreground placeholder-muted-foreground rounded-lg px-4 py-2.5 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Role selector */}
            <VFSelect
              label="Login as"
              id="role"
              defaultValue="admin"
              options={[
                { label: 'Super Admin', value: 'admin' },
                { label: 'Principal', value: 'principal' },
                { label: 'Teacher', value: 'teacher' },
                { label: 'Office Staff', value: 'staff' },
                { label: 'Parent', value: 'parent' },
              ]}
            />

            {/* Error */}
            {error && (
              <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg px-4 py-2.5 text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4" />
                  Sign in securely
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* SSO options */}
          <div className="grid grid-cols-2 gap-3">
            {['Google Workspace', 'Microsoft 365'].map((provider) => (
              <button
                key={provider}
                className="flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 border border-border rounded-lg px-3 py-2.5 text-xs font-medium text-foreground transition-colors"
              >
                {provider}
              </button>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Protected by VidyaMaxx Security · SOC 2 Compliant
          </p>
        </div>
      </div>
    </div>
  );
}
