import React, { createContext, useState, useEffect, useContext } from "react";

const DocContext = createContext();

export const DocProvider = ({ children }) => {
   const createDoc= async (params)=>{
    try{
      const response = await fetch("http://localhost:4000/api/v1/doc/create", {
        method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        });

        if(!response.ok){
            return "";
        }
        else{
          const result = await response.json();
          console.log(result);
          return result;
        }

    } catch(err){
      console.error(err);

    }
   }
   
    return (
      <DocContext.Provider value={{createDoc}}>
        {children}
      </DocContext.Provider>
    );
  };
  

export const useDoc = () => useContext(DocContext);
