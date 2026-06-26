import { useState } from 'react'
import { CartProvider, useCart } from './context/CartContext'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import HeroCarousel from './components/sections/HeroCarousel'
import CategoryCarousel from './components/sections/CategoryCarousel'
import DealsSection from './components/sections/DealsSection'
import FlashSale from './components/sections/FlashSale'
import ProductGrid from './components/sections/ProductGrid'
import PromoBanners from './components/sections/PromoBanners'
import BrandSection from './components/sections/BrandSection'
import QuickViewModal from './components/QuickViewModal'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import './index.css'

function SectionDivider({ title, sub }) {
  return (
    <div className="py-3 border-b border-slate-100 mb-2">
      {title && <div className="flex items-baseline gap-2">
        <span className="text-[11px] font-black text-[#2D9DBB] uppercase tracking-widest">{title}</span>
        {sub && <span className="text-[10px] text-slate-400">{sub}</span>}
      </div>}
    </div>
  )
}

function HomePage() {
  const { setQuickView } = useCart()
  const qv = (p) => setQuickView(p)

  return (
    <>
      <Navbar />
      <CartDrawer />
      <QuickViewModal />

      {/* Push content below fixed navbar — navbar ~108px total (strip + main + cats) */}
      <main className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-8 pt-[118px] lg:pt-[132px]">

        {/* Hero */}
        <section className="mb-8">
          <HeroCarousel />
        </section>

        {/* Categories */}
        <section className="mb-4 sm:mb-8 bg-white rounded-2xl p-3 sm:p-5 border border-slate-100 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          <CategoryCarousel />
        </section>

        {/* Flash Sale */}
        <section className="mb-4 sm:mb-8">
          <FlashSale onQuickView={qv} />
        </section>

        {/* Deals of the Day */}
        <section className="mb-4 sm:mb-8 bg-white rounded-2xl p-3 sm:p-5 border border-slate-100">
          <DealsSection onQuickView={qv} />
        </section>

        {/* Promo banners */}
        <section className="mb-4 sm:mb-8">
          <PromoBanners />
        </section>

        {/* Hot Selling grid */}
        <section className="mb-4 sm:mb-8 bg-white rounded-2xl p-3 sm:p-5 border border-slate-100">
          <ProductGrid onQuickView={qv} />
        </section>

        {/* Brand section */}
        {/* <section className="mb-4 sm:mb-8">
          <BrandSection />
        </section> */}

      </main>

      <Footer />
    </>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <div className="min-h-screen bg-[#f8fafc] antialiased">
      {/* Unmount completely once done so it can never re-trigger */}
      {!ready && <SplashScreen onDone={() => setReady(true)} />}
      {ready && (
        <CartProvider>
          <HomePage />
        </CartProvider>
      )}
    </div>
  )
}
