import React from 'react'
import Topbar from '../../Componants/Dashboard/Topbar'
import SideBar from '../../Componants/Dashboard/SideBar'
import { Outlet } from 'react-router-dom'
import "./dashboard.css";
export default function Dashboard() {
  return (
    <div  className='dashboard '>
        <Topbar/>
        <div className='d-flex flex-row ' style={{marginTop:"6vh" ,position:"relative"}}> 
        <SideBar/>
        <Outlet/>
        </div>
        
    </div>
  )
}
