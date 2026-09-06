import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFCard,
  VFButton,
  VFBadge,
  VFDialog,
  VFInput,
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
  CreditCard,
  Building,
  Receipt,
  Edit3,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

export const Route = createFileRoute('/license')({
  component: LicenseManagementPage,
});

interface InvoiceRecord {
  id: string;
  invoiceNo: string;
  date: string;
  amount: string;
  description: string;
  method: string;
  status: 'Paid' | 'Processing' | 'Scheduled';
  receiptUrl?: string;
}

const INVOICE_HISTORY: InvoiceRecord[] = [
  {
    id: '1',
    invoiceNo: 'INV-2026-0891',
    date: '01 Apr 2026',
    amount: '₹ 2,40,000',
    description: 'Annual Enterprise Tier Subscription (2026–2027)',
    method: 'Visa Corp •••• 4242',
    status: 'Paid',
  },
  {
    id: '2',
    invoiceNo: 'INV-2025-0742',
    date: '01 Apr 2025',
    amount: '₹ 2,10,000',
    description: 'Annual Enterprise Tier Subscription (2025–2026)',
    method: 'Visa Corp •••• 4242',
    status: 'Paid',
  },
  {
    id: '3',
    invoiceNo: 'INV-2024-0518',
    date: '01 Apr 2024',
    amount: '₹ 1,80,000',
    description: 'Standard Campus License (2024–2025)',
    method: 'Corporate NetBanking (HDFC)',
    status: 'Paid',
  },
];

const ENTERPRISE_FEATURES = [
  { title: 'Unlimited Students & Faculty Portals', desc: 'No per-seat barrier across student, parent, and teacher apps.' },
  { title: 'Multi-Campus Realtime Sync', desc: 'Synchronize student dossiers, marks, and rosters across all branches.' },
  { title: 'CBSE / State Board Compliance Audit Engine', desc: 'Automated 1-click export of official government format registries.' },
  { title: 'Dedicated Institutional Account Manager', desc: 'Direct 24/7 priority SLA support line and technical onboarding.' },
  { title: 'Biometric & RFID Attendance Integration', desc: 'Realtime hardware terminal API webhooks and auto-SMS triggers.' },
  { title: '99.99% Guaranteed Cloud Uptime SLA', desc: 'SOC-2 Type II certified encrypted cloud infrastructure in Mumbai.' },
];

