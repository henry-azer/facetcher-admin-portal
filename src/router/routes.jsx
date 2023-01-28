import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../views/Home";

const routes = () => (
    <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route element={<NotFound />} /> */}
    </Routes>
);

export default routes;
