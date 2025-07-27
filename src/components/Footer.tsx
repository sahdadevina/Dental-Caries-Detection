import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-3">My Dental Care</h3>
            <p className="text-gray-400 max-w-md">
              Advanced dental caries classification using AI technology to assist dental professionals
              in providing better patient care.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-3">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/classification"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Classification
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </NavLink>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Research Papers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center md:text-left">
          <p className="text-gray-400">
            &copy; 2025 Sahda IT Udayana. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;