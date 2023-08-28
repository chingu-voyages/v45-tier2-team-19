import mapImg from '../../assets/simple-world-map-vector-13.jpg'
import SearchBox from './SearchBox'

const Map = function () {
    return (
        <div id="mapContainer">
            <SearchBox />
            <img src={mapImg}></img>
        </div >
    )
}

export default Map