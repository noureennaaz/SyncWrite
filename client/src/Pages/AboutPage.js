import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Squares from "../components/style/Squares";
import Footer from "../components/Footer";
import Feature from "../components/Feature";

const AboutPage = () => {
  return (
    <div className="bg-slate-900 min-h-screen">
      <Navbar />

      <div className="relative h-screen w-full bg-gradient-to-b from-slate-900 to-gray-600 overflow-hidden">

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-[#000111c5] to-black" />

        <div className="absolute inset-0">
          <Squares
            speed={0.2}
            squareSize={40}
            direction="diagonal"
            borderColor="#fff"
            hoverFillColor="#222"
            className="w-full h-full"
          />
        </div>

        <div className="absolute z-20 top-1/2 left-1/2 w-[90%] md:w-[700px] transform -translate-x-1/2 -translate-y-1/2 px-6 md:px-10 pt-20 flex flex-col items-center gap-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white uppercase">
            About <span className="text-emerald-400">SyncWrite</span>
          </h1>

          <p className="text-white md:text-xl font-light">
            SyncWrite is a collaborative platform that empowers users to create,
            share, and manage content seamlessly. Whether you're a student,
            developer, or professional, SyncWrite makes teamwork effortless with
            real-time editing, access control, and sharing capabilities.
          </p>

          <p className="text-white md:text-lg font-light italic">
            Our mission is to foster creativity, collaboration, and
            communication across the globe by simplifying the way people connect
            and work together.
          </p>

          <NavLink to="/signup" className="group relative">
            <button className="relative inline-block p-px font-semibold text-white bg-neutral-900 shadow-2xl cursor-pointer rounded-2xl shadow-emerald-900 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-emerald-600">
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-600 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              <span className="relative z-10 block px-6 py-3 rounded-2xl bg-neutral-950">
                <div className="flex items-center justify-center gap-3">
                  <span className="transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-emerald-300">
                    Join Us
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-emerald-300"
                  >
                    <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                  </svg>
                </div>
              </span>
            </button>
          </NavLink>
        </div>
      </div>
      <Feature/>
      <Footer/>
    </div>
  );
};

export default AboutPage;
