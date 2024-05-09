import React from "react";
import Cookie from "cookie-universal"
import { Navigate, Outlet } from "react-router-dom";
export default function RequireBack() {
const cookie=new Cookie();
const token =cookie.get("e-commerce");
  return token?window.history.back():<Outlet/>;
}
