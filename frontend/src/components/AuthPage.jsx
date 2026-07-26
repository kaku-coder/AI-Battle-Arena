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

      {/* Ambient glow behind card */}
      <div className="absolute z-0 w-[420px] h-[420px] rounded-full bg-purple-600/8 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-4">
        <div
          className="rounded-3xl p-10 shadow-2xl shadow-black/50"
          style={{
            background: 'linear-gradient(135deg, rgba(20,15,35,0.85), rgba(12,10,22,0.92))',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(139,92,246,0.12)',
            boxShadow: '0 0 60px -12px rgba(139,92,246,0.12), 0 25px 50px -12px rgba(0,0,0,0.5)',
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative w-16 h-16 mx-auto mb-5">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 opacity-20 blur-lg" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/25 to-cyan-500/15 border border-purple-400/25 flex items-center justify-center shadow-lg shadow-purple-500/15">
                <span className="material-symbols-outlined text-[30px] text-purple-400">swords</span>
              </div>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </span>
            </h1>
            <p className="text-[12px] text-text-muted font-mono mt-2.5 tracking-wide">
              {isLogin ? 'Sign in to your Neural Battleground' : 'Join the Neural Battleground'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-[0.15em] block">
                  Name
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-text-muted/50 group-focus-within:text-purple-400 transition-colors">
                    person
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-void/60 border border-border-medium rounded-xl py-3 pl-11 pr-4 text-[13px] text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all font-sans"
                    placeholder="Your name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-[0.15em] block">
                Email
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-text-muted/50 group-focus-within:text-purple-400 transition-colors">
                  mail
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-void/60 border border-border-medium rounded-xl py-3 pl-11 pr-4 text-[13px] text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all font-sans"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-[0.15em] block">
                Password
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-text-muted/50 group-focus-within:text-purple-400 transition-colors">
                  lock
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-void/60 border border-border-medium rounded-xl py-3 pl-11 pr-4 text-[13px] text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all font-sans"
                  placeholder="Min. 6 characters"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/8 border border-red-500/20 text-red-400 text-[12px] px-4 py-3 rounded-xl flex items-center gap-2.5 font-mono animate-[shake_0.3s_ease-in-out]">
                <span className="material-symbols-outlined text-[16px] shrink-0">error</span>
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-3.5 rounded-xl text-[13px] font-bold text-white overflow-hidden transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-purple-600/20 cursor-pointer group"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #a855f7, #7c3aed)',
                backgroundSize: '200% 200%',
                animation: loading ? 'none' : 'gradientShift 3s ease infinite',
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">
                      {isLogin ? 'login' : 'person_add'}
                    </span>
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border-medium to-transparent" />
            <span className="text-[10px] text-text-muted font-mono uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border-medium to-transparent" />
          </div>

          {/* Toggle */}
          <div className="text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-[12px] text-purple-400 hover:text-purple-300 transition-colors font-semibold cursor-pointer hover:underline underline-offset-4"
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
            </button>
          </div>
        </div>
      </div>

      {/* Injected keyframes */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  )
}
