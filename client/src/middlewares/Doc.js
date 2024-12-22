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
          return result;
        }

    } catch(err){
      console.error(err);

    }
   }
   const showDoc= async (docid)=>{
    try{
      const response = await fetch("http://localhost:4000/api/v1/doc/open", {
        method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({"docid": `${docid}`}),
        });

        if(!response.ok){
            return "";
        }
        else{
          const result = await response.json();
          console.log(result);
          return result;
        }

    } catch (err) {
      console.log(err);
      
    }
   }
   
    return (
      <DocContext.Provider value={{createDoc,  showDoc}}>
        {children}
      </DocContext.Provider>
    );
  };
  

export const useDoc = () => useContext(DocContext);
