import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const LoginRegister = () => {


  const VITE_BACKEND_HOST_URL = import.meta.env.VITE_BACKEND_HOST_URL;

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toggleForm = () => setIsLogin(!isLogin);
  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email) {
      toast.error("Please enter your email");
      return false;
    }
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.password) {
      toast.error("Please enter your password");
      return false;
    }
    if (!validatePassword(formData.password)) {
      toast.error(
        "Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character."
      );
      return false;
    }
    if (!isLogin && !formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const url = isLogin
        ? `${VITE_BACKEND_HOST_URL}/api/user/login`
        : `${VITE_BACKEND_HOST_URL}/api/user/register`;

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await axios.post(url, payload);

      if (res.data.sucess) {
        toast.success(
          isLogin ? "Logged in successfully!" : "Registered successfully!"
        );
        localStorage.setItem("userToken", res.data.token);
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2f2f3f] to-[#1a1a1f] px-4">
      <Toaster position="top-center" />
      <motion.div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          {isLogin ? "Welcome Back to" : "Join"}{" "}
          <span className="text-indigo-600">Forever</span>
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your Name"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
              placeholder="••••••••"
            />
            <div
              className="absolute top-9 right-3 text-gray-500 cursor-pointer"
              onClick={togglePassword}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white font-bold py-2 rounded-lg mb-4"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            onClick={toggleForm}
            className="text-indigo-600 cursor-pointer hover:underline font-medium"
          >
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginRegister;
