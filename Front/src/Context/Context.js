import React, { createContext, useState } from 'react'
export const Menu =createContext("");


export default function Context({children}) {
    const [isOpen,setIsOpen]=useState(true);

  return <Menu.Provider value={{isOpen, setIsOpen}}>{children}</Menu.Provider>
  
}
