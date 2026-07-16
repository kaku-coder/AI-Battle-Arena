export default function JudgeVerdict({ judge, winner, solution1, solution2 }) {
  if (!judge) return null
  const winnerName = winner === 'solution_1' ? 'Model A' : winner === 'solution_2' ? 'Model B' : 'Draw'
  const isDraw = winner === 'draw'
  const winnerAnswer = isDraw ? null : winner === 'solution_1' ? solution1 : solution2

  return (
    <div className="bg-card-bg border border-border-subtle rounded-2xl p-6 relative overflow-hidden transition-all duration-300 shadow-xl" style={{ borderTop: '2px solid #fbbf24' }}>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-amber-500/[0.02] to-transparent pointer-events-none" />

      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-amber-500 text-[16px]">gavel</span>
          </div>
          <h3 className="font-extrabold text-xs tracking-[0.15em] uppercase text-amber-500 font-mono">
            Judge's Verdict
          </h3>
        </div>
        <span className="text-[9px] font-mono font-bold tracking-[0.15em] text-amber-400/80 bg-amber-500/10 border border-amber-500/15 px-3 py-1 rounded-lg uppercase">
          EVALUATOR ACTIVE
        </span>
      </div>

      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row gap-5 items-stretch">
        
        {/* Score Boxes */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {/* Model A */}
          <div className="bg-void/80 border border-border-subtle rounded-2xl p-5 flex flex-col justify-between relative min-h-[140px] group transition-all duration-300 hover:border-[#4d8eff]/25 hover:shadow-lg hover:shadow-[#4d8eff]/5">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 rounded-2xl" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(77,142,255,0.06) 0%, transparent 70%)' }} />
            <div className="flex items-center gap-2 relative z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-[#4d8eff] shadow-[0_0_10px_rgba(77,142,255,0.5)]" />
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.12em]">Model A</span>
            </div>
            <div className="text-5xl font-black text-text-primary leading-none font-mono relative z-10">
              {judge.solution_1_score}
            </div>
            <div className="relative z-10">
              <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-text-muted">SCORE</span>
            </div>
            <span className="absolute bottom-4 right-4 text-[10px] font-mono text-text-muted z-10">{judge.solution_1_score}/10</span>
          </div>

          {/* Model B */}
          <div className="bg-void/80 border border-border-subtle rounded-2xl p-5 flex flex-col justify-between relative min-h-[140px] group transition-all duration-300 hover:border-[#34d399]/25 hover:shadow-lg hover:shadow-[#34d399]/5">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 rounded-2xl" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(52,211,153,0.06) 0%, transparent 70%)' }} />
            <div className="flex items-center gap-2 relative z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-[#34d399] shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.12em]">Model B</span>
            </div>
            <div className="text-5xl font-black text-text-primary leading-none font-mono relative z-10">
              {judge.solution_2_score}
            </div>
            <div className="relative z-10">
              <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-text-muted">SCORE</span>
            </div>
            <span className="absolute bottom-4 right-4 text-[10px] font-mono text-text-muted z-10">{judge.solution_2_score}/10</span>
          </div>
        </div>

        {/* Winner Explanation */}
        <div className="flex-1 bg-void/80 border border-border-subtle rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.015] to-transparent pointer-events-none" />
          <div className="flex items-center gap-3 mb-4 relative z-10">
            {!isDraw && (
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-amber-500 text-[16px]">emoji_events</span>
              </div>
            )}
            <h4 className="text-sm font-extrabold text-text-primary uppercase tracking-wider font-sans">
              {isDraw ? "It's a Draw!" : `${winnerName} Wins.`}
            </h4>
          </div>
          <p className="text-[12.5px] text-text-secondary leading-relaxed font-sans relative z-10">
            {isDraw 
              ? "Both solutions performed equally well, displaying comparable algorithmic execution, readability, and score results."
              : winner === 'solution_1'
                ? judge.solution_1_response
                : judge.solution_2_response
            }
          </p>
        </div>
      </div>

      {/* Winner's Answer */}
      {winnerAnswer && (
        <div className="mt-6 pt-5 border-t border-border-subtle">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-amber-500 text-[14px]">check_circle</span>
            </div>
            <h4 className="text-[10px] font-bold font-mono uppercase tracking-[0.15em] text-amber-400">
              {winnerName}'s Answer
            </h4>
          </div>
          <div className="bg-void/60 border border-border-subtle rounded-2xl p-5 font-mono text-[12px] leading-[1.85] text-text-secondary whitespace-pre-wrap">
            {winnerAnswer}
          </div>
        </div>
      )}
    </div>
  )
}
