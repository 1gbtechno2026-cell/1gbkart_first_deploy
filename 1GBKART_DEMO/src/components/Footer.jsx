import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Globe, MessageCircle, Share2, Play } from 'lucide-react'
import Logo from './Logo'

const quickLinks = ['About Us', 'Case Studies', 'Blog', 'Careers', 'Contact']
const serviceLinks = [
  'Store Development',
  'Marketplace Integration',
  'Growth Marketing',
  'Inventory Management',
  'Analytics & Reporting',
  'Automation Solutions',
]

const socials = [
  { icon: <Globe size={16} />, label: 'Website', href: '#' },
  { icon: <MessageCircle size={16} />, label: 'Chat', href: '#' },
  { icon: <Share2 size={16} />, label: 'Share', href: '#' },
  { icon: <Play size={16} />, label: 'YouTube', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0d1b2e] dark:bg-[#060d17] text-slate-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main grid */}
        <div className="py-16 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Logo textClass="text-xl text-white" />
            <p className="text-sm leading-relaxed mt-4 mb-6 text-slate-400 max-w-xs">
              The all-in-one ecommerce growth platform for brands that want to scale without limits.
            </p>
            <div className="flex gap-3">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#2D9DBB] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3">
              {quickLinks.map(l => (
                <li key={l}>
                  <a href="#" className="text-sm text-slate-400 hover:text-[#2D9DBB] transition-colors duration-200">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map(l => (
                <li key={l}>
                  <a href="#services" className="text-sm text-slate-400 hover:text-[#2D9DBB] transition-colors duration-200">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-[#2D9DBB] mt-0.5 flex-shrink-0" />
                <a href="mailto:hello@1gbkart.com" className="text-sm hover:text-[#2D9DBB] transition-colors">
                  hello@1gbkart.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-[#2D9DBB] mt-0.5 flex-shrink-0" />
                <a href="tel:+911800001GB" className="text-sm hover:text-[#2D9DBB] transition-colors">
                  +91 1800-001-1GB
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[#2D9DBB] mt-0.5 flex-shrink-0" />
                <span className="text-sm">Mumbai · Delhi · Bangalore</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} 1GB KART. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
              <a key={l} href="#" className="text-xs text-slate-500 hover:text-[#2D9DBB] transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
