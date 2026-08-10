import * as React from 'react';
import { useGlobalStore } from '../stores/globalStore';

export function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = React.useState<'in' | 'hold' | 'out'>('in');
  const { setHasSeenPreloader } = useGlobalStore();

  React.useEffect(() => {
    // Phase: in (0-600ms) → hold (600-2200ms) → out (2200-2800ms)
    const t1 = setTimeout(() => setPhase('hold'), 600);
    const t2 = setTimeout(() => setPhase('out'), 2200);
    const t3 = setTimeout(() => {
      setHasSeenPreloader();
      onDone();
    }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone, setHasSeenPreloader]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500"
      style={{ opacity: phase === 'out' ? 0 : 1, pointerEvents: phase === 'out' ? 'none' : 'all' }}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Glow blob */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(24 95% 53% / 0.18) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Logo + wordmark */}
      <div
        className="relative flex flex-col items-center gap-6 transition-all duration-700"
        style={{
          opacity: phase === 'in' ? 0 : 1,
          transform: phase === 'in' ? 'translateY(16px)' : 'translateY(0)',
        }}
      >
        {/* Icon */}
        <div className="relative">
          <div className="h-20 w-20 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/30">
            <span className="text-4xl font-black text-white">V</span>
          </div>
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-2xl border-2 border-primary/60 animate-ping" style={{ animationDuration: '1.5s' }} />
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Vidya<span className="text-primary">Maxx</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground tracking-widest uppercase">
            AI-First School Management
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-0.5 bg-muted rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-primary rounded-full transition-all duration-[1600ms] ease-out"
            style={{ width: phase === 'in' ? '0%' : phase === 'hold' ? '85%' : '100%' }}
          />
        </div>

        {/* Status text */}
        <p className="text-xs text-muted-foreground animate-pulse">
          {phase === 'in' ? 'Initializing...' : phase === 'hold' ? 'Loading AI modules...' : 'Ready'}
        </p>
      </div>
    </div>
  );
}
