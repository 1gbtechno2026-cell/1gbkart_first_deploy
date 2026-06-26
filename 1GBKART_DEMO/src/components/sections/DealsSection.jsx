import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react'
import CountdownTimer from './CountdownTimer'
import ProductCard from '../ProductCard'
import { dealProducts } from '../../data/products'

const END = Date.now() + 6 * 3600000

export default function DealsSection({ onQuickView }) {
  const ref = useRef(null)
  const scroll = (d) => ref.current?.scrollBy({ left: d * 300, behavior: 'smooth' })

  return (
    <section className="py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Zap size={18} className="text-red-500 fill-red-500" />
              <h2 className="text-xl font-black text-slate-900">Deals of the Day</h2>
            </div>
            <p className="text-xs text-slate-400">Limited time offers — don't miss out</p>
          </div>
          <CountdownTimer endMs={END} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#2D9DBB] cursor-pointer hover:underline">View All</span>
          <button onClick={() => scroll(-1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:border-[#2D9DBB] hover:text-[#2D9DBB] transition-all">
            <ChevronLeft size={14} />
          </button>
          <button onClick={() => scroll(1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:border-[#2D9DBB] hover:text-[#2D9DBB] transition-all">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div ref={ref} className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {dealProducts.map(p => (
          <div key={p.id} className="flex-shrink-0 w-64">
            <ProductCard product={p} onQuickView={onQuickView} />
          </div>
        ))}
      </div>
    </section>
  )
}
