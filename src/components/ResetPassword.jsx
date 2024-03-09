import React, { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { initiatePasswordSet } from "../api/api";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });

  // temporary variable
  const secret = "abc";

  const { password, confirm_password } = formData;

  const [showPassword] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));

  const handleInitiatePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await initiatePasswordSet(secret, password);
      toast.success("Password successfully reseted");
      navigate("/login");
    } catch (error) {
      console.error("Failed to reset password", error);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-[180px] mb-[214px]">
      <h1 className="text-[32px] text-main-blue font-bold">Qencode</h1>
      <div className="flex flex-col justify-center items-center w-[400px] mt-[80px]">
        <h2 className="h2-heading">Forgot Password?</h2>
        <ToastContainer />
        <form className="w-[400px]">
          <div className="flex flex-col gap-[25px] mt-[40px]">
            <InputField
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={onChange}
              className="border-[1.2px] border-border-gray rounded-md p-2 w-full"
              icon={true}
            />
            <InputField
              name="confirm_password"
              id="confirm_password"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirm_password}
              onChange={onChange}
              className="border-[1.2px] border-border-gray rounded-md p-2 w-full"
              icon={true}
            />
          </div>
          <div>
            <Button
              text="Reset Password"
              className="btn-text-main text-[#fff] flex justify-center items-center w-full h-[48px] bg-main-blue rounded-[8px] mt-[30px]"
              onClick={handleInitiatePasswordReset}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
