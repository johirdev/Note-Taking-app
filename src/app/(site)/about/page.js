import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-12 flex justify-center transition-colors">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 shadow-md rounded-2xl p-8 space-y-6 transition-colors">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          About Note Manager
        </h1>

        {/* Intro */}
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Note Manager is a simple and powerful application designed to help you
          organize your thoughts, tasks, and ideas in one place. Whether youre a
          student, developer, or professional, this app keeps your notes
          structured and easy to access.
        </p>

        {/* Features */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Key Features
          </h2>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
            <li>Create, edit, and delete notes easily</li>
            <li>Organize notes with tags and categories</li>
            <li>Search and filter notes quickly</li>
            <li>User authentication and secure storage</li>
            <li>Responsive design for all devices</li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Tech Stack
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Built with Next.js, React, Tailwind CSS, and a Node.js/Express
            backend with MongoDB for data storage.
          </p>
        </div>

        {/* Mission */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Our goal is to make note-taking fast, simple, and distraction-free
            so users can focus more on ideas and less on managing them.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Note Manager. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
