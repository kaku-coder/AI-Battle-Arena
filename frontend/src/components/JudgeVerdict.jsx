import { useState, useEffect, useRef } from 'react'

function AnimatedScore({ score, color, isWinner, modelName = 'Model' }) {
  const [displayScore, setDisplayScore] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!revealed) return
    let start = 0
    const end = score
    const duration = 1200
    const startTime = performance.now()

    function animate(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayScore(Math.round(eased * end * 10) / 10)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [revealed, score])

  return (
    <div
      ref={ref}
      className={`
        relative overflow-hidden rounded-2xl p-5 flex flex-col justify-between min-h-[160px]
        group transition-all duration-500 cursor-default
        ${isWinner
          ? 'border-2 shadow-lg'
          : 'border border-border-subtle hover:border-opacity-40'
        }
      `}
      style={{
        background: isWinner
          ? `linear-gradient(135deg, ${color}10 0%, ${color}05 50%, transparent 100%)`
          : undefined,
        borderColor: isWinner ? `${color}60` : undefined,
        boxShadow: isWinner ? `0 8px 32px ${color}15, inset 0 1px 0 ${color}20` : undefined,
      }}
    >
      {/* Background gradient glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 rounded-2xl"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}10 0%, transparent 70%)` }}
      />

      {/* Winner crown shimmer */}
      {isWinner && (
        <div
          className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`, animation: 'pulse 3s ease-in-out infinite' }}
        />
      )}

      {/* Score label row */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2.5">
          <div
            className="w-3 h-3 rounded-full relative"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 12px ${color}80`,
            }}
          >
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{ backgroundColor: color, opacity: 0.3 }}
            />
          </div>
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.14em]">
            {color === '#4d8eff' ? 'BLUE' : 'GREEN'} CORNER
          </span>
        </div>
        {isWinner && (
          <span
            className="text-[8px] font-black uppercase tracking-[0.18em] px-2 py-0.5 rounded-md"
            style={{
              color: color,
              backgroundColor: `${color}15`,
              border: `1px solid ${color}30`,
            }}
          >
            LEADING
          </span>
        )}
      </div>

      {/* Model name */}
      <div className="relative z-10 mt-2">
        <span className="text-[11px] font-semibold text-text-muted tracking-wide">
          {modelName}
        </span>
      </div>

      {/* Big score */}
      <div className="relative z-10 -mt-1">
        <div
          className="text-6xl font-black leading-none font-mono transition-all duration-500"
          style={{
            color: isWinner ? color : 'var(--color-text-primary)',
            textShadow: isWinner ? `0 0 40px ${color}30` : 'none',
          }}
        >
          {displayScore}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between relative z-10">
        <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-text-muted">
          SCORE
        </span>
        <span className="text-[11px] font-mono font-bold text-text-muted">
          /10
        </span>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-1000 ease-out"
        style={{
          width: revealed ? `${(score / 10) * 100}%` : '0%',
          background: `linear-gradient(90deg, ${color}, ${color}60)`,
          boxShadow: `0 0 8px ${color}40`,
        }}
      />
    </div>
  )
}

