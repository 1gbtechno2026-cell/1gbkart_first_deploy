import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const reviews = [
  {
    name: 'Arjun Mehta',
    role: 'Founder, StyleNest',
    avatar: 'AM',
    avatarBg: '#2D9DBB',
    text: '1GB KART completely transformed our D2C brand. Revenue tripled within 6 months of launch. The team understands ecommerce at a level I haven\'t seen elsewhere.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Digital, OrganicLeaf',
    avatar: 'PS',
    avatarBg: '#1e7a94',
    text: 'Our marketplace integrations were a nightmare before 1GB KART. Now everything syncs perfectly — Amazon, Flipkart, and our own store. Inventory errors dropped to zero.',
    rating: 5,
  },
  {
    name: 'Rohan Kapoor',
    role: 'CEO, TechGadgets India',
    avatar: 'RK',
    avatarBg: '#4db8d4',
    text: 'The analytics dashboard alone is worth it. We can finally see exactly which products and campaigns drive profit, not just revenue. Absolutely game-changing.',
    rating: 5,
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const timerRef = useRef(null)

  const start = () => {
    timerRef.current = setInterval(() => {
      setActive(a => (a + 1) % reviews.length)
    }, 4000)
  }

  useEffect(() => {
    start()
    return () => clearInterval(timerRef.current)
  }, [])

  const pause = () => clearInterval(timerRef.current)
  const resume = () => start()

  return (
    <section id="testimonials" className="py-10 sm:py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-[#2D9DBB]/5 dark:from-slate-900 dark:to-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <span className="inline-block text-xs font-bold text-[#2D9DBB] uppercase tracking-widest bg-[#2D9DBB]/10 px-4 py-1.5 rounded-full mb-3 sm:mb-4">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Loved by Founders & Teams
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6" onMouseEnter={pause} onMouseLeave={resume}>
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => setActive(i)}
              className={`glass-dark relative cursor-pointer rounded-2xl p-4 sm:p-7 transition-all duration-300 ${
                active === i
                  ? 'ring-2 ring-[#2D9DBB] shadow-brand scale-[1.02] bg-white/10'
                  : 'hover:bg-white/5 bg-slate-800/30 dark:bg-slate-800/40'
              }`}
            >
              <Quote
                size={28}
                className="text-[#2D9DBB] opacity-60 mb-4"
              />
              <p className="text-slate-200 dark:text-slate-200 text-sm leading-relaxed mb-6">
                "{r.text}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: r.avatarBg }}
                >
                  {r.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  <p className="text-xs text-slate-400">{r.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(r.rating)].map((_, s) => (
                    <span key={s} className="text-amber-400 text-xs">★</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${
                active === i ? 'bg-[#2D9DBB] w-6 h-2' : 'bg-slate-300 dark:bg-slate-600 w-2 h-2'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
