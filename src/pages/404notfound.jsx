// 404notfound.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4 text-gray-700">Page Not Found</p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
