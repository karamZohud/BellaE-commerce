import React from 'react'
import "./403.css"
import { Link } from 'react-router-dom'
export default function Err403(props) {
  return (
    <div className='text-wrapper w-100'>
<div className='title'>
403 -access denied
</div>
<div className='subtitle'>
Oops ,you dont have premision to access this page.


<Link 
className='d-block text-center btn btn-primary mt-3'
to={props.role==="1996"?'/dashboard/writer':"/"}> 
{props.role==="1996"?"Go to Writer Page":"Go to Home Page"}
</Link>
</div>
    </div>
  )
}
