import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LOGO_SRC = '/1gbkart logo .webp'

function Particle({ x, y, size, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 0.5, 0], scale: [0, 1, 0], y: [0, -35] }}
      transition={{ duration: 2, delay, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute rounded-full bg-[#2D9DBB] pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, filter: 'blur(1px)' }}
    />
  )
}

const PARTICLES = [
  { x: 12, y: 18, size: 8, delay: 0 }, { x: 82, y: 12, size: 11, delay: 0.3 },
  { x: 22, y: 72, size: 6, delay: 0.6 }, { x: 72, y: 68, size: 9, delay: 0.9 },
  { x: 50, y: 8, size: 13, delay: 0.2 }, { x: 8, y: 48, size: 7, delay: 0.8 },
  { x: 88, y: 38, size: 8, delay: 0.4 }, { x: 38, y: 88, size: 10, delay: 0.1 },
  { x: 62, y: 28, size: 5, delay: 0.7 }, { x: 90, y: 78, size: 7, delay: 0.5 },
]

export default function SplashScreen({ onDone }) {
  const [visible, setVisible] = useState(true)
  // Store callback in ref so the effect never re-runs due to prop reference changes
  const onDoneRef = useRef(onDone)

  useEffect(() => {
    // fade-out starts at 1s, onDone fires at 1.5s (after exit animation)
    const t1 = setTimeout(() => setVisible(false), 1000)
    const t2 = setTimeout(() => onDoneRef.current?.(), 1500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, []) // empty deps — intentional, runs exactly once

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #ddf1f8 100%)' }}
        >
          {/* Blurred blobs */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#2D9DBB]/15 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#B8BDC9]/20 blur-[80px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#2D9DBB]/6 blur-[100px] pointer-events-none" />

          {/* Particles */}
          {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}

          {/* Logo + text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-5"
          >
            {/* Logo image — floats gently */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src={LOGO_SRC}
                alt="1GB KART Logo"
                className="w-28 h-28 object-contain drop-shadow-[0_8px_32px_rgba(45,157,187,0.35)]"
              />
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-3xl font-black tracking-tight">
                <span className="text-[#B8BDC9]">1GB</span>
                <span className="text-[#2D9DBB]">KART</span>
              </p>
              <p className="text-sm font-medium text-slate-400 mt-1.5 tracking-widest uppercase">
                One Partner for Endless Growth
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-44 h-0.5 bg-slate-100 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full rounded-full bg-[#2D9DBB]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.4, duration: 0.7, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
