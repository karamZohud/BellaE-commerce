import React from "react";
import HomePage from "./Pages/Wepsite/HomePage";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Users from "./Componants/user/Users";
import GoogleCallBack from "./Pages/Auth/GoogleCallBack";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/RequireAuth";
import User from "../src/Componants/user/User";
import AddUser from "./Componants/user/AddUser";
import Err403 from "./Pages/Auth/403";
import Writer from "./Pages/Auth/Writer";
import Err404 from "./Pages/Auth/404";
import "./Pages/Auth/Auth.css";
import RequireBack from "./Pages/Auth/RequireBack";
import Categories from "./Componants/Dashboard/Category/Categories";
import AddCategory from "./Componants/Dashboard/Category/AddCategory";
import Category from "./Componants/Dashboard/Category/Category";
import Test from "./Pages/Wepsite/Test";
import Products from "./Componants/Dashboard/Product/Products";
import AddProduct from "./Componants/Dashboard/Product/AddProduct";
import UpdateProduct from "./Componants/Dashboard/Product/UpdateProduct";
import WepCategories from "./Componants/Wepsite/CategoriesWepsite/WepCategories";
import Wepsite from "./Componants/Wepsite/navbar/Wepsite";
export default function App() {
  return (
    <div>
      <Routes>
        {/* public route */}
        
         <Route element={<Wepsite/>} >
         <Route path="/" element={<HomePage />} />
         <Route path="/categorie" element={<WepCategories/>} />
         </Route>

       
        <Route element={<RequireBack />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/auth/google/callback" element={<GoogleCallBack />} />
        {/* private route */}

        <Route path="/*" element={<Err404 />} />

        <Route element={<RequireAuth allowedRole={["1996", "1995", "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={"1995"} />}>
              <Route path="users" element={<Users />} />
              <Route path="/dashboard/users/:id" element={<User />} />
              <Route path="user/add" element={<AddUser />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1996", "1995"]} />}>
              <Route path="/dashboard/writer" element={<Writer />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1999", "1995"]} />}>
              {/* Categories */}
              <Route path="/dashboard/categories" element={<Categories />} />
              <Route path="/dashboard/category/add" element={<AddCategory />} />
              <Route path="/dashboard/categories/:id" element={<Category />} />

              {/* Products */}
              <Route path="/dashboard/products" element={<Products />} />
              <Route path="/dashboard/product/add" element={<AddProduct />} />
              <Route path="/dashboard/products/:id" element={<UpdateProduct/>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
// sa das das as  as as 