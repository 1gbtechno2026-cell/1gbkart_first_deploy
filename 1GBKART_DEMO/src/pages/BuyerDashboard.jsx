import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingBag, Wallet, Coins, Tag, User, LogOut, Download,
  Search, Plus, X, ChevronDown, Eye, Calendar, Filter,
  TrendingUp, CheckCircle2, Clock, XCircle, RotateCcw,
  CreditCard, Building2, History, Menu,
} from 'lucide-react'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const ORDERS = [
  { no: 1,  orderId: '1GBK-2026-00841', date: '2026-06-20', product: 'iPhone 16 128GB × 5',      imei: '352034117532981', status: 'Delivered',  amount: 379500 },
  { no: 2,  orderId: '1GBK-2026-00792', date: '2026-06-15', product: 'Samsung S25+ 256GB × 3',   imei: '490154203237518', status: 'Processing', amount: 268500 },
  { no: 3,  orderId: '1GBK-2026-00734', date: '2026-06-10', product: 'POCO X7 Pro 256GB × 10',  imei: '012345678901234', status: 'Shipped',    amount: 249900 },
  { no: 4,  orderId: '1GBK-2026-00681', date: '2026-06-04', product: 'Motorola Edge 50 × 2',     imei: '352678901234568', status: 'Delivered',  amount: 49800  },
  { no: 5,  orderId: '1GBK-2026-00620', date: '2026-05-28', product: 'iPhone 16 Plus × 2',       imei: '867543219012345', status: 'Cancelled',  amount: 199800 },
  { no: 6,  orderId: '1GBK-2026-00578', date: '2026-05-20', product: 'Samsung S25 256GB × 4',    imei: '357123490152678', status: 'Delivered',  amount: 299600 },
  { no: 7,  orderId: '1GBK-2026-00510', date: '2026-05-12', product: 'POCO M7 Pro 128GB × 8',   imei: '990000862471854', status: 'Returned',   amount: 135920 },
]

const TRANSACTIONS = [
  { date: '2026-06-20', desc: 'Refund – ORD-00620',    type: 'credit', amount: 199800 },
  { date: '2026-06-18', desc: 'Added via Net Banking',  type: 'credit', amount: 500000 },
  { date: '2026-06-15', desc: 'Order payment',          type: 'debit',  amount: 268500 },
  { date: '2026-06-10', desc: 'Order payment',          type: 'debit',  amount: 249900 },
  { date: '2026-06-04', desc: 'Order payment',          type: 'debit',  amount: 49800  },
]

const COINS_HISTORY = [
  { date: '2026-06-20', desc: 'Earned on order ORD-00841',  type: 'earned',   coins: 380  },
  { date: '2026-06-15', desc: 'Earned on order ORD-00792',  type: 'earned',   coins: 269  },
  { date: '2026-06-10', desc: 'Redeemed on order ORD-00734',type: 'redeemed', coins: -500 },
  { date: '2026-05-28', desc: 'Earned on order ORD-00578',  type: 'earned',   coins: 300  },
]

