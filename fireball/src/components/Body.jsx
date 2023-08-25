import Header from "./Header";
import Footer from "./Footer";
import Map from "./Map";
import Summary from "./summary/Summary";
import Table from "./Table";

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
