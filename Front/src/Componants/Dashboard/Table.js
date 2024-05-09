import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { Axios } from "../../Api/axio";
import PaginatedItems from "./pagintion/Pagination";
import { Form } from "react-bootstrap";
import TranformDate from "../../helpers/TranformDate";
export default function TableShow(props) {
  const currentUser = props.currentUser || {
    name: "",
  };
  const [search, setSearch] = useState("");
  const [searchBYdate, setSearchDate] = useState("");

  const [searchLoading, setSearchLodaing] = useState(false);
  const [debouns, setDebouns] = useState(false);
  const [filterD, setFilter] = useState([]);


  const filtedDate = props.data.filter(
    (item) => searchBYdate === TranformDate(item.created_at)
  );

console.log(filterD);
const filterDSearchByDate=filterD.filter((item)=>
   searchBYdate === TranformDate(item.created_at)
)
const showData =
searchBYdate.length!==0?
search.length > 0 ? filterDSearchByDate :filtedDate :search.length>0?filterD:props.data;
  // const start=(props.page-1)*props.limit;
  // const end= Number(start) + Number(props.limit);
  // const final=props.data.slice(start,end);

  //Search Function
console.log(searchBYdate);
console.log(search);

  async function handleSearch() {
    try {
      const resp = await Axios.post(
        `${props.searchLink}/search?title=${search}`
      );
      console.log(resp);
      setFilter(resp.data);
      
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLodaing(false);
    }
  }

  useEffect(() => {
    const time = setTimeout(() => {
      search.length > 0 && handleSearch();
      console.log("time out is on");
      search.length==0 && setSearchLodaing(false);
    }, 500);
    return () => clearTimeout(time);
  }, [search]);

  // Header Show
  const headerShow = props.header.map((item) => (
    <th style={{ color: "white", paddingBottom: "13px" }}>{item.name}</th>
  ));

  // data show

  const dataShow = showData.map((item, key) => (
    <tr key={key}>
      <td>{item.id}</td>
      {props.header.map((item2, key2) => (
        <td key={key2}>
          {item2.key === "image" ? (
            <img width="40px" src={item[item2.key]} alt="" />
          ) : item2.key === "images" ? (
            item[item2.key].map((img) => (
              <img
                width="40px"
                height="40px"
                className="me-2"
                src={img.image}
                alt=""
              />
            ))
          ) : item2.key === "created_at" || item2.key === "updated_at" ? (
            TranformDate(item[item2.key])
          ) : item[item2.key] === "1995" ? (
            "Admin"
          ) : item[item2.key] == "2001" ? (
            "User"
          ) : item[item2.key] == "1996" ? (
            "writer"
          ) : item[item2.key] === "1999" ? (
            "Product Manger"
          ) : (
            item[item2.key]
          )}

          {currentUser.name && props.currentUser.name === item[item2.key] && (
            <> (You)</>
          )}
        </td>
      ))}
      <td>
        <div className="d-flex">
          <div>
            <Link to={`${item.id}`}>
              <FontAwesomeIcon
                className="ms-2 me-2 "
                style={{ cursor: "pointer", color: "green", fontSize: "20px" }}
                icon={faPenToSquare}
              />
            </Link>
          </div>
          <div>
            {currentUser.name !== item.name && item.role !== "1995" && (
              <FontAwesomeIcon
                onClick={() => props.delete(item.id)}
                icon={faTrash}
                style={{
                  cursor: "pointer",
                  color: "#b71b1b",
                  fontSize: "20px",
                }}
              />
            )}
          </div>
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="card">
      <div className="card-body p-1">
        <div className="w-50 d-flex flex-column">
        <Form.Control
          type="search"
         
          className="my-2 ms-2"
          placeholder="Search"
          aria-label="serchEx"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchLodaing(true);
          }}
        />
        <Form.Control
          type="date"
         
          className="my-2 ms-2"
          placeholder="Search"
          aria-label="serchEx"
          value={searchBYdate}
          onChange={(e) => {
            setSearchDate(e.target.value);
           
          }}
        />
        </div>
    
        <Table className="isBorder" responsive striped hover>
          <thead className="table-dark" style={{ height: "50px" }}>
            <tr key={0}>
              <th style={{ color: "white", paddingBottom: "13px" }}>Id</th>
              {headerShow}
              <th style={{ color: "white", paddingBottom: "13px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.loading || searchLoading === true ? (
              <tr>
                <td
                  colSpan={12}
                  style={{ textAlign: "center", fontSize: "20PX" }}
                >
                  {"Loading ..."}
                </td>
              </tr>
            ) : (
              dataShow
            )}
          </tbody>
        </Table>
        <div className="d-flex align-items-center justify-content-end flex-wrap">
          <div className="col-1">
            <Form.Select onChange={(e) => props.setLimits(e.target.value)}>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </Form.Select>
          </div>
          <PaginatedItems
            totlaData={props.totlaData}
            setPage={props.setPage}
            itemsPerPage={props.limit}
            data={props.data}
          />
        </div>
      </div>
    </div>
  );
}
