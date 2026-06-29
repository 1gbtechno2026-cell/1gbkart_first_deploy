import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Zap } from 'lucide-react'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
      <path d="M43.6 20.5H42V20H24v8h11.3C33.7 32.3 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.2 2.7l5.7-5.7C33.8 7.3 29.1 5 24 5 13 5 4 14 4 25s9 20 20 20c11 0 20-9 20-20 0-1.2-.1-2.2-.4-3.3l.4-1.2z" fill="#FFC107"/>
      <path d="M6.3 14.7l6.6 4.8C14.6 16.1 19 13 24 13c2.8 0 5.3 1 7.2 2.7l5.7-5.7C33.8 7.3 29.1 5 24 5c-7.7 0-14.3 4.4-17.7 9.7z" fill="#FF3D00"/>
      <path d="M24 45c5 0 9.6-1.9 13.1-5l-6-5.2C29.2 36.5 26.7 37.5 24 37.5c-5.2 0-9.6-3.5-11.2-8.4l-6.5 5C9.6 40.4 16.4 45 24 45z" fill="#4CAF50"/>
      <path d="M43.6 20.5H42V20H24v8h11.3c-.7 2-2.1 3.8-3.9 5l6 5.2C37 37.8 44 31.8 44 24c0-1.2-.1-2.2-.4-3.3l.4-.2z" fill="#1976D2"/>
    </svg>
  )
}

const tabs = [
  { id: 'buyer', label: 'Buyer / Customer', icon: '🛒', reg: '/register/buyer' },
  { id: 'seller', label: 'Seller / Vendor', icon: '🏪', reg: '/register/seller' },
]

export default function LoginPage() {
  const [tab, setTab] = useState('buyer')
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const active = tabs.find(t => t.id === tab)

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(tab === 'seller' ? '/dashboard/seller' : '/dashboard/buyer')
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 select-none">
          <img src="/1gbkart logo .webp" alt="1GB KART" className="w-8 h-8 object-contain" />
          <span className="font-black text-base"><span className="text-slate-400">1GB</span><span className="text-[#2D9DBB]">KART</span></span>
        </Link>
        <Link to="/" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#2D9DBB] transition-colors">
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#092533] to-[#2D9DBB] px-6 py-8 text-center">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-3">
                <Zap size={22} className="text-white fill-white" />
              </div>
              <h1 className="text-xl font-black text-white">Welcome to 1GBKART</h1>
              <p className="text-sm text-white/70 mt-1">India's trusted B2B electronics platform</p>
            </div>

            <div className="p-6">
              {/* Role tabs */}
              <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6">
                {tabs.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
                      tab === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <span>{t.icon}</span> {t.label}
                  </button>
                ))}
              </div>

              {/* Mode toggle */}
              <div className="flex gap-1 mb-6">
                {['signin', 'signup'].map(m => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      mode === m
                        ? 'bg-[#2D9DBB] text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-700 border border-slate-200'
                    }`}
                  >
                    {m === 'signin' ? 'Sign In' : 'Sign Up'}
                  </button>
                ))}
              </div>

              {/* OAuth buttons */}
              <div className="space-y-2.5 mb-5">
                <button className="w-full flex items-center gap-3 px-4 py-3 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all text-sm font-semibold text-slate-700">
                  <GoogleIcon />
                  Continue with Google
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-2 px-3 py-2.5 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-sm font-semibold text-blue-700">
                    <span className="text-base">f</span> Facebook
                  </button>
                  <button className="flex items-center justify-center gap-2 px-3 py-2.5 border border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-sm font-semibold text-blue-600">
                    <span className="text-base font-black">in</span> LinkedIn
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-xs text-slate-400 font-medium">or use email</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:border-[#2D9DBB] focus:ring-2 focus:ring-[#2D9DBB]/20 outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Password"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    required
                    className="w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:border-[#2D9DBB] focus:ring-2 focus:ring-[#2D9DBB]/20 outline-none transition-all"
                  />
                  <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>

                {mode === 'signin' && (
                  <div className="text-right">
                    <span className="text-xs text-[#2D9DBB] font-semibold cursor-pointer hover:underline">Forgot password?</span>
                  </div>
                )}

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3.5 bg-[#2D9DBB] hover:bg-[#1e7a94] text-white font-bold rounded-xl transition-colors text-sm mt-1"
                >
                  {mode === 'signin' ? 'Sign In' : 'Create Account'}
                </motion.button>
              </form>

              {/* Register CTA */}
              {mode === 'signin' && (
                <p className="text-center text-xs text-slate-500 mt-4">
                  New to 1GBKART?{' '}
                  <Link to={active.reg} className="text-[#2D9DBB] font-bold hover:underline">
                    Register as {tab === 'buyer' ? 'Buyer' : 'Seller'} →
                  </Link>
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
