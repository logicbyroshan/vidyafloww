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
} from '@vidyafloww/ui';
import {
  Building,
  ShieldCheck,
  Calendar,
  FileCheck,
  Plus,
  Lock,
  Settings,
  Shield,
  GraduationCap,
  Award,
  BookOpen,
  Upload,
  CheckCircle2,
  Image as ImageIcon,
  Building2,
  Trash2,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/settings')({
  component: SchoolAdministrationPage,
});

function SchoolAdministrationPage() {
  const { schoolProfile, updateSchoolProfile, addNotification } = useGlobalStore();

  // Local form state for school branding
  const [formData, setFormData] = React.useState({
    name: schoolProfile.name,
    shortCode: schoolProfile.shortCode,
    tagline: schoolProfile.tagline,
    affiliation: schoolProfile.affiliation,
    city: schoolProfile.city,
    logoPreset: schoolProfile.logoPreset,
    customLogoUrl: schoolProfile.customLogoUrl || '',
  });

  const [savedSuccess, setSavedSuccess] = React.useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setFormData((prev) => ({
          ...prev,
          customLogoUrl: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchoolProfile({
      name: formData.name.trim() || 'VidyaFloww International Academy',
      shortCode: formData.shortCode.trim(),
      tagline: formData.tagline.trim(),
      affiliation: formData.affiliation.trim(),
      city: formData.city.trim(),
      logoPreset: formData.logoPreset,
      customLogoUrl: formData.customLogoUrl,
    });
    setSavedSuccess(true);
    addNotification({
      title: 'School Identity Updated',
      description: `Portal branding updated to "${formData.name}". Header logo and name are now live.`,
      type: 'success',
    });
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const presetLogos: { id: 'building' | 'shield' | 'graduation' | 'award' | 'book'; label: string; icon: any }[] = [
    { id: 'building', label: 'Campus Building', icon: Building2 },
    { id: 'shield', label: 'Heritage Shield', icon: Shield },
    { id: 'graduation', label: 'Academic Cap', icon: GraduationCap },
    { id: 'award', label: 'Honor Ribbon', icon: Award },
    { id: 'book', label: 'Knowledge Book', icon: BookOpen },
  ];

  const campusData = [
    { code: 'CMP-01', name: `${schoolProfile.name} (Main Campus)`, city: schoolProfile.city, board: schoolProfile.affiliation, session: '2026-2027', students: 1248, status: 'Active Primary' },
    { code: 'CMP-02', name: `${schoolProfile.name} (North Branch)`, city: 'Gurugram', board: 'CBSE / IB', session: '2026-2027', students: 840, status: 'Active Branch' },
  ];

  const campusColumns = [
    {
      header: 'Campus Code',
      accessorKey: 'code',
      cell: (r: any) => <span className="font-mono font-bold text-primary text-base">{r.code}</span>,
    },
    {
      header: 'Institution Name',
      accessorKey: 'name',
      cell: (r: any) => <span className="font-extrabold text-foreground text-base">{r.name}</span>,
    },
    {
      header: 'City / Region',
      accessorKey: 'city',
      cell: (r: any) => <span className="text-foreground text-base font-semibold">{r.city}</span>,
    },
    {
      header: 'Board Affiliation',
      accessorKey: 'board',
      cell: (r: any) => <span className="text-foreground font-bold text-base">{r.board}</span>,
    },
    {
      header: 'Active Session',
      accessorKey: 'session',
      cell: (r: any) => <span className="text-muted-foreground text-base font-semibold">{r.session}</span>,
    },
    {
      header: 'Enrolled Strength',
      accessorKey: 'students',
      cell: (r: any) => <span className="font-black text-foreground text-base">{r.students} Students</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge>,
    },
  ];

  // 1. School Profile & Branding View
  const profileContent = (
    <div className="space-y-6">
      {/* Success Notification Alert */}
      {savedSuccess && (
        <div className="p-4 bg-success/15 border border-success/30 rounded-lg text-base text-foreground flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-success shrink-0" />
            <span className="font-bold">School identity and logo updated live across the portal!</span>
          </div>
          <button
            onClick={() => setSavedSuccess(false)}
            className="text-muted-foreground hover:text-foreground text-sm font-black cursor-pointer px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard
          title="Active Session"
          value="2026 - 2027"
          icon={<Calendar className="h-5 w-5" />}
          trend="up"
          trendLabel="Term 1 In Progress"
          accentColor="amber"
        />
        <VFStatCard
          title="Campuses"
          value="2 Campuses"
          icon={<Building className="h-5 w-5" />}
          trend="neutral"
          trendLabel="Main & North Branch"
          accentColor="blue"
        />
        <VFStatCard
          title="CBSE Affiliation"
          value="Compliant"
          icon={<ShieldCheck className="h-5 w-5" />}
          trend="up"
          trendLabel="Valid till 2030"
          accentColor="emerald"
        />
        <VFStatCard
          title="Audit Registers"
          value="100% Ready"
          icon={<FileCheck className="h-5 w-5" />}
          trend="up"
          trendLabel="RTE Compliant"
          accentColor="purple"
        />
      </div>

      {/* Interactive School Identity & Custom Logo Studio */}
      <VFCard
        title="School Identity & Custom Logo Studio"
        description="Update your institution name, custom logo crest, and accreditation shown in the portal header"
      >
        <form onSubmit={handleSaveBranding} className="space-y-6 mt-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Form Inputs */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-black text-foreground uppercase tracking-wider">
                    School Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. VidyaFloww International Academy"
                    className="w-full px-3.5 py-2.5 text-base border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 font-semibold h-11"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-black text-foreground uppercase tracking-wider">
                    Institution Short Code
                  </label>
                  <input
                    type="text"
                    value={formData.shortCode}
                    onChange={(e) => setFormData({ ...formData, shortCode: e.target.value })}
                    placeholder="e.g. SA-DELHI"
                    className="w-full px-3.5 py-2.5 text-base border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 font-semibold h-11"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-black text-foreground uppercase tracking-wider">
                    Board Affiliation Code
                  </label>
                  <input
                    type="text"
                    value={formData.affiliation}
                    onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                    placeholder="e.g. CBSE Affiliation #1630982"
                    className="w-full px-3.5 py-2.5 text-base border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 font-semibold h-11"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-black text-foreground uppercase tracking-wider">
                    Campus City / Region
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. New Delhi, India"
                    className="w-full px-3.5 py-2.5 text-base border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 font-semibold h-11"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-black text-foreground uppercase tracking-wider">
                  Motto / Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Excellence in Education & Character"
                  className="w-full px-3.5 py-2.5 text-base border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 font-semibold h-11"
                />
              </div>

              {/* Logo Selection: Preset Crests or Custom Upload */}
              <div className="space-y-3 pt-2">
                <label className="text-sm font-black text-foreground uppercase tracking-wider block">
                  School Logo & Emblem
                </label>

                {/* Preset Crest Options */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {presetLogos.map((preset) => {
                    const Icon = preset.icon;
                    const isSelected = formData.logoPreset === preset.id && !formData.customLogoUrl;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, logoPreset: preset.id, customLogoUrl: '' })}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'border-primary bg-primary/15 text-primary shadow-xs'
                            : 'border-border bg-card/60 text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <Icon className="h-6 w-6 mb-1" />
                        <span className="text-xs font-bold truncate">{preset.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Logo File Upload or URL */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-border bg-muted/30 hover:bg-muted text-foreground cursor-pointer text-sm font-bold transition-colors shrink-0 h-11">
                    <Upload className="h-4 w-4 text-primary" />
                    <span>Upload Custom Logo File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={formData.customLogoUrl}
                      onChange={(e) => setFormData({ ...formData, customLogoUrl: e.target.value })}
                      placeholder="Or enter image URL (https://...)..."
                      className="w-full pl-9 pr-8 py-2 text-sm border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground font-medium h-11"
                    />
                    <ImageIcon className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    {formData.customLogoUrl && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, customLogoUrl: '' })}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive p-1"
                        title="Clear custom image"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Live Header Preview */}
            <div className="space-y-3">
              <label className="text-sm font-black text-foreground uppercase tracking-wider block">
                Live Header Preview
              </label>

              <div className="p-4 rounded-lg bg-muted/40 border border-border space-y-4">
                <p className="text-xs text-muted-foreground font-semibold">
                  This is exactly how your custom school identity badge will appear on the top right of the portal:
                </p>

                {/* Simulated Header Badge */}
                <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-card border border-border shadow-xs h-11 w-fit">
                  <div className="h-7 w-7 rounded-md bg-primary/15 flex items-center justify-center shrink-0 overflow-hidden">
                    {formData.customLogoUrl ? (
                      <img
                        src={formData.customLogoUrl}
                        alt="Preview"
                        className="h-7 w-7 object-contain rounded-md"
                      />
                    ) : (
                      (() => {
                        const Found = presetLogos.find((p) => p.id === formData.logoPreset)?.icon || Building2;
                        return <Found className="h-4 w-4 text-primary" />;
                      })()
                    )}
                  </div>
                  <span className="text-base font-extrabold text-foreground tracking-tight max-w-[200px] truncate">
                    {formData.name || 'School Name'}
                  </span>
                </div>

                <div className="text-xs space-y-1 text-muted-foreground pt-1 border-t border-border/70">
                  <p><span className="font-bold text-foreground">Affiliation:</span> {formData.affiliation || 'None'}</p>
                  <p><span className="font-bold text-foreground">Location:</span> {formData.city || 'Not set'}</p>
                </div>
              </div>

              <div className="pt-2">
                <VFButton type="submit" size="md" className="w-full">
                  Save & Apply Branding Live
                </VFButton>
              </div>
            </div>
          </div>
        </form>
      </VFCard>

      {/* Campus Branch Master Directory Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-foreground tracking-tight">Campus Branch Master Directory</h2>
            <p className="text-sm text-muted-foreground font-medium">Manage multi-campus locations, accreditation codes, and principal leadership</p>
          </div>
          <VFButton size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Add Campus Branch
          </VFButton>
        </div>

        <VFDataTable
          columns={campusColumns}
          data={campusData}
          filterPlaceholder="Search campus or affiliation..."
        />
      </div>
    </div>
  );

  // 2. System & Security View
  const systemContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="Biometric Sync Engine" description="Hardware gate synchronization">
          <div className="divide-y divide-border -my-2 text-base">
            <div className="flex justify-between items-center py-2.5 px-1">
              <span className="font-bold text-foreground text-sm">Turnstile Terminal 1</span>
              <VFBadge variant="success">Online</VFBadge>
            </div>
            <div className="flex justify-between items-center py-2.5 px-1">
              <span className="font-bold text-foreground text-sm">Turnstile Terminal 2</span>
              <VFBadge variant="success">Online</VFBadge>
            </div>
            <div className="flex justify-between items-center py-2.5 px-1">
              <span className="font-bold text-foreground text-sm">Staff Bio Scanner</span>
              <VFBadge variant="success">Online</VFBadge>
            </div>
          </div>
        </VFCard>

        <VFCard title="SMS & WhatsApp Gateway" description="Parent notification delivery">
          <div className="space-y-2 mt-1 text-base">
            <p className="text-3xl font-black text-foreground">99.8% Delivery</p>
            <p className="text-muted-foreground text-sm font-semibold">Active provider: Twilio & Gupshup</p>
            <VFBadge variant="success">Gateway Healthy</VFBadge>
          </div>
        </VFCard>

        <VFCard title="Automated Daily Backups" description="Encrypted cloud disaster recovery">
          <div className="space-y-2 mt-1 text-base">
            <p className="text-3xl font-black text-foreground">Daily 02:00 AM</p>
            <p className="text-muted-foreground text-sm font-semibold">Last backup: Today at 02:00 AM (248MB)</p>
            <VFBadge variant="outline">Encrypted AES-256</VFBadge>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 3. Roles & Permissions View
  const rolesContent = (
    <div className="space-y-6">
      <VFCard title="Role-Based Access Control (RBAC)" description="Permissions and module access levels">
        <div className="divide-y divide-border -my-2">
          {[
            { role: 'Super Administrator', users: '2 Users', access: 'Full system privileges & database access' },
            { role: 'School Principal', users: '2 Users', access: 'Academic oversight, admissions approvals, staff workload' },
            { role: 'Faculty / Teachers', users: '124 Users', access: 'Attendance roll call, homework, examinations, grade entries' },
            { role: 'Front Office / Registrar', users: '6 Users', access: 'Student admissions, fee collection records, TC issuance' },
          ].map((r, i) => (
            <div key={i} className="py-3 px-1 flex items-center justify-between text-base">
              <div>
                <p className="font-bold text-foreground text-base">{r.role}</p>
                <p className="text-muted-foreground text-sm font-medium mt-0.5">{r.access}</p>
              </div>
              <VFBadge variant="outline">{r.users}</VFBadge>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  const tabs = [
    { id: 'profile', label: 'School Profile & Branding', icon: <Building className="h-4 w-4" />, content: profileContent },
    { id: 'system', label: 'System & Gate Integrations', icon: <Settings className="h-4 w-4" />, content: systemContent },
    { id: 'roles', label: 'Roles & Access Control', icon: <Lock className="h-4 w-4" />, content: rolesContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="profile" variant="top-bar" />
    </VFPageContainer>
  );
}
