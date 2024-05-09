import {
  faCartPlus,
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
export default function TopProducts(props) {
  const star = Math.min(props.rating, 5);

  const showStars = Array.from({ length: star }).map((_, key) => (
    <FontAwesomeIcon style={{ color: "gold" }} key={key} icon={faStar} />
  ));
  const showEmptyStars = Array.from({ length: 5 - star }).map((_, key) => (
    <i key={key} className="fa fa-star-o" aria-hidden="true"></i>
  ));

  return (
    <div className="d-flex border-bottom m-1 rounded p-2 position-relative">
      <div className="me-2 ">
        <img width="150px" src={props.image} alt="laptop" className="rounded" />
      </div>
      <div className="position-relative text-truncate w-100">
        <p className="text-truncate" style={{ color: "gray" }}>
          {props.title}
        </p>
        <p className="text-truncate">{props.description}</p>

        <div className="mt-3 w-100">
          <div className="d-flex align-items-center  position-relative   mt-2">
            <div className="d-flex flex-column">
              <div className="me-3">
                {showStars}
                {showEmptyStars}
              </div>

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
            <div className="d-flex w-100 justify-content-end me-5">
              <FontAwesomeIcon
                style={{ fontSize: "20px", cursor: "pointer" }}
                className="text-success"
                icon={faCartPlus}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
