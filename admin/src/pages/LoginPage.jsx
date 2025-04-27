import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (
          email !== import.meta.env.VITE_ADMIN_EMAIL ||
          password !== import.meta.env.VITE_ADMIN_PASSWORD
        ) {
          alert("Invalid credentials");
          return;
        }

        const res = await axios.post(
          `${VITE_BACKEND_HOST_URL}/api/user/admin`,
          {
            email,
            password,
          }
        );

        if (res.data.sucess === true) {
          localStorage.setItem("token", res.data.token);
          navigate("/");
        } else {
          alert("Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Something went wrong during login.");
      }
    },
    [email, password, navigate]
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-dark-brown mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition duration-300"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-teal-500 hover:text-teal-700">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
