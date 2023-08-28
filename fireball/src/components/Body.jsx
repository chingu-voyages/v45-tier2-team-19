import Header from "./Header";
import Footer from "./Footer";
// import Map from "./Map";
Map;
import Summary from "./summary/Summary";
import Table from "./Table";
import Map from "./map/Map";

const Body = function Body() {
  return (
    <div id="layoutBody">
      <Header />
      <Table />
      <Map />
      <Summary />

      <Footer />
    </div>
  );
};

export default Body;
