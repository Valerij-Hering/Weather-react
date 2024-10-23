import React from 'react';


const WeatherInfo = ({ weatherData, data }) => {
    
    function getWindDirection(deg) {
        if (deg >= 337.5 || deg < 22.5) return 'N';   // Север
        if (deg >= 22.5 && deg < 67.5) return 'NE';   // Северо-восток
        if (deg >= 67.5 && deg < 112.5) return 'E';   // Восток
        if (deg >= 112.5 && deg < 157.5) return 'SE'; // Юго-восток
        if (deg >= 157.5 && deg < 202.5) return 'S';  // Юг
        if (deg >= 202.5 && deg < 247.5) return 'SW'; // Юго-запад
        if (deg >= 247.5 && deg < 292.5) return 'W';  // Запад
        if (deg >= 292.5 && deg < 337.5) return 'NW'; // Северо-запад
      }

      const windDirection = getWindDirection(weatherData.wind.deg);

    function capitalizeWords(text) {
        return text.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    const description = weatherData.weather[0].description;
    const capitalizedDescription = capitalizeWords(description);


    return (
        <div className="weather-info" >
            <div className='weather-info-box1'>
                <img className='weather-icon-header' src={`weather-icons-header/${weatherData.weather[0].icon}.png`} alt='icon'/>
                <p className="weather-info-temp">{Math.round(weatherData.main.temp)}<span className='degree-symbol'>°</span></p>
                <p className="weather-info-discr description">{capitalizedDescription}</p>
                <p className="weather-info-discr">min:{(weatherData.main.temp_min).toFixed()}° - max:{(weatherData.main.temp_max).toFixed()}°</p>
            </div>

            <div className='weather-info-box2'>
                <div>
                    <p className="weather-info-city">{weatherData.name}, {weatherData.sys.country}</p>
                    <p className="weather-info-discr"><b>UV-Index:</b> {(data.current.uvi).toFixed()}</p>
                    <p className="weather-info-discr"><b>Feels like:</b> {Math.round(weatherData.main.feels_like)}°</p>
                    <p className="weather-info-discr"><b>Humidity:</b> {weatherData.main.humidity}%</p>
                    <p className="weather-info-discr"><b>Wind:</b> {weatherData.wind.speed.toFixed(1)} m/s, {windDirection}</p>
                    <p className="weather-info-discr"><b>Pressure:</b> {weatherData.main.pressure} hPa</p>
                </div>
            
            </div>
        </div>
    );
};

export default WeatherInfo;
