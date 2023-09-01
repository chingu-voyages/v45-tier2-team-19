import './CollapsedNav.css'
const CollapsedNav = function () {
    return (
        <nav style={{ display: 'flex', flexDirection: 'column', }} >
            <ul>
                <a href="#">
                    <li>Home</li>
                </a>
                <a href="#table">
                    <li>Table</li>
                </a>
                <a href="#mapContainer">
                    <li>Maps</li>
                </a>
                <a href="#summary">
                    <li>Summary</li>
                </a>
                <a href="#">
                    <li>Cool Facts</li>
                </a>
            </ul>

        </nav>
    )
}

export default CollapsedNav;