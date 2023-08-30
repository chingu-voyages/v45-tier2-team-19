import "./Navbar.css";
import { useState, useEffect, useRef } from "react";

const Navbar = function ({ headerHeight }) {
    const [sticky, setSticky] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const navRef = useRef(null)

    function handleSticky() {
        if (window.scrollY > headerHeight) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    }

    function toggleCollapse() {

        if (window.outerWidth < 500) {
            setCollapsed(true)

        } else {
            setCollapsed(false)
        }

    }

    useEffect(() => {
        window.addEventListener("scroll", handleSticky, { passive: true });
    });

    useEffect(() => {
        window.addEventListener("resize", toggleCollapse, { passive: true });
    });

    return (
        <div className="navbar">
            <nav ref={navRef}
                style={
                    sticky
                        ? {

                            position: "fixed",
                            left: "0px",
                            top: "0px",


                        }
                        : {}
                }

            >
                {collapsed == false ?
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
                    </ul> :
                    <p>collapsed</p>
                }
            </nav>
        </div>
    );
};

export default Navbar;
