import React, { useState, useRef } from 'react'
import Sidebar from './components/Sidebar'
import SolutionCard from './components/SolutionCard'
import JudgeVerdict from './components/JudgeVerdict'
import './App.css'

// ==========================================
// MAIN APPLICATION CONTAINER
// ==========================================
export default function App() {
  const [problem, setProblem] = useState('')
  
  // No active challenge by default, so it starts on standby
  const [activeChallenge, setActiveChallenge] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // No result by default
  const [result, setResult] = useState(null)
  
  const [error, setError] = useState(null)
  
  // Start with a clean conversational welcome feed
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Welcome to AI Battle Arena! Send any programming problem and watch two AI models compete to solve it.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])

  const textareaRef = useRef(null)

  const handleBattle = async () => {
    const trimmed = problem.trim()
    if (!trimmed || isLoading) return

    setError(null)
    setResult(null) // Crucial: clear old/dummy results so they don't render during loading or failure
    setProblem('')
    setActiveChallenge(trimmed)
    setIsLoading(true)
    setSidebarOpen(false) // Auto-close sidebar on mobile to reveal the battle arena!

    // Add user prompt to chat
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMessage = { sender: 'user', text: trimmed, timestamp: timeString }
    setMessages(prev => [...prev, userMessage])

    try {
      const res = await fetch('http://localhost:3000/graph', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem: trimmed })
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `Server error (${res.status})`)
      }

      const data = await res.json()
      setResult(data)
      setIsLoading(false)

      // Add battle conclusion to chat
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `Battle complete! Model A scored ${data.judge.solution_1_score}/10 vs Model B's ${data.judge.solution_2_score}/10. See the results on the right ->`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    } catch (err) {
      console.error(err)
      setError(err.message)
      setIsLoading(false)
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `Error during battle execution: ${err.message}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    }
  }

  return (
    <div className="flex h-screen w-screen bg-[#06060b] text-[#f0eef5] overflow-hidden relative">
      
      {/* LEFT SIDEBAR PANEL (Conversational thread and input control) */}
      <Sidebar
        messages={messages}
        problem={problem}
        setProblem={setProblem}
        handleBattle={handleBattle}
        isLoading={isLoading}
        textareaRef={textareaRef}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Blurred overlay backdrop when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* RIGHT WORKSPACE AREA (Duel Solutions & Verdict scorecard) */}
      <main className="flex-1 overflow-y-auto flex flex-col p-6 md:p-8 space-y-6">
        
        {/* Dynamic Workspace Header */}
        <div className="flex justify-between items-center pb-4 border-b border-white/[0.04]">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center text-sm shadow-md"
              title="Open Chat Panel"
            >
              💬
            </button>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>⚔️</span> {activeChallenge || 'Duel Ground'}
              </h2>
              <p className="text-xs text-gray-500 mt-1 font-mono">{activeChallenge ? activeChallenge : 'Send a challenge to begin the battle'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold">
            {isLoading ? (
              <span className="flex items-center gap-1.5 text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                IN PROGRESS
              </span>
            ) : result ? (
              <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                COMPLETE
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-gray-500" />
                STANDBY
              </span>
            )}
          </div>
        </div>

        {activeChallenge ? (
          <>
            {/* Competing Solutions Side-by-side */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 font-mono">
                Competing Solutions
              </h4>
              <div className="flex flex-col lg:flex-row gap-5">
                <SolutionCard
                  modelName="Model A"
                  accentColor="#4d8eff"
                  solution={result?.solution_1}
                  score={result?.judge?.solution_1_score}
                  isLoading={isLoading}
                  badgeStyle={
                    result?.winner === 'solution_1'
                      ? { bg: '#fbbf2415', border: '#fbbf2430', color: '#fbbf24' }
                      : null
                  }
                />

                <SolutionCard
                  modelName="Model B"
                  accentColor="#34d399"
                  solution={result?.solution_2}
                  score={result?.judge?.solution_2_score}
                  isLoading={isLoading}
                  badgeStyle={
                    result?.winner === 'solution_2'
                      ? { bg: '#fbbf2415', border: '#fbbf2430', color: '#fbbf24' }
                      : null
                  }
                />
              </div>
            </div>

            {/* Judge's Analysis breakdown */}
            {result && (
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 font-mono">
                  Judge's Analysis
                </h4>
                <JudgeVerdict
                  judge={result.judge}
                  winner={result.winner}
                />
              </div>
            )}

            {/* Error Notification (Only shows when no active result exists, preventing overlap) */}
            {error && !result && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl flex items-center gap-3">
                <span>⚠️</span>
                <div>
                  <p className="font-bold">Execution Error</p>
                  <p className="text-xs opacity-80">{error}</p>
                </div>
              </div>
            )}
          </>
        ) : (
          /* High-Fidelity Standby/Onboarding Screen */
          <div className="flex-1 w-full flex flex-col items-center justify-center p-4 md:p-8">
            <div className="max-w-2xl w-full text-center space-y-8 flex flex-col items-center justify-center my-auto">
              {/* Holographic Glowing Arena Icon */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-3xl w-40 h-40 animate-pulse" />
                <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-[#12121c] to-[#0e0e18] border border-white/10 flex items-center justify-center text-4xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-105">
                  <span className="animate-pulse">⚔️</span>
                </div>
              </div>

              {/* Welcome & Instructions */}
              <div className="space-y-3">
                <h3 className="text-3xl font-extrabold text-white tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                  Enter the Duel Ground
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-md mx-auto">
                  Submit a programming challenge in the left panel to watch two elite AI models battle in real-time, evaluated by an LLM referee.
                </p>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-4">
                <div className="bg-[#12121c]/40 border border-white/5 p-5 rounded-2xl flex flex-col items-center space-y-2.5 transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/5 hover:-translate-y-1">
                  <div className="text-2xl p-2 rounded-xl bg-purple-500/10 text-purple-400">🤖</div>
                  <h4 className="text-xs font-bold text-white tracking-wide uppercase">Dual LLMs</h4>
                  <p className="text-[10px] text-gray-500 leading-normal">Two separate LLM models independently program solutions.</p>
                </div>
                <div className="bg-[#12121c]/40 border border-white/5 p-5 rounded-2xl flex flex-col items-center space-y-2.5 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:-translate-y-1">
                  <div className="text-2xl p-2 rounded-xl bg-emerald-500/10 text-emerald-400">⚖️</div>
                  <h4 className="text-xs font-bold text-white tracking-wide uppercase">AI Referee</h4>
                  <p className="text-[10px] text-gray-500 leading-normal">A third judge analyzes correctness, efficiency, and edge cases.</p>
                </div>
                <div className="bg-[#12121c]/40 border border-white/5 p-5 rounded-2xl flex flex-col items-center space-y-2.5 transition-all duration-300 hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:-translate-y-1">
                  <div className="text-2xl p-2 rounded-xl bg-cyan-500/10 text-cyan-400">⚡</div>
                  <h4 className="text-xs font-bold text-white tracking-wide uppercase">Scorecard</h4>
                  <p className="text-[10px] text-gray-500 leading-normal">Detailed verdicts with numerical scores and side-by-side reviews.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}