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

  return (
    <div className="space-y-8 anim-fade-up">
      <div className="space-y-3">
        <h3 className="text-2xl font-black text-text-primary tracking-tight bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Help & Support
        </h3>
        <p className="text-[13px] text-text-secondary leading-relaxed max-w-3xl">
          Everything you need to know about AI Battle Arena. Find answers to common questions and learn how to get the most out of the platform.
        </p>
      </div>

      {/* How It Works */}
      <div className="bg-card-bg border border-border-subtle rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-purple-400 text-[16px]">route</span>
          </div>
          <h4 className="text-sm font-extrabold text-text-primary">How It Works</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div key={step.step} className="relative">
              <div className="bg-void/60 border border-border-subtle rounded-xl p-5 text-center space-y-3 h-full">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-purple-400 text-xl">{step.icon}</span>
                </div>
                <div>
                  <span className="text-[8px] font-mono font-bold text-purple-400 tracking-[0.2em] uppercase">Step {step.step}</span>
                  <h5 className="text-[13px] font-bold text-text-primary mt-1">{step.title}</h5>
                  <p className="text-[11px] text-text-muted mt-1 leading-relaxed">{step.description}</p>
                </div>
              </div>
              {step.step < 4 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <span className="material-symbols-outlined text-text-muted/30 text-lg">chevron_right</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-amber-400 text-[16px]">help</span>
          </div>
          <h4 className="text-sm font-extrabold text-text-primary">Frequently Asked Questions</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className={`bg-card-bg border border-border-subtle p-5 rounded-2xl space-y-3 shadow-lg premium-card anim-fade-up stagger-${(i % 6) + 1}`}>
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
      <div className="bg-card-bg border border-border-subtle rounded-2xl p-6 shadow-lg text-center">
        <span className="material-symbols-outlined text-purple-400 text-3xl mb-3 block">support_agent</span>
        <h4 className="text-sm font-extrabold text-text-primary mb-2">Still have questions?</h4>
        <p className="text-[12px] text-text-muted mb-4">
          Our support team is here to help. Reach out and we'll get back to you as soon as possible.
        </p>
        <a
          href="mailto:support@aibattlearena.com"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600/10 text-purple-400 border border-purple-500/20 rounded-xl text-[12px] font-bold hover:bg-purple-600 hover:text-white transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[16px]">mail</span>
          Contact Support
        </a>
      </div>
    </div>
  )
}
