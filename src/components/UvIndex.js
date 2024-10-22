

const UvIndex = ({ uvIndex=0 }) => {
    const getuvDiscription = (uv) => {
        if (uv <= 2) return 'Low';
        if (uv >= 3 && uv <= 5) return 'Medium'; // Условие изменено на >= 3 и <= 5
        if (uv > 5) return 'High'; // Исправлено 'Height' на 'High'
        return 'N/A'; // Возвращаем 'N/A', если uv не определён
    }


    return (
        <div className="container-uv_index">
            <p className="info-header">UV-Index</p>
            <br />
            <br />
            <input className="uvi-input" type="range" value={uvIndex} min="0" max="10" readOnly /> {/* Добавлено readOnly */}
            <br />
            <br />
            <p className="container-uv_index_description">UV-Index: {getuvDiscription(uvIndex)}</p>
        </div>
    );
}

export default UvIndex;
