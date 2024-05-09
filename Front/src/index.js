import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./css/base/media.css";
import "./Pages/Auth/Auth.css";
import "./css/Componants/button.css";
import "./css/Componants/Alerts.css";
import "./css/Componants/Loading.css";
import "./css/dashboard/topbar.css";
import "./css/dashboard/sideBar.css";
import "./des.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import Context from "./Context/Context";
import WindowContext from "./Context/WindowContext";
import 'react-loading-skeleton/dist/skeleton.css'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   <WindowContext>
   <Context>
        <Router>
          <App />
        </Router>
      </Context>
   </WindowContext>
    
 
  </React.StrictMode>
);
