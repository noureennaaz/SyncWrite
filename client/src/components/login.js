import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import axios from "axios"
import "./inputStyle.css"
import { IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useAuth } from "../middlewares/Auth";
import { toast } from "react-toastify";
import ScreenVid from "../assets/devicesGif.gif";
import Navbar from "./Navbar";

const Login = () => {
  const { fetchData, login, logout, isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [LoggedIn, setLoggedIn] = useState(null);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const checkStatus = async () => {
      const loggedIn = await fetchData();
      if (loggedIn) {
        setLoggedIn(loggedIn.id);
        setIsLoggedIn(loggedIn.id);
        toast.info(" User alrady loggedIn", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate(`/dashboard/${isLoggedIn}`);
      } else {
        setLoader(false);
      }
    };
    checkStatus();
  }, []);

  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      const id = response.user._id;
      console.log(response);

      if (response.success) {
        toast.success("Login successful!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log("id is :", id);
        const navlink = `/dashboard/${id}`;
        console.log(navlink);
        console.log("L0");
        setIsLoggedIn(id);
        console.log("L1");
        setLoggedIn(id);

        console.log("about to pass Navlink");
        navigate(navlink);
        console.log("passed Navlink");
      } else {
        toast.error("Enter correct credentials", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      console.log("failure while logging");
      toast.error("Enter correct credentials", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  

  return (
    <div className="min-w-screen overflow-hidden min-h-screen m-0 flex justify-center items-center bg-stone-900 p-8">
    
      {loader ? (
        <div>Loading</div>
      ) : (
        <div className="flex h-[90vh] max-w-[90%] rounded-3xl p-5 shadow-lg bg-black">
          <div>
            <form
              className="h-[22rem] max-w-full  lg:w-[400px] text rounded-lg flex flex-col justify-evenly"
              onSubmit={handleSubmit(onSubmit)}
            >
              <button onClick={() => navigate(-1)}>
          <div className="relative rounded-full h-10 w-10 box-border flex justify-center items-center p-2 hover:bg-stone-950 transition-all duration-700 group border-stone-950 border-[3px] -left-4 mb-3">
              <IoArrowBack className="group-hover:scale-110 transition-transform" />
            </div>
          </button>
              <div>
                <div className="text-gray-500 font-normal ">
                  <div>Welcome,</div>
                </div>
                <div>
                  <h1 className="text-4xl text-gray-200 pr-10 pt-2 pb-5 font-[500] tracking-wide">
                    Login to <br />
                    your account
                  </h1>
                </div>
              </div>
              <div>
                <p className="text-slate-400 pt-5 pb-3 font-medium text-base">
                  New User..?{" "}
                  <NavLink to={`/signup`} className=" pl-4 text-amber-600">
                    {" "}
                    SignUp{" "}
                  </NavLink>
                </p>
              </div>
              <div className="flex flex-col sm:gap-6 gap-3 pt-8 max-w-[90%]">
              <div className="flex flex-col text-lg">
                <label
                  labelfor="email"
                  className=" text-slate-500 text-sm flex flex-col font-medium rounded-[30px] bg-stone-900 py-2 px-5"
                >
                  Email
                  <input
                    type="text"
                    name="email"
                    className=" bg-stone-900 outline-0 text-white caret-blue-400"
                    {...register("email", {
                      required: "Please enter your email",
                    })}
                    required
                  />
                </label>
              </div>

              <div className="flex flex-col text-lg ">
                <label
                  labelfor="password"
                  className=" text-slate-500 text-sm flex flex-col font-medium rounded-[30px] bg-stone-900  py-2 px-5"
                >
                  Password
                  <input
                    type="password"
                    name="password"
                    className="bg-stone-900 outline-0 text-white caret-blue-400"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    required
                  />
                </label>
              </div>

              <button
                className="sm:mt-4 sm:w-[250px] relative py-3 px-8 text-white text-base font-semibold overflow-hidden rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-bold hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-[300px] before:h-full bg-gradient-to-tl from-orange-600 to-orange-500 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0 "
                type="submit"
              >
                Login
              </button>
              </div>
            </form>
          </div>
          <div className="lg:block hidden w-[600px] h-[98%]">
            <img
              src={ScreenVid}
              alt=""
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Login;
