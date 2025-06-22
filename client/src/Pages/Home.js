import { useAuth } from "../middlewares/Auth";
import "./Home.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import ScreenVid from "../assets/devicesGif.gif";
import headerImg from "../assets/header.jpg";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-visible bg-cover flex flex-col">
      <Navbar />

      <div className="flex flex-wrap justify-between bg-gradient-to-b from-slate-900 to-gray-600 h-screen w-full gap-10">
        <div className="flex relative h-full w-full">
          <img
            src={headerImg}
            className="h-screen w-full object-cover"
            alt=""
          />
        </div>
        <div className="flex absolute h-screen w-full z-10 bg-gradient-to-r from-[#000000]"></div>

        <div className="Head-text absolute z-10 top-60 left-5 md:left-20 w-[90%] md:w-[500px] gap-10 flex flex-col justify-between">
          <div className="font-bold lg:text-2xl text-xl text-white uppercase">
            A <span className="text-[#183795]">dynamic</span> canvas for
            creators, learners, and collaborators. Here’s what sets it apart:
          </div>
          <div className="uppercase text-white md:font-extralight lg:text-2xl text-base italic">
            Dive into the world of sharing ideas and celebrate connectivity
          </div>
          <NavLink to={`/signup`} className=" relative group">
            {/* <div className="rounded-[100px] bg-gradient-to-br from-orange-500 to-amber-500 w-full md:w-[380px] h-[50px] lg:h-[60px] top-2 lg:top-3 absolute z-10"></div>
        <div className="rounded-[100px] bg-white w-full md:w-[380px] h-[50px] lg:h-[60px] relative z-10 text-black group-hover:text-slate-500 flex justify-center items-center text-2xl lg:text-3xl transition-transform ease-in-out group-hover:translate-y-[1px] group-active:translate-y-1">
          <p className="h-full text-center translate-y-2 font-extrabold">GET STARTED</p>
        </div> */}

            <button class="relative inline-flex items-center justify-center w-64 px-14 py-5 text-lg overflow-hidden tracking-tighter text-white bg-gray-800 rounded-lg group">
              <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-600 rounded-full group-hover:w-72 group-hover:h-72"></span>
              <span class="absolute bottom-0 left-0 h-full -ml-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-auto h-full opacity-100 object-stretch"
                  viewBox="0 0 487 487"
                >
                  <path
                    fill-opacity=".1"
                    fill-rule="nonzero"
                    fill="#FFF"
                    d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
                  ></path>
                </svg>
              </span>
              <span class="absolute top-0 right-0 w-16 h-full -mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="object-cover w-full h-full"
                  viewBox="0 0 487 487"
                >
                  <path
                    fill-opacity=".1"
                    fill-rule="nonzero"
                    fill="#FFF"
                    d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
                  ></path>
                </svg>
              </span>
              <span class="absolute inset-0 w-full h-full -mt-1  rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200"></span>
              <span class="relative font-bold tracking-[0.2px] text-xl">GET STARTED</span>
            </button>


          </NavLink>
        </div>
        <div className="absolute right-1/2 bottom-10 left-1/2 animate-bounce">
          <FaChevronDown color="#ffffff" size={25} />
        </div>
      </div>

      <div className="bg-[#F8CB4F] p-10 md:p-20 min-h-[80vh]">
        <section className="flex flex-wrap p-5 w-full lg:justify-between overflow-hidden box-border">
          <div className="w-full md:w-[510px] h-[510px] p-[10px] mx-auto -mt-10">
            <img
              src={ScreenVid}
              alt=""
              className="object-cover h-full w-full"
            />
          </div>
          <div className="w-full md:w-[800px] sm:pl-20">
            <div className="w-full md:w-[500px] lg:h-[500px] h-[300px] mx-auto">
              <div className=" text-[32px] leading-[40px] lg:text-[45px] lg:leading-[50px] font-[650] flex flex-col justify-center -mt-10 items-start h-full">
                <span className="text-white">Collaborate with</span>
                <div className="text-slate-700">
                  anyone<span className="text-white"> and </span>
                </div>
                <div className="text-white">
                  any<span className="text-slate-700"> device</span>
                  <div>
                    from<span className="text-slate-700"> anywhere</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="h-fit min-h-[90vh] py-32 w-full">
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
            <div className="text-lg text-gray-400 text-center md:mt-5 md:px-6 py-8">
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
            <div className="text-lg text-gray-400 text-center md:mt-5 md:px-6 py-8">
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
            <div className="text-lg text-gray-400 text-center md:mt-5 md:px-6 py-8">
              Manage the user access right
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
