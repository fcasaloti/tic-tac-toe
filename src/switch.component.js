import React from 'react';
import './switch.css';

const Switch = (props) => {
  return (
    <span>
      <input
        onChange={props.handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </span>
  );
};

export default Switch;