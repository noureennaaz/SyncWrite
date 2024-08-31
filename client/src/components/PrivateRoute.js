import { Navigate } from "react-router-dom"
import { useAuth } from "../middlewares/Auth"
import { useEffect , useState} from "react";

    

const PrivateRoute=({ children, route})=>
{
    const {fetchData} = useAuth();
    const [login , setLogin]= useState("");
    useEffect(()=>{
        setLogin(fetchData());
        console.log(login)
    }, [])

    if(setLogin)
       return children;
    else
        return <Navigate to='/login'/>

}
export default PrivateRoute