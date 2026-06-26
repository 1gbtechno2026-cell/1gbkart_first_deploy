import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Zap, Heart, Star, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

const storageOptions = ['64 GB', '128 GB', '256 GB', '512 GB', '1 TB']
const colorOptions = ['#1C1C1E', '#E8E1D9', '#2C4F6A', '#4A7C59']

export default function QuickViewModal() {
  const { quickView: product, setQuickView, addToCart, toggleWishlist, wishlist } = useCart()
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(2)

  if (!product) return null

  const images = [
    product.image,
    `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&q=80`,
    `https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop&q=80`,
  ]

  const isFav = wishlist.includes(product.id)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product)
    setQuickView(null)
  }

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setQuickView(null)}
        className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4"
      >
        {/* Modal: slides up on mobile, scales in on desktop */}
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
          className="bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Mobile drag handle */}
          <div className="sm:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-slate-200" />
          </div>
          <div className="grid md:grid-cols-2">
            {/* Images */}
            <div className="relative bg-slate-50">
              <div className="relative aspect-square overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    src={images[activeImg]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <button onClick={() => setActiveImg(a => (a - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => setActiveImg(a => (a + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white">
                  <ChevronRight size={16} />
                </button>
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2 p-3">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? 'border-[#2D9DBB]' : 'border-slate-200'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 relative">
              {/* Close */}
              <button onClick={() => setQuickView(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                <X size={16} />
              </button>

              <div>
                <span className="text-xs font-bold text-[#2D9DBB] uppercase tracking-wider">{product.brand}</span>
                <h2 className="text-lg font-bold text-slate-900 mt-1 pr-8">{product.name}</h2>
                <p className="text-sm text-slate-500 mt-1">{product.desc}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={14} className={s <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'} />
                  ))}
                </div>
                <span className="text-sm font-bold">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviews.toLocaleString()} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-slate-900">₹{product.price.toLocaleString()}</span>
                <span className="text-sm text-slate-400 line-through">₹{product.mrp.toLocaleString()}</span>
                <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-lg">{product.discount}% OFF</span>
              </div>

              {/* Colors */}
              <div>
                <p className="text-xs font-bold text-slate-600 mb-2">Color</p>
                <div className="flex gap-2">
                  {colorOptions.map((c, i) => (
                    <button key={c} onClick={() => setSelectedColor(i)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${selectedColor === i ? 'border-[#2D9DBB] scale-110' : 'border-transparent'}`}
                      style={{ background: c }} />
                  ))}
                </div>
              </div>

              {/* Storage */}
              <div>
                <p className="text-xs font-bold text-slate-600 mb-2">Storage</p>
                <div className="flex flex-wrap gap-2">
                  {storageOptions.map((s, i) => (
                    <button key={s} onClick={() => setSelectedSize(i)}
                      className={`px-3 h-9 rounded-lg text-xs font-bold border-2 transition-all ${selectedSize === i ? 'border-[#2D9DBB] bg-[#2D9DBB]/10 text-[#2D9DBB]' : 'border-slate-200 text-slate-600 hover:border-[#2D9DBB]'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Qty */}
              <div className="flex items-center gap-3">
                <p className="text-xs font-bold text-slate-600">Qty:</p>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold">−</button>
                  <span className="w-10 text-center text-sm font-bold">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold">+</button>
                </div>
              </div>

              {/* Delivery info */}
              <div className="flex flex-col gap-1.5 text-xs text-slate-600 bg-slate-50 rounded-xl p-3">
                <div className="flex items-center gap-2"><Truck size={13} className="text-[#2D9DBB]" /> FREE delivery · {product.delivery}</div>
                <div className="flex items-center gap-2"><Shield size={13} className="text-green-500" /> 1-year warranty</div>
                <div className="flex items-center gap-2"><RotateCcw size={13} className="text-blue-500" /> 10-day easy returns</div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-auto">
                <button onClick={handleAdd}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#2D9DBB] text-[#2D9DBB] font-bold text-sm hover:bg-[#2D9DBB] hover:text-white transition-all">
                  <ShoppingCart size={16} /> Add to Cart
                </button>
                <button onClick={handleAdd}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1e7a94] text-white font-bold text-sm hover:bg-[#2D9DBB] transition-colors">
                  <Zap size={16} /> Buy Now
                </button>
                <button onClick={() => toggleWishlist(product.id)}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center border-2 transition-all ${isFav ? 'border-rose-500 bg-rose-50' : 'border-slate-200 hover:border-rose-300'}`}>
                  <Heart size={16} className={isFav ? 'text-rose-500 fill-rose-500' : 'text-slate-400'} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
