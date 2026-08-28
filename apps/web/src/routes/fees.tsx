import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFDataTable,
  VFButton,
  VFBadge,
  VFDrawer,
  cn,
} from '@vidyamaxx/ui';
import {
  CreditCard,
  Plus,
  Download,
  FileText,
  Send,
  CheckCircle2,
  MessageSquare,
  Copy,
  Check,
  X,
  Printer,
  ChevronLeft,
  ChevronRight,
  Receipt,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/fees')({
  component: FeesPage,
});

interface FeeRecord {
  id: string;
  receiptNo: string;
  studentName: string;
  studentAdmNo: string;
  class: string;
  quarter: string;
  tuitionFee: number;
  labFee: number;
  transportFee: number;
  activityFee: number;
  totalFee: number;
  paidAmount: number;
  dueAmount: number;
  paymentMode: string;
  transactionRef: string;
  status: 'Paid' | 'Partial' | 'Overdue';
  paidDate: string;
  phone: string;
  email: string;
}

const INITIAL_FEES: FeeRecord[] = [
  {
    id: '1',
    receiptNo: 'REC-2026-8801',
    studentName: 'Aditya Verma',
    studentAdmNo: 'ADM-2026-0841',
    class: 'Class 9-A',
    quarter: 'Q1 (Apr – Jun 2026)',
    tuitionFee: 30000,
    labFee: 5000,
    transportFee: 4500,
    activityFee: 2500,
    totalFee: 42000,
    paidAmount: 42000,
    dueAmount: 0,
    paymentMode: 'UPI / Razorpay',
    transactionRef: 'RZP_PAY_9918239012',
    status: 'Paid',
    paidDate: '10 Apr 2026',
    phone: '+91 98765 43210',
    email: 'aditya.v@springfield.edu.in',
  },
  {
    id: '2',
    receiptNo: 'REC-2026-8802',
    studentName: 'Priya Sharma',
    studentAdmNo: 'ADM-2026-0842',
    class: 'Class 9-A',
    quarter: 'Q2 (Jul – Sep 2026)',
    tuitionFee: 30000,
    labFee: 5000,
    transportFee: 4500,
    activityFee: 2500,
    totalFee: 42000,
    paidAmount: 42000,
    dueAmount: 0,
    paymentMode: 'Net Banking (HDFC)',
    transactionRef: 'HDFC_N009182394',
    status: 'Paid',
    paidDate: '05 Jul 2026',
    phone: '+91 98123 45678',
    email: 'priya.s@springfield.edu.in',
  },
  {
    id: '3',
    receiptNo: 'REC-2026-8803',
    studentName: 'Rahul Gupta',
    studentAdmNo: 'ADM-2026-0843',
    class: 'Class 9-B',
    quarter: 'Q2 (Jul – Sep 2026)',
    tuitionFee: 30000,
    labFee: 5000,
    transportFee: 4500,
    activityFee: 2500,
    totalFee: 42000,
    paidAmount: 20000,
    dueAmount: 22000,
    paymentMode: 'Cheque Deposit',
    transactionRef: 'CHQ_645210_SBI',
    status: 'Partial',
    paidDate: '15 Jul 2026',
    phone: '+91 97654 32109',
    email: 'rahul.g@springfield.edu.in',
  },
  {
    id: '4',
    receiptNo: 'REC-2026-8804',
    studentName: 'Kavya Nair',
    studentAdmNo: 'ADM-2026-0844',
    class: 'Class 11-Com',
    quarter: 'Q2 (Jul – Sep 2026)',
    tuitionFee: 34000,
    labFee: 6000,
    transportFee: 5000,
    activityFee: 3000,
    totalFee: 48000,
    paidAmount: 48000,
    dueAmount: 0,
    paymentMode: 'Credit Card',
    transactionRef: 'CC_AUTH_882910',
    status: 'Paid',
    paidDate: '08 Jul 2026',
    phone: '+91 99887 76655',
    email: 'kavya.n@springfield.edu.in',
  },
  {
    id: '5',
    receiptNo: 'REC-2026-8805',
    studentName: 'Ishaan Malhotra',
    studentAdmNo: 'ADM-2026-0845',
    class: 'Class 11-Sci',
    quarter: 'Q2 (Jul – Sep 2026)',
    tuitionFee: 36000,
    labFee: 8000,
    transportFee: 5000,
    activityFee: 3000,
    totalFee: 52000,
    paidAmount: 0,
    dueAmount: 52000,
    paymentMode: 'Pending',
    transactionRef: 'UNPAID',
    status: 'Overdue',
    paidDate: '—',
    phone: '+91 98234 56789',
    email: 'ishaan.m@springfield.edu.in',
  },
];

