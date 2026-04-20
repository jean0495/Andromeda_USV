import { useState, useEffect } from 'react'

const STATUS = {
  READY:     { label: 'Listo',    color: '#22c55e', bg: '#f0fdf4' },
  OPERATING: { label: 'Operando', color: '#6c63ff', bg: '#f5f3ff' },
  RTH:       { label: 'Retorno',  color: '#f59e0b', bg: '#fffbeb' },
  ERROR:     { label: 'Error',    color: '#ef4444', bg: '#fef2f2' },
}

function Item({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-xs font-semibold text-gray-700 mono">{value}</span>
    </div>
  )
}

export default function TelemetryPanel() {
  const [tel, setTel] = useState({
    battery: 78, mode: 'READY',
    lat: 3.4516, lon: -76.5320,
    voltage: 12.4, speed: 0.0, heading: 245,
  })

  useEffect(() => {
    const id = setInterval(() => setTel(t => ({
      ...t,
      voltage: +(11.5 + Math.random()).toFixed(2),
      speed: +(Math.random() * 2).toFixed(1),
      heading: Math.floor(Math.random() * 360),
    })), 2000)
    return () => clearInterval(id)
  }, [])

  const s = STATUS[tel.mode]

  return (
    <div className="card space-y-4 h-full">
      <p className="text-sm font-semibold text-gray-700">Telemetría</p>

      <div className="rounded-xl p-3 text-center" style={{ background: s.bg }}>
        <p className="text-xs text-gray-400 mb-1">Estado</p>
        <p className="font-bold text-sm" style={{ color: s.color }}>{s.label}</p>
      </div>

      <div>
        <p className="text-xs text-gray-400 mb-2">Batería</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full"
              style={{
                width: `${tel.battery}%`,
                background: tel.battery > 50 ? '#22c55e' : tel.battery > 20 ? '#f59e0b' : '#ef4444'
              }} />
          </div>
          <span className="mono text-xs text-gray-600">{tel.battery}%</span>
        </div>
      </div>

      <div>
        <Item label="Modo" value={tel.mode} />
        <Item label="Voltaje" value={`${tel.voltage} V`} />
        <Item label="Velocidad" value={`${tel.speed} m/s`} />
        <Item label="Heading" value={`${tel.heading}°`} />
        <Item label="Latitud" value={tel.lat} />
        <Item label="Longitud" value={tel.lon} />
      </div>
    </div>
  )
}