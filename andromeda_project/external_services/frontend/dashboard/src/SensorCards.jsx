// Parsea "SensorData(temp=25.3, hum=58.2)" → { temp: 25.3, hum: 58.2 }
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
  { label: 'pH',          key: 'ph',   unit: 'pH',  color: '#6c63ff', bg: '#f5f3ff', icon: '⚗' },
  { label: 'Turbidez',    key: 'turb', unit: 'NTU', color: '#a855f7', bg: '#faf5ff', icon: '💧' },
  { label: 'Voltaje',     key: 'volt', unit: 'V',   color: '#22c55e', bg: '#f0fdf4', icon: '⚡' },
]

export default function SensorCards({ data }) {
  const parsed = parseSensorData(data)

  return (
    <div className="sensor-grid">
      {SENSOR_CONFIG.map(({ label, key, unit, color, bg, icon }) => {
        const value = parsed[key]

        return (
          <div key={label} className="sensor-card">
            <div className="sensor-icon-wrap" style={{ background: bg, fontSize: 20 }}>
              {icon}
            </div>
            <p className="sensor-label">{label}</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
              <span className="sensor-value" style={{
                color,
                // 🔸 gris si aún no hay dato real
                opacity: value !== undefined ? 1 : 0.35
              }}>
                {value !== undefined ? value.toFixed(1) : '---'}
              </span>
              <span className="sensor-unit">{unit}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}