import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom"; // Import Link component
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
function Register() {
  // Define state variables for name, email, and password

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { isAuthenticated, setAthu, loader, setLoader } = useContext(Context);

  // Handle input changes
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    setLoader(true);
    event.preventDefault();

    try {
      // Here you can add logic to register the user
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Password:", password);
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name,
          email,
          password,
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
      setAthu(false);
      setLoader(false);
      setIsAuthenticating(false);
    }
  };
  if (isAuthenticated) return <Navigate to={"/home"} />;
  return (
    <div>
      <div className="flex justify-center items-center h-screen  bg-[#191552] ">
        <div className="w-full max-w-md">
          <img
            src={logo}
            alt="Logo"
            className="mx-auto mb-[100px] w-[300px] h-auto"
          />
          <form
            onSubmit={handleSubmit}
            className=" shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 backdrop-blur-sm bg-black border-2 border-gray-700"
          >
            <h2 className="text-2xl text-center font-normal mb-4 text-white">Register</h2>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-semibold mb-2 "
                htmlFor="name"
              >
                Name:
              </label>
              <input
                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-semibold  mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-white text-sm font-semibold mb-2"
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
                disabled={isAuthenticating}
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
                  "Register"
                )}
              </button>

              <div className="text-center mt-4">
                <span>
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500 font-bold">
                    Login
                  </Link>
                </span>
              </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
