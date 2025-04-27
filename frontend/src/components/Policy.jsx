import React from "react";
import { FaExchangeAlt, FaCalendarCheck, FaHeadset } from "react-icons/fa"; // Importing icons from react-icons

const Policy = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-8 md:px-16">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
        Our Policies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Exchange Policy */}
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <div className="flex items-center mb-6">
            <FaExchangeAlt className="text-4xl text-blue-500 mr-4" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Exchange Policy
            </h3>
          </div>
          <p className="text-gray-600">
            We offer a hassle-free exchange policy within 30 days of purchase.
            If you are not satisfied with your product, simply return it to us
            for an exchange.
          </p>
        </div>

        {/* 7 Days Return Policy */}
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <div className="flex items-center mb-6">
            <FaCalendarCheck className="text-4xl text-green-500 mr-4" />
            <h3 className="text-2xl font-semibold text-gray-800">
              7 Days Return Policy
            </h3>
          </div>
          <p className="text-gray-600">
            If you're not completely satisfied, you can return your purchase
            within 7 days. We offer full refunds on all qualifying returns.
          </p>
        </div>

        {/* Customer Support */}
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <div className="flex items-center mb-6">
            <FaHeadset className="text-4xl text-purple-500 mr-4" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Best Customer Support
            </h3>
          </div>
          <p className="text-gray-600">
            Our customer support team is available 24/7 to assist you with any
            questions or issues. We are here to make your shopping experience
            seamless and enjoyable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policy;
