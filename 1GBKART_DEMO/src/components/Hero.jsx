import { motion } from 'framer-motion'
import { ArrowRight, Play, TrendingUp, ShoppingCart, BarChart3, Zap } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

function DashboardMockup() {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Glow */}
      <div className="absolute inset-0 bg-[#2D9DBB]/20 blur-3xl rounded-full scale-90 translate-y-8" />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-brand border border-slate-100 dark:border-slate-700 p-5 overflow-hidden"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Revenue Overview</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">₹ 24,89,500</p>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full">
            <TrendingUp size={12} /> +120%
          </span>
        </div>

        {/* Mini bar chart */}
        <div className="flex items-end gap-1.5 h-20 mb-4">
          {[40, 60, 45, 80, 65, 90, 75, 100, 85, 95, 88, 100].map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.04, ease: 'easeOut' }}
              style={{ height: `${h}%`, transformOrigin: 'bottom' }}
              className={`flex-1 rounded-sm ${i === 11 ? 'bg-[#2D9DBB]' : i > 8 ? 'bg-[#2D9DBB]/60' : 'bg-slate-100 dark:bg-slate-700'}`}
            />
          ))}
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Orders', value: '8,420', icon: <ShoppingCart size={14} className="text-[#2D9DBB]" /> },
            { label: 'Conversion', value: '4.8%', icon: <BarChart3 size={14} className="text-emerald-500" /> },
            { label: 'Avg Order', value: '₹2,960', icon: <Zap size={14} className="text-amber-500" /> },
          ].map(m => (
            <div key={m.label} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">{m.icon}<span className="text-xs text-slate-400">{m.label}</span></div>
              <p className="text-sm font-bold text-slate-800 dark:text-white">{m.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating notification */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.9 }}
        animate={{ y: [0, -6, 0] }}
        style={{ animateProps: ['y'] }}
        className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 rounded-xl shadow-card border border-slate-100 dark:border-slate-700 px-3 py-2.5 flex items-center gap-2.5 min-w-[160px]"
      >
        <div className="w-8 h-8 rounded-full bg-[#2D9DBB]/10 flex items-center justify-center flex-shrink-0">
          <ShoppingCart size={14} className="text-[#2D9DBB]" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-800 dark:text-white">New Order</p>
          <p className="text-[10px] text-slate-400">₹ 5,200 · just now</p>
        </div>
      </motion.div>

      {/* Floating growth badge */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute -bottom-4 -left-4 bg-[#2D9DBB] rounded-xl shadow-brand px-4 py-3 text-white"
      >
        <p className="text-[10px] font-medium opacity-80">Monthly Growth</p>
        <p className="text-lg font-bold">+120%</p>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-white via-slate-50/80 to-[#2D9DBB]/5 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-[#2D9DBB]/8 to-transparent rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-[#B8BDC9]/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(#2D9DBB 1px, transparent 1px), linear-gradient(90deg, #2D9DBB 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-[#2D9DBB]/10 border border-[#2D9DBB]/20 text-[#2D9DBB] text-sm font-semibold px-4 py-2 rounded-full mb-8">
              <Zap size={14} />
              Ecommerce Growth Platform
            </motion.div>

            <motion.h1 {...fadeUp(0.1)} className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.05] mb-6">
              Scale Your{' '}
              <span className="gradient-text">Ecommerce</span>{' '}
              Business Faster
            </motion.h1>

            <motion.p {...fadeUp(0.2)} className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-10 max-w-lg">
              Powerful ecommerce solutions designed to increase sales, optimize operations, and accelerate growth.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4">
              <a
                href="#cta"
                className="inline-flex items-center justify-center gap-2 gradient-brand text-white font-semibold px-7 py-3.5 rounded-xl hover:opacity-90 transition-all shadow-sm hover:shadow-brand hover:-translate-y-0.5 duration-200"
              >
                Get Started <ArrowRight size={18} />
              </a>
              <a
                href="#cta"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold px-7 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#2D9DBB] hover:text-[#2D9DBB] transition-all duration-200 shadow-sm"
              >
                <Play size={16} className="fill-current" /> Book Demo
              </a>
            </motion.div>

            {/* Social proof row */}
            <motion.div {...fadeUp(0.4)} className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-2">
                {['#2D9DBB', '#1e7a94', '#4db8d4', '#B8BDC9'].map((c, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-xs font-bold" style={{ background: c }}>
                    {['A', 'R', 'S', 'M'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-amber-400 text-sm">★</span>)}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Trusted by <strong className="text-slate-700 dark:text-slate-200">10,000+</strong> stores</p>
              </div>
            </motion.div>
          </div>

          {/* Right — dashboard */}
          <motion.div {...fadeUp(0.2)} className="hidden lg:block">
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