function LicenseManagementPage() {
  const { schoolProfile, addNotification } = useGlobalStore();
  const { t, lang } = useTranslation();
  const isHindi = lang === 'hi';
  React.useEffect(() => { document.title = t('nav.license') + ' \u2013 VidyaFloww'; }, [t]);
  const [copied, setCopied] = React.useState(false);
  const [showKey, setShowKey] = React.useState(false);
  const [isUpdateCardModalOpen, setIsUpdateCardModalOpen] = React.useState(false);
  const [cardholderName, setCardholderName] = React.useState('VidyaFloww International Academy');
  const [cardNumber, setCardNumber] = React.useState('•••• •••• •••• 4242');
  const [expiryDate, setExpiryDate] = React.useState('08/29');

  const licenseKey = 'VFL-2026-SA98-CBSE-9481-DELHI';

  const handleCopyKey = () => {
    navigator.clipboard.writeText(licenseKey);
    setCopied(true);
    addNotification({
      title: 'License Key Copied',
      description: 'Master enterprise key copied to clipboard.',
      type: 'success',
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSyncQuotas = () => {
    addNotification({
      title: 'Quotas Synchronized',
      description: 'Refreshed cloud tokens, WhatsApp broadcast credits, and storage metrics.',
      type: 'info',
    });
  };

  const handleDownloadCertificate = () => {
    addNotification({
      title: 'Certificate Generated',
      description: `Official digital entitlement certificate for ${schoolProfile.name} ready.`,
      type: 'success',
    });
  };

  const handleDownloadInvoice = (invoiceNo: string) => {
    addNotification({
      title: 'Invoice Downloaded',
      description: `Tax invoice ${invoiceNo} downloaded as PDF with GSTIN receipt.`,
      type: 'success',
    });
  };

  return (
    <VFPageContainer className="space-y-4 w-full">
      {/* 1. TOP STATUS & NAVIGATION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 p-4 rounded-lg border border-border bg-[#101010] shadow-xs shrink-0">
        <div className="flex items-center gap-3.5">
          <Link to="/">
            <VFButton
              size="sm"
              variant="outline"
              className="h-9 px-3 bg-[#141414] hover:bg-[#1f1f1f] text-foreground border-border cursor-pointer shadow-xs"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              {t('nav.dashboard')}
            </VFButton>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-foreground tracking-tight">
                {isHindi ? 'संस्थागत लाइसेंस व बिलिंग' : 'Institutional License & Billing'}
              </h2>
              <VFBadge variant="success" className="text-xs font-bold font-mono">
                {isHindi ? 'एंटरप्राइज एक्टिव' : 'Enterprise Active'}
              </VFBadge>
            </div>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">
              {isHindi
                ? 'स्कूल सब्सक्रिप्शन प्लान, पेमेंट के तरीके, इनवॉइस हिस्ट्री, टोकन बैलेंस और सिक्योरिटी कीज।'
                : 'School subscription tier, payment methods, invoice history, token balances, and security keys.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <VFButton
            size="sm"
            variant="outline"
            className="h-9 px-3.5 text-xs font-bold bg-[#141414] hover:bg-[#1f1f1f] border-border"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={handleDownloadCertificate}
          >
            {isHindi ? 'लाइसेंस सर्टिफिकेट' : 'Entitlement Certificate'}
          </VFButton>
          <VFButton
            size="sm"
            className="h-9 px-4 text-xs font-bold"
            leftIcon={<RefreshCw className="h-4 w-4" />}
            onClick={handleSyncQuotas}
          >
            {isHindi ? 'कोटा सिंक करें' : 'Sync Quotas'}
          </VFButton>
        </div>
      </div>

      {/* Main Content Container — Natural flow matching page scroll */}
      <div className="space-y-4">
        
        {/* 2. TOP OVERVIEW KPI CARDS (Subscription, Capacity, Security) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Subscription Tier & Validity */}
          <VFCard
            title={isHindi ? 'सब्सक्रिप्शन व वैधता' : 'Subscription & Validity'}
            description={isHindi ? 'सक्रिय संस्थागत एंटरप्राइज सदस्यता।' : 'Active institutional enterprise entitlement.'}
            actions={<VFBadge variant="success" className="text-xs font-bold">{isHindi ? '225 दिन शेष' : '225 Days Left'}</VFBadge>}
            className="bg-[#0d0d0d] border-border/90"
            bodyClassName="p-4 space-y-3"
          >
            <div className="p-3.5 rounded-lg bg-[#141414] border border-[#242424] flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-foreground truncate">{schoolProfile.name}</p>
                <p className="text-xs text-muted-foreground font-mono truncate">{schoolProfile.affiliation}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-md bg-[#141414] border border-[#242424]">
                <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                  {isHindi ? 'नवीनीकरण तिथि' : 'Renewal Date'}
                </span>
                <span className="text-xs font-black text-foreground font-mono">March 31, 2027</span>
              </div>
              <div className="p-2.5 rounded-md bg-[#141414] border border-[#242424]">
                <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                  {isHindi ? 'प्लान दर' : 'Plan Rate'}
                </span>
                <span className="text-xs font-black text-emerald-400 font-mono">₹ 2,40,000 / Yr</span>
              </div>
            </div>
          </VFCard>

          {/* Card 2: Student & Staff Capacity */}
          <VFCard
            title={isHindi ? 'लाइसेंस्ड सीट क्षमता' : 'Licensed Seat Capacity'}
            description={isHindi ? 'सक्रिय छात्र व शिक्षक सीट आवंटन।' : 'Active student & faculty user allocations.'}
            actions={<VFBadge variant="primary" className="text-xs font-bold font-mono">{isHindi ? '50% नामांकित' : '50% Enrolled'}</VFBadge>}
            className="bg-[#0d0d0d] border-border/90"
            bodyClassName="p-4 space-y-3"
          >
            <div className="p-3.5 rounded-lg bg-[#141414] border border-[#242424] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                  {isHindi ? 'छात्र प्रोफाइल' : 'Student Dossiers'}
                </span>
                <p className="text-xl font-black text-foreground font-mono">
                  1,248 <span className="text-xs text-muted-foreground font-normal">/ 2,500 Max</span>
                </p>
              </div>
              <div className="h-9 w-9 rounded-md bg-[#1c1c1c] text-primary border border-border flex items-center justify-center shrink-0">
                <Server className="h-4.5 w-4.5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-md bg-[#141414] border border-[#242424]">
                <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                  {isHindi ? 'शिक्षक सीटें' : 'Teacher Seats'}
                </span>
                <span className="text-xs font-black text-foreground font-mono">94 / 150</span>
              </div>
              <div className="p-2.5 rounded-md bg-[#141414] border border-[#242424]">
                <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                  {isHindi ? 'एडमिन रोल्स' : 'Admin Roles'}
                </span>
                <span className="text-xs font-black text-foreground font-mono">8 / 15</span>
              </div>
            </div>
          </VFCard>

          {/* Card 3: Security & Encryption Standard */}
          <VFCard
            title={isHindi ? 'सुरक्षा व क्लाउड वॉल्ट' : 'Security & Cloud Vault'}
            description={isHindi ? 'संस्थागत डेटा सुरक्षा व कंप्लायंस।' : 'Institutional data integrity & compliance.'}
            actions={<VFBadge variant="success" className="text-xs font-bold">{isHindi ? 'ऑनलाइन' : 'Online'}</VFBadge>}
            className="bg-[#0d0d0d] border-border/90"
            bodyClassName="p-4 space-y-3"
          >
            <div className="p-3.5 rounded-lg bg-[#141414] border border-[#242424] flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-black text-foreground">AES-256 Cloud Vault</p>
                <p className="text-xs text-muted-foreground">SOC-2 Type II Certified</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-md bg-[#141414] border border-[#242424]">
                <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                  {isHindi ? 'क्लाउड बैकअप' : 'Cloud Backup'}
                </span>
                <span className="text-xs font-bold text-emerald-400">{isHindi ? 'दैनिक स्वचालित' : 'Daily Automated'}</span>
              </div>
              <div className="p-2.5 rounded-md bg-[#141414] border border-[#242424]">
                <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                  {isHindi ? 'डेटा सेंटर' : 'Data Center'}
                </span>
                <span className="text-xs font-mono font-bold text-foreground">ap-south-1 (Mumbai)</span>
              </div>
            </div>
          </VFCard>
        </div>

        {/* 3. BILLING, UPCOMING PAYMENTS & SAVED PAYMENT METHODS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Upcoming Payments & Saved Card (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <VFCard
              title={
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4.5 w-4.5 text-primary" />
                  <span className="text-base font-extrabold text-foreground">Upcoming Payments & Card Info</span>
                </div>
              }
              description="Saved corporate payment methods and upcoming automatic renewal schedule."
              actions={
                <VFButton
                  size="sm"
                  variant="outline"
                  leftIcon={<Edit3 className="h-3.5 w-3.5" />}
                  onClick={() => setIsUpdateCardModalOpen(true)}
                  className="h-8 px-2.5 text-xs font-bold"
                >
                  Manage Payment Method
                </VFButton>
              }
              className="bg-[#0d0d0d] border-border/90"
              bodyClassName="p-4 space-y-3.5"
            >
              {/* Upcoming Payment Box */}
              <div className="p-4 rounded-lg bg-[#141414] border border-[#242424] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Next Scheduled Invoice</span>
                    <VFBadge variant="outline" className="text-[10px] font-mono text-emerald-400 border-emerald-500/30 bg-emerald-500/10 font-bold">
                      Auto-Debit Active
                    </VFBadge>
                  </div>
                  <p className="text-xl font-black text-foreground font-mono">₹ 2,40,000</p>
                  <p className="text-xs text-muted-foreground font-medium">
                    Due on <span className="text-foreground font-bold font-mono">March 31, 2027</span> for Annual Enterprise Renewal (2027–2028).
                  </p>
                </div>
                <div className="p-2.5 rounded-md bg-[#1a1a1a] border border-[#282828] text-right shrink-0">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold block">Billed To</span>
                  <span className="text-xs font-mono font-bold text-foreground">HDFC Visa •••• 4242</span>
                </div>
              </div>

              {/* Saved Payment Methods List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                  Saved Payment Methods
                </span>

                {/* Primary Card */}
                <div className="p-3 rounded-lg bg-[#141414] border border-[#242424] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-14 rounded-md bg-[#1f1f1f] border border-[#2e2e2e] flex flex-col items-center justify-center text-[10px] font-black text-white font-mono shrink-0 shadow-xs">
                      VISA
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs sm:text-sm font-bold text-foreground font-mono">{cardNumber}</p>
                        <VFBadge variant="success" className="text-[9px] font-extrabold uppercase py-0.2">
                          Default
                        </VFBadge>
                      </div>
                      <p className="text-[11px] text-muted-foreground font-medium">
                        Expires {expiryDate} · {cardholderName}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsUpdateCardModalOpen(true)}
                    className="text-xs font-bold text-primary hover:underline px-2 py-1 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

                {/* Backup Bank Transfer */}
                <div className="p-3 rounded-lg bg-[#141414] border border-[#242424] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-14 rounded-md bg-[#1f1f1f] border border-[#2e2e2e] flex flex-col items-center justify-center text-[9px] font-bold text-muted-foreground uppercase shrink-0">
                      NEFT/RTGS
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-foreground">HDFC Bank Corporate Current A/C</p>
                      <p className="text-[11px] text-muted-foreground font-mono">Account No. ••••••••••1048 · IFSC HDFC0000240</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">Backup</span>
                </div>
              </div>
            </VFCard>
          </div>

          {/* Legal Entity & Tax Profile (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <VFCard
              title={
                <div className="flex items-center gap-2">
                  <Building className="h-4.5 w-4.5 text-primary" />
                  <span className="text-base font-extrabold text-foreground">Billing Entity & Tax Details</span>
                </div>
              }
              description="Official institutional invoicing records for GST and tax compliance."
              className="bg-[#0d0d0d] border-border/90 h-full flex flex-col"
              bodyClassName="p-4 space-y-3 flex-1 flex flex-col justify-between"
            >
              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-md bg-[#141414] border border-[#242424]">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold block">Legal Institution Name</span>
                  <span className="text-xs font-bold text-foreground">{schoolProfile.name} Pvt. Ltd.</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-md bg-[#141414] border border-[#242424]">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">GSTIN / Tax ID</span>
                    <span className="text-xs font-mono font-bold text-foreground">07AAAAA1234A1Z5</span>
                  </div>
                  <div className="p-2.5 rounded-md bg-[#141414] border border-[#242424]">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">PAN Identifier</span>
                    <span className="text-xs font-mono font-bold text-foreground">AAACV1234A</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-md bg-[#141414] border border-[#242424]">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold block">Billing Contact Email</span>
                  <span className="text-xs font-mono text-foreground">finance@vidyafloww.edu.in</span>
                </div>
                <div className="p-2.5 rounded-md bg-[#141414] border border-[#242424]">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold block">Registered Billing Address</span>
                  <span className="text-xs text-muted-foreground">Plot 4, Institutional Area, Vasant Kunj, New Delhi 110070</span>
                </div>
              </div>

              <p className="text-[11px] text-muted-foreground font-medium pt-2 border-t border-[#202020]">
                Need changes to your legal tax invoicing info? Contact support at <span className="text-primary font-mono">support@vidyafloww.edu.in</span>.
              </p>
            </VFCard>
          </div>
        </div>

        {/* 4. PAYMENT HISTORY & OFFICIAL INVOICES (LAST PAYMENTS) */}
        <VFCard
          title={
            <div className="flex items-center gap-2">
              <Receipt className="h-4.5 w-4.5 text-primary" />
              <span className="text-base font-extrabold text-foreground">Payment History & Tax Invoices</span>
            </div>
          }
          description="Official historical payment records with itemized tax breakdowns and downloadable receipts."
          actions={
            <VFButton
              size="sm"
              variant="outline"
              className="h-8 px-3 text-xs font-bold"
              leftIcon={<Download className="h-3.5 w-3.5" />}
              onClick={() => {
                addNotification({
                  title: 'Archive Export Started',
                  description: 'All past invoices compiled into ZIP package.',
                  type: 'success',
                });
              }}
            >
              Download All Invoices
            </VFButton>
          }
          className="bg-[#0d0d0d] border-border/90"
          bodyClassName="p-0 overflow-hidden"
        >
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#242424] bg-[#121212] text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">{isHindi ? 'इनवॉइस #' : 'Invoice #'}</th>
                  <th className="py-3 px-4">{t('col.date')}</th>
                  <th className="py-3 px-4">{t('col.description')}</th>
                  <th className="py-3 px-4">{t('col.amount')}</th>
                  <th className="py-3 px-4">{isHindi ? 'पेमेंट मेथड' : 'Payment Method'}</th>
                  <th className="py-3 px-4">{t('col.status')}</th>
                  <th className="py-3 px-4 text-right">{t('col.action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c1c1c] text-foreground font-medium">
                {INVOICE_HISTORY.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#141414] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-foreground">{inv.invoiceNo}</td>
                    <td className="py-3.5 px-4 font-mono text-muted-foreground">{inv.date}</td>
                    <td className="py-3.5 px-4 text-foreground font-semibold">{inv.description}</td>
                    <td className="py-3.5 px-4 font-mono font-extrabold text-foreground">{inv.amount}</td>
                    <td className="py-3.5 px-4 font-mono text-xs text-muted-foreground">{inv.method}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <Check className="h-3 w-3" /> {inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDownloadInvoice(inv.invoiceNo)}
                        className="inline-flex items-center gap-1 h-7 px-2.5 rounded text-xs font-bold text-primary hover:bg-primary/10 border border-primary/30 transition-colors cursor-pointer"
                      >
                        <Download className="h-3 w-3" /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </VFCard>

        {/* 5. MONTHLY COMMUNICATION & COMPUTE QUOTA METERS */}
        <VFCard
          title="Monthly Quotas & Gateway Metrics"
          description="Current monthly dispatch metrics and compute token balances. Quotas reset automatically on the 1st of each month."
          actions={<span className="text-xs font-bold text-emerald-400 font-mono">Resets Sep 1</span>}
          className="bg-[#0d0d0d] border-border/90"
          bodyClassName="p-4 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* WhatsApp Messages */}
            <div className="p-3.5 rounded-lg bg-[#141414] border border-[#242424] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-2 text-foreground">
                  <MessageSquare className="h-4 w-4 text-emerald-400" />
                  WhatsApp Broadcast Messages
                </span>
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  8,450 <span className="text-muted-foreground font-normal">/ 10,000 (84.5%)</span>
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#242424] overflow-hidden">
                <div className="h-full rounded-full bg-emerald-400 transition-all duration-300" style={{ width: '84.5%' }} />
              </div>
              <p className="text-[11px] text-muted-foreground">Used for fee receipts, emergency circulars, and attendance alerts.</p>
            </div>

            {/* SMS Messages */}
            <div className="p-3.5 rounded-lg bg-[#141414] border border-[#242424] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-2 text-foreground">
                  <Smartphone className="h-4 w-4 text-emerald-400" />
                  SMS Gateway Dispatches
                </span>
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  24,200 <span className="text-muted-foreground font-normal">/ 30,000 (80.6%)</span>
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#242424] overflow-hidden">
                <div className="h-full rounded-full bg-emerald-400 transition-all duration-300" style={{ width: '80.6%' }} />
              </div>
              <p className="text-[11px] text-muted-foreground">DLT registered transactional gateway for OTPs and notifications.</p>
            </div>

            {/* Cloud Processing Tokens */}
            <div className="p-3.5 rounded-lg bg-[#141414] border border-[#242424] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-2 text-foreground">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  Cloud Processing & Sync Tokens
                </span>
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  412,500 <span className="text-muted-foreground font-normal">/ 500,000 (82.5%)</span>
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#242424] overflow-hidden">
                <div className="h-full rounded-full bg-emerald-400 transition-all duration-300" style={{ width: '82.5%' }} />
              </div>
              <p className="text-[11px] text-muted-foreground">Document indexing, automated report generation, and multi-campus synchronization.</p>
            </div>

            {/* Cloud Storage */}
            <div className="p-3.5 rounded-lg bg-[#141414] border border-[#242424] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-2 text-foreground">
                  <HardDrive className="h-4 w-4 text-emerald-400" />
                  Cloud Document & Photo Storage
                </span>
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  48.2 GB <span className="text-muted-foreground font-normal">/ 100 GB (48.2%)</span>
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#242424] overflow-hidden">
                <div className="h-full rounded-full bg-emerald-400 transition-all duration-300" style={{ width: '48.2%' }} />
              </div>
              <p className="text-[11px] text-muted-foreground">Student dossiers, photo archives, and institutional PDF registers.</p>
            </div>
          </div>
        </VFCard>

        {/* 6. ENTERPRISE PLAN INCLUSIONS */}
        <VFCard
          title="Enterprise Tier Inclusions & Institutional Entitlements"
          description="Everything included in your active enterprise school management subscription."
          className="bg-[#0d0d0d] border-border/90"
          bodyClassName="p-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {ENTERPRISE_FEATURES.map((feat, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#141414] border border-[#242424] space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <p className="text-xs font-bold text-foreground">{feat.title}</p>
                </div>
                <p className="text-[11px] text-muted-foreground pl-6">{feat.desc}</p>
              </div>
            ))}
          </div>
        </VFCard>

        {/* 7. LICENSE KEY & API SERIAL VAULT */}
        <VFCard
          title="License Key & Cryptographic Serial Vault"
          description="Institutional master license identifier used for cluster authentication and offline validation."
          className="bg-[#0d0d0d] border-border/90"
          bodyClassName="p-4 space-y-3"
        >
          <div className="p-3.5 rounded-lg bg-[#141414] border border-[#242424] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-md bg-[#1e1e1e] border border-[#2c2c2c] flex items-center justify-center shrink-0">
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
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="h-8 px-2.5 text-xs font-bold rounded border border-border bg-[#181818] hover:bg-[#222222] text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {showKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                {showKey ? 'Hide' : 'Reveal'}
              </button>
              <button
                type="button"
                onClick={handleCopyKey}
                className="h-8 px-3 text-xs font-bold rounded border border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy Key'}
              </button>
            </div>
          </div>
        </VFCard>

      </div>

      {/* 8. UPDATE PAYMENT METHOD MODAL */}
      <VFDialog
        isOpen={isUpdateCardModalOpen}
        onClose={() => setIsUpdateCardModalOpen(false)}
        title="Update Corporate Payment Method"
        description="Add or update corporate credit card for automatic license billing and quota refills."
        className="max-w-md"
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsUpdateCardModalOpen(false)}
            >
              Cancel
            </VFButton>
            <VFButton
              size="sm"
              onClick={() => {
                setIsUpdateCardModalOpen(false);
                addNotification({
                  title: 'Payment Method Updated',
                  description: `Corporate card ending in ${cardNumber.slice(-4)} set as default payment method.`,
                  type: 'success',
                });
              }}
            >
              Save Payment Method
            </VFButton>
          </div>
        }
      >
        <div className="space-y-4 py-2">
          <VFInput
            label="Cardholder Name"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="Official Institution / Trustee Name"
          />
          <VFInput
            label="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="16-Digit Corporate Card Number"
          />
          <div className="grid grid-cols-2 gap-3">
            <VFInput
              label="Expiry (MM/YY)"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
            />
            <VFInput
              label="CVV / CVC"
              type="password"
              defaultValue="•••"
              placeholder="3 Digits"
            />
          </div>
          <div className="p-3 rounded bg-[#141414] border border-[#242424] flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>PCI-DSS Level 1 Encrypted Vault. Card is verified with a ₹2 reversible authorization.</span>
          </div>
        </div>
      </VFDialog>
    </VFPageContainer>
  );
}
