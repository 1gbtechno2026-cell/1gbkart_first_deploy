import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { heroBanners } from '../../data/products'

export default function HeroCarousel() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)

  const go = useCallback((next) => {
    setDir(next > active ? 1 : -1)
    setActive(next)
  }, [active])

  const prev = () => go((active - 1 + heroBanners.length) % heroBanners.length)
  const next = () => go((active + 1) % heroBanners.length)

  useEffect(() => {
    const t = setInterval(next, 4500)
    return () => clearInterval(t)
  }, [active])

  const variants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl lg:rounded-3xl" style={{ height: 'clamp(220px, 40vw, 480px)' }}>
      <AnimatePresence custom={dir} initial={false}>
        <motion.div
          key={active}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute inset-0 bg-gradient-to-br ${heroBanners[active].bg} flex items-center overflow-hidden`}
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-5 left-5 lg:top-7 lg:left-8 text-xs font-black tracking-widest px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/20"
          >
            {heroBanners[active].badge}
          </motion.span>

          {/* Text */}
          <div className="px-8 lg:px-16 z-10 max-w-md">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-white/70 text-sm font-semibold tracking-wide mb-1"
            >
              {heroBanners[active].subtitle}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white font-black leading-tight mb-3"
              style={{ fontSize: 'clamp(24px, 4vw, 52px)' }}
            >
              {heroBanners[active].title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/80 text-sm mb-6 hidden sm:block"
            >
              {heroBanners[active].desc}
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="bg-white text-slate-900 font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/90 transition-colors shadow-lg"
            >
              {heroBanners[active].cta} →
            </motion.button>
          </div>

          {/* Emoji float */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="absolute right-8 lg:right-20 bottom-0 text-[80px] lg:text-[120px] leading-none select-none"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
          >
            <motion.span
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="block"
            >
              {heroBanners[active].emoji.split('').slice(0, 2).join('')}
            </motion.span>
          </motion.div>

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Nav arrows */}
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center hover:bg-white transition-all">
        <ChevronLeft size={18} className="text-slate-700" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center hover:bg-white transition-all">
        <ChevronRight size={18} className="text-slate-700" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroBanners.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`rounded-full transition-all duration-300 ${active === i ? 'bg-white w-6 h-2' : 'bg-white/40 w-2 h-2'}`}
          />
        ))}
      </div>
    </div>
  )
}
