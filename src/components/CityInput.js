import React, { useState, useEffect } from 'react';

const CityInput = ({ city, setCity, getWeatherByKeyPress, handleCitySearchClick }) => {
    const [recognition] = useState(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        return SpeechRecognition ? new SpeechRecognition() : null;
    });
    const [isListening, setIsListening] = useState(false); // Состояние для отслеживания, слушает ли микрофон

    // Обработчик успешного распознавания
    const handleResult = (event) => {
        const transcript = event.results[0][0].transcript; // Получаем распознанный текст
        setCity(transcript); // Устанавливаем его в состояние city
        handleCitySearchClick(); // Запускаем поиск
    };

    // Устанавливаем обработчики после монтирования компонента
    useEffect(() => {
        if (recognition) {
            recognition.onresult = handleResult;
            recognition.onend = () => setIsListening(false); // Обновляем состояние, когда распознавание останавливается
            recognition.onerror = (event) => {
                console.error('Error occurred in recognition: ' + event.error); // Обработка ошибок
            };
        }
    }, [recognition]);

    const handleVoiceInput = () => {
        if (recognition) {
            if (isListening) {
                recognition.stop(); // Останавливаем распознавание, если оно уже активно
            } else {
                recognition.start(); // Запускаем распознавание речи
                setIsListening(true); // Обновляем состояние, что мы начали слушать
            }
        }
    };

    return (
        <form className='container-input' onSubmit={handleCitySearchClick}>
            <input
                type="text"
                className="input"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)} // Обновляем состояние при изменении текста в поле ввода
                onKeyDown={getWeatherByKeyPress} // Обрабатываем нажатия клавиш
            />
            <button type="button" className={isListening ? 'input-microfon-btn_active' : 'input-microfon-btn'} onClick={handleVoiceInput}>
                {isListening && <div className="pulse"></div>} {/* Пульсирующий круг */}
                <ion-icon name={isListening ? "mic" : "mic-outline"}></ion-icon>
            </button>
            <button type="submit" className='input-btn'>Search</button>
        </form>
    );
};

export default CityInput;
