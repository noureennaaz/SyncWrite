import { AiFillFileText } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";

export default function DisplayFiles(files){
  // <AiFillFileText />
  // files.data
      return(
        <div >
          {/* {
            files.data.map((file)=>{

            })
          } */}

          <div >
            <div className="w-screen h-20 border-b-slate-600 border-b flex items-center p-1">
              {/* file (icon/select) and Name */}
              <div className="pl-10 pr-8 flex gap-2 items-center">
                <div>
                <CgFileDocument color={"#FF00FF"} />
                </div>
                <div>
                {files.data[0].Title}
                </div>
                
              </div>
              {/* date modified */}
              <div>{files.data[0].lastUpdatedAt}</div>
            </div>
          </div>
          
          
          
        </div>

      )
};