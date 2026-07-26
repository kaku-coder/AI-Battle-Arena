import { useState, useEffect } from 'react'

export default function SavedComparisons({ onLoadComparison }) {
  const [comparisons, setComparisons] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [model1, setModel1] = useState('Mistral Large')
  const [model2, setModel2] = useState('Cohere Command R+')
  const [judgeModel, setJudgeModel] = useState('Llama 3.3 (Groq)')
  const [error, setError] = useState('')

  const availableModels = [
    'Mistral Large',
    'Cohere Command R+',
    'Gemini 2.0 Flash',
  ]

  const judgeModels = [
    'Llama 3.3 (Groq)',
    'Gemini 2.0 Flash',
  ]

  useEffect(() => {
    fetchComparisons()
  }, [])

  const fetchComparisons = async () => {
    try {
      const res = await fetch('/api/comparisons')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setComparisons(data)
    } catch (err) {
      console.error('Cannot connect to server:', err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/comparisons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, model1, model2, judgeModel }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save')
      }
      const data = await res.json()
      setComparisons(data)
      setShowForm(false)
      setName('')
      setModel1('Mistral Large')
      setModel2('Cohere Command R+')
      setJudgeModel('Llama 3.3 (Groq)')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/comparisons/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete')
      const data = await res.json()
      setComparisons(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-6 anim-fade-up">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold text-text-primary tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-purple-400">bookmark</span>
            Saved Comparisons
          </h3>
          <p className="text-[12px] text-text-muted font-mono">Manage your model comparison presets</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-bold transition-all active:scale-95 cursor-pointer border ${
            showForm
              ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
              : 'bg-gradient-to-r from-purple-600/20 via-purple-500/15 to-fuchsia-500/10 text-purple-400 border-purple-500/25 hover:from-purple-600/30 hover:via-purple-500/25 hover:to-fuchsia-500/20 hover:shadow-lg hover:shadow-purple-500/10'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">{showForm ? 'close' : 'add'}</span>
          {showForm ? 'Cancel' : 'New Comparison'}
        </button>
      </div>

      {/* Glassmorphism Form */}
      {showForm && (
        <form
          onSubmit={handleSave}
          className="relative rounded-2xl overflow-hidden shadow-xl shadow-purple-500/5 anim-scale"
        >
          {/* Glassmorphism background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/8 via-card-bg/90 to-fuchsia-600/5 backdrop-blur-xl" />
          <div className="absolute inset-0 border border-white/[0.06] rounded-2xl pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

          <div className="relative p-6 space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[18px] text-purple-400">add_circle</span>
              <h4 className="text-sm font-extrabold text-text-primary">Create New Comparison</h4>
            </div>

            <div>
              <label className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-[0.15em] block mb-2">
                Comparison Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-void/60 border border-border-medium rounded-xl py-3 px-4 text-[13px] text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/15 transition-all font-sans"
                placeholder="e.g., Code Quality Battle"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Model A */}
              <div>
                <label className="text-[10px] font-mono font-bold text-blue-400/70 uppercase tracking-[0.15em] block mb-2">
                  Model A
                </label>
                <div className="relative">
                  <select
                    value={model1}
                    onChange={(e) => setModel1(e.target.value)}
                    className="w-full appearance-none bg-void/60 border border-border-medium rounded-xl py-3 px-4 pr-10 text-[13px] text-text-primary focus:outline-none focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10 transition-all font-sans cursor-pointer hover:border-border-medium/80"
                  >
                    {availableModels.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted/40">
                    <span className="material-symbols-outlined text-[16px]">expand_more</span>
                  </span>
                </div>
              </div>

              {/* Model B */}
              <div>
                <label className="text-[10px] font-mono font-bold text-emerald-400/70 uppercase tracking-[0.15em] block mb-2">
                  Model B
                </label>
                <div className="relative">
                  <select
                    value={model2}
                    onChange={(e) => setModel2(e.target.value)}
                    className="w-full appearance-none bg-void/60 border border-border-medium rounded-xl py-3 px-4 pr-10 text-[13px] text-text-primary focus:outline-none focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/10 transition-all font-sans cursor-pointer hover:border-border-medium/80"
                  >
                    {availableModels.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted/40">
                    <span className="material-symbols-outlined text-[16px]">expand_more</span>
                  </span>
                </div>
              </div>

              {/* Judge */}
              <div>
                <label className="text-[10px] font-mono font-bold text-amber-400/70 uppercase tracking-[0.15em] block mb-2">
                  Judge Model
                </label>
                <div className="relative">
                  <select
                    value={judgeModel}
                    onChange={(e) => setJudgeModel(e.target.value)}
                    className="w-full appearance-none bg-void/60 border border-border-medium rounded-xl py-3 px-4 pr-10 text-[13px] text-text-primary focus:outline-none focus:border-amber-500/40 focus:ring-2 focus:ring-amber-500/10 transition-all font-sans cursor-pointer hover:border-border-medium/80"
                  >
                    {judgeModels.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted/40">
                    <span className="material-symbols-outlined text-[16px]">expand_more</span>
                  </span>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/8 border border-red-500/20 text-red-400 text-[12px] p-3 rounded-xl font-mono flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px]">error</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-500 hover:from-purple-500 hover:via-purple-400 hover:to-fuchsia-400 text-white rounded-xl text-[13px] font-bold transition-all active:scale-[0.98] shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 cursor-pointer"
            >
              Save Comparison
            </button>
          </div>
        </form>
      )}

      {/* Content */}
      {loading ? (
        <div className="text-center py-16 bg-card-bg border border-border-subtle rounded-2xl">
          <div className="w-8 h-8 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin mx-auto mb-3" />
          <p className="text-[13px] text-text-muted font-mono">Loading saved comparisons...</p>
        </div>
      ) : comparisons.length === 0 ? (
        /* Dramatic Empty State */
        <div className="relative text-center py-20 bg-card-bg border border-border-subtle rounded-2xl overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/[0.03] rounded-full blur-3xl" />
            <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-fuchsia-500/[0.02] rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-blue-500/[0.02] rounded-full blur-3xl" />
          </div>
          <div className="relative">
            {/* Illustration */}
            <div className="relative w-20 h-20 mx-auto mb-5">
              <div className="absolute inset-0 bg-purple-500/10 rounded-2xl rotate-6" />
              <div className="absolute inset-0 bg-purple-500/15 rounded-2xl -rotate-3" />
              <div className="relative flex items-center justify-center h-full">
                <div className="relative">
                  <span className="material-symbols-outlined text-[40px] text-purple-400/60">shield</span>
                  <span className="material-symbols-outlined text-[16px] text-purple-400/40 absolute -bottom-1 -right-1">add</span>
                </div>
              </div>
            </div>
            <p className="text-[14px] text-text-primary font-bold mb-1">No saved comparisons yet</p>
            <p className="text-[12px] text-text-muted max-w-xs mx-auto leading-relaxed">
              Create a comparison preset to quickly load your favorite model matchups into the arena.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {comparisons.map((comp, i) => (
            <div
              key={comp._id || i}
              className={`group relative bg-card-bg border border-border-subtle p-5 rounded-2xl space-y-4 shadow-lg premium-card anim-fade-up stagger-${(i % 6) + 1} hover:border-purple-500/15 hover:shadow-purple-500/5 transition-all duration-300`}
            >
              {/* Subtle top glow on hover */}
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-purple-500/0 to-transparent group-hover:via-purple-500/30 transition-all duration-500" />

              <div className="flex items-start justify-between">
                <div>
                  <h5 className="text-[14px] font-bold text-text-primary">{comp.name}</h5>
                  <p className="text-[10px] font-mono text-text-muted mt-1">
                    Created {new Date(comp.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(comp._id)}
                  className="p-1.5 rounded-lg text-text-muted/40 hover:text-red-400 hover:bg-red-500/15 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100"
                  title="Delete comparison"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>

              {/* VS Styling */}
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex-1 px-3 py-2 bg-blue-500/8 text-blue-400 border border-blue-500/15 rounded-xl font-bold text-center truncate">
                  {comp.model1}
                </span>
                <div className="flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-md" />
                  <span className="relative px-2.5 py-1 bg-gradient-to-b from-purple-500/25 to-purple-600/15 border border-purple-500/30 text-purple-300 rounded-full text-[10px] font-extrabold tracking-wider">
                    VS
                  </span>
                </div>
                <span className="flex-1 px-3 py-2 bg-emerald-500/8 text-emerald-400 border border-emerald-500/15 rounded-xl font-bold text-center truncate">
                  {comp.model2}
                </span>
              </div>

              {comp.judgeModel && (
                <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted">
                  <span className="material-symbols-outlined text-[12px] text-amber-400/60">gavel</span>
                  Judge: <span className="text-text-muted/80">{comp.judgeModel}</span>
                </div>
              )}

              <button
                onClick={() => onLoadComparison && onLoadComparison(comp)}
                className="w-full py-2.5 bg-purple-600/10 text-purple-400 border border-purple-500/15 hover:bg-purple-600 hover:text-white hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 rounded-xl text-[11px] font-bold transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">input</span>
                Load in Arena
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
