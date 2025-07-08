import { useAuth } from "../middlewares/Auth";
import "./Home.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import headerImg from "../assets/header.jpg";
import Footer from "../components/Footer";
import BlurText from "../components/style/BlurText";
import Navbar from "../components/Navbar";
import Squares from "../components/style/Squares";
import Feature from "../components/Feature"

export default function Home() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const scrollToOffset = () => {
    window.scrollBy({ top: 600, behavior: "smooth" });
  };
  return (
    <div className="w-full overflow-visible bg-cover flex flex-col">
      <Navbar />

      <div className="relative h-screen w-full bg-gradient-to-b from-slate-900 to-gray-600 overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-[#000111c5] to-black" />
        <div className="absolute inset-0">
          {/* <img
            src={headerImg}
            alt="Header Background"
            className="w-full h-full object-cover"
          /> */}
          <Squares
            speed={0.2}
            squareSize={40}
            direction="diagonal" 
            borderColor="#fff"
            hoverFillColor="#222"
            className="w-full h-full"
          />
        </div>

        <div className="absolute z-20 top-1/2 left-1/2 w-[90%] md:w-[600px] transform -translate-x-1/2 -translate-y-1/2 px-6 md:px-10 flex flex-col items-center gap-8">
          {/* <BlurText
            text=""
            delay={100}
            animateBy="words"
            direction="top"
            className="text-2xl md:text-4xl font-bold text-white uppercase text-center"
          /> */}
          <div className="text-2xl md:text-4xl font-bold text-white uppercase text-center">
            A canvas for
            <div>
              creators,
              <span className="text-blue-400">learners </span>and collaborators
            </div>
          </div>

          <BlurText
            text="Dive into the world of sharing ideas and celebrate connectivity"
            delay={100}
            animateBy="words"
            direction="top"
            className="text-xl md:text-2xl italic text-white font-extralight uppercase text-center"
          />

          <NavLink to="/signup" className="group relative">
            <button className="relative inline-block p-px font-semibold text-white bg-neutral-900 shadow-2xl cursor-pointer rounded-2xl shadow-emerald-900 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-emerald-600">
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-600 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              <span className="relative z-10 block px-6 py-3 rounded-2xl bg-neutral-950">
                <div className="flex items-center justify-center gap-3">
                  <span className="transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-emerald-300">
                    Begin Journey
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

        <div
          className="absolute left-1/2 bottom-10 -translate-x-1/2 animate-bounce cursor-pointer z-50"
          onClick={scrollToOffset}
        >
          <FaChevronDown color="#ffffff" size={25} />
        </div>
      </div>

      <Feature/>

      <section className="h-fit uppercase bg-stone-950 text-gray-600 font-semibold min-h-[90vh] py-32 w-full">
        <div className="w-[90%]  mx-auto gap-16 h-fit flex flex-wrap justify-evenly">
          <div className="relative group md:w-[300px] w-[200px] h-[300px] md:h-[400px]">
            <div className="relative top-0 w-[200px] h-[200px] md:w-[300px] md:h-[300px] shadow-md bg-gray-500 -rotate-2 group-hover:rotate-0 transition-transform ease-in-out rounded-xl backdrop-blur border"></div>
            <div className="absolute top-0 left-1 w-[200px] h-[200px] md:w-[300px] md:h-[300px] shadow-xl bg-[#ffffffde] rounded-xl backdrop-blur transition-all border-2 border-gray-200 flex flex-col group-hover:rotate-0 duration-500 group-hover:scale-[1.04] rotate-2">
              <div className="w-full md:h-[300px] h-[200px]">
                <img
                  src="https://res.cloudinary.com/dihp6gdpi/image/upload/SyncWrite/code.jpg"
                  className="h-full w-full object-cover rounded-lg"
                  alt=""
                />
              </div>
            </div>
            <div className="text-lg text-center md:mt-5 md:px-6 py-8">
              Real-time code runner with text editor within file
            </div>
          </div>
          <div className="relative group md:w-[300px] w-[200px]  h-[300px] md:h-[400px]">
            <div className="relative top-0 w-[200px] h-[200px] md:w-[300px] md:h-[300px] shadow-md bg-gray-500 -rotate-2 group-hover:rotate-0 transition-transform ease-in-out rounded-xl backdrop-blur border"></div>
            <div className="absolute top-0 left-1 w-[200px] h-[200px] md:w-[300px] md:h-[300px] shadow-xl bg-[#ffffffde] rounded-xl backdrop-blur transition-all border-2 border-gray-200 flex flex-col group-hover:rotate-0 duration-500 group-hover:scale-[1.04] rotate-2">
              <div className="w-full md:h-[300px] h-[200px]">
                <img
                  src="https://res.cloudinary.com/dihp6gdpi/image/upload/SyncWrite/share.png"
                  className="h-full w-full object-cover rounded-lg"
                  alt=""
                />
              </div>
            </div>
            <div className="text-lg text-center md:mt-5 md:px-6 py-8">
              Share anywhere around world
            </div>
          </div>
          <div className="relative group md:w-[300px] w-[200px] h-[300px] md:h-[400px]">
            <div className="relative top-0 w-[200px] h-[200px] md:w-[300px] md:h-[300px] shadow-md bg-gray-500 -rotate-2 group-hover:rotate-0 transition-transform ease-in-out rounded-xl backdrop-blur border"></div>
            <div className="absolute top-0 left-1 w-[200px] h-[200px] md:w-[300px] md:h-[300px] shadow-xl bg-[#ffffffde] rounded-xl backdrop-blur transition-all border-2 border-gray-200 flex flex-col group-hover:rotate-0 duration-500 group-hover:scale-[1.04] rotate-2">
              <div className="w-full md:h-[300px] h-[200px]">
                <img
                  src="https://res.cloudinary.com/dihp6gdpi/image/upload/SyncWrite/access.png"
                  className="h-full w-full object-cover rounded-lg"
                  alt=""
                />
              </div>
            </div>
            <div className="text-lg text-center md:mt-5 md:px-6 py-8">
              Manage the user access right
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
