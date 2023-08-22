import mapImg from '../assets/simple-world-map-vector-13.jpg'

const Map = function () {
    return (
        <div id="mapContainer">
            <form action="">
                <div id='searchContainer'>
                    <label htmlFor="search"></label>
                    <input type="search" name="search" id="" />
                </div>
                <div className="checkGroup">
                    <label htmlFor="check1"></label>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="check1"></label>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="check1"></label>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="check1"></label>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="check1"></label>
                    <input type="checkbox" name="" id="" />
                </div>
            </form >
            <img src={mapImg}></img>
        </div >
    )
}

export default Map