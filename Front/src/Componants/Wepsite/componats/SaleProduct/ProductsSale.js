import {
  faS,
  faStar,
  faUser,
  regularStar,
  solid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container } from "react-bootstrap";
import StringSlice from "../../../../helpers/StringSlice";
export default function ProductsSale(props) {
  const star = Math.min(props.rating, 5);

  const showStars = Array.from({ length: star }).map((_, key) => (
    <FontAwesomeIcon style={{ color: "gold" }} key={key} icon={faStar} />
  ));
  const showEmptyStars = Array.from({ length: 5 - star }).map((_, key) => (
    <i key={key} className="fa fa-star-o" aria-hidden="true"></i>
  ));

  return (
    <div className="col-lg-3 col-md-6 col-12 ">
      <div className="m-1 border rounded p-3">
        <div className=" border-bottom pb-3">
          <p style={{ color: "gray" }} className="text-truncate">
            {props.title}
          </p>
          <p className="text-truncate">{props.description}</p>
          <div className="position-relative px-5 py-4">
            {props.sale && (
              <p
                style={{ width: "50px ", height: "50px", lineHeight: "50px" }}
                className="text-center position-absolute m-0 top-0 start-0 bg-success rounded-circle text-white text-uppercase d-inline-block"
              >
                Sale
              </p>
            )}
            <img src={props.image} alt="laptop" className="img-fluid rounded" />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <div>
            {showStars}
            {showEmptyStars}
            <div className="d-flex align-items-center gap-3">
              <h5 className="m-0 text-success ">{props.discount}$</h5>
              <h6
                className="m-0 "
                style={{ color: "gray", textDecoration: "line-through" }}
              >
                {props.price}$
              </h6>
            </div>
          </div>
          <div className="border p-2 rounded">
            <img
              style={{ width: "30px", color: "darkgreen" }}
              src={require("../../../../images/360_F_560176615_cUua21qgzxDiLiiyiVGYjUnLSGnVLIi6.jpg")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