export default function JudgeVerdict({ judge, winner, solution1, solution2, model1Name = 'Model A', model2Name = 'Model B' }) {
  if (!judge) return null
  const winnerName = winner === 'solution_1' ? model1Name : winner === 'solution_2' ? model2Name : 'Draw'
  const isDraw = winner === 'draw'
  const winnerAnswer = isDraw ? null : winner === 'solution_1' ? solution1 : solution2
  const isModel1Winner = winner === 'solution_1'
  const isModel2Winner = winner === 'solution_2'

  return (
    <div
      className="relative overflow-hidden rounded-2xl transition-all duration-500"
      style={{
        background: 'linear-gradient(135deg, var(--color-card-bg) 0%, var(--color-card-bg) 100%)',
        border: '1px solid var(--color-border-subtle)',
        boxShadow: '0 25px 60px -12px rgba(0,0,0,0.4), 0 0 0 1px var(--color-border-subtle)',
      }}
    >
      {/* Top gold accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-80" />

      {/* Ambient background gradients */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-amber-500/[0.025] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/2 h-40 bg-gradient-to-tl from-amber-500/[0.015] to-transparent pointer-events-none" />

      {/* Header */}
      <div className="px-7 pt-6 pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/15 to-amber-600/5 border border-amber-500/25 flex items-center justify-center backdrop-blur-sm">
              <span className="material-symbols-outlined text-amber-400 text-[17px]">gavel</span>
            </div>
            <div>
              <h3 className="font-extrabold text-[11px] tracking-[0.16em] uppercase text-amber-400 font-mono">
                Judge's Verdict
              </h3>
              <p className="text-[9px] font-mono tracking-wider text-text-muted mt-0.5">AI-powered evaluation</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" />
            <span className="text-[9px] font-mono font-bold tracking-[0.15em] text-amber-400/80 bg-amber-500/8 border border-amber-500/15 px-3 py-1 rounded-lg uppercase backdrop-blur-sm">
              EVALUATOR ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-7 py-5">
        <div className="flex flex-col lg:flex-row gap-5 items-stretch">

          {/* Score Boxes */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            <AnimatedScore
              score={judge.solution_1_score}
              color="#4d8eff"
              isWinner={isModel1Winner}
              modelName={model1Name}
            />
            <AnimatedScore
              score={judge.solution_2_score}
              color="#34d399"
              isWinner={isModel2Winner}
              modelName={model2Name}
            />
          </div>

          {/* Winner Explanation */}
          <div
            className="flex-1 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden transition-all duration-500"
            style={{
              background: 'var(--color-void, rgba(0,0,0,0.3))',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            {/* Gradient glow behind winner */}
            {!isDraw && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
                style={{
                  background: isModel1Winner
                    ? 'radial-gradient(ellipse at 30% 50%, rgba(77,142,255,0.06) 0%, transparent 60%)'
                    : 'radial-gradient(ellipse at 70% 50%, rgba(52,211,153,0.06) 0%, transparent 60%)',
                }}
              />
            )}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.02) 0%, transparent 50%)' }}
            />

            {/* Winner header */}
            <div className="flex items-center gap-3 mb-5 relative z-10">
              {!isDraw ? (
                <>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/25 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-amber-500/10">
                    <span className="material-symbols-outlined text-amber-400 text-[18px]">emoji_events</span>
                  </div>
                  <div>
                    <h4
                      className="text-sm font-extrabold uppercase tracking-wider font-sans"
                      style={{
                        color: isModel1Winner ? '#4d8eff' : '#34d399',
                        textShadow: `0 0 30px ${isModel1Winner ? 'rgba(77,142,255,0.2)' : 'rgba(52,211,153,0.2)'}`,
                      }}
                    >
                      {winnerName} Wins.
                    </h4>
                    <p className="text-[9px] font-mono text-text-muted tracking-wider mt-0.5">
                      BY {Math.abs(judge.solution_1_score - judge.solution_2_score).toFixed(1)} POINTS
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/15 to-amber-600/5 border border-amber-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-amber-400 text-[18px]">balance</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider font-sans">
                    It's a Draw!
                  </h4>
                </>
              )}
            </div>

            {/* Explanation text */}
            <p className="text-[13px] text-text-secondary leading-[1.8] font-sans relative z-10">
              {isDraw
                ? "Both solutions performed equally well, displaying comparable algorithmic execution, readability, and score results."
                : winner === 'solution_1'
                  ? judge.solution_1_response
                  : judge.solution_2_response
              }
            </p>

            {/* Score difference badge */}
            {!isDraw && (
              <div className="mt-4 relative z-10">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-sm"
                  style={{
                    background: `${isModel1Winner ? '#4d8eff' : '#34d399'}08`,
                    border: `1px solid ${isModel1Winner ? '#4d8eff' : '#34d399'}15`,
                  }}
                >
                  <span className="material-symbols-outlined text-[12px]" style={{ color: isModel1Winner ? '#4d8eff' : '#34d399' }}>
                    trending_up
                  </span>
                  <span className="text-[9px] font-mono font-bold tracking-wider text-text-muted">
                    MARGIN: {Math.abs(judge.solution_1_score - judge.solution_2_score).toFixed(1)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Winner's Answer */}
      {winnerAnswer && (
        <div className="px-7 pb-6">
          <div
            className="rounded-2xl overflow-hidden transition-all duration-500"
            style={{
              border: `1px solid ${isModel1Winner ? 'rgba(77,142,255,0.15)' : 'rgba(52,211,153,0.15)'}`,
            }}
          >
            {/* Winner answer header */}
            <div
              className="px-5 py-3 flex items-center gap-2.5"
              style={{
                background: `linear-gradient(90deg, ${isModel1Winner ? 'rgba(77,142,255,0.06)' : 'rgba(52,211,153,0.06)'} 0%, transparent 100%)`,
                borderBottom: `1px solid ${isModel1Winner ? 'rgba(77,142,255,0.1)' : 'rgba(52,211,153,0.1)'}`,
              }}
            >
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{
                  background: `${isModel1Winner ? '#4d8eff' : '#34d399'}15`,
                  border: `1px solid ${isModel1Winner ? '#4d8eff' : '#34d399'}25`,
                }}
              >
                <span
                  className="material-symbols-outlined text-[14px]"
                  style={{ color: isModel1Winner ? '#4d8eff' : '#34d399' }}
                >
                  check_circle
                </span>
              </div>
              <h4
                className="text-[10px] font-bold font-mono uppercase tracking-[0.15em]"
                style={{ color: isModel1Winner ? '#4d8eff' : '#34d399' }}
              >
                {winnerName}'s Winning Answer
              </h4>
            </div>

            {/* Answer content */}
            <div
              className="px-5 py-4 font-mono text-[12px] leading-[1.85] text-text-secondary whitespace-pre-wrap"
              style={{ background: 'var(--color-void, rgba(0,0,0,0.2))' }}
            >
              {winnerAnswer}
            </div>
          </div>
        </div>
      )}

      {/* Subtle bottom edge glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
    </div>
  )
}
