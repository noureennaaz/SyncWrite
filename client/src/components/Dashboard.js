import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import CreateFile from "./CreateDialog/CreateFile"
import DisplayFiles from "./DisplayFiles"
import { useAuth } from "../middlewares/Auth";
import Navbar from "./Navbar"
const Dashboard= ()=>{
    
    const {ListDoc} = useAuth()
    let location = useLocation();
    const id= location.pathname.split("/")[2];
    const [loader , setLoader] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);
    const [tab, setTab] = useState("All");
    const [create, setCreate] = useState(false);
    const [filedata, setFileData] = useState("");

    const fetchInfo = async (id)=>{
        try {
            const response = await fetch("http://localhost:4000/api/v1/user/dashboard/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"id": `${id}`}),
            });
            const data = await response.json();
            setDashboardData(data.data);
            setLoader(false);
            return data.data;
        } catch (error) {
            console.error("Failed to fetch data:", error);
            setLoader(false);
            return null;
        }
    }
    const displayFiles = async () =>{
        console.log("id is :", id)
        if(tab==='All'){
            var data= await ListDoc(id)
            setFileData(data);
            console.log("obtained data :", filedata)
        } 
        else {

            // Shared file data 
            //left to implement 
            data= await ListDoc(id)
            console.log("shared Files :", filedata)

        }

    }
    useEffect(()=>{
        displayFiles()
    }, [tab, dashboardData])
    useEffect(()=>{
        const fetchData = async () => {
            const data = await fetchInfo(id);
            console.log("dashboard data:", data);
        };
        fetchData();
    
    }, [id]);
    
    
    return(
        <div className="min-w-screen min-h-screen relative top-0 right-0 flex flex-col mt-20">
        {
            loader? <div className="self-center justify-self-center">Loading........</div> : <div className="m-0 p-0 min-h-screen w-screen">
            <Navbar/>
            <header >
                <div className="bg-slate-900 justify-between md:flex hidden lg:px-20 py-5" >
                    <button className="group shadow-2xl py-2 px-7 text-xl flex rounded-[20px] border border-slate-300 text-white font-semibold gap-1 hover:border-blue-600 " onClick={()=>setCreate(true)}> <div className="font-bold leading-6 text-slate-400 group-hover:rotate-90 transition-transform duration-300 group-hover:translate-y-[3px] group-hover:translate-x-[3px] text-2xl">+ </div> Create </button>
                    <span className="flex gap-2">
                        <span className="rounded-full w-9 h-9">
                        {
                           dashboardData.image && <img src={dashboardData.image} className="object-cover rounded-full"/> 
                        }
                        </span>
                        <div className="text-lg text-slate-300 uppercase">{dashboardData.fname} {dashboardData.lname}</div>
                    </span>
                </div>
                
            </header>
            <section className="bg-gradient-to-r from-slate-900 to-slate-700 flex-1">
                 <div className="flex py-2 px-16 gap-10 text-white ">
                     <div className="w-20 cursor-pointer"  onClick={()=>{setTab("All")}}>
                         <p>My Files</p>
                         {
                            tab==='All' &&
                                <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-orange-500 my-2" ></div>      
                         }
                      </div>
                     <div className="w-24 cursor-pointer" onClick={()=>{setTab("Shared")}}>
                        <p>Shared Files</p>
                        {
                            tab==='Shared' &&
                            <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-orange-500 my-2" ></div> 
                                                             
                         }
                        {/* <div className="h-1 w-full bg-blue-600 my-2"></div> */}
                       
                     </div>
                 </div>
                 <div>
                 <DisplayFiles data={filedata}/>
                 </div>
            </section>
        </div>

        }
        {
            create ? <CreateFile files={filedata} setCreate={setCreate}/>:<div></div>
        }
        
        </div>
    )

}
export default Dashboard