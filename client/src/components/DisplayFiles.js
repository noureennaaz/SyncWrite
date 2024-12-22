import { useState, useEffect } from "react";
import { AiFillFileText } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export default function DisplayFiles(files) {
  
  const navigate= useNavigate()
  const openFile = (id)=>{
   const navlink=`/doc/${id}`
   navigate(navlink)
  };
  const [info, setInfo] = useState([]);
  useEffect(() => {
    setInfo(files.data);
  }, [files]);
  return (
    <div>
      { info.length>0 && info.map((file) => (
        <div className=" w-screen h-20 border-b-slate-200 border-b flex items-center p-1">
          <div className="md:pr-8 flex gap-2 items-center w-2/3  font-[450]">
            <div className="flex cursor-pointer justify-center items-center " onClick={()=>openFile(file._id)}>
              <div className="lg:p-16 p-5">
                <CgFileDocument color={"#f97316"} size={20} className="hover:drop-shadow-sm hover:scale-[1.1]" />
              </div>
              <div className="text-white w-[80px] sm:w-fit hover:text-blue-600">{file.Title}</div>
            </div>
          </div>
          <div className="flex lg:gap-32 text-gray-500 font-light">
            
          <div className="text-sm">{file.size} MB</div>
          <div >{file.lastUpdatedAt}</div>
            </div>
        </div>
      ))}
      {
        info.length==0 && 
        <div className="flex w-screen h-[50vh] justify-center text-gray-400 text-sm items-center">No  files found</div>
      }
    </div>
  );
}
