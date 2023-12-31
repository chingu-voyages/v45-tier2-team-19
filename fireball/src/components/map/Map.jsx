import GeoPath from "./GeoPath";

import "./style.css";
import map from "./Map.module.css";
import FilterSummary from "./FilterSummary";
import MapFilter from "./MapFilter";
import { useGetMapData } from "../../hooks/useGetMapData";
import { useGetFilteredMap } from "../../hooks/useGetFilteredMap";
import { useFilterData } from "./hooks/useFilterData";

const Map = () => {
  const { data } = useGetFilteredMap(); //data for the map filter component
  // const mapl = useGetMapData().data;
  const mapData = useGetMapData().data;
  // const mapData = useGetMapData().data;

  // const [filteredData, setFilteredData] = useState([]);
  // const [selectedFilters, setSelectedFilters] = useState({});
  // const [isAll, setIsAll] = useState(false);

  // const handleDataFiltered = (filteredData, selectedFilters, isAll) => {
  //   setFilteredData(filteredData);
  //   setSelectedFilters(selectedFilters);
  //   setIsAll(isAll);
  // };

  const { handleDataFiltered, filteredData, selectedFilters, filter } =
    useFilterData();

  if (!data || !mapData) {
    return <pre>Loading...</pre>;
  }

  return (
    <div id="Map" className={map.section}>
      <div
        className={map.container}
        data-aos="fade-up"
        data-aos-duration="3500"
        data-aos-once="true"
      >
        <MapFilter data={data} onDataFiltered={handleDataFiltered} />
        <div className={map.details}>
          <GeoPath map={mapData} data={filteredData} filter={filter} />
          {
            <FilterSummary
              filteredData={filteredData}
              selectedFilters={selectedFilters}
              filter={filter}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default Map;
