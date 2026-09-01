import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFButton,
  VFCard,
  VFBadge,
  VFDialog,
  VFSelect,
} from '@vidyafloww/ui';
import {
  Building,
  Plus,
  Lock,
  Upload,
  CheckCircle2,
  Building2,
  Trash2,
  Server,
  RefreshCw,
  Check,
  Wifi,
  Database,
  Radio,
  Edit2,
  CheckCircle,
  School,
  X,
  SlidersHorizontal,
  Terminal,
  MapPin,
  Languages,
  Globe,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

export const Route = createFileRoute('/settings')({
  component: SchoolAdministrationPage,
});

interface CampusRecord {
  code: string;
  name: string;
  city: string;
  board: string;
  session: string;
  students: number;
  principal: string;
  status: 'Active Primary' | 'Active Branch';
  coverUrl: string;
  logoUrl?: string;
}

const INITIAL_CAMPUSES: CampusRecord[] = [
  {
    code: 'CMP-01',
    name: 'VidyaFloww International Academy (Main Campus)',
    city: 'New Delhi, India',
    board: 'CBSE Affiliation #1630982',
    session: '2026-2027',
    students: 1248,
    principal: 'Dr. Rajesh Sharma',
    status: 'Active Primary',
    coverUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&auto=format&fit=crop&q=80',
  },
  {
    code: 'CMP-02',
    name: 'VidyaFloww International Academy (North Branch)',
    city: 'Gurugram, Haryana',
    board: 'CBSE / IB World',
    session: '2026-2027',
    students: 840,
    principal: 'Ms. Pooja Rao',
    status: 'Active Branch',
    coverUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80',
  },
  {
    code: 'CMP-03',
    name: 'VidyaFloww International Academy (South Campus)',
    city: 'Noida, Uttar Pradesh',
    board: 'CBSE Affiliation #1630990',
    session: '2026-2027',
    students: 363,
    principal: 'Mr. Deepak Mishra',
    status: 'Active Branch',
    coverUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop&q=80',
  },
];

function SchoolAdministrationPage() {
  const {
    schoolProfile,
    updateSchoolProfile,
    addNotification,
    language,
    setLanguage,
  } = useGlobalStore();
  const { t } = useTranslation();

  // Branding Edit Mode state
  const [isEditingBranding, setIsEditingBranding] = React.useState(false);

  // Local form state for school branding
  const [formData, setFormData] = React.useState({
    name: schoolProfile.name,
    shortCode: schoolProfile.shortCode,
    tagline: schoolProfile.tagline,
    affiliation: schoolProfile.affiliation,
    city: schoolProfile.city,
    customLogoUrl: schoolProfile.customLogoUrl || '',
    establishedYear: '1994',
    academicLevel: 'K-12 Senior Secondary',
    principalName: 'Dr. Rajesh Sharma, Ph.D.',
  });

  const [savedSuccess, setSavedSuccess] = React.useState(false);

  // Campus master data state
  const [campuses, setCampuses] = React.useState<CampusRecord[]>(INITIAL_CAMPUSES);
  const [isAddCampusModalOpen, setIsAddCampusModalOpen] = React.useState(false);
  const [editingCampus, setEditingCampus] = React.useState<CampusRecord | null>(null);
  const [newCampus, setNewCampus] = React.useState<Partial<CampusRecord>>({
    code: `CMP-0${campuses.length + 1}`,
    name: '',
    city: '',
    board: 'CBSE Affiliation',
    session: '2026-2027',
    students: 250,
    principal: '',
    status: 'Active Branch',
    coverUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&auto=format&fit=crop&q=80',
    logoUrl: '',
  });

  // Diagnostics Modal State
  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = React.useState(false);
  const [diagnosticsRunning, setDiagnosticsRunning] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Sync state if store updates
  React.useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: schoolProfile.name,
      shortCode: schoolProfile.shortCode,
      tagline: schoolProfile.tagline,
      affiliation: schoolProfile.affiliation,
      city: schoolProfile.city,
      customLogoUrl: schoolProfile.customLogoUrl || '',
    }));
  }, [schoolProfile]);

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

  const handleSaveBranding = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateSchoolProfile({
      name: formData.name.trim() || 'VidyaFloww International Academy',
      shortCode: formData.shortCode.trim(),
      tagline: formData.tagline.trim(),
      affiliation: formData.affiliation.trim(),
      city: formData.city.trim(),
      customLogoUrl: formData.customLogoUrl,
      logoType: formData.customLogoUrl ? 'custom_image' : 'preset',
    });
    setIsEditingBranding(false);
    setSavedSuccess(true);
    addNotification({
      title: 'School Identity Updated',
      description: `Portal branding updated to "${formData.name}". Official logo and metadata are live across the portal.`,
      type: 'success',
    });
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleCancelBrandingEdit = () => {
    setFormData({
      name: schoolProfile.name,
      shortCode: schoolProfile.shortCode,
      tagline: schoolProfile.tagline,
      affiliation: schoolProfile.affiliation,
      city: schoolProfile.city,
      customLogoUrl: schoolProfile.customLogoUrl || '',
      establishedYear: '1994',
      academicLevel: 'K-12 Senior Secondary',
      principalName: 'Dr. Rajesh Sharma, Ph.D.',
    });
    setIsEditingBranding(false);
  };

  const handleAddCampus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampus.name || !newCampus.city) return;

    if (editingCampus) {
      setCampuses((prev) =>
        prev.map((c) =>
          c.code === editingCampus.code
            ? {
                ...c,
                name: newCampus.name || c.name,
                city: newCampus.city || c.city,
                board: newCampus.board || c.board,
                principal: newCampus.principal || c.principal,
                students: Number(newCampus.students) || c.students,
                coverUrl: newCampus.coverUrl || c.coverUrl,
                logoUrl: newCampus.logoUrl || c.logoUrl,
                status: (newCampus.status as any) || c.status,
              }
            : c
        )
      );
      addNotification({
        title: 'Campus Branch Updated',
        description: `Updated branch records for "${newCampus.name}".`,
        type: 'success',
      });
    } else {
      const added: CampusRecord = {
        code: newCampus.code || `CMP-0${campuses.length + 1}`,
        name: newCampus.name,
        city: newCampus.city,
        board: newCampus.board || 'CBSE Affiliation',
        session: newCampus.session || '2026-2027',
        students: Number(newCampus.students) || 200,
        principal: newCampus.principal || 'Branch In-Charge',
        status: (newCampus.status as any) || 'Active Branch',
        coverUrl: newCampus.coverUrl || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&auto=format&fit=crop&q=80',
        logoUrl: newCampus.logoUrl,
      };
      setCampuses((prev) => [...prev, added]);
      addNotification({
        title: 'Campus Branch Registered',
        description: `New campus branch "${newCampus.name}" successfully added.`,
        type: 'success',
      });
    }

    setIsAddCampusModalOpen(false);
    setEditingCampus(null);
    setNewCampus({
      code: `CMP-0${campuses.length + 2}`,
      name: '',
      city: '',
      board: 'CBSE Affiliation',
      session: '2026-2027',
      students: 250,
      principal: '',
      status: 'Active Branch',
      coverUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&auto=format&fit=crop&q=80',
      logoUrl: '',
    });
  };

  const handleDeleteCampus = (code: string) => {
    setCampuses((prev) => prev.filter((c) => c.code !== code));
    addNotification({
      title: 'Branch Removed',
      description: `Campus branch [${code}] removed from the directory.`,
      type: 'warning',
    });
  };

  const handleRunDiagnostics = () => {
    setIsDiagnosticsOpen(true);
    setDiagnosticsRunning(true);
    setTimeout(() => {
      setDiagnosticsRunning(false);
      addNotification({
        title: 'Hardware & Gateway Health 100%',
        description: 'All gate biometric sensors, SMS webhooks, and cloud backups are fully operational.',
        type: 'success',
      });
    }, 1600);
  };

  const handleTriggerBackup = () => {
    addNotification({
      title: 'Backup Initialized',
      description: 'Triggering AES-256 cloud snapshot to AWS S3 Mumbai. Est. time: ~3 seconds.',
      type: 'info',
    });
    setTimeout(() => {
      addNotification({
        title: 'Cloud Backup Complete',
        description: 'Snapshot snapshot_20260901_enc.tar.gz (252 MB) successfully verified.',
        type: 'success',
      });
    }, 2200);
  };

  return (
    <VFPageContainer>
      {/* Success Notification Alert */}
      {savedSuccess && (
        <div className="mb-4 p-4 bg-success/15 border border-success/30 rounded-lg text-sm text-foreground flex items-center justify-between animate-fade-in shadow-xs">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
            <span className="font-bold">
              School identity, official logo, and institution details updated live across all portal headers and modules!
            </span>
          </div>
          <button
            onClick={() => setSavedSuccess(false)}
            className="text-muted-foreground hover:text-foreground text-xs font-black cursor-pointer px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Content Sections: Exact padding all around with no excess bottom blank space */}
      <div className="space-y-4 pb-0 mb-0">
        {/* SECTION 1: School Identity & Official Logo Studio */}
        <VFCard
          title={
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                <Building2 className="h-3.5 w-3.5" />
              </div>
              <span>School Identity & Official Logo Studio</span>
            </div>
          }
          description="Institution legal name, official crest emblem, board affiliation code, and live header badge."
          actions={
            isEditingBranding ? (
              <div className="flex items-center gap-2">
                <VFButton
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleCancelBrandingEdit}
                  className="h-8 px-3 text-xs bg-[#141414] hover:bg-[#222222] border-border text-foreground"
                  leftIcon={<X className="h-3.5 w-3.5" />}
                >
                  Cancel
                </VFButton>
                <VFButton
                  type="button"
                  size="sm"
                  onClick={() => handleSaveBranding()}
                  className="h-8 px-3.5 text-xs font-bold shadow-xs"
                  leftIcon={<Check className="h-3.5 w-3.5" />}
                >
                  Save Changes
                </VFButton>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <VFBadge variant="success" className="text-[11px] font-bold font-mono hidden sm:inline-flex">
                  Live Across Portal
                </VFBadge>
                <VFButton
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditingBranding(true)}
                  className="h-8 px-3 text-xs font-bold bg-[#141414] hover:bg-[#222222] border-border text-foreground shadow-xs"
                  leftIcon={<Edit2 className="h-3.5 w-3.5 text-primary" />}
                >
                  Edit School Identity
                </VFButton>
              </div>
            )
          }
          className="bg-[#141414] border-border/80"
          bodyClassName="p-5"
        >
          <form onSubmit={handleSaveBranding} className="space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Left 2 Cols: Form Inputs + Dedicated Logo Uploader */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                      School Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      disabled={!isEditingBranding}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. VidyaFloww International Academy"
                      className={`w-full px-3.5 py-2 text-sm border rounded-md font-semibold h-10 transition-colors ${
                        isEditingBranding
                          ? 'border-border bg-[#1a1a1a] text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40'
                          : 'border-border/60 bg-[#171717] text-foreground cursor-not-allowed opacity-90'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                      Institution Short Code
                    </label>
                    <input
                      type="text"
                      disabled={!isEditingBranding}
                      value={formData.shortCode}
                      onChange={(e) => setFormData({ ...formData, shortCode: e.target.value })}
                      placeholder="e.g. VF-DELHI"
                      className={`w-full px-3.5 py-2 text-sm border rounded-md font-semibold h-10 transition-colors ${
                        isEditingBranding
                          ? 'border-border bg-[#1a1a1a] text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40'
                          : 'border-border/60 bg-[#171717] text-foreground cursor-not-allowed opacity-90'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                      Board Affiliation Code
                    </label>
                    <input
                      type="text"
                      disabled={!isEditingBranding}
                      value={formData.affiliation}
                      onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                      placeholder="e.g. CBSE Affiliation #1630982"
                      className={`w-full px-3.5 py-2 text-sm border rounded-md font-semibold h-10 transition-colors ${
                        isEditingBranding
                          ? 'border-border bg-[#1a1a1a] text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40'
                          : 'border-border/60 bg-[#171717] text-foreground cursor-not-allowed opacity-90'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                      Campus City / Region
                    </label>
                    <input
                      type="text"
                      disabled={!isEditingBranding}
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. New Delhi, India"
                      className={`w-full px-3.5 py-2 text-sm border rounded-md font-semibold h-10 transition-colors ${
                        isEditingBranding
                          ? 'border-border bg-[#1a1a1a] text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40'
                          : 'border-border/60 bg-[#171717] text-foreground cursor-not-allowed opacity-90'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                      Motto / Tagline
                    </label>
                    <input
                      type="text"
                      disabled={!isEditingBranding}
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="e.g. Excellence in Education & Character"
                      className={`w-full px-3.5 py-2 text-sm border rounded-md font-semibold h-10 transition-colors ${
                        isEditingBranding
                          ? 'border-border bg-[#1a1a1a] text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40'
                          : 'border-border/60 bg-[#171717] text-foreground cursor-not-allowed opacity-90'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                      Principal In-Charge
                    </label>
                    <input
                      type="text"
                      disabled={!isEditingBranding}
                      value={formData.principalName}
                      onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                      placeholder="e.g. Dr. Rajesh Sharma, Ph.D."
                      className={`w-full px-3.5 py-2 text-sm border rounded-md font-semibold h-10 transition-colors ${
                        isEditingBranding
                          ? 'border-border bg-[#1a1a1a] text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40'
                          : 'border-border/60 bg-[#171717] text-foreground cursor-not-allowed opacity-90'
                      }`}
                    />
                  </div>
                </div>

                {/* Dedicated Official School Logo Uploader Box */}
                <div className="p-4 rounded-lg bg-[#1a1a1a] border border-border/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
                      <School className="h-3.5 w-3.5 text-primary" />
                      Official School Logo & Emblem
                    </label>
                    <span className="text-[10px] text-muted-foreground font-semibold">
                      PNG / SVG / WebP (Min 256×256px)
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Logo Square Preview Box */}
                    <div className="h-16 w-16 rounded-lg bg-[#141414] border-2 border-dashed border-border/90 flex items-center justify-center shrink-0 overflow-hidden shadow-xs relative group">
                      {formData.customLogoUrl ? (
                        <img
                          src={formData.customLogoUrl}
                          alt="School Logo"
                          className="h-full w-full object-contain p-1 rounded-md"
                        />
                      ) : (
                        <Building2 className="h-8 w-8 text-muted-foreground/60" />
                      )}
                    </div>

                    {/* Action buttons & URL input */}
                    <div className="flex-1 w-full space-y-2">
                      {isEditingBranding ? (
                        <>
                          <div className="flex items-center gap-2">
                            <VFButton
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              className="h-9 px-3 text-xs font-bold bg-[#141414] hover:bg-[#222222] border-border text-foreground shrink-0"
                              leftIcon={<Upload className="h-3.5 w-3.5 text-primary" />}
                            >
                              Upload Logo File
                            </VFButton>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                            />

                            {formData.customLogoUrl && (
                              <VFButton
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => setFormData({ ...formData, customLogoUrl: '' })}
                                className="h-9 px-2.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border-border"
                                leftIcon={<Trash2 className="h-3.5 w-3.5" />}
                              >
                                Remove Logo
                              </VFButton>
                            )}
                          </div>

                          <input
                            type="text"
                            value={formData.customLogoUrl}
                            onChange={(e) => setFormData({ ...formData, customLogoUrl: e.target.value })}
                            placeholder="Or paste official logo image URL (https://...)..."
                            className="w-full px-3 py-1.5 text-xs border border-border rounded-md bg-[#141414] text-foreground placeholder:text-muted-foreground font-medium h-9 focus:outline-none focus:ring-1 focus:ring-primary/40"
                          />
                        </>
                      ) : (
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p className="font-semibold text-foreground">
                            {formData.customLogoUrl ? 'Custom Institutional Crest Active' : 'Default Crest Active'}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            Click <span className="font-bold text-foreground">Edit School Identity</span> above to upload a new logo file or update institution details.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Col: Live Header Preview Card */}
              <div className="space-y-3 flex flex-col justify-between p-4 rounded-lg bg-[#1a1a1a] border border-border/80">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                      Live Header Badge Preview
                    </label>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Sync
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    This is how your school identity appears on the top navigation shell across all user portals:
                  </p>

                  {/* Simulated Header Badge */}
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-[#141414] border border-orange-500/40 shadow-[0_0_10px_rgba(249,115,22,0.12)] h-12 w-full">
                    <div className="h-7 w-7 rounded-md bg-orange-500/20 border border-orange-500/40 flex items-center justify-center shrink-0 overflow-hidden">
                      {formData.customLogoUrl ? (
                        <img
                          src={formData.customLogoUrl}
                          alt="Preview"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <Building2 className="h-4 w-4 text-orange-400" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-extrabold text-foreground tracking-tight truncate">
                        {formData.name || 'School Legal Name'}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate font-mono">
                        {formData.shortCode || 'VF-DELHI'} · {formData.city || 'Location'}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-md bg-[#141414] border border-border/60 space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">Affiliation:</span>
                      <span className="font-mono text-foreground font-bold truncate max-w-[170px]">{formData.affiliation || 'None'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">Active Session:</span>
                      <span className="text-emerald-400 font-bold">2026–2027 Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">Campus City:</span>
                      <span className="text-foreground font-medium truncate max-w-[160px]">{formData.city || 'Not set'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">Head of School:</span>
                      <span className="text-foreground font-medium truncate max-w-[160px]">{formData.principalName}</span>
                    </div>
                  </div>
                </div>

                {isEditingBranding && (
                  <div className="pt-2">
                    <VFButton
                      type="submit"
                      size="sm"
                      className="w-full font-bold shadow-xs h-9"
                      leftIcon={<Check className="h-4 w-4" />}
                    >
                      Save Branding Changes
                    </VFButton>
                  </div>
                )}
              </div>
            </div>
          </form>
        </VFCard>

        {/* SECTION 2: Campus Branch Master Directory */}
        <VFCard
          title={
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                <Building className="h-3.5 w-3.5" />
              </div>
              <span>Campus Branch Master Directory</span>
            </div>
          }
          description="Manage multi-campus locations, accreditation codes, student strength, and branch leadership."
          actions={
            <VFButton
              size="sm"
              className="h-8 px-3 text-xs font-bold shadow-xs"
              leftIcon={<Plus className="h-3.5 w-3.5" />}
              onClick={() => {
                setEditingCampus(null);
                setNewCampus({
                  code: `CMP-0${campuses.length + 1}`,
                  name: '',
                  city: '',
                  board: 'CBSE Affiliation',
                  session: '2026-2027',
                  students: 250,
                  principal: '',
                  status: 'Active Branch',
                });
                setIsAddCampusModalOpen(true);
              }}
            >
              Add Campus Branch
            </VFButton>
          }
          className="bg-[#141414] border-border/80"
          bodyClassName="p-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {campuses.map((c) => (
              <div
                key={c.code}
                className="rounded-xl overflow-hidden bg-[#1a1a1a] border border-border/80 hover:border-zinc-700 hover:bg-[#1c1c1c] transition-all duration-200 flex flex-col justify-between shadow-xs group"
              >
                {/* 1. Header Cover Image Banner (LinkedIn Style) */}
                <div className="relative h-28 w-full overflow-hidden bg-[#141414]">
                  <img
                    src={c.coverUrl || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&auto=format&fit=crop&q=80'}
                    alt={c.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/40 to-black/20" />

                  {/* Floating badges on cover */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="font-mono font-black text-xs px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-primary border border-primary/30 shadow-xs">
                      {c.code}
                    </span>
                    <VFBadge
                      variant={c.status === 'Active Primary' ? 'success' : 'outline'}
                      className="text-[10px] font-bold backdrop-blur-md bg-black/70 border-border/70 shadow-xs"
                    >
                      {c.status}
                    </VFBadge>
                  </div>
                </div>

                {/* 2. Overlapping School Crest / Logo (LinkedIn Style) */}
                <div className="-mt-8 px-4 flex items-end justify-between relative z-10">
                  <div className="h-16 w-16 rounded-xl bg-[#141414] border-2 border-border/90 shadow-md flex items-center justify-center overflow-hidden shrink-0 group-hover:border-zinc-600 transition-colors p-1">
                    {c.logoUrl || schoolProfile.customLogoUrl ? (
                      <img
                        src={c.logoUrl || schoolProfile.customLogoUrl}
                        alt="Campus Logo"
                        className="h-full w-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="h-full w-full rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <School className="h-7 w-7 text-primary" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 pb-1">
                    <VFButton
                      size="sm"
                      variant="outline"
                      className="h-7 px-2.5 text-[11px] font-semibold bg-[#141414] hover:bg-[#222222] border-border text-foreground"
                      leftIcon={<Edit2 className="h-3 w-3" />}
                      onClick={() => {
                        setEditingCampus(c);
                        setNewCampus(c);
                        setIsAddCampusModalOpen(true);
                      }}
                    >
                      Edit
                    </VFButton>
                    {c.status !== 'Active Primary' && (
                      <VFButton
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 text-[11px] font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border-border"
                        leftIcon={<Trash2 className="h-3 w-3" />}
                        onClick={() => handleDeleteCampus(c.code)}
                      >
                        Remove
                      </VFButton>
                    )}
                  </div>
                </div>

                {/* 3. Body Information Area */}
                <div className="p-4 pt-2.5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
                      {c.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>{c.city}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#141414] border border-border/60 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Board:</span>
                      <span className="font-bold text-foreground truncate max-w-[170px]">{c.board}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Principal:</span>
                      <span className="font-medium text-foreground">{c.principal}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Enrolled:</span>
                      <span className="font-black text-emerald-400">{c.students} Students</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </VFCard>

        {/* SECTION 3: System Infrastructure & Gate Biometrics (Full Width) */}
        <VFCard
          title={
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
                <Server className="h-3.5 w-3.5" />
              </div>
              <span>System Infrastructure & Gate Biometrics</span>
            </div>
          }
          description="Campus hardware turnstiles, SMS/WhatsApp delivery gateways, and automated cloud backups."
          actions={
            <VFButton
              size="sm"
              variant="outline"
              onClick={handleRunDiagnostics}
              className="h-8 px-3 text-xs font-bold bg-[#141414] hover:bg-[#1f1f1f] text-foreground border-border shadow-xs"
              leftIcon={<RefreshCw className="h-3.5 w-3.5 text-foreground" />}
            >
              Run Diagnostics
            </VFButton>
          }
          className="bg-[#141414] border-border/80"
          bodyClassName="p-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Biometric & Turnstiles */}
            <div className="p-4 rounded-lg bg-[#1a1a1a] border border-border/80 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-border/60">
                  <span className="text-xs font-bold text-foreground">Turnstiles & RFID Fleet</span>
                  <VFBadge variant="success" className="text-[10px]">Online</VFBadge>
                </div>
                <div className="divide-y divide-border/50 text-xs space-y-1">
                  <div className="flex justify-between items-center py-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Wifi className="h-3 w-3 text-emerald-400" />
                      <span>Main Gate Turnstile 1</span>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold text-[11px]">12ms</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Wifi className="h-3 w-3 text-emerald-400" />
                      <span>North Gate Turnstile 2</span>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold text-[11px]">14ms</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Radio className="h-3 w-3 text-blue-400" />
                      <span>12 RFID Bus Fleet</span>
                    </div>
                    <span className="font-mono text-blue-400 font-bold text-[11px]">Syncing</span>
                  </div>
                </div>
              </div>

              <VFButton
                size="sm"
                variant="outline"
                onClick={() => addNotification({ title: 'Hardware Synced', description: 'All gate biometric sensors acknowledged handshake signal.', type: 'success' })}
                className="w-full h-8 text-xs font-semibold bg-[#141414] hover:bg-[#222222] border-border text-foreground"
              >
                Test Gate Connection
              </VFButton>
            </div>

            {/* Card 2: SMS & WhatsApp Gateway */}
            <div className="p-4 rounded-lg bg-[#1a1a1a] border border-border/80 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-border/60">
                  <span className="text-xs font-bold text-foreground">Communication Delivery</span>
                  <VFBadge variant="success" className="text-[10px]">DLT Approved</VFBadge>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-black text-foreground">99.8%</span>
                    <span className="text-muted-foreground text-[11px]">1.2s Latency</span>
                  </div>
                  <p className="text-muted-foreground text-[11px]">
                    Providers: <span className="text-foreground font-bold">Twilio & Gupshup</span>
                  </p>
                  <p className="text-muted-foreground text-[11px]">
                    Templates: <span className="text-emerald-400 font-bold">48 Registered</span>
                  </p>
                </div>
              </div>

              <VFButton
                size="sm"
                variant="outline"
                onClick={() => addNotification({ title: 'Test Ping Sent', description: 'Test message broadcast sent to admin register phone.', type: 'info' })}
                className="w-full h-8 text-xs font-semibold bg-[#141414] hover:bg-[#222222] border-border text-foreground"
              >
                Send Test Ping
              </VFButton>
            </div>

            {/* Card 3: Cloud Backups */}
            <div className="p-4 rounded-lg bg-[#1a1a1a] border border-border/80 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-border/60">
                  <span className="text-xs font-bold text-foreground">Encrypted Cloud Backups</span>
                  <VFBadge variant="outline" className="text-[10px]">AES-256</VFBadge>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-black text-foreground">Daily 02:00 AM</span>
                    <span className="text-emerald-400 font-bold text-[11px]">Verified</span>
                  </div>
                  <p className="text-muted-foreground text-[11px]">
                    Target: <span className="text-foreground font-bold">AWS S3 Mumbai Region</span>
                  </p>
                  <p className="text-muted-foreground text-[11px]">
                    Archive Size: <span className="font-mono text-foreground font-bold">248 MB</span>
                  </p>
                </div>
              </div>

              <VFButton
                size="sm"
                variant="outline"
                onClick={handleTriggerBackup}
                className="w-full h-8 text-xs font-semibold bg-[#141414] hover:bg-[#222222] border-border text-foreground"
                leftIcon={<Database className="h-3 w-3 text-primary" />}
              >
                Backup Now
              </VFButton>
            </div>
          </div>
        </VFCard>

        {/* SECTION 4: Role-Based Access Control (RBAC) & Governance */}
        <VFCard
          title={
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-rose-500/15 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
                <Lock className="h-3.5 w-3.5" />
              </div>
              <span>Role-Based Access Control (RBAC) & Governance</span>
            </div>
          }
          description="Institutional authorization tiers, two-factor authentication rules, and security enforcement policies."
          actions={
            <div className="flex items-center gap-2">
              <Link to="/audit">
                <VFButton
                  size="sm"
                  variant="outline"
                  className="h-8 px-3 text-xs font-bold bg-[#141414] hover:bg-[#1f1f1f] text-foreground border-border shadow-xs"
                  leftIcon={<Terminal className="h-3.5 w-3.5 text-primary" />}
                >
                  Live Audit Logs
                </VFButton>
              </Link>
              <Link to="/security">
                <VFButton
                  size="sm"
                  variant="outline"
                  className="h-8 px-3 text-xs font-bold bg-[#141414] hover:bg-[#1f1f1f] text-foreground border-border shadow-xs"
                  leftIcon={<SlidersHorizontal className="h-3.5 w-3.5 text-foreground" />}
                >
                  Configure Matrix
                </VFButton>
              </Link>
            </div>
          }
          className="bg-[#141414] border-border/80"
          bodyClassName="p-5"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Left 2 Cols: RBAC Role Hierarchy Table */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                  Configured User Roles & Authorization Hierarchy
                </h4>
                <Link to="/security" className="text-xs text-primary hover:underline font-bold">
                  View Full Matrix →
                </Link>
              </div>

              <div className="p-3.5 rounded-md bg-[#1a1a1a] border border-border/80 divide-y divide-border/60 -my-1">
                {[
                  {
                    role: 'Super Administrator',
                    users: '2 Accounts',
                    access: 'Full system privileges, root DB access, billing, and API secrets',
                    badge: 'Full Root',
                    badgeVariant: 'danger',
                  },
                  {
                    role: 'School Principal',
                    users: '2 Accounts',
                    access: 'Executive oversight: manages faculty workload, admissions signoffs, student dossiers & exams',
                    badge: 'Executive',
                    badgeVariant: 'primary',
                  },
                  {
                    role: 'Front Office / Registrar',
                    users: '6 Accounts',
                    access: 'Admissions registration, student dossiers, fee receipts, and TC document generation',
                    badge: 'Operations',
                    badgeVariant: 'warning',
                  },
                  {
                    role: 'Accountant / Bursar',
                    users: '3 Accounts',
                    access: 'Fee collection registers, refund receipts, expense ledgers, and bank reconciliations',
                    badge: 'Finance',
                    badgeVariant: 'outline',
                  },
                  {
                    role: 'Parent & Student Portal',
                    users: '2,450+ Accounts',
                    access: 'View-only student dossier, timetable, report cards, notices, and online fee payments',
                    badge: 'Self-Service',
                    badgeVariant: 'neutral',
                  },
                ].map((r, i) => (
                  <div key={i} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-extrabold text-foreground text-sm">{r.role}</p>
                        <VFBadge variant={r.badgeVariant as any} className="text-[10px] font-bold">
                          {r.badge}
                        </VFBadge>
                      </div>
                      <p className="text-muted-foreground text-xs font-medium mt-0.5">{r.access}</p>
                    </div>
                    <span className="font-mono font-bold text-foreground shrink-0 bg-[#141414] px-2 py-0.5 rounded border border-border/60 text-xs">
                      {r.users}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 1 Col: Security Governance Rules */}
            <div className="space-y-3 flex flex-col justify-between">
              <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                Institutional Security Policies
              </h4>
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-md bg-[#1a1a1a] border border-border/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">Two-Factor Auth (2FA)</span>
                    <VFBadge variant="success" className="text-[10px]">Enforced</VFBadge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Mandatory for Super Admins and Principals</p>
                </div>

                <div className="p-3 rounded-md bg-[#1a1a1a] border border-border/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">Idle Session Timeout</span>
                    <span className="font-mono font-bold text-primary text-xs">30 Mins</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Auto-logout on inactive browser windows</p>
                </div>

                <div className="p-3 rounded-md bg-[#1a1a1a] border border-border/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">Audit Log Retention</span>
                    <span className="font-mono font-bold text-foreground text-xs">365 Days</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Immutable tamper-proof event logs</p>
                </div>

                <div className="p-3 rounded-md bg-[#1a1a1a] border border-border/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">Campus IP Whitelist</span>
                    <VFBadge variant="outline" className="text-[10px]">Active</VFBadge>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-mono">103.21.244.0/24 Subnet</p>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/audit">
                  <VFButton
                    size="sm"
                    variant="outline"
                    className="w-full h-9 text-xs font-semibold bg-[#1a1a1a] hover:bg-[#222222] border-border text-foreground"
                    leftIcon={<Terminal className="h-3.5 w-3.5 text-primary" />}
                  >
                    Open Live Audit Trail
                  </VFButton>
                </Link>
              </div>
            </div>
          </div>
        </VFCard>
      </div>

      {/* Add / Edit Campus Modal */}
      <VFDialog
        isOpen={isAddCampusModalOpen}
        onClose={() => setIsAddCampusModalOpen(false)}
        title={editingCampus ? 'Edit Campus Branch' : 'Add New Campus Branch'}
        description="Register or modify a school branch, location code, and leadership assignment."
      >
        <form onSubmit={handleAddCampus} className="space-y-4 pt-1">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Campus Code</label>
              <input
                type="text"
                required
                value={newCampus.code}
                onChange={(e) => setNewCampus({ ...newCampus, code: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-border rounded-md bg-[#1a1a1a] text-foreground font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Status</label>
              <VFSelect
                value={newCampus.status || 'Active Branch'}
                onChange={(e) => setNewCampus({ ...newCampus, status: e.target.value as any })}
                options={[
                  { label: 'Active Branch', value: 'Active Branch' },
                  { label: 'Active Primary', value: 'Active Primary' },
                ]}
                className="bg-[#1a1a1a] border-border h-8 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Campus / Branch Name</label>
            <input
              type="text"
              required
              placeholder="e.g. VidyaFloww International Academy (South Campus)"
              value={newCampus.name}
              onChange={(e) => setNewCampus({ ...newCampus, name: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-border rounded-md bg-[#1a1a1a] text-foreground font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">City / Region</label>
              <input
                type="text"
                required
                placeholder="e.g. Noida, Uttar Pradesh"
                value={newCampus.city}
                onChange={(e) => setNewCampus({ ...newCampus, city: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-border rounded-md bg-[#1a1a1a] text-foreground"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Board Affiliation</label>
              <input
                type="text"
                placeholder="e.g. CBSE / State Board"
                value={newCampus.board}
                onChange={(e) => setNewCampus({ ...newCampus, board: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-border rounded-md bg-[#1a1a1a] text-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Principal / Head</label>
              <input
                type="text"
                placeholder="e.g. Mr. Deepak Mishra"
                value={newCampus.principal}
                onChange={(e) => setNewCampus({ ...newCampus, principal: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-border rounded-md bg-[#1a1a1a] text-foreground"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Enrolled Strength</label>
              <input
                type="number"
                placeholder="e.g. 500"
                value={newCampus.students}
                onChange={(e) => setNewCampus({ ...newCampus, students: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-border rounded-md bg-[#1a1a1a] text-foreground font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground">Campus Cover Background Photo URL</label>
            <input
              type="text"
              placeholder="Paste campus cover image URL (https://...)"
              value={newCampus.coverUrl || ''}
              onChange={(e) => setNewCampus({ ...newCampus, coverUrl: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-border rounded-md bg-[#1a1a1a] text-foreground"
            />
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              <span className="text-[10px] text-muted-foreground font-semibold">Presets:</span>
              <button
                type="button"
                onClick={() => setNewCampus({ ...newCampus, coverUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&auto=format&fit=crop&q=80' })}
                className="text-[10px] px-2 py-0.5 rounded bg-[#141414] hover:bg-[#222222] border border-border text-zinc-300 hover:text-white transition-colors"
              >
                Modern Glass
              </button>
              <button
                type="button"
                onClick={() => setNewCampus({ ...newCampus, coverUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80' })}
                className="text-[10px] px-2 py-0.5 rounded bg-[#141414] hover:bg-[#222222] border border-border text-zinc-300 hover:text-white transition-colors"
              >
                Brick Heritage
              </button>
              <button
                type="button"
                onClick={() => setNewCampus({ ...newCampus, coverUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop&q=80' })}
                className="text-[10px] px-2 py-0.5 rounded bg-[#141414] hover:bg-[#222222] border border-border text-zinc-300 hover:text-white transition-colors"
              >
                Contemporary Courtyard
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/50">
            <VFButton
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddCampusModalOpen(false)}
            >
              Cancel
            </VFButton>
            <VFButton type="submit" size="sm">
              {editingCampus ? 'Save Changes' : 'Add Campus'}
            </VFButton>
          </div>
        </form>
      </VFDialog>

      {/* Diagnostics Health Check Modal */}
      <VFDialog
        isOpen={isDiagnosticsOpen}
        onClose={() => setIsDiagnosticsOpen(false)}
        title="Hardware & Gateway System Diagnostics"
        description="Real-time end-to-end telemetry check for all integrated institutional services."
      >
        <div className="space-y-3 text-xs py-1">
          {diagnosticsRunning ? (
            <div className="py-8 flex flex-col items-center justify-center space-y-3">
              <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <p className="text-muted-foreground font-semibold text-xs">Pinging hardware terminals & cloud webhooks...</p>
            </div>
          ) : (
            <>
              <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-extrabold text-foreground text-xs">All Systems 100% Operational</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">0 errors, 0 dropped packets across all nodes</p>
                </div>
              </div>

              <div className="space-y-2 pt-1 font-mono text-[11px]">
                <div className="flex items-center justify-between p-2 rounded bg-[#1a1a1a] border border-border/60">
                  <span className="text-muted-foreground">Main Turnstile (TCP/IP: 192.168.1.101):</span>
                  <span className="text-emerald-400 font-bold">200 OK (12ms)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#1a1a1a] border border-border/60">
                  <span className="text-muted-foreground">North Gate Turnstile (TCP/IP: 192.168.1.102):</span>
                  <span className="text-emerald-400 font-bold">200 OK (14ms)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#1a1a1a] border border-border/60">
                  <span className="text-muted-foreground">Twilio & Gupshup Webhook Queue:</span>
                  <span className="text-emerald-400 font-bold">Active (0 Pending)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#1a1a1a] border border-border/60">
                  <span className="text-muted-foreground">AWS S3 Snapshot Replication:</span>
                  <span className="text-emerald-400 font-bold">Synchronized</span>
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-border/50">
                <VFButton size="sm" onClick={() => setIsDiagnosticsOpen(false)}>
                  Close Report
                </VFButton>
              </div>
            </>
          )}
        </div>
      </VFDialog>

      {/* SECTION 4: Language & Regional Settings */}
      <VFCard
        title={
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-violet-500/15 text-violet-400 flex items-center justify-center shrink-0 border border-violet-500/30">
              <Languages className="h-3.5 w-3.5" />
            </div>
            <span>{t('settings.languageRegional')}</span>
          </div>
        }
        description="Switch platform language between English and Hindi (हिन्दी). Font and all UI labels change instantly."
        className="bg-[#141414] border-border/80"
        bodyClassName="p-5"
      >
        <div className="space-y-4">
          {/* Language Radio Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* English */}
            <div
              onClick={() => {
                setLanguage('en');
                addNotification({ title: 'Language Changed', description: 'Platform language set to English.', type: 'success' });
              }}
              className={`p-4 rounded-md border cursor-pointer transition-all ${
                language === 'en'
                  ? 'bg-primary/10 border-primary ring-1 ring-primary/30 shadow-xs'
                  : 'bg-[#1a1a1a] border-border/70 hover:border-zinc-500'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🇺🇸</span>
                  <div>
                    <p className="font-extrabold text-foreground text-sm">English</p>
                    <p className="text-[10px] text-muted-foreground font-semibold">Latin Script — Sofia Sans font</p>
                  </div>
                </div>
                {language === 'en' && (
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground font-mono mt-1">
                Students · Teachers · Attendance · Fees
              </p>
              <p className="text-[10px] text-muted-foreground mt-1 italic">
                All UI labels in English.
              </p>
            </div>

            {/* Hindi */}
            <div
              onClick={() => {
                setLanguage('hi');
                addNotification({ title: 'भाषा बदली गई', description: 'प्लेटफ़ॉर्म भाषा हिन्दी पर सेट की गई।', type: 'success' });
              }}
              className={`p-4 rounded-md border cursor-pointer transition-all ${
                language === 'hi'
                  ? 'bg-primary/10 border-primary ring-1 ring-primary/30 shadow-xs'
                  : 'bg-[#1a1a1a] border-border/70 hover:border-zinc-500'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🇮🇳</span>
                  <div>
                    <p className="font-extrabold text-foreground text-sm">हिन्दी</p>
                    <p className="text-[10px] text-muted-foreground font-semibold">Devanagari Script — Baloo 2 font</p>
                  </div>
                </div>
                {language === 'hi' && (
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                छात्र · शिक्षक · उपस्थिति · शुल्क
              </p>
              <p className="text-[10px] text-muted-foreground mt-1 italic">
                सभी UI लेबल हिन्दी में दिखेंगे।
              </p>
            </div>
          </div>

          {/* Live Preview */}
          <div className="p-3.5 rounded-md bg-[#1a1a1a] border border-border/70 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Globe className="h-3 w-3" />
              {t('lang.preview')}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { key: 'nav.students', label: t('nav.students') },
                { key: 'nav.teachers', label: t('nav.teachers') },
                { key: 'nav.fees', label: t('nav.fees') },
                { key: 'nav.attendance', label: t('nav.attendance') },
                { key: 'action.save', label: t('action.save') },
                { key: 'action.edit', label: t('action.edit') },
                { key: 'status.active', label: t('status.active') },
                { key: 'status.paid', label: t('status.paid') },
              ].map((item) => (
                <div key={item.key} className="px-2 py-1.5 rounded bg-[#111111] border border-border/50 text-center">
                  <span className="font-bold text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground pt-1">
              Font: <strong className="text-foreground">{language === 'hi' ? 'Baloo 2 (Devanagari)' : 'Sofia Sans (Latin)'}</strong>
              &nbsp;·&nbsp;
              Language: <strong className="text-foreground">{language === 'hi' ? 'हिन्दी' : 'English'}</strong>
            </p>
          </div>
        </div>
      </VFCard>

    </VFPageContainer>
  );
}
