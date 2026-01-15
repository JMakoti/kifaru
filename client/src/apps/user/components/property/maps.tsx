import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Maps({
  position,
  name,
}: {
  position: [number, number];
  name: string;
}) {
  return (
    <div className="relative z-0">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "500px", width: "100%",borderRadius:"20px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <strong>{name}</strong>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
