import './App.css';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import Login  from './components/login';
import Home from "./Pages/Home";
import FilePage from './components/FilePage';
import AboutPage from "./Pages/AboutPage"
import  NotFound from "./Pages/NotFound"
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import { useEffect , useMemo, useState } from 'react';
import { useAuth } from './middlewares/Auth';
import { useNavigate } from 'react-router-dom';
import AuthProtectedRoute from './ProtectedRoutes/AuthProtected';
// import AuthRedirectRoute from './ProtectedRoutes/AuthRedirectRoute';
// import Quillbuild1 from './components/quilldemo/Quillbuild1';

function App() {
   const navigate = useNavigate();
  // const socket= useMemo(()=>io("http://localhost:3000"))
  const { isLoggedIn, login, logout } = useAuth();
  const privateRoute = ({ isloggedin, children }) => {
    if (!isloggedin) {
      console.log("not logged in")
      return children; // Render the children if the user is not logged in
    } else {
      console.log("logged in")
      navigate("/"); // Navigate to "/" if the user is logged in
      return null; // Return null as nothing else needs to be rendered
    }
  };
 
  return (
    
    <Routes>
        <Route path='/' >
          
          <Route index default element={<Home/>}></Route>
          <Route path="/signup" element={<privateRoute isloggedin={isLoggedIn}><SignUp/></privateRoute>}></Route>
          <Route path="/login" element={<privateRoute isloggedin={isLoggedIn}><Login/></privateRoute>}></Route>
          <Route path="/dashboard/:id" element={
            <AuthProtectedRoute>
              <Dashboard/>
            </AuthProtectedRoute>
              
              }>

          </Route>
          {/* adding protected route to doc is left*/}
          <Route path="/doc/:docid" element={<FilePage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path='*' element={<NotFound/>}></Route>
        </Route>
        {/* <Route path='/test' element={<Quillbuild1/>}></Route> */}
      </Routes>
    
  
  );
}

export default App;
