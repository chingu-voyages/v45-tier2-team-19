import mapImg from "../assets/simple-world-map-vector-13.jpg";
import { useGetMapData } from "../hooks/useGetMapData";
import SearchBox from "./SearchBox";

const Map = function () {
  const { data, loading } = useGetMapData();
  if (loading) {
    return <div>Loading</div>;
  }
  console.log(data);
  return (
    <div id="mapContainer">
      <SearchBox />
      <img src={mapImg}></img>
    </div>
  );
};

export default Map;
