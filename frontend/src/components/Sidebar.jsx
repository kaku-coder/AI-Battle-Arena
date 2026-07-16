export default function Sidebar({ isOpen, setIsOpen, onNewBattle }) {
  return (
    <>
      <aside className={`fixed inset-y-0 left-0 w-64 bg-surface/95 backdrop-blur-xl border-r border-border-medium flex flex-col h-screen shrink-0 z-30 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Brand Header */}
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
                  PRO RESEARCHER
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1.5 rounded-xl bg-surface-raised border border-border-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Close sidebar"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>

        {/* Nav Items */}
        <div className="flex-1 flex flex-col gap-1 p-4">
          <button
            onClick={() => {
              if (onNewBattle) onNewBattle();
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full p-3 bg-gradient-to-r from-purple-600/15 to-purple-500/5 text-purple-400 border border-purple-500/20 rounded-xl cursor-pointer hover:from-purple-600/25 hover:to-purple-500/10 hover:text-purple-300 transition-all text-[13px] font-bold text-left active:scale-[0.98] duration-150 shadow-sm shadow-purple-500/5"
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>add_box</span>
            <span>New Battle</span>
          </button>

          <div className="mt-3 mb-2">
            <span className="text-[8px] font-mono font-bold text-text-muted tracking-[0.2em] uppercase px-3">Navigation</span>
          </div>

          {[
            { icon: 'bookmark', label: 'Saved Comparisons' },
            { icon: 'tune', label: 'Model Settings' },
            { icon: 'code', label: 'API Access' }
          ].map((item) => (
            <a key={item.label} href="#" className="flex items-center gap-3 p-2.5 text-text-muted hover:bg-surface-raised hover:text-text-primary rounded-xl transition-all text-[13px] font-semibold group">
              <span className="material-symbols-outlined text-[18px] group-hover:text-purple-400 transition-colors">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto p-4 flex flex-col gap-2.5 border-t border-border-medium">
          <button className="w-full py-2.5 bg-gradient-to-r from-purple-600/15 to-purple-500/10 text-purple-400 border border-purple-500/20 rounded-xl text-[10px] font-bold font-mono tracking-[0.15em] hover:from-purple-600/25 hover:to-purple-500/15 transition-all uppercase cursor-pointer shadow-sm shadow-purple-500/5">
            Upgrade to Ultra
          </button>

          <a href="#" className="flex items-center gap-3 p-2 text-text-muted hover:text-text-primary transition-colors text-[12px] font-semibold rounded-lg hover:bg-white/[0.02]">
            <span className="material-symbols-outlined text-[16px]">help</span>
            <span>Help</span>
          </a>

          <a href="#" className="flex items-center gap-3 p-2 text-text-muted hover:text-red-400 transition-colors text-[12px] font-semibold rounded-lg hover:bg-red-500/[0.03]">
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span>Sign Out</span>
          </a>
        </div>
      </aside>
    </>
  )
}
