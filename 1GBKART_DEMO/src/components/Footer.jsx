import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Globe, MessageCircle, Share2, Play, Shield, Truck, RotateCcw, Headphones } from 'lucide-react'

function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
        <path d="M4 10h3l3.5 14h16l3.5-14H34" stroke="#2D9DBB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="30" r="2.2" fill="#2D9DBB"/>
        <circle cx="26" cy="30" r="2.2" fill="#2D9DBB"/>
        <path d="M27 6l-4 4h3v6h2V10h3L27 6z" fill="#2D9DBB"/>
      </svg>
      <span className="font-black text-lg text-white">
        <span className="text-[#B8BDC9]">1GB</span><span className="text-[#2D9DBB]">KART</span>
      </span>
    </div>
  )
}



const trust = [
  { icon: <Truck size={18} />, label: 'Free Delivery', sub: 'On orders over ₹499' },
  { icon: <RotateCcw size={18} />, label: 'Easy Returns', sub: '10-day hassle-free' },
  { icon: <Shield size={18} />, label: 'Secure Payments', sub: '256-bit encryption' },
  { icon: <Headphones size={18} />, label: '24/7 Support', sub: 'Always here for you' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0d1b2e] text-slate-400 mt-8">
      {/* Trust strip */}
      <div className="border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trust.map(t => (
            <div key={t.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D9DBB]/15 flex items-center justify-center text-[#2D9DBB] flex-shrink-0">
                {t.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{t.label}</p>
                <p className="text-xs text-slate-500">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-5">
            <div className="text-center lg:text-left">
              <h3 className="text-base sm:text-lg font-bold text-white">Get exclusive deals in your inbox</h3>
              <p className="text-xs sm:text-sm text-slate-500">Join 2M+ shoppers. No spam, ever.</p>
            </div>
            <div className="flex gap-2 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-72 bg-white/5 border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#2D9DBB] transition-colors"
              />
              <button className="px-5 py-2.5 bg-[#2D9DBB] text-white font-bold text-sm rounded-xl hover:bg-[#1e7a94] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-1">
          <Logo />
          <p className="text-xs leading-relaxed mt-4 mb-5 max-w-xs">India's trusted B2B ecommerce partner for mobile phones, laptops, earphones, and electronics in bulk.</p>
          <div className="flex gap-2">
            {[<Globe size={14}/>, <MessageCircle size={14}/>, <Share2 size={14}/>, <Play size={14}/>].map((icon, i) => (
              <button key={i} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#2D9DBB] text-slate-400 hover:text-white flex items-center justify-center transition-all">
                {icon}
              </button>
            ))}
          </div>
        </div>

        {[
          { title: 'Shop', links: ['Mobile Phones', 'Laptops', 'Earphones', 'Neckbands', 'TV', 'Deals'] },
          { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Press', 'Investors'] },
          { title: 'Support', links: ['Help Center', 'Track Order', 'Returns', 'Contact Us', 'Feedback'] },
          { title: 'Policies', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Shipping Info', 'Refund Policy'] },
        ].map(col => (
          <div key={col.title}>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map(l => (
                <li key={l}>
                  <a href="#" className="text-xs text-slate-400 hover:text-[#2D9DBB] transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* App download */}
      <div className="border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <p className="text-xs text-slate-500">Download the app:</p>
            {['App Store', 'Google Play'].map(s => (
              <button key={s} className="text-xs font-semibold text-white border border-white/20 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
                {s}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} 1GB KART. All rights reserved. Made with ❤️ in India.</p>
        </div>
      </div>
    </footer>
  )
}
