export default function HelpPage() {
  const faqs = [
    {
      icon: 'swords',
      color: 'purple',
      question: 'What is AI Battle Arena?',
      answer: 'AI Battle Arena is a platform where two AI models compete head-to-head to solve your programming challenges. An independent AI judge evaluates both solutions and declares a winner based on code quality, efficiency, and best practices.',
    },
    {
      icon: 'smart_toy',
      color: 'cyan',
      question: 'Which AI models compete?',
      answer: 'Currently, Mistral Large and Cohere Command R+ are the contestant models. The judge is Llama 3.3 (via Groq), with Gemini as a fallback. All models operate independently to ensure fair evaluation.',
    },
    {
      icon: 'gavel',
      color: 'amber',
      question: 'How does the AI judge work?',
      answer: 'The judge model (Llama 3.3) receives both solutions along with the original problem. It scores each solution on a 1-10 scale considering time complexity, space complexity, readability, and scalability. It then provides detailed reasoning for its verdict.',
    },
    {
      icon: 'bookmark',
      color: 'emerald',
      question: 'How do Saved Comparisons work?',
      answer: 'You can save your preferred model comparison settings (Model A, Model B, and Judge Model) for quick access. Saved comparisons appear in your sidebar and can be loaded instantly to start a new battle.',
    },
    {
      icon: 'leaderboard',
      color: 'blue',
      question: 'How is the leaderboard calculated?',
      answer: 'The leaderboard uses real battle data from all matches. Each model gets an ELO-style rating based on win rate and average score. The more battles a model participates in, the more accurate its rating becomes.',
    },
    {
      icon: 'history',
      color: 'purple',
      question: 'Can I view my battle history?',
      answer: 'Yes! All your battles are saved to your account. Visit the History page to search and review past comparisons. You can reload any previous battle result into the arena.',
    },
    {
      icon: 'person',
      color: 'cyan',
      question: 'Do I need an account?',
      answer: 'Yes, you need to create a free account to use AI Battle Arena. Authentication ensures your battle history, saved comparisons, and leaderboard stats are preserved and linked to your profile.',
    },
    {
      icon: 'speed',
      color: 'amber',
      question: 'How fast are the results?',
      answer: 'Battle results typically take 3-6 seconds. Both AI models generate solutions in parallel, then the judge evaluates them. Response times may vary based on server load and prompt complexity.',
    },
  ]

  const steps = [
    {
      step: 1,
      icon: 'person_add',
      title: 'Create Account',
      description: 'Sign up with your email to get started. Your data is securely stored.',
    },
    {
      step: 2,
      icon: 'edit_note',
      title: 'Enter Challenge',
      description: 'Type a programming question or task in the arena input bar.',
    },
    {
      step: 3,
      icon: 'swords',
      title: 'Watch the Battle',
      description: 'Two AI models generate solutions simultaneously in real-time.',
    },
    {
      step: 4,
      icon: 'gavel',
      title: 'Get Verdict',
      description: 'An AI judge scores both solutions and declares a winner with detailed analysis.',
    },
  ]

  const faqGradients = [
    'from-purple-500/[0.04] to-transparent',
    'from-cyan-500/[0.04] to-transparent',
    'from-amber-500/[0.04] to-transparent',
    'from-emerald-500/[0.04] to-transparent',
    'from-blue-500/[0.04] to-transparent',
    'from-purple-500/[0.04] to-transparent',
    'from-cyan-500/[0.04] to-transparent',
    'from-amber-500/[0.04] to-transparent',
  ]

  return (
    <div className="space-y-10 anim-fade-up">
      {/* Header */}
      <div className="space-y-3">
        <h3 className="text-3xl font-black text-text-primary tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          Help & Support
        </h3>
        <p className="text-[13px] text-text-secondary leading-relaxed max-w-3xl">
          Everything you need to know about AI Battle Arena. Find answers to common questions and learn how to get the most out of the platform.
        </p>
      </div>

      {/* How It Works */}
      <div className="bg-card-bg border border-border-subtle rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/10 border border-purple-500/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-purple-400 text-[16px]">route</span>
          </div>
          <h4 className="text-sm font-extrabold text-text-primary tracking-wide">How It Works</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-0 relative">
          {steps.map((step, idx) => (
            <div key={step.step} className="relative flex flex-col items-center">
              {/* Step card */}
              <div className="relative bg-void/60 border border-border-subtle rounded-2xl p-6 text-center space-y-4 w-full z-10 group hover:border-purple-500/30 transition-all duration-300">
                {/* Numbered badge */}
                <div className="relative mx-auto">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/25 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-purple-400 text-2xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <span className="text-[10px] font-black text-white">{step.step}</span>
                  </div>
                </div>
                <div>
                  <h5 className="text-[13px] font-bold text-text-primary">{step.title}</h5>
                  <p className="text-[11px] text-text-muted mt-1.5 leading-relaxed">{step.description}</p>
                </div>
              </div>

              {/* Connector line (desktop only) */}
              {step.step < 4 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                  <div className="flex items-center">
                    <div className="w-4 h-[2px] bg-gradient-to-r from-purple-500/40 to-cyan-500/40"></div>
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-cyan-500/40"></div>
                  </div>
                </div>
              )}

              {/* Connector line (mobile only) */}
              {step.step < 4 && (
                <div className="md:hidden flex flex-col items-center py-2">
                  <div className="w-[2px] h-4 bg-gradient-to-b from-purple-500/40 to-cyan-500/40"></div>
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-cyan-500/40"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-amber-400 text-[16px]">help</span>
          </div>
          <h4 className="text-sm font-extrabold text-text-primary tracking-wide">Frequently Asked Questions</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`relative bg-gradient-to-br ${faqGradients[i]} bg-card-bg border border-border-subtle p-5 rounded-2xl space-y-3 shadow-lg premium-card anim-fade-up stagger-${(i % 6) + 1} hover:border-${faq.color}-500/25 transition-all duration-300`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl bg-${faq.color}-500/10 border border-${faq.color}-500/15 flex items-center justify-center shrink-0`}>
                  <span className={`material-symbols-outlined text-${faq.color}-400 text-[18px]`}>{faq.icon}</span>
                </div>
                <h5 className="text-[13px] font-bold text-text-primary">{faq.question}</h5>
              </div>
              <p className="text-[12px] text-text-secondary leading-relaxed pl-12">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="relative bg-card-bg border border-border-subtle rounded-2xl p-8 shadow-lg text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] via-transparent to-cyan-500/[0.03] pointer-events-none"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/15 to-cyan-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-purple-400 text-3xl">support_agent</span>
          </div>
          <h4 className="text-base font-extrabold text-text-primary mb-2">Still have questions?</h4>
          <p className="text-[12px] text-text-muted mb-5 max-w-md mx-auto leading-relaxed">
            Our support team is here to help. Reach out and we'll get back to you as soon as possible.
          </p>
          <a
            href="mailto:support@aibattlearena.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600/15 to-cyan-600/10 text-purple-400 border border-purple-500/25 rounded-xl text-[12px] font-bold hover:from-purple-600 hover:to-purple-600 hover:text-white hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">mail</span>
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
