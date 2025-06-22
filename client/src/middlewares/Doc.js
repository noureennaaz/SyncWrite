import React, { createContext, useState, useEffect, useContext } from "react";

const DocContext = createContext();

export const DocProvider = ({ children }) => {

   const DOC_ROUTE = process.env.REACT_APP_DOC_ROUTES
   const BASE_URL = process.env.REACT_APP_BASE_URL;
   const createDoc= async (params)=>{
    try{
      const response = await fetch(`${BASE_URL}/${DOC_ROUTE}/create`, {
        method: "POST",
        credentials: 'include',
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
      const response = await fetch(`${BASE_URL}/${DOC_ROUTE}/open`, {
        method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
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
   const renameDoc = async ({docId, newTitle, currentUserId}) => {
    try {

      console.log(docId, newTitle, currentUserId)
      const response = await fetch(`${BASE_URL}/${DOC_ROUTE}/renameFile`,
        {
          method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
              id: docId,
              title: newTitle,
              userId: currentUserId,
            }),
          })
  
      if (!response.ok) {
        console.error("Failed to rename the document", response.statusText);
      } else {
        const data = await response.json();
        console.log("Document renamed successfully:", data);
        return data;
      }

    } catch (err) {
      
      console.error(err);
    }
  };
  const deleteDoc = async (docId, userId) => {
    try {
      console.log("INITIATED DELETION")
      const response = await fetch(`${BASE_URL}/${DOC_ROUTE}/delete`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: docId, userId })
      });
  
      if (!response.ok) {
        return "";
      } else {
        const result = await response.json();
        return result;
      }
    } catch (err) {
      console.error(err);
    }
  };
  
   
    return (
      <DocContext.Provider value={{createDoc,  showDoc, renameDoc, deleteDoc}}>
        {children}
      </DocContext.Provider>
    );
  };

export const useDoc = () => useContext(DocContext);
