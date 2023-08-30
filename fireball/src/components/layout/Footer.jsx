import logo from '../../assets/fireballLogo.jpg'
import FaLinkedIn from 'react-icons/fa'
const Footer = function () {
    return (

        <footer>
            <div id='logo'>
                <img className="logo" src={logo} alt="header logo" />
            </div>
            <div id='madeBy'>
                <h2>App Created By:</h2>
                <ul>
                    <img src="" alt='avatar' />
                    <a href="">
                        <li>Alex</li>

                    </a>
                    <FaLinkedIn />
                    <img src="" alt='avatar' />
                    <a href="">
                        <li>Crystal</li>

                    </a>
                    <FaLinkedIn />
                    <img src="" alt='avatar' />
                    <a href="">
                        <li>Chris</li>

                    </a>
                    <FaLinkedIn />
                    <img src="" alt='avatar' />
                    <a href="https://github.com/uKiJo">
                        <li>Younes</li>

                    </a>
                    <FaLinkedIn />
                    <img src="" alt='avatar' />
                    <a href="">
                        <li>Sarita</li>

                    </a>
                    <FaLinkedIn />
                    <img src="" alt='avatar' />


                    <a href="Photo by Felix Mittermeier: https://www.pexels.com/photo/blue-and-purple-cosmic-sky-956999/">
                        <li>Background Image By</li>
                    </a>
                </ul>

            </div>
        </footer>


    )
}

export default Footer;