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
    { label: 'TOTAL MATCHES', value: stats.totalMatches.toLocaleString(), icon: 'swords', color: 'purple' },
    { label: 'ACTIVE COMPETITORS', value: `${stats.activeCompetitors} Models`, icon: 'smart_toy', color: 'emerald' },
    { label: 'AVERAGE RATING', value: `${stats.averageRating} Elo`, icon: 'leaderboard', color: 'amber' },
  ]

  if (loading) {
    return (
      <div className="text-center py-16 bg-card-bg border border-border-subtle rounded-2xl">
        <div className="w-8 h-8 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin mx-auto mb-3" />
        <p className="text-[13px] text-text-muted font-mono">Loading leaderboard data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16 bg-card-bg border border-red-500/15 text-red-400 rounded-2xl">
        <span className="material-symbols-outlined text-red-400 text-4xl mb-3 block">error</span>
        <p className="text-[13px] font-mono">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 anim-fade-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((stat, i) => (
          <div key={stat.label} className={`bg-card-bg border border-border-subtle p-5 rounded-2xl flex items-center justify-between shadow-lg premium-card anim-fade-up stagger-${i + 1}`}>
            <div>
              <p className="text-[9px] font-mono text-text-muted uppercase tracking-[0.15em] block mb-1.5">{stat.label}</p>
              <h3 className="text-2xl font-black text-text-primary font-mono">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-500/10 border border-${stat.color}-500/15 flex items-center justify-center`}>
              <span className={`material-symbols-outlined text-${stat.color}-400 text-xl`}>{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card-bg border border-border-subtle rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-border-subtle flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-amber-500 text-[16px]">military_tech</span>
            </div>
            <h3 className="text-sm font-extrabold text-text-primary tracking-tight">Model Standings</h3>
          </div>
          <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/15 px-2.5 py-1 rounded-lg uppercase font-bold tracking-[0.12em]">
            LIVE DATA
          </span>
        </div>

        {models.length === 0 ? (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-text-muted/30 text-5xl mb-3 block">leaderboard</span>
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
                    className={`hover:bg-white/[0.015] transition-colors group ${model.rank === 1 ? 'bg-amber-500/[0.015]' : ''
                      }`}
                  >
                    <td className="py-3.5 px-5 text-center font-mono font-bold text-sm text-text-secondary">
                      {model.badge ? <span className="text-base">{model.badge}</span> : `#${model.rank}`}
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-text-primary text-[13px] group-hover:text-purple-400 transition-colors">
                      {model.name}
                    </td>
                    <td className="py-3.5 px-5 text-text-muted text-[11px] font-mono">
                      {model.provider}
                    </td>
                    <td className="py-3.5 px-5 text-center font-mono text-sm text-blue-400 font-bold">
                      {model.elo}
                    </td>
                    <td className="py-3.5 px-5 text-center font-mono text-[11px] text-text-muted">
                      {model.matches}
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[11px] text-text-secondary w-10">{model.winRate}%</span>
                        <div className="flex-1 max-w-[90px] h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-1000"
                            style={{ width: `${model.winRate}%` }}
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
