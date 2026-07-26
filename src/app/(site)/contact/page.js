import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-12 flex justify-center transition-colors">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-md rounded-2xl p-8 space-y-6 transition-colors">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Contact Us
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Have a question, feedback, or issue? Feel free to reach out. We’re
          here to help you improve your experience with Note Manager.
        </p>

        {/* Contact Info */}
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            📧 <span className="font-medium">Email:</span>{" "}
            johirulislam574206@gmail.com
          </p>
          <p>
            📞 <span className="font-medium">Phone:</span> 01824842336
          </p>
          <p>
            📍 <span className="font-medium">Location:</span> Dhaka, Bangladesh
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Send us a message
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            rows={5}
            placeholder="Your Message"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition">
            Send Message
          </button>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
          We usually respond within 24–48 hours.
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
