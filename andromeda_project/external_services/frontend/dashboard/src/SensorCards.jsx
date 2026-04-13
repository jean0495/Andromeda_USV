const sensors = [
  { label: 'Temperatura', value: '23.4', unit: '°C',  color: '#f97316', bg: '#fff7ed', icon: '🌡' },
  { label: 'pH',          value: '7.2',  unit: 'pH',  color: '#6c63ff', bg: '#f5f3ff', icon: '⚗' },
  { label: 'Turbidez',    value: '12.1', unit: 'NTU', color: '#a855f7', bg: '#faf5ff', icon: '💧' },
  { label: 'Voltaje',     value: '12.4', unit: 'V',   color: '#22c55e', bg: '#f0fdf4', icon: '⚡' },
]

export default function SensorCards() {
  return (
    <div className="sensor-grid">
      {sensors.map(({ label, value, unit, color, bg, icon }) => (
        <div key={label} className="sensor-card">
          <div className="sensor-icon-wrap" style={{ background: bg, fontSize: 20 }}>
            {icon}
          </div>
          <p className="sensor-label">{label}</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <span className="sensor-value" style={{ color }}>{value}</span>
            <span className="sensor-unit">{unit}</span>
          </div>
        </div>
      ))}
    </div>
  )
}