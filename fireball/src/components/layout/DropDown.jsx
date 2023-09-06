import "./DropDown.css";

const Dropdown = function ({ label, options }) {
  return (
    <div className="dropdownComponentContainer">
      <label htmlFor="dropdown">{label}</label>
      <select name="dropdown" className="dropdown">
        {options.map((option) => {
          return <option key={option}>{option}</option>;
        })}
      </select>
    </div>
  );
};

export default Dropdown;
