import { useState, useEffect } from "react";
import { AiFillFileText } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDoc } from "../middlewares/Doc";

export default function DisplayFiles(files) {
  const navigate = useNavigate();
  const { deleteDoc } = useDoc();
  const openFile = (id) => {
    const navlink = `/doc/${id}`;
    navigate(navlink);
  };
  const [info, setInfo] = useState([]);
  useEffect(() => {
    setInfo(files.data);
  }, [files]);
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id, e) => {
    e.stopPropagation(); // Prevents triggering openFile
    setOpenMenuId(openMenuId === id ? null : id);
  };
  const deleteDocument = async (id)=>{
    console.log("Deleting the :", id)
    deleteDoc(id );

  }

  return (
    <div className="h-fit">
      {info.length > 0 ? (
        info.map((file) => (
          <div
            key={file._id}
            // bg-gradient-to-r from-slate-900 to-slate-700
            className="relative box-border  transition-all  group h-12 border-b-slate-200 border-b flex items-center cursor-pointer p-1"
            onClick={() => openFile(file._id)}
          >
            <div className="md:pr-8 flex gap-2 items-center w-2/3 font-[450]">
              <div className="flex justify-center items-center">
                <div className="lg:p-16 p-5">
                  <CgFileDocument
                    color={"#f97316"}
                    size={20}
                    className="hover:drop-shadow-sm hover:scale-[1.1] group-hover:scale-[1.02]"
                  />
                </div>
                <div className="font-semibold w-[80px] sm:w-fit hover:text-gray-900 group-hover:scale-[1.02]">
                  {file.Title}
                </div>
              </div>
            </div>

            <div className="flex lg:gap-32 font-light">
              <div className="text-sm group-hover:scale-[1.02]">{file.size} MB</div>
              <div className="flex justify-center gap-10">
                <div className="group-hover:scale-[1.02] hidden lg:block self-start">
                  {file.lastUpdatedAt}
                </div>
                <div
                  className="group-hover:scale-[1.02] absolute lg:right-16 right-8 bottom-auto cursor-pointer"
                  onClick={(e) => toggleMenu(file._id, e)}
                >
                  <CiMenuKebab />
                </div>

                {openMenuId === file._id && (
                  <div className="absolute right-5 z-50 top-12 w-40 bg-stone-50 h-fit p-4 rounded-lg shadow-lg">
                    <div className="hover:bg-gray-300 p-2 cursor-pointer">Open</div>
                    <div className="hover:bg-gray-300 p-2 cursor-pointer" onClick={()=>deleteDocument(file._id)}>Delete</div>
                    <div className="hover:bg-gray-300 p-2 cursor-pointer">Share</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex w-screen h-[50vh] justify-center text-gray-400 text-sm items-center">
          No files found
        </div>
      )}
    </div>
  );
};

