export default function Sidebar({ isOpen, setIsOpen, onNewBattle, activeTab, setActiveTab }) {
  const navItems = [
    { id: 'arena', icon: 'swords', label: 'Arena', color: 'purple' },
    { id: 'saved', icon: 'bookmark', label: 'Saved Comparisons', color: 'cyan' },
    { id: 'leaderboard', icon: 'leaderboard', label: 'Leaderboard', color: 'gold' },
    { id: 'history', icon: 'history', label: 'History', color: 'purple' },
    { id: 'help', icon: 'help', label: 'Help & Support', color: 'cyan' },
    { id: 'docs', icon: 'description', label: 'Docs', color: 'blue' },
  ]

  const colorMap = {
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', activeBg: 'bg-purple-500/15' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400', activeBg: 'bg-cyan-500/15' },
    gold: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', activeBg: 'bg-amber-500/15' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', activeBg: 'bg-blue-500/15' },
  }

  const handleNav = (id) => {
    setActiveTab(id)
    setIsOpen(false)
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-surface/95 backdrop-blur-2xl border-r border-border-medium flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-border-medium">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/25 to-cyan-500/15 border border-purple-500/25 flex items-center justify-center shadow-lg shadow-purple-500/10">
                <span className="material-symbols-outlined text-[18px] text-purple-400">swords</span>
              </div>
              <div>
                <h2 className="font-sans font-extrabold text-[13px] text-text-primary tracking-wide uppercase leading-tight">
                  Arena Control
                </h2>
                <p className="text-[8px] font-mono font-bold text-purple-400/80 tracking-[0.2em] uppercase mt-0.5">
                  AI RESEARCHER
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-surface-raised border border-border-medium text-text-secondary hover:text-text-primary hover:border-purple-500/20 transition-all duration-200 cursor-pointer"
              aria-label="Close sidebar"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>

        {/* New Battle Button */}
        <div className="px-4 pt-4">
          <button
            onClick={() => {
              if (onNewBattle) onNewBattle()
              handleNav('arena')
            }}
            className="flex items-center gap-3 w-full p-3 bg-gradient-to-r from-purple-600/20 to-purple-500/10 text-purple-400 border border-purple-500/25 rounded-xl cursor-pointer hover:from-purple-600/30 hover:to-purple-500/15 hover:text-purple-300 transition-all duration-200 text-[13px] font-bold text-left active:scale-[0.98] shadow-sm shadow-purple-500/8"
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>add_box</span>
            <span>New Battle</span>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col gap-0.5 p-4 overflow-y-auto">
          <div className="mb-2 mt-1">
            <span className="text-[8px] font-mono font-bold text-text-muted tracking-[0.2em] uppercase px-3">Navigation</span>
          </div>

          {navItems.map((item) => {
            const colors = colorMap[item.color]
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 text-[13px] font-semibold text-left cursor-pointer ${
                  isActive
                    ? `${colors.activeBg} ${colors.text} border ${colors.border}`
                    : 'text-text-muted hover:bg-surface-raised hover:text-text-primary border border-transparent'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  isActive ? `${colors.bg} ${colors.border} border` : 'bg-white/[0.02]'
                }`}>
                  <span className={`material-symbols-outlined text-[16px] ${isActive ? colors.text : ''}`}>{item.icon}</span>
                </div>
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-border-medium">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r from-purple-500/[0.04] to-transparent border border-purple-500/[0.06]">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/10 border border-purple-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[14px] text-purple-400">bolt</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-secondary">Neural Battleground</p>
              <p className="text-[8px] font-mono text-text-muted tracking-wider">v1.0 ALPHA</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
