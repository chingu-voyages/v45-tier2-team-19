import logo from '../assets/fireballLogo.jpg'

const Header = function () {
    return (


        <header className='headerContainer'>
            <div id="headerLogo">
                <img className="headerLogo" src={logo} alt="header logo" />
            </div>
            <nav>
                <ul>
                    <a href="#"><li>Home</li></a>

                </ul>
            </nav>
        </header>

    )
}
export default Header