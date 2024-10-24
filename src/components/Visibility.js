

const Visibility = ({ data }) => {
    const visibilityInKm = (data.current.visibility / 1000).toFixed(); // Преобразуем видимость в километры

    // Функция для определения текстового описания видимости
    const getVisibilityOpinion = (visibility) => {
        if (visibility >= 10) {
            return "It's perfectly clear right now.";
        } else if (visibility >= 6) {
            return "Good visibility.";
        } else if (visibility >= 4) {
            return "Fair visibility.";
        } else if (visibility >= 2) {
            return "Poor visibility.";
        } else {
            return "Very poor visibility.";
        }
    };

    return (
        <div className="container-visibility">
            <p className="info-header">Visibility</p>
            <br/>
            <div>
                <p>{visibilityInKm} km</p>
                <p>{getVisibilityOpinion(visibilityInKm)}</p> {/* Добавляем текстовое описание видимости */}
            </div>
        </div>
    );
};

export default Visibility;
