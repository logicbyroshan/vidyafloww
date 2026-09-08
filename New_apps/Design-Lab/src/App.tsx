import * as React from 'react';
import { DesignLabPage } from './DesignLabModule';
import { useGlobalStore } from './stores/globalStore';
import { ArrowLeft, ExternalLink, Globe } from 'lucide-react';

export function App() {
  const lang = useGlobalStore((s) => s.language);
  const setLanguage = useGlobalStore((s) => s.setLanguage);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col font-sans selection:bg-primary/30 selection:text-white">
      {/* Top Institutional Header Bar */}
      <header className="h-[58px] px-5 border-b border-[#262626] bg-[#141414] flex items-center justify-between shrink-0 select-none z-50">
        <div className="flex items-center gap-3">
          <a
            href="http://localhost:3000"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#1c1c1f] hover:bg-[#27272a] text-xs font-semibold text-[#a1a1aa] hover:text-white transition-colors border border-[#2e2e32]"
            title="Return to VidyaFloww Main Portal"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Portal</span>
          </a>

          <div className="h-4 w-[1px] bg-[#2e2e32]" />

          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-[4px] bg-primary/20 border border-primary/40 flex items-center justify-center font-extrabold text-primary text-xs">
              VF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm tracking-tight text-[#fafafa] leading-tight">
                  Design Lab Studio
                </h1>
                <span className="text-[11px] text-[#71717a] font-medium hidden md:inline">
                  (डिज़ाइन लैब स्टूडियो)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Subdomain & Port Indicators */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#18181b] border border-[#27272a] text-xs font-mono text-[#a1a1aa]">
            <span>Port: <strong className="text-white">8010</strong></span>
            <span className="text-[#3f3f46]">|</span>
            <a
              href="https://designlab.vidyafloww.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1 font-sans"
            >
              designlab.vidyafloww.com
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <span className="px-2 py-0.5 rounded-[4px] bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 font-bold text-[11px] tracking-wide uppercase">
            Standalone Mode
          </span>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(lang === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#1c1c1f] hover:bg-[#27272a] text-xs font-semibold text-[#d4d4d8] border border-[#2e2e32] transition-colors"
            title="Toggle English / हिन्दी"
          >
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>
        </div>
      </header>

      {/* Primary Subsystem Module */}
      <main className="flex-1 min-h-0 overflow-y-auto">
        <DesignLabPage />
      </main>
    </div>
  );
}
