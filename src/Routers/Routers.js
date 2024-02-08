import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Factories/Acount/Login";
import DrawerScreen from "./Drawer";
import Home from "../Factories/Home/Home";
import CalendarManagement from "../Factories/CalendarManagement/CalendarManagement";
import UserGroup from "../Factories/UserGroup/UserGroup";
export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>

        <Route element={<DrawerScreen />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/CalendarManagement" element={<CalendarManagement />} />
          <Route path="/UserGroup" element={<UserGroup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
