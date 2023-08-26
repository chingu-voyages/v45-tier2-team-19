import './Button.css';

const Button = function ({ text }) {
    return (
        <button className='buttonComponent'>
            {text}
        </button>
    )
}

export default Button