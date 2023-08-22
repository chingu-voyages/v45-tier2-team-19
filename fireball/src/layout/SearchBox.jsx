import { Search } from 'react-icons'
const SearchBox = function () {
    return (
        <form action="">
            <div id='searchContainer'>
                <label htmlFor="search"></label>
                <input className="search" placeholder={`Search${<Search />}`} type="search" name="search" id="" />
            </div>
            <div className="checkGroup">
                <label htmlFor="check1"></label>
                <input type="checkbox" name="" id="" />
                <label htmlFor="check1"></label>
                <input type="checkbox" name="" id="" />
                <label htmlFor="check1"></label>
                <input type="checkbox" name="" id="" />
                <label htmlFor="check1"></label>
                <input type="checkbox" name="" id="" />
                <label htmlFor="check1"></label>
                <input type="checkbox" name="" id="" />
            </div>
        </form >

    )
}

export default SearchBox;