import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from '../hooks/useTranslation';
import { useGlobalStore } from '../stores/globalStore';
import {
  VFPageContainer,
  VFStatCard,
  VFButton,
  VFCard,
  VFTabs,
  VFBadge,
  VFDialog,
} from '@vidyafloww/ui';
import {
  Vote,
  CheckCircle2,
  Plus,
  Users,
  TrendingUp,
  BarChart3,
  Download,
  Copy,
  FileSpreadsheet,
} from 'lucide-react';

export const Route = createFileRoute('/surveys')({
  component: SurveysManagementPage,
});

interface InstitutionalSurvey {
  id: string;
  title: string;
  targetAudience: 'Parents' | 'Students' | 'Faculty' | 'All Community';
  category: string;
  responsesCount: number;
  totalTarget: number;
  satisfactionScore: string;
  status: 'Active' | 'Completed';
  endDate: string;
  keyFinding: string;
}

interface HistoricalSurvey {
  id: string;
  title: string;
  audience: string;
  completedDate: string;
  totalResponses: number;
  finalRating: string;
  reportUrl: string;
}

const INITIAL_SURVEYS: InstitutionalSurvey[] = [
  {
    id: 'SURV-101',
    title: 'Annual Parent Satisfaction & Academic Pacing Survey 2026',
    targetAudience: 'Parents',
    category: 'Academic & Institutional Excellence',
    responsesCount: 482,
    totalTarget: 600,
    satisfactionScore: '92.4%',
    status: 'Active',
    endDate: '15 Sep 2026',
    keyFinding: 'Strong appreciation for STEM labs and bi-monthly parent-teacher feedback transparency.',
  },
  {
    id: 'SURV-102',
    title: 'Student Cafeteria & Hostel Mess Nutrition Quality Poll',
    targetAudience: 'Students',
    category: 'Campus Dining & Hygiene',
    responsesCount: 310,
    totalTarget: 350,
    satisfactionScore: '88.6%',
    status: 'Active',
    endDate: '12 Sep 2026',
    keyFinding: '89% approve lunch menu; students requested more seasonal fruits during evening high tea.',
  },
  {
    id: 'SURV-103',
    title: 'Faculty Smart Board & Digital Learning Tools Usability Audit',
    targetAudience: 'Faculty',
    category: 'EdTech & Teaching Infrastructure',
    responsesCount: 48,
    totalTarget: 50,
    satisfactionScore: '96.2%',
    status: 'Active',
    endDate: '18 Sep 2026',
    keyFinding: 'High adoption of interactive whiteboard simulation; request for more math formula widgets.',
  },
  {
    id: 'SURV-104',
    title: 'Campus Safe Environment & Anti-Bullying Wellbeing Check',
    targetAudience: 'All Community',
    category: 'Student Welfare & Mental Health',
    responsesCount: 586,
    totalTarget: 620,
    satisfactionScore: '97.8%',
    status: 'Active',
    endDate: '20 Sep 2026',
    keyFinding: 'Overwhelming positive response on student emotional counselor accessibility.',
  },
];

const ARCHIVED_SURVEYS: HistoricalSurvey[] = [
  { id: 'SURV-098', title: 'Term 1 Exam Readiness & Revision Feedback', audience: 'Students (Gr 9-12)', completedDate: '15 Jul 2026', totalResponses: 412, finalRating: '4.6 / 5.0', reportUrl: '#' },
  { id: 'SURV-095', title: 'New Academic Year Bus Route Satisfaction Survey', audience: 'Parents', completedDate: '28 Apr 2026', totalResponses: 520, finalRating: '4.4 / 5.0', reportUrl: '#' },
  { id: 'SURV-092', title: 'Curriculum NEP 2020 Skill Subjects Preference Poll', audience: 'Parents & Students', completedDate: '10 Mar 2026', totalResponses: 680, finalRating: '4.8 / 5.0', reportUrl: '#' },
];

