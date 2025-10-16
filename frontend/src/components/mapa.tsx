// src/components/Mapa.tsx
"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect } from "react"

// Fix default icon issue in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

export default function Mapa() {
  // Coordenadas aproximadas de la dirección en Cancún
  const position: [number, number] = [21.1619, -86.8515]

  return (
    <MapContainer
      center={position}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%", borderRadius: "0.75rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          ArtesanosMX · Oficina institucional<br />
          Av Carlos Nader, Cancún, Q.R.
        </Popup>
      </Marker>
    </MapContainer>
  )
}
