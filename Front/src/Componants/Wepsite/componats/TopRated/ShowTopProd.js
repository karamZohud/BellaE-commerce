import React, { useEffect, useState } from "react";
import TopProducts from "./TopProduct";
import { Axios } from "../../../../Api/axio";
import { LatestSalesPRODUCTS, TOpPRoduct } from "../../../../Api/Api";
import { Container } from "react-bootstrap";
import SkeletonShow from "../../../Skeleton/SkeletonShow";

export default function ShowTopProd() {
  const [prodSale, setProdSale] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${TOpPRoduct}`)
      .then((item) => setProdSale(item.data))
      .finally((e) => setLoading(false));
  }, []);

  const showTopProductSales = prodSale.map((item) => (
    <TopProducts
      title={item.title}
      description={item.description}
      sale={item.discount}
      price={item.price}
      image={item.images[0].image}
      discount={item.discount}
      rating={item.rating}
    />
  ));
  return (
  
      <div className=" col-12 col-md-6  mb-4">
        <Container>
     <div className="border rounded border-1 border-success">
          <div className="bg-success w-100">
            {" "}
            <h1
              style={{
                textAlign: "center",
                color: "white",
                paddingBottom: "5px",
                fontFamily: "monospace",
              }}
            >
              Top Product
            </h1>
          </div>
          <div>{loading?<>
          <SkeletonShow
          height="150px"
          width="100"
          length="1"
          classess="m-2"
          />
          </>:showTopProductSales}</div>
        </div>
   </Container>
      </div>
    
  );
}
