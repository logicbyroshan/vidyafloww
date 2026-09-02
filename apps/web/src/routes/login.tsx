import * as React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  KeyRound,
  Smartphone,
  School,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  UserCheck,
  GraduationCap,
  Users,
  BookOpen,
  AlertCircle,
  Building2,
  Award,
  Calendar,
  Languages,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@vidyafloww/ui';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

export const Route = createFileRoute('/login')({
  component: ProfessionalAuthPage,
});

type AuthMode = 'login' | 'signup' | 'forgot-password' | 'forgot-username';

const TRUSTED_INSTITUTIONS = [
  { name: 'Delhi Public School', short: 'DPS', icon: Award },
  { name: 'Springdales School', short: 'SPRD', icon: School },
  { name: 'The Heritage School', short: 'HERITAGE', icon: Building2 },
  { name: 'St. Xavier High School', short: 'ST. XAVIER', icon: Award },
  { name: 'Ryan International', short: 'RYAN', icon: School },
  { name: 'Kendriya Vidyalaya', short: 'KVS', icon: Building2 },
  { name: 'Modern School', short: 'MODERN', icon: Award },
  { name: 'Amity International', short: 'AMITY', icon: School },
  { name: 'Bal Bharati Public', short: 'BBPS', icon: Building2 },
  { name: 'The Doon School', short: 'DOON', icon: Award },
  { name: 'Mayo College', short: 'MAYO', icon: School },
  { name: 'Sanskriti School', short: 'SANSKRITI', icon: Building2 },
];

