import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Menu } from '../../Context/Context';
import { Axios } from '../../Api/axio';
import { LOGOUT, USER } from '../../Api/Api';
import { useNavigate } from 'react-router-dom';
import { DropdownButton, DropdownItem } from 'react-bootstrap';
import Cookie from "cookie-universal";
export default function Topbar() {
  const menu=useContext(Menu);
  const setIsOpen=menu.setIsOpen;
  const [user,setUser]=useState("");
  const cookie = Cookie();


  async function handleLogOut(){
    try{
const resp=await Axios.get(`/${LOGOUT}`);
cookie.remove("e-commerce")
window.location.pathname="/login";
    }catch(error){
console.log(error);
    }
}
const nav=useNavigate();
useEffect(()=>{
 
    Axios.get(`/${USER}`)
    .then((data)=>setUser(data.data))
    .catch((error)=>
     nav("/login",{replace:true})
    );
 
},[]);

  return (
    <div className='d-block'>
 <div className='topbar d-flex  justify-content-between'>
      <div className='d-flex align-items-center'>
      <h5 style={{fontSize:"22px"}}>E-Commerce</h5>
<FontAwesomeIcon  cursor={"pointer"} onClick={()=>setIsOpen((prev)=>!prev)}  icon={faBars}/>
      </div>
<div className='d-flex justify-content-center align-items-center h-100 me-4'>
<DropdownButton variant='success'  title={user.name} >
  <DropdownItem onClick={handleLogOut} >LogOut</DropdownItem>
</DropdownButton>
</div>
    </div>
    </div>
   
  )
}
