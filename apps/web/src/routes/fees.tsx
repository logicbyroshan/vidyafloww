import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  CreditCard,
  DollarSign,
  AlertCircle,
  TrendingUp,
  Plus,
  Download,
  FileText,
  Send,
  CheckCircle2,
} from 'lucide-react';

export const Route = createFileRoute('/fees')({
  component: FeesPage,
});

interface FeeRecord {
  id: string;
  receiptNo: string;
  studentName: string;
  class: string;
  quarter: string;
  totalFee: string;
  paidAmount: string;
  dueAmount: string;
  paymentMode: string;
  status: 'Paid' | 'Partial' | 'Overdue';
  paidDate: string;
}

function FeesPage() {
  const [notice, setNotice] = React.useState<string | null>(null);

  const feeData: FeeRecord[] = [
    { id: '1', receiptNo: 'REC-2026-8801', studentName: 'Aditya Verma', class: 'Class 9-A', quarter: 'Q1 (Apr - Jun)', totalFee: '₹42,000', paidAmount: '₹42,000', dueAmount: '₹0', paymentMode: 'UPI / Razorpay', status: 'Paid', paidDate: '2026-04-10' },
    { id: '2', receiptNo: 'REC-2026-8802', studentName: 'Priya Sharma', class: 'Class 9-A', quarter: 'Q2 (Jul - Sep)', totalFee: '₹42,000', paidAmount: '₹42,000', dueAmount: '₹0', paymentMode: 'Net Banking', status: 'Paid', paidDate: '2026-07-05' },
    { id: '3', receiptNo: 'REC-2026-8803', studentName: 'Rahul Gupta', class: 'Class 9-B', quarter: 'Q2 (Jul - Sep)', totalFee: '₹42,000', paidAmount: '₹20,000', dueAmount: '₹22,000', paymentMode: 'Cheque Deposit', status: 'Partial', paidDate: '2026-07-15' },
    { id: '4', receiptNo: 'REC-2026-8804', studentName: 'Kavya Nair', class: 'Class 11-Com', quarter: 'Q2 (Jul - Sep)', totalFee: '₹48,000', paidAmount: '₹48,000', dueAmount: '₹0', paymentMode: 'Credit Card', status: 'Paid', paidDate: '2026-07-08' },
    { id: '5', receiptNo: 'REC-2026-8805', studentName: 'Ishaan Malhotra', class: 'Class 11-Sci', quarter: 'Q2 (Jul - Sep)', totalFee: '₹52,000', paidAmount: '₹0', dueAmount: '₹52,000', paymentMode: 'Pending', status: 'Overdue', paidDate: '—' },
  ];

  const feeColumns = [
    {
      header: 'Receipt No',
      accessorKey: 'receiptNo',
      cell: (r: FeeRecord) => <span className="font-mono font-bold text-primary text-base">{r.receiptNo}</span>,
    },
    {
      header: 'Student Name',
      accessorKey: 'studentName',
      cell: (r: FeeRecord) => (
        <div>
          <p className="font-extrabold text-foreground text-base leading-tight">{r.studentName}</p>
          <p className="text-xs text-muted-foreground font-semibold mt-0.5">{r.class}</p>
        </div>
      ),
    },
    {
      header: 'Fee Quarter',
      accessorKey: 'quarter',
      cell: (r: FeeRecord) => <span className="font-bold text-foreground text-base">{r.quarter}</span>,
    },
    {
      header: 'Total Fee',
      accessorKey: 'totalFee',
      cell: (r: FeeRecord) => <span className="font-bold text-foreground text-base">{r.totalFee}</span>,
    },
    {
      header: 'Paid Amount',
      accessorKey: 'paidAmount',
      cell: (r: FeeRecord) => <span className="font-black text-success text-base">{r.paidAmount}</span>,
    },
    {
      header: 'Due Balance',
      accessorKey: 'dueAmount',
      cell: (r: FeeRecord) => (
        <span className={`font-black text-base ${r.dueAmount === '₹0' ? 'text-muted-foreground' : 'text-destructive'}`}>
          {r.dueAmount}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (r: FeeRecord) => (
        <VFBadge variant={r.status === 'Paid' ? 'success' : r.status === 'Partial' ? 'warning' : 'danger'}>
          {r.status}
        </VFBadge>
      ),
    },
    {
      header: 'Actions',
      accessorKey: 'action',
      cell: (r: FeeRecord) => (
        <VFButton
          size="sm"
          variant="outline"
          leftIcon={<FileText className="h-4 w-4" />}
          onClick={() => setNotice(`Receipt ${r.receiptNo} downloaded for ${r.studentName}.`)}
        >
          Receipt
        </VFButton>
      ),
    },
  ];

  // 1. Fee Collection Register View
  const collectionContent = (
    <div className="space-y-6">
      {notice && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-base text-foreground flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
            <span className="font-bold">{notice}</span>
          </div>
          <button
            onClick={() => setNotice(null)}
            className="text-muted-foreground hover:text-foreground text-sm font-black cursor-pointer px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard
          title="Total Expected Q2"
          value="₹5.24 Cr"
          icon={<DollarSign className="h-5 w-5" />}
          trend="up"
          trendLabel="1,248 Students"
          accentColor="blue"
        />
        <VFStatCard
          title="Collected Revenue"
          value="₹4.86 Cr"
          icon={<CreditCard className="h-5 w-5" />}
          trend="up"
          trendLabel="92.7% Collected"
          accentColor="emerald"
        />
        <VFStatCard
          title="Pending Dues"
          value="₹38.2 Lakh"
          icon={<AlertCircle className="h-5 w-5" />}
          trend="down"
          trendLabel="74 Defaulters"
          accentColor="rose"
        />
        <VFStatCard
          title="Collection Rate"
          value="96.4%"
          icon={<TrendingUp className="h-5 w-5" />}
          trend="up"
          trendLabel="+4.2% vs Last Year"
          accentColor="amber"
        />
      </div>

      {/* Main Collection Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-foreground tracking-tight">Fee Transactions & Collection Master</h2>
            <p className="text-sm text-muted-foreground font-medium">Real-time payment records, online gateway receipts, and bank reconciliations</p>
          </div>
          <div className="flex items-center gap-2.5">
            <VFButton variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
              Export Ledger
            </VFButton>
            <VFButton size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              Record Payment
            </VFButton>
          </div>
        </div>

        <VFDataTable
          columns={feeColumns}
          data={feeData}
          filterPlaceholder="Search by student name, receipt number, or class..."
        />
      </div>
    </div>
  );

  // 2. Outstanding Defaulters Tracker View
  const defaultersContent = (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-foreground tracking-tight">Outstanding Fee Defaulters Queue</h2>
          <p className="text-sm text-muted-foreground font-medium">Auto-generated WhatsApp & SMS fee reminder broadcasts</p>
        </div>
        <VFButton
          size="sm"
          leftIcon={<Send className="h-4 w-4" />}
          onClick={() => setNotice('Automated WhatsApp payment links dispatched to all 14 fee defaulters.')}
        >
          Dispatch Auto Reminders
        </VFButton>
      </div>

      <VFCard title="Fee Defaulters Roster (Quarter 2)">
        <div className="divide-y divide-border -my-2 text-base">
          {[
            { name: 'Ishaan Malhotra', class: 'Class 11-Sci', due: '₹52,000', days: '24 Days Overdue', phone: '+91 98234 56789' },
            { name: 'Rahul Gupta', class: 'Class 9-B', due: '₹22,000', days: '14 Days Overdue', phone: '+91 97654 32109' },
            { name: 'Sameer Khan', class: 'Class 10-A', due: '₹42,000', days: '30 Days Overdue', phone: '+91 98321 00987' },
          ].map((d, i) => (
            <div key={i} className="py-3.5 px-1 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground text-base">{d.name} <span className="text-muted-foreground text-sm font-semibold">({d.class})</span></p>
                <p className="text-muted-foreground text-xs font-semibold mt-0.5">Phone: {d.phone} · <span className="text-destructive font-bold">{d.days}</span></p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-black text-destructive text-base">{d.due}</span>
                <VFButton size="sm" variant="outline" leftIcon={<Send className="h-3.5 w-3.5" />}>
                  WhatsApp Link
                </VFButton>
              </div>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  const tabs = [
    { id: 'collection', label: 'Collection & Ledger', icon: <CreditCard className="h-4 w-4" />, content: collectionContent },
    { id: 'defaulters', label: 'Defaulters Tracker', icon: <AlertCircle className="h-4 w-4" />, content: defaultersContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="collection" variant="top-bar" />
    </VFPageContainer>
  );
}
