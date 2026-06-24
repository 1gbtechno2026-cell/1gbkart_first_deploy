import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function Counter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

const metrics = [
  { prefix: '', target: 120, suffix: '%', label: 'Revenue Growth', sub: 'Year over year average' },
  { prefix: '', target: 48, suffix: '%', label: 'Conversion Lift', sub: 'After platform migration' },
  { prefix: '', target: 94, suffix: '%', label: 'Customer Retention', sub: 'Across all managed stores' },
  { prefix: '<', target: 2, suffix: 's', label: 'Order Processing', sub: 'Average fulfilment trigger' },
]

export default function Metrics() {
  return (
    <section id="metrics" className="py-24 relative overflow-hidden bg-[#0d1b2e] dark:bg-[#060d17]">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#2D9DBB]/10 blur-[100px] rounded-full" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'linear-gradient(#2D9DBB 1px, transparent 1px), linear-gradient(90deg, #2D9DBB 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold text-[#2D9DBB] uppercase tracking-widest bg-[#2D9DBB]/15 px-4 py-1.5 rounded-full mb-4">
            Growth Numbers
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
            The Results Speak for Themselves
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-2xl p-8 text-center group hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-5xl lg:text-6xl font-bold text-white mb-2 tabular-nums">
                <Counter target={m.target} suffix={m.suffix} prefix={m.prefix} />
              </div>
              <div className="text-base font-semibold text-[#2D9DBB] mb-1">{m.label}</div>
              <div className="text-xs text-slate-400">{m.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
