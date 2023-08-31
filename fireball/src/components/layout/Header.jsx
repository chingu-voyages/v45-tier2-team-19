import { useState, useEffect, useRef } from "react";
import logo from "../../assets/fireballLogo.jpg";
import Navbar from "./Navbar";
import Comets from "../../assets/comet.svg";

const Header = function () {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    setHeaderHeight(headerRef.current.clientHeight);
  }, []);

  return (
    <div className="headerContainer">
      <header ref={headerRef} className="headerContainer">
        <img className="logo" src={logo} alt="header logo" />
        {/* <div id="headerLogo">
        <img className="comets" src={Comets}></img>
        </div> */}
      </header>
      <Navbar headerHeight={headerHeight} />
    </div>
  );
};
export default Header;
