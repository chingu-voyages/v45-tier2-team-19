import logo from '../../assets/fireballLogo.jpg';




const Footer = function () {
    return (

        <footer>

            <div id='logo'>
                <img className="logo" src={logo} alt="header logo" />
            </div>
            <div id='madeBy'>
                <h2>App Created By:</h2>
                <ul>
                    <a href="https://github.com/vukas86">
                        <li>Alex</li>
                    </a>

                    <a href="https://github.com/crwainstock">
                        <li>Crystal</li>
                    </a>

                    <a href="https://github.com/crisxh">
                        <li>Chris</li>
                    </a>
                    <a href="https://github.com/uKiJo">
                        <li>Younes</li>
                    </a>
                    <a href="https://github.com/Sarita1517">
                        <li>Sarita</li>
                    </a>
                </ul>

            </div>
        </footer>


    )
}

export default Footer;