import './TestComponents.css'
// import Button from '../reusableComponents/Button'
// import Input from '../reusableComponents/Input'
// import Dropdown from '../reusableComponents/Dropdown'
import SearchBox from '../reusableComponents/SearchBox'
import Button from '@mui/material/Button'



const TestComponents = function () {
    return (
        <div className="testContainer">
            <h1>Test For Reusable Components</h1>
            <div className='testComponentContainer'>
                <SearchBox />
                <Button variant="contained" onClick={() => { alert('hello') }} >Test Text</Button>
                {/* <Input placeholder="placeholder" label='test label' />
                <Dropdown label='test label' options={[1, 2, 3]} /> */}

            </div>
        </div>
    )
}

export default TestComponents;