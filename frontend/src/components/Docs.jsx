const colorMap = {
  purple: {
    bg: 'from-purple-500/15 to-purple-600/5',
    border: 'border-purple-500/20',
    iconBg: 'bg-gradient-to-br from-purple-500/25 to-purple-700/10',
    iconText: 'text-purple-400',
    codeText: 'text-purple-300',
    glow: 'hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.25)]',
    gradientBorder: 'hover:border-transparent',
    badgeBg: 'bg-gradient-to-r from-purple-500/20 to-purple-600/10',
    badgeBorder: 'border-purple-500/25',
    bullet: 'bg-purple-400',
    bulletGlow: 'shadow-[0_0_6px_rgba(168,85,247,0.5)]',
  },
  cyan: {
    bg: 'from-cyan-500/15 to-cyan-600/5',
    border: 'border-cyan-500/20',
    iconBg: 'bg-gradient-to-br from-cyan-500/25 to-cyan-700/10',
    iconText: 'text-cyan-400',
    codeText: 'text-cyan-300',
    glow: 'hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.25)]',
    gradientBorder: 'hover:border-transparent',
    badgeBg: 'bg-gradient-to-r from-cyan-500/20 to-cyan-600/10',
    badgeBorder: 'border-cyan-500/25',
    bullet: 'bg-cyan-400',
    bulletGlow: 'shadow-[0_0_6px_rgba(6,182,212,0.5)]',
  },
  amber: {
    bg: 'from-amber-500/15 to-amber-600/5',
    border: 'border-amber-500/20',
    iconBg: 'bg-gradient-to-br from-amber-500/25 to-amber-700/10',
    iconText: 'text-amber-400',
    codeText: 'text-amber-300',
    glow: 'hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.25)]',
    gradientBorder: 'hover:border-transparent',
    badgeBg: 'bg-gradient-to-r from-amber-500/20 to-amber-600/10',
    badgeBorder: 'border-amber-500/25',
    bullet: 'bg-amber-400',
    bulletGlow: 'shadow-[0_0_6px_rgba(245,158,11,0.5)]',
  },
  blue: {
    bg: 'from-blue-500/15 to-blue-600/5',
    border: 'border-blue-500/20',
    iconBg: 'bg-gradient-to-br from-blue-500/25 to-blue-700/10',
    iconText: 'text-blue-400',
    codeText: 'text-blue-300',
    glow: 'hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)]',
    gradientBorder: 'hover:border-transparent',
    badgeBg: 'bg-gradient-to-r from-blue-500/20 to-blue-600/10',
    badgeBorder: 'border-blue-500/25',
    bullet: 'bg-blue-400',
    bulletGlow: 'shadow-[0_0_6px_rgba(59,130,246,0.5)]',
  },
}

const gradientBorderStyles = {
  purple: {
    background: 'linear-gradient(135deg, rgba(168,85,247,0.35), rgba(88,28,135,0.15), rgba(168,85,247,0.10))',
  },
  cyan: {
    background: 'linear-gradient(135deg, rgba(6,182,212,0.35), rgba(8,51,68,0.15), rgba(6,182,212,0.10))',
  },
  amber: {
    background: 'linear-gradient(135deg, rgba(245,158,11,0.35), rgba(120,53,15,0.15), rgba(245,158,11,0.10))',
  },
  blue: {
    background: 'linear-gradient(135deg, rgba(59,130,246,0.35), rgba(30,58,138,0.15), rgba(59,130,246,0.10))',
  },
}

