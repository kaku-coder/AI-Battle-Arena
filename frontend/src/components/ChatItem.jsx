import React from 'react'

/**
 * ChatItem component representing a single bubble in the sidebar chat feed.
 */
export default function ChatItem({ sender, text, timestamp }) {
  const isUser = sender === 'user'
  return (
    <div className={`flex flex-col max-w-[85%] ${isUser ? 'self-end' : 'self-start'}`}>
      <div
        className={`px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm border ${
          isUser
            ? 'bg-purple-600 border-purple-500 text-white rounded-br-none'
            : 'bg-[#1b1b26] border-white/5 text-gray-200 rounded-bl-none'
        }`}
      >
        {text}
      </div>
      <span className="text-[10px] text-gray-500 mt-1 px-1 self-start font-mono">
        {timestamp}
      </span>
    </div>
  )
}
