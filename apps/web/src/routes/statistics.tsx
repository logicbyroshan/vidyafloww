import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFTabs,
  VFCard,
  VFBadge,
  VFButton,
  VFStatCard,
  VFAreaChart,
  VFBarChart,
  VFPieChart,
} from '@vidyafloww/ui';
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
  Layers,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/statistics')({
  component: StatisticsPage,
});

function StatisticsPage() {
  const { activeSession, addNotification } = useGlobalStore();

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

      {/* Student Enrollment by Wing Pie Chart & Metric Tiles */}
      <VFCard title="Student Enrollment by School Wing" description="Class tier strength distribution across 1,248 pupils">
        <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
          <div className="shrink-0" style={{ width: 180, height: 180 }}>
            <VFPieChart
              data={[
                { name: 'Primary (1-5)', value: 430, color: '#3b82f6' },
                { name: 'Middle (6-8)', value: 374, color: '#60a5fa' },
                { name: 'High School (9-10)', value: 250, color: '#93c5fd' },
                { name: 'Senior Sec (11-12)', value: 194, color: '#bfdbfe' },
              ]}
              height={180}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 w-full flex-1">
            {[
              { title: 'Primary Wing', grade: 'Grades 1 – 5', count: '430', pct: '34.5%', dot: 'bg-blue-500' },
              { title: 'Middle School', grade: 'Grades 6 – 8', count: '374', pct: '30.0%', dot: 'bg-blue-400' },
              { title: 'High School', grade: 'Grades 9 – 10', count: '250', pct: '20.0%', dot: 'bg-blue-300' },
              { title: 'Senior Secondary', grade: 'Grades 11 – 12', count: '194', pct: '15.5%', dot: 'bg-blue-200' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-md border border-border/80 bg-card/60 space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${item.dot} shrink-0`} />
                  <p className="text-xs font-bold text-foreground truncate">{item.title}</p>
                </div>
                <div className="flex items-baseline justify-between pt-0.5">
                  <span className="text-base font-extrabold text-foreground">{item.count}</span>
                  <span className="text-[11px] font-semibold text-muted-foreground">{item.pct}</span>
                </div>
                <p className="text-[10px] text-muted-foreground font-medium">{item.grade}</p>
              </div>
            ))}
          </div>
        </div>
      </VFCard>

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
            <div key={i} className="p-4 rounded-md bg-card border border-border space-y-2 hover:border-primary/40 transition-colors">
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

      {/* Academic Grade Tier Distribution Pie Chart */}
      <VFCard title="Academic Grade Performance Tier" description="Term 1 evaluation marks distribution across 1,248 students">
        <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
          <div className="shrink-0" style={{ width: 180, height: 180 }}>
            <VFPieChart
              data={[
                { name: 'Distinction (90%+)', value: 524, color: '#10b981' },
                { name: 'First Division (80-89%)', value: 386, color: '#34d399' },
                { name: 'Second Division (70-79%)', value: 225, color: '#6ee7b7' },
                { name: 'Passing & Support (<70%)', value: 113, color: '#93c5fd' },
              ]}
              height={180}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 w-full flex-1">
            {[
              { label: 'Distinction', range: 'A1 · 90%+', count: '524', pct: '42.0%', dot: 'bg-emerald-500' },
              { label: 'First Division', range: 'A2 · 80 – 89%', count: '386', pct: '30.9%', dot: 'bg-emerald-400' },
              { label: 'Second Division', range: 'B1 · 70 – 79%', count: '225', pct: '18.0%', dot: 'bg-emerald-300' },
              { label: 'Passing / Support', range: 'B2 & Support', count: '113', pct: '9.1%', dot: 'bg-blue-300' },
            ].map((tier, idx) => (
              <div key={idx} className="p-3 rounded-md border border-border/80 bg-card/60 space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${tier.dot} shrink-0`} />
                  <p className="text-xs font-bold text-foreground truncate">{tier.label}</p>
                </div>
                <div className="flex items-baseline justify-between pt-0.5">
                  <span className="text-base font-extrabold text-foreground">{tier.count}</span>
                  <span className="text-[11px] font-semibold text-muted-foreground">{tier.pct}</span>
                </div>
                <p className="text-[10px] text-muted-foreground font-medium">{tier.range}</p>
              </div>
            ))}
          </div>
        </div>
      </VFCard>

      {/* Department Performance & Academic Velocity Matrix */}
      <VFCard title="Department Academic Performance & Velocity" description="Faculty strength, departmental GPA standing, and curriculum pacing">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
          {[
            { dept: 'Science & Mathematics', count: '640 Pupils', staff: '38 Faculty', gpa: '94% GPA', pace: '98% Pace', status: 'On Track' },
            { dept: 'Languages & Humanities', count: '480 Pupils', staff: '32 Faculty', gpa: '92% GPA', pace: '95% Pace', status: 'On Track' },
            { dept: 'Commerce & Economics', count: '420 Pupils', staff: '24 Faculty', gpa: '95% GPA', pace: '97% Pace', status: 'Optimal' },
            { dept: 'Sports & Co-Curricular', count: '911 Pupils', staff: '18 Faculty', gpa: '14 Trophies', pace: '100% Active', status: 'Optimal' },
          ].map((d, i) => (
            <div key={i} className="p-3.5 rounded-md bg-card border border-border space-y-2.5 hover:bg-muted/40 transition-all">
              <div className="flex items-center justify-between">
                <p className="font-bold text-foreground text-xs truncate">{d.dept}</p>
                <VFBadge variant="success" className="text-[10px]">{d.status}</VFBadge>
              </div>
              <div>
                <p className="text-xl font-extrabold text-foreground">{d.count}</p>
                <p className="text-[11px] text-muted-foreground font-semibold">{d.staff}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/70 text-xs">
                <span className="font-bold text-emerald-400">{d.gpa}</span>
                <span className="font-semibold text-muted-foreground">{d.pace}</span>
              </div>
            </div>
          ))}
        </div>
      </VFCard>

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
            <div key={i} className="p-4 rounded-md bg-card border border-border space-y-2">
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

      {/* Attendance & Student Intake Trends Area Chart */}
      <VFCard title="Attendance & Intake Trends" description="Monthly comparison for Academic Year 2026-2027">
        <div className="h-64 mt-2">
          <VFAreaChart
            data={[
              { label: 'Apr', intake: 180, attendance: 92 },
              { label: 'May', intake: 220, attendance: 94 },
              { label: 'Jun', intake: 190, attendance: 91 },
              { label: 'Jul', intake: 310, attendance: 96 },
              { label: 'Aug', intake: 280, attendance: 95 },
              { label: 'Sep', intake: 340, attendance: 97 },
            ]}
            xKey="label"
            dataKeys={[
              { key: 'intake', color: '#3b82f6', name: 'Student Intake' },
              { key: 'attendance', color: '#10b981', name: 'Avg Attendance %' },
            ]}
          />
        </div>
      </VFCard>

      {/* Attendance Health Risk Segments */}
      <VFCard title="Attendance Health & Risk Segments" description="Biometric gate audit classification across 1,248 students">
        <div className="grid grid-cols-3 gap-3 pt-1">
          {[
            { label: 'Regular Attendance', subtitle: 'Above 90%', count: '1,120', pct: '89.7%', tag: 'Healthy', badgeVariant: 'success' as const },
            { label: 'Moderate Risk', subtitle: '75% – 89%', count: '94', pct: '7.5%', tag: 'Monitor', badgeVariant: 'warning' as const },
            { label: 'Critical Absentee', subtitle: 'Below 75%', count: '34', pct: '2.8%', tag: 'Action Req', badgeVariant: 'danger' as const },
          ].map((row, idx) => (
            <div key={idx} className="p-3 rounded-md border border-border/80 bg-card space-y-1.5 text-center">
              <div className="flex justify-center">
                <VFBadge variant={row.badgeVariant} className="text-[10px]">{row.tag}</VFBadge>
              </div>
              <p className="text-xl font-extrabold text-foreground">{row.count}</p>
              <p className="text-xs font-bold text-foreground truncate">{row.label}</p>
              <p className="text-[11px] text-muted-foreground font-medium">{row.subtitle} · {row.pct}</p>
            </div>
          ))}
        </div>
      </VFCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VFCard title="Wing-Wise Attendance Performance" description="Regular attendance tracking across school divisions">
          <div className="space-y-3 pt-1">
            {[
              { wing: 'Primary Wing (Classes 1 - 5)', rate: '97.8%', count: '98.2% on Mondays' },
              { wing: 'Middle Wing (Classes 6 - 8)', rate: '96.5%', count: '97.1% on Mondays' },
              { wing: 'Secondary Wing (Classes 9 - 10)', rate: '96.2%', count: '96.8% on Mondays' },
              { wing: 'Senior Secondary (Classes 11 - 12)', rate: '97.1%', count: '98.0% on Mondays' },
            ].map((w, i) => (
              <div key={i} className="p-3.5 rounded-md bg-card border border-border flex items-center justify-between">
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
              <div key={i} className="p-3.5 rounded-md bg-card border border-border flex items-center justify-between">
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

        <VFCard title="Top Destination Institutions" description="Alumni admission transitions into higher secondary & colleges">
          <div className="space-y-3 pt-1">
            {[
              { dest: 'Delhi University (DU) Colleges', count: '124 Alumni', standing: 'Top Merit Tier' },
              { dest: 'IITs / NITs Engineering', count: '68 Alumni', standing: 'JEE Advanced' },
              { dest: 'AIIMS & Medical Colleges', count: '34 Alumni', standing: 'NEET Qualified' },
              { dest: 'Overseas Universities (US/UK/CAN)', count: '28 Alumni', standing: 'SAT / IELTS Cleared' },
            ].map((d, i) => (
              <div key={i} className="p-3.5 rounded-md bg-card border border-border flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-foreground text-sm">{d.dest}</h4>
                  <p className="text-xs text-muted-foreground">{d.standing}</p>
                </div>
                <VFBadge variant="outline">{d.count}</VFBadge>
              </div>
            ))}
          </div>
        </VFCard>
      </div>
    </div>
  );

  // ─── TAB 5: FINANCE, FEES & AID ─────────────────────────────────────────────
  const financeContent = (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        <VFStatCard
          title="Total Fee Collection"
          value="₹ 4.86 Cr"
          icon={<CreditCard className="h-5 w-5" />}
          trend="up"
          trendLabel="98.1% of Target"
          accentColor="blue"
        />
        <VFStatCard
          title="Quarter 2 Collection Rate"
          value="96.4%"
          icon={<TrendingUp className="h-5 w-5" />}
          trend="up"
          trendLabel="₹ 1.24 Cr Realized"
          accentColor="blue"
        />
        <VFStatCard
          title="Outstanding Dues"
          value="₹ 9.2 Lakh"
          icon={<Clock className="h-5 w-5" />}
          trend="down"
          trendLabel="38 Student Accounts"
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

      {/* Fee Collection Status vs Target Bar Chart */}
      <VFCard title="Fee Collection Status vs Target" description="Quarterly breakdown in ₹ Lakhs (Collected vs Projected)">
        <div className="h-64 mt-2">
          <VFBarChart
            data={[
              { label: 'Q1', target: 85, collected: 80 },
              { label: 'Q2', target: 95, collected: 92 },
              { label: 'Q3', target: 90, collected: 70 },
              { label: 'Q4', target: 100, collected: 88 },
            ]}
            xKey="label"
            dataKeys={[
              { key: 'collected', color: '#3b82f6', name: 'Collected Revenue' },
              { key: 'target', color: '#64748b', name: 'Target Budget' },
            ]}
          />
        </div>
      </VFCard>

      {/* Digital Fee Payment Gateway Channels */}
      <VFCard title="Fee Collection Payment Channels" description="Breakdown of digital gateway transactions for Quarter 2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {[
            { label: 'UPI & QR Gateway', provider: 'Razorpay / PayU', amount: '₹2.82 Cr', share: '58% of Total' },
            { label: 'Net Banking & RTGS', provider: 'Instant Transfer', amount: '₹1.16 Cr', share: '24% of Total' },
            { label: 'Cards & POS Portal', provider: 'Debit / Credit', amount: '₹58 Lakh', share: '12% of Total' },
            { label: 'Counter & Cheque', provider: 'Bank Clearance', amount: '₹30 Lakh', share: '6% of Total' },
          ].map((chan, idx) => (
            <div key={idx} className="p-3 rounded-md border border-border/80 bg-card space-y-1">
              <div className="flex justify-between items-baseline">
                <p className="text-xs font-bold text-foreground truncate">{chan.label}</p>
                <span className="text-[10px] font-semibold text-muted-foreground">{chan.share}</span>
              </div>
              <p className="text-lg font-extrabold text-foreground">{chan.amount}</p>
              <p className="text-[10px] text-muted-foreground font-medium">{chan.provider}</p>
            </div>
          ))}
        </div>
      </VFCard>

      <VFCard title="Wing-Wise Fee Collection Realization" description="Quarterly collection audit across divisions">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {[
            { wing: 'Primary Wing', collected: '₹ 1.28 Cr', rate: '99.1% Paid', dues: '₹ 1.1 Lakh' },
            { wing: 'Middle Wing', collected: '₹ 1.15 Cr', rate: '98.4% Paid', dues: '₹ 1.8 Lakh' },
            { wing: 'Secondary Wing', collected: '₹ 1.18 Cr', rate: '97.9% Paid', dues: '₹ 2.4 Lakh' },
            { wing: 'Senior Secondary', collected: '₹ 1.12 Cr', rate: '97.2% Paid', dues: '₹ 3.9 Lakh' },
          ].map((f, i) => (
            <div key={i} className="p-4 rounded-md bg-card border border-border space-y-2">
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
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {/* 1. Header Toolbar Box */}
      <div className="p-3.5 rounded-lg bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
            <BarChart3 className="h-4 w-4" />
          </div>
          <span className="text-base font-extrabold text-foreground tracking-tight">
            Institutional Intelligence & Demographics
          </span>
          <VFBadge variant="success" className="text-[10px] font-bold font-mono">
            Session {activeSession}
          </VFBadge>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            variant="outline"
            size="sm"
            className="h-9 px-3.5 text-xs font-bold bg-[#1a1a1a] hover:bg-[#222222] border-border text-foreground"
            leftIcon={<Download className="h-3.5 w-3.5" />}
            onClick={() => addNotification({ title: 'Analytics Dossier Exported', description: `Exported Institutional Intelligence Report for Session ${activeSession}.`, type: 'success' })}
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
