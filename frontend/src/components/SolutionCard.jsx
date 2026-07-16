import React from 'react'
import TypewriterEffect from './TypewriterEffect'

/**
 * Reusable Code Card for AI competitor answers.
 * Shows scores, explanation text, and has scrollable containers for long responses.
 */
export default function SolutionCard({ modelName, score, solution, isLoading, accentColor, badgeStyle }) {
  return (
    <div
      className="flex-1 bg-[#12121c] border border-white/5 rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden"
      style={{ borderTop: `2px solid ${accentColor}` }}
    >
      {/* Glow overlay */}
      <div
        className="absolute top-0 left-0 w-full h-24 pointer-events-none opacity-[0.03]"
        style={{ background: `linear-gradient(to bottom, ${accentColor}, transparent)` }}
      />

      {/* Header Info */}
      <div className="flex justify-between items-start z-10">
        <div>
          <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider">{modelName}</h3>
          {score !== null && score !== undefined && (
            <p className="text-[11px] text-gray-500 font-mono mt-0.5">SCORE: {score}/10</p>
          )}
        </div>
        
        {/* Trophy / Score Badge */}
        {score !== null && score !== undefined && (
          <div
            className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold tracking-wide border flex items-center gap-1"
            style={{
              background: badgeStyle?.bg || `${accentColor}15`,
              borderColor: badgeStyle?.border || `${accentColor}40`,
              color: badgeStyle?.color || accentColor
            }}
          >
            {score === 10 ? '🏆 10/10' : `${score}/10`}
          </div>
        )}
      </div>

      {/* Main output view with scrollability for large content (overflow-y-auto) */}
      <div className="flex-grow bg-[#09090f] border border-white/5 rounded-lg p-4 min-h-[220px] max-h-[380px] overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 py-12">
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '-0.3s' }} />
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '-0.15s' }} />
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
            </div>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Compiling solution...</p>
          </div>
        ) : solution ? (
          <div className="font-mono text-[12px] leading-[1.8] text-gray-300 whitespace-pre-wrap">
            <TypewriterEffect text={solution} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-600 text-xs font-mono">
            Awaiting battle data...
          </div>
        )}
      </div>
    </div>
  )
}
