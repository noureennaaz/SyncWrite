import { useAuth } from "../middlewares/Auth";
import "./Home.css"
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import ScreenVid from "../assets/devicesGif.gif"
import { AiOutlineCode } from "react-icons/ai";
import { BsJournalCode } from "react-icons/bs";
import { TbWorldShare } from "react-icons/tb";
import { TbShieldShare } from "react-icons/tb";
import Spline from "@splinetool/react-spline";
function SplineGirl(){
  return (
    <Spline
      scene="z"
      className="bg-slate-200"
    />
  );
}
function SplineComponent() {
  const cube = useRef();

  function onLoad(spline) {
    const obj = spline.findObjectByName("Cube");
    // or
    // const obj = spline.findObjectById('8E8C2DDD-18B6-4C54-861D-7ED2519DE20E');

    // save it in a ref for later use
    cube.current = obj;
  }

  function moveObj() {
    console.log(cube.current); // Spline Object => { name: 'Cube', id: '8E8C2DDD-18B6-4C54-861D-7ED2519DE20E', position: {}, ... }

    // move the object in 3D space
    cube.current.position.x += 10;
  }

  return (
    <Spline
      scene="https://prod.spline.design/Va-aKVHSeo86vBjL/scene.splinecode"
      onLoad={onLoad}
      onScroll={moveObj}
     
    />
  );
}

