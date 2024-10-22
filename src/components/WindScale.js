const WindScale = ({ wind }) => {

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

    const windDirection = getWindDirection(wind.deg);


    return (
        <div className='wind-container'>
            <p className="info-header">Wind</p>
            <div className="wind-subcontainer">
                <div className='windInfo-box'>
                    <p>Speed: <span>{(wind.speed).toFixed(1)} ms</span></p>
                    <hr />
                    <p>Gust: <span>{(wind.gust).toFixed(1)} ms</span></p>
                </div>

                <div className="kompas">
                    <div className='kompas-point'>{windDirection}</div>
                    <div className="arow" style={{ transform: `rotate(${wind.deg}deg)` }}>
                        <div className='arow1'>
                            <ion-icon name="navigate"></ion-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WindScale;
