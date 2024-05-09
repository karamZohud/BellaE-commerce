import React, { useState } from "react";
import { CAT } from "../../../Api/Api";
import "../../../css/Componants/form.css";
import Loading from "../../Loading/Loading";
import "../../../Pages/Auth/Auth.css";
import { Form, FormControl } from "react-bootstrap";
import { Axios } from "../../../Api/axio";
export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", img);

    try {
      const resp = await Axios.post(`${CAT}/add`, formData);

      setLoading(false);
      // window.location.pathname=("/dashboard/categories");//delete the last hestory for the path
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

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
              Create category
            </h2>

            <Form.Group
              className=" form-cont "
              controlId="exampleForm.ControlInput"
            >
              <Form.Control
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter your title"
                required
              />
              <Form.Label className="">Title:</Form.Label>
            </Form.Group>
            <Form.Group
              className="form-cont "
              controlId="exampleForm.ControlInput2"
            >
              <Form.Control
                name="img"
                onChange={(e) => setImg(e.target.files.item(0))}
                type="file"
                required
              />
              <Form.Label>Image:</Form.Label>
            </Form.Group>

            <div className="custom-form">
              <button
                style={{ marginLeft: "15px" }}
                disabled={title.length < 1}
                type="submit"
                className="btn btn-success w-25 p-2"
              >
                Create category
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
