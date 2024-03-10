import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { initiatePasswordSet } from "../api/api";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { secret } = useParams();

  const schema = z
    .object({
      password: z
        .string()
        .min(8, { message: "Password must contain at least 8 character(s)" }),
      confirmPassword: z
        .string()
        .min(8, { message: "Password must contain at least 8 character(s)" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const { password } = data;
    const passwordSet = await initiatePasswordSet(secret, password);
    if (passwordSet) {
      toast.success("Password successfully reseted", {
        onClose: () => navigate("/login"),
      });
    }
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center mt-[180px] mb-[214px]">
      <h1 className="text-[32px] text-main-blue font-bold">Qencode</h1>
      <div className="flex flex-col justify-center items-center w-[400px] mt-[80px]">
        <h2 className="h2-heading">Create new Password?</h2>
        <ToastContainer />
        <form className="w-[400px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-[25px] mt-[40px]">
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
            <div className="relative">
              <input
                className="border-[1.2px] border-border-gray rounded-md p-2 w-full"
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                onClick={handleToggleConfirmPassword}
              >
                {showConfirmPassword ? (
                  <FiEye className="text-icon-eye-text" />
                ) : (
                  <FiEyeOff className="text-icon-eye-text" />
                )}
              </button>
              {errors.confirmPassword && (
                <div
                  style={{ color: "red" }}
                  className="absolute bottom-[-20px] left-0"
                >
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>
          </div>
          <div>
            <Button
              type="submit"
              text="Reset Password"
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

export default ResetPassword;
