import React, { useEffect, useState } from 'react'
import { Axios } from '../../../../Api/axio';
import LastProd from './LastProd';
import { LATEST, LatestSalesPRODUCTS } from '../../../../Api/Api';
import { Container } from 'react-bootstrap';
import SkeletonShow from '../../../Skeleton/SkeletonShow';

export default function ShowLastProd() {
    const [prodSale, setProdSale] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      Axios.get(`${LATEST}`)
        .then((item) => setProdSale(item.data))
        .finally((e) => setLoading(false));
    }, []);
  
    const showProductSales = prodSale.map((item) => (
      <LastProd
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
      <div className="col-12 col-md-6 ">
          <h1 className='text-center '>Latest Products</h1>
        <Container>
      
        <div className="mt-4 d-flex flex-row align-items-center justify-content-center flex-wrap">
          {loading ? (
            <>
              <SkeletonShow
                length={3}
                height="300px"
                classess=" col-lg-4 col-md-6 col-12"
              />
            </>
          ) : (
            showProductSales
          )}
        </div>   
        </Container>
       
       
      </div>
    );
  }
  