const COUPONS = [
  { code: 'BULK500',  discount: '₹500 off on orders above ₹50,000',   expiry: '2026-08-31', status: 'active'  },
  { code: 'FIRST10',  discount: '10% off — first bulk order',           expiry: '2026-07-15', status: 'active'  },
  { code: 'IPHONE5',  discount: '5% off on iPhone orders',              expiry: '2026-12-31', status: 'active'  },
  { code: 'SAVE2K',   discount: '₹2,000 off above ₹2,00,000',          expiry: '2026-06-10', status: 'expired' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────
const STATUS_STYLE = {
  Delivered:  'bg-green-100 text-green-700',
  Processing: 'bg-blue-100 text-blue-700',
  Shipped:    'bg-amber-100 text-amber-700',
  Cancelled:  'bg-red-100 text-red-700',
  Returned:   'bg-slate-100 text-slate-600',
}

const NAV = [
  { id: 'orders',   label: 'Order Info',      icon: <ShoppingBag size={16} /> },
  { id: 'wallet',   label: 'Wallet',          icon: <Wallet size={16} />      },
  { id: 'coins',    label: 'Loyalty Coins',   icon: <Coins size={16} />       },
  { id: 'coupons',  label: 'Coupons',         icon: <Tag size={16} />         },
  { id: 'account',  label: 'Account Info',    icon: <User size={16} />        },
]

// ─── Sub-components ──────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, color = '#2D9DBB' }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}18`, color }}>
        {icon}
      </div>
      <div>
        <p className="text-[11px] text-slate-400 font-medium">{label}</p>
        <p className="text-lg font-black text-slate-900">{value}</p>
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

function ToolBar({ search, setSearch, onDownloadPDF, onDownloadExcel, dateRange, setDateRange }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <div className="relative flex-1 min-w-[180px]">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders…"
          className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:border-[#2D9DBB] outline-none" />
      </div>
      <div className="flex items-center gap-1 border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 text-xs text-slate-500">
        <Calendar size={12} /> <span>{dateRange}</span>
      </div>
      <button onClick={onDownloadPDF}
        className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:border-[#2D9DBB] hover:text-[#2D9DBB] transition-colors">
        <Download size={12} /> PDF
      </button>
      <button onClick={onDownloadExcel}
        className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:border-green-500 hover:text-green-600 transition-colors">
        <Download size={12} /> Excel
      </button>
    </div>
  )
}

// ─── Section: Orders ─────────────────────────────────────────────────────────
function OrdersSection() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = ORDERS.filter(o => {
    const matchFilter = filter === 'all' || o.status.toLowerCase() === filter
    const matchSearch = !search || o.orderId.toLowerCase().includes(search.toLowerCase()) || o.product.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <ToolBar search={search} setSearch={setSearch} dateRange="Apr 1 – Jun 27, 2026"
          onDownloadPDF={() => alert('Downloading PDF…')} onDownloadExcel={() => alert('Downloading Excel…')} />
      </div>

      {/* Status filter chips */}
      <div className="flex gap-2 flex-wrap mb-4">
        {['all', 'delivered', 'processing', 'shipped', 'cancelled', 'returned'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all capitalize ${
              filter === s ? 'bg-[#2D9DBB] text-white border-[#2D9DBB]' : 'border-slate-200 text-slate-500 hover:border-slate-300'
            }`}>
            {s === 'all' ? 'All Orders' : s}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHeader columns={['#', 'Order ID', 'Date', 'Product', 'IMEI No.', 'Amount', 'Status', 'Action']} />
            <tbody>
              {filtered.map((o, i) => (
                <motion.tr key={o.orderId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-xs text-slate-400">{o.no}</td>
                  <td className="px-4 py-3 font-mono text-xs font-bold text-[#2D9DBB]">{o.orderId}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{o.date}</td>
                  <td className="px-4 py-3 text-xs text-slate-700 max-w-[180px] truncate">{o.product}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{o.imei}</td>
                  <td className="px-4 py-3 text-xs font-bold text-slate-800 whitespace-nowrap">₹{o.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${STATUS_STYLE[o.status]}`}>{o.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-[10px] font-semibold text-[#2D9DBB] hover:underline flex items-center gap-1">
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

// ─── Section: Wallet ─────────────────────────────────────────────────────────
function WalletSection() {
  const [addMoneyOpen, setAddMoneyOpen] = useState(false)
  const [addBankOpen, setAddBankOpen] = useState(false)
  const [amount, setAmount] = useState('')

  const balance = TRANSACTIONS.reduce((s, t) => t.type === 'credit' ? s + t.amount : s - t.amount, 0)

  return (
    <div className="space-y-5">
      {/* Balance card */}
      <div className="bg-gradient-to-br from-[#092533] to-[#2D9DBB] rounded-2xl p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-white/60 mb-1">Available Wallet Balance</p>
          <p className="text-3xl font-black">₹{balance.toLocaleString()}</p>
          <p className="text-xs text-white/60 mt-1">Last updated: 20 Jun 2026</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setAddMoneyOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold rounded-xl transition-all">
            <Plus size={13} /> Add Money
          </button>
          <button onClick={() => setAddBankOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold rounded-xl transition-all">
            <Building2 size={13} /> Add Bank
          </button>
        </div>
      </div>

      {/* Saved banks */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4">
        <p className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
          <CreditCard size={14} className="text-[#2D9DBB]" /> My Banks
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { bank: 'HDFC Bank', acc: '••••4521', ifsc: 'HDFC0001234', type: 'Savings' },
            { bank: 'SBI',       acc: '••••7890', ifsc: 'SBIN0005678', type: 'Current' },
          ].map(b => (
            <div key={b.acc} className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3">
              <div className="w-8 h-8 rounded-lg bg-[#2D9DBB]/10 flex items-center justify-center">
                <Building2 size={14} className="text-[#2D9DBB]" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">{b.bank}</p>
                <p className="text-[10px] text-slate-400">{b.acc} · {b.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction history */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
          <History size={14} className="text-[#2D9DBB]" />
          <p className="text-sm font-bold text-slate-800">Transaction History</p>
        </div>
        <ToolBar search="" setSearch={() => {}} dateRange="All time"
          onDownloadPDF={() => {}} onDownloadExcel={() => {}} />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHeader columns={['Date', 'Description', 'Type', 'Amount']} />
            <tbody>
              {TRANSACTIONS.map((t, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-4 py-3 text-xs text-slate-500">{t.date}</td>
                  <td className="px-4 py-3 text-xs text-slate-700">{t.desc}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg capitalize ${t.type === 'credit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-xs font-black ${t.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>
                    {t.type === 'credit' ? '+' : '-'}₹{t.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Money Modal */}
      <AnimatePresence>
        {addMoneyOpen && (
          <Modal title="Add Money to Wallet" onClose={() => setAddMoneyOpen(false)}>
            <p className="text-xs text-slate-500 mb-3">Amount will be credited to your 1GBKART wallet</p>
            <input type="number" placeholder="Enter amount (₹)" value={amount} onChange={e => setAmount(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm mb-3 focus:border-[#2D9DBB] outline-none" />
            {['UPI', 'Net Banking', 'Card'].map(m => (
              <label key={m} className="flex items-center gap-2 mb-2 cursor-pointer">
                <input type="radio" name="addMoneyMethod" className="accent-[#2D9DBB]" /> <span className="text-sm">{m}</span>
              </label>
            ))}
            <button className="w-full py-3 mt-2 bg-[#2D9DBB] text-white font-bold rounded-xl hover:bg-[#1e7a94] transition-colors text-sm">
              Proceed to Pay
            </button>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Section: Loyalty Coins ──────────────────────────────────────────────────
function CoinsSection() {
  const balance = COINS_HISTORY.reduce((s, c) => s + c.coins, 0)
  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-br from-amber-600 to-yellow-400 rounded-2xl p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-white/70 mb-1">Your Coin Balance</p>
          <p className="text-3xl font-black flex items-center gap-2">🪙 {balance.toLocaleString()}</p>
          <p className="text-xs text-white/70 mt-1">1 Coin = ₹1 discount on your next order</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-white/20 hover:bg-white/30 border border-white/20 text-white text-xs font-bold rounded-xl transition-all">
            Redeem Coins
          </button>
          <button className="px-4 py-2.5 bg-white/20 hover:bg-white/30 border border-white/20 text-white text-xs font-bold rounded-xl transition-all">
            Add Bank for Coins
          </button>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
          <History size={14} className="text-amber-500" />
          <p className="text-sm font-bold text-slate-800">Coin History</p>
        </div>
        <table className="w-full text-sm">
          <TableHeader columns={['Date', 'Description', 'Coins']} />
          <tbody>
            {COINS_HISTORY.map((c, i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="px-4 py-3 text-xs text-slate-500">{c.date}</td>
                <td className="px-4 py-3 text-xs text-slate-700">{c.desc}</td>
                <td className={`px-4 py-3 text-xs font-black ${c.coins > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {c.coins > 0 ? `+${c.coins}` : c.coins} 🪙
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Section: Coupons ────────────────────────────────────────────────────────
function CouponsSection() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('all')

  const visible = COUPONS.filter(c => {
    const matchTab = tab === 'all' || (tab === 'used' ? c.status === 'expired' : c.status === 'active')
    const matchSearch = !search || c.code.includes(search.toUpperCase())
    return matchTab && matchSearch
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[160px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search coupons…"
            className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:border-[#2D9DBB] outline-none" />
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#2D9DBB] text-white text-xs font-bold rounded-xl hover:bg-[#1e7a94] transition-colors">
          <Plus size={12} /> Add Coupon
        </button>
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
        {[{ id: 'all', label: 'All Coupons' }, { id: 'active', label: 'Active' }, { id: 'used', label: 'Used / Expired' }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${tab === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {visible.map(c => (
          <div key={c.code} className={`border-2 border-dashed rounded-2xl p-4 flex items-start justify-between gap-3 ${
            c.status === 'active' ? 'border-[#2D9DBB]/40 bg-[#2D9DBB]/5' : 'border-slate-200 bg-slate-50 opacity-60'
          }`}>
            <div>
              <p className="font-mono text-lg font-black text-[#2D9DBB]">{c.code}</p>
              <p className="text-xs text-slate-600 mt-0.5">{c.discount}</p>
              <p className="text-[10px] text-slate-400 mt-1">Expires: {c.expiry}</p>
            </div>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-lg shrink-0 ${
              c.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
            }`}>{c.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Section: Account ────────────────────────────────────────────────────────
function AccountSection() {
  const [edit, setEdit] = useState(false)
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-black text-slate-800">Personal Information</p>
          <button onClick={() => setEdit(e => !e)} className="text-xs font-semibold text-[#2D9DBB] hover:underline">{edit ? 'Cancel' : 'Edit'}</button>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: 'Full Name', value: 'Rahul Sharma' },
            { label: 'Email', value: 'rahul@example.com' },
            { label: 'Mobile', value: '+91 98765 43210' },
            { label: 'Company', value: 'RS Electronics Pvt Ltd' },
          ].map(f => (
            <div key={f.label}>
              <p className="text-[11px] font-semibold text-slate-400 mb-1">{f.label}</p>
              {edit
                ? <input defaultValue={f.value} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:border-[#2D9DBB] outline-none bg-slate-50" />
                : <p className="text-sm font-semibold text-slate-800">{f.value}</p>
              }
            </div>
          ))}
        </div>
        {edit && <button className="mt-4 px-5 py-2.5 bg-[#2D9DBB] text-white font-bold rounded-xl text-sm hover:bg-[#1e7a94] transition-colors">Save Changes</button>}
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        <p className="text-sm font-black text-slate-800 mb-4">GST & Tax Details</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: 'GST Number', value: '27AADCB2230M1ZR' },
            { label: 'PAN Number', value: 'AADCB2230M' },
            { label: 'GST Address', value: 'Shop No 14, Electronics Market, Mumbai 400001' },
            { label: 'TAN Number', value: 'MUMR12345B' },
          ].map(f => (
            <div key={f.label}>
              <p className="text-[11px] font-semibold text-slate-400 mb-1">{f.label}</p>
              <p className="text-sm font-semibold text-slate-800">{f.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-black text-slate-800">Saved Addresses</p>
          <button className="flex items-center gap-1 text-xs font-semibold text-[#2D9DBB] hover:underline">
            <Plus size={12} /> Add Address
          </button>
        </div>
        {[
          { tag: 'Office', address: 'Shop 14, Electronics Market, Grant Road, Mumbai 400007' },
          { tag: 'Warehouse', address: 'Plot 22, MIDC Industrial Area, Thane 400601' },
        ].map(a => (
          <div key={a.tag} className="flex items-start gap-3 border border-slate-200 rounded-xl p-3 mb-2">
            <span className="text-[10px] bg-[#2D9DBB]/10 text-[#2D9DBB] font-bold px-2 py-1 rounded-lg shrink-0">{a.tag}</span>
            <p className="text-xs text-slate-600">{a.address}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Modal helper ─────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="fixed inset-0 bg-black/40 z-50" />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-white rounded-2xl shadow-2xl z-50 p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="font-black text-slate-900">{title}</p>
          <button onClick={onClose}><X size={18} className="text-slate-400" /></button>
        </div>
        {children}
      </motion.div>
    </>
  )
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────
export default function BuyerDashboard() {
  const [active, setActive] = useState('orders')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const totalSpend   = ORDERS.filter(o => o.status !== 'Cancelled').reduce((s, o) => s + o.amount, 0)
  const walletBal    = TRANSACTIONS.reduce((s, t) => t.type === 'credit' ? s + t.amount : s - t.amount, 0)
  const coinBalance  = COINS_HISTORY.reduce((s, c) => s + c.coins, 0)
  const activeCoupons = COUPONS.filter(c => c.status === 'active').length

  const STATS = [
    { icon: <ShoppingBag size={18} />, label: 'Total Orders',      value: ORDERS.length,                sub: `${ORDERS.filter(o=>o.status==='Delivered').length} delivered` },
    { icon: <Wallet size={18} />,      label: 'Wallet Balance',     value: `₹${walletBal.toLocaleString()}`, sub: 'Available balance',  color: '#2f9e44' },
    { icon: <Coins size={18} />,       label: 'Loyalty Coins',      value: `🪙 ${coinBalance}`,          sub: '= ₹' + coinBalance + ' savings', color: '#f59e0b' },
    { icon: <Tag size={18} />,         label: 'Active Coupons',     value: activeCoupons,                sub: 'Ready to use',        color: '#8b5cf6' },
  ]

  const CONTENT = { orders: <OrdersSection />, wallet: <WalletSection />, coins: <CoinsSection />, coupons: <CouponsSection />, account: <AccountSection /> }

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
          <span className="text-xs font-bold text-slate-500 hidden sm:block">Buyer Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#2D9DBB]/15 flex items-center justify-center">
              <User size={14} className="text-[#2D9DBB]" />
            </div>
            <span className="text-sm font-bold text-slate-700 hidden sm:block">Rahul Sharma</span>
          </div>
          <button onClick={() => navigate('/login')}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:border-red-300 hover:text-red-500 transition-colors">
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <>
          {/* Desktop sidebar */}
          <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-slate-100 py-6 px-3 sticky top-[57px] h-[calc(100vh-57px)]">
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
                  className="fixed left-0 top-0 bottom-0 w-56 bg-white border-r border-slate-100 py-6 px-3 z-50 lg:hidden"
                >
                  <SidebarContent active={active} setActive={(id) => { setActive(id); setSidebarOpen(false) }} />
                </motion.aside>
              </>
            )}
          </AnimatePresence>
        </>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 min-w-0">
          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {STATS.map(s => <StatCard key={s.label} {...s} />)}
          </div>

          {/* Section heading */}
          <div className="flex items-center gap-2 mb-4">
            {NAV.find(n => n.id === active)?.icon}
            <h2 className="text-base font-black text-slate-900">{NAV.find(n => n.id === active)?.label}</h2>
          </div>

          {/* Active section content */}
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
    <nav className="space-y-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">My Account</p>
      {NAV.map(n => (
        <button key={n.id} onClick={() => setActive(n.id)}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
            active === n.id ? 'bg-[#2D9DBB]/10 text-[#2D9DBB]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}>
          {n.icon} {n.label}
        </button>
      ))}
    </nav>
  )
}
