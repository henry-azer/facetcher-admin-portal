import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../views/Login";
import Home from "../views/Home";
import Profile from "../views/Profile";

import User from "../views/User";
import Users from "../views/Users";
import Admins from "../views/Admins";
import CreateUser from "../views/CreateUser";

import UsersLogs from "../views/UsersLogs";
import UsersMessages from "../views/UsersMessages";

import Submissions from "../views/Submissions";
import Submission from "../views/Submission";

import FailedTrials from "../views/FailedTrials";
import FailedTrial from "../views/FailedTrial";

import PageNotFound from "../views/PageNotFound";

const routes = () => (
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profile" element={<Profile />} />

        <Route exact path="/submissions/:title" element={<Submission />} />
        <Route exact path="/submissions" element={<Submissions />} />

        <Route exact path="/failed-trials/:title" element={<FailedTrial />} />
        <Route exact path="/failed-trials" element={<FailedTrials />} />

        <Route exact path="/users/:username" element={<User />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/admins" element={<Admins />} />
        <Route exact path="/create-user" element={<CreateUser />} />
        
        <Route exact path="/users-logs" element={<UsersLogs />} />
        <Route exact path="/users-messages" element={<UsersMessages />} />

        <Route path="/error" element={<PageNotFound />} />
        <Route path="" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<PageNotFound />} />
    </Routes>
);

export default routes;
