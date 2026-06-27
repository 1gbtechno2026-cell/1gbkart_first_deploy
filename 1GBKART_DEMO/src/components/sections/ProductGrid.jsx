import { useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Sparkles } from 'lucide-react'
import ProductCard from '../ProductCard'
import { products, trendingProducts, newArrivals } from '../../data/products'

const tabs = [
  { id: 'trending', label: 'Trending', icon: <Flame size={14} />, data: trendingProducts },
  { id: 'new', label: 'New Arrivals', icon: <Sparkles size={14} />, data: newArrivals },
  { id: 'all', label: 'All Products', icon: null, data: products },
]

export default function ProductGrid({ onQuickView }) {
  const [active, setActive] = useState('trending')
  const [visible, setVisible] = useState(8)
  const current = tabs.find(t => t.id === active)

  return (
    <section className="py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <div>
            <div className="flex items-center gap-2">
              <Flame size={18} className="text-orange-500 fill-orange-400" />
              <h2 className="text-lg sm:text-xl font-black text-slate-900">Trendy Products</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Hot selling — trending most on our platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#2D9DBB] cursor-pointer hover:underline transition-colors whitespace-nowrap">View ALL →</span>
          {/* Tabs — scrollable on mobile */}
          <div className="flex gap-1 bg-slate-100 rounded-xl p-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => { setActive(t.id); setVisible(8) }}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  active === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {t.icon}{t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {current.data.slice(0, visible).map(p => (
          <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
        ))}
      </div>

      {visible < current.data.length && (
        <div className="text-center mt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setVisible(v => v + 8)}
            className="px-8 py-3 border-2 border-[#2D9DBB] text-[#2D9DBB] font-bold rounded-xl hover:bg-[#2D9DBB] hover:text-white transition-all text-sm"
          >
            Load More Products
          </motion.button>
        </div>
      )}
    </section>
  )
}
