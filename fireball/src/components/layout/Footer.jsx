
import logo from "../../assets/logo-no-background.svg";
import "./Footer.css";
import MadeBy from './MadeBy';
import { GrLinkedin } from 'react-icons/gr'
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


        </div>

    )


};

export default Footer;
