import { FaShareAlt } from "react-icons/fa";
import TextEditor from "./TextEditor";
const user='noureen naaz'
const image="https://api.dicebear.com/7.x/initials/svg/seed=noureen naaz"

export default function FilePage(){
    
    return(
        <div className="m-0 p-0 min-h-screen w-screen parentDiv">
            <header className="h-fit sticky top-0 right-0 opacity-100 z-10" >
                <div className="bg-[#F1F5F9] flex justify-between px-20 py-5 ">
                    <div className="shadow-2xl py-2 px-7 text-xl flex rounded-[20px] border border-slate-300 text-slate-700 font-semibold gap-1 hover:border-blue-600 "> FileName </div>
                   
                    <span className="flex gap-2">
                    <button className="mr-7"><FaShareAlt /></button>
                        <span className="rounded-full w-9 h-9">
                           <img src="https://api.dicebear.com/7.x/initials/svg/seed=noureen naaz" className="object-cover rounded-full"/>
                        </span>
                        <div className="text-lg text-slate-500">Noureen Naaz</div>
                    </span>
                </div>
                
            </header>
            <TextEditor/>
        </div>

    )
}