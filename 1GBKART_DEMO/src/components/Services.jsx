import { motion } from 'framer-motion'
import { ShoppingBag, GitMerge, Megaphone, Boxes, BarChart2, Bot } from 'lucide-react'

const services = [
  {
    icon: <ShoppingBag size={24} />,
    title: 'Ecommerce Store Development',
    desc: 'Custom, high-performance online stores built for speed, conversions, and scale on any platform.',
    color: '#2D9DBB',
  },
  {
    icon: <GitMerge size={24} />,
    title: 'Marketplace Integration',
    desc: 'Sync inventory and orders across Amazon, Flipkart, Meesho, and 50+ marketplaces in real-time.',
    color: '#1e7a94',
  },
  {
    icon: <Megaphone size={24} />,
    title: 'Growth Marketing',
    desc: 'Data-driven campaigns — SEO, paid media, email automation — engineered to drive revenue.',
    color: '#4db8d4',
  },
  {
    icon: <Boxes size={24} />,
    title: 'Inventory Management',
    desc: 'Smart stock tracking, demand forecasting, and warehouse coordination across all channels.',
    color: '#2D9DBB',
  },
  {
    icon: <BarChart2 size={24} />,
    title: 'Analytics & Reporting',
    desc: 'Real-time dashboards with actionable insights on sales, customers, and product performance.',
    color: '#1e7a94',
  },
  {
    icon: <Bot size={24} />,
    title: 'Automation Solutions',
    desc: 'End-to-end workflow automation — from order processing to fulfilment and customer support.',
    color: '#4db8d4',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold text-[#2D9DBB] uppercase tracking-widest bg-[#2D9DBB]/10 px-4 py-1.5 rounded-full mb-4">
            What We Do
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Sell More</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            A complete ecosystem of ecommerce tools and services to launch, grow, and scale your business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group gradient-border bg-white dark:bg-slate-800/60 rounded-2xl p-7 shadow-card hover:shadow-brand transition-all duration-300 cursor-default"
            >
              <div
                className="w-13 h-13 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ width: 52, height: 52, background: `${s.color}18`, color: s.color }}
              >
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#2D9DBB] transition-colors duration-200">
                {s.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
