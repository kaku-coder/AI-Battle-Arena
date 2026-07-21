import { useState } from 'react'

export default function AuthPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
    const body = isLogin
      ? { email, password }
      : { name, email, password }

    try {
      const res = await fetch(`${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed')
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      onAuth(data.user, data.token)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-screen bg-void text-text-primary overflow-hidden relative items-center justify-center">
      <div className="scene-bg" />
      <div className="hero-orb" />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-card-bg/90 backdrop-blur-xl border border-border-medium rounded-3xl p-8 shadow-2xl shadow-black/40">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/10 border border-purple-500/25 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/10">
              <span className="material-symbols-outlined text-[28px] text-purple-400">swords</span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-text-primary">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-[12px] text-text-muted font-mono mt-2">
              {isLogin ? 'Sign in to your Neural Battleground' : 'Join the Neural Battleground'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-[0.15em] block mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-void/60 border border-border-medium rounded-xl py-3 px-4 text-[13px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all font-sans"
                  placeholder="Your name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-[0.15em] block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-void/60 border border-border-medium rounded-xl py-3 px-4 text-[13px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all font-sans"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-[0.15em] block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-void/60 border border-border-medium rounded-xl py-3 px-4 text-[13px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all font-sans"
                placeholder="Min. 6 characters"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="bg-red-500/5 border border-red-500/15 text-red-400 text-[12px] p-3 rounded-xl flex items-center gap-2 font-mono">
                <span className="material-symbols-outlined text-[16px]">error</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-xl text-[13px] font-bold transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-[12px] text-purple-400 hover:text-purple-300 transition-colors font-semibold cursor-pointer"
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
