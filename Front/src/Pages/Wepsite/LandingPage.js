import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./wepSiteCss/homePage.css";
export default function LandingPage() {

  return (
    <div className="w-100 hand d-flex align-items-center justify-content-between flex-wrap">
<Container>
      <div className="col-1g-5 col-ud-8 col-12 text-md-start text-center">
        <h1 style={{ fontWeight: "bold" }} classhame="display-2 ">
          {" "}
          Speed Laptop{" "}
        </h1>
        <h5 style={{ color: "darkgreen" }}>
          Another Nice Thing Which is used by someone i don't know (hust random
          text)
        </h5>
        <Link
          to="/shop"
          className="btn btn-primary mt-3 py- 3 px 4 fw hold text light"
        >
          Shop Now
        </Link>
      </div>
    </Container>
    </div>
    
  );
}
