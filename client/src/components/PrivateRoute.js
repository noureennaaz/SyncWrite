import { Navigate } from "react-router-dom"
const PrivateRoute=({loggedIn, children, route})=>
{
   
    console.log('userlogin=' + loggedIn);
    if(loggedIn)
       return children;
    else
        return <Navigate to='/login'/>

}
export default PrivateRoute