import { motion } from 'framer-motion'

// Each brand card: real product photo background + brand identity
const BRAND_CARDS = [
  {
    id: 1,
    name: 'Apple',
    tagline: 'iPhone 16 Series',
    products: ['iPhone 16', 'iPhone 16 Plus', 'iPhone 16 Pro'],
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&q=85',
    gradient: 'from-black/80 via-black/40 to-transparent',
    accent: '#fff',
    bg: 'bg-slate-900',
  },
  {
    id: 2,
    name: 'Samsung',
    tagline: 'Galaxy S25 Series',
    products: ['Galaxy S25', 'Galaxy S25+', 'Galaxy S25 Ultra'],
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop&q=85',
    gradient: 'from-blue-950/85 via-blue-900/40 to-transparent',
    accent: '#60a5fa',
    bg: 'bg-blue-950',
  },
  {
    id: 3,
    name: 'Motorola',
    tagline: 'Edge & Razr Line',
    products: ['Moto Edge 50', 'Moto G85', 'Razr 50'],
    image: 'https://images.unsplash.com/photo-1584473457409-ae5c91d211ff?w=600&h=600&fit=crop&q=85',
    gradient: 'from-slate-900/85 via-slate-800/40 to-transparent',
    accent: '#94a3b8',
    bg: 'bg-slate-800',
  },
  {
    id: 4,
    name: 'POCO',
    tagline: 'Flagship Killers',
    products: ['POCO X7 Pro', 'POCO M7 Pro', 'POCO F7'],
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop&q=85',
    gradient: 'from-yellow-900/85 via-yellow-800/40 to-transparent',
    accent: '#fbbf24',
    bg: 'bg-yellow-900',
  },
]

export default function BrandSection() {
  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-black text-slate-900">Brand in Spotlight</h2>
          <p className="text-xs text-slate-400 mt-0.5">Featured brands — products we want you to discover</p>
        </div>
        <span className="text-xs font-semibold text-[#2D9DBB] cursor-pointer hover:underline transition-colors">View All →</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {BRAND_CARDS.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -5, scale: 1.01 }}
            className={`relative rounded-2xl overflow-hidden cursor-pointer group aspect-[3/4] ${b.bg}`}
            style={{ minHeight: '200px' }}
          >
            {/* Product photo */}
            <img
              src={b.image}
              alt={b.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient overlay bottom-up */}
            <div className={`absolute inset-0 bg-gradient-to-t ${b.gradient}`} />

            {/* Content pinned to bottom */}
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: b.accent }}>
                {b.tagline}
              </p>
              <h3 className="text-base sm:text-lg font-black text-white mb-1.5">{b.name}</h3>

              {/* Mini product list */}
              <ul className="hidden sm:block mb-3 space-y-0.5">
                {b.products.map(p => (
                  <li key={p} className="text-[10px] text-white/70">{p}</li>
                ))}
              </ul>

              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-xl group-hover:bg-[#2D9DBB] transition-colors">
                Shop All →
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
