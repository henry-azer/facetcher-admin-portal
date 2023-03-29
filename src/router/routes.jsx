import React from "react";
import { Routes, Route } from "react-router-dom";
import AllUsers from "../views/AllUsers";
import FailedTrials from "../views/FailedTrials";

import Home from "../views/Home";
import Login from "../views/Login";
import Profile from "../views/Profile";
import Submissions from "../views/Submissions";

const routes = () => (
     <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/submissions" element={<Submissions />} />
          <Route exact path="/failed-trials" element={<FailedTrials />} />
          <Route exact path="/all-users" element={<AllUsers />} />
          {/* <Route element={<NotFound />} /> */}
     </Routes>
);

export default routes;
