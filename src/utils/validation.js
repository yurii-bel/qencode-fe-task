import { toast } from "react-toastify";

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8;
};

export const validator = ({ email, password }) => {
  const isEmailEmpty = email !== undefined && email.trim() === "";
  const isPasswordEmpty = password !== undefined && password.trim() === "";

  if (isEmailEmpty) {
    console.error("Email field is empty");
    toast.error("Email field is empty");
    return false;
  }

  if (isPasswordEmpty) {
    console.error("Password field is empty");
    toast.error("Password field is empty");
    return false;
  }

  if (email && !validateEmail(email)) {
    console.error("Invalid email format");
    toast.error("Invalid email format");
    return false;
  }

  if (password && !validatePassword(password)) {
    console.error("Password must be at least 8 characters long");
    toast.error("Password must be at least 8 characters long");
    return false;
  }

  return true;
};
