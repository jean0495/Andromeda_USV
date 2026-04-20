import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useRef, useEffect, useState } from 'react'

const MAX_POINTS = 30

const SENSORS = [
  { key: 'temp',  label: 'Temperatura', unit: '°C',  color: '#f97316', icon: '🌡' },
  { key: 'ph',    label: 'pH',          unit: '',    color: '#6c63ff', icon: '⚗' },
  { key: 'turb',  label: 'Turbidez',    unit: 'NTU', color: '#a855f7', icon: '💧' },
]

function parseSensorData(raw) {
  if (!raw) return null
  try {
    const matches = raw.matchAll(/(\w+)=([\d.]+)/g)
    return Object.fromEntries([...matches].map(m => [m[1], parseFloat(m[2])]))
  } catch {
    return null
  }
}

const CustomTooltip = ({ active, payload, label, unit, color }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="card" style={{ padding: '8px 12px', fontSize: 11 }}>
      <p style={{ color: '#9ca3af' }}>{label}</p>
      <p style={{ color, fontWeight: 600 }}>{payload[0].value} {unit}</p>
    </div>
  )
}

export default function SensorCharts({ data }) {
  const [history, setHistory] = useState([])
  const tickRef = useRef(0)

  useEffect(() => {
    const parsed = parseSensorData(data)
    if (!parsed) return

    tickRef.current += 1
    const point = {
      t: `${tickRef.current}s`,
      ...parsed,
    }

    setHistory(prev => {
      const next = [...prev, point]
      return next.length > MAX_POINTS ? next.slice(-MAX_POINTS) : next
    })
  }, [data])

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <span style={{ fontSize: 18 }}>📊</span>
        <p style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e' }}>Variables ambientales</p>
        {history.length === 0 && (
          <span className="mono" style={{ fontSize: 10, color: '#9ca3af', marginLeft: 8 }}>
            Esperando datos MQTT...
          </span>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {SENSORS.map(({ key, label, unit, color, icon }) => (
          <div key={key}>
            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6, fontWeight: 500 }}>
              {icon} {label} <span className="mono" style={{ fontSize: 10 }}>{unit}</span>
            </p>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={history}>
                <XAxis dataKey="t" tick={{ fill: '#d1d5db', fontSize: 8 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#d1d5db', fontSize: 8 }} axisLine={false} tickLine={false} width={28} />
                <Tooltip content={<CustomTooltip unit={unit} color={color} />} />
                <Line type="monotone" dataKey={key} stroke={color} dot={false} strokeWidth={2.5} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  )
}