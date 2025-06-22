import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaAngleDown, FaBars } from "react-icons/fa";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../middlewares/Auth";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { FaUserCircle } from "react-icons/fa";
import CreateFile from "./CreateDialog/CreateFile";
import ProfileDropdown from "./ProfileDropdown";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
  // const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);
  const { isLoggedIn, fetchData } = useAuth();
  const [create, setCreate] = useState(false);
  // const [filedata, setFileData] = useState("");
  const location = useLocation();
  const shouldRender = location.pathname.includes("/dashboard");
  const navigate = useNavigate();
  const toggleEventDropdown = () => {
    setIsEventDropdownOpen(!isEventDropdownOpen);
    // setIsCommunityDropdownOpen(false);
  };
  useEffect(() => {
    try {
      var id = isLoggedIn;
      fetchData(id);
    } catch (err) {
      console.log(err);
    }
  }, [navigate]);

  // const toggleCommunityDropdown = () => {
  //   setIsCommunityDropdownOpen(!isCommunityDropdownOpen);
  //   setIsEventDropdownOpen(false);
  // };

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
    {/* Logo */}
    <NavLink to="/" className="md:text-5xl sm:text-3xl text-3xl font-[650]">
      <span className="text-slate-500">My</span>
      <span className="text-slate-300">Docs</span>
    </NavLink>

    {/* Mobile Profile + Toggle Menu Button (Shown only on small screens) */}
    <div className="flex items-center gap-4 md:hidden">
      <ProfileDropdown /> {/* ProfileDropdown appears next to menu button */}
      <button
        onClick={toggleMenu}
        type="button"
        className="p-2 w-10 h-10 flex items-center justify-center text-sm text-slate-500 rounded-lg hover:bg-slate-800 focus:outline-none focus:drop-shadow-md"
        aria-controls="menu"
      >
        <FaBars className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>

    {/* Navigation Links (Collapsible on Small Screens) */}
    <div
      className={`absolute md:relative top-full left-0 ${
        isMenuOpen ? "block" : "hidden"
      } w-full md:block md:w-auto`}
      id="menu"
      style={{ zIndex: 100 }}
    >
      <ul className="flex flex-col px-4 font-semibold md:text-lg border mx-7 border-gray-100 rounded-lg bg-slate-950 md:space-x-8 md:flex-row md:mt-0 md:border-0 sm:bg-inherit md:bg-inherit text-white">
        <li>
          <NavLink
            to="/"
            className="border-b-2 bg-slate-950 border-amber-400 lg:border-none md:hover:text-orange-500 flex items-center lg:relative justify-between w-full py-2 px-1 group rounded sm:bg-inherit sm:hover:bg-none md:border-0"
          >
            Home
          </NavLink>
        </li>

        {/* Event Dropdown */}
        <li>
          <button
            type="button"
            onClick={toggleEventDropdown}
            className="border-b-2 bg-slate-950 border-amber-400 lg:border-none md:hover:text-orange-500 flex items-center lg:relative justify-between w-full py-2 px-1 group rounded sm:bg-inherit sm:hover:bg-none md:border-0"
          >
            Event <FaAngleDown className="inline-block h-4 w-4" />
          </button>
          <div
            className={`${
              isEventDropdownOpen ? "block" : "hidden"
            } z-100 font-normal divide-y mt-3 bg-inherit divide-gray-100 group-hover:block lg:absolute w-44`}
            style={{ zIndex: 100 }}
          >
            <ul className="py-2 text-sm lg:text-md w-auto rounded-xl bg-slate-900 shadow">
              <li>
                <NavLink to="/EventOne" className="block px-4 py-2 hover:bg-gray-800">
                  Event 1
                </NavLink>
              </li>
              <li>
                <NavLink to="/EventTwo" className="block px-4 py-2 hover:bg-gray-800">
                  Event 2
                </NavLink>
              </li>
              <li>
                <NavLink to="/EventThree" className="block px-4 py-2 hover:bg-gray-800">
                  Event 3
                </NavLink>
              </li>
            </ul>
          </div>
        </li>

        <li>
          <NavLink
            to="/about"
            className="py-2 block px-1 border-b-2 border-amber-400 lg:border-none md:hover:text-orange-500"
          >
            About
          </NavLink>
        </li>

        {/* Dashboard Now Inside Main Menu */}
        {isLoggedIn &&!shouldRender  && (
          <li>
            <NavLink
              to={`/dashboard/${isLoggedIn}`}
              className="py-2 block px-1 border-b-2 border-amber-400 lg:border-none md:hover:text-orange-500"
            >
              Dashboard
            </NavLink>
          </li>
        )}

        
      </ul>
    </div>

    {/* Profile Dropdown (Only Visible on Larger Screens) */}
    <div className="hidden md:flex items-center">
      {isLoggedIn === "" ? (
        <div className="flex gap-4">
          <Link to="/login">
            <button className="overflow-hidden w-24 text-lg p-2 h-12 bg-slate-700 text-white border-b-2 border-l-2 border-[#728cb1] rounded-md font-bold cursor-pointer relative z-10 shadow:sm hover:shadow-none hover:bg-slate-800 transition active:border-l">
              Login
            </button>
          </Link>
          <Link to="/signup">
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
        </div>
      ) : (

        <div className="flex gap-6">
          {shouldRender && (
          /* From Uiverse.io by ahmedyasserdev */ 
<div class="searchbar rounded-3xl p-2 relative border-2 text-sm border-r-slate-500 border-t-slate-500 border-l-slate-400 border-b-slate-400">
<div className=" gap-3 flex ">
<div className="h-6 w-6 flex justify-center items-center"><CiSearch size={25} /></div>
<input className="bg-transparent outline-none placeholder:font-sm" placeholder="search" type="text" ></input>
</div>
</div>

        )}
        <ProfileDropdown />
        </div>
      )}
    </div>
  </nav>

  {/* Create File Modal */}
  {create && <CreateFile setCreate={setCreate} />}
</motion.header>

  );
};

export default Navbar;
