import './MadeBy.css'

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

            <a href={creator.github} key={index} >
                <li>{creator.name}</li>
            </a>
        )
    })
    return (
        <div id="madeBy">
            <ul>
                {creatorList}

            </ul>
        </div>
    )
}

export default MadeBy