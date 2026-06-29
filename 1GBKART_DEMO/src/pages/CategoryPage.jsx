import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, ChevronDown, X, ArrowUpDown, Search } from 'lucide-react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'

const SORT_OPTIONS = [
  { id: 'popular', label: 'Most Popular' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Highest Rated' },
  { id: 'newest', label: 'Newest First' },
]

const BRANDS = ['Apple', 'Samsung', 'Motorola', 'POCO']
const PRICE_RANGES = [
  { id: 'u20k', label: 'Under ₹20,000', min: 0, max: 20000 },
  { id: '20_50k', label: '₹20,000 – ₹50,000', min: 20000, max: 50000 },
  { id: '50_100k', label: '₹50,000 – ₹1,00,000', min: 50000, max: 100000 },
  { id: 'o100k', label: 'Above ₹1,00,000', min: 100000, max: Infinity },
]

function FilterPanel({ filters, setFilters, onClose }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-slate-900">Filters</h3>
        {onClose && <button onClick={onClose}><X size={16} className="text-slate-400" /></button>}
      </div>

      {/* Brand */}
      <div>
        <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Brand</p>
        <div className="space-y-1.5">
          {BRANDS.map(b => (
            <label key={b} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.brands.includes(b)}
                onChange={() => setFilters(f => ({
                  ...f,
                  brands: f.brands.includes(b) ? f.brands.filter(x => x !== b) : [...f.brands, b],
                }))}
                className="w-4 h-4 rounded border-slate-300 accent-[#2D9DBB]"
              />
              <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Price Range</p>
        <div className="space-y-1.5">
          {PRICE_RANGES.map(r => (
            <label key={r.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="price"
                checked={filters.priceRange === r.id}
                onChange={() => setFilters(f => ({ ...f, priceRange: r.id }))}
                className="w-4 h-4 accent-[#2D9DBB]"
              />
              <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{r.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Min Rating</p>
        {[4, 3, 2].map(r => (
          <label key={r} className="flex items-center gap-2 cursor-pointer mb-1.5 group">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === r}
              onChange={() => setFilters(f => ({ ...f, minRating: r }))}
              className="w-4 h-4 accent-[#2D9DBB]"
            />
            <span className="text-sm text-slate-600 group-hover:text-slate-900">{'★'.repeat(r)} & above</span>
          </label>
        ))}
      </div>

      <button
        onClick={() => setFilters({ brands: [], priceRange: null, minRating: 0 })}
        className="w-full py-2 text-xs font-bold text-[#2D9DBB] border border-[#2D9DBB] rounded-xl hover:bg-[#2D9DBB] hover:text-white transition-all"
      >
        Clear All Filters
      </button>
    </div>
  )
}

export default function CategoryPage() {
  const { slug } = useParams()
  const { setQuickView } = useCart()
  const [filters, setFilters] = useState({ brands: [], priceRange: null, minRating: 0 })
  const [sort, setSort] = useState('popular')
  const [sortOpen, setSortOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [compareList, setCompareList] = useState([])

  const categoryLabel = slug
    ? slug.split('-').map(w => w[0]?.toUpperCase() + w.slice(1)).join(' ')
    : 'All Products'

  const filtered = useMemo(() => {
    let list = [...products]

    if (search) list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    )
    if (filters.brands.length) list = list.filter(p => filters.brands.includes(p.brand))
    if (filters.priceRange) {
      const r = PRICE_RANGES.find(x => x.id === filters.priceRange)
      if (r) list = list.filter(p => p.price >= r.min && p.price <= r.max)
    }
    if (filters.minRating) list = list.filter(p => p.rating >= filters.minRating)

    switch (sort) {
      case 'price_asc': return list.sort((a, b) => a.price - b.price)
      case 'price_desc': return list.sort((a, b) => b.price - a.price)
      case 'rating': return list.sort((a, b) => b.rating - a.rating)
      case 'newest': return list.sort((a, b) => b.id - a.id)
      default: return list.sort((a, b) => b.reviews - a.reviews)
    }
  }, [filters, sort, search])

  const toggleCompare = (id) => {
    setCompareList(c => c.includes(id) ? c.filter(x => x !== id) : c.length < 3 ? [...c, id] : c)
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-8 pt-[118px] lg:pt-[132px] pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 pt-2">
          <Link to="/" className="hover:text-[#2D9DBB] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold">{categoryLabel}</span>
        </div>

        {/* Page title + search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">{categoryLabel}</h1>
            <p className="text-xs text-slate-400 mt-0.5">{filtered.length} products found</p>
          </div>
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search in category..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:border-[#2D9DBB] focus:ring-2 focus:ring-[#2D9DBB]/20 outline-none"
            />
          </div>
        </div>

        {/* Mobile filter/sort bar */}
        <div className="flex gap-2 mb-4 lg:hidden">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:border-[#2D9DBB] transition-colors"
          >
            <SlidersHorizontal size={14} /> Filter
          </button>
          <div className="relative flex-1">
            <button
              onClick={() => setSortOpen(o => !o)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:border-[#2D9DBB] transition-colors"
            >
              <ArrowUpDown size={14} /> Sort
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute top-full mt-1 left-0 right-0 bg-white border border-slate-100 rounded-xl shadow-lg z-20 overflow-hidden"
                >
                  {SORT_OPTIONS.map(o => (
                    <button
                      key={o.id}
                      onClick={() => { setSort(o.id); setSortOpen(false) }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${sort === o.id ? 'text-[#2D9DBB] font-bold' : 'text-slate-700'}`}
                    >
                      {o.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop filter sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sticky top-[148px]">
              <FilterPanel filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {/* Desktop sort bar */}
            <div className="hidden lg:flex items-center justify-between mb-4">
              <p className="text-sm text-slate-500">{filtered.length} results</p>
              <div className="relative">
                <button
                  onClick={() => setSortOpen(o => !o)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:border-[#2D9DBB] transition-colors"
                >
                  <ArrowUpDown size={13} />
                  {SORT_OPTIONS.find(o => o.id === sort)?.label}
                  <ChevronDown size={13} />
                </button>
                <AnimatePresence>
                  {sortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute top-full mt-1 right-0 w-52 bg-white border border-slate-100 rounded-xl shadow-lg z-20 overflow-hidden"
                    >
                      {SORT_OPTIONS.map(o => (
                        <button
                          key={o.id}
                          onClick={() => { setSort(o.id); setSortOpen(false) }}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${sort === o.id ? 'text-[#2D9DBB] font-bold' : 'text-slate-700'}`}
                        >
                          {o.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-bold text-slate-700">No products found</p>
                <p className="text-sm text-slate-400 mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
                {filtered.map(p => (
                  <Link key={p.id} to={`/product/${p.id}`} className="contents">
                    <ProductCard product={p} onQuickView={setQuickView} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-50 p-5 overflow-y-auto lg:hidden"
            >
              <FilterPanel filters={filters} setFilters={setFilters} onClose={() => setFilterOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Compare bar */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-30 px-4 py-3 flex items-center gap-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
          >
            <span className="text-xs font-bold text-slate-700">Compare ({compareList.length}/3):</span>
            {compareList.map(id => {
              const p = products.find(x => x.id === id)
              return p ? (
                <div key={id} className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-2 py-1">
                  <span className="text-xs font-semibold text-slate-700 max-w-[100px] truncate">{p.name}</span>
                  <button onClick={() => toggleCompare(id)}><X size={12} className="text-slate-400" /></button>
                </div>
              ) : null
            })}
            <button className="ml-auto px-4 py-2 bg-[#2D9DBB] text-white text-xs font-bold rounded-xl hover:bg-[#1e7a94] transition-colors">
              Compare Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
