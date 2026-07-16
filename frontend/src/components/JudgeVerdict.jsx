import React from 'react'

/**
 * Reusable Verdict panel for detailed assessment.
 * Shows score totals and explains who won in the right-column space next to the scores.
 */
export default function JudgeVerdict({ judge, winner }) {
  if (!judge) return null
  const winnerName = winner === 'solution_1' ? 'Model A' : winner === 'solution_2' ? 'Model B' : 'Draw'
  const isDraw = winner === 'draw'

  return (
    <div className="bg-[#12121c] border border-white/5 rounded-xl p-6 relative overflow-hidden" style={{ borderTop: '2px solid #fbbf24' }}>
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-amber-500/[0.02] to-transparent pointer-events-none" />

      {/* Title block */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-amber-500 text-sm">⚖️</span>
          <h3 className="font-bold text-xs tracking-[0.15em] uppercase text-amber-500 font-mono">
            Judge's Verdict
          </h3>
        </div>
      </div>

      {/* Two Column Layout matching reference image */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* Left Side: Score Boxes */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {/* Model A score */}
          <div className="bg-[#09090f] border border-white/5 rounded-xl p-5 flex flex-col justify-between relative min-h-[130px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4d8eff] shadow-[0_0_8px_#4d8eff]" />
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Model A</span>
            </div>
            <div className="text-5xl font-black text-white leading-none">
              {judge.solution_1_score}
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500">SCORE</span>
            </div>
            <span className="absolute bottom-4 right-4 text-[10px] font-mono text-gray-600">{judge.solution_1_score}/10</span>
          </div>

          {/* Model B score */}
          <div className="bg-[#09090f] border border-white/5 rounded-xl p-5 flex flex-col justify-between relative min-h-[130px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#34d399] shadow-[0_0_8px_#34d399]" />
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Model B</span>
            </div>
            <div className="text-5xl font-black text-white leading-none">
              {judge.solution_2_score}
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500">SCORE</span>
            </div>
            <span className="absolute bottom-4 right-4 text-[10px] font-mono text-gray-600">{judge.solution_2_score}/10</span>
          </div>
        </div>

        {/* Right Side: Winner Explanation inside the blank space */}
        <div className="flex-1 bg-[#09090f] border border-white/5 rounded-xl p-5 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            {!isDraw && <span className="text-lg">🏆</span>}
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider font-sans">
              {isDraw ? "It's a Draw!" : `${winnerName} Wins.`}
            </h4>
          </div>
          <p className="text-[12.5px] text-gray-400 leading-relaxed font-sans">
            {isDraw 
              ? "Both solutions performed equally well, displaying comparable algorithmic execution, readability, and score results."
              : winner === 'solution_1'
                ? judge.solution_1_response
                : judge.solution_2_response
            }
          </p>
        </div>
      </div>

      {/* Detailed Analysis text */}
      <div className="space-y-3 mt-6 pt-4 border-t border-white/[0.04]">
        <div className="flex flex-col gap-1 text-[13px] leading-relaxed text-gray-400">
          <p>
            <strong className="text-[#4d8eff] mr-1">Model A Analysis:</strong>
            {judge.solution_1_response}
          </p>
        </div>
        <div className="flex flex-col gap-1 text-[13px] leading-relaxed text-gray-400">
          <p>
            <strong className="text-[#34d399] mr-1">Model B Analysis:</strong>
            {judge.solution_2_response}
          </p>
        </div>
      </div>
    </div>
  )
}
