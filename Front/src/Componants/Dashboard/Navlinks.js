import { faCartShopping, faPlus, faTruckFast, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";


 export const link = [
    {
      name: "Users",
      path: "/dashboard/users",
      icon: faUser,
      role: "1995",
    },
    {
      name: "add User",
      path: "/dashboard/user/add",
      icon: faPlus,
      role: "1995",
    },
    {
      name: "Categories",
      path: "/dashboard/categories",
      icon: faCartShopping,
      role: ["1995", "1999"],
    },
    {
      name: "Add Categories",
      path: "/dashboard/category/add",
      icon: faPlus,
      role: ["1995", "1999"],
    },
    {
      name: "Products",
      path: "/dashboard/products",
      icon: faTruckFast,
      role: ["1995", "1999"],
    },
    {
      name: "Add Product",
      path: "/dashboard/product/add",
      icon: faPlus,
      role: ["1995", "1999"],
    },
   
  ];

