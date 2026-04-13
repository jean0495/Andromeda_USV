import SensorCharts from './SensorCharts'
import TelemetryPanel from './TelemetryPanel'
import CameraFeed from './CameraFeed'

export default function App() {
  return (
    <div className="min-h-screen p-6 space-y-6">

      <header className="flex items-center justify-between border-b border-cyan-900 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-cyan-400 mono">ANDROMEDA USV</h1>
          <p className="text-xs text-gray-500 mono mt-1">SISTEMA DE MONITOREO EN TIEMPO REAL</p>
        </div>
        <div className="flex gap-3">
          <span className="badge">ROS2 HUMBLE</span>
          <span className="badge">ONLINE</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-6">
          <CameraFeed />
          <SensorCharts />
        </div>

        <div>
          <TelemetryPanel />
        </div>

      </div>

    </div>
  )
}