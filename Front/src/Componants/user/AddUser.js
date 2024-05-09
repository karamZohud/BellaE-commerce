import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseUrl, LOGIN, REGISTER, USER } from "../../Api/Api";
import "../../css/Componants/form.css";
import Loading from "../Loading/Loading";
import Cookie from "cookie-universal";
import '../../Pages/Auth/Auth.css'
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../Api/axio";
export default function AddUser() {
  
const [role,setRole]=useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
   password:"",
   role:"",
    // rePassword:"",
  });
  const [errorEmail, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableTo,setDisableTo]=useState(true);
  //cookies

  const focus=useRef(null);
  useEffect(()=>{
    focus.current.focus();
  },[])
  
  const nav=useNavigate();
  function handleForm(e) {
    return setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await Axios.post(`/${USER}/add`,userInfo );
      setLoading(false);
nav("/dashboard/users",{replace:true});//delete the last hestory for the path
    } catch (error) {
      setLoading(false);
      if (error.response.status === 401) {
        setEmailError("Wrong Email Or Password");
      } else {
        setEmailError("internal server error");
      }
    }
  }



  return (
    <>
      {loading && <Loading/>}
      <div className="container" >
        <div className="row" style={{height:"100vh"}}>
          <Form onSubmit={submit} className="form">
            <h2 style={{ marginTop: "0", marginBottom: "30px",marginLeft:"15PX"}}>Create User</h2>

            <Form.Group
              className=" form-cont "
              controlId="exampleForm.ControlInput"
            >
              <Form.Control
                name="name"
                value={userInfo.name}
                onChange={handleForm}
                type="text"
                placeholder="Enter your Name"
               required
               ref={focus}
              />
              <Form.Label className="">Name:</Form.Label>
            </Form.Group>
            <Form.Group
              className="form-cont "
              controlId="exampleForm.ControlInput2"
            >
              <Form.Control
                name="email"
                value={userInfo.email}
                onChange={handleForm}
                type="email"
                placeholder="Enter Your Email"
                required
              />
              <Form.Label>Email:</Form.Label>
            </Form.Group>
            <Form.Group
              className="form-cont "
              controlId="exampleForm.ControlInput4"
            >
              <Form.Control
                name="password"
                value={userInfo.password}
                onChange={handleForm}
                type="password"
                minLength={6}
                placeholder="Enter Your password"
                required
              />
              <Form.Label>Password:</Form.Label>
            </Form.Group>
            <Form.Group
              className="form-cont "
              controlId="exampleForm.ControlInput3"
            >
              <Form.Select
              
                onChange={handleForm}
                
                name="role"             
                required
              >
                 <option >Select Role</option>
                <option value='1992'>Admin</option>
                <option value='2001'>user</option>
                <option value='1996'>Writer</option>
                <option value='1999'>Product Manger</option>

              </Form.Select>
              <Form.Label>Role:</Form.Label>
            </Form.Group>
            <div className="custom-form">
           <button style={{marginLeft:"15px"}} disabled={(userInfo.email.length <1) || (userInfo.name.length<1 )|| (userInfo.password.length<6 ) || (userInfo.role.charAt=="")}  type="submit"  className="btn btn-success w-25 p-2">
                 Create User
                </button> 
              <div className="form-cont">
              
               
                {errorEmail !== "" && (
                  <span className="error mt-4" >{errorEmail}</span>
                )}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
