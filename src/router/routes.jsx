import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../views/Home";
import Login from "../views/Login";

const routes = () => (
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        {/* <Route element={<NotFound />} /> */}
    </Routes>
);

export default routes;
