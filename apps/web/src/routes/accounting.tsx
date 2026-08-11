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
  Landmark,
  CreditCard,
  Wallet,
  Plus,
  TrendingUp,
} from 'lucide-react';

export const Route = createFileRoute('/accounting')({
  component: AccountingPage,
});

interface AccountLedgerItem {
  id: string;
  code: string;
  name: string;
  type: 'Asset' | 'Liability' | 'Equity' | 'Income' | 'Expense';
  balance: number;
  status: 'Active' | 'Locked';
}

interface ExpenseItem {
  id: string;
  voucherNo: string;
  category: string;
  payee: string;
  amount: number;
  date: string;
  status: 'Approved' | 'Pending Approval' | 'Audited';
}

interface VendorPOItem {
  id: string;
  poNumber: string;
  vendorName: string;
  category: string;
  amount: number;
  deliveryDate: string;
  status: 'Delivered' | 'In Transit' | 'Approved';
}

function AccountingPage() {
  const financeModule = MODULE_REGISTRY.find((m) => m.id === 'finance');

  const coaData: AccountLedgerItem[] = [
    { id: '1', code: '1000', name: 'Current Assets - HDFC Operating Bank Account', type: 'Asset', balance: 4280500, status: 'Active' },
    { id: '2', code: '2000', name: 'Accounts Payable - Laboratory & Book Vendors', type: 'Liability', balance: 320000, status: 'Active' },
    { id: '3', code: '3000', name: 'Institutional Capital & Infrastructure Reserve', type: 'Equity', balance: 15000000, status: 'Active' },
    { id: '4', code: '4000', name: 'Student Tuition Revenue Account', type: 'Income', balance: 18400000, status: 'Active' },
    { id: '5', code: '5000', name: 'Faculty & Administrative Staff Payroll Expense', type: 'Expense', balance: 6800000, status: 'Active' },
  ];

  const expenseData: ExpenseItem[] = [
    { id: '1', voucherNo: 'EXP-2026-041', category: 'Utilities & Power', payee: 'State Electricity Board', amount: 145000, date: '2026-08-09', status: 'Approved' },
    { id: '2', voucherNo: 'EXP-2026-042', category: 'Science Lab Chemicals', payee: 'Sigma Scientific Instruments', amount: 68000, date: '2026-08-10', status: 'Approved' },
    { id: '3', voucherNo: 'EXP-2026-043', category: 'Sports Field Turf Repair', payee: 'GreenTurf Ground Solutions', amount: 42000, date: '2026-08-10', status: 'Pending Approval' },
    { id: '4', voucherNo: 'EXP-2026-044', category: 'Library Books Bulk Order', payee: 'Oxford Publishing Corp', amount: 125000, date: '2026-08-11', status: 'Audited' },
  ];

  const vendorPOs: VendorPOItem[] = [
    { id: '1', poNumber: 'PO-2026-088', vendorName: 'Dell India Enterprise', category: 'Computer Lab Workstations', amount: 480000, deliveryDate: 'Aug 20, 2026', status: 'Approved' },
    { id: '2', poNumber: 'PO-2026-089', vendorName: 'Apex School Furniture', category: 'Classroom Desks & Chairs', amount: 240000, deliveryDate: 'Aug 25, 2026', status: 'In Transit' },
    { id: '3', poNumber: 'PO-2026-090', vendorName: 'Tata Motors Bus Division', category: 'School Bus Fleet Chassis', amount: 1850000, deliveryDate: 'Sep 05, 2026', status: 'Delivered' },
  ];

  // 1. Finance Dashboard Submodule Content
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Operating Cash Balance" value="₹ 42.8 Lakhs" icon={<Landmark className="h-5 w-5" />} trend="up" trendLabel="HDFC & SBI Accounts" />
        <VFStatCard title="Expenses YTD" value="₹ 68.0 Lakhs" icon={<CreditCard className="h-5 w-5" />} trend="down" trendLabel="Within Budget Limits" />
        <VFStatCard title="Accounts Payable" value="₹ 3.20 Lakhs" icon={<Wallet className="h-5 w-5" />} description="3 Vendor Bills Due" />
        <VFStatCard title="Capital Reserves" value="₹ 1.50 Cr" icon={<TrendingUp className="h-5 w-5" />} trend="up" trendLabel="Audited & Secure" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <VFSection title="General Ledger Chart of Accounts (COA)" className="lg:col-span-2">
          <VFDataTable
            columns={[
              { header: 'Account Code', accessorKey: 'code', cell: (r: AccountLedgerItem) => <span className="font-mono font-bold text-primary">{r.code}</span> },
              { header: 'Account Name', accessorKey: 'name', cell: (r: AccountLedgerItem) => <span className="font-bold text-foreground">{r.name}</span> },
              { header: 'Type', accessorKey: 'type', cell: (r: AccountLedgerItem) => <VFBadge variant="outline">{r.type}</VFBadge> },
              { header: 'Current Balance', accessorKey: 'balance', cell: (r: AccountLedgerItem) => `₹ ${r.balance.toLocaleString('en-IN')}` },
              { header: 'Status', accessorKey: 'status', cell: (r: AccountLedgerItem) => <VFBadge variant="success">{r.status}</VFBadge> },
            ]}
            data={coaData}
            filterPlaceholder="Search ledger code or account name..."
          />
        </VFSection>

        <VFCard title="Recent Operating Vouchers">
          <div className="space-y-3 text-xs mt-2">
            {expenseData.slice(0, 3).map((exp, i) => (
              <div key={i} className="p-3 bg-muted/40 rounded-xl border border-border/60 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">{exp.payee}</span>
                  <span className="font-mono font-bold text-primary">₹ {exp.amount.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-muted-foreground text-xs">{exp.voucherNo} · {exp.category}</p>
                <VFBadge variant={exp.status === 'Approved' ? 'success' : 'warning'}>{exp.status}</VFBadge>
              </div>
            ))}
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 2. Expenses Submodule Content
  const expensesContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground">Operational Expense Register & Vouchers</h3>
          <p className="text-xs text-muted-foreground">Utility bills, maintenance, equipment purchases, and petty cash logs.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Expense Voucher</VFButton>
      </div>
      <VFDataTable
        columns={[
          { header: 'Voucher No', accessorKey: 'voucherNo', cell: (r: ExpenseItem) => <span className="font-mono font-bold text-primary">{r.voucherNo}</span> },
          { header: 'Payee / Vendor', accessorKey: 'payee', cell: (r: ExpenseItem) => <span className="font-bold text-foreground">{r.payee}</span> },
          { header: 'Expense Category', accessorKey: 'category' },
          { header: 'Voucher Date', accessorKey: 'date' },
          { header: 'Amount Paid', accessorKey: 'amount', cell: (r: ExpenseItem) => <span className="font-bold text-foreground">₹ ${r.amount.toLocaleString('en-IN')}</span> },
          { header: 'Status', accessorKey: 'status', cell: (r: ExpenseItem) => <VFBadge variant={r.status === 'Approved' ? 'success' : 'warning'}>{r.status}</VFBadge> },
        ]}
        data={expenseData}
        filterPlaceholder="Search expense vouchers..."
      />
    </div>
  );

  // 3. Vendors & Purchases Submodule Content
  const vendorsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground">Empanelled Vendors & Purchase Orders (PO)</h3>
          <p className="text-xs text-muted-foreground">Active purchase orders, supplier quotations, and GST tax profiles.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Create Purchase Order</VFButton>
      </div>
      <VFDataTable
        columns={[
          { header: 'PO Number', accessorKey: 'poNumber', cell: (r: VendorPOItem) => <span className="font-mono font-bold text-primary">{r.poNumber}</span> },
          { header: 'Vendor Name', accessorKey: 'vendorName', cell: (r: VendorPOItem) => <span className="font-bold text-foreground">{r.vendorName}</span> },
          { header: 'Procurement Category', accessorKey: 'category' },
          { header: 'Delivery Date', accessorKey: 'deliveryDate' },
          { header: 'PO Amount', accessorKey: 'amount', cell: (r: VendorPOItem) => `₹ ${r.amount.toLocaleString('en-IN')}` },
          { header: 'PO Status', accessorKey: 'status', cell: (r: VendorPOItem) => <VFBadge variant={r.status === 'Delivered' ? 'success' : 'primary'}>{r.status}</VFBadge> },
        ]}
        data={vendorPOs}
        filterPlaceholder="Search purchase orders or vendors..."
      />
    </div>
  );

  // Submodule map
  const contentMap: Record<string, React.ReactNode> = {
    dashboard: dashboardContent,
    expenses: expensesContent,
    vendors: vendorsContent,
    accounting: dashboardContent,
    budget: dashboardContent,
    reconciliation: dashboardContent,
    controls: dashboardContent,
    reports: dashboardContent,
  };

  const submoduleTabs = (financeModule?.submodules || [
    { id: 'dashboard', label: 'Finance Dashboard' },
    { id: 'expenses', label: 'Expenses' },
    { id: 'vendors', label: 'Vendors & Purchases' },
    { id: 'accounting', label: 'Accounting' },
    { id: 'budget', label: 'Budget' },
    { id: 'reconciliation', label: 'Bank & Reconciliation' },
    { id: 'controls', label: 'Financial Controls' },
    { id: 'reports', label: 'Finance Reports' },
  ]).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <Landmark className="h-3.5 w-3.5" />,
    content: contentMap[sub.id] || dashboardContent,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={submoduleTabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
