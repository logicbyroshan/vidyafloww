import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFCard,
  VFButton,
  VFBadge,
} from '@vidyafloww/ui';
import {
  ShieldCheck,
  Key,
  Server,
  MessageSquare,
  Smartphone,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  Eye,
  EyeOff,
  Download,
  RefreshCw,
  HardDrive,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/license')({
  component: LicenseManagementPage,
});

function LicenseManagementPage() {
  const { schoolProfile } = useGlobalStore();
  const [copied, setCopied] = React.useState(false);
  const [showKey, setShowKey] = React.useState(false);
  const [toast, setToast] = React.useState<string | null>(null);

  const licenseKey = 'VFL-2026-SA98-CBSE-9481-DELHI';

  const handleCopyKey = () => {
    navigator.clipboard.writeText(licenseKey);
    setCopied(true);
    setToast('License key copied to clipboard.');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <VFPageContainer className="space-y-4 max-w-7xl mx-auto py-2">
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border/80 bg-card shadow-xs">
        <div className="flex items-center gap-3.5">
          <Link to="/">
            <VFButton
              size="sm"
              variant="outline"
              className="h-9 px-3 bg-[#141414] hover:bg-[#1f1f1f] text-foreground border-border cursor-pointer shadow-xs"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Dashboard
            </VFButton>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-foreground tracking-tight">Institutional License & Quotas</h2>
              <VFBadge variant="success" className="text-xs font-bold font-mono">
                Enterprise Active
              </VFBadge>
            </div>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">
              Manage school subscription tier, cloud token balances, communication gateways, and security keys.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <VFButton
            size="sm"
            variant="outline"
            className="h-9 px-3.5 text-xs font-bold bg-[#141414] hover:bg-[#1f1f1f] border-border"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={() => setToast('Downloaded institutional license verification certificate.')}
          >
            Certificate
          </VFButton>
          <VFButton
            size="sm"
            className="h-9 px-4 text-xs font-bold"
            leftIcon={<RefreshCw className="h-4 w-4" />}
            onClick={() => setToast('Refreshed license telemetry and token balances.')}
          >
            Sync Quotas
          </VFButton>
        </div>
      </div>

      {/* Action Notice Toast */}
      {toast && (
        <div className="p-3.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{toast}</span>
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-muted-foreground hover:text-foreground text-xs font-black cursor-pointer px-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main License Grid: Top Status Overview + Quotas & Key Vault */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Subscription Tier & Validity */}
        <VFCard
          title="Subscription & Validity"
          description="Active institutional enterprise entitlement."
          actions={<VFBadge variant="success" className="text-xs font-bold">225 Days Left</VFBadge>}
          bodyClassName="p-4 space-y-3"
        >
          <div className="p-3.5 rounded-md bg-[#161616] border border-border flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-black text-foreground">{schoolProfile.name}</p>
              <p className="text-xs text-muted-foreground font-mono">{schoolProfile.affiliation}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded bg-[#141414] border border-border">
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">Renewal Date</span>
              <span className="text-xs font-black text-foreground font-mono">March 31, 2027</span>
            </div>
            <div className="p-2.5 rounded bg-[#141414] border border-border">
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">Status</span>
              <span className="text-xs font-bold text-emerald-400">Auto-Renew ON</span>
            </div>
          </div>
        </VFCard>

        {/* Card 2: Student & Staff Capacity */}
        <VFCard
          title="Licensed Seat Capacity"
          description="Active student & faculty user allocations."
          actions={<VFBadge variant="primary" className="text-xs font-bold">50% Enrolled</VFBadge>}
          bodyClassName="p-4 space-y-3"
        >
          <div className="p-3.5 rounded-md bg-[#161616] border border-border flex items-center justify-between">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">Student Dossiers</span>
              <p className="text-xl font-black text-foreground">1,248 <span className="text-xs text-muted-foreground font-normal">/ 2,500 Max</span></p>
            </div>
            <div className="h-9 w-9 rounded-md bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Server className="h-4.5 w-4.5" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded bg-[#141414] border border-border">
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">Teacher Seats</span>
              <span className="text-xs font-black text-foreground">94 / 150</span>
            </div>
            <div className="p-2.5 rounded bg-[#141414] border border-border">
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">Admin Roles</span>
              <span className="text-xs font-black text-foreground">8 / 15</span>
            </div>
          </div>
        </VFCard>

        {/* Card 3: Security & Encryption Standard */}
        <VFCard
          title="Security & Cloud Vault"
          description="Institutional data integrity & compliance."
          actions={<VFBadge variant="success" className="text-xs font-bold">Online</VFBadge>}
          bodyClassName="p-4 space-y-3"
        >
          <div className="p-3.5 rounded-md bg-[#161616] border border-border flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-black text-foreground">AES-256 Cloud Vault</p>
              <p className="text-xs text-muted-foreground">SOC-2 Type II Certified</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded bg-[#141414] border border-border">
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">Cloud Backup</span>
              <span className="text-xs font-bold text-emerald-400">Daily Automated</span>
            </div>
            <div className="p-2.5 rounded bg-[#141414] border border-border">
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">Data Center</span>
              <span className="text-xs font-mono font-bold text-foreground">ap-south-1 (Mumbai)</span>
            </div>
          </div>
        </VFCard>

      </div>

      {/* Monthly Communication & Compute Quota Meters */}
      <VFCard
        title="Monthly Quotas & Communication Gateways"
        description="Current monthly dispatch metrics and compute token balances. Quotas reset automatically on the 1st of each month."
        actions={<span className="text-xs font-bold text-emerald-400 font-mono">Resets Sep 1</span>}
        bodyClassName="p-5 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* WhatsApp Messages */}
          <div className="p-3.5 rounded-md bg-[#161616] border border-border space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-2 text-foreground">
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                WhatsApp Broadcast Messages
              </span>
              <span className="font-mono text-xs text-emerald-400 font-bold">
                8,450 <span className="text-muted-foreground font-normal">/ 10,000 (84.5%)</span>
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#262626] overflow-hidden">
              <div className="h-full rounded-full bg-emerald-400 transition-all duration-300" style={{ width: '84.5%' }} />
            </div>
            <p className="text-[11px] text-muted-foreground">Used for fee receipts, emergency circulars, and attendance alerts.</p>
          </div>

          {/* SMS Messages */}
          <div className="p-3.5 rounded-md bg-[#161616] border border-border space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-2 text-foreground">
                <Smartphone className="h-4 w-4 text-emerald-400" />
                SMS Gateway Dispatches
              </span>
              <span className="font-mono text-xs text-emerald-400 font-bold">
                24,200 <span className="text-muted-foreground font-normal">/ 30,000 (80.6%)</span>
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#262626] overflow-hidden">
              <div className="h-full rounded-full bg-emerald-400 transition-all duration-300" style={{ width: '80.6%' }} />
            </div>
            <p className="text-[11px] text-muted-foreground">DLT registered transactional gateway for OTPs and notifications.</p>
          </div>

          {/* Cloud Processing Tokens */}
          <div className="p-3.5 rounded-md bg-[#161616] border border-border space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-2 text-foreground">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                Cloud Processing & Sync Tokens
              </span>
              <span className="font-mono text-xs text-emerald-400 font-bold">
                412,500 <span className="text-muted-foreground font-normal">/ 500,000 (82.5%)</span>
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#262626] overflow-hidden">
              <div className="h-full rounded-full bg-emerald-400 transition-all duration-300" style={{ width: '82.5%' }} />
            </div>
            <p className="text-[11px] text-muted-foreground">Document indexing, automated report generation, and multi-campus synchronization.</p>
          </div>

          {/* Cloud Storage */}
          <div className="p-3.5 rounded-md bg-[#161616] border border-border space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-2 text-foreground">
                <HardDrive className="h-4 w-4 text-emerald-400" />
                Cloud Document & Photo Storage
              </span>
              <span className="font-mono text-xs text-emerald-400 font-bold">
                48.2 GB <span className="text-muted-foreground font-normal">/ 100 GB (48.2%)</span>
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#262626] overflow-hidden">
              <div className="h-full rounded-full bg-emerald-400 transition-all duration-300" style={{ width: '48.2%' }} />
            </div>
            <p className="text-[11px] text-muted-foreground">Student dossiers, photo archives, and institutional PDF registers.</p>
          </div>
        </div>
      </VFCard>

      {/* License Key & Cryptographic Serial Vault */}
      <VFCard
        title="License Key & API Credentials"
        description="Institutional master license identifier used for cluster authentication and offline validation."
        bodyClassName="p-5 space-y-4"
      >
        <div className="p-3.5 rounded-md bg-[#161616] border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-[#222222] border border-border flex items-center justify-center shrink-0">
              <Key className="h-4.5 w-4.5 text-primary" />
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">Enterprise License Key</span>
              <span className="text-sm font-mono font-black text-foreground">
                {showKey ? licenseKey : 'VFL-••••-••••-CBSE-••••-DELHI'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowKey(!showKey)}
              className="h-8 px-2.5 text-xs font-bold rounded border border-border bg-[#141414] hover:bg-[#1f1f1f] text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {showKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              {showKey ? 'Hide' : 'Reveal'}
            </button>
            <button
              onClick={handleCopyKey}
              className="h-8 px-3 text-xs font-bold rounded border border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy Key'}
            </button>
          </div>
        </div>
      </VFCard>
    </VFPageContainer>
  );
}
