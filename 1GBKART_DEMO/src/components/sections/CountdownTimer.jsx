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
      <div className="w-10 h-10 bg-[#0F172A] text-white rounded-xl flex items-center justify-center text-base font-black tabular-nums shadow-inner">
        {pad(v)}
      </div>
      <span className="text-[9px] text-slate-400 mt-1 uppercase tracking-wide">{label}</span>
    </div>
  )

  return (
    <div className="flex items-end gap-1.5">
      <Seg v={h} label="hrs" />
      <span className="text-lg font-black text-slate-400 pb-4">:</span>
      <Seg v={m} label="min" />
      <span className="text-lg font-black text-slate-400 pb-4">:</span>
      <Seg v={s} label="sec" />
    </div>
  )
}
