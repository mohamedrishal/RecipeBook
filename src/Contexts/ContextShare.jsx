import React, { createContext, useState } from "react";
export const addPostResponseContext = createContext();
export const deletePostResponseContext = createContext();
export const editPostResponseContext = createContext();

function ContextShare({ children }) {
  const [addPostResponse, setAddPostResponse] = useState({});
  const [deleteResponse, setDeleteResponse] = useState({});
  const [editResponse, setEditResponse] = useState({});

  return (
    <>
      <addPostResponseContext.Provider
        value={{ addPostResponse, setAddPostResponse }}
      >
        <deletePostResponseContext.Provider
          value={{ deleteResponse, setDeleteResponse }}
        >
          <editPostResponseContext.Provider value={{editResponse, setEditResponse}}>
            {children}
          
          </editPostResponseContext.Provider></deletePostResponseContext.Provider>
      </addPostResponseContext.Provider>
    </>
  );
}

export default ContextShare;
