import { toast } from "react-toastify";
import axios from "axios";

const AUTH_URL = "https://auth-qa.qencode.com/v1/auth";

const verifyAccessToken = async (token) => {
  try {
    await axios.post(`${AUTH_URL}/access-token`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    toast.error("Token verification failed. Please try again.");
    throw error;
  }
};

export const authQencode = async ({ email, password }) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, {
      email,
      password,
    });

    const { access_token } = response.data;
    await verifyAccessToken(access_token);
    localStorage.setItem("access_token", access_token);
    toast.success("You have successfully logged in");
  } catch (error) {
    toast.error("Invalid email or password");
  }
};

export const initiatePasswordReset = async ({ email }) => {
  try {
    const response = await axios.post(`${AUTH_URL}/password-reset`, {
      email,
    });
    toast.success("Password reset email sent successfully");
    return response;
  } catch (error) {
    if (error.response.status === 404) {
      toast.error("Email not found. Please try again.");
    } else {
      toast.error("Failed to send password reset email. Please try again.");
    }
    return false;
  }
};

export const initiatePasswordSet = async (secret, newPassword) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.post(`${AUTH_URL}/password-set`, {
      token: token,
      secret: secret,
      password: newPassword,
      password_confirm: newPassword,
    });
    toast.success("Password reset successfully");
    return response;
  } catch (error) {
    toast.error("Failed to set new password. Please try again.");
    return false;
  }
};
