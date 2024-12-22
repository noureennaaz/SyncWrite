import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import axios from "axios"
import { useEffect, useState } from "react";
import { useAuth } from "../middlewares/Auth";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";

export default function OTPVerifier (props){

    const {signup } = useAuth();
    const navigate = useNavigate();
    var userInfo = props.submitState;
    
    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
      });

      const onSubmit = async (data) => {
        try {

          const otp=data.val1 + data.val2 + data.val3 + data.val4;
          userInfo.otp=otp;
          console.log("submit pressed");
          console.log(userInfo);
          const response = await signup(userInfo);
          console.log("something obtained");
          //   const id = response.user._id;
          console.log(response);
    
          if (response.success) {
            toast.success("User signUP successful ", {
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
            navigate("/");
            console.log("passed Navlink");
          } else {
            toast.error("Enter correct otp", {
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

    return (
        <div className="bg-white/10 backdrop-blur-[3px] flex-col gap-10 w-full h-full absolute z-50 top-0 right-0 justify-center flex items-center">
          
            <form className="form relative" onSubmit={handleSubmit(onSubmit)} >
              <button className="absolute top-5 right-5 flex justify-center items-center transition ease-in-out duration-75 hover:bg-slate-100 h-10 w-10 rounded-full " onClick={()=>userInfo(false)}>
                <IoMdClose color="#94a3b8" size={20}/>
              </button>

              <p class="heading relative">Verify</p>
              <div className="h-28 w-28">
                <img src="https://miro.medium.com/v2/resize:fit:450/1*2wlF_2-UesCiTP699Mrd6w.png" alt = ""/>
              </div>
              
              <div class="box">
                <input class="input" type="text" required="true" maxlength="1" onKeyDown={handleEnter} onChange={(e)=>{if(e.target.value.length===1) HandleFill(e)}} onKeyUp={handleBackSpace} {...register("val1")}/>
                <input class="input" type="text" required="true" maxlength="1" onKeyDown={handleEnter} onChange={(e)=>{if(e.target.value.length===1) HandleFill(e)}} onKeyUp={handleBackSpace} {...register("val2")}/>
                <input class="input" type="text" required="true" maxlength="1" onKeyDown={handleEnter} onChange={(e)=>{if(e.target.value.length>0) HandleFill(e)}} onKeyUp={handleBackSpace} {...register("val3")}/>
                <input class="input" type="text" required="true" maxlength="1" onKeyUp={handleBackSpace} {...register("val4")}/>
              </div>
              
              <button class="btn1"  className="w-[250px] py-3 px-8 text-white text-base font-semibold overflow-hidden rounded-full transition-all duration-400 ease-in-out shadow-md hover:text-bold hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-[300px] before:h-full bg-gradient-to-tl from-orange-600 to-orange-500 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0 "
              >Submit</button>
              
            </form>
            <p className="h-0 -translate-y-5 text-slate-500">Enter otp sent to your email</p>
        </div>
    )
}