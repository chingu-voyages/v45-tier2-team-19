import "./Navbar.css";
import { useState, useEffect, useRef } from "react";
import { MdMenu } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { animate } from "framer-motion";
import starryBg from "../../assets/starryMeteorHeader.png";

const Navbar = function ({ headerHeight }) {
  const [sticky, setSticky] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [smallScreen, setSmallScreen] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    if (collapsed) {
      setSmallScreen(true);
    }
  }, []);

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
    toggleCollapse();
  }, [collapsed]);

  let menuList = [
    {
      name: "Home",
      link: "",
    },
    {
      name: "Table",
      link: "Table",
    },
    {
      name: "Map",
      link: "Map",
    },
    {
      name: "Summary",
      link: "Summary",
    },
    {
      name: "Credits",
      link: "Credits",
    },
  ];

  function handleMenuClose() {
    setToggled(false);
  }

  const openMenuVariants = {
    open: {
      y: 0,
    },
    closed: {
      y: "-100%",
    },
  };

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
            {menuList.map((item, index) => {
              return (
                <a
                  href={`#${item.link}`}
                  onClick={() => {
                    handleMenuClose();
                  }}
                  key={index}
                >
                  <li>{item.name}</li>
                </a>
              );
            })}
          </ul>
        ) : (
          <div>
            {!toggled || smallScreen ? (
              <div>
                <button
                  className="collapsedBtn"
                  onClick={() => {
                    setToggled(!toggled);
                  }}
                  style={
                    sticky
                      ? {
                          position: "absolute",
                          top: "0px",
                          left: "0px",
                          fontSize: "2em",
                          backgroundColor: "var(--primary)",
                          width: "100vw",
                          cursor: "pointer",
                        }
                      : {
                          fontSize: "5em",
                          alignSelf: "center",
                          justifySelf: "center",
                        }
                  }
                >
                  <MdMenu />
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <motion.nav
                  key="modal"
                  variants={openMenuVariants}
                  initial="closed"
                  animate={toggled ? "open" : "closed"}
                  exit="closed"
                >
                  <ul
                    className="collapsedUl"
                    style={{
                      width: "100vw",
                      height: "fit-content",
                      display: "flex",
                      flexDirection: "column",
                      position: "absolute",
                      top: "0em",
                      left: "0px",
                      alignItems: "center",
                      backgroundColor: "var(--primary)",
                    }}
                  >
                    <button
                      onClick={() => {
                        handleMenuClose();
                      }}
                      className="closeMenu"
                      style={{
                        alignSelf: "flex-end",
                        fontSize: "2em",
                        cursor: "pointer",
                      }}
                    >
                      <GrClose />
                    </button>
                    {menuList.map((item, index) => {
                      return (
                        <a
                          href={`#${item.link}`}
                          onClick={() => {
                            handleMenuClose();
                          }}
                          key={index}
                        >
                          <li>{item.name}</li>
                        </a>
                      );
                    })}
                  </ul>
                </motion.nav>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
