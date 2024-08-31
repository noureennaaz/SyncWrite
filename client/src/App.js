import './App.css';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import Login  from './components/login';
import Home from "./Pages/Home";
import FilePage from './components/FilePage';
import PrivateRoute from './components/PrivateRoute';
import {io} from 'socket.io-client';
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import { useEffect , useMemo, useState } from 'react';
import { useAuth } from './middlewares/Auth';
import { useNavigate } from 'react-router-dom';


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
            <PrivateRoute >
              <Dashboard/>
            </PrivateRoute>
              }>

          </Route>
          <Route path="/doc/:docid" element={<FilePage/>}/>
          <Route path='*' element={<div>Page Not Found</div>}></Route>
        </Route>
        
      </Routes>
    
  
  );
}

export default App;
