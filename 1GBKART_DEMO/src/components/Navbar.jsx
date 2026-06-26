import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Mic, ShoppingCart, Heart, Bell, User, ChevronDown,
  MapPin, Package, Headphones, Menu, X, Zap
} from 'lucide-react'
import { useCart } from '../context/CartContext'

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2 select-none flex-shrink-0">
      <img
        src="/1gbkart logo .webp"
        alt="1GB KART"
        className="w-9 h-9 object-contain"
      />
      <span className="font-black text-lg tracking-tight hidden sm:block">
        <span className="text-[#B8BDC9]">1GB</span><span className="text-[#2D9DBB]">KART</span>
      </span>
    </a>
  )
}

export default function Navbar() {
  const { count, setCartOpen, wishlist } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [lastY, setLastY] = useState(0)
  const [visible, setVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchRef = useRef(null)

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY
      setScrolled(y > 10)
      setVisible(y < lastY || y < 60)
      setLastY(y)
    }
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [lastY])

  return (
    <motion.header
      animate={{ y: visible ? 0 : -120 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-100'
          : 'bg-white'
      }`}
    >
      {/* Top strip */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 bg-[#0F172A] text-white text-xs">
        <div className="flex items-center gap-1 text-slate-400">
          <Zap size={11} className="text-[#2D9DBB]" />
          <span>Flash Sale live now — up to 70% off!</span>
        </div>
        <div className="flex gap-5 text-slate-400">
          <span className="hover:text-white cursor-pointer transition-colors">Track Order</span>
          <span className="hover:text-white cursor-pointer transition-colors">Sell on 1GBKART</span>
          <span className="hover:text-white cursor-pointer transition-colors">Help</span>
        </div>
      </div>

      {/* Main bar */}
      <div className="px-4 lg:px-8 py-3">
        <div className="flex items-center gap-3 lg:gap-5 max-w-[1400px] mx-auto">
          <Logo />

          {/* Deliver to */}
          <button className="hidden lg:flex items-start gap-1.5 text-left hover:text-[#2D9DBB] transition-colors group flex-shrink-0">
            <MapPin size={16} className="text-[#2D9DBB] mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-400">Deliver to</p>
              <p className="text-xs font-bold text-slate-800 group-hover:text-[#2D9DBB] transition-colors">Mumbai 400001</p>
            </div>
          </button>

          {/* Search bar */}
          <div className="flex-1 relative">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:border-[#2D9DBB] focus-within:border-[#2D9DBB] focus-within:ring-2 focus-within:ring-[#2D9DBB]/20 transition-all">
              <Search size={16} className="ml-4 text-slate-400 flex-shrink-0" />
              <input
                ref={searchRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="What are you looking for today?"
                className="flex-1 px-3 py-2.5 text-sm bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
              />
              {query && (
                <button onClick={() => setQuery('')} className="p-2 text-slate-400 hover:text-slate-600">
                  <X size={14} />
                </button>
              )}
              <button className="px-3 py-2.5 text-slate-400 hover:text-[#2D9DBB] border-l border-slate-200 transition-colors">
                <Mic size={16} />
              </button>
              <button className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 bg-[#2D9DBB] text-white text-sm font-semibold hover:bg-[#1e7a94] transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Right icons */}
          <div className="hidden md:flex items-center gap-1">
            {/* Account */}
            <button className="flex flex-col items-center px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors group">
              <User size={20} className="text-slate-600 group-hover:text-[#2D9DBB] transition-colors" />
              <span className="text-[10px] text-slate-500 mt-0.5 hidden lg:block">Account</span>
            </button>

            {/* Orders */}
            <button className="flex flex-col items-center px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors group">
              <Package size={20} className="text-slate-600 group-hover:text-[#2D9DBB] transition-colors" />
              <span className="text-[10px] text-slate-500 mt-0.5 hidden lg:block">Orders</span>
            </button>

            {/* Wishlist */}
            <button className="relative flex flex-col items-center px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors group">
              <Heart size={20} className="text-slate-600 group-hover:text-rose-500 transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
              <span className="text-[10px] text-slate-500 mt-0.5 hidden lg:block">Wishlist</span>
            </button>

            {/* Support */}
            <button className="flex flex-col items-center px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors group">
              <Headphones size={20} className="text-slate-600 group-hover:text-[#2D9DBB] transition-colors" />
              <span className="text-[10px] text-slate-500 mt-0.5 hidden lg:block">Support</span>
            </button>

            {/* Cart */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setCartOpen(true)}
              className="relative flex flex-col items-center px-3 py-1.5 rounded-xl hover:bg-[#2D9DBB]/10 transition-colors group"
            >
              <div className="relative">
                <ShoppingCart size={22} className="text-[#2D9DBB]" />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key={count}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#2D9DBB] text-white text-[10px] font-bold flex items-center justify-center"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="text-[10px] text-[#2D9DBB] font-semibold mt-0.5 hidden lg:block">Cart</span>
            </motion.button>
          </div>

          {/* Mobile cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="md:hidden relative p-2 rounded-xl hover:bg-slate-50"
          >
            <ShoppingCart size={22} className="text-[#2D9DBB]" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#2D9DBB] text-white text-[9px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          <button onClick={() => setMobileOpen(o => !o)} className="md:hidden p-2 rounded-xl hover:bg-slate-50">
            {mobileOpen ? <X size={22} className="text-slate-600" /> : <Menu size={22} className="text-slate-600" />}
          </button>
        </div>
      </div>

      {/* Category nav — desktop */}
      <div className="hidden lg:flex items-center gap-6 px-8 py-2 border-t border-slate-100 bg-white max-w-[1400px] mx-auto">
        {['All Categories','Mobile Phones','Laptops','Earphones','Neckbands','TV','New Arrivals','Deals'].map((cat, i) => (
          <button
            key={cat}
            className={`text-xs font-semibold whitespace-nowrap transition-colors ${
              i === 0 ? 'text-[#2D9DBB]' : 'text-slate-600 hover:text-[#2D9DBB]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Category pills — mobile horizontal scroll */}
      <div className="lg:hidden flex gap-2 overflow-x-auto px-4 pb-2 pt-1 border-t border-slate-100 bg-white" style={{ scrollbarWidth: 'none' }}>
        {['All','Mobiles','Laptops','Earphones','Neckbands','TV','Deals'].map((cat, i) => (
          <button
            key={cat}
            className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors ${
              i === 0
                ? 'bg-[#2D9DBB] text-white border-[#2D9DBB]'
                : 'text-slate-600 border-slate-200 hover:border-[#2D9DBB] hover:text-[#2D9DBB]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {[
                { label: 'My Account', icon: '👤' },
                { label: 'My Orders', icon: '📦' },
                { label: 'Wishlist', icon: '❤️' },
                { label: 'Support', icon: '🎧' },
                { label: 'Track Order', icon: '🚚' },
              ].map(l => (
                <button key={l.label} className="flex items-center gap-3 text-sm font-medium text-slate-700 text-left px-2 py-3 border-b border-slate-50 hover:text-[#2D9DBB] transition-colors">
                  <span className="text-base">{l.icon}</span> {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
