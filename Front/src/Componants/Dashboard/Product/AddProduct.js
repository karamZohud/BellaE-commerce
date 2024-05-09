import React, { useEffect, useRef, useState } from "react";
import { CATEGORIES, PRO } from "../../../Api/Api";
import "../../../css/Componants/form.css";
import Loading from "../../Loading/Loading";
import "../../../Pages/Auth/Auth.css";
import { Button, Form, FormControl } from "react-bootstrap";
import { Axios } from "../../../Api/axio";
import { useNavigate } from "react-router-dom";
export default function AddProduct(props) {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const [id, setId] = useState();
  const [imgs, setImgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [send, setSend] = useState(true);
  const [categories, setCat] = useState([]);
  const [upLoad, setUpLoad] = useState(0);
  const progress = useRef([]);

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSend(false);
    if (send != false) {
      submitForm();
    }
  }
  const j = useRef(-1);
  async function handleImagesChange(e) {
    setImgs((prev) => [...prev, ...e.target.files]);
    const imagesAsFile = e.target.files;

    const data = new FormData();
    for (let index = 0; index < imagesAsFile.length; index++) {
      j.current++;
      data.append("image", imagesAsFile[index]);
      data.append("product_id", id);

      try {
        const res = await Axios.post("/product-img/add", data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const perecnt = Math.floor((loaded * 100) / total);

            if (perecnt % 10 === 0) {
              progress.current[j.current].style.width = `${perecnt}%`;

              progress.current[j.current].setAttribute("percnt", `${perecnt}%`);
            }
          },
        });

        idRef.current[j.current] = res.data.id;
      } catch (error) {
        console.log(error);
      }
    }
  }
  function handleImage() {
    openImage.current.click();
  }

  const idRef = useRef([]);
  async function handleImageDelete(id, img) {
    const findId = idRef.current[id];
    try {
      const res = await Axios.delete(`product-img/${findId}`);
      setImgs((prev) => prev.filter((image) => image !== img));
      idRef.current = idRef.current.filter((id) => id !== findId);
      --j.current;
    } catch (error) {
      console.log(error);
    }
  }

  const nav = useNavigate();

  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  }, []);

  const openImage = useRef(null);

  useEffect(() => {
    
    const resp = Axios.get(`${CATEGORIES}`)
      .then((data) => setCat(data.data))
      .catch((err) => console.log(err))
      .finally(() => console.log(resp));
  }, []);