export default function Home() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen min-w-screen bg-cover flex flex-col overflow-x-hidden ">
      <nav className=" w-screen z-50 h-[90px]  bg-gradient-to-tr from-[#141b2b] to-[#111827] pt-1  flex justify-between items-center sticky top-0 px-20 box-border">
        <div className="text-5xl font-[650]">
          <span className="text-white">My</span>
          <span className="text-slate-300 ">Docs</span>
        </div>

        <div>
          {isLoggedIn ? (
            <div className="flex w-screen">
              <NavLink
                to={`/dashboard/${isLoggedIn}`}
                className=" pl-4 text-blue-600"
              >
                <div>dashboard</div>
              </NavLink>

              <NavLink to={`/logout`} className=" pl-4 text-blue-600">
                <div>logout</div>
              </NavLink>
            </div>
          ) : (
            <div className="flex p-10">
              <NavLink to={`/login`} className=" pl-4 text-blue-600">
              {/* border px-5 py-1 border-[#658AF8] shadow  font-semibold rounded-sm hover:bg-[#658AF8] hover:text-white hover:drop-shadow-2xl hover:scale-[1.02]  */}
                <button className="overflow-hidden w-24 text-lg p-2 h-12 bg-slate-700 text-white border-b-2 border-l-2 border-[#728cb1] rounded-md font-bold cursor-pointer relative z-10 shadow:sm  hover:shadow-none hover:bg-slate-800 transition active:border-l">
                  Login
                </button>
              </NavLink>
              <NavLink to={`/signup`} className="pl-4">
                {/* <div className="bg-[#658AF8] text-white">Signup</div> */}
                {/* <button class="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
                        border-blue-600
                        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[3px]
                        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                        Button
                        </button> */}
                <button className="overflow-hidden w-32 p-2 h-12 bg-white text-[#183795eb] border border-[#6589f6da] rounded-md font-bold cursor-pointer relative z-10 group">
                  <span className="text-lg">Get Started!</span>
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-[#9EBCE5] rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-[#183795] rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
                  <span className="text-white group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-8 z-10 text-center">
                    Signup
                  </span>
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </nav>
      {/* bg-gradient-to-b from-amber-700 to-[#F8CB4F] */}
      <div className="flex flex-wrap justify-between bg-gradient-to-b from-slate-900 to-gray-600 h-[98vh] overflow-y-hidden  w-screen -mt-10 px-30 gap-10">
        <div className="ml-[400px] flex relative -top-24 overflow-hidden">
        <SplineComponent className='relative' />

        </div>
      
      <div className="Head-text absolute top-60 left-20 w-[500px] gap-10 flex flex-col justify-between " >
        <div className="font-bold text-2xl text-white uppercase ">
          A <span className="text-[#183795]">dynamic</span> canvas for creators, learners, and collaborators. Here’s what sets it apart:
        </div>
        <div className="uppercase text-white font-extralight text-2xl italic">
        Dive to the world of sharing 
        ideas and celebrate connectivity 
        </div>

        <button className="relative group">
          <div className="rounded-[100px] bg-[#183795] w-[380px] h-[60px] top-3 absolute z-10 "></div>
          <div className="rounded-[100px] bg-white w-[380px] h-[60px] right-0 relative z-30 text-  text-[#989a98dc] justify-center items-center text-3xl font-bold italic transition-transform ease-in-out group-hover:translate-y-[1px] group-active:translate-y-1">
            <p className="h-full translate-y-2">GET STARTED</p>
          </div>
        </button>
        

      </div>
      <div className="absolute right-1/2 bottom-10 left-1/2 animate-bounce">
      <FaChevronDown color="#ffffff"  size={25}/>
      </div>
      </div>
      <div className="bg-[#F8CB4F] p-20 h-[80vh]">
        {/* <SplineGirl/> */}
        <section className="flex  p-5 w-screen justify-between overflow-hidden box-border ">
          <div className="w-[510px] h-[510px] p-[10px] -mt-10">
          <img src={ScreenVid} alt='' className="object-cover h-full w-full"/>
          </div>
          <div className="w-[800px] ">
         <div className="w-[500px] h-[500px] ">
         <div className="text-[45px] leading-[50px] font-[650] flex flex-col justify-center -mt-10 items-start h-full">
          <span className="text-white">Colaborate with </span>
          <div className="text-slate-700 ">anyone
          <span className="text-white"> and </span>
          </div>
          <div className="text-white">
             any
          <span className="text-slate-700"> device </span>
          <div>
            from 
            <span className="text-slate-700 "> anywhere</span>
          </div>
          
          </div>
          
          
          
        </div>
         </div>


          </div>
        </section>
      </div>
      <section className="h-[90vh] py-32 w-screen">
        <div className="w-[90vw] mx-auto h-screen flex justify-evenly ">
        <div className="relative group">
            <div className="relative top-0 w-[300px] h-[350px] shadow-md bg-gray-500 -rotate-2 group-hover:rotate-0 transition-transform ease-in-out rounded-xl backdrop-blur border"></div>
            <div className="absolute top-1 left-1 w-[300px] h-[350px] shadow-xl bg-[#ffffffde] rounded-xl backdrop-blur ease-in-out transition-all border-2 border-gray-200 flex flex-col justify-center items-center gap-20 group-hover:rotate-0 duration-500 group-hover:scale-[1.04] rotate-2 box-border ">
              <div className="w-full h-[50px]">
              <BsJournalCode  color="#6b7280" size={100} className="mx-auto w-fit"/>
                

              </div>
              <div className="text-xl font-light text-gray-600 text-center mt-5 px-6">
                Real time code runner with text editor within file
                
              </div>
              
            </div>
          </div>
          <div className="relative group">
            <div className="relative top-0 w-[300px] h-[350px] shadow-md bg-gray-500 -rotate-2 group-hover:rotate-0 transition-transform ease-in-out rounded-xl backdrop-blur border"></div>
            <div className="absolute top-1 left-1 w-[300px] h-[350px] shadow-xl bg-[#ffffffde] rounded-xl backdrop-blur ease-in-out transition-all border-2 border-gray-200 flex flex-col justify-center items-center gap-20 group-hover:rotate-0 duration-500 group-hover:scale-[1.04] rotate-2 box-border">
              <div className="w-full h-[50px]">
              <TbWorldShare  color="#6b7280" size={100} className="mx-auto w-fit"/>
                

              </div>
              <div className="text-xl font-light text-gray-600 text-center mt-5 px-6">
                Share anywhere around world
                
              </div>
              
            </div>
          </div>
          <div className="relative group">
            <div className="relative top-0 w-[300px] h-[350px] shadow-md bg-gray-500 -rotate-2 group-hover:rotate-0 transition-transform ease-in-out rounded-xl backdrop-blur border"></div>
            <div className="absolute top-1 left-1 w-[300px] h-[350px] shadow-xl bg-[#ffffffde] rounded-xl backdrop-blur ease-in-out transition-all border-2 border-gray-200 flex flex-col justify-center items-center gap-20 group-hover:rotate-0 duration-500 group-hover:scale-[1.04] rotate-2 box-border">
              <div className="w-full h-[50px]">
              <TbShieldShare  color="#6b7280" size={100} className="mx-auto w-fit"/>
                

              </div>
              <div className="text-xl font-light text-gray-600 text-center mt-5 px-6">
                Manage the user access rights
                
              </div>
              
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
