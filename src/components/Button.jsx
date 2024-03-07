import React from "react";

const Button = ({ text, icon: Icon, onClick, className }) => (
  <button className={className} onClick={onClick}>
    {Icon && <Icon className="w-[18px] h-[18px]" />}
    {text}
  </button>
);

export default Button;
