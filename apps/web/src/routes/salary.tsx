import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFDataTable,
  VFButton,
  VFBadge,
  VFDrawer,
  VFSelect,
  VFDialog,
  VFInput,
} from '@vidyafloww/ui';
import {
  Plus,
  Download,
  Check,
  Printer,
  Receipt,
  Send,
  Bell,
  MessageSquare,
  CreditCard,
  History,
  ShieldCheck,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  Building,
  Phone,
  Calendar,
  FileText,
  Briefcase,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

export const Route = createFileRoute('/salary')({
  component: SalaryPage,
});

export interface SalaryDisbursalReceipt {
  slipNo: string;
  month: string;
  disbursalDate: string;
  basicPay: number;
  allowances: number;
  grossPay: number;
  statutoryDeductions: number;
  advanceRecoveryDeduction: number;
  netPay: number;
  mode: 'Direct Corporate NEFT' | 'RTGS Transfer' | 'Cheque' | 'Cash Desk';
  referenceNo: string;
  status: 'Disbursed' | 'Pending';
  remarks?: string;
}

export interface AdvanceSalaryRecord {
  advanceId: string;
  sanctionDate: string;
  totalSanctioned: number;
  monthlyRecoveryInstallment: number;
  recoveredToDate: number;
  remainingBalance: number;
  reason: string;
  status: 'Active' | 'Settled';
}

export interface StaffSalaryRecord {
  id: string;
  staffName: string;
  staffId: string;
  photoUrl: string;
  designation: string;
  department: 'Teaching Faculty' | 'Administration' | 'Support Staff';
  paySchedule: 'Monthly (1st of month)' | 'Monthly (5th of month)' | 'Monthly (28th of month)';
  payCycleDay: number; // 1, 5, 28
  nextPayDate: string;
  basicPay: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  bankAccount: string;
  bankName: string;
  ifscCode: string;
  panNo: string;
  status: 'Disbursed' | 'Pending Disbursal' | 'Under Review';
  disbursalDate: string;
  disbursalRef: string;
  month: string;
  phone: string;
  email: string;
  advanceSalary?: AdvanceSalaryRecord;
  history: SalaryDisbursalReceipt[];
}

const INITIAL_SALARY_DATA: StaffSalaryRecord[] = [
  {
    id: '1',
    staffName: 'Dr. Rajesh Sharma',
    staffId: 'EMP-TCH-001',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    designation: 'Senior PGT Physics & Vice Principal',
    department: 'Teaching Faculty',
    paySchedule: 'Monthly (1st of month)',
    payCycleDay: 1,
    nextPayDate: '01 Sep 2026',
    basicPay: 65000,
    allowances: 26000, // DA + HRA + Special
    deductions: 9200,  // PF + TDS + PT
    netSalary: 81800,
    bankAccount: '•••• •••• 9921',
    bankName: 'HDFC Bank Ltd',
    ifscCode: 'HDFC0001092',
    panNo: 'ABCPS1290K',
    status: 'Disbursed',
    disbursalDate: '01 Aug 2026',
    disbursalRef: 'NEFT-HDFC-991823102',
    month: 'August 2026',
    phone: '+91 98111 22334',
    email: 'rajesh.sharma@vidyafloww.edu',
    advanceSalary: {
      advanceId: 'ADV-2026-081',
      sanctionDate: '15 May 2026',
      totalSanctioned: 30000,
      monthlyRecoveryInstallment: 5000,
      recoveredToDate: 15000,
      remainingBalance: 15000,
      reason: 'Home Renovation & Medical Emergency',
      status: 'Active',
    },
    history: [
      {
        slipNo: 'SLIP-2026-08-001',
        month: 'August 2026',
        disbursalDate: '01 Aug 2026',
        basicPay: 65000,
        allowances: 26000,
        grossPay: 91000,
        statutoryDeductions: 9200,
        advanceRecoveryDeduction: 5000,
        netPay: 76800,
        mode: 'Direct Corporate NEFT',
        referenceNo: 'NEFT-HDFC-991823102',
        status: 'Disbursed',
        remarks: 'Salary credited. Advance installment 3/6 recovered.',
      },
      {
        slipNo: 'SLIP-2026-07-001',
        month: 'July 2026',
        disbursalDate: '01 Jul 2026',
        basicPay: 65000,
        allowances: 26000,
        grossPay: 91000,
        statutoryDeductions: 9200,
        advanceRecoveryDeduction: 5000,
        netPay: 76800,
        mode: 'Direct Corporate NEFT',
        referenceNo: 'NEFT-HDFC-881290331',
        status: 'Disbursed',
        remarks: 'Salary credited. Advance installment 2/6 recovered.',
      },
      {
        slipNo: 'SLIP-2026-06-001',
        month: 'June 2026',
        disbursalDate: '01 Jun 2026',
        basicPay: 65000,
        allowances: 26000,
        grossPay: 91000,
        statutoryDeductions: 9200,
        advanceRecoveryDeduction: 5000,
        netPay: 76800,
        mode: 'Direct Corporate NEFT',
        referenceNo: 'NEFT-HDFC-772109842',
        status: 'Disbursed',
        remarks: 'Salary credited. Advance installment 1/6 recovered.',
      },
    ],
  },
  {
    id: '2',
    staffName: 'Ms. Pooja Rao',
    staffId: 'EMP-TCH-002',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    designation: 'TGT Mathematics & Department Head',
    department: 'Teaching Faculty',
    paySchedule: 'Monthly (1st of month)',
    payCycleDay: 1,
    nextPayDate: '01 Sep 2026',
    basicPay: 52000,
    allowances: 19500,
    deductions: 7100,
    netSalary: 64400,
    bankAccount: '•••• •••• 4410',
    bankName: 'ICICI Bank Ltd',
    ifscCode: 'ICIC0000441',
    panNo: 'BKPPR4419M',
    status: 'Disbursed',
    disbursalDate: '01 Aug 2026',
    disbursalRef: 'NEFT-ICIC-882109441',
    month: 'August 2026',
    phone: '+91 98222 33445',
    email: 'pooja.rao@vidyafloww.edu',
    history: [
      {
        slipNo: 'SLIP-2026-08-002',
        month: 'August 2026',
        disbursalDate: '01 Aug 2026',
        basicPay: 52000,
        allowances: 19500,
        grossPay: 71500,
        statutoryDeductions: 7100,
        advanceRecoveryDeduction: 0,
        netPay: 64400,
        mode: 'Direct Corporate NEFT',
        referenceNo: 'NEFT-ICIC-882109441',
        status: 'Disbursed',
        remarks: 'Regular monthly salary disbursed with full allowances.',
      },
      {
        slipNo: 'SLIP-2026-07-002',
        month: 'July 2026',
        disbursalDate: '01 Jul 2026',
        basicPay: 52000,
        allowances: 19500,
        grossPay: 71500,
        statutoryDeductions: 7100,
        advanceRecoveryDeduction: 0,
        netPay: 64400,
        mode: 'Direct Corporate NEFT',
        referenceNo: 'NEFT-ICIC-771920881',
        status: 'Disbursed',
        remarks: 'Monthly salary credited to ICICI salary account.',
      },
    ],
  },
  {
    id: '3',
    staffName: 'Mr. Arvind Gupta',
    staffId: 'EMP-ADM-001',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    designation: 'Chief Bursar & Finance Comptroller',
    department: 'Administration',
    paySchedule: 'Monthly (5th of month)',
    payCycleDay: 5,
    nextPayDate: '05 Sep 2026',
    basicPay: 70000,
    allowances: 28000,
    deductions: 10500,
    netSalary: 87500,
    bankAccount: '•••• •••• 8820',
    bankName: 'State Bank of India',
    ifscCode: 'SBIN0002910',
    panNo: 'AGPGA8821R',
    status: 'Disbursed',
    disbursalDate: '05 Aug 2026',
    disbursalRef: 'NEFT-SBI-771920882',
    month: 'August 2026',
    phone: '+91 97654 32109',
    email: 'arvind.gupta@vidyafloww.edu',
    history: [
      {
        slipNo: 'SLIP-2026-08-003',
        month: 'August 2026',
        disbursalDate: '05 Aug 2026',
        basicPay: 70000,
        allowances: 28000,
        grossPay: 98000,
        statutoryDeductions: 10500,
        advanceRecoveryDeduction: 0,
        netPay: 87500,
        mode: 'Direct Corporate NEFT',
        referenceNo: 'NEFT-SBI-771920882',
        status: 'Disbursed',
        remarks: 'Monthly bursar executive salary disbursed.',
      },
    ],
  },
  {
    id: '4',
    staffName: 'Mr. Deepak Mishra',
    staffId: 'EMP-TCH-003',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    designation: 'PGT Commerce & Accountancy',
    department: 'Teaching Faculty',
    paySchedule: 'Monthly (1st of month)',
    payCycleDay: 1,
    nextPayDate: '01 Sep 2026',
    basicPay: 58000,
    allowances: 22000,
    deductions: 8200,
    netSalary: 71800,
    bankAccount: '•••• •••• 3319',
    bankName: 'Axis Bank Ltd',
    ifscCode: 'UTIB0001088',
    panNo: 'DMIPM3319L',
    status: 'Disbursed',
    disbursalDate: '01 Aug 2026',
    disbursalRef: 'NEFT-AXIS-662910331',
    month: 'August 2026',
    phone: '+91 99887 76655',
    email: 'deepak.mishra@vidyafloww.edu',
    history: [
      {
        slipNo: 'SLIP-2026-08-004',
        month: 'August 2026',
        disbursalDate: '01 Aug 2026',
        basicPay: 58000,
        allowances: 22000,
        grossPay: 80000,
        statutoryDeductions: 8200,
        advanceRecoveryDeduction: 0,
        netPay: 71800,
        mode: 'Direct Corporate NEFT',
        referenceNo: 'NEFT-AXIS-662910331',
        status: 'Disbursed',
        remarks: 'Monthly salary credited to Axis bank.',
      },
    ],
  },
  {
    id: '5',
    staffName: 'Coach Vikram Singh',
    staffId: 'EMP-TCH-004',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    designation: 'Head of Physical Education & Sports',
    department: 'Teaching Faculty',
    paySchedule: 'Monthly (5th of month)',
    payCycleDay: 5,
    nextPayDate: '05 Sep 2026',
    basicPay: 48000,
    allowances: 16000,
    deductions: 6400,
    netSalary: 57600,
    bankAccount: '•••• •••• 1092',
    bankName: 'Punjab National Bank',
    ifscCode: 'PUNB0008819',
    panNo: 'VKSPS1092T',
    status: 'Disbursed',
    disbursalDate: '05 Aug 2026',
    disbursalRef: 'NEFT-PNB-552910109',
    month: 'August 2026',
    phone: '+91 98234 56789',
    email: 'vikram.singh@vidyafloww.edu',
    history: [
      {
        slipNo: 'SLIP-2026-08-005',
        month: 'August 2026',
        disbursalDate: '05 Aug 2026',
        basicPay: 48000,
        allowances: 16000,
        grossPay: 64000,
        statutoryDeductions: 6400,
        advanceRecoveryDeduction: 0,
        netPay: 57600,
        mode: 'Direct Corporate NEFT',
        referenceNo: 'NEFT-PNB-552910109',
        status: 'Disbursed',
        remarks: 'Monthly sports faculty salary credited.',
      },
    ],
  },
  {
    id: '6',
    staffName: 'Mrs. Sunita Verma',
    staffId: 'EMP-ADM-002',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    designation: 'Senior Registrar & Admissions Coordinator',
    department: 'Administration',
    paySchedule: 'Monthly (28th of month)',
    payCycleDay: 28,
    nextPayDate: '28 Aug 2026',
    basicPay: 46000,
    allowances: 15500,
    deductions: 5900,
    netSalary: 55600,
    bankAccount: '•••• •••• 5590',
    bankName: 'Kotak Mahindra Bank',
    ifscCode: 'KKBK0000918',
    panNo: 'SVPSV5590P',
    status: 'Pending Disbursal',
    disbursalDate: 'Pending Cycle Run',
    disbursalRef: 'QUEUE-#06',
    month: 'August 2026',
    phone: '+91 98123 45678',
    email: 'sunita.verma@vidyafloww.edu',
    advanceSalary: {
      advanceId: 'ADV-2026-044',
      sanctionDate: '02 Aug 2026',
      totalSanctioned: 20000,
      monthlyRecoveryInstallment: 4000,
      recoveredToDate: 0,
      remainingBalance: 20000,
      reason: 'Child Higher Education Fees',
      status: 'Active',
    },
    history: [
      {
        slipNo: 'SLIP-2026-07-006',
        month: 'July 2026',
        disbursalDate: '28 Jul 2026',
        basicPay: 46000,
        allowances: 15500,
        grossPay: 61500,
        statutoryDeductions: 5900,
        advanceRecoveryDeduction: 0,
        netPay: 55600,
        mode: 'Direct Corporate NEFT',
        referenceNo: 'NEFT-KKBK-441209331',
        status: 'Disbursed',
        remarks: 'Previous cycle disbursed cleanly.',
      },
    ],
  },
];

function SalaryPage() {
  const { addNotification } = useGlobalStore();
  const { t, lang } = useTranslation();
  const isHindi = lang === 'hi';
  React.useEffect(() => { document.title = t('page.salary') + ' \u2013 VidyaFloww'; }, [t]);
  const [salaries, setSalaries] = React.useState<StaffSalaryRecord[]>(INITIAL_SALARY_DATA);
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [selectedRecordIndex, setSelectedRecordIndex] = React.useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [drawerActiveTab, setDrawerActiveTab] = React.useState<'pay' | 'history' | 'advance' | 'structure'>('pay');
  const [isProcessModalOpen, setIsProcessModalOpen] = React.useState<boolean>(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = React.useState<boolean>(false);
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = React.useState<boolean>(false);

  // Active Pay Form State inside Drawer
  const [disburseMonth, setDisburseMonth] = React.useState('August 2026');
  const [advanceDeductionAmount, setAdvanceDeductionAmount] = React.useState<number>(0);
  const [disbursePaymentMode, setDisbursePaymentMode] = React.useState<'Direct Corporate NEFT' | 'RTGS Transfer' | 'Cheque' | 'Cash Desk'>('Direct Corporate NEFT');
  const [disbursalRemarks, setDisbursalRemarks] = React.useState('');

  // Advance Salary Request State
  const [advanceAmountInput, setAdvanceAmountInput] = React.useState('25000');
  const [advanceInstallmentsInput, setAdvanceInstallmentsInput] = React.useState('5');
  const [advanceReasonInput, setAdvanceReasonInput] = React.useState('Family Medical Assistance');

  // Bulk Notification Modal State
  const [alertAudience, setAlertAudience] = React.useState<'all' | 'disbursed' | 'pending'>('disbursed');
  const [alertChannel, setAlertChannel] = React.useState<'whatsapp' | 'sms' | 'email'>('whatsapp');
  const [customSalaryMsg, setCustomSalaryMsg] = React.useState<string>(
    'Dear {StaffName} ({Designation}), your salary for {Month} of net ₹{NetSalary} has been credited to your {BankName} account (A/c {AccountNo}). Download official payslip: https://vidyafloww.edu/slips/{StaffId}'
  );

  // Process Payroll Modal State
  const [payrollMonth, setPayrollMonth] = React.useState('August 2026');
  const [payrollDept, setPayrollDept] = React.useState('All Departments');

  const filteredSalaries = React.useMemo(() => {
    return salaries.filter((s) => {
      if (statusFilter !== 'all') {
        if (statusFilter === 'Disbursed' && s.status !== 'Disbursed') return false;
        if (statusFilter === 'Pending Disbursal' && s.status !== 'Pending Disbursal') return false;
        if (statusFilter === 'Teaching Faculty' && s.department !== 'Teaching Faculty') return false;
        if (statusFilter === 'Administration' && s.department !== 'Administration') return false;
      }
      return true;
    });
  }, [salaries, statusFilter]);

  const activeRecord =
    selectedRecordIndex !== null && selectedRecordIndex >= 0 && selectedRecordIndex < salaries.length
      ? salaries[selectedRecordIndex]
      : null;

  const openSlipDrawer = (record: StaffSalaryRecord, tab: 'pay' | 'history' | 'advance' | 'structure' = 'pay') => {
    const idx = salaries.findIndex((s) => s.id === record.id);
    setSelectedRecordIndex(idx >= 0 ? idx : 0);
    setDrawerActiveTab(record.status === 'Pending Disbursal' ? 'pay' : tab);
    setAdvanceDeductionAmount(record.advanceSalary?.monthlyRecoveryInstallment || 0);
    setDisbursalRemarks('');
    setIsDrawerOpen(true);
  };

  const handleNextStaff = () => {
    if (selectedRecordIndex !== null && selectedRecordIndex < salaries.length - 1) {
      setSelectedRecordIndex(selectedRecordIndex + 1);
      const next = salaries[selectedRecordIndex + 1];
      setAdvanceDeductionAmount(next.advanceSalary?.monthlyRecoveryInstallment || 0);
    }
  };

  const handlePrevStaff = () => {
    if (selectedRecordIndex !== null && selectedRecordIndex > 0) {
      setSelectedRecordIndex(selectedRecordIndex - 1);
      const prev = salaries[selectedRecordIndex - 1];
      setAdvanceDeductionAmount(prev.advanceSalary?.monthlyRecoveryInstallment || 0);
    }
  };

  const handleDisburseCurrentSalary = () => {
    if (selectedRecordIndex === null || !activeRecord) return;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    const utr = `NEFT-${activeRecord.bankName.slice(0, 4).toUpperCase()}-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const gross = activeRecord.basicPay + activeRecord.allowances;
    const net = Math.max(0, gross - activeRecord.deductions - advanceDeductionAmount);

    const newSlip: SalaryDisbursalReceipt = {
      slipNo: `SLIP-2026-08-${Math.floor(100 + Math.random() * 900)}`,
      month: disburseMonth,
      disbursalDate: dateStr,
      basicPay: activeRecord.basicPay,
      allowances: activeRecord.allowances,
      grossPay: gross,
      statutoryDeductions: activeRecord.deductions,
      advanceRecoveryDeduction: advanceDeductionAmount,
      netPay: net,
      mode: disbursePaymentMode,
      referenceNo: utr,
      status: 'Disbursed',
      remarks: disbursalRemarks || `Monthly salary for ${disburseMonth} disbursed via ${disbursePaymentMode}.`,
    };

    // Update advance salary balance if any
    let updatedAdvance = activeRecord.advanceSalary;
    if (updatedAdvance && advanceDeductionAmount > 0) {
      const nextRecovered = updatedAdvance.recoveredToDate + advanceDeductionAmount;
      const nextRemaining = Math.max(0, updatedAdvance.totalSanctioned - nextRecovered);
      updatedAdvance = {
        ...updatedAdvance,
        recoveredToDate: nextRecovered,
        remainingBalance: nextRemaining,
        status: nextRemaining === 0 ? 'Settled' : 'Active',
      };
    }

    const updated = [...salaries];
    updated[selectedRecordIndex] = {
      ...activeRecord,
      status: 'Disbursed',
      disbursalDate: dateStr,
      disbursalRef: utr,
      history: [newSlip, ...activeRecord.history],
      advanceSalary: updatedAdvance,
    };

    setSalaries(updated);
    setDrawerActiveTab('history');
    addNotification({
      title: 'Salary Disbursed & Payslip Issued',
      description: `Disbursed net ₹${net.toLocaleString('en-IN')} to ${activeRecord.staffName}. Payslip #${newSlip.slipNo} generated.`,
      type: 'success',
    });
  };

  const handleGrantNewAdvance = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRecordIndex === null || !activeRecord) return;
    const amount = Number(advanceAmountInput) || 0;
    const instCount = Number(advanceInstallmentsInput) || 1;
    const monthlyRecovery = Math.round(amount / instCount);

    const newAdvance: AdvanceSalaryRecord = {
      advanceId: `ADV-2026-${Math.floor(100 + Math.random() * 900)}`,
      sanctionDate: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      totalSanctioned: amount,
      monthlyRecoveryInstallment: monthlyRecovery,
      recoveredToDate: 0,
      remainingBalance: amount,
      reason: advanceReasonInput || 'Faculty Emergency Grant',
      status: 'Active',
    };

    const updated = [...salaries];
    updated[selectedRecordIndex] = {
      ...activeRecord,
      advanceSalary: newAdvance,
    };

    setSalaries(updated);
    setIsAdvanceModalOpen(false);
    addNotification({
      title: 'Advance Salary Sanctioned',
      description: `Sanctioned advance of ₹${amount.toLocaleString('en-IN')} for ${activeRecord.staffName} (Recovery: ₹${monthlyRecovery}/mo).`,
      type: 'success',
    });
  };

  const handleProcessPayroll = (e: React.FormEvent) => {
    e.preventDefault();
    setSalaries((prev) =>
      prev.map((s) => ({
        ...s,
        status: 'Disbursed',
        disbursalDate: '01 Aug 2026',
        disbursalRef: s.disbursalRef.startsWith('QUEUE') ? `NEFT-BULK-${Date.now().toString().slice(-6)}` : s.disbursalRef,
      }))
    );
    setIsProcessModalOpen(false);
    addNotification({
      title: 'Payroll Disbursed Successfully',
      description: `Disbursed ₹4,18,700 across ${salaries.length} institutional staff members for ${payrollMonth}.`,
      type: 'success',
    });
  };

  const handleDispatchSalaryAlerts = () => {
    let target = salaries;
    if (alertAudience === 'disbursed') {
      target = salaries.filter((s) => s.status === 'Disbursed');
    } else if (alertAudience === 'pending') {
      target = salaries.filter((s) => s.status === 'Pending Disbursal');
    }

    setIsAlertModalOpen(false);
    addNotification({
      title: 'Salary Slips & Alerts Dispatched',
      description: `Dispatched ${target.length} salary intimation alerts & payslip links via ${alertChannel.toUpperCase()} to faculty members.`,
      type: 'success',
    });
  };

  const handleSendIndividualAlert = (staff: StaffSalaryRecord, slipNo?: string) => {
    addNotification({
      title: 'Salary Intimation Sent',
      description: `Sent monthly payslip notification (${slipNo || staff.disbursalRef}) via WhatsApp to ${staff.staffName} (${staff.phone}).`,
      type: 'success',
    });
  };

  // Clean, uncluttered columns with simple terms
  const columns = [
    {
      header: isHindi ? 'स्टाफ व पद' : 'Staff & Role',
      accessorKey: 'staffName',
      cell: (r: StaffSalaryRecord) => (
        <div className="flex items-center gap-3">
          <div className="relative overflow-hidden rounded-md border border-border/80 shadow-xs w-10 h-[50px] shrink-0 bg-muted flex items-center justify-center">
            <img
              src={r.photoUrl}
              alt={r.staffName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-extrabold text-foreground text-sm leading-tight">{r.staffName}</p>
            <p className="text-xs text-muted-foreground font-semibold mt-0.5">
              {r.designation} · <span className="text-zinc-400">{r.department}</span> · <span className="font-mono text-zinc-400 font-semibold">{r.staffId}</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      header: isHindi ? 'पे साइकिल' : 'Pay Cycle',
      accessorKey: 'paySchedule',
      cell: (r: StaffSalaryRecord) => (
        <div className="space-y-0.5">
          <div className="flex items-center gap-1 text-xs">
            <span className="font-bold text-foreground">{r.paySchedule}</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono">
            {isHindi ? 'अगली:' : 'Next:'} <span className="text-zinc-300 font-semibold">{r.nextPayDate}</span>
          </p>
        </div>
      ),
    },
    {
      header: isHindi ? 'मूल वेतन' : 'Base Pay',
      accessorKey: 'basicPay',
      cell: (r: StaffSalaryRecord) => (
        <span className="font-mono font-bold text-foreground text-xs">
          ₹{r.basicPay.toLocaleString('en-IN')}
        </span>
      ),
    },
    {
      header: isHindi ? 'भत्ते' : 'Allowances',
      accessorKey: 'allowances',
      cell: (r: StaffSalaryRecord) => (
        <span className="font-mono font-semibold text-emerald-400 text-xs">
          +₹{r.allowances.toLocaleString('en-IN')}
        </span>
      ),
    },
    {
      header: isHindi ? 'नेट सैलरी' : 'Net Salary',
      accessorKey: 'netSalary',
      cell: (r: StaffSalaryRecord) => (
        <div className="flex items-center gap-2">
          <span className="font-mono font-black text-foreground text-sm">
            ₹{r.netSalary.toLocaleString('en-IN')}
          </span>
          {r.advanceSalary && r.advanceSalary.remainingBalance > 0 && (
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30" title="Active Advance Loan">
              {isHindi ? 'अग्रिम:' : 'Adv:'} ₹{r.advanceSalary.remainingBalance.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      ),
    },
    {
      header: t('col.status'),
      accessorKey: 'status',
      cell: (r: StaffSalaryRecord) => (
        <VFBadge variant={r.status === 'Disbursed' ? 'success' : 'warning'} className="rounded-md">
          {r.status === 'Disbursed' ? (isHindi ? 'वितरित' : 'Disbursed') : (isHindi ? 'लंबित' : r.status)}
        </VFBadge>
      ),
    },
    {
      header: t('col.action'),
      accessorKey: 'action',
      cell: (r: StaffSalaryRecord) => (
        <div className="flex items-center gap-1.5">
          {r.status === 'Pending Disbursal' ? (
            <VFButton
              size="sm"
              className="h-8 px-3 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-md shadow-xs border-0"
              leftIcon={<CreditCard className="h-3.5 w-3.5" />}
              onClick={() => openSlipDrawer(r, 'pay')}
            >
              {t('action.payNow')}
            </VFButton>
          ) : (
            <VFButton
              size="sm"
              variant="outline"
              className="h-8 px-3 text-xs font-bold bg-[#1a1a1a] hover:bg-[#242424] border-border hover:border-zinc-500 text-foreground shadow-xs rounded-md"
              leftIcon={<Receipt className="h-3.5 w-3.5 text-zinc-400" />}
              onClick={() => openSlipDrawer(r, 'history')}
            >
              {isHindi ? 'स्लिप्स' : 'Slips'} ({r.history.length})
            </VFButton>
          )}
          <button
            type="button"
            title={isHindi ? "व्हाट्सएप वेतन सूचना भेजें" : "Send WhatsApp Disbursal Intimation"}
            onClick={() => handleSendIndividualAlert(r)}
            className="h-8 w-8 rounded-md bg-[#1a1a1a] hover:bg-[#242424] border border-border flex items-center justify-center text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      ),
    },
  ];

  const disbursedCount = salaries.filter((s) => s.status === 'Disbursed').length;
  const pendingCount = salaries.filter((s) => s.status === 'Pending Disbursal').length;

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col">
      {/* Master Payroll Table with Single Quick Filter & Actions */}
      <VFDataTable
        columns={columns}
        data={filteredSalaries}
        filterPlaceholder={t('form.searchTeachers')}
        rightActions={
          <div className="flex items-center gap-2">
            <VFSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(String(e.target.value))}
              options={[
                { value: 'all', label: `${t('action.all')} (${salaries.length})` },
                { value: 'Disbursed', label: `${t('status.paid')} (${disbursedCount})` },
                { value: 'Pending Disbursal', label: `${t('status.pending')} (${pendingCount})` },
                { value: 'Teaching Faculty', label: t('nav.teachers') },
                { value: 'Administration', label: 'Admin Office' },
              ]}
              className="w-44 text-xs bg-[#181818] border-border rounded-md"
            />
            <VFButton
              variant="outline"
              size="sm"
              className="bg-[#181818] hover:bg-[#222222] border-border text-foreground rounded-md text-xs font-bold"
              leftIcon={<Bell className="h-4 w-4 text-emerald-400" />}
              onClick={() => setIsAlertModalOpen(true)}
            >
              {t('action.sendReminder')}
            </VFButton>
            <VFButton
              variant="outline"
              size="sm"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={() => addNotification({ title: 'Exporting Payroll', description: 'Monthly payroll register exported as CSV.', type: 'success' })}
            >
              {t('action.export')}
            </VFButton>
            <VFButton
              size="sm"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => setIsProcessModalOpen(true)}
            >
              {t('action.recordPayment')}
            </VFButton>
          </div>
        }
      />

      {/* 4. SEND BULK DISBURSAL ALERTS MODAL */}
      <VFDialog
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        title="Broadcast Faculty Salary Slips & Disbursal Alerts"
        description="Notify teachers and staff members via automated WhatsApp / SMS notifications with instant salary slip download links."
        className="max-w-xl"
      >
        <div className="space-y-4 pt-1 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-foreground">Target Staff Cohort</label>
              <VFSelect
                value={alertAudience}
                onChange={(e) => setAlertAudience(String(e.target.value) as any)}
                options={[
                  { label: `Disbursed Salaries (${disbursedCount} Staff)`, value: 'disbursed' },
                  { label: `All Staff & Faculty (${salaries.length} Members)`, value: 'all' },
                  { label: 'Pending Disbursals (Pre-Intimation)', value: 'pending' },
                ]}
                className="bg-[#1a1a1a] border-border h-9 text-xs rounded-md"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-foreground">Notification Channel</label>
              <VFSelect
                value={alertChannel}
                onChange={(e) => setAlertChannel(String(e.target.value) as any)}
                options={[
                  { label: 'WhatsApp Official Institutional API', value: 'whatsapp' },
                  { label: 'SMS Gateway (Direct Message)', value: 'sms' },
                  { label: 'Institutional Faculty Email', value: 'email' },
                ]}
                className="bg-[#1a1a1a] border-border h-9 text-xs rounded-md"
              />
            </div>
          </div>

          {/* Template Message Box */}
          <div className="space-y-1.5">
            <label className="font-bold text-foreground flex items-center justify-between">
              <span>Personalized Salary Intimation Message</span>
              <span className="text-[10px] text-muted-foreground font-mono">Dynamic Tags Supported</span>
            </label>
            <textarea
              value={customSalaryMsg}
              onChange={(e) => setCustomSalaryMsg(e.target.value)}
              rows={3}
              className="w-full p-2.5 rounded-md bg-[#141414] border border-border text-foreground font-mono text-xs focus:outline-none focus:border-zinc-500"
            />
            <div className="flex items-center gap-1 flex-wrap text-[10px] text-zinc-400">
              <span className="bg-[#1a1a1a] px-1.5 py-0.5 rounded border border-border/80">{'{StaffName}'}</span>
              <span className="bg-[#1a1a1a] px-1.5 py-0.5 rounded border border-border/80">{'{Designation}'}</span>
              <span className="bg-[#1a1a1a] px-1.5 py-0.5 rounded border border-border/80">{'{Month}'}</span>
              <span className="bg-[#1a1a1a] px-1.5 py-0.5 rounded border border-border/80">{'{NetSalary}'}</span>
              <span className="bg-[#1a1a1a] px-1.5 py-0.5 rounded border border-border/80">{'{BankName}'}</span>
              <span className="bg-[#1a1a1a] px-1.5 py-0.5 rounded border border-border/80">{'{StaffId}'}</span>
            </div>
          </div>

          {/* Live Preview WhatsApp Bubble */}
          <div className="p-3.5 rounded-md bg-[#0d1418] border border-emerald-900/40 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-emerald-400 font-bold">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" /> Sample Live WhatsApp Preview (Dr. Rajesh Sharma)
              </span>
              <span className="text-[10px] text-zinc-400">Recipient: +91 98111 22334</span>
            </div>
            <div className="p-2.5 rounded-md bg-[#005c4b]/30 border border-[#005c4b]/50 text-foreground text-xs leading-relaxed space-y-1">
              <p>
                Dear <span className="font-bold text-white">Dr. Rajesh Sharma</span> (Senior PGT Physics), your salary for <span className="font-bold text-emerald-400">August 2026</span> of net <span className="font-mono font-bold text-emerald-300">₹81,800</span> has been credited to your <span className="font-bold text-white">HDFC Bank Ltd</span> account (A/c •••• 9921).
              </p>
              <p className="text-[11px] text-zinc-300 pt-0.5">
                Download your official signed payslip PDF: <span className="underline text-emerald-300 font-mono">https://vidyafloww.edu/slips/EMP-TCH-001</span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <span className="text-xs text-muted-foreground">
              Will notify <span className="font-bold text-foreground">{disbursedCount} faculty members</span>.
            </span>
            <div className="flex items-center gap-2">
              <VFButton variant="outline" size="sm" onClick={() => setIsAlertModalOpen(false)} className="rounded-md">
                Cancel
              </VFButton>
              <VFButton
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-md font-bold"
                leftIcon={<Send className="h-4 w-4" />}
                onClick={handleDispatchSalaryAlerts}
              >
                Dispatch Salary Alerts
              </VFButton>
            </div>
          </div>
        </div>
      </VFDialog>

      {/* 5. Process Payroll Modal */}
      <VFDialog
        isOpen={isProcessModalOpen}
        onClose={() => setIsProcessModalOpen(false)}
        title="Process Institutional Payroll Cycle"
        description="Verify monthly biometric attendance, statutory PF/TDS deductions, and disburse bank transfers."
        className="max-w-md"
      >
        <form onSubmit={handleProcessPayroll} className="space-y-3.5 pt-1 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-foreground">Select Month & Year</label>
            <VFSelect
              value={payrollMonth}
              onChange={(e) => setPayrollMonth(String(e.target.value))}
              options={[
                { label: 'August 2026 (Current Cycle)', value: 'August 2026' },
                { label: 'July 2026', value: 'July 2026' },
                { label: 'September 2026 (Advance)', value: 'September 2026' },
              ]}
              className="bg-[#1a1a1a] border-border h-9 text-xs font-semibold rounded-md"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-foreground">Department Cohort</label>
            <VFSelect
              value={payrollDept}
              onChange={(e) => setPayrollDept(String(e.target.value))}
              options={[
                { label: 'All Institutional Staff (Teaching + Admin)', value: 'All Departments' },
                { label: 'Teaching Faculty Only', value: 'Teaching Faculty' },
                { label: 'Administrative & Bursar Office', value: 'Administration' },
              ]}
              className="bg-[#1a1a1a] border-border h-9 text-xs font-semibold rounded-md"
            />
          </div>

          <div className="p-3 rounded-md bg-[#1a1a1a] border border-border/70 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Total Staff Count:</span>
              <span className="font-bold text-foreground">{salaries.length} Employees</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Gross Disbursal Outflow:</span>
              <span className="font-mono font-black text-emerald-400">₹4,18,700</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Disbursal Channel:</span>
              <span className="font-mono text-zinc-300">Corporate NetBanking API</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <VFButton type="button" variant="outline" size="sm" onClick={() => setIsProcessModalOpen(false)} className="rounded-md">
              Cancel
            </VFButton>
            <VFButton type="submit" size="sm" leftIcon={<Check className="h-4 w-4" />} className="rounded-md">
              Authorize & Disburse
            </VFButton>
          </div>
        </form>
      </VFDialog>

      {/* 6. Grant Advance Salary Modal */}
      <VFDialog
        isOpen={isAdvanceModalOpen}
        onClose={() => setIsAdvanceModalOpen(false)}
        title={`Grant Advance Salary to ${activeRecord?.staffName}`}
        description="Sanction an institutional emergency advance against monthly payroll with automated installment recovery."
        className="max-w-md"
      >
        <form onSubmit={handleGrantNewAdvance} className="space-y-3.5 pt-1 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-foreground">Advance Amount (₹) *</label>
            <VFInput
              type="number"
              value={advanceAmountInput}
              onChange={(e) => setAdvanceAmountInput(e.target.value)}
              className="bg-[#181818] border-border text-xs rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-foreground">Tenure (Months) *</label>
              <VFSelect
                value={advanceInstallmentsInput}
                onChange={(e) => setAdvanceInstallmentsInput(String(e.target.value))}
                options={[
                  { label: '3 Months (Short Term)', value: '3' },
                  { label: '5 Months (Standard)', value: '5' },
                  { label: '6 Months', value: '6' },
                  { label: '10 Months (Long Term)', value: '10' },
                ]}
                className="bg-[#181818] border-border h-9 text-xs rounded-md"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-foreground">Monthly Deduction</label>
              <div className="h-9 px-3 rounded-md bg-[#141414] border border-border flex items-center font-mono font-bold text-rose-400 text-xs">
                - ₹{Math.round((Number(advanceAmountInput) || 0) / (Number(advanceInstallmentsInput) || 1)).toLocaleString('en-IN')}/mo
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-foreground">Reason / Sanction Purpose *</label>
            <VFInput
              value={advanceReasonInput}
              onChange={(e) => setAdvanceReasonInput(e.target.value)}
              placeholder="e.g. Medical, Education, Festival"
              className="bg-[#181818] border-border text-xs rounded-md"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <VFButton type="button" variant="outline" size="sm" onClick={() => setIsAdvanceModalOpen(false)} className="rounded-md">
              Cancel
            </VFButton>
            <VFButton type="submit" size="sm" className="bg-amber-600 hover:bg-amber-500 text-white rounded-md font-bold" leftIcon={<Check className="h-4 w-4" />}>
              Sanction Advance
            </VFButton>
          </div>
        </form>
      </VFDialog>

      {/* 7. Comprehensive Multi-Tab Staff Salary Drawer */}
      <VFDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        hideHeader={true}
        title={activeRecord ? `${activeRecord.staffName} Salary Dossier` : 'Salary Dossier'}
        className="w-[960px] max-w-[96vw] sm:max-w-4xl lg:max-w-5xl rounded-none sm:rounded-l-md"
        bodyClassName="p-0 flex flex-col h-full bg-[#111111]"
        footerActions={
          <div className="flex items-center justify-between w-full gap-3">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevStaff}
                disabled={selectedRecordIndex === 0}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#222222] transition-colors"
                title="Previous Staff Member"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs font-mono font-bold px-3 text-foreground select-none">
                {selectedRecordIndex !== null ? selectedRecordIndex + 1 : 1} of {salaries.length}
              </span>
              <button
                type="button"
                onClick={handleNextStaff}
                disabled={selectedRecordIndex === salaries.length - 1}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#222222] transition-colors"
                title="Next Staff Member"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <VFButton variant="outline" size="sm" className="rounded-md" onClick={() => setIsDrawerOpen(false)}>
              Close
            </VFButton>
          </div>
        }
      >
        {activeRecord && (
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto no-scrollbar">
            {/* 1. Header Identity Banner with Optimized Layout & Structured Info Grid */}
            <div className="p-4 bg-[#141414] border-b border-border/80 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shrink-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 min-w-0">
                <div
                  className="relative overflow-hidden rounded-md border border-border/90 shadow-sm w-24 sm:w-28 bg-muted flex items-center justify-center shrink-0"
                  style={{ aspectRatio: '19.5 / 25' }}
                >
                  <img
                    src={activeRecord.photoUrl}
                    alt={activeRecord.staffName}
                    style={{ aspectRatio: '19.5 / 25' }}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-[#141414] ring-2 ring-emerald-500/20" title="Active Faculty" />
                </div>
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-extrabold text-foreground tracking-tight">{activeRecord.staffName}</h3>
                    <VFBadge variant="outline" className="font-mono text-zinc-300 font-bold text-[11px] bg-[#1a1a1a] border-border rounded-md">
                      {activeRecord.staffId}
                    </VFBadge>
                    <VFBadge variant="primary" className="text-[10px] font-bold rounded-md">
                      {activeRecord.paySchedule}
                    </VFBadge>
                    <VFBadge variant={activeRecord.status === 'Disbursed' ? 'success' : 'warning'} className="rounded-md">
                      {activeRecord.status}
                    </VFBadge>
                  </div>

                  <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 truncate">
                    <Briefcase className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                    <span>{activeRecord.designation}</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-400">{activeRecord.department}</span>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted-foreground pt-1">
                    <div className="flex items-center gap-1.5 truncate">
                      <Building className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                      <span className="truncate">Bank: <strong className="text-foreground font-semibold">{activeRecord.bankName}</strong> ({activeRecord.bankAccount})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                      <span>PAN: <strong className="font-mono text-foreground font-bold">{activeRecord.panNo}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                      <span>Contact: <strong className="font-mono text-foreground">{activeRecord.phone}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                      <span>Disbursal: <strong className="text-foreground font-semibold">{activeRecord.disbursalDate}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-md bg-[#181818] border border-border/80 flex flex-col justify-center text-right shrink-0 min-w-[200px] shadow-xs">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Net Take-Home Pay</span>
                <span className="text-2xl font-black text-emerald-400 font-mono mt-0.5 block">
                  ₹{activeRecord.netSalary.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-muted-foreground font-semibold mt-0.5">Cycle: {activeRecord.paySchedule}</span>
              </div>
            </div>

            {/* 2. Structured Tabs Bar with Simple Short Names */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#161616] border-b border-border/80 shrink-0 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setDrawerActiveTab('pay')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  drawerActiveTab === 'pay'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-[#202020]'
                }`}
              >
                <CreditCard className="h-3.5 w-3.5" />
                <span>Pay Salary</span>
              </button>

              <button
                type="button"
                onClick={() => setDrawerActiveTab('history')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  drawerActiveTab === 'history'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-[#202020]'
                }`}
              >
                <History className="h-3.5 w-3.5" />
                <span>Past Slips ({activeRecord.history.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setDrawerActiveTab('advance')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  drawerActiveTab === 'advance'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-[#202020]'
                }`}
              >
                <TrendingDown className="h-3.5 w-3.5" />
                <span>Advance Salary {activeRecord.advanceSalary && activeRecord.advanceSalary.remainingBalance > 0 ? `(₹${activeRecord.advanceSalary.remainingBalance.toLocaleString('en-IN')})` : ''}</span>
              </button>

              <button
                type="button"
                onClick={() => setDrawerActiveTab('structure')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  drawerActiveTab === 'structure'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-[#202020]'
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Salary Breakdown</span>
              </button>
            </div>

            {/* 3. TAB 1: PAY SALARY */}
            {drawerActiveTab === 'pay' && (
              <div className="p-5 space-y-4">
                <div className="p-4 rounded-md bg-[#141414] border border-border/80 space-y-4">
                  <h4 className="font-extrabold text-foreground text-xs uppercase tracking-wider pb-2 border-b border-border/60 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-emerald-400" />
                      Pay Monthly Salary
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 font-medium">
                      Bank A/c: {activeRecord.bankAccount} ({activeRecord.bankName})
                    </span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-foreground text-xs">Salary Month</label>
                      <VFSelect
                        value={disburseMonth}
                        onChange={(e) => setDisburseMonth(String(e.target.value))}
                        options={[
                          { label: 'August 2026 (Current)', value: 'August 2026' },
                          { label: 'September 2026', value: 'September 2026' },
                          { label: 'July 2026', value: 'July 2026' },
                        ]}
                        className="bg-[#181818] border-border h-9 text-xs rounded-md"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-foreground text-xs">Payment Method</label>
                      <VFSelect
                        value={disbursePaymentMode}
                        onChange={(e) => setDisbursePaymentMode(e.target.value as any)}
                        options={[
                          { label: 'Bank Transfer (NEFT)', value: 'Direct Corporate NEFT' },
                          { label: 'Bank RTGS Transfer', value: 'RTGS Transfer' },
                          { label: 'Cheque Issue', value: 'Cheque' },
                          { label: 'Cash Payment', value: 'Cash Desk' },
                        ]}
                        className="bg-[#181818] border-border h-9 text-xs rounded-md"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-foreground text-xs">Advance Cut</label>
                      {activeRecord.advanceSalary && activeRecord.advanceSalary.remainingBalance > 0 ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={advanceDeductionAmount}
                            onChange={(e) => setAdvanceDeductionAmount(Number(e.target.value) || 0)}
                            className="w-full h-9 px-3 rounded-md bg-[#181818] border border-border text-foreground font-mono font-bold text-xs"
                          />
                          <span className="text-[10px] text-amber-400 whitespace-nowrap font-bold">
                            Bal: ₹{activeRecord.advanceSalary.remainingBalance.toLocaleString('en-IN')}
                          </span>
                        </div>
                      ) : (
                        <div className="h-9 px-3 rounded-md bg-[#181818] border border-border flex items-center text-muted-foreground text-xs">
                          No active advance
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Live Calculation Summary Banner */}
                  <div className="p-3.5 rounded-md bg-[#181818] border border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 font-semibold text-muted-foreground">
                        <span>Base + Allowances: <strong className="text-foreground">₹{(activeRecord.basicPay + activeRecord.allowances).toLocaleString('en-IN')}</strong></span>
                        <span>PF & Tax: <strong className="text-rose-400">-₹{activeRecord.deductions.toLocaleString('en-IN')}</strong></span>
                        {advanceDeductionAmount > 0 && (
                          <span>Advance Cut: <strong className="text-amber-400">-₹{advanceDeductionAmount.toLocaleString('en-IN')}</strong></span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">Net Pay</span>
                      <span className="text-xl font-black text-emerald-400 font-mono">
                        ₹{(activeRecord.basicPay + activeRecord.allowances - activeRecord.deductions - advanceDeductionAmount).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-foreground text-xs">Notes (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Monthly salary disbursed with advance installment recovery."
                      value={disbursalRemarks}
                      onChange={(e) => setDisbursalRemarks(e.target.value)}
                      className="w-full h-9 px-3 rounded-md bg-[#181818] border border-border text-foreground text-xs"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <VFButton
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-md font-bold px-5 h-9"
                      leftIcon={<Check className="h-4 w-4" />}
                      onClick={handleDisburseCurrentSalary}
                    >
                      Pay Now (₹{(activeRecord.basicPay + activeRecord.allowances - activeRecord.deductions - advanceDeductionAmount).toLocaleString('en-IN')})
                    </VFButton>
                  </div>
                </div>
              </div>
            )}

            {/* 4. TAB 2: PAST SLIPS */}
            {drawerActiveTab === 'history' && (
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-foreground text-xs uppercase tracking-wider flex items-center gap-2">
                    <History className="h-4 w-4 text-primary" />
                    Past Salary Slips
                  </h4>
                  <span className="text-xs text-muted-foreground font-semibold">
                    {activeRecord.history.length} Slip(s) on record
                  </span>
                </div>

                <div className="space-y-3">
                  {activeRecord.history.map((slip, i) => (
                    <div
                      key={slip.slipNo || i}
                      className="p-4 rounded-md bg-[#141414] border border-border/80 space-y-3 hover:border-zinc-500 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-border/60">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-mono font-bold text-xs text-foreground bg-[#1a1a1a] px-2 py-0.5 rounded border border-border">
                            {slip.slipNo}
                          </span>
                          <span className="font-bold text-foreground text-sm">{slip.month}</span>
                          <VFBadge variant="success" className="rounded-md">Paid</VFBadge>
                          <span className="text-xs text-muted-foreground font-mono">
                            Paid On: {slip.disbursalDate}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <VFButton
                            size="sm"
                            variant="outline"
                            className="h-7 px-2.5 text-xs bg-[#1a1a1a] hover:bg-[#222222] border-border text-foreground rounded-md font-semibold"
                            leftIcon={<Printer className="h-3.5 w-3.5" />}
                            onClick={() => addNotification({ title: 'Downloading Payslip PDF', description: `Payslip ${slip.slipNo} for ${activeRecord.staffName} (${slip.month}) downloaded.`, type: 'info' })}
                          >
                            Print Slip
                          </VFButton>
                          <VFButton
                            size="sm"
                            variant="outline"
                            className="h-7 px-2.5 text-xs bg-[#1a1a1a] hover:bg-[#222222] border-border text-foreground rounded-md font-semibold"
                            leftIcon={<Send className="h-3.5 w-3.5 text-emerald-400" />}
                            onClick={() => handleSendIndividualAlert(activeRecord, slip.slipNo)}
                          >
                            WhatsApp
                          </VFButton>
                        </div>
                      </div>

                      {/* Itemized row */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold block">Gross Pay</span>
                          <span className="font-mono font-bold text-foreground">₹{slip.grossPay.toLocaleString('en-IN')}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold block">PF & Tax</span>
                          <span className="font-mono font-bold text-rose-400">-₹{slip.statutoryDeductions.toLocaleString('en-IN')}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold block">Advance Cut</span>
                          <span className="font-mono font-bold text-amber-400">
                            {slip.advanceRecoveryDeduction > 0 ? `-₹${slip.advanceRecoveryDeduction.toLocaleString('en-IN')}` : '₹0'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold block">Net Pay</span>
                          <span className="font-mono font-black text-emerald-400 text-sm">₹{slip.netPay.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <span className="text-[10px] text-muted-foreground uppercase font-bold block">Ref Number</span>
                          <span className="font-mono text-zinc-300 truncate block text-[11px]">{slip.referenceNo}</span>
                        </div>
                      </div>

                      {slip.remarks && (
                        <p className="text-[11px] text-muted-foreground italic border-t border-border/40 pt-1.5">
                          "{slip.remarks}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. TAB 3: ADVANCE SALARY */}
            {drawerActiveTab === 'advance' && (
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-foreground text-xs uppercase tracking-wider flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-amber-400" />
                    Advance Salary Records
                  </h4>
                  <VFButton
                    size="sm"
                    className="bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-md text-xs"
                    leftIcon={<Plus className="h-3.5 w-3.5" />}
                    onClick={() => setIsAdvanceModalOpen(true)}
                  >
                    + Give Advance
                  </VFButton>
                </div>

                {activeRecord.advanceSalary ? (
                  <div className="p-4 rounded-md bg-[#141414] border border-border/80 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-border/60">
                      <div>
                        <span className="font-mono font-bold text-xs text-foreground bg-[#1a1a1a] px-2 py-0.5 rounded border border-border">
                          {activeRecord.advanceSalary.advanceId}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2 font-semibold">
                          Given On: {activeRecord.advanceSalary.sanctionDate}
                        </span>
                      </div>
                      <VFBadge variant={activeRecord.advanceSalary.status === 'Active' ? 'warning' : 'success'} className="rounded-md">
                        {activeRecord.advanceSalary.status === 'Active' ? 'Active Advance' : 'Settled'}
                      </VFBadge>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold block">Total Advance</span>
                        <span className="font-mono font-bold text-foreground text-sm">
                          ₹{activeRecord.advanceSalary.totalSanctioned.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold block">Monthly Cut</span>
                        <span className="font-mono font-bold text-rose-400">
                          - ₹{activeRecord.advanceSalary.monthlyRecoveryInstallment.toLocaleString('en-IN')}/mo
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold block">Amount Returned</span>
                        <span className="font-mono font-bold text-emerald-400">
                          ₹{activeRecord.advanceSalary.recoveredToDate.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold block">Remaining</span>
                        <span className="font-mono font-black text-amber-400 text-base">
                          ₹{activeRecord.advanceSalary.remainingBalance.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[11px] font-semibold text-muted-foreground">
                        <span>Repayment Progress</span>
                        <span>{Math.round((activeRecord.advanceSalary.recoveredToDate / activeRecord.advanceSalary.totalSanctioned) * 100)}% Repaid</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#222222] overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(100, Math.round((activeRecord.advanceSalary.recoveredToDate / activeRecord.advanceSalary.totalSanctioned) * 100))}%`,
                          }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Reason: <strong className="text-foreground font-semibold">{activeRecord.advanceSalary.reason}</strong>
                    </p>
                  </div>
                ) : (
                  <div className="p-8 rounded-md bg-[#141414] border border-border/80 text-center space-y-2">
                    <ShieldCheck className="h-8 w-8 text-emerald-400 mx-auto" />
                    <p className="font-bold text-foreground text-sm">No Active Advance</p>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                      This staff member currently has no pending advance salary. Click '+ Give Advance' to add one.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 6. TAB 4: SALARY BREAKDOWN */}
            {drawerActiveTab === 'structure' && (
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Earnings Column */}
                  <div className="p-4 rounded-md bg-[#141414] border border-border/80 space-y-2.5">
                    <h4 className="font-extrabold text-emerald-400 uppercase tracking-wider text-xs pb-1.5 border-b border-border/60 flex items-center justify-between">
                      <span>Monthly Earnings</span>
                      <span className="font-mono">₹{(activeRecord.basicPay + activeRecord.allowances).toLocaleString('en-IN')}</span>
                    </h4>
                    <div className="space-y-1.5">
                      <div className="flex justify-between py-1 border-b border-border/40">
                        <span className="text-muted-foreground font-semibold">Basic Pay</span>
                        <span className="font-mono font-bold text-foreground">₹{activeRecord.basicPay.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border/40">
                        <span className="text-muted-foreground font-semibold">Dearness Allowance (DA 50%)</span>
                        <span className="font-mono font-bold text-foreground">₹{Math.round(activeRecord.basicPay * 0.5).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border/40">
                        <span className="text-muted-foreground font-semibold">House Rent (HRA 24%)</span>
                        <span className="font-mono font-bold text-foreground">₹{Math.round(activeRecord.basicPay * 0.24).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border/40">
                        <span className="text-muted-foreground font-semibold">Special Allowance</span>
                        <span className="font-mono font-bold text-foreground">₹{(activeRecord.allowances - Math.round(activeRecord.basicPay * 0.74)).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Deductions Column */}
                  <div className="p-4 rounded-md bg-[#141414] border border-border/80 space-y-2.5">
                    <h4 className="font-extrabold text-rose-400 uppercase tracking-wider text-xs pb-1.5 border-b border-border/60 flex items-center justify-between">
                      <span>Monthly Deductions</span>
                      <span className="font-mono">- ₹{activeRecord.deductions.toLocaleString('en-IN')}</span>
                    </h4>
                    <div className="space-y-1.5">
                      <div className="flex justify-between py-1 border-b border-border/40">
                        <span className="text-muted-foreground font-semibold">Provident Fund (EPF 12%)</span>
                        <span className="font-mono font-bold text-rose-400">- ₹{Math.round(activeRecord.basicPay * 0.12).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border/40">
                        <span className="text-muted-foreground font-semibold">Income Tax (TDS)</span>
                        <span className="font-mono font-bold text-rose-400">- ₹{(activeRecord.deductions - Math.round(activeRecord.basicPay * 0.12) - 200).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border/40">
                        <span className="text-muted-foreground font-semibold">Professional Tax</span>
                        <span className="font-mono font-bold text-rose-400">- ₹200</span>
                      </div>
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
