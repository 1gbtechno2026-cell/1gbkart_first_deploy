import { motion } from 'framer-motion'

const banners = [
  {
    title: 'Up to 40% Off',
    sub: 'New Smartphone Arrivals',
    emoji: '📱',
    bg: 'from-[#0f4c75] to-[#2D9DBB]',
    cta: 'Shop Now',
  },
  {
    title: 'Bulk Laptop Deals',
    sub: 'Corporate & B2B Procurement',
    emoji: '💻',
    bg: 'from-[#1a1a2e] to-[#374151]',
    cta: 'Get Quote',
  },
]

export default function PromoBanners() {
  return (
    <section className="grid sm:grid-cols-2 gap-4 py-2">
      {banners.map((b, i) => (
        <motion.div
          key={b.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.01 }}
          className={`relative bg-gradient-to-br ${b.bg} rounded-2xl sm:rounded-3xl p-5 sm:p-7 overflow-hidden cursor-pointer group`}
        >
          <div className="relative z-10">
            <p className="text-white/70 text-xs font-semibold tracking-wide mb-1">{b.sub}</p>
            <h3 className="text-lg sm:text-2xl font-black text-white mb-3 sm:mb-4">{b.title}</h3>
            <button className="px-4 sm:px-5 py-2 bg-white text-slate-900 font-bold text-xs sm:text-sm rounded-xl hover:bg-white/90 transition-colors">
              {b.cta} →
            </button>
          </div>
          <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-5xl sm:text-7xl select-none"
            style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.25))' }}>
            <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              {b.emoji}
            </motion.span>
          </div>
          <div className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        </motion.div>
      ))}
    </section>
  )
}
