import { useState, useEffect } from 'react'

export default function Leaderboard() {
  const [models, setModels] = useState([])
  const [stats, setStats] = useState({ totalMatches: 0, activeCompetitors: 0, averageRating: 1000 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard')
      if (!res.ok) throw new Error('Failed to fetch leaderboard')
      const data = await res.json()
      setModels(data.models || [])
      setStats(data.stats || { totalMatches: 0, activeCompetitors: 0, averageRating: 1000 })
    } catch (err) {
      console.error(err)
      if (err.message === 'Failed to fetch') {
        setError('Cannot connect to server')
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { label: 'TOTAL MATCHES', value: stats.totalMatches.toLocaleString(), icon: 'swords', gradient: 'from-purple-600/20 via-purple-500/10 to-transparent', border: 'border-purple-500/20', glow: 'shadow-purple-500/10', iconBg: 'bg-purple-500/15 border-purple-500/25', iconColor: 'text-purple-400' },
    { label: 'ACTIVE COMPETITORS', value: `${stats.activeCompetitors} Models`, icon: 'smart_toy', gradient: 'from-emerald-600/20 via-emerald-500/10 to-transparent', border: 'border-emerald-500/20', glow: 'shadow-emerald-500/10', iconBg: 'bg-emerald-500/15 border-emerald-500/25', iconColor: 'text-emerald-400' },
    { label: 'AVERAGE RATING', value: `${stats.averageRating} Elo`, icon: 'leaderboard', gradient: 'from-amber-600/20 via-amber-500/10 to-transparent', border: 'border-amber-500/20', glow: 'shadow-amber-500/10', iconBg: 'bg-amber-500/15 border-amber-500/25', iconColor: 'text-amber-400' },
  ]

  const getRankClass = (rank) => {
    if (rank === 1) return 'rank-1'
    if (rank === 2) return 'rank-2'
    if (rank === 3) return 'rank-3'
    return ''
  }

  const getRankStyle = (rank) => {
    if (rank === 1) return { background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.5))' }
    if (rank === 2) return { background: 'linear-gradient(135deg, #94a3b8, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 6px rgba(148,163,184,0.4))' }
    if (rank === 3) return { background: 'linear-gradient(135deg, #d97706, #b45309)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 6px rgba(217,119,6,0.4))' }
    return {}
  }

  const getWinRateGradient = (winRate) => {
    if (winRate >= 70) return 'from-emerald-400 via-cyan-400 to-emerald-300'
    if (winRate >= 50) return 'from-purple-500 via-cyan-400 to-blue-400'
    if (winRate >= 30) return 'from-amber-500 via-orange-400 to-amber-400'
    return 'from-red-500 via-red-400 to-orange-400'
  }

  const getRowHighlight = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-amber-500/[0.04] via-amber-500/[0.02] to-transparent border-l-2 border-amber-500/40'
    if (rank === 2) return 'bg-gradient-to-r from-slate-400/[0.03] via-slate-400/[0.015] to-transparent border-l-2 border-slate-400/30'
    if (rank === 3) return 'bg-gradient-to-r from-orange-600/[0.03] via-orange-600/[0.015] to-transparent border-l-2 border-orange-600/30'
    return ''
  }

  if (loading) {
    return (
      <div className="text-center py-20 bg-card-bg border border-border-subtle rounded-2xl">
        <div className="relative inline-block mb-5">
          <div className="w-12 h-12 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
          <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-cyan-500/10 border-b-cyan-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
        <p className="text-[13px] text-text-muted font-mono tracking-wide">Loading leaderboard data...</p>
        <div className="mt-4 flex justify-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500/40 animate-pulse" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500/40 animate-pulse" style={{ animationDelay: '200ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500/40 animate-pulse" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-card-bg border border-red-500/20 text-red-400 rounded-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none" />
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-red-400 text-3xl">cloud_off</span>
          </div>
          <p className="text-sm font-bold text-red-400 mb-1">Connection Failed</p>
          <p className="text-[12px] font-mono text-red-400/70">{error}</p>
          <button
            onClick={() => { setError(null); setLoading(true); fetchLeaderboard() }}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-bold font-mono uppercase tracking-wider hover:bg-red-500/20 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 anim-fade-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((stat, i) => (
          <div
            key={stat.label}
            className={`relative bg-card-bg border ${stat.border} p-5 rounded-2xl flex items-center justify-between shadow-lg ${stat.glow} premium-card anim-fade-up stagger-${i + 1} overflow-hidden group hover:shadow-xl transition-shadow duration-300`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
            <div className="relative z-10">
              <p className="text-[9px] font-mono text-text-muted uppercase tracking-[0.15em] block mb-1.5">{stat.label}</p>
              <h3 className="text-2xl font-black text-text-primary font-mono">{stat.value}</h3>
            </div>
            <div className={`relative z-10 w-12 h-12 rounded-2xl ${stat.iconBg} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <span className={`material-symbols-outlined ${stat.iconColor} text-xl`}>{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card-bg border border-border-subtle rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-border-subtle flex items-center justify-between bg-gradient-to-r from-card-bg via-card-bg to-purple-500/[0.03]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-amber-500 text-[16px]">military_tech</span>
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-text-primary tracking-tight">Model Standings</h3>
              <p className="text-[9px] font-mono text-text-muted uppercase tracking-wider">{models.length} competitor{models.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/15 px-2.5 py-1 rounded-lg uppercase font-bold tracking-[0.12em] inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            LIVE DATA
          </span>
        </div>

        {models.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-border-subtle flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-text-muted/20 text-4xl">leaderboard</span>
            </div>
            <p className="text-[13px] text-text-muted font-mono">No battles recorded yet.</p>
            <p className="text-[11px] text-text-muted mt-1">Start a battle to see model rankings.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-subtle bg-card-header/30 text-text-muted font-mono text-[10px] uppercase tracking-[0.12em]">
                  <th className="py-3.5 px-5 text-center w-16">Rank</th>
                  <th className="py-3.5 px-5">Model</th>
                  <th className="py-3.5 px-5">Creator</th>
                  <th className="py-3.5 px-5 text-center">Elo Rating</th>
                  <th className="py-3.5 px-5 text-center">Matches</th>
                  <th className="py-3.5 px-5">Win Rate</th>
                  <th className="py-3.5 px-5 text-center">Avg Score</th>
                  <th className="py-3.5 px-5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {models.map((model) => (
                  <tr
                    key={model.rank}
                    className={`transition-all duration-200 group hover:bg-purple-500/[0.03] hover:backdrop-blur-sm ${getRowHighlight(model.rank)}`}
                  >
                    <td className="py-3.5 px-5 text-center">
                      {model.badge ? (
                        <span className="text-base">{model.badge}</span>
                      ) : (
                        <span
                          className={`font-mono font-black text-sm ${getRankClass(model.rank)}`}
                          style={getRankStyle(model.rank)}
                        >
                          #{model.rank}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-text-primary text-[13px] group-hover:text-purple-400 transition-colors duration-200">
                      <div className="flex items-center gap-2">
                        {model.rank <= 3 && (
                          <span className="material-symbols-outlined text-sm opacity-40 group-hover:opacity-70 transition-opacity">emoji_events</span>
                        )}
                        {model.name}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-text-muted text-[11px] font-mono">
                      {model.provider}
                    </td>
                    <td className="py-3.5 px-5 text-center font-mono text-sm font-bold">
                      <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{model.elo}</span>
                    </td>
                    <td className="py-3.5 px-5 text-center font-mono text-[11px] text-text-muted">
                      {model.matches}
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[11px] text-text-secondary w-10">{model.winRate}%</span>
                        <div className="flex-1 max-w-[90px] h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${getWinRateGradient(model.winRate)} transition-all duration-1000 ease-out`}
                            style={{ width: `${model.winRate}%`, boxShadow: `0 0 6px rgba(168,85,247,0.3)` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-center font-mono text-sm font-bold text-amber-500">
                      {model.avgScore}
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/15 px-2.5 py-1 rounded-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {model.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
