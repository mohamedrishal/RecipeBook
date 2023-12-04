import React, { createContext, useState } from "react";
export const addPostResponseContext = createContext();

function ContextShare({ children }) {
  const [addPostResponse,setAddPostResponse] = useState({});

  return (
    <>
      <addPostResponseContext.Provider
        value={{ addPostResponse,setAddPostResponse }}
      >
        {children}
      </addPostResponseContext.Provider>
    </>
  );
}

export default ContextShare;
