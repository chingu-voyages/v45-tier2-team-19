import './Navbar.css'
import { useState, useEffect, useRef } from 'react'


const Navbar = function ({ headerHeight }) {
    const [sticky, setSticky] = useState(false)




    function handleSticky() {
        if (window.scrollY > headerHeight) {
            setSticky(true)

        } else if (window.scrollY == 0) {
            setSticky(false)
        }

    }

    useEffect(() => {
        window.addEventListener("scroll", handleSticky, { passive: true })
    })

    return (
        <div className='navbar'>
            < nav style={sticky ? { width: '100%', position: 'fixed', left: '0px', top: '0px', height: 'fit-content' } : {}}>
                <ul>
                    <a href="#"><li>Home</li></a>
                    <a href="#table"><li>Table</li></a>
                    <a href="#mapContainer"><li>Maps</li></a>
                    <a href="#summary"><li>Summary</li></a>
                    <a href="#"><li>Cool Facts</li></a>

                </ul>
            </nav >
        </div>
    )
}

export default Navbar