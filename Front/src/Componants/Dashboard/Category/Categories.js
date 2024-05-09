import React, { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { Axios } from "../../../Api/axio";
import { CAT, CATEGORIES, USER, USERS, baseUrl } from "../../../Api/Api";
import { NavLink } from "react-router-dom";
import TableShow from "../Table";
import PaginatedItems from "../pagintion/Pagination";
import { Form } from "react-bootstrap";
export default function Categories() {
  const [cat, setCat] = useState([]);
  const [limit, setLimits] = useState(3);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
 
  const [totlaData, setTotalData] = useState(0);
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  const header = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "image",
      name: "Image",
    },
    {
      key:"created_at",
      name:"Created"
    },
    {
      key:"updated_at",
      name:"Updated"
    }
  ];

  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CATEGORIES}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCat(data.data.data);
        setTotalData(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);
  console.log(cat);
  async function handleDelete(id) {
    
    try {
      const resp = await Axios.delete(`${CAT}/${id}`);
      setCat((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }





  return (
    <div className="w-100 p-3 bg-white">
      <div className="d-flex justify-content-between mb-4">
        <h2>Categories Page</h2>
        <button style={{ width: "100px" }} className="btn btn-success">
          <NavLink
            to="/dashboard/category/add"
            style={{ color: "white", textDecoration: "none" }}
          >
            Add Categories
          </NavLink>
        </button>
      </div>
      
      
      <TableShow
        page={page}
        setPage={setPage}
        limit={limit}
        setLimits={setLimits}
        header={header}
        data={cat}
        search="title"
        totlaData={totlaData}
        loading={loading}
        searchLink={CAT}
        delete={handleDelete}
      />
    </div>
  );
}
