import { toast } from "react-toastify";
import axios from "axios";

export const secret = "secret";

const verifyAccessToken = async (token) => {
  try {
    await axios.post("https://auth-qa.qencode.com/v1/auth/access-token", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Token verification failed:", error);
    toast.error("Token verification failed. Please try again.");
    throw error;
  }
};

export const authQencode = async ({ email, password }) => {
  try {
    const response = await axios.post(
      "https://auth-qa.qencode.com/v1/auth/login",
      {
        email,
        password,
      }
    );

    const { access_token } = response.data;
    await verifyAccessToken(access_token);
    localStorage.setItem("access_token", access_token);

    toast.success("You have successfully logged in");
  } catch (error) {
    console.error("Invalid email or password", error);
    toast.error("Invalid email or password");
  }
};

export const initiatePasswordReset = async ({ email }) => {
  try {
    const response = await axios.post(
      "https://auth-qa.qencode.com/v1/auth/password-reset",
      {
        email,
      }
    );
    console.log(response);
    toast.success("Password reset email sent successfully");
  } catch (error) {
    if (error.response.status === 404) {
      toast.error("Email not found. Please try again.");
    } else {
      toast.error("Failed to send password reset email. Please try again.");
    }
  }
};

export const initiatePasswordSet = async (secret, newPassword) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.post(
      "https://auth-qa.qencode.com/v1/auth/password-set",
      {
        token: token,
        secret,
        password: newPassword,
        password_confirm: newPassword,
      }
    );
    console.log(response);
    console.log("Password reset successfully");
    toast.success("Password reset successfully");
  } catch (error) {
    console.error("Failed to set new password", error);
    toast.error("Failed to set new password. Please try again.");
  }
};