function ProfessionalAuthPage() {
  const navigate = useNavigate();
  const { language, setLanguage } = useGlobalStore();
  const { t } = useTranslation();
  const [authMode, setAuthMode] = React.useState<AuthMode>('login');

  // ─── LOGIN STATE ─────────────────────────────────────────────────────────────
  const [loginIdentifier, setLoginIdentifier] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // ─── SIGNUP STATE ────────────────────────────────────────────────────────────
  const [signupStep, setSignupStep] = React.useState<1 | 2 | 3 | 4>(1);
  const [signupRole, setSignupRole] = React.useState<'admin' | 'teacher' | 'student' | 'parent'>('admin');
  const [signupName, setSignupName] = React.useState('');
  const [signupEmail, setSignupEmail] = React.useState('');
  const [signupPhone, setSignupPhone] = React.useState('');
  const [signupSchoolCode, setSignupSchoolCode] = React.useState('');
  const [signupPassword, setSignupPassword] = React.useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = React.useState('');
  const [signupOtp, setSignupOtp] = React.useState(['', '', '', '', '', '']);
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);

  // ─── FORGOT PASSWORD STATE ───────────────────────────────────────────────────
  const [fpStep, setFpStep] = React.useState<1 | 2 | 3 | 4>(1);
  const [fpIdentifier, setFpIdentifier] = React.useState('');
  const [fpOtp, setFpOt] = React.useState(['', '', '', '', '', '']);
  const [fpNewPassword, setFpNewPassword] = React.useState('');
  const [fpConfirmPassword, setFpConfirmPassword] = React.useState('');

  // ─── FORGOT USERNAME STATE ───────────────────────────────────────────────────
  const [fuStep, setFuStep] = React.useState<1 | 2 | 3>(1);
  const [fuPhone, setFuPhone] = React.useState('');
  const [fuDob, setFuDob] = React.useState('');
  const [fuOtp, setFuOtp] = React.useState(['', '', '', '', '', '']);
  const [recoveredUsername, setRecoveredUsername] = React.useState<{ name: string; username: string; role: string; campus: string } | null>(null);
  const [copiedText, setCopiedText] = React.useState(false);

  // Login Submit Handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 700));

    if (!loginIdentifier || !loginPassword) {
      setStatusMessage({ type: 'error', text: 'Please enter your institutional email / user ID and password.' });
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    sessionStorage.setItem('vidyafloww_just_logged_in', 'true');
    navigate({ to: '/' });
  };

  // Google SSO Handler
  const handleGoogleSSO = async () => {
    setIsLoading(true);
    setStatusMessage({ type: 'success', text: 'Connecting to Google Workspace Single Sign-On (SSO)...' });
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    sessionStorage.setItem('vidyafloww_just_logged_in', 'true');
    navigate({ to: '/' });
  };

  // Password Strength Criteria Checks
  const hasMinLength = (signupStep === 3 ? signupPassword : fpNewPassword).length >= 8;
  const hasUppercase = /[A-Z]/.test(signupStep === 3 ? signupPassword : fpNewPassword);
  const hasNumber = /[0-9]/.test(signupStep === 3 ? signupPassword : fpNewPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(signupStep === 3 ? signupPassword : fpNewPassword);
  const isPassValid = hasMinLength && hasUppercase && hasNumber && hasSpecial;

  return (
    <div className="min-h-screen bg-black text-foreground relative flex flex-col justify-between overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* ═══════════════════════════════════════════════════════════════════════
          SUBTLE ARCHITECTURAL BACKGROUND (MINIMAL MATTE FINISH)
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        {/* Soft ambient orange glow */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[550px] h-[350px] rounded-2xl blur-[140px] opacity-10"
          style={{ background: 'radial-gradient(circle, #ea580c 0%, transparent 70%)' }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          TOP HEADER: BRAND LOGO + BACK TO WEBSITE + ACADEMIC YEAR
          ═══════════════════════════════════════════════════════════════════════ */}
      <header className="relative z-10 w-full max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="VidyaFloww Logo"
            className="h-8 w-8 object-contain shrink-0"
          />
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-foreground leading-none">
              Vidya<span className="text-primary">Floww</span>
            </span>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
              Enterprise School Management
            </span>
          </div>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Language Toggle: EN ↔ हि */}
          <button
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] text-xs font-bold text-foreground transition-colors cursor-pointer"
            title={language === 'en' ? 'Switch to Hindi (हिन्दी)' : 'Switch to English'}
          >
            <Languages className="h-3.5 w-3.5 text-primary" />
            <span>{language === 'en' ? 'EN' : 'हि'}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                navigate({ to: '/' });
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] text-xs font-semibold text-foreground transition-colors cursor-pointer"
            title="Return to public website"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#141414] border border-[#262626] text-xs font-mono font-medium text-muted-foreground shadow-xs">
            <span className="h-1.5 w-1.5 rounded-xs bg-emerald-400" />
            <span>AY 2026–2027</span>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          CENTER AUTH CARD: REFINED, GENEROUS SPACING & NO FULL ROUNDED
          ═══════════════════════════════════════════════════════════════════════ */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-6 sm:py-10">
        <div className="w-full max-w-[490px]">
          {/* Main Card Container */}
          <div className="rounded-xl bg-[#101010] border border-[#242424] shadow-2xl p-6 sm:p-8 space-y-5 relative">

            {/* Status Alert Toast */}
            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'p-3.5 rounded-md border text-xs font-medium flex items-center gap-2.5 shadow-xs',
                  statusMessage.type === 'error'
                    ? 'bg-destructive/10 border-destructive/30 text-destructive'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                )}
              >
                {statusMessage.type === 'error' ? (
                  <AlertCircle className="h-4 w-4 shrink-0" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                )}
                <span className="flex-1">{statusMessage.text}</span>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {/* ─────────────────────────────────────────────────────────────
                  1. LOGIN VIEW
                  ───────────────────────────────────────────────────────────── */}
              {authMode === 'login' && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-5"
                >
                  <div className="text-center space-y-1.5">
                    <h2 className="text-2xl font-black text-foreground tracking-tight">
                      {t('auth.signInTitle')}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {t('auth.signInSubtitle')}
                    </p>
                  </div>

                  {/* Google Workspace SSO Button */}
                  <button
                    type="button"
                    onClick={handleGoogleSSO}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-md bg-[#141414] hover:bg-[#1a1a1a] border border-[#262626] text-foreground font-semibold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      className="shrink-0"
                      style={{ width: '18px', height: '18px', minWidth: '18px', minHeight: '18px' }}
                    >
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>Continue with Google Workspace</span>
                  </button>

                  {/* Divider */}
                  <div className="relative flex items-center justify-center my-1">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#222222]" />
                    </div>
                    <span className="relative px-3 bg-[#101010] text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                      or with institutional credentials
                    </span>
                  </div>

                  {/* Form with Clean Gaps */}
                  <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                    {/* Identifier */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-foreground" htmlFor="identifier">
                          Institutional Email or User ID
                        </label>
                        <button
                          type="button"
                          onClick={() => setAuthMode('forgot-username')}
                          className="text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                        >
                          Forgot ID?
                        </button>
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          id="identifier"
                          type="text"
                          required
                          placeholder="name@school.edu.in or ADM-2026"
                          value={loginIdentifier}
                          onChange={(e) => setLoginIdentifier(e.target.value)}
                          className="w-full h-11 pl-10 pr-4 rounded-md bg-[#141414] border border-[#282828] text-sm font-medium text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-foreground" htmlFor="password">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => setAuthMode('forgot-password')}
                          className="text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="w-full h-11 pl-10 pr-11 rounded-md bg-[#141414] border border-[#282828] text-sm font-medium text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-1"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Remember me */}
                    <div className="flex items-center justify-between py-1">
                      <label className="flex items-center gap-2.5 text-xs font-medium text-muted-foreground cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="rounded-md border-border h-4 w-4 text-primary focus:ring-primary/40 cursor-pointer"
                        />
                        <span>Remember this trusted device</span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-11 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer mt-1"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="h-4 w-4" />
                          <span>Sign In to VidyaFloww</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Bottom Register Prompt */}
                  <div className="text-center pt-3 border-t border-[#222222] text-xs text-muted-foreground">
                    New Institution or Campus?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setSignupStep(1);
                        setAuthMode('signup');
                      }}
                      className="font-bold text-primary hover:underline cursor-pointer ml-1"
                    >
                      Register New Account →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  2. SIGN UP (REGISTRATION WIZARD)
                  ───────────────────────────────────────────────────────────── */}
              {authMode === 'signup' && (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Back to Sign In</span>
                    </button>
                    <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20">
                      Step {signupStep} of 4
                    </span>
                  </div>

                  <div className="text-center space-y-1">
                    <h2 className="text-xl font-black text-foreground tracking-tight">
                      {signupStep === 1 && 'Select Account Role'}
                      {signupStep === 2 && 'Personal & Campus Details'}
                      {signupStep === 3 && 'Password & Security'}
                      {signupStep === 4 && 'Verify Email OTP'}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {signupStep === 1 && 'Choose your designated institutional role'}
                      {signupStep === 2 && 'Official records matching school registrar'}
                      {signupStep === 3 && 'Encrypted credentials meeting CBSE security charter'}
                      {signupStep === 4 && `Enter 6-digit verification code for ${signupEmail || 'your email'}`}
                    </p>
                  </div>

                  {/* Step Progress Bar with rounded-md */}
                  <div className="h-1.5 w-full bg-[#181818] rounded-md overflow-hidden flex gap-1.5 border border-[#222222]">
                    <div className={cn('h-full flex-1 rounded-md transition-all', signupStep >= 1 ? 'bg-primary' : 'bg-[#181818]')} />
                    <div className={cn('h-full flex-1 rounded-md transition-all', signupStep >= 2 ? 'bg-primary' : 'bg-[#181818]')} />
                    <div className={cn('h-full flex-1 rounded-md transition-all', signupStep >= 3 ? 'bg-primary' : 'bg-[#181818]')} />
                    <div className={cn('h-full flex-1 rounded-md transition-all', signupStep >= 4 ? 'bg-primary' : 'bg-[#181818]')} />
                  </div>

                  {/* Step 1: Role Selection */}
                  {signupStep === 1 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="grid grid-cols-1 gap-2.5">
                        {[
                          { id: 'admin', title: 'School Administrator / Management', desc: 'Full institutional governance, financial oversight & reporting', icon: School },
                          { id: 'teacher', title: 'Faculty / Teaching Staff', desc: 'Student grading, attendance, timetable & assignments', icon: BookOpen },
                          { id: 'student', title: 'Enrolled Student / Pupil', desc: 'Learning materials, schedules, examination scores & profile', icon: GraduationCap },
                          { id: 'parent', title: 'Parent / Authorized Guardian', desc: 'Fee invoices, real-time bus tracking & academic monitoring', icon: Users },
                        ].map((role) => {
                          const isSelected = signupRole === role.id;
                          const Icon = role.icon;
                          return (
                            <div
                              key={role.id}
                              onClick={() => setSignupRole(role.id as any)}
                              className={cn(
                                'p-3.5 rounded-md border flex items-center gap-3.5 cursor-pointer transition-all',
                                isSelected
                                  ? 'bg-[#141414] border-primary ring-1 ring-primary shadow-xs'
                                  : 'bg-[#141414] border-[#262626] hover:bg-[#1a1a1a] hover:border-[#383838]'
                              )}
                            >
                              <div
                                className={cn(
                                  'h-9 w-9 rounded-md flex items-center justify-center shrink-0 border',
                                  isSelected
                                    ? 'bg-primary/10 text-primary border-primary/30'
                                    : 'bg-[#181818] text-muted-foreground border-[#262626]'
                                )}
                              >
                                <Icon className="h-4.5 w-4.5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs sm:text-sm font-bold text-foreground">{role.title}</p>
                                <p className="text-[11px] text-muted-foreground truncate">{role.desc}</p>
                              </div>
                              {isSelected && <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />}
                            </div>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSignupStep(2)}
                        className="w-full h-11 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer mt-2"
                      >
                        <span>Continue to Step 2</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {/* Step 2: Personal Details */}
                  {signupStep === 2 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground">Official Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Dr. Rajesh Sharma"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          className="w-full h-11 px-4 rounded-md bg-[#141414] border border-[#282828] text-xs sm:text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground">Official Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="rajesh.s@school.edu.in"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className="w-full h-11 px-4 rounded-md bg-[#141414] border border-[#282828] text-xs sm:text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-foreground">Mobile Phone</label>
                          <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={signupPhone}
                            onChange={(e) => setSignupPhone(e.target.value)}
                            className="w-full h-11 px-4 rounded-md bg-[#141414] border border-[#282828] text-xs sm:text-sm text-foreground font-mono focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-foreground">School Code / ID</label>
                          <input
                            type="text"
                            placeholder="CBSE-DEL-401"
                            value={signupSchoolCode}
                            onChange={(e) => setSignupSchoolCode(e.target.value)}
                            className="w-full h-11 px-4 rounded-md bg-[#141414] border border-[#282828] text-xs sm:text-sm text-foreground font-mono uppercase focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2.5 pt-2">
                        <button
                          type="button"
                          onClick={() => setSignupStep(1)}
                          className="w-1/3 h-11 rounded-md bg-[#141414] border border-[#262626] text-foreground font-bold text-xs hover:bg-[#1a1a1a] cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!signupName || !signupEmail) {
                              setStatusMessage({ type: 'error', text: 'Please enter your name and official email.' });
                              return;
                            }
                            setStatusMessage(null);
                            setSignupStep(3);
                          }}
                          className="flex-1 h-11 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <span>Continue to Security</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Password & Terms */}
                  {signupStep === 3 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground">Create Password *</label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            placeholder="••••••••"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            className="w-full h-11 pl-10 pr-11 rounded-md bg-[#141414] border border-[#282828] text-xs sm:text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>

                        {/* Interactive Criteria Check Grid */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div className={cn('flex items-center gap-1.5 text-[11px] font-medium', hasMinLength ? 'text-emerald-400' : 'text-muted-foreground')}>
                            <CheckCircle2 className="h-3 w-3 shrink-0" />
                            <span>8+ Characters</span>
                          </div>
                          <div className={cn('flex items-center gap-1.5 text-[11px] font-medium', hasUppercase ? 'text-emerald-400' : 'text-muted-foreground')}>
                            <CheckCircle2 className="h-3 w-3 shrink-0" />
                            <span>Uppercase Letter</span>
                          </div>
                          <div className={cn('flex items-center gap-1.5 text-[11px] font-medium', hasNumber ? 'text-emerald-400' : 'text-muted-foreground')}>
                            <CheckCircle2 className="h-3 w-3 shrink-0" />
                            <span>Number (0-9)</span>
                          </div>
                          <div className={cn('flex items-center gap-1.5 text-[11px] font-medium', hasSpecial ? 'text-emerald-400' : 'text-muted-foreground')}>
                            <CheckCircle2 className="h-3 w-3 shrink-0" />
                            <span>Symbol (!@#$)</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground">Confirm Password *</label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={signupConfirmPassword}
                            onChange={(e) => setSignupConfirmPassword(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 rounded-md bg-[#141414] border border-[#282828] text-xs sm:text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none"
                          />
                        </div>
                      </div>

                      <label className="flex items-start gap-2.5 text-xs text-muted-foreground cursor-pointer select-none pt-1">
                        <input
                          type="checkbox"
                          checked={agreedToTerms}
                          onChange={(e) => setAgreedToTerms(e.target.checked)}
                          className="rounded-md border-border h-4 w-4 text-primary mt-0.5 cursor-pointer"
                        />
                        <span className="text-[11px] leading-tight">
                          I agree to VidyaFloww Terms of Service, CBSE Student Data Privacy Charter, and cloud security guidelines.
                        </span>
                      </label>

                      <div className="flex gap-2.5 pt-2">
                        <button
                          type="button"
                          onClick={() => setSignupStep(2)}
                          className="w-1/3 h-11 rounded-md bg-[#141414] border border-[#262626] text-foreground font-bold text-xs hover:bg-[#1a1a1a] cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!signupPassword || signupPassword !== signupConfirmPassword || !isPassValid) {
                              setStatusMessage({ type: 'error', text: 'Passwords must match and satisfy all 4 security criteria.' });
                              return;
                            }
                            if (!agreedToTerms) {
                              setStatusMessage({ type: 'error', text: 'Please agree to terms and data privacy charter.' });
                              return;
                            }
                            setStatusMessage(null);
                            setSignupStep(4);
                          }}
                          className="flex-1 h-11 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <span>Send Code</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: OTP Verification */}
                  {signupStep === 4 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="p-3.5 rounded-md bg-[#141414] border border-[#262626] text-center text-xs space-y-1">
                        <p className="text-muted-foreground">Verification code sent to:</p>
                        <p className="font-mono font-bold text-foreground">{signupEmail || 'admin@school.edu.in'}</p>
                      </div>

                      <div className="flex justify-between gap-2">
                        {signupOtp.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`signup-otp-${idx}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, '');
                              const newOtp = [...signupOtp];
                              newOtp[idx] = val;
                              setSignupOtp(newOtp);
                              if (val && idx < 5) {
                                const next = document.getElementById(`signup-otp-${idx + 1}`);
                                next?.focus();
                              }
                            }}
                            className="w-12 h-13 rounded-md bg-[#141414] border border-[#282828] text-center text-xl font-mono font-black text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={async () => {
                          setIsLoading(true);
                          await new Promise((r) => setTimeout(r, 900));
                          setIsLoading(false);
                          setStatusMessage({
                            type: 'success',
                            text: 'Account created successfully! Redirecting...',
                          });
                          setTimeout(() => navigate({ to: '/' }), 700);
                        }}
                        className="w-full h-11 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-1"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>Creating account...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Verify & Complete Registration</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  3. FORGOT PASSWORD FLOW
                  ───────────────────────────────────────────────────────────── */}
              {authMode === 'forgot-password' && (
                <motion.div
                  key="forgot-password"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Back to Sign In</span>
                    </button>
                    <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20">
                      Recovery
                    </span>
                  </div>

                  <div className="text-center space-y-1">
                    <h2 className="text-xl font-black text-foreground tracking-tight">
                      {fpStep === 1 && 'Reset Password'}
                      {fpStep === 2 && 'Enter Recovery Code'}
                      {fpStep === 3 && 'New Password'}
                      {fpStep === 4 && 'Reset Complete'}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {fpStep === 1 && 'Enter your institutional email or registered phone'}
                      {fpStep === 2 && `Enter 6-digit code sent to ${fpIdentifier || 'your email'}`}
                      {fpStep === 3 && 'Set a new secure password for your account'}
                      {fpStep === 4 && 'Your password has been updated successfully.'}
                    </p>
                  </div>

                  {fpStep === 1 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground">Registered Email or Phone</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            required
                            placeholder="admin@vidyafloww.edu.in"
                            value={fpIdentifier}
                            onChange={(e) => setFpIdentifier(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 rounded-md bg-[#141414] border border-[#282828] text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={async () => {
                          if (!fpIdentifier) {
                            setStatusMessage({ type: 'error', text: 'Please enter your registered email or phone.' });
                            return;
                          }
                          setIsLoading(true);
                          await new Promise((r) => setTimeout(r, 700));
                          setIsLoading(false);
                          setStatusMessage(null);
                          setFpStep(2);
                        }}
                        className="w-full h-11 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-1"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>Sending code...</span>
                          </>
                        ) : (
                          <>
                            <KeyRound className="h-4 w-4" />
                            <span>Send Password Reset OTP</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {fpStep === 2 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex justify-between gap-2">
                        {fpOtp.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`fp-otp-${idx}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, '');
                              const newOtp = [...fpOtp];
                              newOtp[idx] = val;
                              setFpOt(newOtp);
                              if (val && idx < 5) {
                                const next = document.getElementById(`fp-otp-${idx + 1}`);
                                next?.focus();
                              }
                            }}
                            className="w-12 h-13 rounded-md bg-[#141414] border border-[#282828] text-center text-xl font-mono font-black text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setFpStep(3)}
                        className="w-full h-11 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                      >
                        <span>Verify Code & Continue</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {fpStep === 3 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground">New Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={fpNewPassword}
                            onChange={(e) => setFpNewPassword(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 rounded-md bg-[#141414] border border-[#282828] text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground">Confirm New Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={fpConfirmPassword}
                            onChange={(e) => setFpConfirmPassword(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 rounded-md bg-[#141414] border border-[#282828] text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={async () => {
                          if (!fpNewPassword || fpNewPassword !== fpConfirmPassword) {
                            setStatusMessage({ type: 'error', text: 'Passwords must match and cannot be empty.' });
                            return;
                          }
                          setIsLoading(true);
                          await new Promise((r) => setTimeout(r, 700));
                          setIsLoading(false);
                          setStatusMessage(null);
                          setFpStep(4);
                        }}
                        className="w-full h-11 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-1"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>Updating password...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Save New Password</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {fpStep === 4 && (
                    <div className="space-y-5 text-center animate-fade-in py-2">
                      <div className="h-12 w-12 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-foreground">Password Reset Successfully!</h3>
                        <p className="text-xs text-muted-foreground">
                          You may now sign in with your updated credentials.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('login');
                          setFpStep(1);
                        }}
                        className="w-full h-11 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                      >
                        <span>Proceed to Sign In</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  4. FORGOT USERNAME FLOW
                  ───────────────────────────────────────────────────────────── */}
              {authMode === 'forgot-username' && (
                <motion.div
                  key="forgot-username"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Back to Sign In</span>
                    </button>
                    <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20">
                      ID Lookup
                    </span>
                  </div>

                  <div className="text-center space-y-1">
                    <h2 className="text-xl font-black text-foreground tracking-tight">
                      {fuStep === 1 && 'Look Up Your User ID'}
                      {fuStep === 2 && 'Verify Mobile OTP'}
                      {fuStep === 3 && 'Verified Credentials'}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {fuStep === 1 && 'Enter your registered mobile number & date of birth'}
                      {fuStep === 2 && `Enter 6-digit code sent to ${fuPhone || 'your mobile'}`}
                      {fuStep === 3 && 'Here are your verified institutional credentials.'}
                    </p>
                  </div>

                  {fuStep === 1 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground">Registered Mobile Number</label>
                        <div className="relative">
                          <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={fuPhone}
                            onChange={(e) => setFuPhone(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 rounded-md bg-[#141414] border border-[#282828] text-sm font-mono text-foreground focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground">Date of Birth</label>
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="14 May 2011"
                            value={fuDob}
                            onChange={(e) => setFuDob(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 rounded-md bg-[#141414] border border-[#282828] text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={async () => {
                          if (!fuPhone) {
                            setStatusMessage({ type: 'error', text: 'Please enter your registered mobile number.' });
                            return;
                          }
                          setIsLoading(true);
                          await new Promise((r) => setTimeout(r, 700));
                          setIsLoading(false);
                          setStatusMessage(null);
                          setFuStep(2);
                        }}
                        className="w-full h-11 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-1"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>Searching records...</span>
                          </>
                        ) : (
                          <>
                            <HelpCircle className="h-4 w-4" />
                            <span>Find My User ID</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {fuStep === 2 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex justify-between gap-2">
                        {fuOtp.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`fu-otp-${idx}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, '');
                              const newOtp = [...fuOtp];
                              newOtp[idx] = val;
                              setFuOtp(newOtp);
                              if (val && idx < 5) {
                                const next = document.getElementById(`fu-otp-${idx + 1}`);
                                next?.focus();
                              }
                            }}
                            className="w-12 h-13 rounded-md bg-[#141414] border border-[#282828] text-center text-xl font-mono font-black text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setRecoveredUsername({
                            name: 'Principal Office',
                            username: 'admin@vidyafloww.edu.in',
                            role: 'School Administrator',
                            campus: 'VidyaFloww International Academy, Delhi',
                          });
                          setFuStep(3);
                        }}
                        className="w-full h-11 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                      >
                        <span>Verify Code & Reveal ID</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {fuStep === 3 && recoveredUsername && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="p-4 rounded-md bg-[#141414] border border-[#262626] space-y-3 shadow-xs">
                        <div className="flex items-center gap-3 pb-3 border-b border-[#222222]">
                          <div className="h-9 w-9 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center justify-center shrink-0">
                            <UserCheck className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-foreground">{recoveredUsername.name}</p>
                            <p className="text-[11px] text-muted-foreground">{recoveredUsername.role} · {recoveredUsername.campus}</p>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            Official Institutional ID
                          </label>
                          <div className="flex items-center justify-between p-2.5 rounded-md bg-black border border-[#242424]">
                            <span className="font-mono font-black text-sm text-primary select-all">
                              {recoveredUsername.username}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(recoveredUsername.username);
                                setCopiedText(true);
                                setTimeout(() => setCopiedText(false), 2000);
                              }}
                              className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1 px-2 py-1 rounded-md bg-[#181818] border border-[#262626] transition-colors cursor-pointer"
                            >
                              {copiedText ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                              <span>{copiedText ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setLoginIdentifier(recoveredUsername.username);
                          setAuthMode('login');
                        }}
                        className="w-full h-11 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                      >
                        <span>Sign In With This User ID</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* ═══════════════════════════════════════════════════════════════════════
          BOTTOM: SLEEK FLOATING SCHOOL LOGOS MARQUEE (MATHEMATICALLY SEAMLESS)
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-7 select-none space-y-2.5">
        <div className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/75 font-mono">
            Trusted by 150+ Leading Educational Campuses Across India
          </span>
        </div>

        {/* Floating Marquee Capsule with Soft Vanishing Fades */}
        <div
          className="relative w-full overflow-hidden py-1 group cursor-pointer"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          {/* Subtle Left and Right Vignette Overlays for Extra Smoothness */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Single continuous track containing 2 identical sets (never overlaps, never empty) */}
          <div className="animate-marquee flex gap-3 items-center group-hover:[animation-play-state:paused] pr-3">
            {[
              ...TRUSTED_INSTITUTIONS,
              ...TRUSTED_INSTITUTIONS,
              ...TRUSTED_INSTITUTIONS,
              ...TRUSTED_INSTITUTIONS,
            ].map((inst, i) => {
              const Icon = inst.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#121212] border border-[#222222] text-xs font-semibold text-foreground/90 shadow-xs hover:border-primary/60 hover:text-primary transition-colors whitespace-nowrap shrink-0 hover:bg-[#181818] cursor-pointer"
                >
                  <div className="h-4 w-4 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon className="h-2.5 w-2.5" />
                  </div>
                  <span className="font-bold text-xs">{inst.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
