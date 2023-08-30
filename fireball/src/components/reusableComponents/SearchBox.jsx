import './SearchBox.css'

const SearchBox = function () {
    return (
        <div>
            <div className="searchComponent">
                <label htmlFor='searchBox'></label>
                <input type="text" name="searchBox" placeholder='search' id="searchBox" />
                <div><button>🔎</button></div>
            </div>

        </div>
    )
}

export default SearchBox;