export default function Sidebar({ isOpen, setIsOpen, onNewBattle, activeTab, setActiveTab }) {
  const navItems = [
    { id: 'arena', icon: 'swords', label: 'Arena' },
    { id: 'saved', icon: 'bookmark', label: 'Saved Comparisons' },
    { id: 'leaderboard', icon: 'leaderboard', label: 'Leaderboard' },
    { id: 'history', icon: 'history', label: 'History' },
    { id: 'help', icon: 'help', label: 'Help & Support' },
    { id: 'docs', icon: 'description', label: 'Docs' },
  ]

  const handleNav = (id) => {
    setActiveTab(id)
    setIsOpen(false)
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-surface/95 backdrop-blur-xl border-r border-border-medium flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-border-medium">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/10 border border-purple-500/25 flex items-center justify-center shadow-lg shadow-purple-500/5">
                <span className="material-symbols-outlined text-[18px] text-purple-400">swords</span>
              </div>
              <div>
                <h2 className="font-sans font-extrabold text-[13px] text-text-primary tracking-wide uppercase leading-tight">
                  Arena Control
                </h2>
                <p className="text-[8px] font-mono font-bold text-purple-400 tracking-[0.2em] uppercase mt-0.5">
                  AI RESEARCHER
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-surface-raised border border-border-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Close sidebar"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
          <button
            onClick={() => {
              if (onNewBattle) onNewBattle()
              handleNav('arena')
            }}
            className="flex items-center gap-3 w-full p-3 bg-gradient-to-r from-purple-600/15 to-purple-500/5 text-purple-400 border border-purple-500/20 rounded-xl cursor-pointer hover:from-purple-600/25 hover:to-purple-500/10 hover:text-purple-300 transition-all text-[13px] font-bold text-left active:scale-[0.98] duration-150 shadow-sm shadow-purple-500/5"
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>add_box</span>
            <span>New Battle</span>
          </button>

          <div className="mt-3 mb-2">
            <span className="text-[8px] font-mono font-bold text-text-muted tracking-[0.2em] uppercase px-3">Navigation</span>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`flex items-center gap-3 p-2.5 rounded-xl transition-all text-[13px] font-semibold text-left cursor-pointer ${
                activeTab === item.id
                  ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20'
                  : 'text-text-muted hover:bg-surface-raised hover:text-text-primary border border-transparent'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] ${activeTab === item.id ? 'text-purple-400' : ''}`}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto p-4 border-t border-border-medium">
          <button
            onClick={() => handleNav('help')}
            className="flex items-center gap-3 p-2 text-text-muted hover:text-text-primary transition-colors text-[12px] font-semibold rounded-lg hover:bg-white/[0.02] cursor-pointer text-left w-full"
          >
            <span className="material-symbols-outlined text-[16px]">help</span>
            <span>Help</span>
          </button>
        </div>
      </aside>
    </>
  )
}
