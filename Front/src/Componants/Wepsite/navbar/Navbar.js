import {
  faCartArrowDown,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { DropdownButton, DropdownItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { Axios } from "../../../Api/axio";
import { CATEGORIES, LOGOUT, USER } from "../../../Api/Api";
import StringSlice from "../../../helpers/StringSlice";
import Skeleton from "react-loading-skeleton";
import SkeletonShow from "../../Skeleton/SkeletonShow";
import Cookie from "cookie-universal";
export default function Navbar() {
  const [cat, setCat] = useState([]);
  const [loading, setLoading] = useState(true);
  const cookie = new Cookie();
  const token = cookie.get("e-commerce");
const [user,setUser]=useState("");

  useEffect(()=>{
    if(token){
      const res = Axios.get(`${USER}`).then((user)=>setUser(user.data));

    }
  },[token])



  useEffect(() => {
    const res = Axios.get(`${CATEGORIES}`)
      .then((item) => setCat(item.data.slice(-8)))
      .finally(setLoading(false));
  }, []);

  async function handleLogOut() {
    try {
      const resp = await Axios.get(`/${LOGOUT}`);
      cookie.remove("e-commerce");
      window.location.pathname = "/";
    } catch (error) {
      console.log(error);
    }
  }

  const catShow = cat.map((categories) => (
    <Link
      className="m-0 text-black border rounded-2 p-1 cat-title text-decoration-none"
      to={`/category/${categories.id}`}
    >
      {StringSlice(categories.title, 12)}
    </Link>
  ));
  const nav = useNavigate();
  function handleCat() {
    console.log(window.location.pathname);
    if (window.location.pathname === "/categorie") {
      nav("");
    } else nav("categorie");
  }
  return (
    <nav className="py-3 bg-white">
      <Container>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <Link className="col-3" to="/">
            <img
              src={require("../../../images/karam Ec.png")}
              width="120px"
              alt="logo"
            />
          </Link>
          <div className="search-input col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative">
            <Form.Control
              type="search"
              placeholder="Search Product"
              className="form-control custom-search py-3 rounded-0"
            />
            <h3 className="justify-content-center rounded-0 btn btn-success position-absolute top-0 end-0  h-100 line-height m-0 px-4 d-flex align-items-center">
              Search
            </h3>
          </div>
          <div className="col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1">
            <Link to="/cart">
              <img
                style={{ width: "45px", color: "darkgreen" }}
                src={require("../../../images/360_F_560176615_cUua21qgzxDiLiiyiVGYjUnLSGnVLIi6.jpg")}
              />
            </Link>
            <div className="d-flex">
              <FontAwesomeIcon
                style={{
                  cursor: "pointer",
                  fontSize: "25px",
                  color: "darkgreen",
                  marginTop: "5px",
                }}
                icon={faUser}
              />
              <div className="d-flex justify-content-center align-items-center ms-2 ">
                {!token ? (
                  <Link style={{textDecoration:"none",color:"black"}} to="/login">Login</Link>
                ) : (
                  <Link style={{textDecoration:"none",color:"black"}} >{
<DropdownButton variant='success'  title={user.name} >
  <DropdownItem onClick={handleLogOut} >LogOut</DropdownItem>
  {user.role==="1995"&&<DropdownItem  ><Link style={{textDecoration:"none",color:"black"}} to="/dashboard">Dashboard</Link></DropdownItem>}
</DropdownButton>

                  }</Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 gap-lg-2 gap-md-2 gap-1 d-flex align-items-center justify-content-start flex-wrap">
          {loading ? (
            <>
              <SkeletonShow length={7} height="35px" width="80px" />
            </>
          ) : (
            catShow
          )}
          <p
            style={{ cursor: "pointer" }}
            className="text-black cat-title m-0"
            onClick={handleCat}
          >
            Show all
          </p>
        </div>
      </Container>
    </nav>
  );
}
