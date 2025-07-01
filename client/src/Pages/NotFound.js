import image from "../assets/notfound.webp"
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
const NotFound = () => {
    const navigate= useNavigate()
    return(
        <div className="w-screen h-screen flex flex-col bg-slate-900 justify-center items-center">
            <Navbar/>
            <div className="flex flex-col mt-40 h-[30vh]">
                <div className="h-60 w-60">
                    <img src={image} alt =""/>
                </div>
                <div className="text-gray-400 text-5xl font-bold text-center"> 4<span className="text-slate-500">04</span></div>
                
            </div>
            <div className="mt-32 text-gray-400 font-light text-xl">The resourse you are looking for does not exists</div>
            <div className="underline text-blue-400 hover:text-blue-600 cursor-pointer" onClick={()=>navigate('/')}>Navigate to Home page</div>
        </div>
    )

}
export default NotFound;