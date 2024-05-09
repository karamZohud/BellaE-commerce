import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faUser,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";
import { Menu } from "../../Context/Context";
import { WindowSize } from "../../Context/WindowContext";
import { Axios } from "../../Api/axio";
import { USER } from "../../Api/Api";
import { link } from "./Navlinks";

export default function SideBar() {
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;
  const windowContext = useContext(WindowSize);
  const windowSize = windowContext.size;
console.log();
  const [user, setUser] = useState("");
  useEffect(() => {
    const res = Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch((error) => (window.location.pathname = "/login"));
  }, []);


  return (
    <>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: "6vh",
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.2)",
            display: windowSize < 768 ? "block" : "none",
          }}
        ></div>
      )}
      <div
        style={{
          position: windowSize < 768 ? "fixed" : "sticky",
          left: windowSize < "768" ? (isOpen ? 0 : "-100%") : 0,
          minWidth: windowSize < "768" ? "22vh" : isOpen ? "22vh" : "8vh",
        }}
        className="sidebar"
      >
        <ul
          style={{
            marginLeft: "10px",
            width: isOpen ? (windowSize < "768" ? "22vh" : "90%") : "6vh",
          }}
          className="d-flex  navbar-nav  flex-column p-0 "
        >
         
            <>
           
             
              {link.map((links,key)=>
                <li key={key}
                style={{ width: isOpen ? "100%" : "75%" }}
                className=" sideBarLink "
              >
          
                <NavLink to={links.path}>
                  <FontAwesomeIcon
                    style={{ marginLeft: "12px" }}
                    icon={links.icon}
                  />
                  <p
                    className="ms-2"
                    style={{
                      display:
                        windowSize < "768" ? "" : isOpen ? "block" : "none",
                    }}
                  >
                    {links.name}
                  </p>
                </NavLink>
              </li>
              )}
             
            
             </>
    
        </ul>
      </div>
    </>
  );
}
