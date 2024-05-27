import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import CreateFile from "./CreateDialog/CreateFile"
const Dashboard= ()=>{

    let location = useLocation();
    const id= location.pathname.split("/")[2];
    const [loader , setLoader] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);
    const [tab, setTab] = useState("All");
    const [create, setCreate] = useState(false);

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

    useEffect(()=>{
        const fetchData = async () => {
            const data = await fetchInfo(id);
            console.log("dashboard data:", data);
        };
        fetchData();
    }, [id]);
    
    
    return(
        <div className="w-screen min-h-screen relative top-0 right-0 flex flex-col">
        {
            loader? <div className="self-center justify-self-center">Loading........</div> : <div className="m-0 p-0 min-h-screen w-screen">
            <header >
                <div className="bg-slate-100 flex justify-between px-20 py-5" >
                    <button className="group shadow-2xl py-2 px-7 text-xl flex rounded-[20px] border border-slate-300 text-slate-700 font-semibold gap-1 hover:border-blue-600 " onClick={()=>setCreate(true)}> <div className="font-bold leading-6 text-blue-600 group-hover:rotate-90 group-hover:translate-y-[3px] group-hover:translate-x-[3px] text-2xl transition-all duration-100">+ </div> Create </button>
                    <span className="flex gap-2">
                        <span className="rounded-full w-9 h-9">
                           <img src={dashboardData.image} className="object-cover rounded-full"/>
                        </span>
                        <div className="text-lg text-slate-500 uppercase">{dashboardData.fname} {dashboardData.lname}</div>
                    </span>
                </div>
                
            </header>
            <section>
                 <div className="flex py-2 px-16 gap-10 ">
                     <div className="w-20 cursor-pointer"  onClick={()=>{setTab("All")}}>
                         <p>My Files</p>
                         {
                            tab==='All' &&
                                <div className="h-1 w-full bg-blue-600 my-2" ></div>      
                         }
                      </div>
                     <div className="w-24 cursor-pointer" onClick={()=>{setTab("Shared")}}>
                        <p>Shared Files</p>
                        {
                            tab==='Shared' &&
                                <div className="h-1 w-full bg-blue-600 my-2" ></div>                                
                         }
                        {/* <div className="h-1 w-full bg-blue-600 my-2"></div> */}
                     </div>
                 </div>
            </section>
        </div>

        }
        {
            create ? <CreateFile setFunction={setCreate}/>:<div></div>
        }
        
        </div>
    )

}
export default Dashboard