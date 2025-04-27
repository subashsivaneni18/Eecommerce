import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeftBar from "../components/LeftBar";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-white-primary overflow-hidden">
      <LeftBar />
      <div className="flex-grow ml-0 md:ml-56 pl-8 py-8">Home Page</div>
    </div>
  );
};

export default HomePage;
