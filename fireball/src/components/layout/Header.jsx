import { useState, useEffect, useRef } from "react";
import logo from "../../assets/Logo.svg";
import header from "./Header.module.css";
import Navbar from "./Navbar";

const Header = function () {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    setHeaderHeight(headerRef.current.clientHeight);
  }, []);
  return (
    <>
      <header ref={headerRef} className={header.container}>
        <div className={header.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={header.description}>
          <h2>Your guide on a meteorite journey</h2>
          <p className={header.p}>
            Discover meteorite impacts around the world
          </p>
        </div>
        <div className={header.cometContainer}></div>
        <Navbar headerHeight={headerHeight} />
      </header>
    </>
  );
};
export default Header;
