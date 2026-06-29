import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart, ShoppingCart, Zap, Star, ChevronLeft, ChevronRight,
  Share2, Shield, Truck, RotateCcw, ArrowLeft, Check,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} size={14} className={s <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'} />
      ))}
    </div>
  )
}

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, toggleWishlist, wishlist } = useCart()

  const product = products.find(p => p.id === Number(id))
  const [imgIdx, setImgIdx] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [buying, setBuying] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(0)

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-4">
        <p className="text-5xl">📦</p>
        <p className="text-xl font-black text-slate-700">Product not found</p>
        <Link to="/" className="text-[#2D9DBB] font-bold hover:underline">← Back to Home</Link>
      </div>
    )
  }

  // Build image gallery from product (duplicate image for demo multi-shot)
  const images = [product.image, product.image, product.image]

  // Build variants from product features (color / storage splits)
  const VARIANTS = [
    { label: product.color || 'Variant 1', storage: product.storage, price: product.price },
    { label: 'Black', storage: product.storage, price: Math.round(product.price * 1.05) },
    { label: 'White', storage: '256 GB', price: Math.round(product.price * 1.12) },
  ]

  const currentVariant = VARIANTS[selectedVariant]
  const isFav = wishlist.includes(product.id)

  const handleAddToCart = () => {
    addToCart({ ...product, qty })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const handleBuyNow = () => {
    setBuying(true)
    addToCart({ ...product, qty })
    setTimeout(() => { setBuying(false); navigate('/cart') }, 600)
  }

  const trust = [
    { icon: <Truck size={14} />, text: 'FREE Delivery', sub: product.delivery },
    { icon: <RotateCcw size={14} />, text: '10-Day Returns', sub: 'Easy hassle-free' },
    { icon: <Shield size={14} />, text: 'Secure Pay', sub: '256-bit encryption' },
  ]

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-8 pt-[118px] lg:pt-[132px] pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 pt-2">
          <Link to="/" className="hover:text-[#2D9DBB] transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/category/${product.category.toLowerCase().replace(/ /g, '-')}`} className="hover:text-[#2D9DBB] transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold truncate max-w-[160px]">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
          {/* ── Left: Image gallery ── */}
          <div className="space-y-3">
            {/* Main image */}
            <div className="relative bg-white rounded-2xl border border-slate-100 overflow-hidden aspect-square">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIdx}
                  src={images[imgIdx]}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Nav arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setImgIdx(i => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}

              {/* Discount badge */}
              <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg">
                -{product.discount}% OFF
              </span>

              {/* Wishlist */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center"
              >
                <Heart size={16} className={isFav ? 'text-rose-500 fill-rose-500' : 'text-slate-400'} />
              </motion.button>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    imgIdx === i ? 'border-[#2D9DBB]' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Product info ── */}
          <div className="space-y-5">
            {/* Brand + title */}
            <div>
              <p className="text-xs font-bold text-[#2D9DBB] uppercase tracking-widest mb-1">{product.brand}</p>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{product.name}</h1>
              <p className="text-sm text-slate-500 mt-2">{product.desc}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <Stars rating={product.rating} />
              <span className="text-sm font-bold text-slate-800">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="bg-slate-50 rounded-2xl p-4">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-black text-slate-900">₹{currentVariant.price.toLocaleString()}</span>
                <span className="text-sm text-slate-400 line-through">₹{product.mrp.toLocaleString()}</span>
                <span className="text-sm font-bold text-green-600">{product.discount}% off</span>
              </div>
              <p className="text-xs text-slate-500">Min order: {product.minOrder || 1} unit(s) · <span className="text-green-600 font-semibold">FREE delivery</span> · {product.delivery}</p>
            </div>

            {/* Variants */}
            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Model / Variant</p>
              <div className="flex flex-wrap gap-2">
                {VARIANTS.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedVariant(i)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                      selectedVariant === i
                        ? 'border-[#2D9DBB] bg-[#2D9DBB]/10 text-[#2D9DBB]'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {v.label} · {v.storage}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors font-bold text-lg"
                  >
                    −
                  </button>
                  <span className="w-10 h-10 flex items-center justify-center font-black text-slate-900 text-sm border-x-2 border-slate-200">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors font-bold text-lg"
                  >
                    +
                  </button>
                </div>
                {product.stock < 20 && (
                  <span className="text-xs font-bold text-red-500">Only {product.stock} left!</span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm border-2 transition-all ${
                  added
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-[#2D9DBB] text-[#2D9DBB] hover:bg-[#2D9DBB] hover:text-white'
                }`}
              >
                {added ? <Check size={16} /> : <ShoppingCart size={16} />}
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-[#1e7a94] text-white hover:bg-[#2D9DBB] transition-colors"
              >
                <Zap size={16} /> {buying ? 'Processing…' : 'Buy Now'}
              </motion.button>
            </div>

            {/* Add to Wishlist */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-rose-500 transition-colors"
            >
              <Heart size={15} className={isFav ? 'text-rose-500 fill-rose-500' : ''} />
              {isFav ? 'Saved to Wishlist' : 'Add to Favourites'}
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {trust.map(t => (
                <div key={t.text} className="flex flex-col items-center text-center bg-slate-50 rounded-xl p-3 gap-1">
                  <span className="text-[#2D9DBB]">{t.icon}</span>
                  <p className="text-[10px] font-bold text-slate-700">{t.text}</p>
                  <p className="text-[9px] text-slate-400">{t.sub}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            {product.features && (
              <div>
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Key Features</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.features.split('|').map(f => (
                    <span key={f} className="text-[10px] bg-[#2D9DBB]/10 text-[#2D9DBB] font-semibold px-2 py-1 rounded-lg">{f.trim()}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
