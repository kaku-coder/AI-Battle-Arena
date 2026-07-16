export default function Leaderboard() {
  const models = [
    { rank: 1, name: 'Claude 3.5 Sonnet', provider: 'Anthropic', elo: 1254, matches: 218, winRate: 68, avgScore: 8.9, status: 'Active', badge: '🏆' },
    { rank: 2, name: 'GPT-4o', provider: 'OpenAI', elo: 1218, matches: 245, winRate: 61, avgScore: 8.5, status: 'Active', badge: '🥈' },
    { rank: 3, name: 'Gemini 1.5 Pro', provider: 'Google', elo: 1195, matches: 198, winRate: 57, avgScore: 8.2, status: 'Active', badge: '🥉' },
    { rank: 4, name: 'Llama 3.1 405B', provider: 'Meta', elo: 1142, matches: 154, winRate: 50, avgScore: 7.6, status: 'Active', badge: '' },
    { rank: 5, name: 'Mistral Large 2', provider: 'Mistral', elo: 1088, matches: 167, winRate: 43, avgScore: 7.1, status: 'Active', badge: '' },
    { rank: 6, name: 'Cohere Command R+', provider: 'Cohere', elo: 1056, matches: 132, winRate: 38, avgScore: 6.8, status: 'Active', badge: '' },
  ]

  const stats = [
    { label: 'TOTAL MATCHES', value: '1,114', icon: 'swords', color: 'purple' },
    { label: 'ACTIVE COMPETITORS', value: '6 Models', icon: 'smart_toy', color: 'emerald' },
    { label: 'AVERAGE RATING', value: '1158 Elo', icon: 'leaderboard', color: 'amber' },
  ]

  return (
    <div className="space-y-6 anim-fade-up">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
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

      {/* Table Card */}
      <div className="bg-card-bg border border-border-subtle rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-border-subtle flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-amber-500 text-[16px]">military_tech</span>
            </div>
            <h3 className="text-sm font-extrabold text-text-primary tracking-tight">Model Standings</h3>
          </div>
          <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/15 px-2.5 py-1 rounded-lg uppercase font-bold tracking-[0.12em]">
            LIVE UPDATED
          </span>
        </div>
        
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
                  className={`hover:bg-white/[0.015] transition-colors group ${
                    model.rank === 1 ? 'bg-amber-500/[0.015]' : ''
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
      </div>
    </div>
  )
}
