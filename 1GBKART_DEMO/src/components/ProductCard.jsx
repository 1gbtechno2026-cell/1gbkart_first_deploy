import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingCart, Eye, Share2, Zap, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'

function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star
          key={s}
          size={11}
          className={s <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}
        />
      ))}
    </div>
  )
}

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, toggleWishlist, wishlist, recentlyAdded } = useCart()
  const [imgErr, setImgErr] = useState(false)
  const [hover, setHover] = useState(false)
  const [buying, setBuying] = useState(false)

  const isFav = wishlist.includes(product.id)
  const justAdded = recentlyAdded === product.id

  const handleBuyNow = () => {
    setBuying(true)
    addToCart(product)
    setTimeout(() => setBuying(false), 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-[#2D9DBB]/30 hover:shadow-[0_8px_40px_rgba(45,157,187,0.15)] transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-slate-50" style={{ aspectRatio: '1/1' }}>
        <motion.img
          src={imgErr ? 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&q=80' : product.image}
          alt={product.name}
          onError={() => setImgErr(true)}
          animate={{ scale: hover ? 1.06 : 1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay on hover */}
        <AnimatePresence>
          {hover && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
            />
          )}
        </AnimatePresence>

        {/* Badge top-left */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 text-[10px] font-black px-2 py-0.5 rounded-lg bg-[#2D9DBB] text-white shadow-sm z-10">
            {product.badge}
          </span>
        )}

        {/* Discount badge */}
        <span className="absolute top-2.5 right-10 text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500 text-white z-10">
          -{product.discount}%
        </span>

        {/* Wishlist */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id) }}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center z-10 hover:shadow-md transition-shadow"
        >
          <Heart size={13} className={isFav ? 'text-rose-500 fill-rose-500' : 'text-slate-400'} />
        </motion.button>

        {/* Quick actions overlay */}
        <AnimatePresence>
          {hover && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10"
            >
              {[
                { icon: <Eye size={13} />, label: 'Quick View', action: () => onQuickView?.(product) },
                { icon: <Share2 size={13} />, label: 'Share', action: () => {} },
              ].map(a => (
                <button
                  key={a.label}
                  onClick={(e) => { e.stopPropagation(); a.action() }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm text-slate-700 text-[10px] font-semibold shadow hover:bg-[#2D9DBB] hover:text-white transition-all"
                >
                  {a.icon} {a.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] font-bold text-[#2D9DBB] uppercase tracking-wide mb-0.5">{product.brand}</p>
        <h3 className="text-sm font-semibold text-slate-800 leading-tight mb-1 line-clamp-2 group-hover:text-[#2D9DBB] transition-colors">
          {product.name}
        </h3>
        <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">{product.desc}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <RatingStars rating={product.rating} />
          <span className="text-[10px] font-bold text-slate-700">{product.rating}</span>
          <span className="text-[10px] text-slate-400">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-base font-black text-slate-900">₹{product.price.toLocaleString()}</span>
          <span className="text-xs text-slate-400 line-through">₹{product.mrp.toLocaleString()}</span>
          <span className="text-xs font-bold text-green-600">{product.discount}% off</span>
        </div>

        {/* Delivery */}
        <p className="text-[10px] text-slate-400 mb-3">
          <span className="text-green-600 font-semibold">FREE delivery</span> · {product.delivery}
        </p>

        {/* Stock indicator */}
        {product.stock < 20 && (
          <p className="text-[10px] text-red-500 font-semibold mb-2">Only {product.stock} left!</p>
        )}

        {/* Buttons — pinned to bottom */}
        <div className="flex gap-2 mt-auto">
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => addToCart(product)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${
              justAdded
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-[#2D9DBB] text-[#2D9DBB] hover:bg-[#2D9DBB] hover:text-white'
            }`}
          >
            <ShoppingCart size={13} />
            {justAdded ? 'Added!' : 'Add to Cart'}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-[#1e7a94] text-white hover:bg-[#2D9DBB] transition-colors"
          >
            <Zap size={13} />
            {buying ? '...' : 'Buy Now'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
