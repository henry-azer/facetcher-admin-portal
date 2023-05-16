import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { getUsersMessages } from "../store/actions/users-messages/users-messages-actions";
import { getCurrentUser } from "../store/actions/auth/auth-actions";

import checkAuthentication from "../authentication/check-authentication";

import FacetcherTable from "../components/tables/table";
import FacetcherDrawer from "../components/drawer/drawer";
import FacetcherSearchComponent from "../components/search-component";

import { USERS_MESSAGES, itemsPerPage } from "../constants/app_constants";

const UsersMessages = () => {
    const dispatch = useDispatch();

    const [filter, setFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const usersMessages = useSelector((state) => state.messages.usersMessages);

    useEffect(() => {
        document.title = "Users Messages | Facetcher";
    });

    useEffect(() => {
        if (!isDataFetched) {
            dispatch(getCurrentUser());
            dispatch(getUsersMessages());
            setIsDataFetched(true);
        }
    }, [dispatch, isDataFetched]);

    const formik = useFormik({
        initialValues: {
            title: "",
            username: "",
        },
        onSubmit: (values) => {
            if (values.title === "" && values.username === "") resetFilter();
            else setFilter(values);
        },
    });

    const resetFilter = () => {
        formik.resetForm();
        setFilter(null);
    };

    let filteredUsersMessages = [];
    if (usersMessages) filteredUsersMessages = [...usersMessages];
    if (filter) {
        if (filter.title !== "") {
            filteredUsersMessages = filteredUsersMessages.filter((userMessage) => {
                return (userMessage.title.toLowerCase().includes(filter.title.toLowerCase()));
            });
        }
        if (filter.username !== "") {
            filteredUsersMessages = filteredUsersMessages.filter((userMessage) => {
                return (
                    userMessage.user.firstName.toLowerCase().includes(filter.username.toLowerCase()) ||
                    userMessage.user.lastName.toLowerCase().includes(filter.username.toLowerCase()) ||
                    userMessage.user.email.toLowerCase().includes(filter.username.toLowerCase())
                );
            });
        }
    } else if (filter === null) {
        filteredUsersMessages = usersMessages;
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const headerArray = ["ID", "User Name", "User Email", "Title", "Message", "Date", "Time"];

    return (
        <div className="w-100">
            <FacetcherDrawer route={USERS_MESSAGES}>
                <div className="p-5 pb-0 w-100 d-flex justify-content-start align-items-center flex-column h-100">
                    <div className="w-100 d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fs-3 fw-bold m-0">Users Messages</h1>
                    </div>
                    <form
                        onSubmit={formik.handleSubmit}
                        className="w-100 d-flex justify-content-between align-items-end"
                    >
                        <FacetcherSearchComponent
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            placeHolder="User Name"
                        />
                        <FacetcherSearchComponent
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            placeHolder="Message Title"
                        />
                        <div className="w-25 d-flex justify-content-end">
                            <button
                                onClick={() => resetFilter()}
                                className="btn bg-orange rounded-pill px-5 text-light-grey fw-bold me-2"
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                onClick={() => setCurrentPage(0)}
                                className="btn bg-cyan rounded-pill px-5 text-light-grey fw-bold"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                    {filteredUsersMessages &&
                        <div className="w-100 mt-5 overflowY-scroll ">
                            <FacetcherTable
                                table={2}
                                headerArray={headerArray}
                                dataLength={filteredUsersMessages.length}
                                initialPage={currentPage}
                                handlePageClick={(e) =>
                                    setCurrentPage(e.selected)
                                }
                            >
                                {filteredUsersMessages
                                    .slice(startIndex, endIndex)
                                    .map((userMessage, index) => (
                                        <tr className="h-25" key={index}>
                                            <td>{userMessage.id}</td>
                                            <td>
                                                {userMessage.user.firstName} {" "} {userMessage.user.lastName}
                                            </td>
                                            <td>
                                                {userMessage.user.email}
                                            </td>
                                            <td>
                                                {userMessage.title}
                                            </td>
                                            <td>
                                                {userMessage.message}
                                            </td>
                                            <td>
                                                {new Date(userMessage.creationDate).toDateString()}
                                            </td>
                                            <td>
                                                {new Date(userMessage.creationDate).toLocaleTimeString()}
                                            </td>
                                        </tr>
                                    ))}
                            </FacetcherTable>
                        </div>}
                </div>
            </FacetcherDrawer>
        </div>
    );
};
export default checkAuthentication(UsersMessages);
