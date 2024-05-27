import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import axios from "axios"
import { useEffect, useState } from "react";
import { useAuth } from "../middlewares/Auth";
import { toast } from "react-toastify";

export default function OTPVerifier (props){

    const {signup } = useAuth();
    const navigate = useNavigate();
    var userInfo = props.userData;
    
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
        <div className="bg-white/10 backdrop-grayscale backdrop-blur-sm flex-col gap-10 w-full h-full absolute z-50 top-0 right-0 justify-center flex items-center">
          
            <form class="form" onSubmit={handleSubmit(onSubmit)}>
              <p class="heading">Verify</p>
              <svg
                class="check"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="60px"
                height="60px"
                viewBox="0 0 60 60"
                space="preserve"
              >
                {" "}
                <image
                  id="image0"
                  width="60"
                  height="60"
                  x="0"
                  y="0"
                  href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAQAAACQ9RH5AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZ
cwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0NDzN/r+StAAACR0lEQVRYw+3Yy2sTURTH8W+bNgVf
aGhFaxNiAoJou3FVEUQE1yL031BEROjCnf4PLlxILZSGYncuiiC48AEKxghaNGiliAojiBWZNnNd
xDza3pl77jyCyPzO8ubcT85wmUkG0qT539In+MwgoxQoUqDAKDn2kSNLlp3AGi4uDt9xWOUTK3xg
hVU2wsIZSkxwnHHGKZOxHKfBe6rUqFGlTkPaVmKGn6iYao1ZyhK2zJfY0FZ9ldBzsbMKxZwZjn/e
5szGw6UsD5I0W6T+hBhjUjiF7bNInjz37Ruj3igGABjbtpIo3GIh30u4ww5wr3fwfJvNcFeznhBs
YgXw70TYX2bY/ulkZhWfzfBbTdtrzjPFsvFI+T/L35jhp5q2owDs51VIVvHYDM9sa/LY8XdtKy1l
FXfM8FVN2/X2ajctZxVXzPA5TZvHpfb6CFXxkerUWTOcY11LX9w0tc20inX2mmF4qG3upnNWrOKB
hIXLPu3dF1x+kRWq6ysHpkjDl+7eQjatYoOCDIZF3006U0unVSxIWTgTsI3HNP3soSJkFaflMDwL
3OoHrph9YsPCJJ5466DyOGUHY3Epg2rWloUxnMjsNw7aw3AhMjwVhgW4HYm9FZaFQZ/bp6QeMRQe
hhHehWKXGY7CAuSpW7MfKUZlAUqWdJ3DcbAAB3guZl9yKC4WYLfmT4muFtgVJwvQx7T2t0mnXK6J
XlGGyAQvfNkaJ5JBmxnipubJ5HKDbJJsM0eY38QucSx5tJWTVHBwqDDZOzRNmn87fwDoyM4J2hRz
NgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wMi0xM1QxMzoxNTo1MCswMDowMKC8JaoAAAAldEVY
dGRhdGU6bW9kaWZ5ADIwMjMtMDItMTNUMTM6MTU6NTArMDA6MDDR4Z0WAAAAKHRFWHRkYXRlOnRp
bWVzdGFtcAAyMDIzLTAyLTEzVDEzOjE1OjUxKzAwOjAwIIO3fQAAAABJRU5ErkJggg=="
                ></image>
              </svg>
              
              <div class="box">
                <input class="input" type="text" required="true" maxlength="1" onKeyDown={handleEnter} onChange={(e)=>{if(e.target.value.length===1) HandleFill(e)}} onKeyUp={handleBackSpace} {...register("val1")}/>
                <input class="input" type="text" required="true" maxlength="1" onKeyDown={handleEnter} onChange={(e)=>{if(e.target.value.length===1) HandleFill(e)}} onKeyUp={handleBackSpace} {...register("val2")}/>
                <input class="input" type="text" required="true" maxlength="1" onKeyDown={handleEnter} onChange={(e)=>{if(e.target.value.length>0) HandleFill(e)}} onKeyUp={handleBackSpace} {...register("val3")}/>
                <input class="input" type="text" required="true" maxlength="1" onKeyUp={handleBackSpace} {...register("val4")}/>
              </div>
              
              <button class="btn1">Submit</button>
              <button class="btn2">Back</button>
              
            </form>
            <p className="h-0 -translate-y-5 text-gray-500">Enter otp sent to your email</p>
        </div>
    )
}