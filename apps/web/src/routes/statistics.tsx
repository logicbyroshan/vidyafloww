import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
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
  Download,
  CreditCard,
  Sparkles,
  Award,
  School,
  CheckCircle2,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

export const Route = createFileRoute('/statistics')({
  component: StatisticsPage,
});

function StatisticsPage() {
  const { activeSession, addNotification } = useGlobalStore();
  const { t, lang } = useTranslation();
  const isHindi = lang === 'hi';

  useEffect(() => {
    document.title = t('page.statistics') + ' – VidyaFloww';
  }, [t]);

  return (
    <VFPageContainer className="space-y-4 w-full">
      {/* 1. Sleek Command Toolbar */}
      <div className="p-2.5 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#1a1a1a] border border-border/80 text-xs font-mono">
            <BarChart3 className="h-3.5 w-3.5 text-blue-400" />
            <span className="font-bold text-foreground">
              {isHindi ? 'संस्थागत विश्लेषण व सांख्यिकी' : 'Institutional Analytics & Intelligence'}
            </span>
          </div>
          <VFBadge variant="success" className="text-xs font-bold font-mono">
            {t('ui.session').split(' ')[0] + ' ' + activeSession}
          </VFBadge>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs font-bold bg-[#1a1a1a] hover:bg-[#222222] border-border text-foreground rounded-[4px]"
            leftIcon={<Download className="h-3.5 w-3.5" />}
            onClick={() =>
              addNotification({
                title: t('action.export'),
                description: `Exported Institutional Intelligence Report for Session ${activeSession}.`,
                type: 'success',
              })
            }
          >
            {t('action.export')}
          </VFButton>
        </div>
      </div>

      {/* 2. Top Executive KPI Metric Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        <VFStatCard
          title={t('students.totalStudents')}
          value={activeSession === '2026–2027' ? '1,248' : '1,180'}
          icon={<Users className="h-4.5 w-4.5" />}
          trend="up"
          trendLabel={`AY ${activeSession}`}
          accentColor="blue"
        />
        <VFStatCard
          title={isHindi ? 'शिक्षक-छात्र अनुपात' : 'Teacher-Student Ratio'}
          value="18 : 1"
          icon={<School className="h-4.5 w-4.5" />}
          trend="neutral"
          trendLabel="CBSE Norm"
          accentColor="blue"
        />
        <VFStatCard
          title={isHindi ? 'दैनिक औसत उपस्थिति' : 'Daily Attendance Avg'}
          value="96.9%"
          icon={<UserCheck className="h-4.5 w-4.5" />}
          trend="up"
          trendLabel="1,210 Active Daily"
          accentColor="blue"
        />
        <VFStatCard
          title={isHindi ? 'वार्षिक बोर्ड उत्तीर्ण दर' : 'Board Exam Pass Rate'}
          value="98.6%"
          icon={<Award className="h-4.5 w-4.5" />}
          trend="up"
          trendLabel="+1.4% vs State Avg"
          accentColor="blue"
        />
      </div>

      {/* 3. Section 1: Academic & Attendance Health (Two Balanced Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Attendance & Student Intake Monthly Trends */}
        <VFCard
          title={
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>{isHindi ? 'उपस्थिति व छात्र प्रवेश रुझान' : 'Attendance & Intake Trends'}</span>
            </div>
          }
          description={
            isHindi
              ? 'सत्र 2026-2027 के लिए मासिक प्रवेश व उपस्थिति तुलना'
              : 'Monthly student intake vs attendance rate comparison for AY 2026-2027'
          }
          className="bg-[#0d0d0d] border-border/90"
          bodyClassName="p-4"
        >
          <div className="h-60">
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

        {/* Student Enrollment Distribution by Wing */}
        <VFCard
          title={
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-blue-400" />
              <span>{isHindi ? 'विंग अनुसार कुल छात्र वितरण' : 'Enrollment Distribution by Wing'}</span>
            </div>
          }
          description={
            isHindi
              ? '1,248 विद्यार्थियों का विंग अनुसार अनुपातिक संतुलन'
              : 'Class tier strength distribution across 1,248 pupils'
          }
          className="bg-[#0d0d0d] border-border/90"
          bodyClassName="p-4"
        >
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="shrink-0" style={{ width: 170, height: 170 }}>
              <VFPieChart
                data={[
                  { name: 'Primary (1-5)', value: 430, color: '#3b82f6' },
                  { name: 'Middle (6-8)', value: 374, color: '#60a5fa' },
                  { name: 'High School (9-10)', value: 250, color: '#93c5fd' },
                  { name: 'Senior Sec (11-12)', value: 194, color: '#bfdbfe' },
                ]}
                height={170}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 w-full flex-1">
              {[
                { title: isHindi ? 'प्राइमरी विंग' : 'Primary Wing', grade: 'Grades 1 – 5', count: '430', pct: '34.5%', dot: 'bg-blue-500' },
                { title: isHindi ? 'मिडिल स्कूल' : 'Middle School', grade: 'Grades 6 – 8', count: '374', pct: '30.0%', dot: 'bg-blue-400' },
                { title: isHindi ? 'हाई स्कूल' : 'High School', grade: 'Grades 9 – 10', count: '250', pct: '20.0%', dot: 'bg-blue-300' },
                { title: isHindi ? 'सीनियर सेकेंडरी' : 'Senior Secondary', grade: 'Grades 11 – 12', count: '194', pct: '15.5%', dot: 'bg-blue-200' },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-[4px] border border-border/80 bg-[#141414] space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${item.dot} shrink-0`} />
                    <p className="text-xs font-bold text-foreground truncate">{item.title}</p>
                  </div>
                  <div className="flex items-baseline justify-between pt-0.5">
                    <span className="text-sm font-extrabold text-foreground">{item.count}</span>
                    <span className="text-[10px] font-semibold text-muted-foreground">{item.pct}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-medium">{item.grade}</p>
                </div>
              ))}
            </div>
          </div>
        </VFCard>
      </div>

      {/* 4. Section 2: Institutional Financial & Academic Standing (Two Balanced Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Fee Collection vs Target Bar Chart */}
        <VFCard
          title={
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              <span>{isHindi ? 'फीस संग्रह बनाम लक्ष्य' : 'Fee Realization vs Target'}</span>
            </div>
          }
          description={
            isHindi
              ? 'त्रैमासिक बजट विश्लेषण (संग्रहित बनाम अनुमानित बजट)'
              : 'Quarterly collection audit in ₹ Lakhs (Collected vs Projected Budget)'
          }
          actions={<VFBadge variant="success" className="text-xs font-bold font-mono">98.1% Realized</VFBadge>}
          className="bg-[#0d0d0d] border-border/90"
          bodyClassName="p-4"
        >
          <div className="h-60">
            <VFBarChart
              data={[
                { label: 'Q1', target: 85, collected: 80 },
                { label: 'Q2', target: 95, collected: 92 },
                { label: 'Q3', target: 90, collected: 70 },
                { label: 'Q4', target: 100, collected: 88 },
              ]}
              xKey="label"
              dataKeys={[
                { key: 'collected', color: '#f97316', name: 'Collected Revenue' },
                { key: 'target', color: '#52525b', name: 'Target Budget' },
              ]}
            />
          </div>
        </VFCard>

        {/* Academic Excellence & Distinction Summary */}
        <VFCard
          title={
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>{isHindi ? 'अकादमिक विशिष्टता व उपलब्धियां' : 'Academic Standing & Distinctions'}</span>
            </div>
          }
          description={
            isHindi
              ? 'बोर्ड परीक्षा परिणाम, मेरिट डिस्टिंक्शन व विषयवार प्रदर्शन'
              : 'Board summative standings, merit honors, and subject distinction benchmarks'
          }
          className="bg-[#0d0d0d] border-border/90"
          bodyClassName="p-4 space-y-3"
        >
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-[4px] bg-[#141414] border border-[#242424] space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                {isHindi ? 'डिस्टिंक्शन दर' : 'Distinction Rate (>75%)'}
              </span>
              <p className="text-xl font-black text-foreground font-mono">89.2%</p>
              <p className="text-[11px] text-emerald-400 font-medium">324 Students with Honors</p>
            </div>
            <div className="p-3 rounded-[4px] bg-[#141414] border border-[#242424] space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                {isHindi ? 'राज्य मेरिट रैंकर्स' : 'State Merit Rankers'}
              </span>
              <p className="text-xl font-black text-foreground font-mono">14 Pupils</p>
              <p className="text-[11px] text-blue-400 font-medium">Top 0.5 percentile CBSE</p>
            </div>
          </div>

          <div className="space-y-2 pt-1 border-t border-[#202020]">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">
              {isHindi ? 'मुख्य विषयवार औसत अंक' : 'Core Subject Averages'}
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2 rounded-[4px] bg-[#141414] border border-[#242424] text-center">
                <span className="text-muted-foreground text-[10px] block">Mathematics</span>
                <span className="font-mono font-bold text-foreground">92.4%</span>
              </div>
              <div className="p-2 rounded-[4px] bg-[#141414] border border-[#242424] text-center">
                <span className="text-muted-foreground text-[10px] block">Science</span>
                <span className="font-mono font-bold text-foreground">91.8%</span>
              </div>
              <div className="p-2 rounded-[4px] bg-[#141414] border border-[#242424] text-center">
                <span className="text-muted-foreground text-[10px] block">English</span>
                <span className="font-mono font-bold text-foreground">94.1%</span>
              </div>
            </div>
          </div>
        </VFCard>
      </div>

      {/* 5. Section 3: Class Enrollment & Operational Summary (Clean 4-col Grid) */}
      <VFCard
        title={
          <div className="flex items-center gap-2">
            <School className="h-4 w-4 text-primary" />
            <span>{isHindi ? 'कक्षावार नामांकन व उपस्थिति सारांश' : 'Senior Secondary & High School Roster Summary'}</span>
          </div>
        }
        description={
          isHindi
            ? 'कक्षा 9 से 12 के छात्रों, सेक्शन्स व सक्रिय उपस्थिति दर का संक्षिप्त विवरण'
            : 'Operational division strength and realtime attendance benchmark across core grades'
        }
        className="bg-[#0d0d0d] border-border/90"
        bodyClassName="p-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { grade: 'Class 9', total: '320 Students', sections: '4 Sections', standing: '96.2% Attendance', ratio: '80 / Section' },
            { grade: 'Class 10', total: '310 Students', sections: '4 Sections', standing: '97.8% Attendance', ratio: '77 / Section' },
            { grade: 'Class 11', total: '308 Students', sections: '4 Sections', standing: '94.5% Attendance', ratio: '77 / Section' },
            { grade: 'Class 12', total: '310 Students', sections: '4 Sections', standing: '98.1% Attendance', ratio: '77 / Section' },
          ].map((c, i) => (
            <div
              key={i}
              className="p-3 rounded-[4px] bg-[#141414] border border-border/80 space-y-2 hover:border-primary/40 transition-colors shadow-xs"
            >
              <div className="flex items-center justify-between">
                <p className="font-extrabold text-foreground text-sm">{c.grade}</p>
                <VFBadge variant="outline" className="text-[10px] font-mono font-bold">
                  {c.sections}
                </VFBadge>
              </div>
              <p className="text-xl font-black text-foreground font-mono">{c.total}</p>
              <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground pt-1.5 border-t border-border/50">
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> {c.standing}
                </span>
                <span className="font-mono text-[10px]">{c.ratio}</span>
              </div>
            </div>
          ))}
        </div>
      </VFCard>
    </VFPageContainer>
  );
}
