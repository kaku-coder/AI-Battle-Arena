import TypewriterEffect from './TypewriterEffect'

export default function SolutionCard({ modelName, score, solution, isLoading, accentColor, iconName, isWinner }) {
  return (
    <div
      className={`solution-card bg-card-bg border rounded-2xl overflow-hidden flex flex-col relative transition-all duration-500 group ${
        isWinner 
          ? 'border-amber-500/50 shadow-[0_0_40px_-8px_rgba(245,158,11,0.3)] winner-card' 
          : 'border-border-subtle hover:border-border-medium hover:shadow-lg hover:shadow-purple-500/5'
      }`}
      style={{ borderTop: `2px solid ${isWinner ? '#fbbf24' : accentColor}` }}
    >
      {isWinner && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] via-transparent to-amber-500/[0.01] pointer-events-none z-0" />
      )}

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 z-0"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${accentColor}08 0%, transparent 70%)` }} />

      <div className="bg-card-header/80 backdrop-blur-sm px-5 py-3.5 border-b border-border-subtle flex justify-between items-center z-10 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}25` }}>
            {iconName && (
              <span className="material-symbols-outlined text-[16px]" style={{ color: isWinner ? '#fbbf24' : accentColor }}>
                {iconName}
              </span>
            )}
          </div>
          <span className={`font-mono text-xs tracking-wider font-bold ${isWinner ? 'text-amber-400' : 'text-text-primary'}`}>
            {modelName}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {score !== null && score !== undefined && (
            <div className="flex items-center gap-1.5">
              <div className="w-16 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${(score / 10) * 100}%`, background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)` }} />
              </div>
              <span className="font-mono text-[11px] text-text-secondary font-semibold">{score}</span>
            </div>
          )}
          {isWinner && (
            <span className="px-2.5 py-1 bg-gradient-to-r from-amber-500/15 to-amber-600/10 text-amber-400 border border-amber-500/25 rounded-lg font-mono text-[9px] uppercase tracking-wider font-bold shadow-sm shadow-amber-500/10">
              WINNER
            </span>
          )}
        </div>
      </div>

      <div className="p-5 overflow-y-auto overflow-x-auto flex-1 z-10 custom-scrollbar">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-white/5 border-t-purple-500 animate-spin" />
              <span className="material-symbols-outlined text-purple-400 text-lg absolute inset-0 flex items-center justify-center">auto_awesome</span>
            </div>
            <div className="text-center space-y-1">
              <p className="text-text-secondary text-xs font-bold uppercase tracking-wider font-mono">Generating solution...</p>
              <p className="text-text-muted text-[10px] font-mono">Analyzing problem complexity</p>
            </div>
            <div className="flex gap-1.5 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        ) : solution ? (
          <div className="font-mono text-[12px] leading-[1.85] text-text-secondary whitespace-pre-wrap">
            <TypewriterEffect text={solution} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-text-muted gap-3">
            <span className="material-symbols-outlined text-3xl text-border-medium">code_off</span>
            <p className="text-xs font-mono">Awaiting battle data...</p>
          </div>
        )}
      </div>
    </div>
  )
}
