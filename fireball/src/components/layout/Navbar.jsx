import "./Navbar.css";
import { useState, useEffect, useRef } from "react";
import CollapsedNav from "./CollapsedNav";

const Navbar = function ({ headerHeight }) {
  const [sticky, setSticky] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false)
  const navRef = useRef(null);

  function handleSticky() {
    if (window.scrollY > headerHeight) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  }

  function toggleCollapse() {
    if (window.outerWidth < 500) {
      setCollapsed(true);

    } else {
      setCollapsed(false);
    }
    console.log(collapsed)

  }

  useEffect(() => {
    window.addEventListener("scroll", handleSticky, { passive: true });
  });

  useEffect(() => {
    window.addEventListener("resize", toggleCollapse, { passive: true });
  });

  function openMenu() {
    return (
      <CollapsedNav />
    )
  }

  return (

    <div className="navbar">
      <nav
        ref={navRef}
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
        {collapsed == false ? (
          <ul>
            <a href="#">
              <li>Home</li>
            </a>
            <a href="#table">
              <li>Table</li>
            </a>
            <a href="#mapContainer">
              <li>Map</li>
            </a>
            <a href="#summary">
              <li>Summary</li>
            </a>
            <a href="#">
              <li>Cool Facts</li>
            </a>
          </ul>
        ) : (
          <div>
            {!toggled ? (
              <button onClick={() => { setToggled(!toggled) }}>menu</button>

            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button onClick={() => { setToggled(!toggled) }}>menu</button>
                <nav  >
                  <ul style={{ width: '100vw', backgroundColor: 'purple', display: 'flex', flexDirection: 'column', position: 'relative', top: '0em', left: '0px', alignItems: 'center' }} >
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
              </div>

            )
            }

          </div >

        )
        }
      </nav >
    </div >
  );
};

export default Navbar;
