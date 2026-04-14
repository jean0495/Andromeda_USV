export default function CameraFeed() {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', height: '100%' }}>
      <div className="card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>📷</span>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e' }}>Cámara — CAM_01</p>
        </div>
        <span className="badge">● LIVE</span>
      </div>

      <div style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100% - 52px)',
        minHeight: 420,
        background: '#0f0f1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 12,
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: '#6c63ff22',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28
        }}>📹</div>
        <p className="mono" style={{ fontSize: 12, color: '#4b5563', letterSpacing: 2 }}>
          STREAM NO DISPONIBLE
        </p>
        <p style={{ fontSize: 11, color: '#374151' }}>
          Conecta la Raspberry Pi para ver el feed
        </p>

        <div style={{ position: 'absolute', top: 12, left: 14 }}>
          <span style={{
            fontSize: 11, color: '#ef4444',
            fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 4
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}/>
            REC
          </span>
        </div>
        <div style={{ position: 'absolute', bottom: 12, right: 14 }}>
          <span className="mono" style={{ fontSize: 11, color: '#374151' }}>CAM_01 / 1080p</span>
        </div>

        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #6c63ff08 40px, #6c63ff08 41px)',
        }}/>
      </div>
    </div>
  )
}