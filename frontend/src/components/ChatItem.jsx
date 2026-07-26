export default function ChatItem({ sender, text, timestamp }) {
  const isUser = sender === 'user'
  return (
    <div className={`flex flex-col max-w-[75%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>
      <div
        className={`px-4 py-3 text-[13px] leading-relaxed border ${
          isUser
            ? 'bg-gradient-to-br from-purple-600 via-purple-500 to-fuchsia-500 border-purple-400/40 text-white rounded-2xl rounded-br-md shadow-lg shadow-purple-500/20'
            : 'bg-white/[0.06] backdrop-blur-xl border-white/10 text-gray-200 rounded-2xl rounded-bl-md shadow-lg shadow-black/20'
        }`}
      >
        {text}
      </div>
      <span className="text-[10px] text-gray-500/80 mt-1.5 px-1 font-mono tracking-wide">
        {timestamp}
      </span>
    </div>
  )
}
