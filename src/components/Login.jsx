import React, { useState } from "react";
import Button from "./Button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Divider from "./Divider";
import InputField from "./InputField";
import { Link } from "react-router-dom";
import { validator } from "../utils/validation";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword] = useState(false);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));

  const loginWithGoogle = (e) => {
    e.preventDefault();
  };

  const loginWithGithub = (e) => {
    e.preventDefault();
  };

  const loginWithQencode = (e) => {
    e.preventDefault();
    if (validator({ email, password })) {
      // Login logic
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-[180px] mb-[214px]">
      <h1 className="text-[32px] text-main-blue font-bold">Qencode</h1>
      <div className="flex flex-col justify-center items-center w-[400px] mt-[80px]">
        <h2 className="h2-heading">Log in to your account</h2>
        <ToastContainer />
        <form>
          <div className="flex gap-4 mt-[40px]">
            <Button
              text="Google"
              className="btn-text flex justify-center items-center w-[192px] h-[48px] gap-[10px] px-[20px] border-[1.2px] border-border-gray rounded-[6px]"
              icon={FcGoogle}
              onClick={loginWithGoogle}
            />
            <Button
              text="Github"
              className="btn-text flex justify-center items-center w-[192px] h-[48px] gap-[10px] px-[20px] border-[1.2px] border-border-gray rounded-[6px]"
              icon={FaGithub}
              onClick={loginWithGithub}
            />
          </div>
          <Divider />
          <div className="flex flex-col gap-[25px] mt-[30px]">
            <InputField
              name="email"
              id="email"
              placeholder="Work email"
              value={email}
              onChange={onChange}
              className="border-[1.2px] border-border-gray rounded-md p-2 w-full"
            />
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
          </div>
          <Link to="/login/forgot-password">
            <p className="text-main-blue font-[500] text-[14px] text-right mt-[15px]">
              Forgot your password?
            </p>
          </Link>
          <Button
            text="Log in to Qencode"
            className="btn-text-main text-[#fff] flex justify-center items-center w-full h-[48px] bg-main-blue rounded-[8px] mt-[30px]"
            onClick={loginWithQencode}
          />

          <div className="flex gap-1 justify-center items-center mt-[30px]">
            <p className="text-black-secondary-text">
              Is your company new to Qencode?
            </p>
            <Link to="" className="text-main-blue font-[500]">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
