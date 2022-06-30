import { useState } from "react";
import "./Dropdown.css";

const Dropdown = (props) => {
  const ueChangeHandler = (event) => {
    props.onOptionChange(event.target.value);
  };

  return (
    <div className="dropdown">
      <label htmlFor={props.id}>{props.label}</label>
      <select
        name={props.id}
        id={props.id}
        defaultValue={props.name}
        onChange={ueChangeHandler}
      >
        <option value="none" disabled hidden>
          Select an Option
        </option>
        {props.options.map((ue) => (
          <option key={ue} value={ue}>
            {ue}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
