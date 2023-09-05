import { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo-no-background.svg";
import Navbar from "./Navbar";
import './Header.css'



const Header = function () {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    setHeaderHeight(headerRef.current.clientHeight);
  }, []);

  return (
    <div id="curvedWrapper" ref={headerRef}>
      <div className="headerContainer">
        <header className="logoContainer">
          <img className="headerLogo" src={logo} alt="header logo" />
        </header>
        <Navbar headerHeight={headerHeight} />
      </div>
    </div>
  );
};
export default Header;