function FeesPage() {
  const { activeSession } = useGlobalStore();
  const [feeList, setFeeList] = React.useState<FeeRecord[]>(INITIAL_FEES);
  const [selectedFeeIndex, setSelectedFeeIndex] = React.useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [isRecordingPayment, setIsRecordingPayment] = React.useState<boolean>(false);
  const [paymentAmount, setPaymentAmount] = React.useState<string>('');
  const [paymentMode, setPaymentMode] = React.useState<string>('UPI / Razorpay');
  const [paymentRef, setPaymentRef] = React.useState<string>('');
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);

  const activeFee =
    selectedFeeIndex !== null && selectedFeeIndex >= 0 && selectedFeeIndex < feeList.length
      ? feeList[selectedFeeIndex]
      : null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const openFeeDrawer = (fee: FeeRecord) => {
    const idx = feeList.findIndex((f) => f.id === fee.id);
    setSelectedFeeIndex(idx >= 0 ? idx : 0);
    setIsRecordingPayment(false);
    setPaymentAmount(fee.dueAmount > 0 ? String(fee.dueAmount) : '0');
    setPaymentRef('');
    setIsDrawerOpen(true);
  };

  const handleSavePayment = () => {
    if (selectedFeeIndex === null) return;
    const amount = Number(paymentAmount) || 0;
    if (amount <= 0) {
      alert('Please enter a valid payment amount greater than zero.');
      return;
    }

    const updated = [...feeList];
    const target = updated[selectedFeeIndex];
    const newPaid = target.paidAmount + amount;
    const newDue = Math.max(0, target.totalFee - newPaid);

    updated[selectedFeeIndex] = {
      ...target,
      paidAmount: newPaid,
      dueAmount: newDue,
      paymentMode: paymentMode,
      transactionRef: paymentRef || `TXN_${Date.now()}`,
      status: newDue === 0 ? 'Paid' : 'Partial',
      paidDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };

    setFeeList(updated);
    setIsRecordingPayment(false);
    setNotice(`Payment of ₹${amount.toLocaleString('en-IN')} recorded for ${target.studentName}. Receipt updated!`);
  };

  const handlePrevFee = () => {
    if (selectedFeeIndex !== null && selectedFeeIndex > 0) {
      setIsRecordingPayment(false);
      setSelectedFeeIndex(selectedFeeIndex - 1);
    }
  };

  const handleNextFee = () => {
    if (selectedFeeIndex !== null && selectedFeeIndex < feeList.length - 1) {
      setIsRecordingPayment(false);
      setSelectedFeeIndex(selectedFeeIndex + 1);
    }
  };

  const feeColumns = [
    {
      header: 'Receipt No',
      accessorKey: 'receiptNo',
      cell: (r: FeeRecord) => (
        <span className="font-mono font-bold text-foreground bg-muted px-2.5 py-1 rounded-md border border-border">
          {r.receiptNo}
        </span>
      ),
    },
    {
      header: 'Student Name',
      accessorKey: 'studentName',
      cell: (r: FeeRecord) => (
        <div>
          <p className="font-extrabold text-foreground text-sm leading-tight">{r.studentName}</p>
          <p className="text-xs text-muted-foreground font-semibold mt-0.5">{r.class} · {r.studentAdmNo}</p>
        </div>
      ),
    },
    {
      header: 'Fee Quarter',
      accessorKey: 'quarter',
      cell: (r: FeeRecord) => <span className="font-bold text-foreground text-sm">{r.quarter}</span>,
    },
    {
      header: 'Total Fee',
      accessorKey: 'totalFee',
      cell: (r: FeeRecord) => <span className="font-bold text-foreground text-sm">₹{r.totalFee.toLocaleString('en-IN')}</span>,
    },
    {
      header: 'Paid Amount',
      accessorKey: 'paidAmount',
      cell: (r: FeeRecord) => <span className="font-mono font-black text-emerald-400 text-sm">₹{r.paidAmount.toLocaleString('en-IN')}</span>,
    },
    {
      header: 'Due Balance',
      accessorKey: 'dueAmount',
      cell: (r: FeeRecord) => (
        <span className={cn('font-mono font-black text-sm', r.dueAmount === 0 ? 'text-muted-foreground' : 'text-rose-400')}>
          {r.dueAmount === 0 ? 'Cleared' : `₹${r.dueAmount.toLocaleString('en-IN')}`}
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
          onClick={() => openFeeDrawer(r)}
        >
          View Invoice
        </VFButton>
      ),
    },
  ];

  return (
    <VFPageContainer className="space-y-2.5 sm:space-y-3">
      {notice && (
        <div className="p-4 bg-muted/60 border border-border rounded-md text-sm text-foreground flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <span className="font-bold">{notice}</span>
          </div>
          <button
            onClick={() => setNotice(null)}
            className="text-muted-foreground hover:text-foreground text-xs font-black cursor-pointer px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* 4 Enclosed Top Metric KPI Cards */}
      <div className="p-4 sm:p-5 rounded-lg bg-card border border-border/90 shadow-xs">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Total Expected Q2</span>
            <span className="text-2xl font-black text-foreground mt-1 block">₹5.24 Cr</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">1,248 Enrolled Students</span>
          </div>
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Collected Revenue</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">₹4.86 Cr</span>
            <span className="text-[11px] text-emerald-400 mt-0.5 block font-semibold">92.7% Collection Ratio</span>
          </div>
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Outstanding Balance</span>
            <span className="text-2xl font-black text-foreground mt-1 block">₹38.2 Lakh</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">74 Pending Defaulters</span>
          </div>
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Collection Velocity</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">96.4%</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">+4.2% vs Previous AY</span>
          </div>
        </div>
      </div>

      {/* Main Fee Ledger Table */}
      <VFDataTable
        columns={feeColumns}
        data={feeList}
        filterPlaceholder="Search by student name, receipt number, or admission number..."
        rightActions={
          <>
            <VFButton
              variant="outline"
              size="sm"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={() => alert('Exporting full institutional fee ledger as CSV...')}
            >
              Export Ledger
            </VFButton>
            <VFButton
              size="sm"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => {
                if (feeList.length > 0) {
                  openFeeDrawer(feeList[0]);
                  setIsRecordingPayment(true);
                }
              }}
            >
              Record Payment
            </VFButton>
          </>
        }
      />

      {/* 360° FEE INVOICE & PAYMENT SIDE DRAWER */}
      <VFDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsRecordingPayment(false);
          setIsDrawerOpen(false);
        }}
        hideHeader={true}
        title={activeFee ? activeFee.receiptNo : 'Fee Receipt'}
        className="w-[960px] max-w-[96vw] sm:max-w-4xl lg:max-w-5xl"
        bodyClassName="p-5 sm:p-6 space-y-4"
        footerActions={
          <div className="flex items-center justify-between w-full gap-3 flex-wrap">
            {isRecordingPayment ? (
              <>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-foreground bg-muted px-2.5 py-1 rounded-lg border border-border">
                    {activeFee?.receiptNo}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    Recording Fee Collection
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <VFButton
                    variant="outline"
                    size="sm"
                    leftIcon={<X className="h-4 w-4" />}
                    onClick={() => setIsRecordingPayment(false)}
                  >
                    Cancel
                  </VFButton>
                  <VFButton
                    size="sm"
                    leftIcon={<Check className="h-4 w-4" />}
                    onClick={handleSavePayment}
                  >
                    Confirm Payment
                  </VFButton>
                </div>
              </>
            ) : (
              <>
                {/* 1. Bottom Stepper */}
                <div className="flex items-center gap-1.5 bg-muted/60 p-1.5 rounded-md border border-border">
                  <button
                    onClick={handlePrevFee}
                    disabled={selectedFeeIndex === 0}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted cursor-pointer transition-colors"
                    title="Previous Transaction"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-xs font-mono font-bold px-3 text-foreground select-none">
                    {selectedFeeIndex !== null ? selectedFeeIndex + 1 : 1} of {feeList.length}
                  </span>
                  <button
                    onClick={handleNextFee}
                    disabled={selectedFeeIndex === feeList.length - 1}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted cursor-pointer transition-colors"
                    title="Next Transaction"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* 2. Action Buttons: Close on left, Action on right */}
                <div className="flex items-center gap-2.5">
                  <VFButton
                    variant="outline"
                    size="sm"
                    leftIcon={<X className="h-4 w-4 text-muted-foreground" />}
                    onClick={() => {
                      setIsRecordingPayment(false);
                      setIsDrawerOpen(false);
                    }}
                  >
                    Close
                  </VFButton>
                  <VFButton
                    variant="outline"
                    size="sm"
                    leftIcon={<Printer className="h-4 w-4" />}
                    onClick={() => window.print()}
                  >
                    Print Receipt
                  </VFButton>
                  {activeFee && activeFee.dueAmount > 0 && (
                    <VFButton
                      size="sm"
                      leftIcon={<CreditCard className="h-4 w-4" />}
                      onClick={() => setIsRecordingPayment(true)}
                    >
                      Record Payment
                    </VFButton>
                  )}
                </div>
              </>
            )}
          </div>
        }
      >
        {activeFee && (
          <div className="space-y-6 animate-fade-in pb-4">
            {/* 1. RECORD PAYMENT MODE */}
            {isRecordingPayment ? (
              <div className="space-y-6 animate-fade-in">
                {/* Header Banner */}
                <div className="p-5 rounded-lg bg-card border border-border shadow-xs flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-muted text-foreground border border-border">
                        {activeFee.receiptNo}
                      </span>
                      <VFBadge variant="warning">Collecting Payment</VFBadge>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mt-1 tracking-tight">
                      Record Payment for {activeFee.studentName} ({activeFee.class})
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Outstanding Due</span>
                    <span className="text-2xl font-black text-rose-400 font-mono">₹{activeFee.dueAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Payment Input Form */}
                <div className="p-5 sm:p-6 rounded-lg bg-card border border-border/80 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span>Payment Transaction Details</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Amount to Collect (₹) *
                      </label>
                      <input
                        type="number"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="w-full h-11 px-4 text-base font-mono font-bold text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Payment Mode
                      </label>
                      <select
                        value={paymentMode}
                        onChange={(e) => setPaymentMode(e.target.value)}
                        className="w-full h-11 px-3.5 text-sm font-medium text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      >
                        {['UPI / Razorpay', 'Net Banking (HDFC)', 'Credit Card', 'Cheque Deposit', 'Cash at Counter', 'Demand Draft'].map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Transaction Reference / UTR / Cheque Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. RZP_PAY_9918239012 or CHQ-00412"
                        value={paymentRef}
                        onChange={(e) => setPaymentRef(e.target.value)}
                        className="w-full h-11 px-4 text-sm font-mono text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* 2. VIEW INVOICE MODE */
              <div className="space-y-6 animate-fade-in">
                {/* Hero Card */}
                <div className="p-6 rounded-lg bg-card border border-border/80 shadow-md flex items-center justify-between gap-6 relative overflow-hidden flex-wrap sm:flex-nowrap">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-foreground bg-muted px-3 py-1 rounded-lg border border-border">
                        {activeFee.receiptNo}
                      </span>
                      <VFBadge variant={activeFee.status === 'Paid' ? 'success' : activeFee.status === 'Partial' ? 'warning' : 'danger'}>
                        {activeFee.status}
                      </VFBadge>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                      {activeFee.studentName}
                    </h3>
                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground font-mono">
                      <span>{activeFee.class}</span>
                      <span>•</span>
                      <span>{activeFee.studentAdmNo}</span>
                      <span>•</span>
                      <span>{activeFee.quarter}</span>
                    </div>
                  </div>

                  <div className="text-right sm:text-right space-y-1">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Invoice Total</span>
                    <span className="text-3xl font-black text-foreground font-mono block">₹{activeFee.totalFee.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-muted-foreground font-medium block">AY {activeSession}</span>
                  </div>
                </div>

                {/* 4 Enclosed KPI Stat Tiles */}
                <div className="p-4 sm:p-5 rounded-lg bg-card border border-border/90 shadow-xs">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="p-4 rounded-md bg-muted/40 border border-border/80">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Total Assessed</span>
                      <span className="text-2xl font-black text-foreground mt-1 block">₹{activeFee.totalFee.toLocaleString('en-IN')}</span>
                      <span className="text-[11px] text-muted-foreground mt-0.5 block">{activeFee.quarter}</span>
                    </div>
                    <div className="p-4 rounded-md bg-muted/40 border border-border/80">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Paid to Date</span>
                      <span className="text-2xl font-black text-emerald-400 mt-1 block">₹{activeFee.paidAmount.toLocaleString('en-IN')}</span>
                      <span className="text-[11px] text-emerald-400 mt-0.5 block font-semibold">{activeFee.paidDate !== '—' ? `On ${activeFee.paidDate}` : 'Unpaid'}</span>
                    </div>
                    <div className="p-4 rounded-md bg-muted/40 border border-border/80">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Remaining Balance</span>
                      <span className={cn('text-2xl font-black mt-1 block', activeFee.dueAmount === 0 ? 'text-muted-foreground' : 'text-rose-400')}>
                        {activeFee.dueAmount === 0 ? '₹0' : `₹${activeFee.dueAmount.toLocaleString('en-IN')}`}
                      </span>
                      <span className="text-[11px] text-muted-foreground mt-0.5 block">{activeFee.dueAmount === 0 ? 'No Dues Pending' : 'Action Required'}</span>
                    </div>
                    <div className="p-4 rounded-md bg-muted/40 border border-border/80">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Payment Method</span>
                      <span className="text-lg font-bold text-foreground mt-1 block truncate">{activeFee.paymentMode}</span>
                      <span className="text-[11px] text-muted-foreground mt-0.5 block font-mono truncate">{activeFee.transactionRef}</span>
                    </div>
                  </div>
                </div>

                {/* Itemized Fee Structure Breakdown */}
                <div className="p-5 sm:p-6 rounded-lg bg-card border border-border/80 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
                    <Receipt className="h-4 w-4 text-muted-foreground" />
                    <span>Itemized Fee Assessment Breakdown</span>
                  </h4>

                  <div className="divide-y divide-border/60 text-sm">
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-muted-foreground font-medium">1. Academic Tuition & Digital Classroom Fee</span>
                      <span className="font-mono font-bold text-foreground">₹{activeFee.tuitionFee.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-muted-foreground font-medium">2. Science & Computer Laboratory Maintenance</span>
                      <span className="font-mono font-bold text-foreground">₹{activeFee.labFee.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-muted-foreground font-medium">3. School Bus & Logistics Transport Levy</span>
                      <span className="font-mono font-bold text-foreground">₹{activeFee.transportFee.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-muted-foreground font-medium">4. Sports, Library & Co-Curricular Facilities</span>
                      <span className="font-mono font-bold text-foreground">₹{activeFee.activityFee.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="pt-3 flex items-center justify-between font-bold text-base border-t border-border">
                      <span className="text-foreground">Total Quarter Fee</span>
                      <span className="font-mono text-xl text-foreground font-black">₹{activeFee.totalFee.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Parent Communication & Reminders */}
                <div className="p-5 sm:p-6 rounded-lg bg-card border border-border/80 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
                    <Send className="h-4 w-4 text-muted-foreground" />
                    <span>Parent Communication & Direct Payment Broadcast</span>
                  </h4>

                  <div className="p-4 rounded-md bg-muted/30 border border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Parent Registered Mobile</span>
                      <span className="font-mono text-lg font-bold text-foreground mt-1 block">{activeFee.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.open(`https://wa.me/${activeFee.phone.replace(/[^0-9]/g, '')}?text=Dear%20Parent,%20fee%20receipt%20for%20${encodeURIComponent(activeFee.studentName)}%20(${activeFee.receiptNo})%20is%20ready.%20Total:%20INR%20${activeFee.totalFee}.`, '_blank')}
                        className="px-4 py-2 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Send WhatsApp Receipt</span>
                      </button>
                      <button
                        onClick={() => handleCopy(activeFee.phone, 'phone')}
                        className="px-3.5 py-2 rounded-md bg-muted hover:bg-muted/80 border border-border text-foreground text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        {copiedKey === 'phone' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
                        <span>{copiedKey === 'phone' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </VFDrawer>
    </VFPageContainer>
  );
}

