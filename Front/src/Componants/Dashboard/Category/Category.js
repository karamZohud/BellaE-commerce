import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseUrl, CAT, LOGIN, USER } from "../../../Api/Api";
import "../../../css/Componants/form.css";
import Loading from "../../Loading/Loading";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../Api/axio";
export default function Category() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");

  const [errorEmail, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableTo, setDisableTo] = useState(true);
  //cookies

  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", img);
    console.log(formData);
    try {
      const resp = await Axios.post(`/${CAT}/edit/${id}`, formData);
      setLoading(false);
      nav("/dashboard/categories", { replace: true }); //delete the last hestory for the path
    } catch (error) {
      setLoading(false);
      if (error.response.status === 401) {
        setEmailError("Wrong Email Or Password");
      } else {
        setEmailError("internal server error");
      }
    }
  }
  //handle focus
  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  });

  const idObj = useParams();
  const id = idObj.id;
  useEffect(() => {
    setLoading(true);
    const resp = Axios.get(`${CAT}/${id}`)
      .then((data) => {
        setTitle(data.data.title);
        setImg(data.img);
        setLoading(false);
      })
      .then(() => {
        setDisableTo(false);
      })
      .catch(() => {
        nav("/dashboard/categories/page/404");
      });
  }, []);

  return (
    <>
      {loading && <Loading />}

      <div className="container">
        <div className="row" style={{ height: "100vh" }}>
          <Form onSubmit={submit} className="form">
            <h2
              style={{
                marginTop: "0",
                marginBottom: "30px",
                marginLeft: "15PX",
              }}
            >
              Update User
            </h2>

            <Form.Group
              className=" form-cont "
              controlId="exampleForm.ControlInput"
            >
              <Form.Label className="">Title:</Form.Label>
              <Form.Control
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                type="text"
                ref={focus}
                placeholder="Enter title"
                required
              />
            </Form.Group>
            <Form.Group
              className="form-cont "
              controlId="exampleForm.ControlInput2"
            >
              <Form.Label>Image:</Form.Label>
              <Form.Control
                name="img"
                onChange={(e) => setImg(e.target.files.item(0))}
                type="file"
                required
              />
            </Form.Group>

            <div className="custom-form">
              <button
                style={{ marginLeft: "15px" }}
                disabled={title.length < 1}
                type="submit"
                className="btn btn-success w-25 p-2"
              >
                Update
              </button>
              <div className="form-cont">
                {errorEmail !== "" && (
                  <span className="error mt-4">{errorEmail}</span>
                )}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
