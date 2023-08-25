import logo from '../../assets/fireballLogo.jpg'

const Header = function () {
    return (


        <header className='headerContainer'>
            <div id="headerLogo">
                <img className="logo" src={logo} alt="header logo" />
            </div>
            <nav>
                <ul>
                    <a href="#"><li>Home</li></a>
                    <a href="#"><li>Table</li></a>
                    <a href="#"><li>Maps</li></a>
                    <a href="#summary"><li>Summary</li></a>
                    <a href="#"><li>Cool Facts</li></a>

                </ul>
            </nav>
        </header>

    )
}
export default Header