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
      <img src={headerImg} className="h-screen w-full object-cover" alt="" />
    </div>
    <div className="flex absolute h-screen w-full z-10 bg-gradient-to-r from-[#000000]"></div>

    <div className="Head-text absolute z-10 top-60 left-5 md:left-20 w-[90%] md:w-[500px] gap-10 flex flex-col justify-between">
      <div className="font-bold lg:text-2xl text-xl text-white uppercase">
        A <span className="text-[#183795]">dynamic</span> canvas for creators, learners, and collaborators. Here’s what sets it apart:
      </div>
      <div className="uppercase text-white md:font-extralight lg:text-2xl text-base italic">
        Dive into the world of sharing ideas and celebrate connectivity
      </div>
      <NavLink to={`/signup`} className=" relative group">
        <div className="rounded-[100px] bg-gradient-to-br from-orange-500 to-amber-500 w-full md:w-[380px] h-[50px] lg:h-[60px] top-2 lg:top-3 absolute z-10"></div>
        <div className="rounded-[100px] bg-white w-full md:w-[380px] h-[50px] lg:h-[60px] relative z-10 text-slate-600 group-hover:text-slate-500 flex justify-center items-center text-2xl lg:text-3xl font-bold italic transition-transform ease-in-out group-hover:translate-y-[1px] group-active:translate-y-1">
          <p className="h-full text-center translate-y-2">GET STARTED</p>
        </div>
      </NavLink>
    </div>
    <div className="absolute right-1/2 bottom-10 left-1/2 animate-bounce">
      <FaChevronDown color="#ffffff" size={25} />
    </div>
  </div>

  <div className="bg-[#F8CB4F] p-10 md:p-20 min-h-[80vh]">
    <section className="flex flex-wrap p-5 w-full lg:justify-between overflow-hidden box-border">
      <div className="w-full md:w-[510px] h-[510px] p-[10px] mx-auto -mt-10">
        <img src={ScreenVid} alt="" className="object-cover h-full w-full" />
      </div>
      <div className="w-full md:w-[800px] sm:pl-20">
        <div className="w-full md:w-[500px] lg:h-[500px] h-[300px] mx-auto">
          <div className=" text-[32px] leading-[40px] lg:text-[45px] lg:leading-[50px] font-[650] flex flex-col justify-center -mt-10 items-start h-full">
            <span className="text-white">Collaborate with</span>
            <div className="text-slate-700">anyone<span className="text-white"> and </span></div>
            <div className="text-white">
              any<span className="text-slate-700"> device</span>
              <div>from<span className="text-slate-700"> anywhere</span></div>
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
            <img src="https://res.cloudinary.com/dihp6gdpi/image/upload/SyncWrite/code.jpg" className="h-full w-full object-cover rounded-lg" alt=""/>
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
            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/send-3d-icon-download-in-png-blend-fbx-gltf-file-formats--telegram-logo-mail-plane-message-contact-us-pack-services-icons-5655977.png?f=webp" className="h-full w-full object-cover rounded-lg" alt=""/>
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
            <img src="https://res.cloudinary.com/dihp6gdpi/image/upload/SyncWrite/auth_bynemf.png" className="h-full w-full object-cover rounded-lg" alt=""/>
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
