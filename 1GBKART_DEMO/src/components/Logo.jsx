export default function Logo({ size = 36, textClass = '' }) {
  return (
    <div className="flex items-center gap-3 select-none">
     
      <span className={`font-bold tracking-tight ${textClass || 'text-xl'}`}>
        <span className="text-[#A7AEB6]">1GB</span><span className="text-[#2D9DBB]">KART</span>
      </span>
    </div>
  )
}
