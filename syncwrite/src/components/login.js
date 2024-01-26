import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from "axios"

const Login= ()=>{
    async function fetchdata(data){
        return await fetch('http://localhost:4000/api/v1/login').then(()=>{
            console.log("worked")
        })
    }
    const onSubmit = (data) => {  
        
        try{
            const output= fetchdata(data);
            console.log(output)
        }
        catch {
            console.log("error in parsing data");
        }
       };
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
    return(
        <div className="w-screen h-screen m-0 flex justify-center items-center bg-slate-200 p-8">
        <form className="h-[22rem] w-[30%]  min-w-[350px] border-2 border-slate-200 shadow-lg bg-slate-100 rounded-lg flex flex-col justify-evenly items-center" onSubmit={handleSubmit(onSubmit)}>
         
         <div className="flex flex-col text-lg ">
            <label labelfor='email' className="p-2 self-start">Email:</label>
            <input type='text'name="email" className="mx-auto w-[300px] border-slate-300 border-2 rounded-md p-2"  {...register("email")} required />
         </div>

        <div className="flex flex-col text-lg ">
            <label labelfor='password' className="p-2 self-start">Password</label>
            <input type="password" name="password" className="mx-auto w-[300px] border-slate-300 border-2 rounded-md p-2"  {...register("password")} required />
         </div>
        

        <button className=" w-[300px] mt-8 opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-md bg-gradient-to-t from-[#8122b0] to-[#dc98fd] active:scale-95 ">
            <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-[#af73ce] text-[#f1d5fe] rounded-sm bg-gradient-to-t from-[#a62ce2] to-[#c045fc] justify-center mx-auto">Login</span>
        </button>
        <p className="text-slate-700 pt-5 pb-3">New User..?   <NavLink to={`/signup`} className=' pl-4 text-blue-600'> SignUp </NavLink></p>
        </form>
        </div>
    )
    
}
export default Login