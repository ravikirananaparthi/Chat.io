import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import axios from "axios";
import logo from "../assets/logo.png";
import { CiLogin } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import DOMPurify from 'dompurify';
function Login() {
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleGuestLogin = () => {
    setShowGuestPopup(true);
  };

  const closeGuestPopup = () => {
    setShowGuestPopup(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { isAuthenticated, setAthu, loader, setLoader } = useContext(Context);

  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showGuestPopup, setShowGuestPopup] = useState(false);

  const guestUsers = {
    user1: {
      email: "ram@gmail.com",
      password: "ram",
    },
    user2: {
      email: "adam@gmail.com",
      password: "adam",
    },
    user3: {
      email: "harry@gmail.com",
      password: "Harry1234!",
    },
    user4: {
      email: "michael@gmail.com",
      password: "michael",
    },
  };

  const handleGuestClick = async (user) => {
    console.log(user.email, user.password);
    const sanitizedEmail = DOMPurify.sanitize(user.email);
    const sanitizedPassword = DOMPurify.sanitize(user.password);
    setLoader(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email: sanitizedEmail,
          password: sanitizedPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setAthu(true);
      setLoader(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoader(false);
      setAthu(false);
      setIsAuthenticating(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
      // Sanitize inputs
  const sanitizedEmail = DOMPurify.sanitize(email);
  const sanitizedPassword = DOMPurify.sanitize(password);
    setLoader(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email: sanitizedEmail,
          password: sanitizedPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setAthu(true);
      setLoader(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoader(false);
      setAthu(false);
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/home"} />;

  return (
    <div className="flex justify-center items-center h-screen bg-[#191552]">
      <div className="w-full max-w-md">
        <img
          src={logo}
          alt="Logo"
          className="mx-auto mb-[100px] w-[300px] h-auto"
        />
        <div className="relative">
          <button
            className="absolute bottom-[10px]  right-0 bg-sky-500 hover:bg-sky-700 rounded-xl px-4 py-2 flex items-center"
            onClick={handleGuestLogin}
          >
            <p className="text-white mr-2">Login As Guest</p>
            <CiLogin size={35} className="text-white" />
          </button>
        </div>
        {showGuestPopup && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-3xl w-120 md:w-144 z-50 h-[400px] w-[500px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold">Guest Accounts</h3>
                <p>Click to Continue</p>
                <button onClick={closeGuestPopup}>
                  <IoIosClose
                    className="text-gray-500 hover:text-gray-800"
                    size={35}
                  />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-[50px]">
                <div
                  onClick={() => handleGuestClick(guestUsers.user1)}
                  className="cursor-pointer flex items-center justify-center space-x-3 border-4 border-gray-300 rounded-xl p-3 hover:bg-gray-100 hover:border-sky-600"
                >
                  <FaUser size={30} className="text-gray-700" />
                  <span className="text-gray-700 font-semibold">Ram</span>
                </div>
                <div
                  onClick={() => handleGuestClick(guestUsers.user2)}
                  className="cursor-pointer flex items-center justify-center space-x-3 border-4 border-gray-300 rounded-xl p-3 hover:bg-gray-100 hover:border-sky-600"
                >
                  <FaUser size={30} className="text-gray-700" />
                  <span className="text-gray-700 font-semibold">Adam</span>
                </div>
                <div
                  onClick={() => handleGuestClick(guestUsers.user3)}
                  className="cursor-pointer flex items-center justify-center space-x-3 border-4 border-gray-300 rounded-xl p-3 hover:bg-gray-100 hover:border-sky-600"
                >
                  <FaUser size={30} className="text-gray-700" />
                  <span className="text-gray-700 font-semibold">Harry</span>
                </div>
                <div
                  onClick={() => handleGuestClick(guestUsers.user4)}
                  className="cursor-pointer flex items-center justify-center space-x-3 border-4 border-gray-300 rounded-xl p-3 hover:bg-gray-100 hover:border-sky-600"
                >
                  <FaUser size={30} className="text-gray-700" />
                  <span className="text-gray-700 font-semibold">Michael</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 bg-black border-2 border-gray-700"
        >
          <h2 className="text-2xl text-center font-normal mb-4 text-white">Login</h2>
          <div className="mb-4">
            <label
              className="block  text-sm font-semibold mb-2 text-white"
              htmlFor="username"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              type="text"
              id="username"
              value={email}
              onChange={handleUsernameChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block  text-sm font-semibold mb-2 text-white"
              htmlFor="password"
            >
              Password:
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-4 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.5C7.30558 4.5 3.42713 7.30103 1.5 12C3.42713 16.698 7.30558 19.5 12 19.5C16.6944 19.5 20.5729 16.698 22.5 12C20.5729 7.30103 16.6944 4.5 12 4.5Z"
                    />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.5C7.30558 4.5 3.42713 7.30103 1.5 12C3.42713 16.698 7.30558 19.5 12 19.5C16.6944 19.5 20.5729 16.698 22.5 12C20.5729 7.30103 16.6944 4.5 12 4.5Z"
                    />
                    <circle cx="12" cy="12" r="3" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2 2L22 22"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            disabled={loader || isAuthenticating}
            className={`bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-8 rounded-2xl w-full text-center focus:outline-none focus:shadow-outline ${
              isAuthenticating ? "cursor-not-allowed" : ""
            }`}
            type="submit"
          >
            {isAuthenticating ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3 inline-block text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8a8 8 0 01-8 8z"
                  ></path>
                </svg>
                Authenticating...
              </>
            ) : (
              "Login"
            )}
          </button>

          <div className="text-center mt-4">
            <span>
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 font-bold">
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
