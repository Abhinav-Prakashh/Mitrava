import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { cities } from '../data/cities'

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function RiskMap() {

  // ✅ USER DATA
  const profileData = localStorage.getItem("userProfile");
  const profile = profileData ? JSON.parse(profileData) : null;

  const [city, setCity] = useState(profile?.city || "Bangalore");

  // 📍 CITY COORDINATES
  const cityCoords = {
    Bangalore: [12.9716, 77.5946],
    Mumbai: [19.0760, 72.8777],
    Delhi: [28.7041, 77.1025],
    Chennai: [13.0827, 80.2707],
  };

  const position = cityCoords[city] || [20.5937, 78.9629];

  // 🌧️ Fake weather logic
  const getWeather = (city) => {
    if (city === "Mumbai") return { rain: "120mm", temp: "30°C", aqi: "AQI 140" };
    if (city === "Delhi") return { rain: "20mm", temp: "36°C", aqi: "AQI 250" };
    return { rain: "80mm", temp: "32°C", aqi: "AQI 180" };
  };

  const weather = getWeather(city);

  return (
    <div className="flex flex-col gap-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs font-bold text-gray-500">Live Updates</p>
          <h1 className="text-4xl font-extrabold">
            Regional Risk <span className="text-blue-600">Density.</span>
          </h1>
        </div>

        {/* CITY SELECT */}
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          {cities.map(c => (
  <option key={c}>{c}</option>
))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 🗺️ REAL MAP */}
        <div className="lg:col-span-2 h-[450px] rounded-xl overflow-hidden">
          <MapContainer center={position} zoom={12} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='© OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position}>
              <Popup>
                📍 {city} <br /> High Risk Area
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* WEATHER */}
        <div className="flex flex-col gap-4">

          <Card label={`Weather Today · ${city}`}>
            <div className="flex justify-between py-2">
              <span>Rainfall</span>
              <span className="font-bold">{weather.rain}</span>
            </div>

            <div className="flex justify-between py-2">
              <span>Temperature</span>
              <span className="font-bold">{weather.temp}</span>
            </div>

            <div className="flex justify-between py-2">
              <span>Air Quality</span>
              <span className="font-bold">{weather.aqi}</span>
            </div>
          </Card>

          <Card label="Disruption Forecast">
            <p className="text-sm text-gray-600">
              High risk conditions expected in {city}
            </p>
          </Card>

        </div>
      </div>
    </div>
  );
}