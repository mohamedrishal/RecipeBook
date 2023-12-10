import React, { createContext, useState } from 'react'
export const postSearchKeyContext = createContext()

function SearchKey({children}) {

    const [searchKey,setSearchKey] = useState("")

  return (
    <>
    <postSearchKeyContext.Provider value={{searchKey,setSearchKey}}>{children}</postSearchKeyContext.Provider>
    </>
  )
}

export default SearchKey