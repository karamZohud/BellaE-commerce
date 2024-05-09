import axios from 'axios';
import React, { useEffect } from 'react';
import { GOOGLE_CALL_BACK, baseUrl } from '../../Api/Api';
import { useLocation } from 'react-router-dom';
import Cookie from "cookie-universal";


export default function GoogleCallBack() {
  const cookie=new Cookie();
    const location=useLocation();
useEffect(()=>{
    async function googleCall(){
        try{
const resp= await axios.get(`${baseUrl}/${GOOGLE_CALL_BACK}${location.search}`);
console.log(resp);
const token =resp.data.access_token;
cookie.set("e-commerce",token);
        }catch(error){
console.log(error)
        }
    }
    googleCall();
},[]);


  return (
    <div>GoogleCallBack</div>
  )
}
