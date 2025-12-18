import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-neutral-900 text-white fixed w-full z-20 top-0 border-b border-neutral-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <a href="#" className="text-xl font-bold">
          SkyLearn
        </a>

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:items-center`}
        >
          <ul className="flex flex-col gap-4 mt-4 md:mt-0 md:flex-row md:gap-6">
            <li>
              <a href="/" className="hover:text-blue-400 transition">
                Home
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-blue-400 transition">
                About
              </a>
            </li>

            {/* Dropdown */}
            <li className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 hover:text-blue-400 transition"
              >
                Kelas
                <svg
                  className={`w-4 h-4 transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute left-0 mt-2 bg-neutral-800 border border-neutral-700 rounded-lg p-3 w-40 shadow-lg ${
                  isDropdownOpen ? "block" : "hidden"
                }`}
              >
                <a
                  href="/kelas/limit"
                  className="block p-2 rounded hover:bg-neutral-700"
                >
                  Limit
                </a>
                <a
                  href="/kelas/turunan"
                  className="block p-2 rounded hover:bg-neutral-700"
                >
                  Turunan
                </a>
                <a
                  href="/kelas/integral"
                  className="block p-2 rounded hover:bg-neutral-700"
                >
                  Integral
                </a>
              </div>
            </li>

            <li>
              <a href="#" className="hover:text-blue-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
