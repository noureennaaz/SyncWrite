import { FaShareAlt } from "react-icons/fa";
import TextEditor from "./TextEditor";
import { useLocation } from "react-router-dom";
import { useDoc } from "../middlewares/Doc";
import { useEffect, useState } from "react";
import { useAuth } from "../middlewares/Auth"
const user='noureen naaz'
const image="https://api.dicebear.com/7.x/initials/svg/seed=noureen naaz"

export default function FilePage(){
    const location = useLocation();
    const docid = location.pathname.split('/')[2]
    // console.log("doc id at the doc frontend", docid)
    const {showDoc} = useDoc() 
    const [file, setFile]= useState("");
    const gatherFile =async (docid)=>{

        var fileData =await showDoc(docid);
        // console.log("file data", fileData)
        // console.log("doc id at the doc frontend", docid)
        setFile(fileData.data)
       console.log("data =>",file.Title)
    }
    useEffect(()=>{
        gatherFile(docid)

    }, [])
    
    return(
        <div className="m-0 p-0 min-h-screen w-screen parentDiv">
            <header className="h-fit sticky top-0 right-0 opacity-100 z-10" >
                <div className="bg-[#F1F5F9] flex justify-between px-20 py-5 ">
                    <div className="shadow-2xl py-2 px-4 text-xl flex rounded-[20px] border border-slate-300 w-fit text-slate-700 font-semibold gap-1 hover:border-blue-600 "> <input className='bg-transparent outline-none w-fit text-center' size={12} type='text'  value={file.Title}/> </div>
                   
                    <span className="flex gap-2">
                    <button className="mr-7"><FaShareAlt /></button>
                        <span className="rounded-full w-9 h-9">
                           <img src="https://api.dicebear.com/7.x/initials/svg/seed=noureen naaz" className="object-cover rounded-full"/>
                        </span>
                        <div className="text-lg text-slate-500">Noureen Naaz</div>
                    </span>
                </div>
                
            </header>
            <TextEditor id={file._id} text={file.Body}/>
        </div>

    )
}