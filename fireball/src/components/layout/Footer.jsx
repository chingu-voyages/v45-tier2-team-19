import { useRef } from "react";

import logo from "../../assets/logo-no-background.svg";
import "./Footer.css";
import MadeBy from "./MadeBy";

import { useInView } from "framer-motion";

const Footer = function () {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div>
      <footer>
        <img
          ref={ref}
          style={{
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
          className="footerLogo"
          src={logo}
        ></img>

        <div className="madeByContainer">
          <h2>App Created By:</h2>
          <MadeBy />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
