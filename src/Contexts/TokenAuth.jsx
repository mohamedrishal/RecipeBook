import React, { createContext, useEffect, useState } from "react";
export const tokenAuthorisationContext = createContext();

function TokenAuth({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
        setIsAuthorized(true)
    }else{
        setIsAuthorized(false)
    }
  },[isAuthorized])

  return (
    <>
      <tokenAuthorisationContext.Provider
        value={{isAuthorized, setIsAuthorized}}
      >
        {children}
      </tokenAuthorisationContext.Provider>
    </>
  );
}

export default TokenAuth;
