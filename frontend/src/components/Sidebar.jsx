import React, { useRef, useEffect } from 'react'
import ChatItem from './ChatItem'

/**
 * Sidebar component containing branding, chat history, and input controls.
 */
export default function Sidebar({
  messages,
  problem,
  setProblem,
  handleBattle,
  isLoading,
  textareaRef,
  isOpen,
  setIsOpen
}) {
  const chatEndRef = useRef(null)

  // Auto-scroll chat feed to the bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleBattle()
    }
  }

  return (
    <aside className={`fixed inset-y-0 left-0 w-80 md:w-[350px] bg-[#0c0c14] border-r border-white/10 flex flex-col h-screen shrink-0 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      {/* Branding Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-lg shadow-inner">
            ⚔️
          </div>
          <div>
            <h1 className="font-sans font-extrabold text-sm text-white tracking-wide uppercase">
              Ai Battle Arena
            </h1>
            <p className="text-[9px] font-mono font-semibold text-purple-400 tracking-[0.18em] uppercase">
              LANGGRAPH POWERED
            </p>
          </div>
        </div>

        {/* Close button on mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>

      {/* Chat History Feed */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg, index) => (
          <ChatItem
            key={index}
            sender={msg.sender}
            text={msg.text}
            timestamp={msg.timestamp}
          />
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input controls */}
      <div className="p-4 border-t border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md flex flex-col gap-3">
        <textarea
          ref={textareaRef}
          className="w-full bg-[#0e0e18] border border-white/10 rounded-xl p-3 text-[13px] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 resize-none transition-all"
          placeholder="Send a programming challenge..."
          rows="3"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          onClick={handleBattle}
          disabled={isLoading || !problem.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.98] disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed text-white text-[13px] font-bold py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]"
        >
          {isLoading ? 'INITIATING BATTLE...' : 'Send to Battle'}
        </button>
      </div>
    </aside>
  )
}
