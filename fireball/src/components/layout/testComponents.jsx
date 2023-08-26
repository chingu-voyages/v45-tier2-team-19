import './TestComponents.css'
import Button from "./Button"
import Input from "./Input"
import Dropdown from "./DropDown"


const TestComponents = function () {
    return (
        <div className='testComponentContainer'>
            <Button onClick={() => { alert('hello') }} text='test button' />
            <Input placeholder="placeholder" label='test label' />
            <Dropdown label='test label' options={[1, 2, 3]} />
        </div>
    )
}

export default TestComponents;