import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaAngleDown, FaBars } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom"; // Import Link from React Router

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);

  const toggleEventDropdown = () => {
    setIsEventDropdownOpen(!isEventDropdownOpen);
    setIsCommunityDropdownOpen(false);
  };

  const toggleCommunityDropdown = () => {
    setIsCommunityDropdownOpen(!isCommunityDropdownOpen);
    setIsEventDropdownOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const closeMenuOnBodyClick = (event) => {
      const clickedElement = event.target;
      const isMobile = window.innerWidth <= 768;

      if (
        isMenuOpen &&
        isMobile &&
        !clickedElement.closest("nav") // Check if the clicked element is outside the nav
      ) {
        setMenuOpen(false);
      }
    };

    document.body.addEventListener("click", closeMenuOnBodyClick);

    return () => {
      document.body.removeEventListener("click", closeMenuOnBodyClick);
    };
  }, [isMenuOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="bg-gradient-to-r from-stone-950 to bg-slate-900 text-slate-300 p-4 px-4 md:px-20 flex justify-between items-center shadow-lg">
        <div className="md:text-5xl sm:text-3xl text-3xl font-[650]">
          <span className="text-slate-500">My</span>
          <span className="text-slate-300 ">Docs</span>
        </div>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-slate-500 rounded-lg md:hidden hover:bg-slate-800 focus:outline-none focus:drop-shadow-md "
          aria-controls="menu"
        >
          <FaBars className="w-5 h-5 " aria-hidden="true" />
        </button>

        <div
          className={`absolute md:relative top-full left-0 ${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="menu"
          style={{ zIndex: 100 }}
        >
          <ul className="flex flex-col px-4 text-2xl lg:text-lg border border-gray-100 rounded-lg bg-slate-950 md:space-x-8  md:flex-row md:mt-0 md:border-0 sm:bg-inherit md:bg-inherit text-white">
            <li>
              <NavLink
                to="/"
                className=" py-2  block px-1 border-b-2 border-amber-400 lg:border-none md:hover:text-orange-500"
                aria-current="page"
              >
                Home
              </NavLink>
            </li>

            <li>
              <button
                type="button"
                onClick={toggleEventDropdown}
                className="border-b-2 bg-slate-950 border-amber-400 lg:border-none md:hover:text-orange-500 flex items-center lg:relative justify-between w-full py-2 px-1 group rounded sm:bg-inherit sm:hover:bg-none  md:border-0"
              >
                Event <FaAngleDown className="inline-block group h-4 w-4" />
              </button>
              <div
                className={`${
                  isEventDropdownOpen ? "block" : "hidden"
                } z-100  font-normal bg-white divide-y mt-3 bg-inherit divide-gray-100 group-hover:block lg:absolute w-44`}
                style={{ zIndex: 100 }}
              >
                <ul
                  className="py-2 text-sm lg:text-md w-auto rounded-xl bg-slate-900 shadow"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <NavLink
                      to="/EventOne"
                      className="block px-4 py-2 hover:bg-gray-800"
                    >
                      Event 1
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/EventTwo"
                      className="block px-4 py-2 hover:bg-gray-800"
                    >
                      Event 2
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/EventThree"
                      className="block px-4 py-2 hover:bg-gray-800"
                    >
                      Event 3
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <button
                type="button"
                onClick={toggleCommunityDropdown}
                className="border-b-2 bg-slate-950 border-amber-400 lg:border-none md:hover:text-orange-500 flex items-center lg:relative justify-between w-full py-2 px-1 group rounded sm:bg-inherit sm:hover:bg-none  md:border-0"
              >
                Community{" "}
                <FaAngleDown className="inline-block group h-4 w-4 " />
              </button>
              <div
                className={`${
                  isCommunityDropdownOpen ? "block" : "hidden"
                } z-100  font-normal bg-white divide-y mt-3 bg-inherit divide-gray-100 group-hover:block lg:absolute shadow w-44`}
                style={{ zIndex: 100 }}
              >
                <ul
                  className="py-2 text-sm lg:text-md w-auto rounded-xl bg-slate-900 shadow"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <NavLink
                      to="/CommunityOne"
                      className="block px-4 py-2 hover:bg-gray-800"
                    >
                      Community 1
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/CommunityTwo"
                      className="block px-4 py-2 hover:bg-gray-800"
                    >
                      Community 2
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/CommunityThree"
                      className="block px-4 py-2 hover:bg-gray-800"
                    >
                      Community 3
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <NavLink
                to="/about"
                className="py-2  block px-1 border-b-2 border-amber-400 lg:border-none md:hover:text-orange-500"
                aria-current="page"
              >
                About
              </NavLink>
            </li>
            <li>
              <Link to={`/login`} className=" pl-4 text-blue-600">
                {/* border px-5 py-1 border-[#658AF8] shadow  font-semibold rounded-sm hover:bg-[#658AF8] hover:text-white hover:drop-shadow-2xl hover:scale-[1.02]  */}
                <button className="overflow-hidden w-24 text-lg p-2 h-12 bg-slate-700 text-white border-b-2 border-l-2 border-[#728cb1] rounded-md font-bold cursor-pointer relative z-10 shadow:sm  hover:shadow-none hover:bg-slate-800 transition active:border-l">
                  Login
                </button>
              </Link>
              <Link to={`/signup`} className="pl-4">
                <button className="overflow-hidden w-32 p-2 h-12 bg-white text-[#183795eb] border border-[#6589f6da] rounded-md font-bold cursor-pointer relative z-10 group">
                  <span className="text-lg">Get Started!</span>
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-[#9EBCE5] rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-[#183795] rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
                  <span className="text-white group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-8 z-10 text-center">
                    Signup
                  </span>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
