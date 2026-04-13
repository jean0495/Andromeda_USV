export default function CameraFeed() {
  return (
    <div className="card glow">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold tracking-widest text-cyan-400 mono">CÁMARA — CAM_01</h2>
        <span className="badge">LIVE</span>
      </div>

      <div className="relative w-full aspect-video bg-gray-950 rounded-lg border border-cyan-900 flex items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 text-gray-600">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M23 7l-7 5 7 5V7z"/>
            <rect x="1" y="5" width="15" height="14" rx="2"/>
          </svg>
          <p className="mono text-xs tracking-widest">STREAM NO DISPONIBLE</p>
        </div>

        <div className="absolute top-2 left-2 mono text-xs text-cyan-800">REC ●</div>
        <div className="absolute bottom-2 right-2 mono text-xs text-cyan-800">CAM_01 / 1080p</div>

        <div className="absolute inset-0 border border-cyan-900 rounded-lg pointer-events-none"
          style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #00e5ff04 40px, #00e5ff04 41px)' }}
        />
      </div>
    </div>
  )
}