import button from "./Button.module.css";

const Button = ({ children, onClick, className, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`${className} ${button.style}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
