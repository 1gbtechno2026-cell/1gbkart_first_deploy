import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Strategy',
    desc: 'We audit your current setup, identify growth gaps, and build a data-backed roadmap tailored to your goals.',
    color: '#2D9DBB',
  },
  {
    num: '02',
    title: 'Build',
    desc: 'Our engineers and designers craft a high-performance, conversion-optimised store with seamless integrations.',
    color: '#1e7a94',
  },
  {
    num: '03',
    title: 'Optimise',
    desc: 'A/B testing, performance tuning, SEO, and funnel analysis to maximize every rupee of traffic.',
    color: '#4db8d4',
  },
  {
    num: '04',
    title: 'Scale',
    desc: 'From 1,000 to 1,000,000 orders — we scale infrastructure, channels, and operations alongside your growth.',
    color: '#2D9DBB',
  },
]

export default function Process() {
  return (
    <section id="process" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold text-[#2D9DBB] uppercase tracking-widest bg-[#2D9DBB]/10 px-4 py-1.5 rounded-full mb-4">
            Our Process
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            From Zero to{' '}
            <span className="gradient-text">Full Speed</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            A proven four-step framework that takes your ecommerce from launch to scale.
          </p>
        </motion.div>

        {/* Desktop timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div className="absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#2D9DBB]/40 to-transparent" />

          <div className="grid grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="text-center group"
              >
                {/* Number circle */}
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
                  <div className="absolute inset-0 rounded-full bg-[#2D9DBB]/10 group-hover:bg-[#2D9DBB]/20 transition-colors duration-300" />
                  <div
                    className="absolute inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ background: `${s.color}22` }}
                  />
                  <span
                    className="relative text-3xl font-black"
                    style={{ color: s.color }}
                  >
                    {s.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#2D9DBB] transition-colors duration-200">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile stacked */}
        <div className="lg:hidden space-y-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-5 items-start"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0"
                style={{ background: `${s.color}18`, color: s.color }}
              >
                {s.num}
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{s.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
