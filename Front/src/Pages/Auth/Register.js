import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseUrl ,REGISTER} from "../../Api/Api";
import './Auth.css';
import '../../css/Componants/form.css'
import Loading from "../../Componants/Loading/Loading";
import Cookie from "cookie-universal";
import {Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function Register() {
const nav=useNavigate();
const [userInfo,setUserInfo]=useState({
  name:"",
  email:"",
  password:"",
  // rePassword:"",
});
function handleForm(e){
  
  return setUserInfo({...userInfo,[e.target.name]:e.target.value});
}
//handle focus
const focus=useRef(null);
useEffect(()=>{
  focus.current.focus();
},[])  



const cookie=Cookie();
const [errorEmail,setEmailError]=useState("");
const [loading,setLoading]=useState  (false);
async function submit(e){
e.preventDefault();
setLoading(true);
try{
let resp=await axios.post(`${baseUrl}/${REGISTER}`,userInfo);
setLoading(false);
const token =resp.data.token;
cookie.set('e-commerce',token);
setLoading(false);
window.location.pathname=("/dashboard");
}catch(error){
  setLoading(false);
if(error.response.status===422){setEmailError("Email is already been taken");}
else{ setEmailError("internal server error")};
console.log(error);
}
}

  return (
    <>
  {loading && <Loading/>}
  <div className="container">
    
    <div className="row " style={{height:"100vh"}}>
    <Form onSubmit={submit} style={{height: "37rem"}} className="form ">
            <h2 style={{marginLeft:"10px" ,marginTop: "0", marginBottom: "30px" }}>Sign UP</h2>
            <Form.Group
              className=" form-cont "
              controlId="exampleForm.ControlInput"
            >
              <Form.Control
                name="name"
                value={userInfo.name}
                onChange={handleForm}
                type="name"
                ref={focus}
                placeholder="Enter your name"
               required
              />
              <Form.Label className="">Name:</Form.Label>
            </Form.Group>

            <Form.Group
              className=" form-cont "
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                name="email"
                value={userInfo.email}
                onChange={handleForm}
                type="email"
                placeholder="Enter your email"
               required
              />
              <Form.Label className="">Email:</Form.Label>
            </Form.Group>
            <Form.Group
              className="form-cont mb-0"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Control
                name="password"
                value={userInfo.password}
                onChange={handleForm}
                type="password"
                placeholder="Enter your password"
                minLength={6}
                required
              />
              <Form.Label>Password:</Form.Label>
            </Form.Group>
            <div className="form-cont">
            {errorEmail!=="" && <span className="error">{errorEmail}</span>}

            <div class="google-btn mb-3">
                  <a href={"http://127.0.0.1:8000/login-google"}>
                    <div class="google-icon-wrapper">
                      <img
                        class="google-icon"
                        src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_256px.png"
                      />
                    </div>
                    <p class="btn-text">
                      <b>Sign Up with google</b>
                    </p>
                  </a>
                </div>


 <button type="submit" className="btn btn-primary">Sign up</button>

 </div>
            </Form>

 
  </div>
 
  </div></>
)
}
