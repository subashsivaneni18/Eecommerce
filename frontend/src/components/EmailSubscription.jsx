import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa"; // Icon for the subscription field

const EmailSubscription = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add functionality to handle the submission like API calls
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-8 md:px-16 text-gray-900 rounded-lg">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-lg font-light text-gray-600">
          Stay updated with the latest trends, offers, and exclusive deals!
        </p>
        {/* Added message for the 20% discount */}
        <p className="text-md font-medium text-gray-700 mt-4">
          Subscribe now and get 20% off your next purchase!
        </p>
      </div>

      <div className="flex justify-center">
        {/* Subscription Form */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white rounded-md p-3 w-full max-w-md border-2 border-gray-200"
        >
          <FaEnvelope className="text-gray-500 text-xl mr-4" />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 p-3 text-gray-800 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />

          <button
            type="submit"
            className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            {isSubmitted ? "Subscribed" : "Subscribe"}
          </button>
        </form>
      </div>

      {/* Confirmation Message */}
      {isSubmitted && (
        <div className="text-center mt-6 text-xl font-semibold text-green-500">
          Thank you for subscribing! 🎉
        </div>
      )}
    </div>
  );
};

export default EmailSubscription;
