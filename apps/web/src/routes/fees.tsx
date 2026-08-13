import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFInput,
  VFSelect,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  CircleDollarSign,
  FileText,
  TrendingUp,
  Award,
  Users,
  SlidersHorizontal,
  Plus,
  Send,
  AlertCircle,
  Download,
  Landmark,
  Receipt,
  CreditCard,
  ShieldCheck,
  BarChart3,
  Calendar,
} from 'lucide-react';

export const Route = createFileRoute('/fees')({
  component: FeesPage,
});

function FeesPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const feeData = [
    { code: 'FEE-2026-T1', name: 'Term 1 Tuition & Computer Fee', amount: '₹14,500', class: 'Class 9', dueDate: '31 Aug 2026', collected: '₹5,80,000', status: 'Active' },
    { code: 'FEE-2026-ADM', name: 'Annual Admission & Activity Fee', amount: '₹8,000', class: 'All New Students', dueDate: '30 Jun 2026', collected: '₹3,20,000', status: 'Active' },
    { code: 'FEE-2026-BUS', name: 'Quarterly Transport Fee (Route 4)', amount: '₹3,500', class: 'Bus Users', dueDate: '15 Aug 2026', collected: '₹1,40,000', status: 'Active' },
  ];

  const feeColumns = [
    { header: 'Fee Code', accessorKey: 'code', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.code}</span> },
    { header: 'Fee Head Name', accessorKey: 'name', cell: (r: any) => <span className="font-bold text-foreground">{r.name}</span> },
    { header: 'Amount per Student', accessorKey: 'amount', cell: (r: any) => <span className="font-mono font-bold text-foreground">{r.amount}</span> },
    { header: 'Applicable Grade', accessorKey: 'class' },
    { header: 'Due Date', accessorKey: 'dueDate' },
    { header: 'Total Collected', accessorKey: 'collected', cell: (r: any) => <span className="font-mono font-bold text-emerald-500">{r.collected}</span> },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Finance Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Fee Collections" value="₹42,80,000" icon={<CircleDollarSign className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="92.4% Collected" />
        <VFStatCard title="Outstanding Dues" value="₹3,40,000" icon={<AlertCircle className="h-5 w-5 text-amber-500" />} trend="down" trendLabel="24 Defaulters" />
        <VFStatCard title="Concessions & Discounts" value="₹1,80,000" icon={<Award className="h-5 w-5 text-primary" />} description="18 Merit Scholarships" />
        <VFStatCard title="Bank Account Balance" value="₹68,50,000" icon={<Landmark className="h-5 w-5 text-purple-500" />} description="HDFC School Account" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Fee Structure
  // ----------------------------------------------------
  const structureContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Grade-Wise Fee Structure Matrix</h3>
          <p className="text-xs text-muted-foreground">Configure tuition fees, lab fees, computer fees, and activity charges.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Fee Structure</VFButton>
      </div>
      <VFDataTable columns={feeColumns} data={feeData} filterPlaceholder="Search fee name..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Fee Types
  // ----------------------------------------------------
  const typesContent = (
    <div className="space-y-4">
      <VFCard title="Fee Category & Head Master Catalog">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mt-2">
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Tuition Fee</span>
            <p className="text-muted-foreground text-xs mt-1">Recurring Termly · Mandatory Core</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Transport Fee</span>
            <p className="text-muted-foreground text-xs mt-1">Distance Slab Based · Optional</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Hostel & Mess Fee</span>
            <p className="text-muted-foreground text-xs mt-1">Quarterly · Residential Option</p>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Student Fee Assignment
  // ----------------------------------------------------
  const assignmentContent = (
    <div className="space-y-4">
      <VFCard title="Student Individual Fee Demand Assignment">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Assign fee slabs to students based on category, scholarship, or transport route.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Installments & Schedules
  // ----------------------------------------------------
  const schedulesContent = (
    <div className="space-y-4">
      <VFCard title="Fee Installment Due Date Schedules (Term 1, 2, 3)">
        <p className="text-xs text-muted-foreground mb-3">Configure 3-term or 4-quarter fee installment payment timelines.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Fee Collection
  // ----------------------------------------------------
  const collectionContent = (
    <div className="space-y-4">
      <VFCard title="Counter & Online Fee Collection Terminal">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Process cash, cheque, UPI, card, and net-banking counter transactions.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Receipts
  // ----------------------------------------------------
  const receiptsContent = (
    <div className="space-y-4">
      <VFCard title="Digital Fee Receipt Generation & Print Console">
        <p className="text-xs text-muted-foreground mb-3">Generate printable PDF fee receipts with digital signatures and QR codes.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Receipt Books
  // ----------------------------------------------------
  const receiptBooksContent = (
    <div className="space-y-4">
      <VFCard title="Physical & Digital Receipt Book Series Tracking">
        <p className="text-xs text-muted-foreground mb-3">Manage counter receipt book series numbers (e.g. Series RCT-2026-001 to 500).</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Discounts & Concessions
  // ----------------------------------------------------
  const discountsContent = (
    <div className="space-y-4">
      <VFCard title="Sibling & Staff Ward Fee Concession Management">
        <p className="text-xs text-muted-foreground mb-3">Apply 25% sibling discounts and 50% staff ward concessions.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Scholarships
  // ----------------------------------------------------
  const scholarshipsContent = (
    <div className="space-y-4">
      <VFCard title="Merit & RTE Quota Scholarship Allocation">
        <p className="text-xs text-muted-foreground mb-3">RTE 100% government fee waivers and merit scholarship credit entries.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Refunds
  // ----------------------------------------------------
  const refundsContent = (
    <div className="space-y-4">
      <VFCard title="Fee Refund Processing & Security Deposit Return">
        <p className="text-xs text-muted-foreground mb-3">Process withdrawal fee refunds and caution money deposit returns.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Cancelled Transactions
  // ----------------------------------------------------
  const cancelledTransactionsContent = (
    <div className="space-y-4">
      <VFCard title="Cancelled Receipt Audit Log & Bounced Cheque Register">
        <p className="text-xs text-muted-foreground mb-3 font-mono text-destructive">Track voided transaction receipts and cheque bounce charges.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Defaulters
  // ----------------------------------------------------
  const defaultersContent = (
    <div className="space-y-4">
      <VFCard title="Overdue Fee Defaulters List & Late Fine Calculator">
        <p className="text-xs text-muted-foreground mb-3">List of students with pending dues past the 31st August deadline.</p>
        <VFBadge variant="danger">24 Defaulters Identified</VFBadge>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 14 — Fee Reminders
  // ----------------------------------------------------
  const remindersContent = (
    <div className="space-y-4">
      <VFCard title="Automated SMS & WhatsApp Fee Due Reminders">
        <p className="text-xs text-muted-foreground mb-3">Dispatch automated parent payment link reminders prior to due date.</p>
        <VFButton size="sm" leftIcon={<Send className="h-3.5 w-3.5" />}>Send Due Reminders (24 Parents)</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 15 — Payment Methods
  // ----------------------------------------------------
  const paymentMethodsContent = (
    <div className="space-y-4">
      <VFCard title="Payment Gateway & Counter Payment Channels">
        <p className="text-xs text-muted-foreground mb-3">Enable Razorpay / CCAvenue online portal payments and POS card machines.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 16 — Bank Accounts
  // ----------------------------------------------------
  const bankAccountsContent = (
    <div className="space-y-4">
      <VFCard title="School Official Bank Account Master">
        <p className="text-xs text-muted-foreground mb-3">Manage school main operating accounts, fee collection accounts, and trust accounts.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 17 — School Income
  // ----------------------------------------------------
  const incomeContent = (
    <div className="space-y-4">
      <VFCard title="Non-Fee School Income & Grants">
        <p className="text-xs text-muted-foreground mb-3">Record canteen rent, auditorium booking income, and government infrastructure grants.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 18 — School Expenses
  // ----------------------------------------------------
  const expensesContent = (
    <div className="space-y-4">
      <VFCard title="Operational School Expenditure Log">
        <p className="text-xs text-muted-foreground mb-3">Record utility bills, maintenance expenses, lab equipment purchases, and event costs.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 19 — Reconciliation
  // ----------------------------------------------------
  const reconciliationContent = (
    <div className="space-y-4">
      <VFCard title="Bank Statement Auto-Reconciliation Engine">
        <p className="text-xs text-muted-foreground mb-3">Auto-match online fee payment gateway credits against bank settlement statements.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 20 — Fee Certificates
  // ----------------------------------------------------
  const certificatesContent = (
    <div className="space-y-4">
      <VFCard title="Annual Fee Clearance & Tuition Certificate Studio">
        <p className="text-xs text-muted-foreground mb-3">Issue Section 80C Income Tax tuition fee certificates for parents.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 21 — Financial Reports
  // ----------------------------------------------------
  const reportsContent = (
    <div className="space-y-4">
      <VFCard title="Comprehensive Financial Statements & Ledger Exports">
        <p className="text-xs text-muted-foreground mb-3">Daily collection summary, trial balance, income vs expense statement, and CA audit reports.</p>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Export Financial Summary (PDF)</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 22 — Finance Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Global Financial Engine Settings">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="Daily Late Fine per Day" defaultValue="₹50 / day" />
          <VFSelect label="Financial Year Cycle" options={[{ label: 'Apr 1 – Mar 31 (Indian Standard)', value: 'apr_mar' }, { label: 'Jan 1 – Dec 31', value: 'jan_dec' }]} />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 22 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Finance Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'structure', label: 'Fee Structure', icon: <CircleDollarSign className="h-3.5 w-3.5" />, content: structureContent },
    { id: 'types', label: 'Fee Types', icon: <FileText className="h-3.5 w-3.5" />, content: typesContent },
    { id: 'assignment', label: 'Student Fee Assignment', icon: <Users className="h-3.5 w-3.5" />, content: assignmentContent },
    { id: 'schedules', label: 'Installments & Schedules', icon: <Calendar className="h-3.5 w-3.5" />, content: schedulesContent },
    { id: 'collection', label: 'Fee Collection', icon: <Receipt className="h-3.5 w-3.5" />, content: collectionContent },
    { id: 'receipts', label: 'Receipts', icon: <Receipt className="h-3.5 w-3.5" />, content: receiptsContent },
    { id: 'receipt-books', label: 'Receipt Books', icon: <FileText className="h-3.5 w-3.5" />, content: receiptBooksContent },
    { id: 'discounts', label: 'Discounts & Concessions', icon: <Award className="h-3.5 w-3.5" />, content: discountsContent },
    { id: 'scholarships', label: 'Scholarships', icon: <Award className="h-3.5 w-3.5" />, content: scholarshipsContent },
    { id: 'refunds', label: 'Refunds', icon: <CircleDollarSign className="h-3.5 w-3.5" />, content: refundsContent },
    { id: 'cancelled-transactions', label: 'Cancelled Transactions', icon: <AlertCircle className="h-3.5 w-3.5" />, content: cancelledTransactionsContent },
    { id: 'defaulters', label: 'Defaulters', icon: <AlertCircle className="h-3.5 w-3.5" />, content: defaultersContent },
    { id: 'reminders', label: 'Fee Reminders', icon: <Send className="h-3.5 w-3.5" />, content: remindersContent },
    { id: 'payment-methods', label: 'Payment Methods', icon: <CreditCard className="h-3.5 w-3.5" />, content: paymentMethodsContent },
    { id: 'bank-accounts', label: 'Bank Accounts', icon: <Landmark className="h-3.5 w-3.5" />, content: bankAccountsContent },
    { id: 'income', label: 'School Income', icon: <TrendingUp className="h-3.5 w-3.5" />, content: incomeContent },
    { id: 'expenses', label: 'School Expenses', icon: <TrendingUp className="h-3.5 w-3.5" />, content: expensesContent },
    { id: 'reconciliation', label: 'Reconciliation', icon: <ShieldCheck className="h-3.5 w-3.5" />, content: reconciliationContent },
    { id: 'certificates', label: 'Fee Certificates', icon: <Download className="h-3.5 w-3.5" />, content: certificatesContent },
    { id: 'reports', label: 'Financial Reports', icon: <Download className="h-3.5 w-3.5" />, content: reportsContent },
    { id: 'settings', label: 'Finance Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs
        items={submoduleTabs}
        activeTabId={activeSubmodule}
        onTabChange={setActiveSubmodule}
        variant="top-bar"
      />
    </VFPageContainer>
  );
}
