import { useState, useRef, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import SolutionCard from './components/SolutionCard'
import JudgeVerdict from './components/JudgeVerdict'
import Leaderboard from './components/Leaderboard'
import History from './components/History'
import Docs from './components/Docs'
import HelpPage from './components/HelpPage'
import SavedComparisons from './components/SavedComparisons'
import './App.css'

const API = 'http://localhost:3000'

export default function App() {
  const [problem, setProblem] = useState('')
  const [activeChallenge, setActiveChallenge] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [result, setResult] = useState()
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('arena')
  const [theme, setTheme] = useState('dark')

  const textareaRef = useRef(null)

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleBattle()
    }
  }

  const handleBattle = async () => {
    const trimmed = problem.trim()
    if (!trimmed || isLoading) return

    setError(null)
    setResult(null)
    setProblem('')
    setActiveChallenge(trimmed)
    setIsLoading(true)
    setSidebarOpen(false)

    try {
      let res = await fetch(`${API}/graph`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem: trimmed }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `Server error (${res.status})`)
      }

      const data = await res.json()
      setResult(data)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
      if (err.message === 'Failed to fetch') {
        setError('Cannot connect to server. Make sure backend is running on port 3000.')
      } else {
        setError(err.message)
      }
      setIsLoading(false)
    }
  }

  const resetBattle = () => {
    setProblem('')
    setActiveChallenge('')
    setResult(null)
    setError(null)
  }

  const handleLoadComparison = (comp) => {
    setActiveTab('arena')
    resetBattle()
  }

  const displaySolution1 = result?.solution_1 || (isLoading ? "Processing prompt... awaiting validation..." : "Awaiting prompt... please enter your programming query in the input bar below.")
  const displaySolution2 = result?.solution_2 || (isLoading ? "Synthesizing Node ecosystem... awaiting code..." : "Awaiting prompt... please enter your programming query in the input bar below.")

  return (
    <div className="flex h-screen w-screen bg-void text-text-primary relative">
      <div className="scene-bg" />
      <div className="hero-orb" />

      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        onNewBattle={resetBattle}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col h-screen relative z-10 min-w-0">

        {/* Top App Bar */}
        <header className="sticky top-0 left-0 right-0 z-30 flex justify-between items-center px-4 md:px-6 h-14 glass-strong border-b border-border-subtle shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl bg-surface-raised border border-border-medium text-text-primary hover:bg-surface hover:text-text-primary active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              title="Open Navigation"
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/10 border border-purple-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px] text-purple-400">swords</span>
              </div>
              <span className="text-[11px] md:text-xs font-black tracking-[0.2em] text-text-primary uppercase font-display">
                NEURAL BATTLEGROUND
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-1 ml-4">
              {[
                { id: 'arena', label: 'Arena', icon: 'swords' },
                { id: 'leaderboard', label: 'Leaderboard', icon: 'leaderboard' },
                { id: 'history', label: 'History', icon: 'history' },
                { id: 'saved', label: 'Saved', icon: 'bookmark' },
                { id: 'help', label: 'Help', icon: 'help' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${activeTab === tab.id
                      ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20'
                      : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.03]'
                    }`}
                >
                  <span className="material-symbols-outlined text-[14px]">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 hover:text-text-primary hover:bg-surface-raised rounded-xl transition-all cursor-pointer flex items-center justify-center text-text-secondary"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <span className="material-symbols-outlined text-[18px]">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/25 flex items-center justify-center text-[11px] font-black text-purple-400 font-mono ml-1">
              PR
            </div>
          </div>
        </header>

        {/* Main Canvas */}
        <main className="flex-1 overflow-y-auto px-4 md:px-6 pb-32 pt-4">

          {activeTab === 'arena' && (
            <div className="max-w-7xl mx-auto space-y-5">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2 anim-fade-up">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    {result ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-[10px] font-bold font-mono tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        VERDICT REACHED
                      </span>
                    ) : isLoading ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-lg text-[10px] font-bold font-mono tracking-wider animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                        INITIATING BATTLE
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/[0.03] text-text-muted border border-border-subtle rounded-lg text-[10px] font-bold font-mono tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                        STANDBY
                      </span>
                    )}
                  </div>
                  <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-text-primary">
                    {activeChallenge ? "System Architecture Generation" : "Arena Duel Ground"}
                  </h1>
                  <p className="text-xs text-text-muted font-mono max-w-xl">
                    {activeChallenge ? `Prompt: "${activeChallenge}"` : "Awaiting input at the bottom to start matching models..."}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch anim-fade-up stagger-1">
                <SolutionCard
                  modelName={result?.model_1 || "Model A"}
                  accentColor="#4d8eff"
                  iconName="auto_awesome"
                  solution={displaySolution1}
                  score={result?.judge?.solution_1_score}
                  isLoading={isLoading}
                  isWinner={result?.winner === 'solution_1'}
                />
                <SolutionCard
                  modelName={result?.model_2 || "Model B"}
                  accentColor="#34d399"
                  iconName="psychology"
                  solution={displaySolution2}
                  score={result?.judge?.solution_2_score}
                  isLoading={isLoading}
                  isWinner={result?.winner === 'solution_2'}
                />
              </div>

              {isLoading && (
                <div className="bg-card-bg/80 backdrop-blur-sm border border-amber-500/15 rounded-2xl p-5 flex items-center justify-center gap-4 w-full shadow-lg anim-scale">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-void border border-amber-500/30 flex items-center justify-center animate-spin">
                      <span className="material-symbols-outlined text-amber-500 text-[14px]">gavel</span>
                    </div>
                    <div className="absolute inset-0 rounded-full border border-amber-500/20 animate-ping" />
                  </div>
                  <div className="text-center">
                    <span className="text-[11px] text-amber-400 font-bold uppercase font-mono tracking-wider block">
                      Referee evaluating solutions
                    </span>
                    <span className="text-[10px] text-text-muted font-mono">
                      Analyzing technical depth, clarity, and metrics
                    </span>
                  </div>
                </div>
              )}

              {result && (
                <div className="mt-4 anim-fade-up stagger-2">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-amber-500 text-[14px]">gavel</span>
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted font-mono">
                      Detailed Judge's Breakdown
                    </h4>
                  </div>
                  <JudgeVerdict
                    judge={result.judge}
                    winner={result.winner}
                    solution1={result.solution_1}
                    solution2={result.solution_2}
                    model1Name={result.model_1}
                    model2Name={result.model_2}
                  />
                </div>
              )}

              {error && !result && (
                <div className="bg-red-500/5 border border-red-500/15 text-red-400 text-sm p-4 rounded-2xl flex items-center gap-3 anim-scale">
                  <span className="material-symbols-outlined text-[20px]">error</span>
                  <div>
                    <p className="font-bold text-xs">Execution Error</p>
                    <p className="text-[11px] opacity-80 font-mono">{error}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'leaderboard' && <div className="max-w-7xl mx-auto"><Leaderboard /></div>}

          {activeTab === 'history' && (
            <div className="max-w-7xl mx-auto">
              <History
                onLoadChallenge={(prompt, data) => {
                  setError(null);
                  setProblem('');
                  setActiveChallenge(prompt);
                  setResult(data);
                  setActiveTab('arena');
                }}
              />
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="max-w-7xl mx-auto">
              <SavedComparisons onLoadComparison={handleLoadComparison} />
            </div>
          )}

          {activeTab === 'help' && <div className="max-w-7xl mx-auto"><HelpPage /></div>}
          {activeTab === 'docs' && <div className="max-w-7xl mx-auto"><Docs /></div>}

        </main>

        {/* Bottom Input Bar */}
        {activeTab === 'arena' && (
          isLoading ? (
            <div className="fixed bottom-14 md:bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-void via-void/95 to-transparent z-30">
              <div className="max-w-7xl mx-auto w-full flex items-center justify-center">
                <button
                  onClick={() => {
                    setIsLoading(false);
                    setProblem('');
                    setActiveChallenge('');
                    setResult(null);
                  }}
                  className="px-6 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 rounded-xl text-[11px] font-bold font-mono tracking-wider transition-all uppercase flex items-center gap-2 active:scale-95 shadow-lg cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px] animate-pulse">stop_circle</span>
                  <span>Stop generation</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="fixed bottom-14 md:bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-void via-void/95 to-transparent z-30">
              <div className="max-w-7xl mx-auto w-full relative">
                <div className="bg-card-bg/90 backdrop-blur-xl border border-border-medium rounded-2xl flex items-end p-2.5 focus-within:border-purple-500/40 focus-within:ring-2 focus-within:ring-purple-500/10 transition-all shadow-2xl shadow-black/30">
                  <textarea
                    ref={textareaRef}
                    rows="1"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-text-primary text-[13px] font-sans resize-none py-3 px-3 max-h-32 placeholder:text-text-muted focus:outline-none"
                    placeholder={result ? "Ask a follow-up or start a new comparison..." : "Ask a programming challenge..."}
                  />
                  <button
                    onClick={handleBattle}
                    disabled={!problem.trim()}
                    className="p-2.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-xl ml-2 mb-0.5 transition-all self-end group disabled:opacity-30 disabled:hover:from-purple-600 disabled:hover:to-purple-500 active:scale-95 cursor-pointer shadow-lg shadow-purple-500/20"
                  >
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">send</span>
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 w-full z-20 flex justify-around items-center px-2 pb-safe h-14 glass-strong border-t border-border-subtle">
          {[
            { id: 'arena', icon: 'swords', label: 'Arena' },
            { id: 'history', icon: 'history', label: 'History' },
            { id: 'leaderboard', icon: 'leaderboard', label: 'Leaderboard' },
            { id: 'saved', icon: 'bookmark', label: 'Saved' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center rounded-xl px-3 py-1.5 transition-all cursor-pointer ${activeTab === tab.id
                  ? 'bg-purple-500/15 text-purple-400 border border-purple-500/25 scale-105'
                  : 'text-text-muted hover:text-purple-400'
                }`}
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeTab === tab.id ? "'FILL' 1" : "" }}>
                {tab.icon}
              </span>
              <span className="font-mono text-[8px] mt-0.5 font-bold tracking-wider uppercase">{tab.label}</span>
            </button>
          ))}
        </nav>

      </div>
    </div>
  )
}
