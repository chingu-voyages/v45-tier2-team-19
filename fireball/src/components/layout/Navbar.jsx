import "./Navbar.css";
import { useState, useEffect, useRef } from "react";
import CollapsedNav from "./CollapsedNav";
import { MdMenu } from 'react-icons/md';
import starryBg from '../../assets/starryMeteorHeader.png'

const Navbar = function ({ headerHeight }) {
  const [sticky, setSticky] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false)
  const [smallScreen, setSmallScreen] = useState(null)
  const navRef = useRef(null);

  useEffect(() => {
    if (collapsed) {
      setSmallScreen(true)
    }
  }, [])

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


  }

  useEffect(() => {
    window.addEventListener("scroll", handleSticky, { passive: true });
  });

  useEffect(() => {
    window.addEventListener("resize", toggleCollapse, { passive: true });
  }, [collapsed]);

  useEffect(() => {
    toggleCollapse()
  }, [collapsed]);
  let menuLinksList = ['#', 'tableContainer', 'mapContainer', 'summary', '']
  let menuList = ['Home', 'Table', 'Map', 'Summary', 'Cool Facts']
  let listItems = menuList.map((list, index) => {
    return <li key={index}>{list}</li>
  })

  function handleMenuClose() {
    setToggled(false)


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
              backgroundColor: 'purple'
            }
            : {}
        }
      >
        {collapsed == false ? (
          <ul>

            {menuList.map((item, index) => {
              return (
                <a href={`#${item}`} onClick={() => { handleMenuClose() }} key={index} >
                  <li>{item}</li>

                </a>)
            })}
          </ul>
        ) : (
          <div>
            {!toggled || smallScreen ? (
              <button className='collapsedBtn' onClick={() => { setToggled(!toggled) }} style={sticky ? { backgroundImage: `url(${starryBg})`, backgroundSize: 'cover', backgroundColor: 'purple' } : { fontSize: '3em' }}><MdMenu /></button>

            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <nav  >
                  <ul className='collapsedUl' style={{ backgroundImage: `url(${starryBg})`, backgroundSize: 'cover', width: '100vw', display: 'flex', flexDirection: 'column', position: 'relative', top: '0em', left: '0px', alignItems: 'center', backgroundColor: 'purple' }} >
                    {menuList.map((item, index) => {
                      return (
                        <a href={`#${item}`} onClick={() => { handleMenuClose() }} key={index} >
                          <li>{item}</li>

                        </a>

                      )


                    })}
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
