import React from "react";

const Select = (props) => {
  const { label, children, size } = props;
  return (
    <div className={`f-group ${size === "sm" && "input-sm"} `}>
      {label && <label className="label">{label}</label>}
      <select
        {...props}
        className={`input-lg ${size === "sm" && "input-sm"} `}
        required
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
