import { motion } from 'framer-motion'
import { Store, Package, Activity, TrendingUp } from 'lucide-react'

const stats = [
  { icon: <Store size={22} />, value: '10K+', label: 'Active Stores' },
  { icon: <Package size={22} />, value: '500M+', label: 'Orders Processed' },
  { icon: <Activity size={22} />, value: '99.9%', label: 'Uptime SLA' },
  { icon: <TrendingUp size={22} />, value: '120%', label: 'Average Growth' },
]

const brands = ['Shopify', 'WooCommerce', 'Magento', 'Amazon', 'Flipkart', 'Meesho']

export default function Trust() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Brand logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">
            Trusted by growing brands across India
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {brands.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="text-slate-300 dark:text-slate-600 font-bold text-lg lg:text-xl tracking-tight hover:text-[#2D9DBB] transition-colors duration-200 cursor-default"
              >
                {b}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-slate-700 mb-12" />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-card border border-slate-100 dark:border-slate-700 text-center group hover:border-[#2D9DBB]/40 hover:shadow-brand transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2D9DBB]/10 flex items-center justify-center text-[#2D9DBB] mx-auto mb-4 group-hover:bg-[#2D9DBB] group-hover:text-white transition-all duration-300">
                {s.icon}
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-1">{s.value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
