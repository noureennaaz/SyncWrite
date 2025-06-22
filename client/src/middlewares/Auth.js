import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const AUTH_ROUTES = process.env.REACT_APP_AUTH_ROUTES; 
    const DOC_ROUTE = process.env.REACT_APP_DOC_ROUTES;
    const [isLoggedIn, setIsLoggedIn] = useState("");

    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/${AUTH_ROUTES}/checkAuth`, {
          method: 'GET',
          credentials: 'include', // Required to send cookies
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          console.error("Failed to fetch data, status code:", response.status);
          return ""; 
        }
    
        const result = await response.json();
        console.log(result, " : obtained");
        setIsLoggedIn(result.id)
        return result.id; 
    
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoggedIn("")
        return ""; 
      }
    };

    const checkAuth = async () => {
      try {

        console.log("check auth called ")
        const response = await fetch(`${BASE_URL}/${AUTH_ROUTES}/auth`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log("check auth response obtained")
        if (!response.ok) {
          console.log("check auth invalid response obtained")
          throw new Error('Unauthorized');
        }
       setIsLoggedIn(response._id)
       console.log("response id after check ",response.id)
       console.log("response check auth : ", response)
        const data = await response.json();
        console.log("Json data at check auth :", data);
        return data;
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
        throw new Error('Unauthorized');
      }
    };
    
    const fetchUserInfo = async (id)=>{
      try {
          const response = await fetch(`${BASE_URL}/${AUTH_ROUTES}/userdetails/`, {
              method: "POST",
              credentials: 'include',
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({"id": `${id}`}),
          });
          console.log(id)
          const data = await response.json();
          // setDashboardData(data.data);
          // setLoader(false);
          console.log("user detaillll", data)
          return data.data;
      } catch (error) {
          console.error("Failed to fetch data:", error);
          // setLoader(false);
          return null;
      }
  }
    

    const login = async (params) => {
      try {

        console.log(BASE_URL)
        const response = await fetch(`${BASE_URL}/${AUTH_ROUTES}/login`, {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        });
  
        if (!response.ok) {
          throw new Error("Network response error");
        }
  
        const result = await response.json();
        setIsLoggedIn(result.user._id);
        return result;
      } catch (err) {
        console.error("Login failed:", err);
      }
    };


    const signup = async(params) =>{
      try{
        const response= await fetch(`${BASE_URL}/${AUTH_ROUTES}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        });
  
        if (!response.ok) {
          throw new Error("Network response error");
        }
  
        const result = await response.json();
        return result;

      } catch (err) {
        console.error("Login failed:", err);
      }
    };
    
    const sendOTP = async(params) =>{
      try{
        const response= await fetch(`${BASE_URL}/${AUTH_ROUTES}/sendOTP`, {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),

        });
        if(!response.ok){
          throw new Error("Network response error");
        }
        const result=await response.json();
        return result;


      } catch (err) {
        console.log("SignUp failed", err);

      }

    }
    const logout = () => {
      setIsLoggedIn("");
    };
    
    const ListDoc= async (id)=>{
      try{
        
          const response = await fetch(`${BASE_URL}/${DOC_ROUTE}/loadFiles`, {
            method: "POST",
            credentials: 'include',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({"id": `${id}`}),
            })
  
          if(!response.ok){
              return "";
          }
          else{
            const result = await response.json();
            return result.data;
          }
  
      } catch(err){
        console.error(err);
  
      }
     }
    return (
      <AuthContext.Provider value={{ login, logout, fetchData, setIsLoggedIn, isLoggedIn, sendOTP, signup, ListDoc, checkAuth, fetchUserInfo }}>
        {children}
      </AuthContext.Provider>
    );
  };
  

export const useAuth = () => useContext(AuthContext);