export default function Docs() {
  const sections = [
    {
      icon: 'route',
      color: 'purple',
      title: 'LangGraph Workflow',
      description: 'The application pipeline is built as a state graph using LangGraph. Inputs undergo structured transitions from generation nodes to validation nodes, arriving at the judgment evaluation node.',
      code: 'START → generateSolutions → judgeNode → END',
      codeColor: 'purple',
    },
    {
      icon: 'smart_toy',
      color: 'cyan',
      title: 'Contestant Models',
      description: 'Two distinct LLM models (Mistral Large & Cohere Command R+) operate in parallel nodes to generate competing code blocks. This dual-model design highlights strengths and trade-offs.',
      list: [
        { label: 'Model A (Mistral)', text: 'Prioritizes syntactic cleanliness and standard algorithms.' },
        { label: 'Model B (Cohere)', text: 'Optimizes for modularity and edge-case handling.' },
      ],
    },
    {
      icon: 'gavel',
      color: 'amber',
      title: 'AI Referee (The Judge)',
      description: 'An independent model acts as the referee. It takes the problem definition and generated code blocks, scoring both candidates on a 1-10 scale and producing structured JSON reviews.',
      metrics: ['Time Complexity', 'Space Complexity', 'Readability', 'Scalability'],
    },
    {
      icon: 'merge',
      color: 'blue',
      title: 'Synthesized Master Guide',
      description: "Using the referee's assessment, the system produces a Synthesized Master Guide, extracting modular components of both solutions into a unified optimal solution.",
      code: 'Composite Score = (Score A + Score B) × 5',
      codeColor: 'blue',
    },
  ]

  return (
    <div className="space-y-10 anim-fade-up">
      {/* Intro */}
      <div className="space-y-4">
        <h3 className="text-3xl font-black text-text-primary tracking-tight bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent leading-snug">
          Technical Architecture & Documentation
        </h3>
        <p className="text-[13px] text-text-secondary leading-relaxed max-w-3xl">
          AI Battle Arena uses LangGraph to orchestrate a competitive programming flow between LLM agents, generating optimized coding solutions evaluated by a neutral referee.
        </p>
        <div className="h-px bg-gradient-to-r from-purple-500/40 via-cyan-500/30 to-transparent w-full" />
      </div>

      {/* Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, i) => {
          const c = colorMap[section.color]
          return (
            <div
              key={section.title}
              className={`group relative rounded-2xl anim-fade-up stagger-${i + 1}`}
            >
              {/* Gradient border on hover (pseudo-element via wrapper) */}
              <div
                className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                style={gradientBorderStyles[section.color]}
              />

              <div
                className={`relative bg-card-bg ${c.border} group-hover:border-transparent ${c.glow} border p-6 rounded-2xl space-y-5 shadow-lg premium-card transition-all duration-500`}
              >
                {/* Header */}
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-xl ${c.iconBg} border ${c.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <span className={`material-symbols-outlined ${c.iconText} text-xl`}>{section.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-text-primary font-sans tracking-wide">
                      {section.title}
                    </h4>
                    <div className={`mt-0.5 h-0.5 w-8 rounded-full bg-gradient-to-r ${c.iconText.replace('text-', 'from-')} to-transparent opacity-40 group-hover:w-12 transition-all duration-300`} />
                  </div>
                </div>

                {/* Description */}
                <p className="text-[12.5px] text-text-secondary leading-relaxed">
                  {section.description}
                </p>

                {/* Code block */}
                {section.code && (
                  <div className="relative overflow-hidden rounded-xl border border-border-subtle">
                    <div className={`absolute inset-0 bg-gradient-to-br ${c.bg} opacity-60`} />
                    <div className="relative px-4 py-3 font-mono text-[11px]">
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="w-2 h-2 rounded-full bg-red-400/60" />
                        <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
                        <span className="w-2 h-2 rounded-full bg-green-400/60" />
                        <span className="ml-2 text-[9px] text-text-muted uppercase tracking-widest">output</span>
                      </div>
                      <span className={`font-semibold ${c.codeText}`}>{section.code}</span>
                    </div>
                  </div>
                )}

                {/* List */}
                {section.list && (
                  <ul className="space-y-3">
                    {section.list.map((item) => (
                      <li
                        key={item.label}
                        className="flex items-start gap-3 text-[12px] text-text-secondary group/item"
                      >
                        <span className={`mt-1.5 shrink-0 w-2 h-2 rounded-full ${c.bullet} group-hover/item:shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover/item:scale-125 transition-all duration-200`} />
                        <span>
                          <strong className="text-text-primary font-semibold">{item.label}:</strong>{' '}
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Metrics */}
                {section.metrics && (
                  <div className="grid grid-cols-2 gap-2.5">
                    {section.metrics.map((metric, mi) => (
                      <span
                        key={metric}
                        className={`relative group/metric p-2.5 rounded-xl ${c.badgeBg} border ${c.badgeBorder} font-mono text-[10px] text-text-muted text-center hover:text-text-primary transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]`}
                      >
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-300" />
                        <span className="relative">{metric}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
