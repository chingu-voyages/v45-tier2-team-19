import button from "./Button.module.css";

const Button = ({ children, onClick, className }) => {
  return (
    <button className={`${className} ${button.style}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
