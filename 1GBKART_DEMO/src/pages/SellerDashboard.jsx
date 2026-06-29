import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Package, ShoppingBag, BarChart3, LogOut, User, Plus, Search,
  Edit2, Trash2, Eye, Download, Upload, X, Check, Menu,
  Clock, CheckCircle2, XCircle, RotateCcw, Layers, Zap,
  AlertCircle, TrendingUp,
} from 'lucide-react'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1,  name: 'Apple iPhone 16 128GB Black',    sku: 'APL-001', price: 75900,  stock: 50, category: 'Mobile Phones', status: 'live',     brand: 'Apple'    },
  { id: 2,  name: 'Apple iPhone 16 128GB White',    sku: 'APL-002', price: 75900,  stock: 45, category: 'Mobile Phones', status: 'live',     brand: 'Apple'    },
  { id: 3,  name: 'Apple iPhone 16 Plus 128GB',     sku: 'APL-003', price: 89900,  stock: 30, category: 'Mobile Phones', status: 'live',     brand: 'Apple'    },
  { id: 4,  name: 'Samsung Galaxy S25 256GB',       sku: 'SAM-001', price: 74900,  stock: 20, category: 'Mobile Phones', status: 'live',     brand: 'Samsung'  },
  { id: 5,  name: 'POCO X7 Pro 256GB 5G',           sku: 'POC-001', price: 24999,  stock: 0,  category: 'Mobile Phones', status: 'disabled', brand: 'POCO'     },
  { id: 6,  name: 'Motorola Edge 50 Pro',           sku: 'MOT-001', price: 24999,  stock: 15, category: 'Mobile Phones', status: 'live',     brand: 'Motorola' },
  { id: 7,  name: 'Apple iPhone 16 Pro 256GB',      sku: 'APL-005', price: 119900, stock: 12, category: 'Mobile Phones', status: 'live',     brand: 'Apple'    },
  { id: 8,  name: 'Samsung Galaxy S25+ 256GB',      sku: 'SAM-002', price: 99900,  stock: 8,  category: 'Mobile Phones', status: 'live',     brand: 'Samsung'  },
]

const ORDERS = [
  { no: 1, orderId: '1GBK-2026-00841', date: '2026-06-20', buyer: 'RS Electronics',    product: 'iPhone 16 × 5',   amount: 379500, status: 'Delivered'  },
  { no: 2, orderId: '1GBK-2026-00792', date: '2026-06-15', buyer: 'TechZone Pvt Ltd',  product: 'Samsung S25+ × 3',amount: 268500, status: 'Processing' },
  { no: 3, orderId: '1GBK-2026-00734', date: '2026-06-10', buyer: 'Mobile Hub India',  product: 'POCO X7 Pro × 10',amount: 249900, status: 'Shipped'    },
  { no: 4, orderId: '1GBK-2026-00681', date: '2026-06-04', buyer: 'Gadget Galaxy',     product: 'Moto Edge 50 × 2',amount: 49800,  status: 'Delivered'  },
  { no: 5, orderId: '1GBK-2026-00620', date: '2026-05-28', buyer: 'RS Electronics',    product: 'iPhone 16+ × 2',  amount: 199800, status: 'Cancelled'  },
  { no: 6, orderId: '1GBK-2026-00578', date: '2026-05-20', buyer: 'Star Mobiles',      product: 'Samsung S25 × 4', amount: 299600, status: 'Delivered'  },
  { no: 7, orderId: '1GBK-2026-00510', date: '2026-05-12', buyer: 'TechZone Pvt Ltd',  product: 'POCO M7 Pro × 8', amount: 135920, status: 'Returned'   },
]

const STATUS_STYLE = {
  Delivered:  'bg-green-100 text-green-700',
  Processing: 'bg-blue-100 text-blue-700',
  Shipped:    'bg-amber-100 text-amber-700',
  Cancelled:  'bg-red-100 text-red-700',
  Returned:   'bg-slate-100 text-slate-600',
}

