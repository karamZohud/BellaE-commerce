import React, { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { Axios } from "../../../Api/axio";
import { CAT, PRO, PRODUCTS } from "../../../Api/Api";
import { NavLink } from "react-router-dom";
import TableShow from "../Table";
export default function Products() {
  const [prod, setProd] = useState([]);
  const [limit, setLimits] = useState(3);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totlaData,setTotalData]=useState(0);
console.log(limit);
  useEffect(() => {
    const res=Axios.get(`${PRODUCTS}?limit=${limit}&page=${page}`)
      .then((data) => {setProd(data.data.data);
   console.log(data.data.data);
   setTotalData(data.data.total)
  
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);
  console.log(prod);
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  const header = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "images",
      name: "Images",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "rating",
      name: "Rating",
    },{
      key:"created_at",
      name:"Created"
    },
    {
      key:"updated_at",
      name:"Updated"
    }
  ];

  async function handleDelete(id) {
    try {
      const resp = await Axios.delete(`${PRO}/${id}`);
      setProd((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-100 p-3 bg-white">
      <div className="d-flex justify-content-between mb-4">
        <h2>Products Page</h2>
        <button style={{width:"200px"}} className="btn btn-success">
          <NavLink
            to="/dashboard/product/add"
            style={{ color: "white", textDecoration: "none" }}
          >
            Add Products
          </NavLink>
        </button>
      </div>
      <TableShow
        setPage={setPage}
        limit={limit}
        setLimits={setLimits}
        page={page}
        header={header}
        totlaData={totlaData}
        data={prod}
        searchLink={PRO}
loading={loading}
        delete={handleDelete}
        search="title"
      />

      
    </div>
  );
}
