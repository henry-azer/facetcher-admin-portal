import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../views/Home";
import Login from "../views/Login";
import Profile from "../views/Profile";

const routes = () => (
     <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
          {/* <Route element={<NotFound />} /> */}
     </Routes>
);

export default routes;
