import { useState, useEffect } from 'react'

const STATUS = {
  READY:     { label: 'LISTO',    color: 'text-green-400',  border: 'border-green-900' },
  OPERATING: { label: 'OPERANDO', color: 'text-cyan-400',   border: 'border-cyan-900'  },
  RTH:       { label: 'RETORNO',  color: 'text-yellow-400', border: 'border-yellow-900'},
  ERROR:     { label: 'ERROR',    color: 'text-red-400',    border: 'border-red-900'   },
}

function Item({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-800">
      <span className="mono text-xs text-gray-500">{label}</span>
      <span className="mono text-xs text-cyan-300">{value}</span>
    </div>
  )
}

function Battery({ level }) {
  const color = level > 50 ? 'bg-green-400' : level > 20 ? 'bg-yellow-400' : 'bg-red-400'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${level}%` }} />
      </div>
      <span className="mono text-xs text-cyan-300">{level}%</span>
    </div>
  )
}

export default function TelemetryPanel() {
  const [telemetry, setTelemetry] = useState({
    battery: 78, mode: 'READY',
    lat: 3.4516, lon: -76.5320, voltage: 12.4,
    speed: 0.0, heading: 245,
  })

  useEffect(() => {
    const id = setInterval(() => {
      setTelemetry(t => ({
        ...t,
        voltage: +(11.5 + Math.random()).toFixed(2),
        speed: +(Math.random() * 2).toFixed(1),
        heading: Math.floor(Math.random() * 360),
      }))
    }, 2000)
    return () => clearInterval(id)
  }, [])

  const status = STATUS[telemetry.mode]

  return (
    <div className="card glow space-y-4 h-full">
      <h2 className="text-sm font-semibold tracking-widest text-cyan-400 mono">TELEMETRÍA</h2>

      <div className={`border ${status.border} rounded-lg p-3 text-center`}>
        <p className="mono text-xs text-gray-500 mb-1">ESTADO DEL SISTEMA</p>
        <p className={`mono text-lg font-bold ${status.color}`}>{status.label}</p>
      </div>

      <div>
        <p className="mono text-xs text-gray-500 mb-2">BATERÍA</p>
        <Battery level={telemetry.battery} />
      </div>

      <div className="space-y-0">
        <Item label="MODO NAV"   value={telemetry.mode} />
        <Item label="VOLTAJE"    value={`${telemetry.voltage} V`} />
        <Item label="VELOCIDAD"  value={`${telemetry.speed} m/s`} />
        <Item label="HEADING"    value={`${telemetry.heading}°`} />
        <Item label="LATITUD"    value={telemetry.lat} />
        <Item label="LONGITUD"   value={telemetry.lon} />
      </div>
    </div>
  )
}