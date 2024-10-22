import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

const TemperatureChart = ({ weatherHourly, timezoneOffset, selectedDay, dailyWeather }) => {
    const selectedDayData = dailyWeather[selectedDay]; // Данные выбранного дня

    // Предполагаем, что hourlyWeather - это данные на весь день
    const hourlyDataForSelectedDay = weatherHourly.filter(hour => {
        const hourDate = new Date(hour.dt * 1000).getDate();
        const selectedDayDate = new Date(selectedDayData.dt * 1000).getDate();
        return hourDate === selectedDayDate;
    });

    const labels = hourlyDataForSelectedDay.map((elementHourly, index) =>
        index === 0 ? 'Now' : formatLocalTime(new Date((elementHourly.dt + timezoneOffset) * 1000))
    );

    const temperatures = hourlyDataForSelectedDay.map(elementHourly =>
        Math.round(elementHourly.temp)
    );

    // Функция для форматирования времени в местное время без ведущих нулей
    function formatLocalTime(date) {
        const hours = date.getHours();
        return `${hours}:00`;
    }

    const minTemperature = Math.floor(Math.min(...temperatures) / 5) * 5;
    const maxTemperature = Math.ceil(Math.max(...temperatures) / 5) * 5;

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Temperature (°C)',
                data: temperatures,
                borderColor: '#007aff',
                backgroundColor: 'rgba(0, 122, 255, 0.2)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#007aff',
                pointRadius: 0,
                hitRadius: 15,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Local Time',
                    color: '#bebebe',
                    font: {
                        size: 16,
                        family: 'Arial',
                    },
                },
                ticks: {
                    color: '#bebebe',
                    rotation: 0,
                    callback: function (value) {
                        const label = value.toString();
                        return label.replace(/^0+/, '');
                    },
                },
                grid: {
                    color: '#444444',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                    color: '#bebebe',
                    font: {
                        size: 16,
                        family: 'Arial',
                    },
                },
                ticks: {
                    color: '#bebebe',
                    stepSize: 5,
                    suggestedMin: minTemperature,
                    suggestedMax: maxTemperature,
                },
                grid: {
                    color: '#444444',
                },
            },
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (context) {
                        const index = context.dataIndex;
                        const temp = temperatures[index];
                        const rainProbability = hourlyDataForSelectedDay[index].pop ? (hourlyDataForSelectedDay[index].pop * 100).toFixed() : 0;
                        const cloudiness = hourlyDataForSelectedDay[index].weather[0].main;
                        const windSpeed = hourlyDataForSelectedDay[index].wind_speed;

                        return [
                            `Temperature:          ${temp}°C`,
                            `Rain Probability:     ${rainProbability}%`,
                            `Wind Speed:           ${windSpeed} m/s`,
                            `Cloudiness:             ${cloudiness}`,
                        ];
                    },
                },
                displayColors: false,
                backgroundColor: '#1b2d4a',
                titleColor: '#ffffff',
                bodyColor: '#bebebe',
                borderColor: '#ffffff74',
                borderWidth: 1,

                bodyFont: {
                    size: 14,
                },
            },
        },
    };

    return (
        <Line data={data} options={options} />
    );
};

export default TemperatureChart;
