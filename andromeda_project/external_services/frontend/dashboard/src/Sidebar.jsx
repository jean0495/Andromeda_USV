import { Database, Settings, LogOut, Waves, Navigation } from 'lucide-react'
import { useState } from 'react'

const navModes = ['Autónomo', 'Teleoperado']

export default function Sidebar({ active, setActive, navMode, setNavMode }) {
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Waves size={20} color="white" />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, color: '#1a1a2e' }}>ANDROMEDA</p>
            <p className="mono" style={{ fontSize: 11, color: '#9ca3af' }}>USV SYSTEM</p>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p className="mono" style={{ fontSize: 10, color: '#9ca3af', padding: '0 14px', marginBottom: 8 }}>
            MODO DE NAVEGACIÓN
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '0 4px' }}>
            {navModes.map(mode => (
              <div key={mode}
                onClick={() => setNavMode(mode)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px', borderRadius: 12, cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: navMode === mode ? 'linear-gradient(135deg, #6c63ff22, #a855f722)' : 'transparent',
                  border: navMode === mode ? '1.5px solid #6c63ff44' : '1.5px solid transparent',
                  color: navMode === mode ? '#6c63ff' : '#6b7280',
                  fontSize: 13, fontWeight: 500,
                }}>
                <Navigation size={15} />
                <span>{mode}</span>
                {navMode === mode && (
                  <span style={{
                    marginLeft: 'auto', width: 7, height: 7, borderRadius: '50%',
                    background: '#6c63ff'
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #e0e3ff', paddingTop: 16 }}>
          <p className="mono" style={{ fontSize: 10, color: '#9ca3af', padding: '0 14px', marginBottom: 8 }}>
            SISTEMA
          </p>
          {[
            { icon: Database, label: 'Base de datos' },
            { icon: Settings, label: 'Configuración' },
          ].map(({ icon: Icon, label }) => (
            <div key={label}
              className={`sidebar-item ${active === label ? 'active' : ''}`}
              onClick={() => setActive(label)}>
              <Icon size={17} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-item danger">
        <LogOut size={17} />
        <span>Salir</span>
      </div>
    </aside>
  )
}