
import logo from "../../assets/logo-no-background.png";
import "./Footer.css";
import MadeBy from './MadeBy';
const Footer = function () {
    return (
        <div>


            <footer>
                <img className='footerLogo' src={logo}></img>
                <div className="madeBy">

                    <h2>App Created By:</h2>
                    <MadeBy />
                </div>
            </footer>

            <div className="curvedBottom"></div>
        </div>

    )


};

export default Footer;
