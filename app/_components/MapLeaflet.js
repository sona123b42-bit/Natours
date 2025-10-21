"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "@/app/_styles/style.css";

// Custom pin icon (uses /public/img/pin.png)
const pinIcon = L.icon({
  iconUrl: "/img/pin.png",
  iconSize: [32, 40],
  iconAnchor: [16, 40], // bottom center
  popupAnchor: [0, -36],
});

export default function MapLeaflet({ locations }) {
  if (!locations || locations.length === 0) return null;

  // Leaflet expects [lat, lng] (your API gives [lng, lat])
  const points = locations.map((loc) => [
    loc.coordinates[1],
    loc.coordinates[0],
  ]);

  // Center at the first point; we’ll fit bounds anyway
  const center = points[0];

  return (
    <MapContainer
      center={center}
      zoom={6}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
      whenCreated={(map) => {
        const bounds = L.latLngBounds(points);
        map.fitBounds(bounds, { padding: [100, 100] });
      }}
    >
      {/* Free OpenStreetMap tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((loc, i) => (
        <Marker
          key={i}
          position={[loc.coordinates[1], loc.coordinates[0]]}
          icon={pinIcon}
        >
          <Popup>
            <strong>Day {loc.day}</strong> — {loc.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
