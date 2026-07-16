import { useState, useEffect } from 'react'

export default function History({ onLoadChallenge }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [historyItems, setHistoryItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch('http://localhost:3000/history')
        if (!res.ok) {
          throw new Error('Failed to fetch history')
        }
        const data = await res.json()
        
        // Map database records to the component items structure
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

          // Detect potential language keywords from the prompt to make tag badges dynamic
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
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchHistory()
  }, [])

  const filteredItems = historyItems.filter(item => 
    item.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 anim-fade-up">
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <span className="material-symbols-outlined text-text-muted text-lg absolute left-3.5 top-3">search</span>
          <input
            type="text"
            className="w-full bg-card-bg border border-border-medium rounded-xl py-2.5 px-10 text-[13px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all"
            placeholder="Search past comparisons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <span className="text-[10px] text-text-muted font-mono self-end sm:self-center tracking-wider">
          Showing {filteredItems.length} records
        </span>
      </div>

      {/* History List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-16 bg-card-bg border border-border-subtle rounded-2xl">
            <div className="w-8 h-8 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin mx-auto mb-3" />
            <p className="text-[13px] text-text-muted font-mono">Loading history from database...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-card-bg border border-red-500/15 text-red-400 rounded-2xl">
            <span className="material-symbols-outlined text-red-400 text-4xl mb-3 block">error</span>
            <p className="text-[13px] font-mono">Failed to load history: {error}</p>
          </div>
        ) : (
          filteredItems.map((item, i) => (
            <div 
              key={item.id}
              className={`bg-card-bg border border-border-subtle hover:border-purple-500/15 p-5 rounded-2xl flex flex-col md:flex-row justify-between gap-4 transition-all duration-300 relative group overflow-hidden premium-card anim-fade-up stagger-${i + 1}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 bg-gradient-to-r from-purple-500/[0.03] via-transparent to-cyan-500/[0.02]" />

              <div className="space-y-3 flex-1 relative z-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[9px] font-mono text-text-muted uppercase tracking-[0.12em]">{item.timestamp}</span>
                  <div className="flex gap-1.5">
                    {item.languages.map((lang, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/15 rounded-lg font-mono text-[8px] uppercase tracking-wider font-bold"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                <h4 className="font-bold text-[13px] text-text-primary leading-normal group-hover:text-purple-400 transition-colors">
                  {item.prompt}
                </h4>
              </div>

              <div className="flex flex-wrap items-center gap-5 justify-between md:justify-end relative z-10">
                <div className="flex items-center gap-4 text-center">
                  <div>
                    <span className="text-[8px] font-mono font-bold text-text-muted block mb-1 uppercase tracking-[0.12em]">WINNER</span>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg font-mono ${
                      item.winner === 'Draw' 
                        ? 'bg-white/[0.03] text-text-muted border border-border-subtle' 
                        : item.winner === (item.data.model_1 || 'Model A')
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/15'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15'
                    }`}>
                      {item.winner}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono font-bold text-text-muted block mb-1 uppercase tracking-[0.12em]">SCORE</span>
                    <span className="text-[13px] font-bold text-text-primary font-mono">{item.winnerScore} vs {item.loserScore}</span>
                  </div>
                </div>

                <button
                  onClick={() => onLoadChallenge && onLoadChallenge(item.prompt, item.data)}
                  className="py-2 px-4 bg-purple-600/10 text-purple-400 border border-purple-500/15 hover:bg-purple-600 hover:text-white rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 active:scale-95 shadow-sm shadow-purple-500/5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">input</span>
                  <span>Load in Arena</span>
                </button>
              </div>
            </div>
          ))
        )}
        {!isLoading && !error && filteredItems.length === 0 && (
          <div className="text-center py-16 bg-card-bg border border-border-subtle rounded-2xl">
            <span className="material-symbols-outlined text-text-muted/30 text-5xl mb-3 block">folder_open</span>
            <p className="text-[13px] text-text-muted font-mono">No matching records found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
