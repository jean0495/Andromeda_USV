import { useEffect, useRef } from 'react'

export default function MapPanel() {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (mapInstanceRef.current) return

    import('leaflet').then(L => {
      import('leaflet/dist/leaflet.css')

      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current).setView([3.4516, -76.5320], 15)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
      L.marker([3.4516, -76.5320]).addTo(map).bindPopup('Andromeda USV')
      mapInstanceRef.current = map
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div className="card p-0 overflow-hidden">
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <p className="text-sm font-semibold text-gray-700">Ubicación del USV</p>
        <span className="badge badge-green mono text-xs">GPS ACTIVO</span>
      </div>
      <div ref={mapRef} style={{ height: '220px', width: '100%' }} />
    </div>
  )
}