import { useState, useEffect, useRef } from 'react'
import logo from '../../assets/fireballLogo.jpg'
import Navbar from './Navbar'

const Header = function () {

    const [headerHeight, setHeaderHeight] = useState(0)
    const headerRef = useRef(null)

    useEffect(() => {
        setHeaderHeight(headerRef.current.clientHeight)

    }, [])

    return (


        <div className="headerContainer">
<<<<<<< HEAD
            <header ref={headerRef} >
=======
            <header ref={headerRef} className='headerContainer'>
>>>>>>> 44b4cf75f61097fdddd90d7d4e1962e7df979296
                <div id="headerLogo">
                    <img className="logo" src={logo} alt="header logo" />
                </div>

            </header>
            <Navbar headerHeight={headerHeight} />
        </div>

    )
}
export default Header