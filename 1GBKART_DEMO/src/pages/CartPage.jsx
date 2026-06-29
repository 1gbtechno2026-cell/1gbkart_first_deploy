import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, ShoppingBag, ChevronRight, Shield, Tag, MapPin, Plus } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'

function AddressForm({ title, data, onChange }) {
  const fields = [
    { key: 'name', label: 'Full Name', type: 'text', required: true },
    { key: 'company', label: 'Company / Business Name', type: 'text' },
    { key: 'address', label: 'Address Line 1', type: 'text', required: true },
    { key: 'city', label: 'City', type: 'text', required: true },
    { key: 'state', label: 'State', type: 'text', required: true },
    { key: 'pincode', label: 'PIN Code', type: 'text', required: true },
    { key: 'phone', label: 'Mobile Number', type: 'tel', required: true },
    { key: 'gst', label: 'GST Number (optional)', type: 'text' },
  ]
  return (
    <div>
      <h3 className="text-sm font-black text-slate-800 mb-3 flex items-center gap-2">
        <MapPin size={14} className="text-[#2D9DBB]" /> {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fields.map(f => (
          <div key={f.key} className={f.key === 'address' ? 'sm:col-span-2' : ''}>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">{f.label}{f.required && ' *'}</label>
            <input
              type={f.type}
              value={data[f.key] || ''}
              onChange={e => onChange(f.key, e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-[#2D9DBB] focus:ring-2 focus:ring-[#2D9DBB]/20 outline-none transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CartPage() {
  const { cart, removeFromCart, updateQty } = useCart()
  const navigate = useNavigate()
  const [sameAddress, setSameAddress] = useState(true)
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [billTo, setBillTo] = useState({})
  const [shipTo, setShipTo] = useState({})

  const subtotal = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0)
  const discount = Math.round(subtotal * 0.03)
  const shipping = subtotal > 50000 ? 0 : 299
  const total = subtotal - discount + shipping - (couponApplied ? 500 : 0)

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    alert('Order placed! (Payment gateway integration coming in next phase)')
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <Navbar />
        <div className="flex flex-col items-center justify-center pt-[132px] px-4 py-20 gap-5">
          <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center">
            <ShoppingBag size={40} className="text-slate-300" />
          </div>
          <p className="text-xl font-black text-slate-700">Your cart is empty</p>
          <p className="text-sm text-slate-400">Add some products to get started</p>
          <Link to="/" className="px-6 py-3 bg-[#2D9DBB] text-white font-bold rounded-xl hover:bg-[#1e7a94] transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-8 pt-[118px] lg:pt-[132px] pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 pt-2">
          <Link to="/" className="hover:text-[#2D9DBB] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold">Cart</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
          My Cart <span className="text-slate-400 font-normal text-base">({cart.length} item{cart.length !== 1 ? 's' : ''})</span>
        </h1>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-[1fr_380px] gap-6">
            {/* ── Left column ── */}
            <div className="space-y-4">
              {/* Cart items */}
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-bold text-slate-800">Cart Items</p>
                </div>
                <AnimatePresence initial={false}>
                  {cart.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex gap-3 p-4 ${idx !== cart.length - 1 ? 'border-b border-slate-100' : ''}`}
                    >
                      <img src={item.image} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0 bg-slate-50" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-[#2D9DBB] uppercase">{item.brand}</p>
                        <p className="text-sm font-semibold text-slate-800 leading-tight line-clamp-2">{item.name}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                            <button type="button" onClick={() => updateQty(item.id, Math.max(1, (item.qty || 1) - 1))}
                              className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors font-bold">
                              −
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center text-sm font-bold text-slate-800 border-x border-slate-200">
                              {item.qty || 1}
                            </span>
                            <button type="button" onClick={() => updateQty(item.id, (item.qty || 1) + 1)}
                              className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors font-bold">
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-black text-slate-900">₹{(item.price * (item.qty || 1)).toLocaleString()}</p>
                            <p className="text-[10px] text-slate-400">₹{item.price.toLocaleString()} each</p>
                          </div>
                        </div>
                      </div>
                      <button type="button" onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-400 transition-colors flex-shrink-0 mt-1">
                        <Trash2 size={15} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Bill To address */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <AddressForm title="Bill To" data={billTo} onChange={(k, v) => setBillTo(a => ({ ...a, [k]: v }))} />
              </div>

              {/* Ship To */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                    <MapPin size={14} className="text-[#2D9DBB]" /> Ship To
                  </h3>
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameAddress}
                      onChange={e => setSameAddress(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#2D9DBB]"
                    />
                    Same as Bill To
                  </label>
                </div>
                {!sameAddress && (
                  <AddressForm title="" data={shipTo} onChange={(k, v) => setShipTo(a => ({ ...a, [k]: v }))} />
                )}
                {sameAddress && (
                  <p className="text-xs text-slate-400 italic">Shipping address same as billing address.</p>
                )}
              </div>
            </div>

            {/* ── Right column: Order summary ── */}
            <div className="space-y-4">
              {/* Coupon */}
              <div className="bg-white rounded-2xl border border-slate-100 p-4">
                <p className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Tag size={14} className="text-[#2D9DBB]" /> Coupon Code
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={e => setCoupon(e.target.value.toUpperCase())}
                    placeholder="Enter coupon code"
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-[#2D9DBB] focus:ring-2 focus:ring-[#2D9DBB]/20 outline-none transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => coupon && setCouponApplied(true)}
                    className="px-4 py-2 bg-[#2D9DBB] text-white text-xs font-bold rounded-xl hover:bg-[#1e7a94] transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-xs text-green-600 font-semibold mt-2">✓ Coupon applied — ₹500 off!</p>
                )}
              </div>

              {/* Price breakdown */}
              <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-3">
                <p className="text-sm font-black text-slate-800 mb-1">Order Summary</p>

                {[
                  { label: `Subtotal (${cart.length} items)`, value: `₹${subtotal.toLocaleString()}` },
                  { label: 'Bulk Discount (3%)', value: `-₹${discount.toLocaleString()}`, green: true },
                  { label: 'Shipping', value: shipping === 0 ? 'FREE' : `₹${shipping}`, green: shipping === 0 },
                  ...(couponApplied ? [{ label: `Coupon (${coupon})`, value: '-₹500', green: true }] : []),
                ].map(r => (
                  <div key={r.label} className="flex justify-between text-sm">
                    <span className="text-slate-500">{r.label}</span>
                    <span className={`font-semibold ${r.green ? 'text-green-600' : 'text-slate-800'}`}>{r.value}</span>
                  </div>
                ))}

                <div className="border-t border-slate-100 pt-3 flex justify-between">
                  <span className="font-black text-slate-900">Total</span>
                  <span className="font-black text-xl text-slate-900">₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Trust */}
              <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2.5">
                <Shield size={14} className="text-green-600 flex-shrink-0" />
                <p className="text-xs text-green-700 font-semibold">Safe & Secure payment. 256-bit encryption.</p>
              </div>

              {/* Place Order */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full py-4 bg-[#2D9DBB] hover:bg-[#1e7a94] text-white font-black text-base rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                Place Order <ChevronRight size={18} />
              </motion.button>

              <p className="text-center text-xs text-slate-400">
                By placing order you agree to our{' '}
                <span className="text-[#2D9DBB] cursor-pointer hover:underline">Terms & Conditions</span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
