import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState("");

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/user/", {
          method: 'POST',
        });
    
        if (!response.ok) {
          console.error("Failed to fetch data, status code:", response.status);
          return ""; // Return an empty string if the response is not successful
        }
    
        const result = await response.json();
        console.log(result, " : obtained");
        return result.id; // Return the ID from the response if successful
    
      } catch (error) {
        console.error("Error fetching data:", error);
        return ""; // Return an empty string if there is an error during fetch
      }
    };
    
    

    const login = async (params) => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/user/login", {
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
        setIsLoggedIn(result.user._id);
        return result;
      } catch (err) {
        console.error("Login failed:", err);
      }
    };


    const signup = async(params) =>{
      try{
        const response= await fetch("http://localhost:4000/api/v1/user/signup", {
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
        const response= await fetch("http://localhost:4000/api/v1/user/sendOTP", {
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
        
          const response = await fetch("http://localhost:4000/api/v1/doc/loadFiles", {
            method: "POST",
            credentials:"same-origin",
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
      <AuthContext.Provider value={{ login, logout, fetchData, setIsLoggedIn, isLoggedIn, sendOTP, signup, ListDoc }}>
        {children}
      </AuthContext.Provider>
    );
  };
  

export const useAuth = () => useContext(AuthContext);
