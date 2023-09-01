import "./App.css";

import Summary from "./components/summary/summary";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Table from "./components/layout/Table";
import Map from "./components/map/Map";
import TestComponents from "./components/layout/testComponents";

import { useDataContext } from "./hooks/useDataContext";
import DataSets from "./components/detailsDisplay/DataSets";

const App = function () {
  const { data, loading } = useDataContext();

  console.log(data);

  return (
    <div className="App">
      {loading == true && <div className="loading">Loading...</div>}

      <Header />
      <DataSets />
      <Map />
      <Summary />
      <Footer />
    </div>
  );
};

export default App;
