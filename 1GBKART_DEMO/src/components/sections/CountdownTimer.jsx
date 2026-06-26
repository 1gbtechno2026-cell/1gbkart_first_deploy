import { useState, useEffect } from 'react'

function pad(n) { return String(n).padStart(2, '0') }

export default function CountdownTimer({ endMs }) {
  const [left, setLeft] = useState(Math.max(0, endMs - Date.now()))

  useEffect(() => {
    const t = setInterval(() => setLeft(l => Math.max(0, l - 1000)), 1000)
    return () => clearInterval(t)
  }, [])

  const h = Math.floor(left / 3600000)
  const m = Math.floor((left % 3600000) / 60000)
  const s = Math.floor((left % 60000) / 1000)

  const Seg = ({ v, label }) => (
    <div className="flex flex-col items-center">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#0F172A] text-white rounded-lg sm:rounded-xl flex items-center justify-center text-sm sm:text-base font-black tabular-nums shadow-inner">
        {pad(v)}
      </div>
      <span className="text-[8px] sm:text-[9px] text-slate-400 mt-0.5 sm:mt-1 uppercase tracking-wide">{label}</span>
    </div>
  )

  return (
    <div className="flex items-end gap-1 sm:gap-1.5">
      <Seg v={h} label="hrs" />
      <span className="text-base sm:text-lg font-black text-slate-400 pb-3 sm:pb-4">:</span>
      <Seg v={m} label="min" />
      <span className="text-base sm:text-lg font-black text-slate-400 pb-3 sm:pb-4">:</span>
      <Seg v={s} label="sec" />
    </div>
  )
}
