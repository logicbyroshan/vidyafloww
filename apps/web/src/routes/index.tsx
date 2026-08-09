import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFPageHeader,
  VFSection,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFBadge,
} from '@vidyamaxx/ui';
import { Users, GraduationCap, CalendarCheck, FileText, Download } from 'lucide-react';
import * as React from 'react';

export const Route = createFileRoute('/')({
  component: DashboardPage,
});

function DashboardPage() {
  const breadcrumbs = (
    <div className="text-sm text-muted-foreground flex items-center gap-2">
      <span className="text-primary font-medium">VidyaMaxx</span>
      <span>/</span>
      <span>Dashboard</span>
    </div>
  );

  const mockData = [
    { id: '1', name: 'Rahul Sharma', class: '10-A', status: 'Present', lastUpdate: '08:30 AM' },
    { id: '2', name: 'Priya Patel', class: '10-A', status: 'Absent', lastUpdate: '08:35 AM' },
    { id: '3', name: 'Amit Kumar', class: '9-B', status: 'Present', lastUpdate: '08:20 AM' },
    { id: '4', name: 'Sneha Singh', class: '11-Sci', status: 'Late', lastUpdate: '09:15 AM' },
    { id: '5', name: 'Vikram Mehta', class: '12-Com', status: 'Present', lastUpdate: '08:25 AM' },
  ];

  const columns = [
    { header: 'Student Name', accessorKey: 'name', sortable: true },
    { header: 'Class', accessorKey: 'class', sortable: true },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (row: any) => (
        <VFBadge 
          variant={
            row.status === 'Present' ? 'success' : 
            row.status === 'Absent' ? 'danger' : 'warning'
          }
        >
          {row.status}
        </VFBadge>
      )
    },
    { header: 'Last Update', accessorKey: 'lastUpdate' },
  ];

  return (
    <VFPageContainer>
      <VFPageHeader
        title="Dashboard Overview"
        description="Here's what's happening at your school today."
        breadcrumbs={breadcrumbs}
        actions={
          <VFButton variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export Report
          </VFButton>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <VFStatCard
          title="Total Students"
          value="2,451"
          icon={<Users />}
          trend="up"
          trendLabel="+12 this month"
        />
        <VFStatCard
          title="Teaching Staff"
          value="142"
          icon={<GraduationCap />}
          description="98% attendance today"
        />
        <VFStatCard
          title="Today's Attendance"
          value="94.5%"
          icon={<CalendarCheck />}
          trend="up"
          trendLabel="+1.2% from yesterday"
        />
        <VFStatCard
          title="Pending Applications"
          value="28"
          icon={<FileText />}
          trend="down"
          trendLabel="-5 since last week"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <VFSection title="Recent Activities" className="lg:col-span-2">
          <VFDataTable
            columns={columns}
            data={mockData}
            filterPlaceholder="Search students..."
          />
        </VFSection>

        <VFSection title="Quick Actions">
          <div className="flex flex-col gap-3 bg-card border border-border p-4 rounded-lg shadow-sm">
            <VFButton variant="secondary" className="w-full justify-start">Send Announcement</VFButton>
            <VFButton variant="secondary" className="w-full justify-start">Mark Bulk Attendance</VFButton>
            <VFButton variant="secondary" className="w-full justify-start">Review Fees Defaulters</VFButton>
            <VFButton variant="outline" className="w-full justify-start mt-2 border-dashed">View All Reports →</VFButton>
          </div>
        </VFSection>
      </div>
    </VFPageContainer>
  );
}
