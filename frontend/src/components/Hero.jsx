import React from "react";

const Hero = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      {/* Container for Content and Image */}
      <div className="flex w-full max-w-screen-xl h-auto sm:px-8 md:px-16 items-center justify-center py-12 flex-col lg:flex-row">
        {/* Left Side: Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left px-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6 text-gray-900">
            "Empowering Your Home with Smart Solutions"
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-gray-700">
            Discover cutting-edge technology for a smarter, more efficient home.
          </p>
          <button className="px-8 py-3 bg-black text-white font-bold text-lg rounded-lg hover:bg-gray-700 transition-all duration-300">
            Shop Now
          </button>
        </div>

        {/* Right Side: Image Section */}
        <div
          className="hidden lg:block w-full lg:w-1/2 h-96 bg-cover bg-center rounded-lg shadow-lg"
          style={{ backgroundImage: "url(/images/Hero.jpg)" }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;
