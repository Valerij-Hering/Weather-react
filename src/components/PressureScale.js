

const PressureScale = ({pressure}) => {

     const getArrowRotation = (pressure) => {
        // Предположим, что давление в диапазоне от 950 до 1050.
        // Вычисляем угол поворота на основе значения давления.
        const minPressure = 950;
        const maxPressure = 1050;
        const minAngle = 30; // Угол для минимального давления
        const maxAngle = 110;    // Угол для максимального давления

        // Пропорциональное вычисление угла
        const angle = ((pressure - minPressure) / (maxPressure - minPressure)) * (maxAngle - minAngle) + minAngle;
        return angle;
    };

    const rotation = getArrowRotation(pressure);

    return ( 
        <div className="section-pressure">
            <p className="info-header">Pressure</p>
            <div className='pressure-contaier'>
                <div className='pressure-arow' style={{ transform: `rotate(${rotation}deg)` }}>
                    <div className='pressure-arow-visible'></div>
                </div>
                <div className="pressure-info-box">
                    <span>{pressure}</span>
                    <span className="span-hPa">hPa</span>
                </div>
            </div>
        </div>
    )
}

export default PressureScale