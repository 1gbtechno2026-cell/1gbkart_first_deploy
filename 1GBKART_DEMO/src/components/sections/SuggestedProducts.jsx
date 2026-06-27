import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import ProductCard from '../ProductCard'
import { trendingProducts } from '../../data/products'

// Use last 4 trending products as "suggested" (same data shape, different framing)
const suggested = trendingProducts.slice(4, 8).length >= 4
  ? trendingProducts.slice(4, 8)
  : trendingProducts.slice(0, 4)

export default function SuggestedProducts({ onQuickView }) {
  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-violet-500 fill-violet-400" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900">Suggested Products</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Based on recent purchases — relevant picks at better prices
          </p>
        </div>
        <span className="text-xs font-semibold text-[#2D9DBB] cursor-pointer hover:underline transition-colors whitespace-nowrap">
          View ALL →
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {suggested.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: i * 0.08 }}
          >
            <ProductCard product={p} onQuickView={onQuickView} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
