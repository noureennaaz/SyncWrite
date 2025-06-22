import { FaShareAlt } from "react-icons/fa";
import TextEditor from "./TextEditor";
import { useLocation, useNavigate } from "react-router-dom";
import { useDoc } from "../middlewares/Doc";
import { useEffect, useState } from "react";
import { useAuth } from "../middlewares/Auth"
import { RxHamburgerMenu } from "react-icons/rx";
import FileMenu from "./FileMenu";
import "./TextEditor.css"
import CreateFile from "./CreateDialog/CreateFile";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import SaveFileAs from "./FilePageComponents/SaveFileAs";
import { TiTick } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
// import { useDoc } from "../middlewares/Doc";

export default function FilePage() {
    const location = useLocation();
    const [create, setCreate] = useState(false);
    const docid = location.pathname.split('/')[2];
    const { showDoc } = useDoc();
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [Title, setTitle] = useState("");
    const [saveAs, toggleSaveAs] = useState(false);
    const [saveToast, toggleSaveToast] = useState(false);
    const [loading, setLoading] = useState(true);

    const gatherFile = async (docid) => {
        try {
            const fileData = await showDoc(docid);
            setFile(fileData.data);
            setTitle(fileData.data.Title);
        } catch (error) {
            console.error("Error fetching file:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        gatherFile(docid);
    }, [saveAs]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-900">
                <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="ml-4 text-amber-400">Loading document...</p>
            </div>
        );
    }

    return (
        <div className="m-0 p-0 min-h-screen parentDiv overflow-x-hidden">
            {saveToast && (
                <div className="fixed bottom-20 w-screen">
                    <div className="animate-pulse transition-all duration-1000 bg-slate-900 w-fit px-7 flex items-center justify-evenly gap-3 h-10 mx-auto rounded-3xl text-white">
                        Saved
                        <div className="h-5 w-5 flex justify-center items-center rounded-full ring-green-500 ring-offset-8 bg-green-600">
                            <TiTick />
                        </div>
                    </div>
                </div>
            )}

            {create && <CreateFile setCreate={setCreate} />}
            {saveAs && <SaveFileAs toggleSaveAs={toggleSaveAs} id={file._id} userId={file.CreatedBy} />}

            <header className="h-fit fixed left-0 top-0 right-0 opacity-100 z-10">
                <FileMenu setCreate={setCreate} fileName={Title} toggleSaveAs={toggleSaveAs} toggleSaveToast={toggleSaveToast} />
                <div className="bg-gradient-to-tr from-slate-950 to-stone-800 flex justify-between px-20 py-5">
                    <div className="shadow-2xl py-2 px-4 text-xl flex rounded-[20px] border border-slate-300 w-fit text-slate-500 font-semibold gap-1 hover:border-blue-600">
                        <div className='outline-none w-fit text-center'>{Title}</div>
                    </div>
                    <span className="flex gap-2 items-center text-white">
                        {/* <button><FaShareAlt /></button> */}
                        <div className="rounded-full">
                            <div onClick={() => navigate(`/profile`)} className="cursor-pointer bg-orange-500 rounded-full hover:scale-[1.03] hover:bg-orange-600 transition-transform">
                                <FaUserCircle size={25} />
                            </div>
                        </div>
                    </span>
                </div>
            </header>
            <TextEditor id={file._id} text={file.Body} />
        </div>
    );
}
