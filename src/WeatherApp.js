import React, { useState, useEffect, useCallback } from 'react';
import CityInput from './components/CityInput';
import WeatherInfo from './components/WeatherInfo';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import TemperatureChart from './components/TemperatureChart';
import WeatherComponent from './Map';  // Импорт компонента карты
import PressureScale from './components/PressureScale';
import WindScale from './components/WindScale';
import UvIndex from './components/UvIndex';



const WeatherApp = () => {
    const api = {
        endpoint: 'https://api.openweathermap.org/data/2.5/',
        key: '6b9f15577ef5c811ae35044127a9dda3'
    };

    const [weatherData, setWeatherData] = useState(null);
    const [hourlyWeather, setHourlyWeather] = useState([]);
    const [dailyWeather, setDailyWeather] = useState([]);
    const [city, setCity] = useState('');
    const [isCitySearch, setIsCitySearch] = useState(false);
    const [timezoneOffset, setTimezoneOffset] = useState(null);
    const [selectedDay, setSelectedDay] = useState(0); 
    const [isLoading, setIsLoading] = useState(true);
    const [menu, setMenu] = useState('chart');
    const [pressure, setPressure] = useState(0);
    const [wind, setWind] = useState({ speed: 0, gust: 0, deg: 0 });
    const [uvIndex, setUvIndex] = useState(0);
    const [theme, setTheme] = useState('light');
    const [data, setData] = useState([])

    // Сохраняем и загружаем тему
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.body.className = savedTheme === 'light' ? '' : 'dark-theme';
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.body.className = newTheme === 'light' ? '' : 'dark-theme';
    };

    


    const getWeatherByLocation = useCallback(async (position) => {
        setIsLoading(true);
        const { latitude, longitude } = position.coords;
        try {
            const res = await fetch(`${api.endpoint}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`);
            const result = await res.json();
            setWeatherData(result);
            setPressure(result.main.pressure);
            setWind(result.wind);
            
            const resHourly = await fetch(`${api.endpoint}onecall?lat=${result.coord.lat}&lon=${result.coord.lon}&exclude=&units=metric&appid=${api.key}`);
            const resultHourly = await resHourly.json();
            setHourlyWeather(resultHourly.hourly);
            setDailyWeather(resultHourly.daily);
            setTimezoneOffset(resultHourly.timezone_offset);
            setUvIndex(resultHourly.daily[0].uvi);
            setIsLoading(false);
            setData(resultHourly);
        } catch (error) {
            console.error('Error fetching weather data by location:', error);
            setIsLoading(false);
        }
    }, [api.key, api.endpoint]);

    console.log(data)
    console.log(weatherData)
    const getWeatherByCity = async () => {
        if (city) {
            setIsLoading(true);
            try {
                const res = await fetch(`${api.endpoint}weather?q=${city}&units=metric&appid=${api.key}`);
                const result = await res.json();
                setWeatherData(result);
                setIsCitySearch(true);
                setPressure(result.main.pressure);
                setWind(result.wind);
    
                const resHourly = await fetch(`${api.endpoint}onecall?lat=${result.coord.lat}&lon=${result.coord.lon}&exclude=current,minutely,alerts&units=metric&appid=${api.key}`);
                const resultHourly = await resHourly.json();
                setHourlyWeather(resultHourly.hourly);
                setDailyWeather(resultHourly.daily);
                setUvIndex(resultHourly.daily[0].uvi);
    
                setCity('');
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching weather data by city:', error);
                setIsLoading(false);
            }
        }
    };

    // Получаем погоду по геолокации
    useEffect(() => {
        if (!isCitySearch && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getWeatherByLocation);
        }
    }, [isCitySearch, getWeatherByLocation]);

    const getWeatherByKeyPress = async (e) => {
        if (e.key === 'Enter') {
            await getWeatherByCity();
        }
    };

    const handleCitySearchClick = async () => {
        await getWeatherByCity();
    };

    return (
        <div className="weather-app">
            {isLoading ? (
                <div className='spinner-container'>
                    <div className="spinner"></div> 
                </div> // Прелоадер во время загрузки
            ) : (
                <>
                    <div className='container-weather_info-input'>
                        {weatherData && (
                            <WeatherInfo 
                                data={data}
                                weatherData={weatherData} 
                                theme={theme} 
                                setTheme={setTheme} 
                            />
                        )}
                        <div className='box-input-btn'>
                            <div className='box_btn-change-map_chart'>
                                <button className={menu === 'chart' ? 'btn-change-map_chart-active' : 'btn-change-map_chart'} onClick={() => setMenu('chart')}>
                                    <ion-icon name="bar-chart"></ion-icon>
                                </button>
                                <button className={menu === 'map' ? 'btn-change-map_chart-active' : 'btn-change-map_chart'} onClick={() => setMenu('map')}>
                                    <ion-icon name="map"></ion-icon>
                                </button>
                                <i className={theme === 'light' ? 'theme-toggle' : 'theme-toggle-dark'} onClick={toggleTheme}>
                                    <ion-icon name={theme === 'light' ? 'moon' : 'sunny'}></ion-icon>
                                </i>
                            </div>

                            <CityInput 
                                city={city} 
                                setCity={setCity} 
                                handleCitySearchClick={handleCitySearchClick} 
                                getWeatherByKeyPress={getWeatherByKeyPress} 
                            />
                        </div>
                    </div>
    
                    <div className='container-hourly-dailyForecast'>
                        <div className='box-TemperatureChart_HourlyForecast'>
                            <div className="container-hourly_weather_chart">
                                <p>{menu === 'chart' ? 'Weather Change Chart' : 'World Map'}</p>
                                {menu === 'chart' ? (
                                    hourlyWeather.length > 0 && timezoneOffset !== null ? (
                                        <TemperatureChart
                                            weatherHourly={hourlyWeather}
                                            timezoneOffset={timezoneOffset}
                                            selectedDay={selectedDay}
                                            dailyWeather={dailyWeather}
                                        />
                                    ) : null
                                ) : (
                                    <WeatherComponent weatherData={weatherData} apiKey={api.key} />
                                )}
                            </div>
                            {hourlyWeather.length > 0 && (
                                <HourlyForecast data={data} hourlyWeather={hourlyWeather} timezone={weatherData?.timezone} />
                            )}
                        </div>

                        {dailyWeather.length > 0 && (
                            <DailyForecast
                                dailyWeather={dailyWeather}
                                setSelectedDay={setSelectedDay}
                            />
                        )}
                    </div>
                    {weatherData && (
                    <div className='section-wind_pressure'>
                        <WindScale wind={wind} />
                        <PressureScale pressure={pressure} />
                        <UvIndex uvIndex={uvIndex} />
                    </div>
                    )}
                </>
            )}
        </div>
    );
};

export default WeatherApp;
