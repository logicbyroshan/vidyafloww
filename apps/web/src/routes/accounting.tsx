import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFButton, VFBadge, VFDataTable } from '@vidyamaxx/ui';
import { Landmark, DollarSign, CreditCard, FileText, ShoppingCart, Truck, Wallet, BarChart3, Plus } from 'lucide-react';

export const Route = createFileRoute('/accounting')({
  component: AccountingPage,
});

function AccountingPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('chart-of-accounts');

  const coaData = [
    { code: '1000', name: 'Current Assets - Bank Accounts', type: 'Asset', balance: '₹ 42,80,500', status: 'Active' },
    { code: '2000', name: 'Accounts Payable - Vendors', type: 'Liability', balance: '₹ 3,20,000', status: 'Active' },
    { code: '3000', name: 'Institutional Capital Reserve', type: 'Equity', balance: '₹ 1,50,000,000', status: 'Active' },
    { code: '4000', name: 'Student Tuition Revenue', type: 'Income', balance: '₹ 18,400,000', status: 'Active' },
    { code: '5000', name: 'Staff Payroll Expense', type: 'Expense', balance: '₹ 6,800,000', status: 'Active' },
  ];

  const coaColumns = [
    { header: 'Account Code', accessorKey: 'code', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.code}</span> },
    { header: 'Account Name', accessorKey: 'name' },
    { header: 'Type', accessorKey: 'type', cell: (r: any) => <VFBadge variant="outline">{r.type}</VFBadge> },
    { header: 'Current Balance', accessorKey: 'balance', cell: (r: any) => <span className="font-bold text-foreground">{r.balance}</span> },
    { header: 'Status', accessorKey: 'status', cell: () => <VFBadge variant="success">Active</VFBadge> },
  ];

  const submoduleTabs = [
    {
      id: 'chart-of-accounts',
      label: 'Chart of Accounts (COA)',
      icon: <Landmark className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-foreground">General Ledger Chart of Accounts (COA)</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Assets, Liabilities, Equity, Revenue, and Operating Expense ledgers.</p>
            </div>
            <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Ledger Account</VFButton>
          </div>
          <VFDataTable columns={coaColumns} data={coaData} filterPlaceholder="Search account code or ledger name..." />
        </div>
      ),
    },
    {
      id: 'income-mgmt',
      label: 'Income Management',
      icon: <DollarSign className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Non-Fee School Revenue & Grants">
          <p className="text-xs text-muted-foreground">Record canteen leases, auditorium rental income, government education grants, and alumni donations.</p>
        </VFCard>
      ),
    },
    {
      id: 'expense-mgmt',
      label: 'Expense Management',
      icon: <CreditCard className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Operating Expenses & Voucher Approvals">
          <p className="text-xs text-muted-foreground">Utility bills (Electricity, Water), maintenance repairs, sports equipment purchases, and petty cash vouchers.</p>
        </VFCard>
      ),
    },
    {
      id: 'bills-payments',
      label: 'Bills & Vendor Payments',
      icon: <FileText className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Vendor Bills & Payment Disbursement">
          <p className="text-xs text-muted-foreground">Track vendor invoices due, schedule NEFT / RTGS bank payments, and record payment receipts.</p>
        </VFCard>
      ),
    },
    {
      id: 'quotations',
      label: 'Quotation Management',
      icon: <FileText className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Supplier Quotations & Cost Comparison">
          <p className="text-xs text-muted-foreground">Compare 3-way vendor price quotes for bulk procurement and approve lowest bidders.</p>
        </VFCard>
      ),
    },
    {
      id: 'purchase-orders',
      label: 'Purchase Orders (PO)',
      icon: <ShoppingCart className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Official Purchase Orders & Invoicing">
          <p className="text-xs text-muted-foreground">Generate legally binding PO documents with tax terms, delivery milestones, and payment conditions.</p>
        </VFCard>
      ),
    },
    {
      id: 'vendor-mgmt',
      label: 'Vendor Management',
      icon: <Truck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Empanelled Vendors & GST / Tax Profiles">
          <p className="text-xs text-muted-foreground">Maintain vendor GSTIN registration numbers, bank account details for payouts, and TDS tax deductions.</p>
        </VFCard>
      ),
    },
    {
      id: 'bank-cash',
      label: 'Bank & Cashbook',
      icon: <Wallet className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Daily Cashbook & Bank Reconciliation">
          <p className="text-xs text-muted-foreground">Daily cash drawer closing balances, bank statement uploads, and automatic ledger reconciliation.</p>
        </VFCard>
      ),
    },
    {
      id: 'financial-reports',
      label: 'Financial Reports & Budgeting',
      icon: <BarChart3 className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Income Statement (P&L), Balance Sheet & Tax Audit">
          <p className="text-xs text-muted-foreground">Generate Profit & Loss statements, Balance Sheet, Budget vs Actual variance reports, and annual tax returns.</p>
        </VFCard>
      ),
    },
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
