import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Trash2, Plus, Minus, Zap, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const { items, cartOpen, setCartOpen, dispatch, total, count } = useCart()

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[101] w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} className="text-[#2D9DBB]" />
                <h2 className="font-bold text-slate-900">Your Cart</h2>
                {count > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#2D9DBB] text-white text-[10px] font-bold flex items-center justify-center">
                    {count}
                  </span>
                )}
              </div>
              <button onClick={() => setCartOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-64 text-center"
                  >
                    <div className="text-6xl mb-4">🛒</div>
                    <p className="font-semibold text-slate-700">Your cart is empty</p>
                    <p className="text-sm text-slate-400 mt-1">Start shopping to add items</p>
                    <button onClick={() => setCartOpen(false)} className="mt-5 px-6 py-2.5 bg-[#2D9DBB] text-white rounded-xl text-sm font-semibold hover:bg-[#1e7a94] transition-colors">
                      Explore Products
                    </button>
                  </motion.div>
                ) : (
                  items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-3 bg-slate-50 rounded-2xl p-3"
                    >
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl flex-shrink-0 bg-white" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-[#2D9DBB] uppercase">{item.brand}</p>
                        <p className="text-sm font-semibold text-slate-800 line-clamp-2 leading-tight mt-0.5">{item.name}</p>
                        <p className="text-base font-black text-slate-900 mt-1">₹{item.price.toLocaleString()}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-slate-200 bg-white rounded-lg overflow-hidden">
                            <button onClick={() => dispatch({ type: 'DEC', id: item.id })} className="w-7 h-7 flex items-center justify-center hover:bg-slate-50 text-slate-600">
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-xs font-bold">{item.qty}</span>
                            <button onClick={() => dispatch({ type: 'INC', id: item.id })} className="w-7 h-7 flex items-center justify-center hover:bg-slate-50 text-slate-600">
                              <Plus size={12} />
                            </button>
                          </div>
                          <button onClick={() => dispatch({ type: 'REMOVE', id: item.id })} className="text-slate-300 hover:text-red-400 transition-colors p-1">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-slate-100 px-5 py-5 space-y-3">
                {/* Savings */}
                <div className="flex items-center justify-between text-xs text-green-600 font-semibold bg-green-50 px-3 py-2 rounded-xl">
                  <span>🎉 You're saving</span>
                  <span>₹{items.reduce((s, i) => s + (i.mrp - i.price) * i.qty, 0).toLocaleString()}</span>
                </div>

                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Subtotal ({count} items)</span>
                  <span className="text-base font-black text-slate-900">₹{total.toLocaleString()}</span>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#2D9DBB] text-white font-bold rounded-xl hover:bg-[#1e7a94] transition-colors shadow-sm">
                  <Zap size={16} /> Proceed to Checkout <ArrowRight size={16} />
                </button>
                <button className="w-full text-center text-sm text-slate-500 hover:text-[#2D9DBB] transition-colors py-1">
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
