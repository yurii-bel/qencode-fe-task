import React, { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));

  const handleSendEmail = (e) => {
    e.preventDefault();
    try {
      // Logic with api and validation
      navigate("/login/reset-password");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center mt-[180px] mb-[214px]">
      <h1 className="text-[32px] text-main-blue font-bold">Qencode</h1>
      <div className="flex flex-col justify-center items-center w-[400px] mt-[80px]">
        <h2 className="h2-heading">Forgot Password?</h2>
        <form className="w-[400px]">
          <div className="flex flex-col gap-[25px] mt-[40px]">
            <InputField
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={onChange}
              className="border-[1.2px] border-border-gray rounded-md p-2 w-full"
            />
          </div>
          <div>
            <Button
              text="Send"
              className="btn-text-main text-[#fff] flex justify-center items-center w-full h-[48px] bg-main-blue rounded-[8px] mt-[30px]"
              onClick={handleSendEmail}
            />
            <Button
              text="Cancel"
              className="btn-text-main text-black-secondary-text flex justify-center items-center w-full h-[48px] border-[1.2px] border-border-gray rounded-[8px] 
              mt-[20px]"
              onClick={handleCancel}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
