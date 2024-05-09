import React, { useEffect, useRef, useState } from "react";
import { CATEGORIES, PRO } from "../../../Api/Api";
import "../../../css/Componants/form.css";
import Loading from "../../Loading/Loading";
import "../../../Pages/Auth/Auth.css";
import { Button, Form, FormControl } from "react-bootstrap";
import { Axios } from "../../../Api/axio";
import { useNavigate, useParams } from "react-router-dom";
export default function UpdateProduct() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const [imgs, setImgs] = useState([]);
  const [imagesFromServer, setImageFromServer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCat] = useState([]);
  const progress = useRef([]);
  const [change, setChan] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [idFromServer,setidFromServer]=useState([]);
  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
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
  console.log(imagesFromServer);
  async function handleDeleteImageFromServer(id) {
    if (isSave) {
     
    }
    setImageFromServer(prev=> prev.filter(img => img.id !== id));
    setidFromServer((prev)=>{
        return [...prev,id]
    });
    console.log(imagesFromServer);
  }
  

  const nav = useNavigate();

  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  }, []);

  const openImage = useRef(null);

  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then((data) => setCat(data.data))
      .catch((err) => console.log(err));
  }, []);
  // mapping
  console.log(categories.data);

  
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
            alt=""
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

  const imagesShowFromServer = imagesFromServer.map((img, key) => (
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
            src={img.image}
            alt=""
          />
        </div>
        <Button
          onClick={() => handleDeleteImageFromServer(img.id)}
          variant="danger"
          className=""
        >
          Delete
        </Button>
      </div>
    </div>
  ));

  const { id } = useParams();
  useEffect(() => {
    Axios.get(`/${PRO}/${id}`)
      .then((data) => {
        setForm(data.data[0]);
        setImageFromServer(data.data[0].images);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(form);
  async function submitEdit(e) {
    setLoading(true);
    e.preventDefault();

    try {
   
            
              
    
for (let index = 0; index < idFromServer.length; index++) {
    var idToDelete=idFromServer[index];
    await Axios.delete(`product-img/${idToDelete}`);

}
      await Axios.post(`${PRO}/edit/${id}`, form);
      console.log("the Prod add successfuly");
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
              Edit Product
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
                    onChange={handleImagesChange}
                    type="file"
                  />
                </Form.Group>
                <div
                  onClick={handleImage}
                  style={{
                    border: "3px dashed",
                    cursor: "pointer",
                    borderColor: "#24ad87",
                  }}
                  className="d-flex align-items-center py-3 rounded mt-3 mb-2 justify-content-center gap-2 w-100 flex-column"
                >
                  <img
                    width={"100px"}
                    src={require("../../../Assets/4369500.png")}
                    alt="Upload Here"
                  />
                  <h3
                    style={{
                      backgroundColor: "#e6eced",
                      borderRadius: "10px",
                      width: "200px",
                      textAlign: "center",
                      color: "#24ad87",
                    }}
                  >
                    Upload Images
                  </h3>
                </div>
                <div className="d-flex m-3 flex-column gap-2 ">
                  {imagesShowFromServer}
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
                onClick={() => setIsSave(true)}
              >
                Edit
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
