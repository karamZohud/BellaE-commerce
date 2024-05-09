import React, { useEffect, useRef, useState } from 'react'
import {Form} from 'react-bootstrap'
export default function Test() {
    const [userInfo,setUserInfo]=useState({
        name:"",
        email:"",
        password:"",
        // rePassword:"",
      });
const focas=useRef(null);
const count=useRef(0);
useEffect(()=>{
    // focas.current.focus();
    count.current=count.current+1;
});
function handleForm(e){
        
        return setUserInfo({...userInfo,[e.target.name]:e.target.value});
      }
  return (
    <div>
        <div className="container">
    
    <div className="row " style={{height:"100vh"}}>
    <Form  style={{height: "37rem"}} className="form ">
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
                placeholder="Enter your name"
               required
              // ref={focas}
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
              <p>{count.current}</p>
            </Form.Group>
            <div className="form-cont">
            {/* {errorEmail!=="" && <span className="error">{errorEmail}</span>} */}

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
 
  </div>
    </div>
  )
}
