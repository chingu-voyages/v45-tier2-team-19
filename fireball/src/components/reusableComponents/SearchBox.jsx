import './SearchBox.css'
import { MdSearch } from 'react-icons/md'
import { Input } from '@mui/material/Input'

const SearchBox = function () {
    return (
        <div>
            <div className="searchComponent">
                <Input variant="standard" />
                <div><button><MdSearch /></button></div>
            </div>

        </div>
    )
}

export default SearchBox;