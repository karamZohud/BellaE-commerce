import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseUrl, LOGIN } from "../../Api/Api";
import "./Auth.css";
import "../../css/Componants/form.css";
import Loading from "../../Componants/Loading/Loading";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    // rePassword:"",
  });
  const [errorEmail, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  //cookies
  const cookie = Cookie();
  const nav=useNavigate();
  function handleForm(e) {
    return setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

//handle focus
const focus=useRef(null);
useEffect(()=>{
  focus.current.focus();
},[])


  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await axios.post(`${baseUrl}/${LOGIN}`, {
        email: userInfo.email,
        password: userInfo.password,
      });
      setLoading(false);
      const token = resp.data.token;
      cookie.set("e-commerce", token);
      
window.location.pathname=("/dashboard");//delete the last hestory for the path
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response.status === 401) {
        setEmailError("Wrong Email Or Password");
      } else {
        setEmailError("internal server error");
      }
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className="container" >
        <div className="row" style={{height:"100vh"}}>
          <Form onSubmit={submit} className="form">
            <h2 style={{ marginTop: "0", marginBottom: "30px",marginLeft:"15PX"}}>Login Page</h2>

            <Form.Group
              className=" form-cont "
              controlId="exampleForm.ControlInput"
            >
              <Form.Control
                name="email"
                value={userInfo.email}
                onChange={handleForm}
                type="email"
                placeholder="Enter your email"
               required
               ref={focus}
              />
              <Form.Label className="">Email:</Form.Label>
            </Form.Group>
            <Form.Group
              className="form-cont "
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
            <div className="custom-form">
              <div className="form-cont">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>

                <div class="google-btn">
                  <a href={"http://127.0.0.1:8000/login-google"}>
                    <div class="google-icon-wrapper">
                      <img
                        class="google-icon"
                        src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_256px.png"
                      />
                    </div>
                    <p class="btn-text">
                      <b>Sign in with google</b>
                    </p>
                  </a>
                </div>
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
