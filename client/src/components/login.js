import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import axios from "axios"
import { useEffect, useState } from "react";
import { useAuth } from "../middlewares/Auth";
import { toast } from "react-toastify";

const Login = () => {
  const { fetchData, login, logout, isLoggedIn , setIsLoggedIn  } = useAuth();
  const navigate = useNavigate();
  const [LoggedIn , setLoggedIn] = useState(null)
  const [loader , setLoader] = useState(true)
  useEffect(() => {
    const checkStatus = async () =>{
      const loggedIn = await fetchData();
      if(loggedIn){
        setLoggedIn(loggedIn.id)
        setIsLoggedIn(loggedIn.id)
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
      }
      else{
        setLoader(false);
      }
         
    }
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
        console.log("id is :", id)
        const navlink = `/dashboard/${id}`;
        console.log(navlink);
        console.log("L0");
        setIsLoggedIn(id);
        console.log("L1");
        setLoggedIn(id)
        
        console.log("about to pass Navlink")
        navigate(navlink);
        console.log("passed Navlink")
      } 
      else {
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
    <div className="w-screen h-screen m-0 flex justify-center items-center bg-slate-200 p-8">
      {loader? <div>Loading</div> : <form
        className="h-[22rem] w-[30%]  min-w-[350px] border-2 border-slate-200 shadow-lg bg-slate-100 rounded-lg flex flex-col justify-evenly items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h1 className="text-4xl text-gray-400 font-semibold">Login</h1>
        </div>
        <div className="flex flex-col text-lg ">
          <label
            labelfor="email"
            className="block text-gray-800 font-semibold text-base py-2"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            className="focus:ring-pink-500 mx-auto w-[300px] border-slate-300 border-2 rounded-md p-[3px] caret-blue-400"
            {...register("email", {
              required: "Please enter your email",
            })}
            required
          />
        </div>

        <div className="flex flex-col text-lg ">
          <label
            labelfor="password"
            className="block text-gray-800 font-semibold text-base py-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            className="focus:ring-pink-500 mx-auto w-[300px] border-slate-300 border-2 rounded-md p-[3px] caret-blue-400"
            {...register("password", {
              required: "Password is required",
            })}
            required
          />
        </div>

        <button
          className="mt-6 w-[300px] relative py-2 px-8 text-white text-base font-semibold overflow-hidden rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-bold hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-[300px] before:h-full bg-gradient-to-r from-blue-500 to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0 "
          type="submit"
        >
          Login
        </button>
        {/* <div className="flex my-4  gap-12 w-[350px] mx-auto">
                <p className="text-slate-400">Existing User..?</p>
                <NavLink to={`/login`} className=' text-blue-600'> Login </NavLink>
        </div> */}
        <p className="text-slate-400 pt-5 pb-3">
          New User..?{" "}
          <NavLink to={`/signup`} className=" pl-4 text-blue-600">
            {" "}
            SignUp{" "}
          </NavLink>
        </p>
      </form>}
    </div>
  );
};
export default Login;
