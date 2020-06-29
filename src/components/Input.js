import React from "react";

const Input = ({ value, onChange }) => {
  const _onChange = (e) => {
    onChange(e.target.value);
  };
  return <input value={value} onChange={_onChange}></input>;
};

export default Input;
