import logo from "../../assets/logo-no-background.svg";
import footer from "./Footer.module.css";
import MadeBy from "./MadeBy";

const Footer = function () {
  return (
    <footer>
      <div className={footer.container}>
        <img src={logo} alt="logo"></img>
        <div className={footer.creators}>
          <h2>Created by:</h2>
          <MadeBy />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
