function parseSensorData(raw) {
  if (!raw) return {}
  try {
    const matches = raw.matchAll(/(\w+)=([\d.]+)/g)
    return Object.fromEntries([...matches].map(m => [m[1], parseFloat(m[2])]))
  } catch {
    return {}
  }
}

const SENSOR_CONFIG = [
  { label: 'Temperatura', key: 'temp', unit: '°C',  color: '#f97316', bg: '#fff7ed', icon: '🌡' },
  { label: 'pH',          key: 'hum',   unit: 'pH',  color: '#6c63ff', bg: '#f5f3ff', icon: '⚗' },
  { label: 'Turbidez',    key: 'turb', unit: 'NTU', color: '#a855f7', bg: '#faf5ff', icon: '💧' },
  { label: 'Voltaje',     key: 'volt', unit: 'V',   color: '#22c55e', bg: '#f0fdf4', icon: '⚡' },
]

export default function SensorCards({ data }) {
  const parsed = data || {}
  console.log("DATA FINAL:", data);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 10,
    }}>
      {SENSOR_CONFIG.map(({ label, key, unit, color, bg, icon }) => {
        const value = parsed[key]
        return (
          <div key={label} style={{
            background: '#fff', borderRadius: 12, padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: '0 1px 4px #0000000a', border: '1px solid #f3f4f6',
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9, background: bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, flexShrink: 0,
            }}>
              {icon}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 10, color: '#9ca3af', fontWeight: 500, marginBottom: 1 }}>{label}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                <span style={{
                  fontSize: 20, fontWeight: 700, color, lineHeight: 1,
                  fontFamily: 'monospace', opacity: value !== undefined ? 1 : 0.35,
                }}>
                  {value !== undefined ? value.toFixed(1) : '---'}
                </span>
                <span style={{ fontSize: 10, color: '#9ca3af', fontWeight: 500 }}>{unit}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}