import './MadeBy.css'
import { GrLinkedin, GrGithub } from 'react-icons/gr'

const MadeBy = function () {

    let creators = [
        {
            name: 'Alex',
            github: "https://github.com/vukas86",
            linkedIn: "https://www.linkedin.com/in/aleksandar-vukasovic",
            homePage: "https://game-guess-the-number.vercel.app/",
        },
        {
            name: 'Crystal',
            github: "https://github.com/crwainstock",
            linkedIn: "https://www.linkedin.com/in/crwainstock/",
            homePage: ""
        },
        {
            name: 'Chris',
            github: "https://github.com/crisxh",
            linkedIn: "https://www.linkedin.com/in/chris-hndx/",
            homePage: "https://crysalistech.wordpress.com/"
        },
        {
            name: 'Younes',
            github: "https://github.com/uKiJo",
            linkedIn: "https://www.linkedin.com/in/mohamed-younes-abdat-506603132/",
            homePage: "https://www.amyounes.dev/"
        },
        {
            name: 'Sarita',
            github: "https://github.com/Sarita1517",
            linkedIn: "",
            homePage: "https://www.linkedin.com/in/sjhabsc/",
        }

    ]

    const creatorList = creators.map((creator, index) => {
        return (

            <div id="Credits" className="creator" key={index}>
                <a href={creator.homePage ? creator.homePage : creator.github}  >
                    <li>{creator.name}</li>
                </a>
                <a href={creator.linkedIn}><GrLinkedin /></a>
                <a href={creator.github}><GrGithub /></a>

            </div>
        )
    })
    return (
        <div className="madeBy">
            <ul>
                {creatorList}

            </ul>
        </div>
    )
}

export default MadeBy