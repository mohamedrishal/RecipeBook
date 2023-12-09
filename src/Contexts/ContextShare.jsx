import React, { createContext, useState } from "react";
export const addPostResponseContext = createContext();
export const deletePostResponseContext = createContext();
export const editPostResponseContext = createContext();
export const editProfileResponseContext = createContext()

function ContextShare({ children }) {
  const [addPostResponse, setAddPostResponse] = useState({});
  const [deleteResponse, setDeleteResponse] = useState({});
  const [editResponse, setEditResponse] = useState({});
  const [editProfileResponse, setEditProfileResponse] = useState({});

  return (
    <>
      <addPostResponseContext.Provider
        value={{ addPostResponse, setAddPostResponse }}
      >
        <deletePostResponseContext.Provider
          value={{ deleteResponse, setDeleteResponse }}
        >
          <editPostResponseContext.Provider value={{editResponse, setEditResponse}}>
           <editProfileResponseContext.Provider value={{editProfileResponse, setEditProfileResponse}}> {children}</editProfileResponseContext.Provider>
          
          </editPostResponseContext.Provider></deletePostResponseContext.Provider>
      </addPostResponseContext.Provider>
    </>
  );
}

export default ContextShare;
