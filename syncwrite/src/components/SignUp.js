import { NavLink } from "react-router-dom";
import { useForm } from 'react-hook-form';

const SignUp= ()=>{
  
   
    const onSubmit = (data) => {  
        console.log(data);
       };
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    return(
        <div className="w-screen h-screen m-0 flex justify-center items-center bg-slate-200 p-8">
            <form className="py-8 gap-4 w-[40%] border-2 border-slate-200 shadow-lg min-h-[90vh] bg-slate-100 rounded-lg flex flex-col justify-evenly items-center min-w-[450px]" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="flex flex-col text-lg ">
                <label labelfor='fname' className="p-2 self-start">First name:</label>
                <input type='text'name="fname" className="mx-auto w-[400px] border-slate-300 border-2 rounded-md p-2" {...register("fname")} required/>
            </div>
            <div className="flex flex-col text-lg ">
                <label labelfor='lname' className="p-2 self-start">Last name:</label>
                <input type='text'name="lname" className="mx-auto w-[400px] border-slate-300 border-2 rounded-md p-2" {...register("lname")} required/>
            </div>
            <div className="flex flex-col text-lg ">
                <label labelfor='email' className="p-2 self-start">Email:</label>
                <input type='email'name="email" className="mx-auto w-[400px] border-slate-300 border-2 rounded-md p-2" {...register("email")} required />
            </div>

            <div className=" w-[400px] flex gap-2">
                <div className="flex flex-col text-lg w-[190px]">
                    <label labelfor='password' className="p-2 self-start">Password</label>
                    <input type="password" name="password" className="border-slate-300 border-2 rounded-md p-2" {...register("password")} required />
                </div>
                
                <div className="flex flex-col text-lg  w-[190px]">
                    <label labelfor='confirmPassword' className="p-2 self-start">Confirm Password</label>
                    <input type="password" name="ConfirmPassword" className=" border-slate-300 border-2 rounded-md p-2" {...register("confirmPassword")} required />
                </div>
            </div>

            <button type="submit" className=" w-[400px] mt-3 opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-md bg-gradient-to-t from-[#8122b0] to-[#dc98fd] active:scale-95 ">
                <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-[#af73ce] text-[#f1d5fe] rounded-sm bg-gradient-to-t from-[#a62ce2] to-[#c045fc] justify-center mx-auto">SignUp</span>
            </button>
            <div className="flex justify-center gap-12 w-[400px] mx-auto">
                <p className="text-slate-700">Existing User..?</p>
                <NavLink to={`/login`} className=' text-blue-600'> Login </NavLink>
            </div>  
            </form>
        </div>
    )
    
}
export default SignUp