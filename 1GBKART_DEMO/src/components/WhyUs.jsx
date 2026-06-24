import { motion } from 'framer-motion'
import { CheckCircle2, Award, Layers, HeartHandshake } from 'lucide-react'

const features = [
  { icon: <Award size={20} />, title: 'Ecommerce Expertise', desc: '7+ years building high-converting stores for D2C and enterprise brands.' },
  { icon: <CheckCircle2 size={20} />, title: 'Growth Driven', desc: 'Every decision is backed by data — we optimise for revenue, not just traffic.' },
  { icon: <Layers size={20} />, title: 'Scalable Infrastructure', desc: 'Cloud-native, auto-scaling architecture that handles 10x traffic spikes seamlessly.' },
  { icon: <HeartHandshake size={20} />, title: 'Dedicated Support', desc: '24/7 account management and technical support with guaranteed SLA response.' },
]

function AnimatedDashboard() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D9DBB]/20 to-transparent blur-3xl rounded-full pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-brand border border-slate-100 dark:border-slate-700 p-6 overflow-hidden"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-slate-400 font-medium">Store Performance</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">Q2 2025 Report</p>
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">Live</span>
        </div>

        {/* Progress metrics */}
        {[
          { label: 'Revenue', val: 87, color: '#2D9DBB' },
          { label: 'Orders', val: 73, color: '#4db8d4' },
          { label: 'Retention', val: 91, color: '#1e7a94' },
          { label: 'NPS Score', val: 95, color: '#B8BDC9' },
        ].map((m, i) => (
          <div key={m.label} className="mb-4 last:mb-0">
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-slate-600 dark:text-slate-300">{m.label}</span>
              <span style={{ color: m.color }}>{m.val}%</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${m.val}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 + i * 0.15, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: m.color }}
              />
            </div>
          </div>
        ))}

        {/* Bottom cards */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          {[
            { label: 'Avg Order Value', value: '₹2,960', trend: '+18%' },
            { label: 'Cart Recovery', value: '34%', trend: '+12%' },
          ].map(c => (
            <div key={c.label} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
              <p className="text-xs text-slate-400 mb-1">{c.label}</p>
              <p className="text-base font-bold text-slate-800 dark:text-white">{c.value}</p>
              <p className="text-xs text-emerald-500 font-semibold">{c.trend}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-gradient-to-br from-slate-50 to-[#2D9DBB]/5 dark:from-slate-900 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs font-bold text-[#2D9DBB] uppercase tracking-widest bg-[#2D9DBB]/10 px-4 py-1.5 rounded-full mb-5">
                Why 1GB KART
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-5">
                Built for Brands That{' '}
                <span className="gradient-text">Refuse to Plateau</span>
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
                We combine deep ecommerce expertise with cutting-edge technology to give your brand an unfair advantage.
              </p>
            </motion.div>

            <div className="space-y-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2D9DBB]/10 flex items-center justify-center text-[#2D9DBB] flex-shrink-0 group-hover:bg-[#2D9DBB] group-hover:text-white transition-all duration-300">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">{f.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — dashboard */}
          <AnimatedDashboard />
        </div>
      </div>
    </section>
  )
}
