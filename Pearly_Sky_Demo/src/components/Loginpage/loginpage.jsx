import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess, loginFailure } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setuserNameError] = useState("");
  const [passwordError,setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state.auth);

  const validateuserName = (value) => {
    if (!value) {
      return "User Name is required.";
    }
    return ""; 
  };
  const validatePassword = (value) => {
    if (!value) {
      return "Password is required.";
    }
    return ""; 
  };

  const handleuserNameChange = (e) => {
    const value = e.target.value;
    setuserName(value);
    const error = validateuserName(value);
    setuserNameError(error);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const error = validatePassword(value);
    setPasswordError(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userNameValidationError = validateuserName(userName);
    const passwordValidationError = validatePassword(password);
  
    if (userNameValidationError || passwordValidationError) {
      setuserNameError(userNameValidationError);
      setPasswordError(passwordValidationError);
      return;
    }
  
    try {
      const response = await axios.post("http://13.61.166.183:8080/user/login", {
        userName: userName,
        password: password
      });
  
      // Correct the typo here:
      const token = response.data.token;
      const user = response.data.user;
  
      dispatch(loginSuccess({ user: user, token }));
  
      alert(`Login successful! \n User: ${user.name},\n User Name: ${user.userName},\n Contact: ${user.contact},\n Token: ${token}`);
      navigate("/dashboard");
  
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      console.error("Login failed", error);
      dispatch(loginFailure());
      setuserNameError(errorMessage);  
    }
  };
  

  return (
    <div
      className="flex justify-center items-center font-[sans-serif] h-full min-h-screen p-4"
      style={{
        backgroundImage: `url('/images/—Pngtree—girl in the library_4483612.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="rounded-2xl bg-lightblue2 max-w-md w-full mx-auto">
        <div
          style={{
            position: "relative",
          }}
          className="rounded-2xl p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]"
        >
          <div
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 10,
              zIndex: 1,
              borderRadius: "1rem",
            }}
          ></div>

          <form
            onSubmit={handleSubmit}
            style={{
              position: "relative",
              zIndex: 2,
            }}
            className="bg-lightblue2 bg-opacity-70 rounded-2xl"
          >
            <div className="mb-12 text-center">
              <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
            </div>

            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-800 mb-2 ml-3"
              >
                User Name
              </label>
              <div className="relative flex flex-col">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  value={userName}
                  onChange={handleuserNameChange}
                  required
                  className="bg-white w-full text-sm text-gray-800 border border-gray-400 rounded-full px-4 py-2 outline-none placeholder:text-gray-800 focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your username"
                />
                {userNameError && (
                  <span className="text-red-500 text-sm mt-1">
                    {userNameError}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800 mb-2 ml-3"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="bg-white w-full text-sm text-gray-800 border border-gray-400 rounded-full px-4 py-2 outline-none placeholder:text-gray-800 focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                  onChange={handlePasswordChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#333"
                  stroke="#333"
                  className="w-[18px] h-[18px] absolute right-3 cursor-pointer"
                  viewBox="0 0 128 128"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <path d="M64 48c12.15 0 22 9.85 22 22s-9.85 22-22 22-22-9.85-22-22 9.85-22 22-22zM64 40c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm0 56c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24z" />
                  ) : (
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24z" />
                  )}
                </svg>
              </div>
            </div>

            {/* Sign In Button */}
            <div className="flex justify-center items-center mt-6">
              <button
                type="submit"
                className="mb-2 py-2.5 px-4 text-sm font-semibold tracking-wider rounded-full bg-black text-white hover:bg-grey hover:text-black focus:outline-none"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
