import "./Button.css";

const Button = function ({ text, onClick }) {
  return (
    <button onClick={onClick} className="buttonComponent">
      {text}
    </button>
  );
};

export default Button;
