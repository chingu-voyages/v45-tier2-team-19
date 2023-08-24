import logo from '../assets/fireballLogo.jpg'
const Footer = function () {
    return (

        <footer>
            <div id='footerLogo'>
                <img className="headerLogo" src={logo} alt="header logo" />
            </div>
            <div id='madeBy'>
                <a href="">
                    <ul>
                        <li>Alex</li>
                        <li>Crystal</li>
                        <li>Chris</li>
                        <li>Younes</li>
                        <li>Sarita</li>
                    </ul>
                </a>
            </div>
        </footer>


    )
}

export default Footer;