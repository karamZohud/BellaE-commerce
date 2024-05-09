import React, { createContext, useEffect, useState } from 'react'
export const WindowSize =createContext(null);


export default function WindowContext({children}) {
    const [size,setWindowSize]=useState(window.innerWidth);
useEffect(()=>{
function setwindowWidth(){
    setWindowSize(window.innerWidth);
}
window.addEventListener('resize',setwindowWidth);
//clean up function
return()=>{
    window.removeEventListener('resize',setwindowWidth);
}
},[])
  return <WindowSize.Provider value={{size}}>{children}</WindowSize.Provider>
  
}
