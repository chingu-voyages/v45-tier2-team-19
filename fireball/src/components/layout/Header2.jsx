import { useState, useEffect, useRef } from "react";
import logo from "../../assets/Logo.svg";
import header from "./Header2.module.css";
import Navbar from "./Navbar";

const Header2 = function () {
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
        <div>
          <h1>Title</h1>
          <p>Description</p>
        </div>
        <div className={header.cometContainer}></div>
      </header>
      <Navbar headerHeight={headerHeight} />
    </>
  );
};
export default Header2;
