import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFSection,
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
  Landmark,
  Receipt,
  Users,
  CreditCard,
  FileText,
  AlertTriangle,
  Sparkles,
  Bot,
  Sliders,
  Check,
  Printer,
  PieChart,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Clock,
  Send,
  Calendar,
} from 'lucide-react';

export const Route = createFileRoute('/finance')({
  component: FinancePage,
});

// Mock Data Types
interface FeeStructureItem {
  id: string;
  class: string;
  tuition: number;
  transport: number;
  computer: number;
  activity: number;
  total: number;
}

interface StudentDueRecord {
  id: string;
  rollNo: string;
  name: string;
  class: string;
  totalFee: number;
  paid: number;
  discount: number;
  due: number;
  status: 'Paid' | 'Partial' | 'Overdue';
}

function FinancePage() {
  // Global State Variables
  const [activeWizardStep, setActiveWizardStep] = React.useState<number>(1);
  const [paymentAmount, setPaymentAmount] = React.useState<string>('8000');
  const [paymentMethod, setPaymentMethod] = React.useState<string>('UPI');
  const [aiFinancePrompt, setAiFinancePrompt] = React.useState<string>('');
  const [aiFinanceResponse, setAiFinanceResponse] = React.useState<string | null>(null);
  const [isPeriodLocked] = React.useState<boolean>(false);

  // Student Dues Mock State
  const [studentDues] = React.useState<StudentDueRecord[]>([
    { id: '1', rollNo: '1001', name: 'Rahul Sharma', class: 'Class 10-A', totalFee: 40000, paid: 30000, discount: 2000, due: 8000, status: 'Partial' },
    { id: '2', rollNo: '1002', name: 'Amit Patel', class: 'Class 10-A', totalFee: 40000, paid: 40000, discount: 0, due: 0, status: 'Paid' },
    { id: '3', rollNo: '1003', name: 'Neha Jain', class: 'Class 10-A', totalFee: 40000, paid: 20000, discount: 5000, due: 15000, status: 'Overdue' },
    { id: '4', rollNo: '1004', name: 'Riya Singh', class: 'Class 8-B', totalFee: 34500, paid: 10000, discount: 0, due: 24500, status: 'Overdue' },
    { id: '5', rollNo: '1005', name: 'Vikas Kumar', class: 'Class 8-B', totalFee: 34500, paid: 34500, discount: 0, due: 0, status: 'Paid' },
  ]);

  // ----------------------------------------------------
  // SUBMODULE 8.1 — Finance Configuration (10 Features)
  // ----------------------------------------------------
  const finConfigContent = (
    <div className="space-y-4">
      {/* 1. Finance Profile Settings */}
      <VFCard title="1. School Finance Profile & Accounting Preferences">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs mt-2">
          <VFInput label="Financial Year" defaultValue="2027–28" />
          <VFInput label="Currency" defaultValue="INR (₹)" />
          <VFInput label="Tax Mode" defaultValue="GST Applicable" />
          <VFInput label="Accounting Basis" defaultValue="Accrual Basis" />
          <VFInput label="Invoice Prefix" defaultValue="INV-2027-" />
          <VFInput label="Receipt Prefix" defaultValue="RCPT-2027-" />
        </div>
      </VFCard>

      {/* 2 & 4. Financial Year & Bank Account Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VFCard title="2. Financial Year Management Lifecycle">
          <div className="space-y-2 text-xs mt-2">
            {[
              { year: '2025–26 Session', status: 'Closed', label: 'Locked & Audited' },
              { year: '2026–27 Session', status: 'Active', label: 'Current Financial Year' },
              { year: '2027–28 Session', status: 'Upcoming', label: 'Open for Planning' },
            ].map(y => (
              <div key={y.year} className="p-2.5 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
                <div>
                  <span className="font-bold text-foreground">{y.year}</span>
                  <p className="text-muted-foreground text-[10px]">{y.label}</p>
                </div>
                <VFBadge variant={y.status === 'Active' ? 'success' : y.status === 'Closed' ? 'secondary' : 'primary'}>{y.status}</VFBadge>
              </div>
            ))}
          </div>
        </VFCard>

        <VFCard title="4. School Bank Accounts Directory">
          <div className="space-y-2 text-xs mt-2">
            {[
              { bank: 'HDFC Bank (Main Collection)', acc: '•••• 9920', bal: '₹1.84 Cr', status: 'Primary' },
              { bank: 'ICICI Bank (Salary Account)', acc: '•••• 4410', bal: '₹42.5 L', status: 'Payroll' },
              { bank: 'SBI (Transport & Operations)', acc: '•••• 1102', bal: '₹18.2 L', status: 'Active' },
            ].map(b => (
              <div key={b.bank} className="p-2.5 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
                <div>
                  <span className="font-bold text-foreground">{b.bank}</span>
                  <p className="font-mono text-muted-foreground text-[10px]">{b.acc}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-500">{b.bal}</span>
                  <VFBadge variant="primary" className="ml-2">{b.status}</VFBadge>
                </div>
              </div>
            ))}
          </div>
        </VFCard>
      </div>

      {/* 6, 8 & 9. Approval Rules & Tax Config */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="6. Financial Approval Thresholds">
          <div className="space-y-1.5 text-xs font-mono mt-1">
            <div className="p-2 bg-muted/40 rounded border border-border/60 flex justify-between">
              <span>₹0 – ₹5,000:</span> <strong>Accountant</strong>
            </div>
            <div className="p-2 bg-muted/40 rounded border border-border/60 flex justify-between">
              <span>₹5,001 – ₹50,000:</span> <strong>Finance Manager</strong>
            </div>
            <div className="p-2 bg-muted/40 rounded border border-border/60 flex justify-between">
              <span>₹50,000+:</span> <strong className="text-primary">Principal Sign-off</strong>
            </div>
          </div>
        </VFCard>

        <VFCard title="8. Tax & GST Settings">
          <div className="space-y-2 text-xs mt-1">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-500 font-bold flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" /> Educational Services GST Exempted
            </div>
            <p className="text-muted-foreground text-[11px]">Tuition & Core Academic Fees are 0% GST rated under Section 12AA.</p>
          </div>
        </VFCard>

        <VFCard title="9. Period Locking Security">
          <div className="space-y-2 text-xs mt-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">Lock Status:</span>
              <VFBadge variant={isPeriodLocked ? 'danger' : 'success'}>{isPeriodLocked ? '🔒 Period Locked' : '🟢 Open'}</VFBadge>
            </div>
            <p className="text-muted-foreground text-[11px]">Locked periods prevent retrospective accounting modifications.</p>
          </div>
        </VFCard>
      </div>

      {/* 10. Finance Setup Wizard */}
      <VFCard title="10. Enterprise Finance Setup Wizard">
        <div className="space-y-3 mt-2">
          <div className="flex items-center justify-between text-xs overflow-x-auto custom-scrollbar pb-2">
            {['1 Financial Year', '2 Payment Methods', '3 Bank Accounts', '4 Fee Categories', '5 Expense Categories', '6 Approval Rules', '7 Tax Settings', '8 Balances', '9 Review', '10 Activate'].map((step, idx) => {
              const stepNum = idx + 1;
              const isActive = activeWizardStep === stepNum;
              const isCompleted = activeWizardStep > stepNum;
              return (
                <button
                  key={step}
                  onClick={() => setActiveWizardStep(stepNum)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs shrink-0 cursor-pointer transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : isCompleted
                      ? 'bg-success/15 text-success border border-success/30'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isCompleted ? <Check className="h-3 w-3" /> : stepNum}
                  <span>{step}</span>
                </button>
              );
            })}
          </div>

          <div className="p-3.5 bg-muted/30 border border-border/60 rounded-xl flex items-center justify-between">
            <div>
              <p className="font-bold text-foreground text-xs">
                Step {activeWizardStep}: {['Financial Year Setup', 'Payment Gateways & Methods', 'Bank Accounts Linkage', 'Fee Structure Categories', 'Expense Master Categories', 'Approval Limit Rules', 'Tax Treatment Matrix', 'Opening Ledger Balances', 'Master Review', 'System Activation'][activeWizardStep - 1]}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Configure core financial parameters for Springfield Academy.</p>
            </div>
            <div className="flex items-center gap-2">
              <VFButton size="sm" variant="outline" disabled={activeWizardStep === 1} onClick={() => setActiveWizardStep(prev => Math.max(1, prev - 1))}>
                Back
              </VFButton>
              <VFButton size="sm" disabled={activeWizardStep === 10} onClick={() => setActiveWizardStep(prev => Math.min(10, prev + 1))}>
                Next Step
              </VFButton>
            </div>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8.2 — Fee Structure & Plans (12 Features)
  // ----------------------------------------------------
  const feeStructureContent = (
    <div className="space-y-4">
      {/* 22. Fee Structure Executive Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Target Students" value="842 Students" icon={<Users className="h-5 w-5" />} trend="up" trendLabel="Enrolled 2027" />
        <VFStatCard title="Average Annual Fee" value="₹42,300" icon={<CircleDollarSign className="h-5 w-5 text-primary" />} trend="neutral" trendLabel="Per Student" />
        <VFStatCard title="Expected Total Revenue" value="₹3.56 Cr" icon={<Landmark className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="2027 Budget" />
        <VFStatCard title="Installment Options" value="4 Quarterly" icon={<Calendar className="h-5 w-5 text-amber-500" />} trend="neutral" trendLabel="Apr/Jul/Oct/Jan" />
      </div>

      {/* 11 & 12. Fee Structure Master Matrix */}
      <VFSection title="11, 12 & 13. Class-wise Annual Fee Packages & Component Breakdown">
        <VFDataTable
          columns={[
            { header: 'Class / Grade', accessorKey: 'class', cell: (r: FeeStructureItem) => <span className="font-bold text-foreground">{r.class}</span> },
            { header: 'Tuition Fee', accessorKey: 'tuition', cell: (r: FeeStructureItem) => <span className="font-mono text-xs">₹{r.tuition.toLocaleString()}</span> },
            { header: 'Transport Fee', accessorKey: 'transport', cell: (r: FeeStructureItem) => <span className="font-mono text-xs">₹{r.transport.toLocaleString()}</span> },
            { header: 'Computer Fee', accessorKey: 'computer', cell: (r: FeeStructureItem) => <span className="font-mono text-xs">₹{r.computer.toLocaleString()}</span> },
            { header: 'Activity Fee', accessorKey: 'activity', cell: (r: FeeStructureItem) => <span className="font-mono text-xs">₹{r.activity.toLocaleString()}</span> },
            { header: 'Annual Total', accessorKey: 'total', cell: (r: FeeStructureItem) => <span className="font-mono font-bold text-primary">₹{r.total.toLocaleString()}</span> },
          ]}
          data={[
            { id: '1', class: 'Class 8 (Middle School)', tuition: 30000, transport: 8000, computer: 2000, activity: 1500, total: 41500 },
            { id: '2', class: 'Class 9 (Secondary)', tuition: 35000, transport: 8000, computer: 2500, activity: 2000, total: 47500 },
            { id: '3', class: 'Class 10 (Board Exam)', tuition: 38000, transport: 8000, computer: 3000, activity: 2000, total: 51000 },
          ]}
        />
      </VFSection>

      {/* 15 & 17. Installment Plans & Late Fee Penalty Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VFCard title="15. Installment Schedule (Quarterly)">
          <div className="space-y-2 text-xs mt-2 font-mono">
            <div className="p-2.5 bg-muted/40 rounded border border-border/60 flex justify-between">
              <span>Installment 1 (April):</span> <strong className="text-foreground">₹10,000 (Due 15 Apr)</strong>
            </div>
            <div className="p-2.5 bg-muted/40 rounded border border-border/60 flex justify-between">
              <span>Installment 2 (July):</span> <strong className="text-foreground">₹10,000 (Due 15 Jul)</strong>
            </div>
            <div className="p-2.5 bg-muted/40 rounded border border-border/60 flex justify-between">
              <span>Installment 3 (October):</span> <strong className="text-foreground">₹10,000 (Due 15 Oct)</strong>
            </div>
            <div className="p-2.5 bg-muted/40 rounded border border-border/60 flex justify-between">
              <span>Installment 4 (January):</span> <strong className="text-foreground">₹10,000 (Due 15 Jan)</strong>
            </div>
          </div>
        </VFCard>

        <VFCard title="17. Late Fee Penalty Rules Engine">
          <div className="space-y-2 text-xs mt-2">
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-500 font-bold flex items-center justify-between">
              <span>Grace Period: 5 Days after Due Date</span>
              <span>Penalty Rate: ₹50 / Day</span>
            </div>
            <p className="text-muted-foreground text-[11px]">Maximum cap limit on accumulated late fee penalty is strictly enforced at ₹500 per installment.</p>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8.3 — Student Billing & Dues (10 Features)
  // ----------------------------------------------------
  const billingDuesContent = (
    <div className="space-y-4">
      {/* 27. Due Management Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Due Today" value="₹2.4 L" icon={<Clock className="h-5 w-5 text-primary" />} trend="neutral" trendLabel="4 Accounts" />
        <VFStatCard title="Overdue Balance" value="₹8.2 L" icon={<AlertTriangle className="h-5 w-5 text-destructive" />} trend="down" trendLabel="38 Accounts" />
        <VFStatCard title="Due This Month" value="₹32.0 L" icon={<Calendar className="h-5 w-5 text-amber-500" />} trend="up" trendLabel="Q2 Installment" />
        <VFStatCard title="Collection Rate" value="94.8%" icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="On-Time Paid" />
      </div>

      {/* 24 & 28. Student Dues Roster */}
      <VFSection title="24, 28 & 29. Student Fee Account Roster & Aging Buckets">
        <VFDataTable
          columns={[
            { header: 'Roll No', accessorKey: 'rollNo', cell: (r: StudentDueRecord) => <span className="font-mono text-xs font-bold text-primary">{r.rollNo}</span> },
            { header: 'Student Name', accessorKey: 'name', cell: (r: StudentDueRecord) => <span className="font-bold text-foreground">{r.name}</span> },
            { header: 'Class', accessorKey: 'class' },
            { header: 'Total Fee', accessorKey: 'totalFee', cell: (r: StudentDueRecord) => <span className="font-mono text-xs">₹{r.totalFee.toLocaleString()}</span> },
            { header: 'Paid', accessorKey: 'paid', cell: (r: StudentDueRecord) => <span className="font-mono text-xs text-emerald-500 font-bold">₹{r.paid.toLocaleString()}</span> },
            { header: 'Discount', accessorKey: 'discount', cell: (r: StudentDueRecord) => <span className="font-mono text-xs text-amber-500">₹{r.discount.toLocaleString()}</span> },
            { header: 'Outstanding Due', accessorKey: 'due', cell: (r: StudentDueRecord) => <span className="font-mono font-bold text-destructive">₹{r.due.toLocaleString()}</span> },
            { header: 'Status', accessorKey: 'status', cell: (r: StudentDueRecord) => <VFBadge variant={r.status === 'Paid' ? 'success' : r.status === 'Partial' ? 'warning' : 'danger'}>{r.status}</VFBadge> },
          ]}
          data={studentDues}
        />
      </VFSection>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8.4 — Fee Collection & Receipts (12 Features)
  // ----------------------------------------------------
  const feeCollectionContent = (
    <div className="space-y-4">
      {/* 33 & 38. Interactive Fee Collection Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <VFCard title="33 & 34. Cashier Fee Collection Counter" className="lg:col-span-1">
          <div className="space-y-3 text-xs mt-1">
            <VFSelect
              label="Select Student Account"
              options={[
                { label: 'Rahul Sharma (Roll #1001 • Class 10A)', value: '1001' },
                { label: 'Neha Jain (Roll #1003 • Class 10A)', value: '1003' },
              ]}
            />
            <div className="p-3 bg-muted/40 rounded-xl border border-border/60 font-mono space-y-1">
              <div className="flex justify-between"><span>Current Outstanding:</span><strong className="text-destructive">₹8,000</strong></div>
              <div className="flex justify-between"><span>Q2 Installment:</span><strong className="text-foreground">₹8,000</strong></div>
            </div>

            <VFInput
              label="Payment Amount (₹)"
              value={paymentAmount}
              onChange={(e: any) => setPaymentAmount(e.target.value)}
            />

            <VFSelect
              label="Payment Method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(String(e.target.value))}
              options={[
                { label: 'UPI / QR Code Scan', value: 'UPI' },
                { label: 'Cash Payment', value: 'Cash' },
                { label: 'Credit / Debit Card (POS)', value: 'Card' },
                { label: 'Bank Cheque / DD', value: 'Cheque' },
              ]}
            />

            <VFButton size="sm" className="w-full" leftIcon={<Receipt className="h-3.5 w-3.5" />}>
              Collect Payment & Print Receipt
            </VFButton>
          </div>
        </VFCard>

        {/* 38 & 42. Instant Receipt Preview & Daily Register */}
        <div className="space-y-4 lg:col-span-2">
          <VFCard title="38 & 39. Generated Digital Fee Receipt (RCPT-2027-00182)">
            <div className="p-4 bg-muted/40 rounded-xl border border-border/60 space-y-3 text-xs">
              <div className="flex justify-between items-start border-b border-border/60 pb-3">
                <div>
                  <h4 className="font-bold text-foreground text-sm">SPRINGFIELD ACADEMY • OFFICIAL FEE RECEIPT</h4>
                  <p className="text-muted-foreground text-[11px]">Receipt #: RCPT-2027-00182 • Date: 11 Aug 2026</p>
                </div>
                <VFBadge variant="success">✓ PAID (UPI)</VFBadge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>Student: <strong className="text-foreground">Rahul Sharma (10-A)</strong></div>
                <div>Amount Paid: <strong className="text-emerald-500 font-mono font-bold">₹8,000</strong></div>
                <div>Mode: <strong className="text-foreground">UPI (Ref #992019)</strong></div>
                <div>Balance Due: <strong className="text-foreground font-mono">₹0.00</strong></div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border/60">
                <VFButton size="sm" variant="outline" leftIcon={<Printer className="h-3.5 w-3.5" />}>Print Receipt</VFButton>
                <VFButton size="sm" variant="outline" leftIcon={<Send className="h-3.5 w-3.5" />}>Send WhatsApp Receipt</VFButton>
              </div>
            </div>
          </VFCard>

          {/* 42. Daily Collection Register */}
          <VFCard title="42. Today’s Cashier Collection Register">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono mt-1">
              <div className="p-2 bg-muted/40 rounded border border-border/60 text-center"><span>Cash:</span> <p className="font-bold text-foreground">₹42,000</p></div>
              <div className="p-2 bg-muted/40 rounded border border-border/60 text-center"><span>UPI:</span> <p className="font-bold text-emerald-500">₹85,000</p></div>
              <div className="p-2 bg-muted/40 rounded border border-border/60 text-center"><span>Card:</span> <p className="font-bold text-primary">₹31,000</p></div>
              <div className="p-2 bg-muted/40 rounded border border-border/60 text-center"><span>Cheque:</span> <p className="font-bold text-amber-500">₹18,000</p></div>
            </div>
          </VFCard>
        </div>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8.5 — Discounts, Scholarships & Concessions (10 Features)
  // ----------------------------------------------------
  const discountsContent = (
    <div className="space-y-4">
      {/* 45 & 47. Discounts & Scholarships Master */}
      <VFSection title="45, 46 & 47. Scholarship & Concession Master Catalog">
        <VFDataTable
          columns={[
            { header: 'Concession Scheme', accessorKey: 'name', cell: (r: any) => <span className="font-bold text-foreground">{r.name}</span> },
            { header: 'Type', accessorKey: 'type', cell: (r: any) => <VFBadge variant="primary">{r.type}</VFBadge> },
            { header: 'Discount Value', accessorKey: 'value', cell: (r: any) => <span className="font-mono font-bold text-emerald-500">{r.value}</span> },
            { header: 'Approval Required', accessorKey: 'approver' },
            { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge> },
          ]}
          data={[
            { name: 'Second Sibling Concession', type: 'Policy Discount', value: '10% Tuition Off', approver: 'Auto-Applied', status: 'Active' },
            { name: 'Merit Scholarship (Top Ranker)', type: 'Scholarship', value: '₹15,000 / Year', approver: 'Principal', status: 'Active' },
            { name: 'Staff Child Fee Waiver', type: 'Concession', value: '50% Tuition Waiver', approver: 'Management', status: 'Active' },
          ]}
        />
      </VFSection>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8.6 — Payments, Refunds & Adjustments (10 Features)
  // ----------------------------------------------------
  const paymentsRefundsContent = (
    <div className="space-y-4">
      {/* 55 & 61. Gateway Status & Credit Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VFCard title="55. Online Payment Gateway Integration Status">
          <div className="space-y-2 text-xs mt-2">
            <div className="p-2.5 bg-muted/40 rounded border border-border/60 flex justify-between items-center">
              <span className="font-bold text-foreground">Razorpay Payment Gateway</span>
              <VFBadge variant="success">🟢 Webhook Active</VFBadge>
            </div>
            <div className="p-2.5 bg-muted/40 rounded border border-border/60 flex justify-between items-center">
              <span className="font-bold text-foreground">Paytm UPI / QR Merchant</span>
              <VFBadge variant="success">🟢 Active</VFBadge>
            </div>
          </div>
        </VFCard>

        <VFCard title="61 & 62. Credit Notes & Fee Adjustments">
          <div className="space-y-2 text-xs mt-2">
            <p className="text-muted-foreground text-[11px]">Issue audit-protected credit notes for overcharged student fee accounts.</p>
            <VFButton size="sm" variant="outline" className="w-full text-xs" leftIcon={<FileText className="h-3.5 w-3.5" />}>
              Issue Credit Note Voucher
            </VFButton>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8.7 — Expenses & Vendor Payments (12 Features)
  // ----------------------------------------------------
  const expensesVendorsContent = (
    <div className="space-y-4">
      {/* 66 & 70. Create Expense Voucher & AI Vendor Extraction */}
      <VFSection title="65, 66 & 69. School Expense Vouchers & Vendor Accounts">
        <VFDataTable
          columns={[
            { header: 'Voucher #', accessorKey: 'code', cell: (r: any) => <span className="font-mono text-xs font-bold text-primary">{r.code}</span> },
            { header: 'Expense Item', accessorKey: 'item', cell: (r: any) => <span className="font-bold text-foreground">{r.item}</span> },
            { header: 'Category', accessorKey: 'cat' },
            { header: 'Vendor Name', accessorKey: 'vendor' },
            { header: 'Amount', accessorKey: 'amount', cell: (r: any) => <span className="font-mono font-bold text-destructive">₹{r.amount.toLocaleString()}</span> },
            { header: 'Approval Stage', accessorKey: 'status', cell: (r: any) => <VFBadge variant={r.status === 'Approved' ? 'success' : 'warning'}>{r.status}</VFBadge> },
          ]}
          data={[
            { code: 'EXP-2027-012', item: 'Monthly Electricity Bill', cat: 'Utilities', vendor: 'State Electricity Board', amount: 18500, status: 'Approved' },
            { code: 'EXP-2027-013', item: 'High-Speed Fiber Leased Line', cat: 'IT & Telecom', vendor: 'Airtel Broadband', amount: 12000, status: 'Approved' },
            { code: 'EXP-2027-014', item: 'Science Lab Chemicals Batch', cat: 'Academic Supplies', vendor: 'Sigma Lab Supplies', amount: 34000, status: 'Pending Approval' },
          ]}
        />
      </VFSection>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8.8 — Accounting & Ledger (12 Features)
  // ----------------------------------------------------
  const accountingLedgerContent = (
    <div className="space-y-4">
      {/* 77 & 88. Chart of Accounts & Trial Balance */}
      <VFCard title="77 & 88. General Double-Entry Ledger & Trial Balance">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono mt-2">
          <div className="p-3 bg-muted/40 rounded-xl border border-border/60">
            <span className="text-muted-foreground text-[10px] block uppercase font-sans">ASSETS</span>
            <p className="font-bold text-foreground text-sm">₹2.45 Cr</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-xl border border-border/60">
            <span className="text-muted-foreground text-[10px] block uppercase font-sans">LIABILITIES</span>
            <p className="font-bold text-foreground text-sm">₹38.0 L</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-xl border border-border/60">
            <span className="text-muted-foreground text-[10px] block uppercase font-sans">REVENUE (INCOME)</span>
            <p className="font-bold text-emerald-500 text-sm">₹3.56 Cr</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-xl border border-border/60">
            <span className="text-muted-foreground text-[10px] block uppercase font-sans">EXPENSES</span>
            <p className="font-bold text-destructive text-sm">₹1.84 Cr</p>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8.9 — Budgeting & Financial Planning (10 Features)
  // ----------------------------------------------------
  const budgetingPlanningContent = (
    <div className="space-y-4">
      {/* 89 & 92. Annual Budget Plan & Budget vs Actual Variance */}
      <VFSection title="89 & 92. Annual Departmental Budget vs Actual Expenditure Variance">
        <VFDataTable
          columns={[
            { header: 'Department / Head', accessorKey: 'dept', cell: (r: any) => <span className="font-bold text-foreground">{r.dept}</span> },
            { header: 'Allocated Budget', accessorKey: 'budget', cell: (r: any) => <span className="font-mono text-xs">₹{r.budget.toLocaleString()}</span> },
            { header: 'Actual Spent', accessorKey: 'actual', cell: (r: any) => <span className="font-mono text-xs text-primary font-bold">₹{r.actual.toLocaleString()}</span> },
            { header: 'Variance', accessorKey: 'variance', cell: (r: any) => <span className={`font-mono font-bold text-xs ${r.variance.startsWith('+') ? 'text-destructive' : 'text-emerald-500'}`}>{r.variance}</span> },
            { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant={r.status === 'Within Budget' ? 'success' : 'danger'}>{r.status}</VFBadge> },
          ]}
          data={[
            { dept: 'Staff Payroll & Salaries', budget: 22000000, actual: 21500000, variance: '-₹5,00,000', status: 'Within Budget' },
            { dept: 'IT Infrastructure & Software', budget: 2000000, actual: 2400000, variance: '+₹4,00,000 ⚠️', status: 'Over Budget' },
            { dept: 'Transport Fleet Maintenance', budget: 3000000, actual: 2800000, variance: '-₹2,00,000', status: 'Within Budget' },
          ]}
        />
      </VFSection>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8.10 — Reconciliation & Financial Control (10 Features)
  // ----------------------------------------------------
  const reconciliationControlContent = (
    <div className="space-y-4">
      {/* 99 & 101. Bank Reconciliation & Auto Matching */}
      <VFCard title="99 & 101. Automated Bank Statement Matching & Reconciliation">
        <div className="space-y-3 text-xs mt-2">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-500 font-bold flex items-center justify-between">
            <span>Automatic UPI Transaction Matching: 98.4% Success Rate</span>
            <VFBadge variant="success">Reconciled</VFBadge>
          </div>
          <p className="text-muted-foreground text-[11px]">24 unallocated transactions require cashier manual review.</p>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8.11 — Financial Analytics & AI (17 Features)
  // ----------------------------------------------------
  const analyticsAiContent = (
    <div className="space-y-4">
      {/* 109. Finance Command Center KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Expected Revenue" value="₹3.56 Cr" icon={<Landmark className="h-5 w-5 text-primary" />} trend="up" trendLabel="2027 Budget" />
        <VFStatCard title="Total Collected" value="₹2.70 Cr" icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="75.8% Collected" />
        <VFStatCard title="Total Outstanding" value="₹48.0 L" icon={<AlertTriangle className="h-5 w-5 text-destructive" />} trend="down" trendLabel="Due Balance" />
        <VFStatCard title="Collection Efficiency" value="85.4%" icon={<TrendingUp className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="+3.2% vs Last Term" />
      </div>

      {/* 120 & 125. AI Defaulter Risk Prediction & Financial Assistant */}
      <div className="bg-card border border-border p-5 rounded-xl space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/20 text-primary font-bold flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">120 & 125. AI Defaulter Risk Predictor & Finance Assistant</h3>
              <p className="text-xs text-muted-foreground">Predicts accounts likely to default on Q2 installments based on historical payment timeliness.</p>
            </div>
          </div>
          <VFBadge variant="warning">38 At-Risk Accounts Flagged</VFBadge>
        </div>

        <div className="flex gap-2">
          <VFInput
            placeholder="e.g. How much money are we likely to collect this month?"
            value={aiFinancePrompt}
            onChange={(e: any) => setAiFinancePrompt(e.target.value)}
          />
          <VFButton
            size="sm"
            onClick={() => {
              if (aiFinancePrompt) {
                setAiFinanceResponse(`AI Finance Forecast: Expected August collection is ₹38.4 Lakhs based on historical payment behavior and Q2 due schedules.`);
              }
            }}
          >
            Ask AI
          </VFButton>
        </div>

        {aiFinanceResponse && (
          <div className="p-3 bg-muted/40 border border-border rounded-lg text-foreground text-xs animate-fade-in">
            <span className="font-bold text-primary flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> AI Financial Insight:
            </span>
            <p className="mt-1 leading-relaxed text-[11px]">{aiFinanceResponse}</p>
          </div>
        )}
      </div>
    </div>
  );

  // ----------------------------------------------------
  // MAPPING ALL 11 SUBMODULE TABS
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'fin-config', label: '8.1 Configuration', icon: <Sliders className="h-3.5 w-3.5" />, content: finConfigContent },
    { id: 'fee-structure', label: '8.2 Fee Structure', icon: <CircleDollarSign className="h-3.5 w-3.5" />, content: feeStructureContent },
    { id: 'billing-dues', label: '8.3 Student Billing', icon: <Clock className="h-3.5 w-3.5" />, content: billingDuesContent },
    { id: 'fee-collection', label: '8.4 Fee Collection', icon: <Receipt className="h-3.5 w-3.5" />, content: feeCollectionContent },
    { id: 'discounts-scholarships', label: '8.5 Discounts & Waivers', icon: <Users className="h-3.5 w-3.5" />, content: discountsContent },
    { id: 'payments-refunds', label: '8.6 Payments & Refunds', icon: <CreditCard className="h-3.5 w-3.5" />, content: paymentsRefundsContent },
    { id: 'expenses-vendors', label: '8.7 Expenses & Vendors', icon: <Landmark className="h-3.5 w-3.5" />, content: expensesVendorsContent },
    { id: 'accounting-ledger', label: '8.8 Accounting & Ledger', icon: <FileText className="h-3.5 w-3.5" />, content: accountingLedgerContent },
    { id: 'budgeting-planning', label: '8.9 Budgeting', icon: <PieChart className="h-3.5 w-3.5" />, content: budgetingPlanningContent },
    { id: 'reconciliation-control', label: '8.10 Reconciliation', icon: <ShieldCheck className="h-3.5 w-3.5" />, content: reconciliationControlContent },
    { id: 'analytics-ai', label: '8.11 Analytics & AI', icon: <Sparkles className="h-3.5 w-3.5 text-primary" />, content: analyticsAiContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs
        items={submoduleTabs}
        defaultTabId="fee-structure"
        variant="top-bar"
      />
    </VFPageContainer>
  );
}
