import { motion } from 'framer-motion'
import { brands } from '../../data/products'

const LOGOS = {
  Apple:    'https://logo.clearbit.com/apple.com',
  Samsung:  'https://logo.clearbit.com/samsung.com',
  Motorola: 'https://logo.clearbit.com/motorola.com',
  POCO:     'https://logo.clearbit.com/poco.com',
}

export default function BrandSection() {
  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-black text-slate-900">Brand in Spotlight</h2>
          <p className="text-xs text-slate-400 mt-0.5">Featured brands — products we want you to discover</p>
        </div>
        <span className="text-xs font-semibold text-[#2D9DBB] cursor-pointer hover:underline transition-colors">View All →</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {brands.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="bg-white border border-slate-100 rounded-2xl p-5 cursor-pointer hover:border-[#2D9DBB]/40 hover:shadow-[0_12px_40px_rgba(45,157,187,0.18)] transition-all group flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-[#2D9DBB]/5 transition-colors overflow-hidden">
              <img
                src={LOGOS[b.name]}
                alt={b.name}
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  const next = e.currentTarget.nextElementSibling
                  if (next) next.style.display = 'flex'
                }}
              />
              <span className="text-4xl hidden items-center justify-center">{b.logo}</span>
            </div>

            <h3 className="text-sm font-black text-slate-800 mb-0.5">{b.name}</h3>
            <p className="text-[11px] text-slate-400 mb-3">{b.tagline}</p>
            <span className="text-[11px] font-bold text-[#2D9DBB] group-hover:underline">Shop All →</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
