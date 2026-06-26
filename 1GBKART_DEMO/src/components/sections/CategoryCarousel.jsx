import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { categories } from '../../data/products'

export default function CategoryCarousel() {
  const ref = useRef(null)

  const scroll = (d) => {
    ref.current?.scrollBy({ left: d * 240, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900">Shop by Category</h2>
          <p className="text-xs text-slate-400 mt-0.5">Explore our wide range</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:border-[#2D9DBB] hover:text-[#2D9DBB] transition-all">
            <ChevronLeft size={15} />
          </button>
          <button onClick={() => scroll(1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:border-[#2D9DBB] hover:text-[#2D9DBB] transition-all">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat, i) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.94 }}
            className="flex-shrink-0 flex flex-col items-center gap-2 group"
          >
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:shadow-md transition-all duration-200`}>
              {cat.icon}
            </div>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-700 group-hover:text-[#2D9DBB] transition-colors whitespace-nowrap">
              {cat.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
