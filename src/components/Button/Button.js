import React from "react";
import "./Button.css";

const Button = (props) => {
  const { label } = props;
  return (
    <button className="button" {...props}>
      {label}
    </button>
  );
};

export default Button;
