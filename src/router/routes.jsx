import React from "react";
import { Routes, Route } from "react-router-dom";
import AllAdmins from "../views/AllAdmins";
import AllUsers from "../views/AllUsers";
import FailedTrials from "../views/FailedTrials";

import Home from "../views/Home";
import Login from "../views/Login";
import Profile from "../views/Profile";
import Submissions from "../views/Submissions";
import Test from "../views/Test";
import UserLogs from "../views/UserLogs";
import CreateUser from "../views/CreateUser";
import Submission from "../views/Submission";
import Messages from "../views/Messages";

const routes = () => (
     <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/submissions" element={<Submissions />} />
          <Route exact path="/submission" element={<Submission />} />
          <Route exact path="/failed-trials" element={<FailedTrials />} />
          <Route exact path="/all-users" element={<AllUsers />} />
          <Route exact path="/all-admins" element={<AllAdmins />} />
          <Route exact path="/users-logs" element={<UserLogs />} />
          <Route exact path="/create-user" element={<CreateUser />} />
          <Route exact path="/messages" element={<Messages />} />
          <Route exact path="/test" element={<Test />} />
          {/* <Route element={<NotFound />} /> */}
     </Routes>
);

export default routes;
