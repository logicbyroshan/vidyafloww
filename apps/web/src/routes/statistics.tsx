import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFTabs,
  VFCard,
  VFBadge,
  VFButton,
  VFStatCard,
} from '@vidyamaxx/ui';
import {
  BarChart3,
  Users,
  UserCheck,
  TrendingUp,
  GraduationCap,
  FileCheck2,
  Clock,
  ShieldCheck,
  Download,
  CalendarCheck,
  CreditCard,
  Bus,
  Sparkles,
  Award,
  School,
  CheckCircle2,
  AlertCircle,
  Layers,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/statistics')({
  component: StatisticsPage,
});

function StatisticsPage() {
  const { activeSession } = useGlobalStore();

  // ─── TAB 1: DEMOGRAPHICS & POPULATION ───────────────────────────────────────
  const demographicsContent = (
    <div className="space-y-6 animate-fade-in">
      {/* Primary Demographic KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        <VFStatCard
          title="Total Student Population"
          value={activeSession === '2026–2027' ? '1,248' : '1,180'}
          icon={<Users className="h-5 w-5" />}
          trend="up"
          trendLabel={`Session ${activeSession}`}
          accentColor="blue"
        />
        <VFStatCard
          title="Student-Teacher Ratio"
          value="18 : 1"
          icon={<School className="h-5 w-5" />}
          trend="neutral"
          trendLabel="CBSE Standard Compliant"
          accentColor="blue"
        />
        <VFStatCard
          title="Active Class Divisions"
          value="16 Sections"
          icon={<Layers className="h-5 w-5" />}
          trend="neutral"
          trendLabel="Classes 9 to 12"
          accentColor="blue"
        />
        <VFStatCard
          title="Gender Parity Index"
          value="0.95"
          icon={<UserCheck className="h-5 w-5" />}
          trend="up"
          trendLabel="Balanced Cohort"
          accentColor="blue"
        />
      </div>

      {/* Demographic Matrix 3-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gender Distribution */}
        <VFCard title="Gender Distribution" description="Current student population balance">
          <div className="space-y-3 mt-1">
            <p className="text-2xl font-black text-foreground">640 Boys / 608 Girls</p>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex">
              <div className="h-full bg-blue-500 w-[51.2%]" title="Boys: 51.2%" />
              <div className="h-full bg-pink-500 w-[48.8%]" title="Girls: 48.8%" />
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground pt-1">
              <span className="flex items-center gap-1.5 text-blue-400">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                51.2% Boys (640)
              </span>
              <span className="flex items-center gap-1.5 text-pink-400">
                <span className="h-2 w-2 rounded-full bg-pink-500" />
                48.8% Girls (608)
              </span>
            </div>
          </div>
        </VFCard>

        {/* Quota & Reserved Seats */}
        <VFCard title="Quota & Reserved Seats" description="Compliance with RTE standards">
          <div className="space-y-3 mt-1">
            <p className="text-2xl font-black text-foreground">186 Students</p>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[75%]" />
            </div>
            <div className="flex items-center justify-between text-xs font-bold pt-1">
              <span className="text-emerald-400">15% RTE Quota</span>
              <span className="text-muted-foreground">100% Fully Compliant</span>
            </div>
          </div>
        </VFCard>

        {/* House Allocations */}
        <VFCard title="House Squad Allocations" description="Four competitive student squad balance">
          <div className="space-y-3 mt-1">
            <p className="text-2xl font-black text-foreground">4 Houses</p>
            <div className="grid grid-cols-2 gap-2">
              <span className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-red-500/15 text-red-400 border border-red-500/25 text-center">
                Red: 312 (25%)
              </span>
              <span className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/25 text-center">
                Blue: 310 (24.8%)
              </span>
              <span className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-green-500/15 text-green-400 border border-green-500/25 text-center">
                Green: 314 (25.2%)
              </span>
              <span className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/25 text-center">
                Yellow: 312 (25%)
              </span>
            </div>
          </div>
        </VFCard>
      </div>

      {/* Class-Wise Enrollment Breakdown */}
      <VFCard title="Class-Wise Enrollment Breakdown" description="Distribution across academic wings and sections">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-base pt-1">
          {[
            { grade: 'Class 9', total: '320 Students', sections: '4 Sections', standing: '96.2% Attendance', ratio: '80 / Section' },
            { grade: 'Class 10', total: '310 Students', sections: '4 Sections', standing: '97.8% Attendance', ratio: '77 / Section' },
            { grade: 'Class 11', total: '308 Students', sections: '4 Sections', standing: '94.5% Attendance', ratio: '77 / Section' },
            { grade: 'Class 12', total: '310 Students', sections: '4 Sections', standing: '98.1% Attendance', ratio: '77 / Section' },
          ].map((c, i) => (
            <div key={i} className="p-4 rounded-xl bg-card border border-border space-y-2 hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between">
                <p className="font-black text-foreground text-base">{c.grade}</p>
                <VFBadge variant="outline">{c.sections}</VFBadge>
              </div>
              <p className="text-2xl font-extrabold text-foreground">{c.total}</p>
              <div className="flex items-center justify-between text-xs font-bold text-muted-foreground pt-1 border-t border-border/50">
                <span className="text-emerald-400">{c.standing}</span>
                <span>{c.ratio}</span>
              </div>
            </div>
          ))}
        </div>
      </VFCard>

      {/* 3-Year Historical Growth Comparison */}
      <VFCard title="Historical Session Growth Trend" description="Institutional enrollment expansion over past 3 academic cycles">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-muted/20 border border-border space-y-1">
            <span className="text-xs font-bold text-muted-foreground">Session 2024–2025</span>
            <p className="text-xl font-black text-foreground">1,090 Students</p>
            <p className="text-xs text-muted-foreground">Base Benchmark</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/20 border border-border space-y-1">
            <span className="text-xs font-bold text-muted-foreground">Session 2025–2026</span>
            <p className="text-xl font-black text-foreground">1,180 Students</p>
            <p className="text-xs text-emerald-400 font-bold">+8.2% Year-over-Year</p>
          </div>
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-primary">Session 2026–2027 (Active)</span>
              <VFBadge variant="success">Current AY</VFBadge>
            </div>
            <p className="text-2xl font-black text-foreground">1,248 Students</p>
            <p className="text-xs text-emerald-400 font-bold">+5.7% Year-over-Year (+158 Overall)</p>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ─── TAB 2: ACADEMIC & EXAMINATION PERFORMANCE ─────────────────────────────
  const academicsContent = (
    <div className="space-y-6 animate-fade-in">
      {/* Primary Academic KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        <VFStatCard
          title="Overall Board Pass Rate"
          value="98.6%"
          icon={<Award className="h-5 w-5" />}
          trend="up"
          trendLabel="+1.4% vs State Avg"
          accentColor="blue"
        />
        <VFStatCard
          title="Term 1 Academic Average"
          value="94.8%"
          icon={<TrendingUp className="h-5 w-5" />}
          trend="up"
          trendLabel="School Distinction"
          accentColor="blue"
        />
        <VFStatCard
          title="Class 10 Distinction Rate"
          value="89.2%"
          icon={<Sparkles className="h-5 w-5" />}
          trend="up"
          trendLabel="Scores > 75%"
          accentColor="blue"
        />
        <VFStatCard
          title="Class 12 Distinction Rate"
          value="91.4%"
          icon={<GraduationCap className="h-5 w-5" />}
          trend="up"
          trendLabel="Science & Commerce"
          accentColor="blue"
        />
      </div>

      {/* Subject Performance Breakdown Grid */}
      <VFCard title="Subject-Wise Academic Standings" description="Curriculum mastery and average score distribution across key disciplines">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {[
            { subject: 'Mathematics & Applied Math', avg: '94.2%', toppers: '48 Students (A1)', progress: 94 },
            { subject: 'Physics & Sciences', avg: '92.8%', toppers: '42 Students (A1)', progress: 93 },
            { subject: 'English Core & Literature', avg: '95.1%', toppers: '64 Students (A1)', progress: 95 },
            { subject: 'Computer Science & IT', avg: '97.4%', toppers: '72 Students (A1)', progress: 97 },
            { subject: 'Accountancy & Commerce', avg: '93.6%', toppers: '38 Students (A1)', progress: 94 },
            { subject: 'Social Sciences & Humanities', avg: '91.8%', toppers: '35 Students (A1)', progress: 92 },
          ].map((sub, i) => (
            <div key={i} className="p-4 rounded-xl bg-card border border-border space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-foreground text-sm">{sub.subject}</h4>
                <span className="text-sm font-black text-primary">{sub.avg}</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${sub.progress}%` }} />
              </div>
              <p className="text-xs text-muted-foreground font-bold">{sub.toppers}</p>
            </div>
          ))}
        </div>
      </VFCard>

      {/* CBSE Grade Distribution Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VFCard title="CBSE Letter Grade Distribution" description="Cohort distribution across 9-point grading scale">
          <div className="space-y-3 pt-1">
            {[
              { grade: 'A1 (91% - 100%)', count: '524 Students', pct: 42, color: 'bg-emerald-500' },
              { grade: 'A2 (81% - 90%)', count: '386 Students', pct: 31, color: 'bg-blue-500' },
              { grade: 'B1 (71% - 80%)', count: '224 Students', pct: 18, color: 'bg-amber-500' },
              { grade: 'B2 (61% - 70%)', count: '88 Students', pct: 7, color: 'bg-purple-500' },
              { grade: 'C & Below (< 60%)', count: '26 Students', pct: 2, color: 'bg-rose-500' },
            ].map((g, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-foreground">{g.grade}</span>
                  <span className="text-muted-foreground">{g.count} ({g.pct}%)</span>
                </div>
                <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${g.color}`} style={{ width: `${g.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </VFCard>

        <VFCard title="Academic Stream Comparison" description="Class 11 & 12 specialization performance">
          <div className="space-y-4 pt-1">
            <div className="p-3.5 rounded-xl bg-muted/30 border border-border flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-foreground text-sm">Science Stream (PCM / PCB)</h4>
                <p className="text-xs text-muted-foreground">308 Students enrolled</p>
              </div>
              <div className="text-right">
                <p className="text-base font-black text-primary">95.4% Avg</p>
                <span className="text-[10px] font-bold text-emerald-400">100% Pass Rate</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-muted/30 border border-border flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-foreground text-sm">Commerce Stream</h4>
                <p className="text-xs text-muted-foreground">220 Students enrolled</p>
              </div>
              <div className="text-right">
                <p className="text-base font-black text-primary">94.1% Avg</p>
                <span className="text-[10px] font-bold text-emerald-400">98.8% Pass Rate</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-muted/30 border border-border flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-foreground text-sm">Humanities & Arts</h4>
                <p className="text-xs text-muted-foreground">92 Students enrolled</p>
              </div>
              <div className="text-right">
                <p className="text-base font-black text-primary">93.8% Avg</p>
                <span className="text-[10px] font-bold text-emerald-400">97.5% Pass Rate</span>
              </div>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // ─── TAB 3: ATTENDANCE & OPERATIONS INTELLIGENCE ─────────────────────────────
  const attendanceContent = (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        <VFStatCard
          title="Daily Attendance Average"
          value="96.9%"
          icon={<UserCheck className="h-5 w-5" />}
          trend="up"
          trendLabel="1,210 Active Daily"
          accentColor="blue"
        />
        <VFStatCard
          title="Faculty Attendance"
          value="98.4%"
          icon={<Users className="h-5 w-5" />}
          trend="up"
          trendLabel="72/74 On Duty"
          accentColor="blue"
        />
        <VFStatCard
          title="Transport Fleet Utilization"
          value="86.4%"
          icon={<Bus className="h-5 w-5" />}
          trend="neutral"
          trendLabel="12 Active Bus Routes"
          accentColor="blue"
        />
        <VFStatCard
          title="Infirmary Medical Visits"
          value="0.8%"
          icon={<ShieldCheck className="h-5 w-5" />}
          trend="down"
          trendLabel="Below Season Avg"
          accentColor="blue"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VFCard title="Wing-Wise Attendance Performance" description="Regular attendance tracking across school divisions">
          <div className="space-y-3 pt-1">
            {[
              { wing: 'Primary Wing (Classes 1 - 5)', rate: '97.8%', count: '98.2% on Mondays' },
              { wing: 'Middle Wing (Classes 6 - 8)', rate: '96.5%', count: '97.1% on Mondays' },
              { wing: 'Secondary Wing (Classes 9 - 10)', rate: '96.2%', count: '96.8% on Mondays' },
              { wing: 'Senior Secondary (Classes 11 - 12)', rate: '97.1%', count: '98.0% on Mondays' },
            ].map((w, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-card border border-border flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-foreground text-sm">{w.wing}</h4>
                  <p className="text-xs text-muted-foreground">{w.count}</p>
                </div>
                <span className="text-base font-black text-emerald-400">{w.rate}</span>
              </div>
            ))}
          </div>
        </VFCard>

        <VFCard title="Transport Route Load Analytics" description="Bus capacity and stop route coverage">
          <div className="space-y-3 pt-1">
            {[
              { route: 'Route #1 (South Delhi - Hauz Khas / Saket)', load: '48 / 52 Seats (92%)', status: 'Optimal' },
              { route: 'Route #2 (Central Delhi - Connaught Place)', load: '45 / 52 Seats (86%)', status: 'Optimal' },
              { route: 'Route #4 (Dwarka Sector 6 - 21)', load: '50 / 52 Seats (96%)', status: 'Near Capacity' },
              { route: 'Route #7 (Noida Sector 62 / Indirapuram)', load: '42 / 52 Seats (80%)', status: 'Optimal' },
            ].map((r, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-card border border-border flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-foreground text-sm">{r.route}</h4>
                  <p className="text-xs text-muted-foreground">{r.load}</p>
                </div>
                <VFBadge variant={r.status === 'Near Capacity' ? 'warning' : 'outline'}>{r.status}</VFBadge>
              </div>
            ))}
          </div>
        </VFCard>
      </div>
    </div>
  );

  // ─── TAB 4: TC, ALUMNI & MIGRATION STATS ────────────────────────────────────
  const transfersContent = (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        <VFStatCard
          title="Total TC Issued"
          value="142"
          icon={<FileCheck2 className="h-5 w-5" />}
          trend="up"
          trendLabel="+14 this term"
          accentColor="amber"
        />
        <VFStatCard
          title="Graduated Alumni"
          value="310"
          icon={<GraduationCap className="h-5 w-5" />}
          trend="up"
          trendLabel="Class 12 Batch"
          accentColor="amber"
        />
        <VFStatCard
          title="Pending Verification"
          value="3 Requests"
          icon={<Clock className="h-5 w-5" />}
          trend="neutral"
          trendLabel="Principal Queue"
          accentColor="amber"
        />
        <VFStatCard
          title="CBSE Migration Rate"
          value="100%"
          icon={<ShieldCheck className="h-5 w-5" />}
          trend="up"
          trendLabel="Fully Compliant"
          accentColor="amber"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VFCard title="Transfer Certificate Reasons Breakdown" description="Analysis of student relocations and outbound transitions">
          <div className="space-y-3 pt-1">
            {[
              { reason: 'Parent Relocation / Job Transfer', pct: 64, count: '91 Records' },
              { reason: 'Inter-Board Shift (CBSE to IB / Cambridge)', pct: 18, count: '26 Records' },
              { reason: 'Higher Education Admissions Abroad', pct: 12, count: '17 Records' },
              { reason: 'Medical or Distance Considerations', pct: 6, count: '8 Records' },
            ].map((t, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-foreground">{t.reason}</span>
                  <span className="text-muted-foreground">{t.count} ({t.pct}%)</span>
                </div>
                <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </VFCard>

        <VFCard title="Alumni University Placements" description="Class 12 graduate university progression">
          <div className="space-y-3 pt-1">
            {[
              { destination: 'Premier Engineering (IITs, NITs, BITS)', count: '105 Students (34%)' },
              { destination: 'Medical & Dental Institutes (AIIMS, NEET)', count: '68 Students (22%)' },
              { destination: 'Commerce & Management (DU, SRCC, IIM IPM)', count: '87 Students (28%)' },
              { destination: 'Global & International Universities (US, UK, CA)', count: '50 Students (16%)' },
            ].map((d, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-card border border-border flex items-center justify-between">
                <h4 className="font-extrabold text-foreground text-sm">{d.destination}</h4>
                <span className="text-xs font-black text-amber-400">{d.count}</span>
              </div>
            ))}
          </div>
        </VFCard>
      </div>
    </div>
  );

  // ─── TAB 5: FINANCIAL & REVENUE STATISTICS ─────────────────────────────────
  const financeContent = (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        <VFStatCard
          title="Total Expected Revenue"
          value="₹ 4.82 Cr"
          icon={<CreditCard className="h-5 w-5" />}
          trend="up"
          trendLabel={`Session ${activeSession}`}
          accentColor="blue"
        />
        <VFStatCard
          title="Realized Fee Collections"
          value="₹ 4.73 Cr"
          icon={<CheckCircle2 className="h-5 w-5" />}
          trend="up"
          trendLabel="98.1% Clearance Rate"
          accentColor="blue"
        />
        <VFStatCard
          title="Outstanding Dues"
          value="₹ 9.20 Lakh"
          icon={<AlertCircle className="h-5 w-5" />}
          trend="down"
          trendLabel="1.9% of Total"
          accentColor="blue"
        />
        <VFStatCard
          title="Scholarships & Concessions"
          value="₹ 18.4 Lakh"
          icon={<Award className="h-5 w-5" />}
          trend="neutral"
          trendLabel="RTE & Merit Grants"
          accentColor="blue"
        />
      </div>

      <VFCard title="Wing-Wise Fee Collection Realization" description="Quarterly collection audit across divisions">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {[
            { wing: 'Primary Wing', collected: '₹ 1.28 Cr', rate: '99.1% Paid', dues: '₹ 1.1 Lakh' },
            { wing: 'Middle Wing', collected: '₹ 1.15 Cr', rate: '98.4% Paid', dues: '₹ 1.8 Lakh' },
            { wing: 'Secondary Wing', collected: '₹ 1.18 Cr', rate: '97.9% Paid', dues: '₹ 2.4 Lakh' },
            { wing: 'Senior Secondary', collected: '₹ 1.12 Cr', rate: '97.2% Paid', dues: '₹ 3.9 Lakh' },
          ].map((f, i) => (
            <div key={i} className="p-4 rounded-xl bg-card border border-border space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-foreground text-sm">{f.wing}</h4>
                <VFBadge variant="success">{f.rate}</VFBadge>
              </div>
              <p className="text-xl font-black text-foreground">{f.collected}</p>
              <div className="flex items-center justify-between text-xs font-bold text-muted-foreground pt-1 border-t border-border/50">
                <span>Dues Pending:</span>
                <span className="text-amber-400 font-bold">{f.dues}</span>
              </div>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // ─── 5 CATEGORIZED STATISTICS TABS ──────────────────────────────────────────
  const tabs = [
    {
      id: 'demographics',
      label: 'Demographics & Enrollment',
      icon: <Users className="h-5 w-5" />,
      badge: '1,248 Students',
      content: demographicsContent,
    },
    {
      id: 'academics',
      label: 'Academic & Exam Stats',
      icon: <GraduationCap className="h-5 w-5" />,
      badge: '98.6% Pass',
      content: academicsContent,
    },
    {
      id: 'attendance',
      label: 'Attendance & Operations',
      icon: <CalendarCheck className="h-5 w-5" />,
      badge: '96.9% Avg',
      content: attendanceContent,
    },
    {
      id: 'transfers',
      label: 'TC, Migration & Alumni',
      icon: <FileCheck2 className="h-5 w-5" />,
      badge: '142 TC',
      content: transfersContent,
    },
    {
      id: 'finance',
      label: 'Finance & Fee Analytics',
      icon: <CreditCard className="h-5 w-5" />,
      badge: '98.1% Paid',
      content: financeContent,
    },
  ];

  return (
    <VFPageContainer>
      {/* Session Context Banner */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0 border border-primary/30">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-base font-black text-foreground">
                Institutional Statistics & Intelligence Hub
              </h2>
              <VFBadge variant="outline">Verified CBSE Analytics</VFBadge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live multi-dimensional analytics for Session {activeSession}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
          <VFButton
            variant="outline"
            size="sm"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={() => alert(`Exporting comprehensive Institutional Intelligence Dossier for Session ${activeSession}`)}
          >
            Export Comprehensive Report
          </VFButton>
        </div>
      </div>

      {/* 5 Categorized Tabs */}
      <VFTabs items={tabs} defaultTabId="demographics" variant="top-bar" />
    </VFPageContainer>
  );
}
