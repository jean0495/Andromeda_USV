import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useState, useEffect } from 'react'

const generate = () => Array.from({ length: 20 }, (_, i) => ({
  t: `${i}s`,
  temperatura: +(20 + Math.random() * 5).toFixed(1),
  ph: +(7 + Math.random()).toFixed(2),
  turbidez: +(10 + Math.random() * 5).toFixed(1),
}))

const SENSORS = [
  { key: 'temperatura', label: 'Temperatura', unit: '°C',  color: '#f97316', icon: '🌡' },
  { key: 'ph',          label: 'pH',           unit: '',    color: '#6c63ff', icon: '⚗' },
  { key: 'turbidez',    label: 'Turbidez',     unit: 'NTU', color: '#a855f7', icon: '💧' },
]

const CustomTooltip = ({ active, payload, label, unit, color }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="card" style={{ padding: '8px 12px', fontSize: 11 }}>
      <p style={{ color: '#9ca3af' }}>{label}</p>
      <p style={{ color, fontWeight: 600 }}>{payload[0].value} {unit}</p>
    </div>
  )
}

export default function SensorCharts() {
  const [data, setData] = useState(generate)
  useEffect(() => {
    const id = setInterval(() => setData(generate()), 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <span style={{ fontSize: 18 }}>📊</span>
        <p style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e' }}>Variables ambientales</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {SENSORS.map(({ key, label, unit, color, icon }) => (
          <div key={key}>
            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6, fontWeight: 500 }}>
              {icon} {label} <span className="mono" style={{ fontSize: 10 }}>{unit}</span>
            </p>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={data}>
                <XAxis dataKey="t" tick={{ fill: '#d1d5db', fontSize: 8 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#d1d5db', fontSize: 8 }} axisLine={false} tickLine={false} width={28} />
                <Tooltip content={<CustomTooltip unit={unit} color={color} />} />
                <Line type="monotone" dataKey={key} stroke={color} dot={false} strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  )
}