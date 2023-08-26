import { useState, useEffect, useRef } from 'react'
import logo from '../../assets/fireballLogo.jpg'
import Navbar from './Navbar'

const Header = function () {

    const [headerHeight, setHeaderHeight] = useState(0)
    const headerRef = useRef(null)

    useEffect(() => {
        setHeaderHeight(headerRef.current.scrollHeight)

    }, [])

    return (


        <header ref={headerRef} className='headerContainer'>
            <div id="headerLogo">
                <img className="logo" src={logo} alt="header logo" />
            </div>
            <Navbar headerHeight={headerHeight} />

        </header>

    )
}
export default Header