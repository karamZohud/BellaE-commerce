import React, { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axio";
import { LatestSalesPRODUCTS } from "../../../../Api/Api";
import Products from "../../../Dashboard/Product/Products";
import ProductsSale from "./ProductsSale";
import { Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import SkeletonShow from "../../../Skeleton/SkeletonShow";

export default function LatestProductsSales() {
  const [prodSale, setProdSale] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${LatestSalesPRODUCTS}`)
      .then((item) => setProdSale(item.data))
      .finally((e) => setLoading(false));
  }, []);

  const showProductSales = prodSale.map((item) => (
    <ProductsSale
      title={item.title}
      description={item.description}
      sale={item.discount}
      price={item.price}
      image={item.images[0].image}
      discount={item.discount}
      rating={item.rating}
    />
  ));
  console.log(prodSale);
  return (
    <Container className="mt-4">
      <h1>Latest sale Products</h1>
      <div className="mt-4 d-flex flex-row align-items-center justify-content-start flex-wrap">
        {loading ? (
          <>
            <SkeletonShow
              length={4}
              height="300px"
              classess=" col-lg-3 col-md-6 col-12"
            />
          </>
        ) : (
          showProductSales
        )}
      </div>
    </Container>
  );
}
