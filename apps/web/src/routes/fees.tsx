import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFSection,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import {
  CircleDollarSign,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Send,
} from 'lucide-react';

export const Route = createFileRoute('/fees')({
  component: FeesPage,
});

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

function FeesPage() {
  const feeModule = MODULE_REGISTRY.find((m) => m.id === 'fees');

  const dueRecords: StudentDueRecord[] = [
    { id: '1', rollNo: '1001', name: 'Rahul Sharma', class: '10-A', totalFee: 66000, paid: 66000, discount: 0, due: 0, status: 'Paid' },
    { id: '2', rollNo: '1002', name: 'Priya Patel', class: '10-A', totalFee: 66000, paid: 33000, discount: 5000, due: 28000, status: 'Partial' },
    { id: '3', rollNo: '1003', name: 'Amit Kumar', class: '10-A', totalFee: 66000, paid: 0, discount: 0, due: 66000, status: 'Overdue' },
    { id: '4', rollNo: '1004', name: 'Sneha Singh', class: '10-A', totalFee: 66000, paid: 66000, discount: 0, due: 0, status: 'Paid' },
    { id: '5', rollNo: '1005', name: 'Vikram Mehta', class: '10-A', totalFee: 66000, paid: 20000, discount: 10000, due: 36000, status: 'Overdue' },
  ];

  // 1. Fee Dashboard Submodule Content
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Expected Fees" value="₹ 1.62 Cr" icon={<CircleDollarSign className="h-5 w-5" />} trend="up" trendLabel="Academic Session 2026-27" />
        <VFStatCard title="Collected YTD" value="₹ 1.24 Cr" icon={<CheckCircle2 className="h-5 w-5" />} trend="up" trendLabel="76.5% Collection Rate" />
        <VFStatCard title="Outstanding Dues" value="₹ 38.0 Lakhs" icon={<AlertTriangle className="h-5 w-5" />} trend="down" trendLabel="142 Defaulters" />
        <VFStatCard title="Discounts & Scholarships" value="₹ 12.5 Lakhs" icon={<Sparkles className="h-5 w-5" />} trend="up" trendLabel="48 Beneficiaries" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <VFSection title="Student Fee Account Overview" className="lg:col-span-2">
          <VFDataTable
            columns={[
              { header: 'Roll No', accessorKey: 'rollNo' },
              { header: 'Student Name', accessorKey: 'name', cell: (r: StudentDueRecord) => <span className="font-bold text-foreground">{r.name}</span> },
              { header: 'Class', accessorKey: 'class' },
              { header: 'Total Fee', accessorKey: 'totalFee', cell: (r: StudentDueRecord) => `₹ ${r.totalFee.toLocaleString('en-IN')}` },
              { header: 'Paid', accessorKey: 'paid', cell: (r: StudentDueRecord) => <span className="text-success font-semibold">₹ {r.paid.toLocaleString('en-IN')}</span> },
              { header: 'Due', accessorKey: 'due', cell: (r: StudentDueRecord) => <span className="text-destructive font-semibold">₹ {r.due.toLocaleString('en-IN')}</span> },
              {
                header: 'Status',
                accessorKey: 'status',
                cell: (r: StudentDueRecord) => (
                  <VFBadge variant={r.status === 'Paid' ? 'success' : r.status === 'Partial' ? 'warning' : 'danger'}>
                    {r.status}
                  </VFBadge>
                ),
              },
            ]}
            data={dueRecords}
            filterPlaceholder="Search student name or roll number..."
          />
        </VFSection>

        <VFCard title="Fee Collection & Reminders">
          <div className="space-y-3 text-xs mt-2">
            <div className="p-3 bg-muted/40 rounded-xl border border-border/60 space-y-1">
              <p className="font-bold text-foreground">Term 2 Fee Reminder Queue</p>
              <p className="text-muted-foreground text-xs">142 Automated WhatsApp & SMS notifications queued</p>
              <VFButton variant="primary" size="sm" className="w-full mt-2" leftIcon={<Send className="h-3.5 w-3.5" />}>
                Send Reminders Now
              </VFButton>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // Submodule tabs mapping
  const submoduleTabs = (feeModule?.submodules || [
    { id: 'dashboard', label: 'Fee Dashboard' },
    { id: 'structures', label: 'Fee Structures' },
    { id: 'student-accounts', label: 'Student Accounts' },
    { id: 'collections', label: 'Collections' },
    { id: 'discounts', label: 'Discounts & Scholarships' },
    { id: 'payments', label: 'Payments & Refunds' },
    { id: 'dues', label: 'Dues & Defaulters' },
    { id: 'reports', label: 'Fee Reports' },
    { id: 'settings', label: 'Fee Settings' },
  ]).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <CircleDollarSign className="h-3.5 w-3.5" />,
    content: dashboardContent,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={submoduleTabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
