import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useState, useEffect } from 'react'

const mockData = Array.from({ length: 20 }, (_, i) => ({
  time: `${i}s`,
  temperatura: (20 + Math.random() * 5).toFixed(1),
  ph: (7 + Math.random()).toFixed(2),
  turbidez: (10 + Math.random() * 5).toFixed(1),
}))

export default function SensorCharts() {
  const [data, setData] = useState(mockData)

  return (
    <div className="bg-gray-900 rounded-2xl p-4 space-y-6">
      <h2 className="text-lg font-semibold text-cyan-300">Sensores en tiempo real</h2>

      {[
        { key: 'temperatura', color: '#f97316', label: 'Temperatura (°C)' },
        { key: 'ph', color: '#22d3ee', label: 'pH' },
        { key: 'turbidez', color: '#a78bfa', label: 'Turbidez (NTU)' },
      ].map(({ key, color, label }) => (
        <div key={key}>
          <p className="text-sm text-gray-400 mb-1">{label}</p>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={data}>
              <XAxis dataKey="time" tick={{ fill: '#9ca3af', fontSize: 10 }} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#111827', border: 'none' }} />
              <Line type="monotone" dataKey={key} stroke={color} dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  )
}