export default function Docs() {
  const sections = [
    {
      icon: 'route',
      color: 'purple',
      title: 'LangGraph Workflow',
      description: 'The application pipeline is built as a state graph using LangGraph. Inputs undergo structured transitions from generation nodes to validation nodes, arriving at the judgment evaluation node.',
      code: 'START → generateSolutions → judgeNode → END',
      codeColor: 'purple'
    },
    {
      icon: 'smart_toy',
      color: 'cyan',
      title: 'Contestant Models',
      description: 'Two distinct LLM models (Mistral Large & Cohere Command R+) operate in parallel nodes to generate competing code blocks. This dual-model design highlights strengths and trade-offs.',
      list: [
        { label: 'Model A (Mistral)', text: 'Prioritizes syntactic cleanliness and standard algorithms.' },
        { label: 'Model B (Cohere)', text: 'Optimizes for modularity and edge-case handling.' }
      ]
    },
    {
      icon: 'gavel',
      color: 'amber',
      title: 'AI Referee (The Judge)',
      description: 'An independent model acts as the referee. It takes the problem definition and generated code blocks, scoring both candidates on a 1-10 scale and producing structured JSON reviews.',
      metrics: ['Time Complexity', 'Space Complexity', 'Readability', 'Scalability']
    },
    {
      icon: 'merge',
      color: 'blue',
      title: 'Synthesized Master Guide',
      description: "Using the referee's assessment, the system produces a Synthesized Master Guide, extracting modular components of both solutions into a unified optimal solution.",
      code: 'Composite Score = (Score A + Score B) × 5',
      codeColor: 'blue'
    }
  ]

  return (
    <div className="space-y-8 anim-fade-up">
      {/* Intro */}
      <div className="space-y-3">
        <h3 className="text-2xl font-black text-text-primary tracking-tight bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Technical Architecture & Documentation
        </h3>
        <p className="text-[13px] text-text-secondary leading-relaxed max-w-3xl">
          AI Battle Arena uses LangGraph to orchestrate a competitive programming flow between LLM agents, generating optimized coding solutions evaluated by a neutral referee.
        </p>
      </div>

      {/* Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sections.map((section, i) => (
          <div key={section.title} className={`bg-card-bg border border-border-subtle p-6 rounded-2xl space-y-4 shadow-lg premium-card anim-fade-up stagger-${i + 1}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-${section.color}-500/10 border border-${section.color}-500/15 flex items-center justify-center`}>
                <span className={`material-symbols-outlined text-${section.color}-400 text-xl`}>{section.icon}</span>
              </div>
              <h4 className="text-sm font-extrabold text-text-primary font-sans">{section.title}</h4>
            </div>
            <p className="text-[12.5px] text-text-secondary leading-relaxed">
              {section.description}
            </p>
            
            {section.code && (
              <div className="bg-void/60 p-3.5 rounded-xl border border-border-subtle font-mono text-[11px] text-text-secondary">
                <span className={`text-${section.codeColor}-400`}>{section.code}</span>
              </div>
            )}
            
            {section.list && (
              <ul className="space-y-2">
                {section.list.map((item) => (
                  <li key={item.label} className="flex items-start gap-2 text-[12px] text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-muted mt-1.5 shrink-0" />
                    <span><strong className="text-text-primary">{item.label}:</strong> {item.text}</span>
                  </li>
                ))}
              </ul>
            )}
            
            {section.metrics && (
              <div className="grid grid-cols-2 gap-2">
                {section.metrics.map((metric) => (
                  <span key={metric} className="p-2 bg-void/60 rounded-lg border border-border-subtle font-mono text-[10px] text-text-muted text-center">
                    {metric}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
