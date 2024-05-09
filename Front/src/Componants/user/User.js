import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseUrl, LOGIN, USER } from "../../Api/Api";
import "../../Pages/Auth/Auth.css";
import "../../css/Componants/form.css";
import Loading from "../Loading/Loading";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../Api/axio";
export default function Login() {
  
const [role,setRole]=useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
   
    // rePassword:"",
  });
  
  const [errorEmail, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableTo,setDisableTo]=useState(true);

//handle focus
const focus=useRef(null);
useEffect(()=>{
  focus.current.focus();
})



  const nav=useNavigate();
  function handleForm(e) {
    return setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await Axios.post(`/${USER}/edit/${id}`, {
        name: userInfo.name,
        email: userInfo.email,
        role:userInfo.role,
      });
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

  const idObj=useParams();
  const id=idObj.id;


useEffect(()=>{
  setLoading(true);
const resp=Axios.get(`${USER}/${id}`).
then((data)=>{setUserInfo(data.data);setLoading(false)}).then(()=>setDisableTo(false))
.catch(()=>{
nav('/dashboard/users/page/404');
});
},[])

  return (
    <>
      {loading && <Loading/>}
      
      <div className="container" >
        <div className="row" style={{height:"100vh"}}>
          <Form onSubmit={submit} className="form">
            <h2 style={{ marginTop: "0", marginBottom: "30px",marginLeft:"15PX"}}>Update User</h2>

            <Form.Group
              className=" form-cont "
              controlId="exampleForm.ControlInput"
            >
              <Form.Control
                name="name"
                ref={focus}
                value={userInfo.name}
                onChange={handleForm}
                type="text"
                placeholder="Enter your new Name"
               required
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
                required
              />
              <Form.Label>Email:</Form.Label>
            </Form.Group>
            <Form.Group
              className="form-cont "
              controlId="exampleForm.ControlInput3"
            >
              <Form.Select
                value={userInfo.role}
                onChange={handleForm}
                name="role"
                required
              >
                 <option disabled value="">Select Role</option>
                <option value='1995'>Admin</option>
                <option value='2001'>user</option>
                <option value='1996'>Writer</option>
                <option value='1999'>Product Manger</option>

              </Form.Select>
              <Form.Label>Role:</Form.Label>
            </Form.Group>
            <div className="custom-form">
           <button style={{display:disableTo?"none":"",marginLeft:"15px"}}  type="submit"  className="btn btn-success w-25 p-2">
                 Update
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
