import { useEffect, useRef } from 'react'

function SingleCamera({ label, onFrameRef }) {
  const imgRef = useRef(null);

  useEffect(() => {
    if (onFrameRef) {
      //  Registra la función que actualiza el img directamente
      onFrameRef.current = (src) => {
        if (imgRef.current) imgRef.current.src = src;
      };
    }
    return () => {
      if (onFrameRef) onFrameRef.current = null;
    };
  }, [onFrameRef]);

  const isConnected = !!onFrameRef

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="card-header" style={{ padding: '10px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14 }}>📷</span>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e' }}>Cámara — {label}</p>
        </div>
        <span className="badge" style={{
          background: '#fef2f2', color: '#ef4444',
          border: '1px solid #ef444433'
        }} id={`badge-${label}`}>
          ● OFFLINE
        </span>
      </div>

      <div style={{
        position: 'relative', flex: 1, minHeight: 200,
        background: '#0f0f1a', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 10,
      }}>
        {/*  img siempre en el DOM, oculta hasta que llega el primer frame */}
        <img
          ref={imgRef}
          alt={label}
          onLoad={() => {
            // Cuando llega el primer frame, muestra y actualiza badge
            if (imgRef.current) imgRef.current.style.display = 'block';
            const badge = document.getElementById(`badge-${label}`);
            if (badge) {
              badge.textContent = '● LIVE';
              badge.style.background = '#f0fdf4';
              badge.style.color = '#22c55e';
              badge.style.border = '1px solid #22c55e33';
            }
          }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'none', // oculto hasta primer frame
          }}
        />

        {/* Placeholder — visible hasta que llega stream */}
        <div id={`placeholder-${label}`}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: '#6c63ff22',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
          }}>
            📹
          </div>
          <p className="mono" style={{
            fontSize: 11, color: '#4b5563',
            letterSpacing: 2, textTransform: 'uppercase', marginTop: 8
          }}>
            STREAM NO DISPONIBLE
          </p>
        </div>

        {/* Overlays */}
        <div style={{ position: 'absolute', top: 10, left: 12, zIndex: 10 }}>
          <span id={`rec-${label}`} style={{
            fontSize: 10, fontFamily: 'monospace', color: '#ef4444',
            display: 'flex', alignItems: 'center', gap: 4
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#ef4444', display: 'inline-block'
            }}/>
            SIN SEÑAL
          </span>
        </div>

        <div style={{ position: 'absolute', bottom: 10, right: 12, zIndex: 10 }}>
          <span className="mono" style={{ fontSize: 10, color: '#374151' }}>
            {label} / 320p
          </span>
        </div>
      </div>
    </div>
  )
}

export default function CameraFeed({ onFrameRef, onFrameRef2 }) {
  return (
    <div className="card" style={{
      padding: 0, overflow: 'hidden', height: '100%',
      display: 'flex', flexDirection: 'column'
    }}>
      <SingleCamera label="CAM_01" onFrameRef={onFrameRef} />
      <div style={{ height: 1, background: '#1a1a2e22' }} />
      <SingleCamera label="CAM_02" onFrameRef={onFrameRef2} />
    </div>
  )
}