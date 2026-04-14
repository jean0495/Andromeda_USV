import { useState } from 'react'
import Sidebar from './Sidebar'
import SensorCards from './SensorCards'
import SensorCharts from './SensorCharts'
import CameraFeed from './CameraFeed'
import MapPanel from './MapPanel'

const SYSTEM_STATES = {
  IDLE:      { label: 'EN ESPERA',  color: '#6b7280', bg: '#f9fafb' },
  READY:     { label: 'LISTO',      color: '#22c55e', bg: '#f0fdf4' },
  OPERATING: { label: 'OPERANDO',   color: '#6c63ff', bg: '#f5f3ff' },
  RTH:       { label: 'RETORNO',    color: '#f59e0b', bg: '#fffbeb' },
  ERROR:     { label: 'ERROR',      color: '#ef4444', bg: '#fef2f2' },
}

export default function App() {
  const [active, setActive] = useState('Dashboard')
  const [navMode, setNavMode] = useState('Autónomo')
  const [systemState, setSystemState] = useState('IDLE')
  const [operating, setOperating] = useState(false)

  const handleMission = () => {
    if (!operating) {
      setSystemState('OPERATING')
      setOperating(true)
    } else {
      setSystemState('IDLE')
      setOperating(false)
    }
  }

  const state = SYSTEM_STATES[systemState]

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar active={active} setActive={setActive} navMode={navMode} setNavMode={setNavMode} />
      <main className="main">

        <div className="page-header">
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a2e', letterSpacing: -0.5 }}>
              👋 Bienvenido, Jean
            </h1>
            <p className="mono" style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>
              ANDROMEDA USV — PANEL DE CONTROL
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              padding: '8px 16px', borderRadius: 12,
              background: state.bg, border: `1.5px solid ${state.color}33`,
              display: 'flex', alignItems: 'center', gap: 8
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: state.color }} />
              <span className="mono" style={{ fontSize: 12, color: state.color, fontWeight: 600 }}>
                {state.label}
              </span>
            </div>
            <span className="badge">ROS2 HUMBLE</span>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #6c63ff, #a855f7)',
          borderRadius: 16, padding: '20px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 24, boxShadow: '0 4px 24px #6c63ff33'
        }}>
          <div>
            <p style={{ color: '#ffffff99', fontSize: 12, marginBottom: 4 }} className="mono">
              CONTROL DE MISIÓN
            </p>
            <p style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>
              {operating ? 'Misión en curso — ' + navMode : 'Sistema listo para operar'}
            </p>
            <p style={{ color: '#ffffff88', fontSize: 12, marginTop: 4 }}>
              Modo: {navMode} · Estado: {state.label}
            </p>
          </div>
          <button onClick={handleMission} style={{
            padding: '12px 28px', borderRadius: 12, border: 'none',
            background: operating ? '#ef444422' : '#ffffff',
            color: operating ? '#fca5a5' : '#6c63ff',
            fontWeight: 700, fontSize: 14, cursor: 'pointer',
            border: operating ? '1.5px solid #ef444466' : 'none',
            transition: 'all 0.2s', fontFamily: 'Exo 2, sans-serif',
            letterSpacing: 0.5,
          }}>
            {operating ? '⏹ DETENER MISIÓN' : '▶ INICIAR MISIÓN'}
          </button>
        </div>

        <SensorCards />

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SensorCharts />
            <MapPanel />
          </div>
          <div>
            <CameraFeed />
          </div>
        </div>

      </main>
    </div>
  )
}