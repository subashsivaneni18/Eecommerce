import React from "react";

const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-6 py-12 bg-gray-50 min-h-screen">
      {/* Left: Image */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        <img
          src="/images/Hero.jpg"
          alt="About Us"
          className="w-full h-auto rounded-2xl shadow-lg"
        />
      </div>

      {/* Right: Text */}
      <div className="w-full md:w-1/2 md:pl-12 text-gray-800">
        <h2 className="text-4xl font-bold mb-6 text-blue-700">About Us</h2>
        <p className="text-lg mb-6 leading-relaxed">
          We are a passionate team committed to delivering innovative and
          high-quality products to meet the ever-evolving needs of our
          customers. Our journey began with a simple goal – to bring excellence
          and integrity to everything we do.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-blue-600">
          Our Mission
        </h3>
        <p className="text-base leading-relaxed">
          Our mission is to empower individuals and businesses by providing
          smart, sustainable, and tech-forward solutions. We believe in building
          trust through transparency, creativity, and a relentless focus on
          customer satisfaction.
        </p>
      </div>
    </div>
  );
};

export default About;
