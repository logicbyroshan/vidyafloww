import * as React from 'react';
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
  Plus,
  CreditCard,
  Receipt,
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

interface FeeStructureItem {
  id: string;
  class: string;
  tuition: number;
  transport: number;
  computer: number;
  activity: number;
  total: number;
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

  const feeStructures: FeeStructureItem[] = [
    { id: '1', class: 'Class 9 (General)', tuition: 45000, transport: 12000, computer: 3000, activity: 2500, total: 62500 },
    { id: '2', class: 'Class 10 (General)', tuition: 48000, transport: 12000, computer: 3500, activity: 2500, total: 66000 },
    { id: '3', class: 'Class 11 (Science)', tuition: 55000, transport: 14000, computer: 5000, activity: 3000, total: 77000 },
    { id: '4', class: 'Class 12 (Science)', tuition: 58000, transport: 14000, computer: 5000, activity: 3000, total: 80000 },
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

  // 2. Fee Structures Submodule Content
  const structuresContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground">Class-Wise Fee Structure Matrix</h3>
          <p className="text-xs text-muted-foreground">Tuition, transport, computer, and activity breakdown for 2026-2027.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Create Fee Head</VFButton>
      </div>
      <VFDataTable
        columns={[
          { header: 'Class Grade', accessorKey: 'class', cell: (r: FeeStructureItem) => <span className="font-bold text-primary">{r.class}</span> },
          { header: 'Tuition Fee', accessorKey: 'tuition', cell: (r: FeeStructureItem) => `₹ ${r.tuition.toLocaleString('en-IN')}` },
          { header: 'Transport Fee', accessorKey: 'transport', cell: (r: FeeStructureItem) => `₹ ${r.transport.toLocaleString('en-IN')}` },
          { header: 'Computer Lab', accessorKey: 'computer', cell: (r: FeeStructureItem) => `₹ ${r.computer.toLocaleString('en-IN')}` },
          { header: 'Activities & Sports', accessorKey: 'activity', cell: (r: FeeStructureItem) => `₹ ${r.activity.toLocaleString('en-IN')}` },
          { header: 'Total Annual Fee', accessorKey: 'total', cell: (r: FeeStructureItem) => <span className="font-bold text-foreground">₹ ${r.total.toLocaleString('en-IN')}</span> },
        ]}
        data={feeStructures}
        filterPlaceholder="Filter fee structures..."
      />
    </div>
  );

  // 3. Student Accounts Submodule Content
  const studentAccountsContent = (
    <div className="space-y-4">
      <VFCard title="Student Ledger & Payment History">
        <p className="text-xs text-muted-foreground mb-3">Individual student ledger statements, installments, and payment receipt downloads.</p>
        <VFDataTable
          columns={[
            { header: 'Roll No', accessorKey: 'rollNo' },
            { header: 'Student Name', accessorKey: 'name', cell: (r: StudentDueRecord) => <span className="font-bold text-foreground">{r.name}</span> },
            { header: 'Class', accessorKey: 'class' },
            { header: 'Paid YTD', accessorKey: 'paid', cell: (r: StudentDueRecord) => <span className="text-success font-semibold">₹ {r.paid.toLocaleString('en-IN')}</span> },
            { header: 'Current Dues', accessorKey: 'due', cell: (r: StudentDueRecord) => <span className="text-destructive font-semibold">₹ {r.due.toLocaleString('en-IN')}</span> },
            {
              header: 'Actions',
              accessorKey: 'id',
              cell: () => (
                <VFButton size="sm" variant="outline" leftIcon={<Receipt className="h-3.5 w-3.5" />}>
                  Download Receipt
                </VFButton>
              ),
            },
          ]}
          data={dueRecords}
          filterPlaceholder="Search student accounts..."
        />
      </VFCard>
    </div>
  );

  // 4. Collections Submodule Content
  const collectionsContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <VFStatCard title="Counter Cash Today" value="₹ 1,42,000" icon={<Receipt className="h-5 w-5" />} description="34 Receipts Issued" />
        <VFStatCard title="Online Gateway Collections" value="₹ 4,85,000" icon={<CreditCard className="h-5 w-5" />} trend="up" trendLabel="Razorpay & UPI" />
        <VFStatCard title="Cheques Pending Clearance" value="₹ 85,000" icon={<CircleDollarSign className="h-5 w-5" />} description="3 Cheques Deposited" />
      </div>
      <VFCard title="Today's Counter Fee Collection Register">
        <p className="text-xs text-muted-foreground mb-3">Real-time daily collection counter logs with instant thermal receipt printing.</p>
      </VFCard>
    </div>
  );

  // 5. Discounts & Scholarships Submodule Content
  const discountsContent = (
    <div className="space-y-4">
      <VFCard title="Scholarship, Merit & Staff Sibling Concession Schemes">
        <div className="space-y-2.5 text-xs mt-2">
          {[
            { scheme: 'Merit Excellence Waiver (100% Tuition)', beneficiaries: '14 Students', discountVal: '₹ 6,30,000 Total' },
            { scheme: 'Sibling Concession (25% Tuition)', beneficiaries: '28 Students', discountVal: '₹ 4,20,000 Total' },
            { scheme: 'Staff Dependent Scholarship', beneficiaries: '6 Students', discountVal: '₹ 2,00,000 Total' },
          ].map((d, i) => (
            <div key={i} className="p-3 bg-muted/40 rounded-xl border border-border/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">{d.scheme}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{d.beneficiaries}</p>
              </div>
              <VFBadge variant="primary">{d.discountVal}</VFBadge>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // Submodule map
  const contentMap: Record<string, React.ReactNode> = {
    dashboard: dashboardContent,
    structures: structuresContent,
    'student-accounts': studentAccountsContent,
    collections: collectionsContent,
    discounts: discountsContent,
    payments: collectionsContent,
    dues: dashboardContent,
    reports: dashboardContent,
    settings: structuresContent,
  };

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
    content: contentMap[sub.id] || dashboardContent,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={submoduleTabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
