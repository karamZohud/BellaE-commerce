import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { USER  } from "../../Api/Api";
import Loading from "../../Componants/Loading/Loading";
import { Axios } from "../../Api/axio";
import Err403 from "./403";




export default function RequireAuth({allowedRole}) {
    const nav=useNavigate();
   
    const [user,setUser]=useState("");
   
useEffect(()=>{
  const res=  Axios.get(`/${USER}`)
    .then((data)=>setUser(data.data))
    .catch((error)=>
     nav("/login",{replace:true})
    );

},[]);

const cookie=Cookie();
const token =cookie.get('e-commerce');

  return(
    token ?
     user==="" ?
     <Loading/>:allowedRole.includes(user.role)?<Outlet/> :
     <Err403 role={user.role}/>
     :<Navigate to="/login" replace={true}/>
    
  );
}
