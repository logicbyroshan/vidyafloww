import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFButton,
  VFCard,
  VFBadge,
  VFDialog,
  VFInput,
  VFStatCard,
} from '@vidyafloww/ui';
import {
  Building,
  Plus,
  Building2,
  Trash2,
  Check,
  Edit2,
  X,
  MapPin,
  Upload,
  Shield,
  Terminal,
  RefreshCw,
  HardDrive,
  Lock,
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
  } = useGlobalStore();
  const { t, lang } = useTranslation();
  const isHindi = lang === 'hi' || language === 'hi';

  React.useEffect(() => {
    document.title = t('nav.settings') + ' – VidyaFloww';
  }, [t]);

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

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

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
  });

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
    addNotification({
      title: isHindi ? 'स्कूल प्रोफाइल अपडेट' : 'School Profile Updated',
      description: `Updated profile details for "${formData.name}".`,
      type: 'success',
    });
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
                status: (newCampus.status as any) || c.status,
              }
            : c
        )
      );
      addNotification({
        title: isHindi ? 'शाखा अपडेट की गई' : 'Branch Updated',
        description: `Updated branch details for "${newCampus.name}".`,
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
        principal: newCampus.principal || 'Branch Principal',
        status: (newCampus.status as any) || 'Active Branch',
        coverUrl: newCampus.coverUrl || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&auto=format&fit=crop&q=80',
      };
      setCampuses((prev) => [...prev, added]);
      addNotification({
        title: isHindi ? 'नई शाखा जोड़ी गई' : 'Branch Added',
        description: `Campus branch "${newCampus.name}" successfully added.`,
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
    });
  };

  const handleDeleteCampus = (code: string) => {
    setCampuses((prev) => prev.filter((c) => c.code !== code));
    addNotification({
      title: isHindi ? 'शाखा हटाई गई' : 'Branch Removed',
      description: `Campus branch [${code}] removed.`,
      type: 'warning',
    });
  };

  const handleTriggerBackup = () => {
    addNotification({
      title: isHindi ? 'क्लाउड बैकअप शुरू' : 'Cloud Backup Started',
      description: 'Triggering AES-256 cloud snapshot to AWS S3 Mumbai. Est. time: ~2 seconds.',
      type: 'info',
    });
    setTimeout(() => {
      addNotification({
        title: isHindi ? 'क्लाउड बैकअप पूर्ण' : 'Cloud Backup Complete',
        description: 'Snapshot snapshot_20260907_enc.tar.gz (256 MB) successfully verified.',
        type: 'success',
      });
    }, 1600);
  };

  return (
    <VFPageContainer className="space-y-4 w-full">
      {/* Institutional Security & Governance Stat Cards Bar */}
      <div className="space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-1">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-400" />
              <h2 className="text-sm font-extrabold text-foreground uppercase tracking-wide">
                {isHindi ? 'संस्थागत सुरक्षा स्थिति व सिस्टम गवर्नेंस' : 'Institutional Security & System Governance'}
              </h2>
              <VFBadge variant="success" className="text-[10px] font-bold">
                {isHindi ? 'सुरक्षित (SOC-2)' : 'SOC-2 Protected'}
              </VFBadge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isHindi
                ? 'संस्थागत प्राधिकरण स्तर, एन्क्रिप्शन नीतियां, लाइव ऑडिट सुरक्षा और क्लाउड बैकअप'
                : 'Enterprise authorization tiers, tamper-evident audit trails, and automated cloud backup snapshots'}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <Link to="/audit">
              <VFButton
                size="sm"
                variant="outline"
                className="h-8 px-3 text-xs font-bold rounded-[4px]"
                leftIcon={<Terminal className="h-3.5 w-3.5 text-emerald-400" />}
              >
                {isHindi ? 'लाइव ऑडिट लॉग्स ↗' : 'Audit Logs ↗'}
              </VFButton>
            </Link>
            <Link to="/security">
              <VFButton
                size="sm"
                variant="outline"
                className="h-8 px-3 text-xs font-bold rounded-[4px]"
                leftIcon={<Lock className="h-3.5 w-3.5 text-rose-400" />}
              >
                {isHindi ? 'सुरक्षा व रोल्स ↗' : 'Security & Roles ↗'}
              </VFButton>
            </Link>
            <VFButton
              size="sm"
              variant="outline"
              className="h-8 px-3 text-xs font-bold rounded-[4px]"
              leftIcon={<RefreshCw className="h-3.5 w-3.5 text-cyan-400" />}
              onClick={handleTriggerBackup}
            >
              {isHindi ? 'क्लाउड बैकअप' : 'Cloud Backup'}
            </VFButton>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <VFStatCard
            title={isHindi ? 'द्वि-चरणीय प्रमाणीकरण' : 'Two-Factor Auth (2FA)'}
            value="Enforced"
            icon={<Shield className="h-5 w-5 text-emerald-400" />}
            trend="up"
            trendLabel="Active"
            description={isHindi ? 'सुपर एडमिन व प्रिंसिपल्स के लिए अनिवार्य' : 'Mandatory for Admins & Principals'}
            accentColor="emerald"
            className="rounded-[4px]"
          />
          <VFStatCard
            title={isHindi ? 'निष्क्रिय सत्र समय-सीमा' : 'Idle Session Timeout'}
            value="30 Mins"
            icon={<Lock className="h-5 w-5 text-amber-400" />}
            trend="neutral"
            trendLabel="Auto-Lock"
            description={isHindi ? 'निष्क्रिय विंडो पर स्वतः लॉगआउट' : 'Auto-logout on inactive windows'}
            accentColor="amber"
            className="rounded-[4px]"
          />
          <VFStatCard
            title={isHindi ? 'ऑडिट लॉग अवधारण' : 'Audit Log Retention'}
            value="365 Days"
            icon={<Terminal className="h-5 w-5 text-blue-400" />}
            trend="up"
            trendLabel="SOC-2"
            description={isHindi ? 'अपरिवर्तनीय घटना रिकॉर्ड' : 'Immutable tamper-evident trail'}
            accentColor="blue"
            className="rounded-[4px]"
          />
          <VFStatCard
            title={isHindi ? 'क्लाउड बैकअप (AWS S3)' : 'Cloud Backup (AWS S3)'}
            value="ap-south-1"
            icon={<HardDrive className="h-5 w-5 text-cyan-400" />}
            trend="up"
            trendLabel="Daily Encrypted"
            description={isHindi ? 'स्वचालित AES-256 दैनिक स्नैपशॉट' : 'Automated AES-256 daily snapshot'}
            accentColor="cyan"
            className="rounded-[4px]"
          />
        </div>
      </div>

      {/* 1. School Profile & Identity Card */}
      <VFCard
        title={
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <span>{isHindi ? 'स्कूल प्रोफाइल' : 'School Profile'}</span>
          </div>
        }
        description={
          isHindi
            ? 'स्कूल का नाम, संबद्धता, शहर और आधिकारिक पहचान'
            : 'Institution legal name, board affiliation, city, and identity details'
        }
        actions={
          isEditingBranding ? (
            <div className="flex items-center gap-2">
              <VFButton
                type="button"
                size="sm"
                variant="outline"
                onClick={handleCancelBrandingEdit}
                className="h-8 px-3 text-xs bg-[#141414] hover:bg-[#222222] border-border text-foreground rounded-[4px]"
                leftIcon={<X className="h-3.5 w-3.5" />}
              >
                {t('action.cancel')}
              </VFButton>
              <VFButton
                type="button"
                size="sm"
                onClick={() => handleSaveBranding()}
                className="h-8 px-3.5 text-xs font-bold rounded-[4px]"
                leftIcon={<Check className="h-3.5 w-3.5" />}
              >
                {t('action.saveChanges')}
              </VFButton>
            </div>
          ) : (
            <VFButton
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setIsEditingBranding(true)}
              className="h-8 px-3 text-xs font-bold bg-[#141414] hover:bg-[#222222] border-border text-foreground rounded-[4px]"
              leftIcon={<Edit2 className="h-3.5 w-3.5 text-primary" />}
            >
              {isHindi ? 'प्रोफाइल एडिट करें' : 'Edit Profile'}
            </VFButton>
          )
        }
        className="bg-[#0d0d0d] border-border/90"
        bodyClassName="p-4"
      >
        <form onSubmit={handleSaveBranding} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {/* School Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">
                {isHindi ? 'स्कूल का नाम *' : 'School Name *'}
              </label>
              <input
                type="text"
                required
                disabled={!isEditingBranding}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3 py-2 text-xs border rounded-[4px] font-semibold h-8 transition-colors ${
                  isEditingBranding
                    ? 'border-border bg-[#1a1a1a] text-foreground focus:ring-1 focus:ring-primary/40'
                    : 'border-border/60 bg-[#171717] text-foreground cursor-not-allowed opacity-90'
                }`}
              />
            </div>

            {/* Board Affiliation */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">
                {isHindi ? 'संबद्धता कोड' : 'Affiliation Code'}
              </label>
              <input
                type="text"
                disabled={!isEditingBranding}
                value={formData.affiliation}
                onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                className={`w-full px-3 py-2 text-xs border rounded-[4px] font-semibold h-8 transition-colors ${
                  isEditingBranding
                    ? 'border-border bg-[#1a1a1a] text-foreground focus:ring-1 focus:ring-primary/40'
                    : 'border-border/60 bg-[#171717] text-foreground cursor-not-allowed opacity-90'
                }`}
              />
            </div>

            {/* City */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">
                {isHindi ? 'शहर / राज्य' : 'City / Region'}
              </label>
              <input
                type="text"
                disabled={!isEditingBranding}
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className={`w-full px-3 py-2 text-xs border rounded-[4px] font-semibold h-8 transition-colors ${
                  isEditingBranding
                    ? 'border-border bg-[#1a1a1a] text-foreground focus:ring-1 focus:ring-primary/40'
                    : 'border-border/60 bg-[#171717] text-foreground cursor-not-allowed opacity-90'
                }`}
              />
            </div>

            {/* Principal Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">
                {isHindi ? 'प्रधानाचार्य' : 'Principal In-Charge'}
              </label>
              <input
                type="text"
                disabled={!isEditingBranding}
                value={formData.principalName}
                onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                className={`w-full px-3 py-2 text-xs border rounded-[4px] font-semibold h-8 transition-colors ${
                  isEditingBranding
                    ? 'border-border bg-[#1a1a1a] text-foreground focus:ring-1 focus:ring-primary/40'
                    : 'border-border/60 bg-[#171717] text-foreground cursor-not-allowed opacity-90'
                }`}
              />
            </div>

            {/* Tagline */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">
                {isHindi ? 'आदर्श वाक्य / टैगलाइन' : 'School Motto / Tagline'}
              </label>
              <input
                type="text"
                disabled={!isEditingBranding}
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className={`w-full px-3 py-2 text-xs border rounded-[4px] font-semibold h-8 transition-colors ${
                  isEditingBranding
                    ? 'border-border bg-[#1a1a1a] text-foreground focus:ring-1 focus:ring-primary/40'
                    : 'border-border/60 bg-[#171717] text-foreground cursor-not-allowed opacity-90'
                }`}
              />
            </div>

            {/* Short Code */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">
                {isHindi ? 'शॉर्ट कोड' : 'Short Identifier'}
              </label>
              <input
                type="text"
                disabled={!isEditingBranding}
                value={formData.shortCode}
                onChange={(e) => setFormData({ ...formData, shortCode: e.target.value })}
                className={`w-full px-3 py-2 text-xs border rounded-[4px] font-semibold h-8 transition-colors ${
                  isEditingBranding
                    ? 'border-border bg-[#1a1a1a] text-foreground focus:ring-1 focus:ring-primary/40'
                    : 'border-border/60 bg-[#171717] text-foreground cursor-not-allowed opacity-90'
                }`}
              />
            </div>
          </div>

          {/* School Logo Section */}
          {isEditingBranding && (
            <div className="pt-2 border-t border-[#202020] flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <VFButton
                type="button"
                size="sm"
                variant="outline"
                className="h-8 px-3 text-xs rounded-[4px]"
                leftIcon={<Upload className="h-3.5 w-3.5" />}
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Logo Image
              </VFButton>
              {formData.customLogoUrl && (
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="h-3 w-3" /> Logo uploaded
                </span>
              )}
            </div>
          )}
        </form>
      </VFCard>

      {/* 2. Campus Branch Master Directory Card */}
      <VFCard
        title={
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-blue-400" />
            <span>{isHindi ? 'कैंपस शाखाएं' : 'Campus Branches'}</span>
            <VFBadge variant="outline" className="text-xs font-mono font-bold bg-[#1a1a1a] text-foreground">
              {campuses.length} {isHindi ? 'शाखाएं' : 'Locations'}
            </VFBadge>
          </div>
        }
        description={
          isHindi
            ? 'कैंपस शाखाएं, स्थान, छात्र संख्या और शाखा प्रमुख का प्रबंधन'
            : 'Manage campus locations, student enrollment, and branch heads'
        }
        actions={
          <VFButton
            size="sm"
            className="h-8 px-3 text-xs font-bold rounded-[4px]"
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
                coverUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&auto=format&fit=crop&q=80',
              });
              setIsAddCampusModalOpen(true);
            }}
          >
            {isHindi ? 'नई शाखा जोड़ें' : 'Add Campus Branch'}
          </VFButton>
        }
        className="bg-[#0d0d0d] border-border/90"
        bodyClassName="p-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {campuses.map((branch) => (
            <div
              key={branch.code}
              className="rounded-[4px] bg-[#141414] border border-border/80 overflow-hidden flex flex-col justify-between hover:border-border transition-colors group shadow-xs"
            >
              {/* Branch Cover Header with Top Actions */}
              <div className="relative h-28 w-full bg-[#1c1c1c] overflow-hidden">
                <img
                  src={branch.coverUrl}
                  alt={branch.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-[2px] bg-black/70 text-white border border-white/10 backdrop-blur-xs">
                    {branch.code}
                  </span>
                  <VFBadge
                    variant={branch.status === 'Active Primary' ? 'success' : 'outline'}
                    className="text-[10px] font-bold backdrop-blur-xs"
                  >
                    {branch.status}
                  </VFBadge>
                </div>

                {/* Top Action Buttons (Edit & Delete on top where image is) */}
                <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCampus(branch);
                      setNewCampus(branch);
                      setIsAddCampusModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-[3px] text-[11px] font-bold bg-black/75 hover:bg-black/95 text-white border border-white/20 backdrop-blur-xs transition-colors cursor-pointer shadow-xs"
                    title={isHindi ? 'शाखा संपादित करें' : 'Edit Branch'}
                  >
                    <Edit2 className="h-3 w-3 text-primary" />
                    <span>{isHindi ? 'संपादित करें' : 'Edit'}</span>
                  </button>
                  {branch.status !== 'Active Primary' && (
                    <button
                      type="button"
                      onClick={() => handleDeleteCampus(branch.code)}
                      className="p-1 rounded-[3px] bg-black/75 hover:bg-rose-600/90 text-white/80 hover:text-white border border-white/20 backdrop-blur-xs transition-colors cursor-pointer shadow-xs"
                      title={isHindi ? 'शाखा हटाएं' : 'Delete Branch'}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Branch Information */}
              <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-foreground text-sm line-clamp-1">{branch.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3 text-primary shrink-0" /> {branch.city}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-[#202020]">
                  <div className="p-2 rounded-[3px] bg-[#181818] border border-[#242424]">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                      {isHindi ? 'छात्र' : 'Students'}
                    </span>
                    <span className="font-mono font-extrabold text-foreground">{branch.students}</span>
                  </div>
                  <div className="p-2 rounded-[3px] bg-[#181818] border border-[#242424]">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                      {isHindi ? 'प्रधानाचार्य' : 'Principal'}
                    </span>
                    <span className="font-bold text-foreground truncate block">{branch.principal}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </VFCard>

      {/* 3. Role-Based Access Control (RBAC) & Hierarchy */}
      <VFCard
        title={
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-rose-400" />
            <span>{isHindi ? 'रोल-आधारित एक्सेस कंट्रोल (RBAC) व पदानुक्रम' : 'Role-Based Access Control (RBAC) Hierarchy'}</span>
          </div>
        }
        description={
          isHindi
            ? 'संस्थागत प्राधिकरण स्तर, उपयोगकर्ता भूमिकाएं और विशेषाधिकार मैट्रिक्स'
            : 'Institutional authorization tiers, role matrices, and privilege allocations'
        }
        actions={
          <Link to="/security">
            <VFButton
              size="sm"
              variant="outline"
              className="h-8 px-3 text-xs font-bold rounded-[4px]"
              leftIcon={<Shield className="h-3.5 w-3.5 text-rose-400" />}
            >
              {isHindi ? 'सभी अनुमतियां प्रबंधित करें ↗' : 'Manage Permissions ↗'}
            </VFButton>
          </Link>
        }
        className="bg-[#0d0d0d] border-border/90"
        bodyClassName="p-4"
      >
        <div className="space-y-3">
          <div className="pb-1 border-b border-[#202020] flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wider">
              {isHindi ? 'कॉन्फ़िगर किए गए उपयोगकर्ता रोल व अधिकार' : 'Configured User Roles & Authorization Hierarchy'}
            </h4>
            <span className="text-[11px] font-mono text-muted-foreground">
              5 {isHindi ? 'सक्रिय स्तर' : 'Active Tiers'}
            </span>
          </div>

          <div className="rounded-[4px] bg-[#141414] border border-[#242424] divide-y divide-[#202020]">
            {[
              {
                role: 'Super Administrator',
                users: '2 Accounts',
                access: 'Full system privileges, root database access, license keys, and API credentials',
                badge: 'Full Root',
                badgeVariant: 'danger',
              },
              {
                role: 'School Principal',
                users: '2 Accounts',
                access: 'Executive oversight: manages faculty workload, admissions approvals, student dossiers & examinations',
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
              <div key={i} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-[#181818]/60 transition-colors">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <p className="font-extrabold text-foreground text-sm">{r.role}</p>
                    <VFBadge variant={r.badgeVariant as any} className="text-[10px] font-bold">
                      {r.badge}
                    </VFBadge>
                  </div>
                  <p className="text-muted-foreground text-xs font-medium mt-0.5">{r.access}</p>
                </div>
                <span className="font-mono font-bold text-foreground shrink-0 bg-[#1c1c1c] px-3 py-1 rounded-[3px] border border-[#2c2c2c] text-xs self-start sm:self-auto">
                  {r.users}
                </span>
              </div>
            ))}
          </div>
        </div>
      </VFCard>

      {/* 4. Add / Edit Campus Modal */}
      <VFDialog
        isOpen={isAddCampusModalOpen}
        onClose={() => setIsAddCampusModalOpen(false)}
        title={editingCampus ? 'Edit Campus Branch' : 'Add New Campus Branch'}
        description="Configure campus details, location, and branch leadership."
        className="max-w-md rounded-[4px]"
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              variant="outline"
              size="sm"
              className="rounded-[4px]"
              onClick={() => setIsAddCampusModalOpen(false)}
            >
              Cancel
            </VFButton>
            <VFButton
              size="sm"
              className="rounded-[4px]"
              onClick={handleAddCampus}
            >
              {editingCampus ? 'Save Changes' : 'Register Branch'}
            </VFButton>
          </div>
        }
      >
        <form onSubmit={handleAddCampus} className="space-y-3.5 py-2 text-xs">
          <VFInput
            label="Campus / Branch Name *"
            value={newCampus.name || ''}
            onChange={(e) => setNewCampus({ ...newCampus, name: e.target.value })}
            placeholder="e.g. VidyaFloww International (East Wing)"
            className="rounded-[4px]"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <VFInput
              label="City / Location *"
              value={newCampus.city || ''}
              onChange={(e) => setNewCampus({ ...newCampus, city: e.target.value })}
              placeholder="e.g. Noida, UP"
              className="rounded-[4px]"
              required
            />
            <VFInput
              label="Branch Code"
              value={newCampus.code || ''}
              onChange={(e) => setNewCampus({ ...newCampus, code: e.target.value })}
              placeholder="CMP-04"
              className="rounded-[4px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <VFInput
              label="Principal In-Charge"
              value={newCampus.principal || ''}
              onChange={(e) => setNewCampus({ ...newCampus, principal: e.target.value })}
              placeholder="e.g. Mr. Anil Verma"
              className="rounded-[4px]"
            />
            <VFInput
              label="Total Enrolled Students"
              type="number"
              value={String(newCampus.students || '')}
              onChange={(e) => setNewCampus({ ...newCampus, students: Number(e.target.value) })}
              placeholder="350"
              className="rounded-[4px]"
            />
          </div>
          <VFInput
            label="Cover Photo URL"
            value={newCampus.coverUrl || ''}
            onChange={(e) => setNewCampus({ ...newCampus, coverUrl: e.target.value })}
            placeholder="https://images.unsplash.com/..."
            className="rounded-[4px]"
          />
        </form>
      </VFDialog>
    </VFPageContainer>
  );
}
