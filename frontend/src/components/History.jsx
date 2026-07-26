import { useState, useEffect } from 'react'

const LANG_STYLES = {
  JavaScript: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20', dot: 'bg-yellow-400' },
  Python:     { bg: 'bg-blue-500/10',  text: 'text-blue-400',  border: 'border-blue-500/20',  dot: 'bg-blue-400' },
  SQL:        { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20', dot: 'bg-orange-400' },
  Web:        { bg: 'bg-pink-500/10',  text: 'text-pink-400',  border: 'border-pink-500/20',  dot: 'bg-pink-400' },
  'Arena Duel': { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20', dot: 'bg-violet-400' },
}

function getLangStyle(lang) {
  return LANG_STYLES[lang] || LANG_STYLES['Arena Duel']
}

export default function History({ onLoadChallenge }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [historyItems, setHistoryItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch('/history')
        if (!res.ok) throw new Error('Failed to fetch history')
        const data = await res.json()

        const items = data.map((item) => {
          const m1 = item.model_1 || 'Model A'
          const m2 = item.model_2 || 'Model B'

          let winnerLabel = 'Draw'
          if (item.winner === 'solution_1') winnerLabel = m1
          else if (item.winner === 'solution_2') winnerLabel = m2

          const score1 = item.judge?.solution_1_score ?? 0
          const score2 = item.judge?.solution_2_score ?? 0

          let winnerScore = score1
          let loserScore = score2
          if (item.winner === 'solution_2') {
            winnerScore = score2
            loserScore = score1
          }

          const date = new Date(item.createdAt)
          const timestamp = isNaN(date.getTime())
            ? 'Just now'
            : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' ' + date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })

          const detectedLangs = []
          const promptLower = item.problem.toLowerCase()
          if (promptLower.includes('javascript') || promptLower.includes(' js ') || promptLower.includes('react')) detectedLangs.push('JavaScript')
          if (promptLower.includes('python')) detectedLangs.push('Python')
          if (promptLower.includes('sql') || promptLower.includes('database')) detectedLangs.push('SQL')
          if (promptLower.includes('css') || promptLower.includes('html')) detectedLangs.push('Web')
          if (detectedLangs.length === 0) detectedLangs.push('Arena Duel')

          return {
            id: item._id,
            prompt: item.problem,
            winner: winnerLabel,
            winnerScore,
            loserScore,
            timestamp,
            languages: detectedLangs,
            data: item
          }
        })

        setHistoryItems(items)
      } catch (err) {
        console.error('Error fetching history:', err)
        if (err.message === 'Failed to fetch') {
          setError('Cannot connect to server')
        } else {
          setError(err.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const filteredItems = historyItems.filter(item =>
    item.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const isEmpty = !isLoading && !error && filteredItems.length === 0
  const hasRecords = !isLoading && !error && filteredItems.length > 0

  return (
    <div className="space-y-6 anim-fade-up">

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-lg group/search">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 via-violet-500/10 to-cyan-500/20 rounded-2xl opacity-0 group-focus-within/search:opacity-100 blur-sm transition-opacity duration-500" />
          <div className="relative flex items-center bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] group-focus-within/search:border-purple-500/30 rounded-2xl transition-all duration-300">
            <span className="material-symbols-outlined text-purple-400/60 group-focus-within/search:text-purple-400 text-lg ml-4 transition-colors duration-300">search</span>
            <input
              type="text"
              className="w-full bg-transparent py-3 px-3 text-[13px] text-text-primary placeholder:text-text-muted/50 focus:outline-none font-mono"
              placeholder="Search past comparisons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mr-3 p-1 rounded-lg hover:bg-white/10 text-text-muted hover:text-text-primary transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>
        </div>
        <span className="text-[10px] text-text-muted/60 font-mono self-end sm:self-center tracking-wider uppercase">
          {filteredItems.length} record{filteredItems.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-20 bg-gradient-to-b from-card-bg to-card-bg/50 border border-border-subtle rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.02] via-transparent to-cyan-500/[0.02]" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl border-2 border-purple-500/20 border-t-purple-500 animate-spin mx-auto mb-4" />
              <p className="text-[13px] text-text-muted font-mono">Loading history...</p>
              <p className="text-[10px] text-text-muted/40 font-mono mt-1">Fetching arena battles</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-gradient-to-b from-card-bg to-red-500/[0.02] border border-red-500/15 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/[0.03] via-transparent to-transparent" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/15 flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-red-400 text-2xl">cloud_off</span>
              </div>
              <p className="text-[13px] text-red-400 font-mono font-medium">{error}</p>
              <p className="text-[10px] text-text-muted/40 font-mono mt-2">Check your connection and try again</p>
            </div>
          </div>
        ) : (
          filteredItems.map((item, i) => (
            <div
              key={item.id}
              className="group/card relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1 anim-fade-up stagger-${i + 1}"
            >
              <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-600/0 via-violet-500/0 to-cyan-600/0 group-hover/card:from-purple-600/20 group-hover/card:via-violet-500/10 group-hover/card:to-cyan-600/15 rounded-[25px] transition-all duration-700" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/[0.03] to-cyan-500/[0.02] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-card-bg border border-border-subtle group-hover/card:border-purple-500/20 rounded-3xl p-5 md:p-6 flex flex-col md:flex-row justify-between gap-4 transition-all duration-500">

                <div className="space-y-3 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[9px] font-mono text-text-muted/50 uppercase tracking-[0.15em]">{item.timestamp}</span>
                    <div className="w-px h-3 bg-border-subtle" />
                    <div className="flex gap-1.5">
                      {item.languages.map((lang, index) => {
                        const style = getLangStyle(lang)
                        return (
                          <span
                            key={index}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${style.bg} ${style.text} border ${style.border} rounded-lg font-mono text-[8px] uppercase tracking-wider font-bold`}
                          >
                            <span className={`w-1 h-1 rounded-full ${style.dot}`} />
                            {lang}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  <h4 className="font-bold text-[13px] text-text-primary leading-relaxed group-hover/card:text-purple-300/90 transition-colors duration-300 line-clamp-2">
                    {item.prompt}
                  </h4>
                </div>

                <div className="flex flex-wrap items-center gap-4 justify-between md:justify-end shrink-0">
                  <div className="flex items-center gap-5">
                    <div className="text-center">
                      <span className="text-[7px] font-mono font-bold text-text-muted/50 block mb-1.5 uppercase tracking-[0.15em]">Winner</span>
                      <span className={`text-[11px] font-bold px-3 py-1.5 rounded-xl font-mono inline-block ${item.winner === 'Draw'
                        ? 'bg-white/[0.03] text-text-muted border border-border-subtle'
                        : item.winner === (item.data.model_1 || 'Model A')
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5'
                      }`}>
                        {item.winner}
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[7px] font-mono font-bold text-text-muted/50 block mb-1.5 uppercase tracking-[0.15em]">Score</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[12px] font-bold font-mono ${item.winnerScore > item.loserScore ? 'text-emerald-400' : item.winnerScore < item.loserScore ? 'text-red-400' : 'text-text-primary'}`}>
                          {item.winnerScore}
                        </span>
                        <span className="text-[9px] text-text-muted/30 font-mono">vs</span>
                        <span className={`text-[12px] font-bold font-mono ${item.loserScore > item.winnerScore ? 'text-emerald-400' : item.loserScore < item.winnerScore ? 'text-red-400' : 'text-text-primary'}`}>
                          {item.loserScore}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onLoadChallenge && onLoadChallenge(item.prompt, item.data)}
                    className="group/btn relative overflow-hidden py-2.5 px-5 bg-purple-600/10 text-purple-400 border border-purple-500/15 hover:bg-purple-600 hover:text-white hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 rounded-xl text-[11px] font-bold transition-all duration-300 flex items-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px] transition-transform duration-300 group-hover/btn:rotate-[-15deg] group-hover/btn:scale-110">input</span>
                    <span>Load in Arena</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        {isEmpty && (
          <div className="text-center py-20 bg-gradient-to-b from-card-bg to-card-bg/50 border border-border-subtle rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.02] via-transparent to-cyan-500/[0.02]" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-border-subtle flex items-center justify-center mx-auto mb-5">
                <span className="material-symbols-outlined text-text-muted/20 text-4xl">shield</span>
              </div>
              <p className="text-[13px] text-text-muted/70 font-mono font-medium">No battles yet</p>
              <p className="text-[10px] text-text-muted/30 font-mono mt-2">Your arena history will appear here</p>
            </div>
          </div>
        )}

        {!isLoading && !error && historyItems.length > 0 && filteredItems.length === 0 && searchQuery && (
          <div className="text-center py-20 bg-gradient-to-b from-card-bg to-card-bg/50 border border-border-subtle rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.02] via-transparent to-cyan-500/[0.02]" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-border-subtle flex items-center justify-center mx-auto mb-5">
                <span className="material-symbols-outlined text-text-muted/20 text-4xl">search_off</span>
              </div>
              <p className="text-[13px] text-text-muted/70 font-mono font-medium">No matches for "{searchQuery}"</p>
              <p className="text-[10px] text-text-muted/30 font-mono mt-2">Try a different search term</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
