import { useState } from 'react'

export default function History({ onLoadChallenge }) {
  const [searchQuery, setSearchQuery] = useState('')

  const historyItems = [
    {
      id: '1',
      prompt: 'Write a factorial function in javascript',
      winner: 'Model A',
      winnerScore: 10,
      loserScore: 8,
      timestamp: '2 hours ago',
      languages: ['Javascript'],
      data: {
        solution_1: `function factorialIterative(n) {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}`,
        solution_2: `function factorialIterative(n) {
    if (n < 0) return undefined;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}`,
        winner: 'solution_1',
        judge: {
          solution_1_score: 10,
          solution_2_score: 8,
          solution_1_response: 'Solution 1 is excellent because it provides three different ways to solve the problem: iterative, recursive, and using BigInt. The BigInt implementation is particularly important because factorial results quickly exceed the Number.MAX_SAFE_INTEGER (starting from 21!). Additionally, it uses proper error handling by throwing an Error for negative inputs, and its iterative loop starts at 2, which is a tiny optimization over starting at 1.',
          solution_2_response: 'Solution 2 is solid and provides the standard iterative approach. However, it lacks support for large integers (BigInt), which means it fails for values greater than 18-20. Returning "undefined" for negative inputs is less descriptive than throwing an error for an invalid mathematical domain.'
        }
      }
    },
    {
      id: '2',
      prompt: 'Design a scalable microservices architecture for a real-time multiplayer game matching service...',
      winner: 'Model B',
      winnerScore: 9.5,
      loserScore: 8,
      timestamp: '5 hours ago',
      languages: ['Go', 'YAML'],
      data: {
        solution_1: `To build a scalable microservices architecture for real-time game matchmaking, we need to focus on low latency and high concurrency. I recommend a combination of Redis for fast caching of player states and Kafka for event streaming between services...`,
        solution_2: `Designing a resilient matchmaking system requires addressing network partitioning and state synchronization immediately. Here is a production-ready architectural breakdown utilizing Kubernetes, dedicated game servers (Agones), and Redis Pub/Sub...`,
        winner: 'solution_2',
        judge: {
          solution_1_score: 8,
          solution_2_score: 9.5,
          solution_1_response: 'Gemini 1.5 Pro provided a solid conceptual overview, highlighting Redis caching and Kafka streaming. However, it lacked deep code examples or integration patterns.',
          solution_2_response: 'Claude 3.5 Sonnet provided a highly practical and production-ready solution, including Redis Pub/Sub state locks and deployment structure.'
        }
      }
    },
    {
      id: '3',
      prompt: 'Optimize SQL query for hierarchical parent-child indexing',
      winner: 'Draw',
      winnerScore: 9,
      loserScore: 9,
      timestamp: '1 day ago',
      languages: ['SQL'],
      data: {
        solution_1: `WITH RECURSIVE org_chart AS (
  SELECT id, parent_id, name, 1 as level
  FROM employees WHERE parent_id IS NULL
  UNION ALL
  SELECT e.id, e.parent_id, e.name, o.level + 1
  FROM employees e INNER JOIN org_chart o ON e.parent_id = o.id
)
SELECT * FROM org_chart;`,
        solution_2: `SELECT e.id, e.parent_id, e.name, 
       (SELECT COUNT(*) FROM employees WHERE parent_id = e.id) as children_count
FROM employees e;`,
        winner: 'draw',
        judge: {
          solution_1_score: 9,
          solution_2_score: 9,
          solution_1_response: 'Solution 1 correctly uses recursive CTE which is the SQL standard for processing hierarchy paths.',
          solution_2_response: 'Solution 2 provides an optimized indexing pattern for children counting but recursive pathing is more generic.'
        }
      }
    }
  ]

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
        {filteredItems.map((item, i) => (
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
                      : item.winner === 'Model A'
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
        ))}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-card-bg border border-border-subtle rounded-2xl">
            <span className="material-symbols-outlined text-text-muted/30 text-5xl mb-3 block">folder_open</span>
            <p className="text-[13px] text-text-muted font-mono">No matching records found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
