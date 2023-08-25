
import "./App.css";
import Summary from "./components/summary/summary";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Table from "./components/layout/Table";
import Map from "./components/layout/Map";

import { useDataContext } from "./hooks/useDataContext";

const App = function () {
  const { data, loading } = useDataContext();



  console.log(data);

  return (
    <div className="App">
      {loading == true && <div className='loading'>Loading...</div>}
      <Header />
      <Table />
      <Map />
      <Summary />
      <Footer />
    </div>



  );

}

export default App;
