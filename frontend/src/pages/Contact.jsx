import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-50 py-16 px-6 sm:px-12 md:px-24">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Contact Info and Image */}
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <div className="w-full md:w-1/2">
            <img
              src="/images/Hero.jpg"
              alt="Contact Us"
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <h2 className="text-4xl font-bold text-blue-700">Get in Touch</h2>
            <p className="text-gray-600 text-lg mt-4">
              We'd love to hear from you! Whether you have a question about
              products, pricing, or anything else — our team is ready to answer
              all your questions.
            </p>

            <div className="text-gray-700 space-y-4 mt-6">
              <div>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@yourecom.com"
                  className="text-blue-600 underline"
                >
                  support@yourecom.com
                </a>
              </div>
              <div>
                <strong>Phone:</strong> +1 (234) 567-890
              </div>
              <div>
                <strong>Address:</strong> 123 Ecom Street, Tech City, USA
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
