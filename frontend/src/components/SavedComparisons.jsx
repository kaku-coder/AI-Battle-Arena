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
      const res = await fetch('http://localhost:3000/api/comparisons')
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
      const res = await fetch('http://localhost:3000/api/comparisons', {
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
      const res = await fetch(`http://localhost:3000/api/comparisons/${id}`, {
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
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold text-text-primary tracking-tight">Saved Comparisons</h3>
          <p className="text-[12px] text-text-muted font-mono">Manage your model comparison presets</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600/15 to-purple-500/10 text-purple-400 border border-purple-500/20 rounded-xl text-[12px] font-bold hover:from-purple-600/25 hover:to-purple-500/15 transition-all active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">{showForm ? 'close' : 'add'}</span>
          {showForm ? 'Cancel' : 'New Comparison'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="bg-card-bg border border-border-medium rounded-2xl p-6 space-y-4 shadow-lg anim-scale">
          <h4 className="text-sm font-extrabold text-text-primary">Create New Comparison</h4>

          <div>
            <label className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-[0.15em] block mb-2">Comparison Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-void/60 border border-border-medium rounded-xl py-2.5 px-4 text-[13px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all font-sans"
              placeholder="e.g., Code Quality Battle"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-[0.15em] block mb-2">Model A</label>
              <select
                value={model1}
                onChange={(e) => setModel1(e.target.value)}
                className="w-full bg-void/60 border border-border-medium rounded-xl py-2.5 px-4 text-[13px] text-text-primary focus:outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all font-sans cursor-pointer"
              >
                {availableModels.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-[0.15em] block mb-2">Model B</label>
              <select
                value={model2}
                onChange={(e) => setModel2(e.target.value)}
                className="w-full bg-void/60 border border-border-medium rounded-xl py-2.5 px-4 text-[13px] text-text-primary focus:outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all font-sans cursor-pointer"
              >
                {availableModels.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-[0.15em] block mb-2">Judge Model</label>
              <select
                value={judgeModel}
                onChange={(e) => setJudgeModel(e.target.value)}
                className="w-full bg-void/60 border border-border-medium rounded-xl py-2.5 px-4 text-[13px] text-text-primary focus:outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all font-sans cursor-pointer"
              >
                {judgeModels.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/5 border border-red-500/15 text-red-400 text-[12px] p-3 rounded-xl font-mono">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-xl text-[13px] font-bold transition-all active:scale-[0.98] shadow-lg shadow-purple-500/20 cursor-pointer"
          >
            Save Comparison
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-center py-16 bg-card-bg border border-border-subtle rounded-2xl">
          <div className="w-8 h-8 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin mx-auto mb-3" />
          <p className="text-[13px] text-text-muted font-mono">Loading saved comparisons...</p>
        </div>
      ) : comparisons.length === 0 ? (
        <div className="text-center py-16 bg-card-bg border border-border-subtle rounded-2xl">
          <span className="material-symbols-outlined text-text-muted/30 text-5xl mb-3 block">bookmark_border</span>
          <p className="text-[13px] text-text-muted font-mono">No saved comparisons yet.</p>
          <p className="text-[11px] text-text-muted mt-1">Create one to quickly load your favorite model matchups.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {comparisons.map((comp, i) => (
            <div key={comp._id || i} className={`bg-card-bg border border-border-subtle p-5 rounded-2xl space-y-4 shadow-lg premium-card anim-fade-up stagger-${(i % 6) + 1}`}>
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="text-[14px] font-bold text-text-primary">{comp.name}</h5>
                  <p className="text-[10px] font-mono text-text-muted mt-1">
                    Created {new Date(comp.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(comp._id)}
                  className="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                  title="Delete comparison"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/15 rounded-lg font-bold">
                  {comp.model1}
                </span>
                <span className="text-text-muted font-bold">VS</span>
                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 rounded-lg font-bold">
                  {comp.model2}
                </span>
              </div>

              {comp.judgeModel && (
                <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted">
                  <span className="material-symbols-outlined text-[12px]">gavel</span>
                  Judge: {comp.judgeModel}
                </div>
              )}

              <button
                onClick={() => onLoadComparison && onLoadComparison(comp)}
                className="w-full py-2 bg-purple-600/10 text-purple-400 border border-purple-500/15 hover:bg-purple-600 hover:text-white rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
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
