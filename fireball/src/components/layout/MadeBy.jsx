import './MadeBy.css'
import { GrLinkedin, GrGithub } from 'react-icons/gr'

const MadeBy = function () {

    let creators = [
        {
            name: 'Alex',
            github: "https://github.com/vukas86"
        },
        {
            name: 'Crystal',
            github: "https://github.com/crwainstock"
        },
        {
            name: 'Chris',
            github: "https://github.com/crisxh"
        },
        {
            name: 'Younes',
            github: "https://github.com/uKiJo"
        },
        {
            name: 'Sarita',
            github: "https://github.com/Sarita1517"
        }

    ]

    const creatorList = creators.map((creator, index) => {
        return (

            <div className="creator" key={index}>
                <a href={creator.github}  >
                    <li>{creator.name}</li>
                </a>
                <a href=""><GrLinkedin /></a>
                <a href=""><GrGithub /></a>

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