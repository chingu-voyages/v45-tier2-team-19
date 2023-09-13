import { useState, useEffect, useRef } from "react";
import logo from "../../assets/Logo.svg";
import header from "./Header.module.css";
import Navbar from "./Navbar";

import { motion } from "framer-motion";

const Header = function () {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    setHeaderHeight(headerRef.current.clientHeight);
  }, []);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setComponIsReady(true);
    }, 2000);
    return () => clearTimeout(loadingTimeout);
  }, []);

  const titleVarients = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2 } },
  };

  const childVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, x: 350, transition: { delay: 1.2 } },
  };

  return (
    <>
      <header ref={headerRef} className={header.container}>
        <div className={header.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={header.description}>
          {componIsReady && (
            <motion.h2
              variants={titleVarients}
              initial="hidden"
              animate="visible"
            >
              Your guide on a meteorite journey
            </motion.h2>
          )}
          <p className={header.p}>
            {componIsReady && (
              <motion.span
                variants={childVariants}
                initial="hidden"
                animate="visible"
              >
                Discover meteorite impacts around the world
              </motion.span>
            )}
          </p>
        </div>
        <div className={header.cometContainer}></div>
        <Navbar headerHeight={headerHeight} />
      </header>
    </>
  );
};
export default Header;
