import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../middlewares/Auth";
import { toast } from "react-toastify";
import { useState } from "react";
import "./otpStyle.css"
import OTPVerifier from "./OTPVerifier";

const SignUp = () => {
  const { isLoggedIn, sendOTP } = useAuth();

  const [submitted, setSubmit] = useState(false);

  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });

  function handleEnter(event) {
    if (event.keyCode === 13 || event.keyCode===39) {
        const form = event.target.form;
        const index = Array.prototype.indexOf.call(form, event.target);
        form.elements[index + 1].focus();
        event.preventDefault();
      
    }
    
  }
  function HandleFill(event){
    if(event.keyCode!= 8){
        const form = event.target.form;
        const index = Array.prototype.indexOf.call(form, event.target);
        form.elements[index + 1].focus();
        event.preventDefault();
    }
  }
  function handleBackSpace(event) {
    if (event.keyCode === 8  || event.keyCode ===37 ) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      if(index>0)
      form.elements[(index - 1)].focus();
    if(event.keyCode === 8)
      event.target.value=""
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
        setSubmit(data)
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

        
        // console.log("id is :", id)
        // const navlink = `/dashboard/${id}`;
        // console.log(navlink);

        console.log("about to pass Navlink");
        // navigate(navlink);
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
    <div className="relative">
      <div className="relative w-screen h-screen m-0 flex justify-center items-center bg-slate-200 p-8">
        <form
          className="py-8 gap-2 w-[35%] border-2 border-slate-200 shadow-lg min-h-fit bg-slate-100 rounded-lg flex flex-col justify-evenly items-center min-w-[450px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <h1 className="text-4xl text-gray-400 font-semibold">Sign Up</h1>
          </div>

          <div className="flex flex-col text-lg ">
            <label
              labelfor="fname"
              className="block text-gray-800 font-semibold text-sm py-2"
            >
              First name:
            </label>
            <input
              type="text"
              name="fname"
              className="mx-auto w-[350px] border-slate-300 border-2 rounded-md px-2"
              {...register("fname", {
                required: "Please enter your first name",
              })}
              required
            />
          </div>
          <div className="flex flex-col text-lg ">
            <label
              labelfor="lname"
              className="block text-gray-800 font-semibold text-sm py-2"
            >
              Last name:
            </label>
            <input
              type="text"
              name="lname"
              className="mx-auto w-[350px] border-slate-300 border-2 rounded-md px-2"
              {...register("lname", {
                required: "Please enter your last name",
              })}
              required
            />
          </div>
          <div className="flex flex-col text-lg ">
            <label
              labelfor="email"
              className="block text-gray-800 font-semibold text-sm py-2"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              className="mx-auto w-[350px] border-slate-300 border-2 rounded-md px-2"
              {...register("email", {
                required: "Please enter your email",
              })}
              required
            />
          </div>

          <div className=" w-[350px] flex gap-2">
            <div className="flex flex-col text-lg w-[170px]">
              <label
                labelfor="password"
                className="block text-gray-800 font-semibold text-sm py-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="border-slate-300 border-2 rounded-md px-2"
                {...register("password", {
                  required: "Password is required",
                })}
                required
              />
            </div>

            <div className="flex flex-col text-lg  w-[170px]">
              <label
                labelfor="confirmPassword"
                className="block text-gray-800 font-semibold text-sm py-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="ConfirmPassword"
                className=" border-slate-300 border-2 rounded-md px-2"
                {...register("confirmPassword", {
                  required: "Please re-enter password",
                })}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-[300px] relative py-2 px-4 text-white text-base font-semibold overflow-hidden rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-bold hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-[300px] before:h-full bg-gradient-to-r from-blue-500 to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0 "
          >
            SignUp
          </button>
          {/* <div className="flex my-4  gap-12 w-[350px] mx-auto">
                <p className="text-slate-400">Existing User..?</p>
                <NavLink to={`/login`} className=' text-blue-600'> Login </NavLink>
            </div>   */}
          <p className="text-slate-400 pt-5 pb-3">
            New User..?
            <NavLink to={`/login`} className=" pl-4 text-blue-600">
              {" "}
              Login{" "}
            </NavLink>
          </p>
        </form>
      </div>
      {submitted && (
        <OTPVerifier userData={submitted}/>
      )}
    </div>
  );
};
export default SignUp;
