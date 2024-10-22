import React from 'react';

const DailyForecast = ({ dailyWeather, setSelectedDay }) => {
    return (
        <div className="containerDaysWeather">
            <p className='containerDaysWeather-header'>8-day Forecast</p>
            <div className='subContainerWeatherHeader'>
                {dailyWeather.map((element, index) => (
                    <div 
                        key={index} 
                        className="subContainerDaysWeather"
                        onClick={() => setSelectedDay(index)} // Установка выбранного дня
                    >
                        <p className="dayOfTheWeek">
                            {index === 0 ? "Today" : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][(new Date((element.dt) * 1000)).getDay()]}
                        </p>
                        <div className="boxDaily">
                            <img
                                className="scrollIcon-gif2"
                                src={`Weather-icons/${element.weather[0].icon}.png`}
                                alt="weather icon"
                            />
                            <p className="daily-pop">
                                {element.rain === undefined ? '' : `${(element.pop * 100).toFixed()}%`}
                            </p>
                        </div>
                        <p className="DaysWeatheTemperatur">
                            {Math.round(element.temp.min)}° - {Math.round(element.temp.max)}°
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyForecast;
