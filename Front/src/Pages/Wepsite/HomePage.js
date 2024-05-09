import React from "react";
import "./wepSiteCss/homePage.css";
import Cookie from "universal-cookie";
import LandingPage from "./LandingPage";
import LatestProductsSales from "../../Componants/Wepsite/componats/SaleProduct/LatestProductsSales";
import ShopNow from "./ShopNow";
import ShowTopProd from "../../Componants/Wepsite/componats/TopRated/ShowTopProd";
import ShowLastProd from "../../Componants/Wepsite/componats/LatestProduct/ShowLastProd";
import Footer from "./Footer";
const cookie = new Cookie();

export default function HomePage() {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between flex-wrap ">
        <LandingPage />
      </div>
      <LatestProductsSales />
      <ShopNow />
      <div className="d-flex flex-row flex-wrap mt-5">
      <ShowTopProd />
     <ShowLastProd/>
      </div>
     <Footer/>
    </div>
  );
}
