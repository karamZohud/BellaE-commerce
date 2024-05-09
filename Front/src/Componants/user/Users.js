import React, { useEffect, useState } from "react";
import { USER, USERS, baseUrl } from "../../Api/Api";
import axios from "axios";
import Cookie from "cookie-universal";
import { NavLink } from "react-router-dom";
import { Axios } from "../../Api/axio";
import TableShow from "../Dashboard/Table";
import { Prev } from "react-bootstrap/esm/PageItem";
export default function Users() {
  const [limit, setLimits] = useState(3);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState([]);
  
  const [currentUser, setCurrent] = useState("");
  const [deleteUser, setDeleteUser] = useState(false);
  const [totlaData,setTotalData]=useState(0);

  useEffect(() => {
    const res = Axios.get(`${USER}`).then((res) => setCurrent(res.data));
  }, []);

  useEffect(() => {
    const res=axios
      .get(`${baseUrl}/${USERS}?limit=${limit}&page=${page}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {setUser(data.data.data);
      setTotalData(data.data.totla);
      console.log(data.data);
      })

      .catch((err) => console.log(err));
  }, [deleteUser]);
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  async function handleDelete(id) {
    try {
      const resp = await Axios.delete(`${USER}/${id}`);
      setUser((prev) => prev.filter((item) => item.id !== id));
      
    } catch (err) {
      console.log(err);
    }
  }

  const headerData = [
    {
      key: "name",
      name: "UserName",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
    {
      key:"updated_at",
      name:"last Login"
    }
  ];

  return (
    <div className="w-100 p-3 bg-white">
      <div className="d-flex justify-content-between mb-4">
        <h2>Users Page</h2>
        <button style={{ width: "100px" }} className="btn btn-success">
          <NavLink
            to="/dashboard/user/add"
            style={{ color: "white", textDecoration: "none" }}
          >
            Add User
          </NavLink>
        </button>
      </div>
      <TableShow
        setPage={setPage}
        limit={limit}
        setLimits={setLimits}
        page={page}
        header={headerData}
        totlaData={totlaData}
        data={user}
        search="name"
        searchLink={USER}

        delete={handleDelete}
      />
    </div>
  );
}