const NAV_GROUPS = [
  {
    title: 'Overview',
    items: [{ id: 'overview', label: 'Dashboard', icon: <BarChart3 size={15} /> }],
  },
  {
    title: 'Inventory',
    items: [
      { id: 'inventory', label: 'Inventory Management', icon: <Layers size={15} /> },
      { id: 'add-product', label: 'Add New Product', icon: <Plus size={15} /> },
    ],
  },
  {
    title: 'Orders',
    items: [
      { id: 'all-orders',     label: 'All Orders',       icon: <ShoppingBag size={15} /> },
      { id: 'pending',        label: 'Pending Orders',   icon: <Clock size={15} /> },
      { id: 'cancelled',      label: 'Cancelled Orders', icon: <XCircle size={15} /> },
      { id: 'returns',        label: 'Returns',          icon: <RotateCcw size={15} /> },
    ],
  },
  {
    title: 'Products',
    items: [
      { id: 'all-products',  label: 'All Products',     icon: <Package size={15} /> },
      { id: 'live',          label: 'Live Products',    icon: <Zap size={15} /> },
      { id: 'disabled',      label: 'Disabled',         icon: <AlertCircle size={15} /> },
    ],
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, color = '#2f9e44' }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}18`, color }}>
        {icon}
      </div>
      <div>
        <p className="text-[11px] text-slate-400 font-medium">{label}</p>
        <p className="text-xl font-black text-slate-900">{value}</p>
        {sub && <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

function TableHeader({ columns }) {
  return (
    <thead>
      <tr className="bg-slate-50 border-b border-slate-100">
        {columns.map(c => (
          <th key={c} className="text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider px-4 py-3 whitespace-nowrap">{c}</th>
        ))}
      </tr>
    </thead>
  )
}

function ToolRow({ search, setSearch, onDownload }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <div className="relative flex-1 min-w-[160px]">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
          className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:border-[#2f9e44] outline-none" />
      </div>
      <button onClick={() => onDownload('pdf')}
        className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:border-[#2f9e44] hover:text-[#2f9e44] transition-colors">
        <Download size={12} /> PDF
      </button>
      <button onClick={() => onDownload('excel')}
        className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:border-green-500 hover:text-green-600 transition-colors">
        <Download size={12} /> Excel
      </button>
    </div>
  )
}

// ─── Overview section ─────────────────────────────────────────────────────────
function OverviewSection({ setActive }) {
  const revenue    = ORDERS.filter(o => o.status !== 'Cancelled' && o.status !== 'Returned').reduce((s, o) => s + o.amount, 0)
  const pending    = ORDERS.filter(o => o.status === 'Processing').length
  const delivered  = ORDERS.filter(o => o.status === 'Delivered').length
  const liveProds  = PRODUCTS.filter(p => p.status === 'live').length

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<TrendingUp size={18} />}  label="Total Revenue"    value={`₹${(revenue/100000).toFixed(1)}L`}   sub={`${ORDERS.length} orders total`}   />
        <StatCard icon={<ShoppingBag size={18} />} label="Pending Orders"   value={pending}                               sub="Need attention"  color="#f59e0b" />
        <StatCard icon={<CheckCircle2 size={18} />}label="Delivered Orders" value={delivered}                             sub="Successfully done" color="#2D9DBB" />
        <StatCard icon={<Package size={18} />}     label="Live Products"    value={liveProds}                             sub="Currently active"  />
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
          <p className="text-sm font-black text-slate-800">Recent Orders</p>
          <button onClick={() => setActive('all-orders')} className="text-xs font-semibold text-[#2f9e44] hover:underline">View All →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHeader columns={['Order ID', 'Date', 'Buyer', 'Product', 'Amount', 'Status']} />
            <tbody>
              {ORDERS.slice(0, 5).map(o => (
                <tr key={o.orderId} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-[#2f9e44]">{o.orderId}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{o.date}</td>
                  <td className="px-4 py-3 text-xs text-slate-700">{o.buyer}</td>
                  <td className="px-4 py-3 text-xs text-slate-700">{o.product}</td>
                  <td className="px-4 py-3 text-xs font-bold text-slate-800">₹{o.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${STATUS_STYLE[o.status]}`}>{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low stock alert */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
          <AlertCircle size={14} className="text-amber-500" />
          <p className="text-sm font-black text-slate-800">Low / Out of Stock</p>
        </div>
        <table className="w-full text-sm">
          <TableHeader columns={['SKU', 'Product', 'Stock', 'Status', 'Action']} />
          <tbody>
            {PRODUCTS.filter(p => p.stock <= 10).map(p => (
              <tr key={p.sku} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{p.sku}</td>
                <td className="px-4 py-3 text-xs text-slate-700 max-w-[200px] truncate">{p.name}</td>
                <td className={`px-4 py-3 text-xs font-black ${p.stock === 0 ? 'text-red-500' : 'text-amber-500'}`}>{p.stock === 0 ? 'OUT' : p.stock}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${p.status === 'live' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{p.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-[10px] font-semibold text-[#2f9e44] hover:underline flex items-center gap-1">
                    <Edit2 size={11} /> Update Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Inventory section ─────────────────────────────────────────────────────────
function InventorySection() {
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState(null)
  const [products, setProducts] = useState(PRODUCTS)

  const filtered = products.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  )

  const confirmDelete = () => {
    setProducts(p => p.filter(x => x.id !== deleteId))
    setDeleteId(null)
  }

  return (
    <div>
      <ToolRow search={search} setSearch={setSearch} onDownload={type => alert(`Downloading ${type}…`)} />
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHeader columns={['#', 'SKU', 'Product Name', 'Category', 'Price', 'Stock', 'Status', 'Actions']} />
            <tbody>
              {filtered.map((p, i) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-xs text-slate-400">{i + 1}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{p.sku}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-slate-800 max-w-[200px] truncate">{p.name}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{p.category}</td>
                  <td className="px-4 py-3 text-xs font-bold text-slate-800">₹{p.price.toLocaleString()}</td>
                  <td className={`px-4 py-3 text-xs font-black ${p.stock === 0 ? 'text-red-500' : p.stock <= 10 ? 'text-amber-500' : 'text-green-600'}`}>
                    {p.stock === 0 ? 'Out of Stock' : p.stock}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg capitalize ${p.status === 'live' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-[10px] font-semibold text-[#2f9e44] hover:underline flex items-center gap-1"><Eye size={11} /> View</button>
                      <button className="text-[10px] font-semibold text-blue-500 hover:underline flex items-center gap-1"><Edit2 size={11} /> Edit</button>
                      <button onClick={() => setDeleteId(p.id)} className="text-[10px] font-semibold text-red-400 hover:underline flex items-center gap-1"><Trash2 size={11} /> Del</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-10 text-sm text-slate-400">No products found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirm modal */}
      <AnimatePresence>
        {deleteId && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDeleteId(null)} className="fixed inset-0 bg-black/40 z-50" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-sm mx-auto bg-white rounded-2xl shadow-2xl z-50 p-6 text-center">
              <Trash2 size={28} className="text-red-400 mx-auto mb-3" />
              <p className="font-black text-slate-900 mb-1">Delete Product?</p>
              <p className="text-sm text-slate-500 mb-5">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                <button onClick={confirmDelete} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-colors">Delete</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Add Product Form ─────────────────────────────────────────────────────────
function AddProductSection() {
  const [mode, setMode] = useState('manual') // 'manual' | 'erp'
  const [form, setForm] = useState({})
  const set = k => v => setForm(f => ({ ...f, [k]: v }))

  const Field = ({ label, type = 'text', placeholder, required, field }) => (
    <div>
      <label className="block text-[11px] font-semibold text-slate-500 mb-1">{label}{required && ' *'}</label>
      <input type={type} placeholder={placeholder} value={form[field] || ''} onChange={e => set(field)(e.target.value)}
        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-[#2f9e44] focus:ring-2 focus:ring-[#2f9e44]/20 outline-none transition-all" />
    </div>
  )

  return (
    <div>
      {/* ERP / Manual toggle */}
      <div className="flex gap-2 mb-6">
        {[{ id: 'manual', label: '✏️  Edit Manually' }, { id: 'erp', label: '⚡  Use ERP' }].map(m => (
          <button key={m.id} onClick={() => setMode(m.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
              mode === m.id ? 'border-[#2f9e44] bg-[#2f9e44]/10 text-[#2f9e44]' : 'border-slate-200 text-slate-500 hover:border-slate-300'
            }`}>
            {m.label}
          </button>
        ))}
      </div>

      {mode === 'erp' ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center">
          <p className="text-4xl mb-3">⚡</p>
          <p className="font-black text-slate-900 mb-2">ERP Integration</p>
          <p className="text-sm text-slate-500 mb-5">Connect your ERP system to automatically sync product inventory.</p>
          <div className="space-y-3 max-w-xs mx-auto">
            <input placeholder="ERP API Endpoint" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-[#2f9e44] outline-none" />
            <input placeholder="API Key" type="password" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-[#2f9e44] outline-none" />
            <button className="w-full py-3 bg-[#2f9e44] text-white font-bold rounded-xl text-sm hover:bg-[#237a33] transition-colors">Connect ERP</button>
          </div>
        </div>
      ) : (
        <form onSubmit={e => { e.preventDefault(); alert('Product submitted for review!') }}
          className="bg-white rounded-2xl border border-slate-100 p-5">
          <h3 className="text-sm font-black text-slate-800 mb-5">Product Details</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <Field label="Product Name"     required field="name"     placeholder="e.g. Apple iPhone 16 128GB" />
            <Field label="Brand"            required field="brand"    placeholder="e.g. Apple" />
            <Field label="SKU Code"         required field="sku"      placeholder="e.g. APL-001" />
            <Field label="Category"         required field="category" placeholder="e.g. Mobile Phones" />
            <Field label="Price (₹)"        required field="price"    type="number" placeholder="75900" />
            <Field label="MRP (₹)"          required field="mrp"      type="number" placeholder="84900" />
            <Field label="Stock Quantity"   required field="stock"    type="number" placeholder="50" />
            <Field label="Min. Order Qty"           field="minOrder"  type="number" placeholder="1" />
            <Field label="RAM"                      field="ram"       placeholder="e.g. 8 GB" />
            <Field label="Storage"                  field="storage"   placeholder="e.g. 128 GB" />
            <Field label="Colour"                   field="color"     placeholder="e.g. Black" />
            <Field label="Delivery Days"            field="delivery"  placeholder="e.g. 2–3 Days" />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Product Description *</label>
            <textarea rows={3} placeholder="Short description of the product…" value={form.desc || ''} onChange={e => set('desc')(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-[#2f9e44] outline-none resize-none transition-all" />
          </div>

          {/* Key features */}
          <div className="mb-4">
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Key Features (pipe-separated)</label>
            <input placeholder="Feature 1 | Feature 2 | Feature 3" value={form.features || ''} onChange={e => set('features')(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-[#2f9e44] outline-none" />
          </div>

          {/* Image upload */}
          <div className="mb-5">
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Product Images *</label>
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-6 cursor-pointer hover:border-[#2f9e44] hover:bg-[#2f9e44]/5 transition-all group">
              <Upload size={20} className="text-slate-400 group-hover:text-[#2f9e44]" />
              <p className="text-sm text-slate-500 group-hover:text-[#2f9e44]">Click to upload product photos</p>
              <p className="text-[10px] text-slate-400">JPG, PNG — max 5MB each</p>
              <input type="file" multiple accept="image/*" className="hidden" />
            </label>
          </div>

          <div className="flex gap-3">
            <button type="button" className="px-5 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              Save as Draft
            </button>
            <button type="submit" className="flex-1 py-3 bg-[#2f9e44] text-white font-bold rounded-xl text-sm hover:bg-[#237a33] transition-colors flex items-center justify-center gap-2">
              <Check size={15} /> Submit Product for Review
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

// ─── Orders section (reusable for all/pending/cancelled/returns) ──────────────
function OrdersSection({ statusFilter }) {
  const [search, setSearch] = useState('')

  const filtered = ORDERS.filter(o => {
    const matchStatus = !statusFilter || o.status.toLowerCase() === statusFilter.toLowerCase()
    const matchSearch = !search || o.orderId.toLowerCase().includes(search.toLowerCase()) || o.buyer.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  return (
    <div>
      <ToolRow search={search} setSearch={setSearch} onDownload={t => alert(`Downloading ${t}…`)} />
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHeader columns={['#', 'Order ID', 'Date', 'Buyer', 'Product', 'Amount', 'Status', 'Action']} />
            <tbody>
              {filtered.map((o, i) => (
                <motion.tr key={o.orderId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-4 py-3 text-xs text-slate-400">{o.no}</td>
                  <td className="px-4 py-3 font-mono text-xs font-bold text-[#2f9e44]">{o.orderId}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{o.date}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-slate-700">{o.buyer}</td>
                  <td className="px-4 py-3 text-xs text-slate-600 max-w-[160px] truncate">{o.product}</td>
                  <td className="px-4 py-3 text-xs font-bold text-slate-800 whitespace-nowrap">₹{o.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${STATUS_STYLE[o.status]}`}>{o.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-[10px] font-semibold text-[#2f9e44] hover:underline flex items-center gap-1">
                      <Eye size={11} /> View
                    </button>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-10 text-sm text-slate-400">No orders found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── Products section (live/disabled/all) ─────────────────────────────────────
function ProductsSection({ statusFilter }) {
  const [search, setSearch] = useState('')
  const list = PRODUCTS.filter(p => {
    const matchStatus = !statusFilter || p.status === statusFilter
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })
  return (
    <div>
      <ToolRow search={search} setSearch={setSearch} onDownload={t => alert(`Downloading ${t}…`)} />
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHeader columns={['SKU', 'Product', 'Brand', 'Price', 'Stock', 'Status', 'Actions']} />
            <tbody>
              {list.map((p, i) => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{p.sku}</td>
                  <td className="px-4 py-3 text-xs text-slate-800 max-w-[200px] truncate">{p.name}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{p.brand}</td>
                  <td className="px-4 py-3 text-xs font-bold text-slate-800">₹{p.price.toLocaleString()}</td>
                  <td className={`px-4 py-3 text-xs font-black ${p.stock === 0 ? 'text-red-500' : p.stock <= 10 ? 'text-amber-500' : 'text-green-600'}`}>{p.stock}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg capitalize ${p.status === 'live' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-[10px] font-semibold text-[#2f9e44] hover:underline flex items-center gap-1"><Eye size={11} /> View</button>
                      <button className="text-[10px] font-semibold text-blue-500 hover:underline flex items-center gap-1"><Edit2 size={11} /> Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr><td colSpan={7} className="text-center py-10 text-sm text-slate-400">No products found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────
export default function SellerDashboard() {
  const [active, setActive] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const CONTENT = {
    'overview':     <OverviewSection setActive={setActive} />,
    'inventory':    <InventorySection />,
    'add-product':  <AddProductSection />,
    'all-orders':   <OrdersSection />,
    'pending':      <OrdersSection statusFilter="Processing" />,
    'cancelled':    <OrdersSection statusFilter="Cancelled" />,
    'returns':      <OrdersSection statusFilter="Returned" />,
    'all-products': <ProductsSection />,
    'live':         <ProductsSection statusFilter="live" />,
    'disabled':     <ProductsSection statusFilter="disabled" />,
  }

  const activeLabel = NAV_GROUPS.flatMap(g => g.items).find(n => n.id === active)?.label || 'Dashboard'

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(o => !o)} className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <Menu size={18} className="text-slate-600" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img src="/1gbkart logo .webp" alt="1GB KART" className="w-7 h-7 object-contain" />
            <span className="font-black text-sm hidden sm:block"><span className="text-slate-400">1GB</span><span className="text-[#2D9DBB]">KART</span></span>
          </Link>
          <span className="text-slate-300 hidden sm:block">|</span>
          <span className="text-xs font-bold text-slate-500 hidden sm:block">Seller Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#2f9e44]/15 flex items-center justify-center">
              <User size={14} className="text-[#2f9e44]" />
            </div>
            <span className="text-sm font-bold text-slate-700 hidden sm:block">RS Electronics Pvt Ltd</span>
          </div>
          <button onClick={() => navigate('/login')}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:border-red-300 hover:text-red-500 transition-colors">
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-60 bg-white border-r border-slate-100 py-5 px-3 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
          <SidebarContent active={active} setActive={setActive} />
        </aside>

        {/* Mobile sidebar drawer */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/30 z-40 lg:hidden" />
              <motion.aside
                initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 bottom-0 w-60 bg-white border-r border-slate-100 py-5 px-3 z-50 overflow-y-auto lg:hidden"
              >
                <SidebarContent active={active} setActive={id => { setActive(id); setSidebarOpen(false) }} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main */}
        <main className="flex-1 p-4 sm:p-6 min-w-0">
          <div className="flex items-center gap-2 mb-5">
            {NAV_GROUPS.flatMap(g => g.items).find(n => n.id === active)?.icon}
            <h2 className="text-base font-black text-slate-900">{activeLabel}</h2>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              {CONTENT[active]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ active, setActive }) {
  return (
    <nav>
      {NAV_GROUPS.map(group => (
        <div key={group.title} className="mb-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">{group.title}</p>
          {group.items.map(n => (
            <button key={n.id} onClick={() => setActive(n.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left mb-0.5 ${
                active === n.id ? 'bg-[#2f9e44]/10 text-[#2f9e44]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}>
              {n.icon} {n.label}
            </button>
          ))}
        </div>
      ))}
    </nav>
  )
}
