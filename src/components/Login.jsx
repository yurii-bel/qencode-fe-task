import React, { useState } from "react";
import Button from "./Button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Divider from "./Divider";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { authQencode } from "../api/api";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Login = () => {
  const schema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 character(s)" }),
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    const loggedIn = await authQencode({ email, password });
    if (loggedIn) {
      toast.success("You have successfully logged in", {
        onClose: () => {
          navigate("/");
        },
      });
    }
  };

  const navigate = useNavigate();

  const loginWithGoogle = (e) => {
    e.preventDefault();
  };

  const loginWithGithub = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col justify-center items-center mt-[180px] mb-[214px]">
      <h1 className="text-[32px] text-main-blue font-bold">Qencode</h1>
      <div className="flex flex-col justify-center items-center w-[400px] mt-[80px]">
        <h2 className="h2-heading">Log in to your account</h2>
        <ToastContainer />
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <div>
              <input
                className="border-[1.2px] border-border-gray rounded-md p-2 w-full"
                {...register("email")}
                type="text"
                placeholder="Work Email"
              />
              {errors.email && (
                <div style={{ color: "red" }}>{errors.email.message}</div>
              )}
            </div>
            <div className="relative">
              <input
                className="border-[1.2px] border-border-gray rounded-md p-2 w-full"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
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
              {errors.password && (
                <div
                  style={{ color: "red" }}
                  className="absolute bottom-[-20px] left-0"
                >
                  {errors.password.message}
                </div>
              )}
            </div>

            <p className="text-main-blue font-[500] text-[14px] text-right mt-[15px]">
              <Link to="/login/forgot-password">Forgot your password?</Link>
            </p>

            <Button
              type="submit"
              text="Log in to Qencode"
              className="btn-text-main text-[#fff] flex justify-center items-center w-full h-[48px] bg-main-blue rounded-[8px] mt-[30px]"
              disabled={isSubmitting}
            />
            {errors.root && (
              <div className="text-red-500">{errors.root.message}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
