import logo from "../../assets/Logo.svg";
import "./Footer.css";
import MadeBy from "./MadeBy";

const Footer = function () {
  return (
    <div>
      <footer>
        <img className="footerLogo" src={logo}></img>

        <div className="madeByContainer">

          <MadeBy />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
