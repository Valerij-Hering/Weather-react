import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Настройка иконки маркера
const customMarkerIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  shadowSize: [41, 41],
});

const { BaseLayer, Overlay } = LayersControl;

const WeatherComponent = ({ weatherData, apiKey }) => {
  if (!weatherData || !weatherData.coord) {
    return <div>Loading map...</div>;  // Проверка на наличие данных перед рендером карты
  }

  const position = [weatherData.coord.lat, weatherData.coord.lon];  // Центр карты на основании координат города

  return (
    <MapContainer center={position} zoom={10} className="map-container">
      <LayersControl position="topright">
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>

        {/* Слой ветра */}
        <Overlay name="Wind Layer">
          <TileLayer
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`}
            opacity={0.5}
          />
        </Overlay>

        {/* Слой температуры */}
        <Overlay name="Temperature Layer">
          <TileLayer
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`}
            opacity={0.5}
          />
        </Overlay>

        {/* Слой осадков */}
        <Overlay name="Precipitation Layer">
          <TileLayer
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`}
            opacity={0.5}
          />
        </Overlay>
      </LayersControl>

      <Marker position={position} icon={customMarkerIcon}>
        <Popup>
          <div>
            <h3>{weatherData.name}</h3>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default WeatherComponent;
