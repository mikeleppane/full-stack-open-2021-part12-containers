import React from "react";

const Button = ({ text, onButtonClick }) => {
  return (
    <button style={{ margin: "5px" }} onClick={onButtonClick}>
      {text}
    </button>
  );
};

export default Button;
