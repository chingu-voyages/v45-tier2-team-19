import "./App.css";

import Loading from "./components/loading/Loading";
import Summary from "./components/summary/summary";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Map from "./components/map/Map";



import { useDataContext } from "./hooks/useDataContext";
import DataSets from "./components/detailsDisplay/DataSets";


const App = function () {
  const { data, loading } = useDataContext();

  console.log(data);

  return (
    <div id="Home" className="App">
      {loading == true && (
        <div className="loading">
          <Loading />
        </div>
      )}

      {/* <Header /> */}
      <Header />

      <DataSets />
      <Map />
      <Summary />
      <Footer />
    </div>
  );
};

export default App;
