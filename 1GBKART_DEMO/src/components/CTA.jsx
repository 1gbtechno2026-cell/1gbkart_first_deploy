import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'

export default function CTA() {
  return (
    <section id="cta" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#2D9DBB]/10 blur-[80px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-to-br from-[#2D9DBB] to-[#1e7a94] rounded-3xl p-12 lg:p-16 shadow-brand relative overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />

          <span className="inline-block text-xs font-bold text-white/70 uppercase tracking-widest bg-white/15 px-4 py-1.5 rounded-full mb-6">
            Ready to Start?
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Ready to Grow Your Ecommerce Business?
          </h2>

          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Join 10,000+ stores already using 1GB KART to scale faster, sell smarter, and win bigger.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="mailto:hello@1gbkart.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#2D9DBB] font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-colors shadow-lg text-base"
            >
              Start Today <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="mailto:hello@1gbkart.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 bg-white/15 text-white font-semibold px-8 py-4 rounded-xl border border-white/30 hover:bg-white/25 transition-colors text-base"
            >
              <Calendar size={18} /> Schedule Consultation
            </motion.a>
          </div>

          <p className="text-white/50 text-sm mt-8">No credit card required · Free strategy call · Cancel anytime</p>
        </motion.div>
      </div>
    </section>
  )
}
