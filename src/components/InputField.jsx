import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Assuming you're using Feather icons

const InputField = ({
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  className,
  icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
      />
      {type === "password" && icon && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
          onClick={handleTogglePassword}
        >
          {showPassword ? (
            <FiEye className="text-icon-eye-text" />
          ) : (
            <FiEyeOff className="text-icon-eye-text" />
          )}
        </button>
      )}
    </div>
  );
};

export default InputField;