console.log(categories);
  // mapping
  const cat = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));

  const imagesShow = imgs.map((img, key) => (
    <div
      key={key}
      style={{ width: "100%", backgroundColor: "white" }}
      className=" border p-1"
    >
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start gap-2">
          <img
            style={{
              width: "80px",
              height: "70px",
            }}
            src={URL.createObjectURL(img)}
          />
          <div>
            <p className="mb-1">{img.name}</p>
            <p>
              {img.size / 1024 < 999
                ? (img.size / 1024).toFixed(2) + "KB"
                : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
            </p>
          </div>
        </div>
        <Button
          onClick={() => handleImageDelete(key, img)}
          variant="danger"
          className=""
        >
          Delete
        </Button>
      </div>

      <div className="custom-progress mt-2">
        <span
          ref={(e) => (progress.current[key] = e)}
          className="inner-progress "
        ></span>
      </div>
    </div>
  ));

  const dummyForm = {
    category: null,
    title: "asdasd",
    description: "dasdad",
    price: 222,
    discount: 0,
    About: "sadasds",
  };

  async function submitForm() {
    try {
      const resp = await Axios.post(`${PRO}/add`, dummyForm);
      setId(resp.data.id);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  }

  async function submitEdit(e) {
    setLoading(true);
    e.preventDefault();

    try {
      const resp = await Axios.post(`${PRO}/edit/${id}`, form);
      console.log("the Prod add successfuly");
      setLoading(false);
      nav("/dashboard/products");
      // window.location.pathname=("/dashboard/categories");//delete the last hestory for the path
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className="container ">
        <div className="row">
          <Form onSubmit={submitEdit} className="form mt-5 ">
            <h2
              style={{
                marginTop: "0",
                marginBottom: "30px",
                marginLeft: "15PX",
              }}
            >
              Create Product
            </h2>

            <div className="d-flex ">
              <div className="w-100">
                {" "}
                <Form.Group className=" form-cont" controlId="Category">
                  <Form.Label className="">Category:</Form.Label>

                  <Form.Select
                    ref={focus}
                    name="category"
                    value={form.category}
                    onChange={handleForm}
                    required
                  >
                    <option disabled>Select Category </option>
                    {cat}
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  className=" form-cont "
                  controlId="exampleForm.ControlInput"
                >
                  <Form.Control
                    name="title"
                    value={form.title}
                    onChange={handleForm}
                    type="text"
                    placeholder="Enter your title"
                    disabled={send}
                    required
                  />
                  <Form.Label className="">Title:</Form.Label>
                </Form.Group>
                <Form.Group
                  className=" form-cont "
                  controlId="exampleForm.ControlInput11"
                >
                  <Form.Control
                    name="description"
                    value={form.description}
                    onChange={handleForm}
                    type="text"
                    placeholder="Description..."
                    disabled={send}
                    required
                  />
                  <Form.Label className="">Description:</Form.Label>
                </Form.Group>
                <Form.Group
                  className=" form-cont "
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    name="price"
                    value={form.price}
                    onChange={handleForm}
                    type="text"
                    placeholder="price..."
                    disabled={send}
                    required
                  />
                  <Form.Label>price:</Form.Label>
                </Form.Group>
                <Form.Group
                  className=" form-cont "
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Control
                    name="discount"
                    value={form.discount}
                    onChange={handleForm}
                    disabled={send}
                    type="text"
                    placeholder="Discount..."
                    required
                  />
                  <Form.Label className="">Discount:</Form.Label>
                </Form.Group>
                <Form.Group
                  className=" form-cont "
                  controlId="exampleForm.ControlInput7"
                >
                  <Form.Control
                    name="About"
                    disabled={send}
                    value={form.About}
                    onChange={handleForm}
                    type="text"
                    placeholder="About ..."
                    required
                  />
                  <Form.Label className="">About:</Form.Label>
                </Form.Group>
              </div>
              <div className="w-100">
                <Form.Group
                  className=" form-cont "
                  style={{ marginBottom: "10px" }}
                  controlId="exampleForm.ControlInput8"
                >
                  <Form.Label className="">
                    <h3 style={{ color: "#24ad87", marginLeft: "-5px" }}>
                      Images:
                    </h3>
                  </Form.Label>
                  <Form.Control
                    multiple
                    ref={openImage}
                    hidden
                    disabled={send}
                    onChange={handleImagesChange}
                    type="file"
                  />
                </Form.Group>
                <div
                  onClick={handleImage}
                  style={{
                    border: "3px dashed",
                    cursor: "pointer",
                    borderColor: send ? "#8f8f8f" : "#24ad87",
                  }}
                  className="d-flex align-items-center py-3 rounded mt-3 mb-2 justify-content-center gap-2 w-100 flex-column"
                >
                  <img
                    width={"100px"}
                    src={require("../../../Assets/4369500.png")}
                    alt="Upload Here"
                    style={{ filter: send && "grayscale(100)" }}
                  />
                  <h3
                    style={{
                      backgroundColor: "#e6eced",
                      borderRadius: "10px",
                      width: "200px",
                      textAlign: "center",
                      color: "#24ad87",
                      filter: send && "grayscale(100)",
                    }}
                  >
                    Upload Images
                  </h3>
                </div>
                <div className="d-flex m-3 flex-column gap-2 ">
                  {imagesShow}
                </div>
              </div>
            </div>

            <div className="custom-form">
              <button
                style={{ marginLeft: "15px" }}
                disabled={form.title.length < 1}
                type="submit"
                className="btn btn-success w-25 p-2"
              >
                Create
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
