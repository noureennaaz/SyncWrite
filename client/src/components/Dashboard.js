import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DisplayFiles from "./DisplayFiles";
import { useAuth } from "../middlewares/Auth";
import Navbar from "./Navbar";
import { IoMdAdd } from "react-icons/io";
import CreateFile from "./CreateDialog/CreateFile";
const Dashboard = () => {
  const { ListDoc, fetchUserInfo } = useAuth();
  let location = useLocation();
  const id = location.pathname.split("/")[2];
  const [loader, setLoader] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [tab, setTab] = useState("All");
  const [filedata, setFileData] = useState("");
  const [create, setCreate] = useState(false);

  const fetchInfo = async (id) => {
    try {
      const data = await fetchUserInfo(id);

      if (!data || !data.data) {
        throw new Error("No data received"); // Handling undefined
      }

      setDashboardData(data.data);
      setLoader(false);
      return data.data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setDashboardData(null); // Reset data in case of failure
      setLoader(false);
      return null;
    }
  };

  const displayFiles = async () => {
    console.log("id is :", id);
    if (tab === "All") {
      var data = await ListDoc(id);
      setFileData(data);
      console.log("obtained data :", filedata);
    } else {
      // Shared file data
      //left to implement
      data = await ListDoc(id);
      console.log("shared Files :", filedata);
    }
  };
  useEffect(() => {
    displayFiles();
  }, [tab, dashboardData]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchInfo(id);
      console.log("dashboard data:", data);
    };
    fetchData();
  }, [id]);

  return (
    <div className="min-h-[100vh] w-[100vw] box-border text-bold relative top-0 bottom-0 right-0 flex flex-col py-20">
      {loader ? (
        <div className="self-center justify-self-center">Loading........</div>
      ) : (
        <div className="m-0 p-0 min-h-full w-screen">
          <Navbar />
          {/* <header className="overflow-x-hidden w-screen box-border -translate-y-4 md:-translate-y-2 lg:translate-y-0" >
                <div className="box-border bg-slate-900 justify-between flex lg:px-20 py-5" >
                    <button className="mx-4 h-fit items-center group shadow-2xl py-2 px-7 text-xl flex rounded-[20px] border border-slate-300 text-white font-semibold gap-1 hover:border-blue-600 " onClick={()=>setCreate(true)}> <div className="font-bold leading-6 text-slate-400 group-hover:rotate-90 transition-transform duration-300 group-hover:translate-y-[3px] group-hover:translate-x-[3px] text-2xl">+ </div> Create </button>
                    <span className="flex items-center mx-5 gap-2">
                        <span className="rounded-full w-9 h-9">
                        {
                           dashboardData.image && <img src={dashboardData.image} className="object-cover rounded-full"/> 
                        }
                        </span>
                        <div className="hidden lg:block text-sm text-slate-300 uppercase">{dashboardData.fname} {dashboardData.lname}</div>
                    </span>
                </div>
                
            </header> */}
          <section className="flex-1">
            {/*  bg-gradient-to-r from-slate-900 to-slate-700 */}
            <div className="flex py-2 px-4 md:px-8 lg:px-16 mt-3 lg:text-xl font-bold gap-5 md:gap-10 w-[90%] mx-auto border border-slate-600 rounded-md from-neutral-600 ">
              <div
                className="w-28 cursor-pointer"
                onClick={() => {
                  setTab("All");
                }}
              >
                <p className="hover:text-neutral-600 transition-colors">
                  My Files
                </p>
                {tab === "All" && (
                  <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-orange-500 my-2"></div>
                )}
              </div>
              <div
                className="w-28 cursor-pointer"
                onClick={() => {
                  setTab("Shared");
                }}
              >
                <p className="hover:text-neutral-600 transition-colors">
                  Shared Files
                </p>
                {tab === "Shared" && (
                  <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-orange-500 my-2"></div>
                )}
                {/* <div className="h-1 w-full bg-blue-600 my-2"></div> */}
              </div>
            </div>
            <div>
              <DisplayFiles data={filedata} />
            </div>
          </section>
          <div className="fixed bottom-10 right-10 md:bottom-16 md:right-20">
            <button
              onClick={() => setCreate((value) => !value)}
              className="group flex items-center justify-start w-11 h-11 bg-orange-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-28 active:translate-x-1 active:translate-y-1"
            >
              <div className="hover:shadow-lg flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                <IoMdAdd
                  size={25}
                  color="#ffffff"
                  className="transition-transform duration-700 group-hover:scale-110 group-hover:rotate-90"
                />
              </div>

              <div className="cursor-pointer absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                Create
              </div>
            </button>
          </div>
        </div>
      )}

      {create && <CreateFile setCreate={setCreate} />}
    </div>
  );
};
export default Dashboard;
