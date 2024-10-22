

const Visibility = ({data}) => {

    return (
        <div className="container-visibility">
            <p className="info-header">Visibility</p>
            <div>
                <p>{data.current.visibility}</p>
            </div>
        </div>
    )
}

export default Visibility