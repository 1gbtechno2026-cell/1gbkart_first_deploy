import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import SuggestedProducts from './components/sections/SuggestedProducts'
import QuickViewModal from './components/QuickViewModal'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'

import LoginPage from './pages/LoginPage'
import BuyerRegisterPage from './pages/BuyerRegisterPage'
import SellerRegisterPage from './pages/SellerRegisterPage'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'

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

      {/* Push content below fixed navbar */}
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

        {/* Brand in Spotlight */}
        <section className="mb-4 sm:mb-8 bg-white rounded-2xl p-3 sm:p-5 border border-slate-100">
          <BrandSection />
        </section>

        {/* Suggested Products */}
        <section className="mb-4 sm:mb-8 bg-white rounded-2xl p-3 sm:p-5 border border-slate-100">
          <SuggestedProducts onQuickView={qv} />
        </section>

        {/* Trendy Products grid */}
        <section className="mb-4 sm:mb-8 bg-white rounded-2xl p-3 sm:p-5 border border-slate-100">
          <ProductGrid onQuickView={qv} />
        </section>

      </main>

      <Footer />
    </>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register/buyer" element={<BuyerRegisterPage />} />
      <Route path="/register/seller" element={<SellerRegisterPage />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f8fafc] antialiased">
        {!ready && <SplashScreen onDone={() => setReady(true)} />}
        {ready && (
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        )}
      </div>
    </BrowserRouter>
  )
}
