import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Upload, CreditCard, User, Building2, Warehouse, ArrowLeft, ArrowRight } from 'lucide-react'

const STEPS = [
  { id: 1, label: 'Personal Info', icon: <User size={14} /> },
  { id: 2, label: 'Company Info', icon: <Building2 size={14} /> },
  { id: 3, label: 'Warehouse', icon: <Warehouse size={14} /> },
  { id: 4, label: 'Documents', icon: <Upload size={14} /> },
  { id: 5, label: 'Deposit', icon: <CreditCard size={14} /> },
]

function StepBar({ current }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((s, i) => (
        <div key={s.id} className="flex items-center flex-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 transition-all ${
            s.id < current ? 'bg-green-500 text-white' :
            s.id === current ? 'bg-[#2f9e44] text-white ring-4 ring-[#2f9e44]/20' :
            'bg-slate-100 text-slate-400'
          }`}>
            {s.id < current ? <Check size={12} /> : s.id}
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-0.5 mx-1 transition-all ${s.id < current ? 'bg-green-400' : 'bg-slate-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function Field({ label, type = 'text', placeholder, required, value, onChange }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-slate-500 mb-1">{label}{required && ' *'}</label>
      <input
        type={type} placeholder={placeholder} value={value || ''} onChange={e => onChange(e.target.value)} required={required}
        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-[#2f9e44] focus:ring-2 focus:ring-[#2f9e44]/20 outline-none transition-all"
      />
    </div>
  )
}

function StepButton({ onBack, finalLabel, color = '#2f9e44', hoverColor = '#237a33' }) {
  return (
    <div className="flex gap-3 pt-2">
      {onBack && (
        <button type="button" onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:border-slate-300 transition-colors">
          <ArrowLeft size={14} /> Back
        </button>
      )}
      <button type="submit"
        className="flex-1 flex items-center justify-center gap-2 py-3 text-white font-bold rounded-xl transition-colors text-sm"
        style={{ backgroundColor: color }}
      >
        {finalLabel || 'Continue'} <ArrowRight size={14} />
      </button>
    </div>
  )
}

const PRODUCT_CATS = ['Mobile Phones', 'Laptops', 'Earphones', 'Neckbands', 'TV', 'Accessories', 'Tablets', 'Cameras']

export default function SellerRegisterPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ categories: [] })
  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }))
  const toggleCat = (cat) => setForm(f => ({
    ...f,
    categories: f.categories.includes(cat) ? f.categories.filter(c => c !== cat) : [...f.categories, cat],
  }))

  const next = (e) => { e.preventDefault(); setStep(s => s + 1) }
  const back = () => setStep(s => s - 1)
  const finish = (e) => { e.preventDefault(); navigate('/login') }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <header className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 select-none">
          <img src="/1gbkart logo .webp" alt="1GB KART" className="w-8 h-8 object-contain" />
          <span className="font-black text-base"><span className="text-slate-400">1GB</span><span className="text-[#2D9DBB]">KART</span></span>
        </Link>
        <Link to="/login" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#2f9e44] transition-colors">
          <ArrowLeft size={14} /> Back to Login
        </Link>
      </header>

      <div className="max-w-xl mx-auto px-4 py-10">
        <div className="text-center mb-6">
          <span className="text-3xl">🏪</span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Register as Seller / Vendor</h1>
          <p className="text-sm text-slate-500 mt-1">Step {step} of {STEPS.length} — {STEPS[step - 1].label}</p>
        </div>

        <StepBar current={step} />

        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={next} className="space-y-3">
                <h2 className="text-sm font-black text-slate-800 mb-4">Personal Information</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="First Name" required value={form.fname} onChange={set('fname')} />
                  <Field label="Last Name" required value={form.lname} onChange={set('lname')} />
                </div>
                <Field label="Email Address" type="email" required value={form.email} onChange={set('email')} />
                <Field label="Mobile Number" type="tel" required value={form.phone} onChange={set('phone')} />
                <Field label="Password" type="password" required value={form.password} onChange={set('password')} />
                <Field label="Confirm Password" type="password" required value={form.cpassword} onChange={set('cpassword')} />
                <StepButton />
              </motion.form>
            )}

            {step === 2 && (
              <motion.form key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={next} className="space-y-3">
                <h2 className="text-sm font-black text-slate-800 mb-4">Company / Vendor Information</h2>
                <Field label="Company / Vendor Name" required value={form.company} onChange={set('company')} />
                <Field label="GST Number" required placeholder="22AAAAA0000A1Z5" value={form.gst} onChange={set('gst')} />
                <Field label="GST Registered Address" required value={form.gstAddr} onChange={set('gstAddr')} />
                <Field label="PAN Number" required value={form.pan} onChange={set('pan')} />
                <Field label="TAN Number" value={form.tan} onChange={set('tan')} />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="City" required value={form.city} onChange={set('city')} />
                  <Field label="PIN Code" required value={form.pin} onChange={set('pin')} />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-slate-500 mb-2">Product Categories *</p>
                  <div className="flex flex-wrap gap-2">
                    {PRODUCT_CATS.map(cat => (
                      <button type="button" key={cat} onClick={() => toggleCat(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all ${
                          form.categories.includes(cat)
                            ? 'border-[#2f9e44] bg-[#2f9e44]/10 text-[#2f9e44]'
                            : 'border-slate-200 text-slate-500 hover:border-slate-300'
                        }`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <StepButton onBack={back} />
              </motion.form>
            )}

            {step === 3 && (
              <motion.form key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={next} className="space-y-3">
                <h2 className="text-sm font-black text-slate-800 mb-4">Warehouse / Storage Details</h2>
                <Field label="Warehouse Address" required value={form.whAddr} onChange={set('whAddr')} />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="City" required value={form.whCity} onChange={set('whCity')} />
                  <Field label="PIN Code" required value={form.whPin} onChange={set('whPin')} />
                </div>
                <Field label="State" required value={form.whState} onChange={set('whState')} />
                <Field label="Storage Capacity (sq ft)" type="number" value={form.sqft} onChange={set('sqft')} />
                <Field label="Contact Person at Warehouse" value={form.whContact} onChange={set('whContact')} />
                <Field label="Warehouse Phone" type="tel" value={form.whPhone} onChange={set('whPhone')} />
                <StepButton onBack={back} />
              </motion.form>
            )}

            {step === 4 && (
              <motion.form key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={next} className="space-y-4">
                <h2 className="text-sm font-black text-slate-800 mb-2">Upload Documents</h2>
                <p className="text-xs text-slate-500 bg-amber-50 border border-amber-100 rounded-xl p-3">
                  📋 Required: GST certificate, warehouse photo, electricity bill, Aadhaar, cancelled cheque
                </p>
                {[
                  { key: 'gstCert', label: 'GST Certificate *' },
                  { key: 'whPhoto', label: 'Warehouse Photo *' },
                  { key: 'electricityBill', label: 'Electricity Bill *' },
                  { key: 'aadhaar', label: 'Aadhaar Card *' },
                  { key: 'cheque', label: 'Cancelled Cheque *' },
                ].map(doc => (
                  <div key={doc.key}>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">{doc.label}</label>
                    <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-[#2f9e44] hover:bg-[#2f9e44]/5 transition-all group">
                      <Upload size={16} className="text-slate-400 group-hover:text-[#2f9e44] flex-shrink-0" />
                      <span className="text-sm text-slate-500 group-hover:text-[#2f9e44]">
                        {form[doc.key] ? `✓ ${form[doc.key]}` : 'Click to upload PDF / JPG'}
                      </span>
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden"
                        onChange={e => set(doc.key)(e.target.files[0]?.name)} />
                    </label>
                  </div>
                ))}
                <StepButton onBack={back} />
              </motion.form>
            )}

            {step === 5 && (
              <motion.form key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={finish} className="space-y-5">
                <h2 className="text-sm font-black text-slate-800 mb-2">Security Deposit</h2>
                <div className="bg-[#2f9e44]/5 border border-[#2f9e44]/20 rounded-2xl p-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-black text-[#2f9e44]">₹10,000</span>
                    <span className="text-xs text-slate-500">one-time refundable deposit</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Activate your seller account with a refundable security deposit. Your account will be reviewed by our admin team within 2-3 business days after payment.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">Payment Method</p>
                  {['UPI / QR Code', 'Net Banking', 'Credit / Debit Card', 'NEFT / RTGS'].map(m => (
                    <label key={m} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl mb-2 cursor-pointer hover:border-[#2f9e44] transition-all">
                      <input type="radio" name="payMethod" value={m} required className="accent-[#2f9e44]" />
                      <span className="text-sm font-semibold text-slate-700">{m}</span>
                    </label>
                  ))}
                </div>
                <StepButton onBack={back} finalLabel="Pay ₹10,000 & Submit" />
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
