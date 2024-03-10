# Qencode Login Interface

This project is an implementation of the Qencode Login Interface using React. It includes functionalities for login, forgot password, and reset password, along with API integration for handling authentication and password reset requests.

## Features

- **Login Page:** Users can log in using their email and password.
- **Forgot Password Page:** Users can request a password reset email by providing their registered email address.
- **Reset Password Page:** Users can reset their password by providing a new password and a confirmation password.

## Technologies Used

- React
- React Router DOM
- React Hook Form
- Axios
- Zod (for input validation)
- React Icons
- React Toastify

## Installation

1. **Clone the repository:**

   git clone https://github.com/yurii-bel/qencode-fe-task

2. **Navigate to the project directory:**

  cd qencode-fe-task
  
3. **Install dependencies:**

  npm install 

4. **Start the development server:**

  npm start

5. **Open [http://localhost:3000](http://localhost:3000) to view it in the browser.**

## Demo

You can view a live demo of the Qencode Login Interface [here](#).

## Folder Structure

qencode-login-interface/
├── public/
├── src/
│ ├── components/
│ │ ├── Login.js
│ │ ├── ForgotPassword.js
│ │ ├── ResetPassword.js
│ ├── api/
│ │ ├── api.js
│ ├── App.js
│ ├── index.js
│ ├── styles.css
├── package.json
├── README.md


## API Integration

The application integrates with the Qencode Authentication API for handling login, password reset, and password set requests.

## Future Improvements

- Implement user authentication with JWT tokens.
- Enhance error handling for better user experience.
- Add unit tests for components and API functions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

