import "./CreateFile.css"
import image from "../../assets/gifDoc1.gif"
import { IoMdClose } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDoc } from "../../middlewares/Doc";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateFile({setFunction}){
    
    const navigate =useNavigate()
	const {createDoc} = useDoc();
    let location = useLocation();
	const id= location.pathname.split("/")[2];
    const { register, handleSubmit } = useForm({
		shouldUseNativeValidation: true,
	  });
	
	  const onSubmit = async (data) => {

		
		try {
		 data.id=id;
		  const response = await createDoc(data)
		  
		  console.log(response);
		  const doc = response.newDoc._id;
	
		  if (response.success) {
			toast("Document created", {
			  position: "bottom-right",
			  autoClose: 5000,
			  hideProgressBar: false,
			  closeOnClick: true,
			  pauseOnHover: true,
			  draggable: true,
			  progress: undefined,
			  theme: "light",
			});
			console.log("doc id is :", doc)
			const navlink = `/doc/${doc}`;
			navigate(navlink);
		  } 
		  else {
			toast.error("problem occured while creating document", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			  });
			console.log("Document creation failed")
			
		  }
		} catch (err) {
		  console.log("failure while logging", err);
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
    return(
        <div className="bg-black/10 backdrop-grayscale backdrop-blur-sm flex-col w-screen min-h-screen absolute z-50 top-0 right-0 justify-center flex items-center">
           <div className="relative shadow-lg rounded-[30px] flex overflow-hidden bg-white">
		   <img src={image} alt ='' className="scale-110 aspect-square  min-h-[300px] max-h-[400px]"/>
		   <form className="relative top-0 w-1/2 aspect-square mx-10 min-h-[300px] max-h-[400px] min-w-[300px] max-w-[400px] p-10 flex flex-col justify-center item-center" onSubmit={handleSubmit(onSubmit)}>
		   <label className="">
			<input type='text' placeholder='Title Document' className="min-w-full py-2 px-5 rounded-3xl outline-slate-300 outline-1 outline text-slate-600 font-semibold focus:outline-2 placeholder-slate-300" {...register("title", {
              required: "Please enter your email",
            })} />
		   </label>
		   <label className=" font-light text-slate-300">
				<input {...register("isPublic")} type="checkbox" value="true" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> make it public
		    </label>
			 
			 
			{/* <div class="flex items-center mb-4">
				<input id="default-checkbox" type="checkbox" value="" 
				<label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
			</div>
			  */}
		   
		   <div>
			
			<button className="mt-6 min-w-full relative py-2 px-8 text-white text-base font-semibold overflow-hidden rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-bold hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-[300px] before:h-full bg-gradient-to-r from-blue-500 to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0 "
          type="submit">CREATE</button>
		   </div>
			
		   </form>
		   <button className="absolute top-5 right-5 flex justify-center items-center transition ease-in-out duration-75 hover:bg-slate-100 h-10 w-10 rounded-full " onClick={()=>setFunction(false)}>
			<IoMdClose color="#94a3b8" size={20}/>
		   </button>

		   </div>

        </div>
    )

}
