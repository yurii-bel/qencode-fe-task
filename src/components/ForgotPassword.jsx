import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { initiatePasswordReset } from "../api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const schema = z.object({
    email: z.string().email(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const { email } = data;
      const passwordReset = await initiatePasswordReset({ email });
      if (passwordReset) {
        toast.success("Password reset email sent successfully");
        navigate("/login/reset-password");
      }
    } catch (error) {
      toast.error("Failed to send reset email. Please try again.");
    }
  };

  const navigate = useNavigate();

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center mt-[180px] mb-[214px]">
      <h1 className="text-[32px] text-main-blue font-bold">Qencode</h1>
      <div className="flex flex-col justify-center items-center w-[400px] mt-[80px]">
        <h2 className="h2-heading">Forgot Password?</h2>
        <ToastContainer />
        <form className="w-[400px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mt-[40px]">
            <input
              className="border-[1.2px] border-border-gray rounded-md p-2 w-full"
              {...register("email")}
              type="text"
              placeholder="Enter your email"
            />
            {errors.email && (
              <div style={{ color: "red" }}>{errors.email.message}</div>
            )}
          </div>
          <div>
            <Button
              text="Send"
              type="submit"
              className="btn-text-main text-[#fff] flex justify-center items-center w-full h-[48px] bg-main-blue rounded-[8px] mt-[30px]"
              disabled={isSubmitting}
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
