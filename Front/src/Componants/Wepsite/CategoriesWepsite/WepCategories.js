import React, { useEffect, useState } from "react";
import { CATEGORIES } from "../../../Api/Api";
import { Axios } from "../../../Api/axio";
import Navbar from "../navbar/Navbar";
import { Container, Fade } from "react-bootstrap";
import StringSlice from "../../../helpers/StringSlice";

import SkeletonShow from "../../Skeleton/SkeletonShow";
export default function WepCategories() {
  const [cat, setCat] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const res = Axios.get(`${CATEGORIES}`).then((item) => setCat(item.data)).finally(setLoading(false));
  }, []);
  const catShow = cat.map((categories) => (
    <div className="col-lg-2 col-md-6 col-12 bg-transparent border-0">
      <div className="m-1 bg-white border d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100">
        <img
          className="ms-3"
          width="50px"
          height="50px"
          src={categories.image}
          alt="cat image"
        />
        <p className="m-0 ">{StringSlice(categories.title, 12)}</p>
      </div>
    </div>
  ));
  return (
    <div>
      <div style={{ backgroundColor: "#e4eadd" }} className="py-5">
        <Container>
          <div className="d-flex align-items-stretch justify-content-start flex-wrap row-gap-2">
            {loading ? (
              <>
              <SkeletonShow width="100px" classess="col-lg-2 col-md-3 col-4" baseColor="white" length={15} height="35px"/>
              </>
            ) : (
              catShow
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
