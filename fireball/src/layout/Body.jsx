import Header from './Header'
import Footer from "./Footer"
import Map from "./Map"
import Graphs from "./Graphs"
import Table from "./Table"


const Body = function Body({ loading }) {
    return (
        <div id="layoutBody">
            {loading == true && <div className='loading'>Loading...</div>}
            <Header />
            <Table />
            <Map />
            <Graphs />

            <Footer />
        </div>
    )
}

export default Body