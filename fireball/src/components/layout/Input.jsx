import './Input.css'

const Input = function ({ label, placeholder }) {
    return (
        <div>
            <label htmlFor="inputComponent">{label}</label>
            <input className='inputComponent' name='inputComponent' type='text' placeholder={placeholder}></input>

        </div >
    )
}

export default Input