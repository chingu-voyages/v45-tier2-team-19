import Header from './Header'
import Footer from "./Footer"
import Map from "./Map"
import Graphs from "./Graphs"
import Table from "./Table"


const Body = function Body() {
    return (
        <div id="layoutBody">
            <Header />
            <Map />
            <Graphs />
            <Table />
            <Footer />
        </div>
    )
}

export default Body