function SurveysManagementPage() {
  const { t, lang } = useTranslation();
  const { addNotification } = useGlobalStore();
  const isHindi = lang === 'hi';

  React.useEffect(() => {
    document.title = (isHindi ? 'सर्वेक्षण व फीडबैक' : 'Surveys & Feedback') + ' – VidyaFloww';
  }, [isHindi]);

  const [surveys, setSurveys] = React.useState<InstitutionalSurvey[]>(INITIAL_SURVEYS);
  const [archives] = React.useState<HistoricalSurvey[]>(ARCHIVED_SURVEYS);
  const [selectedSurvey, setSelectedSurvey] = React.useState<InstitutionalSurvey | null>(null);
  const [isNewSurveyModalOpen, setIsNewSurveyModalOpen] = React.useState(false);

  // New Survey Form State
  const [surveyTitle, setSurveyTitle] = React.useState('');
  const [surveyAudience, setSurveyAudience] = React.useState<'Parents' | 'Students' | 'Faculty' | 'All Community'>('Parents');
  const [surveyCategory, setSurveyCategory] = React.useState('Academic & Student Welfare');
  const [surveyTarget, setSurveyTarget] = React.useState('500');

  const handleCreateSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!surveyTitle.trim()) return;

    const newSurvey: InstitutionalSurvey = {
      id: `SURV-${Math.floor(100 + Math.random() * 900)}`,
      title: surveyTitle.trim(),
      targetAudience: surveyAudience,
      category: surveyCategory,
      responsesCount: 0,
      totalTarget: parseInt(surveyTarget, 10) || 500,
      satisfactionScore: '—',
      status: 'Active',
      endDate: '30 Sep 2026',
      keyFinding: 'Survey published. Awaiting community responses.',
    };

    setSurveys([newSurvey, ...surveys]);
    setIsNewSurveyModalOpen(false);
    setSurveyTitle('');
    addNotification({
      title: isHindi ? 'नया सर्वेक्षण प्रकाशित' : 'Survey Published',
      description: `"${newSurvey.title}" is now live.`,
      type: 'success',
    });
  };

  // ----------------------------------------------------
  // TAB 1: Active Surveys & Community Polls
  // ----------------------------------------------------
  const activeContent = (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#141414] border border-border/80 p-3 rounded-md">
        <div>
          <h3 className="text-sm font-bold text-foreground">
            {isHindi ? 'सक्रिय संस्थागत सर्वेक्षण व जनमत पोल' : 'Active Institutional Feedback Surveys & Community Polls'}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isHindi ? 'अभिभावक, छात्र व शिक्षक संतुष्टि दर व सुझाव' : 'Anonymous feedback collection, Net Promoter Score (NPS), and facility quality checks'}
          </p>
        </div>
        <VFButton
          size="sm"
          leftIcon={<Plus className="h-3.5 w-3.5" />}
          onClick={() => setIsNewSurveyModalOpen(true)}
          className="rounded-md font-bold"
        >
          {isHindi ? 'नया सर्वे बनाएं' : 'Create Survey'}
        </VFButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {surveys.map((sv) => {
          const completionPct = Math.round((sv.responsesCount / sv.totalTarget) * 100);
          return (
            <div key={sv.id} className="p-3.5 rounded-md border border-border/80 bg-card hover:border-primary/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <VFBadge variant="outline" className="text-[10px] font-mono">{sv.targetAudience}</VFBadge>
                    <span className="text-[10px] text-muted-foreground">{sv.category}</span>
                  </div>
                  <VFBadge variant="success" className="text-[10px]">
                    {sv.status}
                  </VFBadge>
                </div>

                <h4 className="text-xs font-bold text-foreground leading-snug">{sv.title}</h4>
                <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">{sv.keyFinding}</p>

                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Responses Received</span>
                    <span className="font-mono font-bold text-foreground">{sv.responsesCount} / {sv.totalTarget} ({completionPct}%)</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${completionPct}%` }} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border/60 pt-2.5 mt-3 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground">Satisfaction:</span>
                  <span className="font-bold text-emerald-400 font-mono">{sv.satisfactionScore}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <VFButton
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-[10px] rounded-sm"
                    leftIcon={<Copy className="h-2.5 w-2.5" />}
                    onClick={() => {
                      navigator.clipboard.writeText(`https://portal.vidyafloww.org/survey/${sv.id.toLowerCase()}`);
                      addNotification({
                        title: isHindi ? 'लिंक कॉपी किया गया' : 'Survey Link Copied',
                        description: 'Anonymous questionnaire link copied to clipboard.',
                        type: 'info',
                      });
                    }}
                  >
                    Share
                  </VFButton>
                  <VFButton
                    size="sm"
                    className="h-6 px-2 text-[10px] rounded-sm font-bold"
                    onClick={() => setSelectedSurvey(sv)}
                  >
                    Breakdown
                  </VFButton>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ----------------------------------------------------
  // TAB 2: Sentiment & NPS Analytics
  // ----------------------------------------------------
  const analyticsContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <VFCard title="Campus NPS Score (+68)" className="rounded-md">
          <div className="space-y-3 text-xs mt-1">
            <div className="flex items-center justify-between font-mono">
              <span className="text-emerald-400 font-bold">78% Promoters</span>
              <span className="text-muted-foreground font-semibold">16% Passive</span>
              <span className="text-rose-400 font-semibold">6% Detractor</span>
            </div>
            <div className="h-2 w-full flex rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full" style={{ width: '78%' }} />
              <div className="bg-muted-foreground/50 h-full" style={{ width: '16%' }} />
              <div className="bg-rose-500 h-full" style={{ width: '6%' }} />
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Institutional Net Promoter Score is in the top 5% of CBSE affiliated schools in the region.
            </p>
          </div>
        </VFCard>

        <VFCard title="Category Satisfaction Index" className="rounded-md">
          <div className="space-y-2 text-xs mt-1">
            {[
              { cat: 'Academics & Faculty', score: '95.4%' },
              { cat: 'Safety & Security', score: '97.8%' },
              { cat: 'EdTech & Smart Boards', score: '96.2%' },
              { cat: 'Transport & Commute', score: '89.0%' },
              { cat: 'Cafeteria & Dining', score: '88.6%' },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-muted-foreground">{item.cat}</span>
                <span className="font-mono font-bold text-foreground">{item.score}</span>
              </div>
            ))}
          </div>
        </VFCard>

        <VFCard title="Recent Action Items Taken" className="rounded-md">
          <div className="space-y-2 text-xs mt-1">
            {[
              'Added 8 study cubicles in senior library based on student poll.',
              'Adjusted Preet Vihar morning bus timing by 10 minutes.',
              'Increased fruit servings in hostel evening dining menu.',
              'Installed 3 optical replacement lamps in Physics Lab 204.',
            ].map((action, i) => (
              <div key={i} className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
                <span>{action}</span>
              </div>
            ))}
          </div>
        </VFCard>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // TAB 3: Historical Completed Archive
  // ----------------------------------------------------
  const archiveContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-[#141414] border border-border/80 p-3 rounded-md">
        <div>
          <h3 className="text-sm font-bold text-foreground">
            {isHindi ? 'पुराने पूर्ण सर्वेक्षण व वार्षिक रिपोर्ट्स' : 'Completed Surveys & Historical Compliance Reports'}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isHindi ? 'विगत सत्रों के सर्वेक्षण आंकड़े व डाउनलोड योग्य रिपोर्ट' : 'Archived survey results, community participation audits, and PDF analytics summaries'}
          </p>
        </div>
        <VFBadge variant="outline" className="font-mono text-xs">
          3 Past Audits Archived
        </VFBadge>
      </div>

      <div className="border border-border/80 rounded-md overflow-hidden bg-card">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-border bg-[#141414] text-muted-foreground font-semibold">
              <th className="py-2.5 px-3">#</th>
              <th className="py-2.5 px-3">{isHindi ? 'सर्वेक्षण शीर्षक' : 'Survey Title'}</th>
              <th className="py-2.5 px-3">{isHindi ? 'लक्षित समूह' : 'Audience'}</th>
              <th className="py-2.5 px-3">{isHindi ? 'पूर्णता तिथि' : 'Completion Date'}</th>
              <th className="py-2.5 px-3">{isHindi ? 'कुल प्रतिक्रियाएं' : 'Total Responses'}</th>
              <th className="py-2.5 px-3">{isHindi ? 'अंतिम रेटिंग' : 'Final Rating'}</th>
              <th className="py-2.5 px-3 text-right">{t('col.action')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {archives.map((a) => (
              <tr key={a.id} className="hover:bg-[#1a1a1a] transition-colors">
                <td className="py-2.5 px-3 font-mono text-muted-foreground">{a.id}</td>
                <td className="py-2.5 px-3 font-bold text-foreground">{a.title}</td>
                <td className="py-2.5 px-3 text-muted-foreground">{a.audience}</td>
                <td className="py-2.5 px-3 font-mono text-muted-foreground">{a.completedDate}</td>
                <td className="py-2.5 px-3 font-mono font-bold text-foreground">{a.totalResponses}</td>
                <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">{a.finalRating}</td>
                <td className="py-2.5 px-3 text-right">
                  <VFButton
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-[10px] rounded-sm font-bold"
                    leftIcon={<Download className="h-2.5 w-2.5" />}
                  >
                    Report
                  </VFButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const tabs = [
    { id: 'active', label: isHindi ? 'सक्रिय सर्वेक्षण' : 'Active Surveys & Polls', icon: <Vote className="h-4 w-4" />, content: activeContent },
    { id: 'analytics', label: isHindi ? 'संतुष्टि विश्लेषण' : 'Sentiment & NPS Analytics', icon: <BarChart3 className="h-4 w-4" />, content: analyticsContent },
    { id: 'archive', label: isHindi ? 'पुराने रिकॉर्ड' : 'Archived Audits', icon: <FileSpreadsheet className="h-4 w-4" />, content: archiveContent },
  ];

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {/* ── Header Toolbar ── */}
      <div className="p-3.5 rounded-md bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30">
            <Vote className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-foreground tracking-tight">
                {isHindi ? 'संस्थागत सर्वेक्षण' : 'Institutional Surveys'}
              </span>
              <VFBadge variant="success" className="text-[10px] font-bold font-mono">
                {isHindi ? 'फीडबैक सक्रिय' : 'Feedback Engine Active'}
              </VFBadge>
            </div>
            <p className="text-xs text-muted-foreground">
              {isHindi ? 'अभिभावक, छात्र व शिक्षक फीडबैक पोल, नेट प्रमोटर स्कोर व संतुष्टि विश्लेषण' : 'Community sentiment polling, Net Promoter Score audits & anonymous stakeholder feedback'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
            onClick={() => setIsNewSurveyModalOpen(true)}
            className="rounded-md font-bold"
          >
            {isHindi ? 'नया सर्वे बनाएं' : 'Create New Survey'}
          </VFButton>
        </div>
      </div>

      {/* ── 4 KPI Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        <VFStatCard
          title={isHindi ? 'सक्रिय सर्वेक्षण' : 'Active Live Polls'}
          value="4 Surveys"
          icon={<Vote className="h-4.5 w-4.5 text-indigo-400" />}
          trend="neutral"
          trendLabel="Parents & Students"
          className="rounded-md"
        />
        <VFStatCard
          title={isHindi ? 'कुल प्रतिक्रियाएं' : 'Total Submissions'}
          value="1,426 Responses"
          icon={<Users className="h-4.5 w-4.5 text-primary" />}
          trend="up"
          trendLabel="87.4% Response Rate"
          className="rounded-md"
        />
        <VFStatCard
          title={isHindi ? 'नेट प्रमोटर स्कोर' : 'Campus NPS Index'}
          value="+68 NPS"
          icon={<CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />}
          trend="up"
          trendLabel="94.2% Net Positive"
          className="rounded-md"
        />
        <VFStatCard
          title={isHindi ? 'सुधार कार्यवाहियां' : 'Improvement Actions'}
          value="12 Actions"
          icon={<TrendingUp className="h-4.5 w-4.5 text-purple-400" />}
          trend="up"
          trendLabel="Implemented this term"
          className="rounded-md"
        />
      </div>

      {/* ── Tabs Navigation ── */}
      <VFTabs items={tabs} defaultTabId="active" variant="top-bar" />

      {/* ── Create Survey Modal ── */}
      <VFDialog
        isOpen={isNewSurveyModalOpen}
        onClose={() => setIsNewSurveyModalOpen(false)}
        title={isHindi ? 'नया संस्थागत सर्वेक्षण बनाएं' : 'Create Institutional Survey'}
        description={isHindi ? 'लक्षित समूह व सर्वेक्षण शीर्षक निर्धारित करें' : 'Broadcast a digital questionnaire to collect anonymous stakeholder feedback'}
        className="max-w-md rounded-md"
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsNewSurveyModalOpen(false)}
              className="rounded-md"
            >
              {t('action.cancel')}
            </VFButton>
            <VFButton
              variant="primary"
              size="sm"
              onClick={handleCreateSurvey}
              disabled={!surveyTitle.trim()}
              className="rounded-md font-bold"
            >
              {isHindi ? 'प्रकाशित करें' : 'Publish Survey'}
            </VFButton>
          </div>
        }
      >
        <form onSubmit={handleCreateSurvey} className="space-y-3 text-xs mt-1">
          <div>
            <label className="block font-bold text-foreground mb-1">{isHindi ? 'सर्वेक्षण शीर्षक' : 'Survey Title'}</label>
            <input
              type="text"
              value={surveyTitle}
              onChange={(e) => setSurveyTitle(e.target.value)}
              placeholder="e.g. Mid-Term Student Learning Comfort Poll"
              className="w-full px-3 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-foreground mb-1">{isHindi ? 'लक्षित समूह' : 'Target Audience'}</label>
              <select
                value={surveyAudience}
                onChange={(e: any) => setSurveyAudience(e.target.value)}
                className="w-full px-2.5 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
              >
                <option value="Parents">Parents Only</option>
                <option value="Students">Students Only</option>
                <option value="Faculty">Faculty &amp; Staff</option>
                <option value="All Community">All School Community</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-foreground mb-1">{isHindi ? 'लक्ष्य प्रतिक्रियाएं' : 'Target Responses'}</label>
              <input
                type="number"
                value={surveyTarget}
                onChange={(e) => setSurveyTarget(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-foreground mb-1">{isHindi ? 'श्रेणी' : 'Category'}</label>
            <input
              type="text"
              value={surveyCategory}
              onChange={(e) => setSurveyCategory(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
            />
          </div>
        </form>
      </VFDialog>

      {/* ── Survey Breakdown Dialog ── */}
      {selectedSurvey && (
        <VFDialog
          isOpen={true}
          onClose={() => setSelectedSurvey(null)}
          title={`Survey Analytics — ${selectedSurvey.id}`}
          description={`${selectedSurvey.title} · ${selectedSurvey.targetAudience}`}
          className="max-w-md rounded-md"
          footerActions={
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] text-emerald-400 font-mono font-bold">
                Satisfaction: {selectedSurvey.satisfactionScore}
              </span>
              <VFButton
                variant="outline"
                size="sm"
                onClick={() => setSelectedSurvey(null)}
                className="rounded-md font-bold"
              >
                {t('action.close')}
              </VFButton>
            </div>
          }
        >
          <div className="space-y-3 text-xs">
            <div className="p-2.5 rounded-md bg-[#141414] border border-border/80">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-foreground">Participation Progress</span>
                <span className="font-mono text-primary font-bold">{selectedSurvey.responsesCount} / {selectedSurvey.totalTarget}</span>
              </div>
              <p className="text-muted-foreground">{selectedSurvey.keyFinding}</p>
            </div>

            <div className="border border-border/70 rounded-md p-2.5 bg-[#121212] space-y-2">
              <p className="text-[10px] font-bold uppercase text-muted-foreground">Sample Question Breakdown</p>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Overall Satisfaction</span>
                  <span className="font-mono text-emerald-400 font-bold">4.7 / 5.0 ★</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Staff Responsiveness</span>
                  <span className="font-mono text-emerald-400 font-bold">4.8 / 5.0 ★</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Safety &amp; Well-being</span>
                  <span className="font-mono text-emerald-400 font-bold">4.9 / 5.0 ★</span>
                </div>
              </div>
            </div>
          </div>
        </VFDialog>
      )}
    </VFPageContainer>
  );
}
