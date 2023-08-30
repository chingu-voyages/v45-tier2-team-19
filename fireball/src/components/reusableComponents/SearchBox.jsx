import './SearchBox.css'
import { MdSearch } from 'react-icons/md'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const SearchBox = function () {
    return (
        <div>
            <div className="searchComponent">
                <Button class='searchBtn' variant='standard'><MdSearch variant='primary' /></Button>
                <TextField id="searchBox" label="Standard" variant="standard" />

            </div>

        </div>
    )
}

export default SearchBox;