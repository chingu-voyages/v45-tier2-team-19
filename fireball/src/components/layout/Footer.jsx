import { useState, useRef, useEffect } from 'react';
import logo from "../../assets/fireballLogo.jpg";
import "./Footer.css";
import MadeBy from './MadeBy';
const Footer = function () {
    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false)
    const [smallScreen, setSmallScreen] = useState(null)
    const madeByRef = useRef(null);

    function toggleCollapse() {
        if (window.outerWidth < 500) {
            setCollapsed(true);

        } else {
            setCollapsed(false);
        }
    }

    useEffect(() => {
        if (collapsed) {
            setSmallScreen(true)
        }
    }, [])


    useEffect(() => {
        window.addEventListener("resize", toggleCollapse, { passive: true });
    }, [collapsed]);

    useEffect(() => {
        toggleCollapse()
    }, [collapsed]);
    return (

        <footer>
            <div className="footerLogoContainer">
                <div className="footerLogo">
                    <img className="logo" src={logo} alt="header logo" />
                </div>
            </div>
            <div id="madeByContainer">

                {collapsed ?

                    <button className="toggleMadeBy" onClick={toggleCollapse} ref={madeByRef}>
                        <h2>Created By</h2>
                    </button >

                    :

                    <MadeBy />


                }

            </div>
        </footer>

    );
};

export default Footer;
