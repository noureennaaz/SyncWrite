import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../middlewares/Auth";
import { toast } from "react-toastify";
import { IoArrowBack } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./otpStyle.css";
import OTPVerifier from "./OTPVerifier";
import ScreenVid from "../assets/devicesGif.gif";
import "./inputStyle.css";

const SignUp = () => {
  const { setIsLoggedIn, isLoggedIn, sendOTP, fetchData } = useAuth();
  const navigate = useNavigate();
  const [submitted, setSubmit] = useState(false);

  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/dashboard/${isLoggedIn}`);
    }
  }, [isAuthenticated, navigate]);
 
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

  function handleEnter(event) {
    if (event.keyCode === 13 || event.keyCode === 39) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }
  function HandleFill(event) {
    if (event.keyCode != 8) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }
  function handleBackSpace(event) {
    if (event.keyCode === 8 || event.keyCode === 37) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      if (index > 0) form.elements[index - 1].focus();
      if (event.keyCode === 8) event.target.value = "";
      event.preventDefault();
    }
  }

  const onSubmit = async (data) => {
    try {
      console.log("submit pressed");
      const response = await sendOTP(data);
      console.log("something obtained");
      //   const id = response.user._id;
      console.log(response);

      if (response.success) {
        setSubmit(data);
        toast.success("OTP sent to your email", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        console.log("about to pass Navlink");
        // navigate("/");
        console.log("passed Navlink");
      } else {
        toast.error(response.message, {
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
      console.log("Failed to SignUp and sending OTP");
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
    <div className="w-screen h-screen m-0 flex justify-center items-center bg-stone-900 p-0 sm:p-8">
      <div className="flex sm:min-h-[93vh] sm:min-w-fit min-w-[96%] sm:rounded-3xl p-5 box-border bg-black">
        {/* flex sm:h-[90vh] h-screen min-h-fit sm:rounded-3xl p-5 shadow-lg bg-black */}
        <form
          className="max-w-full h-[580px] sm:w-[400px] shadow-lg text bg-black flex flex-col relative justify-evenly"
          onSubmit={handleSubmit(onSubmit)}
        >
          
          <button onClick={()=>{navigate(-1)}}>
          <div className="absolute -top-3 -left-2 sm:top-1 sm:left-1 rounded-full h-10 w-10 box-border flex justify-center items-center p-2 hover:bg-stone-950 transition-all duration-700 group border-stone-950 border-[3px]">
              <IoArrowBack className="group-hover:scale-110 transition-transform" />
            </div>
          </button>

          <div className="flex flex-col gap-0 pt-2">
            <div className="text-gray-500 font-normal ">
              <div>Get started,</div>
            </div>
            <div>
              <h1 className="lg:text-4xl text-2xl text-gray-200 pr-10 py-2 font-[500] tracking-wide">
                Create <br />
                your account
              </h1>
            </div>
          </div>
          <div>
            <p className="text-slate-400 sm:pt-5 pb-3 font-semibold text-base">
              Already a member?
              <NavLink to={`/login`} className=" pl-4 text-amber-600">
                Log in{" "}
              </NavLink>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-col text-lg">
              <label
                labelfor="fname"
                className="sm:w-[170px] text-slate-500 text-sm flex flex-col font-medium rounded-[30px] bg-stone-900 px-5"
              >
                First name:
                <input
                  type="text"
                  name="fname"
                  className="bg-stone-900 outline-0 text-white caret-stone-500 mx-auto  w-[80%]"
                  {...register("fname", {
                    required: "Please enter your first name",
                  })}
                  required
                />
              </label>
            </div>
            <div className="flex flex-col text-lg ">
              <label
                labelfor="lname"
                className="sm:w-[170px] text-slate-500 text-sm flex flex-col font-medium rounded-[30px] bg-stone-900 px-5"
              >
                Last name:
                <input
                  type="text"
                  name="lname"
                  className="bg-stone-900 outline-0 text-white caret-stone-500 mx-auto w-[80%]"
                  {...register("lname", {
                    required: "Please enter your last name",
                  })}
                  required
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col text-lg py-3">
            <label
              labelfor="email"
              className="sm:w-[350px] text-slate-500 text-sm flex flex-col font-medium rounded-[30px] bg-stone-900 px-5"
            >
              Email:
              <input
                type="email"
                name="email"
                className="bg-stone-900 outline-0 text-white caret-stone-500 mx-auto w-[80%]"
                {...register("email", {
                  required: "Please enter your email",
                })}
                required
              />
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex flex-col text-lg sm:w-[170px]">
              <label
                labelfor="password"
                className=" text-slate-500 text-sm flex flex-col font-medium rounded-[30px] bg-stone-900 px-5"
              >
                Password
                <input
                  type="password"
                  name="password"
                  className="bg-stone-900 outline-0 text-white caret-stone-500 mx-auto w-[80%]"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  required
                />
              </label>
            </div>

            <div className="flex flex-col text-lg  sm:w-[170px]">
              <label
                labelfor="confirmPassword"
                className=" text-slate-500 text-sm flex flex-col font-medium rounded-[30px] bg-stone-900 px-5"
              >
                Confirm Password
                <input
                  type="password"
                  name="ConfirmPassword"
                  className="bg-stone-900 outline-0 text-white caret-stone-500 mx-auto w-[80%]"
                  {...register("confirmPassword", {
                    required: "Please re-enter password",
                  })}
                  required
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-[200px] relative py-3 px-8 text-white text-base font-semibold overflow-hidden rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-[1.02] hover:text-bold hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-[300px] before:h-full bg-gradient-to-tl from-orange-600 to-orange-500 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0 "
          >
            SignUp
          </button>
          {/* <div className="flex my-4  gap-12 w-[350px] mx-auto">
                <p className="text-slate-400">Existing User..?</p>
                <NavLink to={`/login`} className=' text-blue-600'> Login </NavLink>
            </div>   */}
          {/* <p className="text-slate-400 pt-5 pb-3">
            New User..?
            <NavLink to={`/login`} className=" pl-4 text-blue-600">
              {" "}
              Login{" "}
            </NavLink>
          </p> */}
        </form>
        <div className="lg:block hidden w-[600px] h-[88vh%]">
          <img
            src={ScreenVid}
            alt=""
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
      {submitted && <OTPVerifier submitState={setSubmit} />}
      {/* <OTPVerifier submitState={setSubmit} /> */}
    </div>
  );
};
export default SignUp;
