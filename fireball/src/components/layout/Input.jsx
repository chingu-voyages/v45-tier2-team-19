import "./Input.css";

const Input = function ({ label, placeholder }) {
  return (
    <div className="inputComponentContainer">
      <label htmlFor="inputComponent">{label}</label>
      <input
        className="inputComponent"
        name="inputComponent"
        type="text"
        placeholder={placeholder ? "placehoder" : ""}
      ></input>
    </div>
  );
};

export default Input;
