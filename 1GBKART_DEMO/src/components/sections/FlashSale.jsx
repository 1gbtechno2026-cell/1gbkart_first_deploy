import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Zap, ChevronLeft, ChevronRight } from 'lucide-react'
import CountdownTimer from './CountdownTimer'
import { useCart } from '../../context/CartContext'
import { flashSaleProducts } from '../../data/products'

const END = Date.now() + 2 * 3600000 + 28 * 60000

const stockPercent = (stock) => Math.max(10, Math.min(90, 100 - stock * 2))

export default function FlashSale({ onQuickView }) {
  const { addToCart } = useCart()
  const ref = useRef(null)
  const scroll = (d) => ref.current?.scrollBy({ left: d * 260, behavior: 'smooth' })

  return (
    <section className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#092533] via-[#0e4d63] to-[#2D9DBB] p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
            <Zap size={20} className="text-white fill-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Flash Sale</h2>
            <p className="text-xs text-slate-400">Limited quantity — hurry!</p>
          </div>
          <CountdownTimer endMs={END} />
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} className="w-8 h-8 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-all">
            <ChevronLeft size={14} />
          </button>
          <button onClick={() => scroll(1)} className="w-8 h-8 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-all">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div ref={ref} className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {flashSaleProducts.map((p, i) => {
          const sold = stockPercent(p.stock)
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 w-52 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all group cursor-pointer"
              onClick={() => onQuickView?.(p)}
            >
              <div className="relative aspect-square overflow-hidden bg-white/5">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-lg">
                  -{p.discount}% OFF
                </span>
                {p.isNew && (
                  <span className="absolute top-2 right-2 bg-[#2D9DBB] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-lg">NEW</span>
                )}
              </div>
              <div className="p-3">
                <p className="text-[10px] text-[#2D9DBB] font-bold uppercase">{p.brand}</p>
                <p className="text-xs font-semibold text-white line-clamp-2 mt-0.5">{p.name}</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-sm font-black text-white">₹{p.price.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 line-through">₹{p.mrp.toLocaleString()}</span>
                </div>

                {/* Stock bar */}
                <div className="mt-2 mb-2">
                  <div className="flex justify-between text-[9px] text-slate-400 mb-1">
                    <span>Sold {sold}%</span>
                    <span className="text-red-400 font-semibold">Only {p.stock} left</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${sold}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.15 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#2D9DBB] to-red-400"
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); addToCart(p) }}
                  className="w-full py-2 bg-[#2D9DBB] text-white text-[11px] font-bold rounded-xl hover:bg-[#1e7a94] transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
