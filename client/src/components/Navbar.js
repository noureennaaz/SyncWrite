import { useState, useEffect } from "react";
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
  const { isLoggedIn, fetchData } = useAuth();
  const [create, setCreate] = useState(false);
  const location = useLocation();
  const shouldRender = location.pathname.includes("/dashboard");
  const navigate = useNavigate();

  const toggleEventDropdown = () => {
    setIsEventDropdownOpen(!isEventDropdownOpen);
  };

  useEffect(() => {
    try {
      var id = isLoggedIn;
      fetchData(id);
    } catch (err) {
      console.log(err);
    }
  }, [navigate]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const closeMenuOnBodyClick = (event) => {
      const clickedElement = event.target;
      const isMobile = window.innerWidth <= 768;
      if (isMenuOpen && isMobile && !clickedElement.closest("nav")) {
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
      <nav className="bg-gradient-to-r from-slate-950 to-slate-900 text-slate-300 px-4 md:px-10 py-3 flex justify-between items-center shadow-lg">
        <NavLink to="/" className="text-3xl md:text-4xl font-bold">
          <span className="text-slate-500">My</span>
          <span className="text-slate-300">Docs</span>
        </NavLink>

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 w-10 h-10 flex items-center justify-center text-slate-500 rounded-lg hover:bg-slate-800 focus:outline-none"
            aria-controls="menu"
          >
            <FaBars className="w-5 h-5" />
          </button>
        </div>

        <div
          className={`absolute md:relative top-full left-0 ${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="menu"
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 font-medium text-white px-6 py-2 md:p-0 bg-slate-950 md:bg-transparent rounded-lg md:rounded-none md:items-center">
            <li className="md:my-0 my-1">
              <NavLink
                to="/"
                className="py-2 px-3 block hover:text-orange-400 text-center md:text-left"
              >
                Home
              </NavLink>
            </li>

            <li className="relative md:my-0 my-1">
              <button
                onClick={toggleEventDropdown}
                className="py-2 px-3 flex items-center gap-1 w-full justify-center md:justify-start hover:text-orange-400"
              >
                Event <FaAngleDown className="h-4 w-4" />
              </button>
              {isEventDropdownOpen && (
                <ul className="absolute left-0 mt-2 w-40 bg-slate-800 rounded-lg shadow text-sm">
                  <li>
                    <NavLink
                      to="/EventOne"
                      className="block px-4 py-2 hover:bg-slate-700"
                    >
                      Event 1
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/EventTwo"
                      className="block px-4 py-2 hover:bg-slate-700"
                    >
                      Event 2
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/EventThree"
                      className="block px-4 py-2 hover:bg-slate-700"
                    >
                      Event 3
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li className="md:my-0 my-1">
              <NavLink
                to="/about"
                className="py-2 px-3 block hover:text-orange-400 text-center md:text-left"
              >
                About Us
              </NavLink>
            </li>

            {isLoggedIn && !shouldRender && (
              <li className="md:my-0 my-1">
                <NavLink
                  to={`/dashboard/${isLoggedIn}`}
                  className="py-2 px-3 block hover:text-orange-400 text-center md:text-left"
                >
                  Dashboard
                </NavLink>
              </li>
            )}

            {!isLoggedIn && (
              <li className="md:hidden my-1">
                <NavLink
                  to="/login"
                  className="py-2 px-3 block hover:text-orange-400 text-center md:text-left"
                >
                  Login
                </NavLink>
              </li>
            )}

            {!isLoggedIn && (
              <li className="md:hidden my-1">
                <NavLink
                  to="/signup"
                  className="py-2 px-3 block hover:text-orange-400 text-center md:text-left"
                >
                  Signup
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <button className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-800 transition">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="overflow-hidden w-32 px-4 py-2 h-10 bg-white text-[#183795eb] border border-[#6589f6da] rounded-md font-bold cursor-pointer relative z-10 group">
                  <span>Get Started!</span>
                  <span className="absolute w-36 h-20 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
                  <span className="absolute w-36 h-20 -top-8 -left-2 bg-[#9EBCE5] rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
                  <span className="absolute w-36 h-20 -top-8 -left-2 bg-[#183795] rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
                  <span className="text-white group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute left-8 z-10 text-center">
                    Signup
                  </span>
                </button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {shouldRender && (
                <div className="flex items-center border border-slate-500 rounded-full px-3 py-1">
                  <CiSearch size={20} className="mr-2 text-slate-300" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
                  />
                </div>
              )}
              <ProfileDropdown />
            </div>
          )}
        </div>
      </nav>

      {create && <CreateFile setCreate={setCreate} />}
    </motion.header>
  );
};

export default Navbar;