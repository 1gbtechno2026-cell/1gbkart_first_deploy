import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Trust from './components/Trust'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Metrics from './components/Metrics'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import './index.css'

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 antialiased">
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <Services />
        <WhyUs />
        <Metrics />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
