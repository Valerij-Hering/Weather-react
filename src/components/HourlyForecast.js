import React from 'react';
import susetIcon from '../Images/sunset.png';
import surriseIcon from '../Images/sunrise.png';

const HourlyForecast = ({ data, hourlyWeather, timezone }) => {
    // Функция форматирования времени с учетом временного смещения
    const formatUTCTime = (timestamp, offset) => {
        const date = new Date((timestamp + offset) * 1000);
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // Время восхода и заката текущего и следующего дня
    const sunriseTimeToday = data.daily[0].sunrise;
    const sunsetTimeToday = data.daily[0].sunset;
    const sunriseTimeTomorrow = data.daily[1].sunrise;
    const sunsetTimeTomorrow = data.daily[1].sunset;

    return (
        <div className="hourly-weather">
            <div className="container-hourly">
                <p className="container-hourly_header">Hourly Forecast</p>
                <div className="hourly-scroll">
                    {hourlyWeather.slice(0, 24).map((elementHourly, index) => {
                        const currentHour = elementHourly.dt;

                        return (
                            <React.Fragment key={index}>
                                {/* Восход сегодня */}
                                {currentHour >= sunriseTimeToday && currentHour < sunriseTimeToday + 3600 && (
                                    <div className="scrollBox sunrise-block">
                                        <p className="scrollTime">{formatUTCTime(sunriseTimeToday, timezone)}</p>
                                        <div className="scrollIconWeather">
                                            <img
                                                className="scrollIcon-gif"
                                                src={surriseIcon}
                                                alt="sunrise icon"
                                            />
                                        </div>
                                        <p className="scrollTemperatur">Sunrise</p>
                                    </div>
                                )}

                                {/* Прогноз по часам */}
                                <div className="scrollBox">
                                    <p className="scrollTime">
                                        {index === 0 ? "Now" : formatUTCTime(elementHourly.dt, timezone)}
                                    </p>
                                    <div className="scrollIconWeather">
                                        <img
                                            className="scrollIcon-gif"
                                            src={`Weather-icons/${elementHourly.weather[0].icon}.png`}
                                            alt="weather icon"
                                        />
                                        <p className="hourly-pop">
                                            {elementHourly.rain === undefined
                                                ? ''
                                                : `${((elementHourly.pop) * 100).toFixed()}%`}
                                        </p>
                                    </div>
                                    <p className="scrollTemperatur">{Math.round(elementHourly.temp)}°</p>
                                </div>

                                {/* Закат сегодня */}
                                {currentHour >= sunsetTimeToday && currentHour < sunsetTimeToday + 3600 && (
                                    <div className="scrollBox sunset-block">
                                        <p className="scrollTime">{formatUTCTime(sunsetTimeToday, timezone)}</p>
                                        <div className="scrollIconWeather">
                                            <img
                                                className="scrollIcon-gif"
                                                src={susetIcon}
                                                alt="sunset icon"
                                            />
                                        </div>
                                        <p className="scrollTemperatur">Sunset</p>
                                    </div>
                                )}

                                {/* Восход завтра */}
                                {currentHour >= sunriseTimeTomorrow && currentHour < sunriseTimeTomorrow + 3600 && (
                                    <div className="scrollBox sunrise-block">
                                        <p className="scrollTime">{formatUTCTime(sunriseTimeTomorrow, timezone)}</p>
                                        <div className="scrollIconWeather">
                                            <img
                                                className="scrollIcon-gif"
                                                src={surriseIcon}
                                                alt="sunrise icon"
                                            />
                                        </div>
                                        <p className="scrollTemperatur">Sunrise</p>
                                    </div>
                                )}

                                {/* Закат завтра */}
                                {currentHour >= sunsetTimeTomorrow && currentHour < sunsetTimeTomorrow + 3600 && (
                                    <div className="scrollBox sunset-block">
                                        <p className="scrollTime">{formatUTCTime(sunsetTimeTomorrow, timezone)}</p>
                                        <div className="scrollIconWeather">
                                            <img
                                                className="scrollIcon-gif"
                                                src={susetIcon}
                                                alt="sunset icon"
                                            />
                                        </div>
                                        <p className="scrollTemperatur">Sunset</p>
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HourlyForecast;
