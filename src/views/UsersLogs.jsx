import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { getUsersLogs } from "../store/actions/users-logs/users-logs-actions";
import { getCurrentUser } from "../store/actions/auth/auth-actions";

import checkAuthentication from "../authentication/check-authentication";

import FacetcherTable from "../components/tables/table";
import FacetcherDrawer from "../components/drawer/drawer";
import FacetcherSearchComponent from "../components/search-component";
import FacetcherSelectComponent from "../components/select-component";

import { USERS_LOGS, itemsPerPage } from "../constants/app_constants";

const UsersLogs = () => {
    const dispatch = useDispatch();

    const [filter, setFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const usersLogs = useSelector((state) => state.logs.usersLogs);

    useEffect(() => {
        document.title = "Users Logs | Facetcher";
    });

    useEffect(() => {
        if (!isDataFetched) {
            dispatch(getCurrentUser());
            dispatch(getUsersLogs());
            setIsDataFetched(true);
        }
    }, [dispatch, isDataFetched]);

    const formik = useFormik({
        initialValues: {
            name: "",
            date: "default",
            activity: "default",
        },
        onSubmit: (values) => {
            if (values.name === "" && values.date === "default" && values.activity === "default") resetFilter();
            else setFilter(values);
        },
    });

    const resetFilter = () => {
        formik.resetForm();
        setFilter(null);
    };

    let filteredUsersLogs = [];
    if (usersLogs) filteredUsersLogs = [...usersLogs];
    if (filter) {
        if (filter.date === "latest") {
            filteredUsersLogs = usersLogs.reverse();
        }
        if (filter.activity !== "default") {
            if (filter.activity === "login") {
                filteredUsersLogs = usersLogs.filter((obj) => {
                    return obj.logStatus === "LOGIN";
                });
            } else {
                filteredUsersLogs = usersLogs.filter((obj) => {
                    return obj.logStatus === "LOGOUT";
                });
            }
        }
        if (filter.name !== "") {
            filteredUsersLogs = filteredUsersLogs.filter((obj) => {
                return (
                    obj.user.firstName.toLowerCase().includes(filter.name.toLowerCase()) ||
                    obj.user.lastName.toLowerCase().includes(filter.name.toLowerCase()) ||
                    obj.user.email.toLowerCase().includes(filter.name.toLowerCase())
                );
            });
        }
    } else if (filter === null) {
        filteredUsersLogs = usersLogs;
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const headerArray = ["ID", "User Name", "Activity", "Date", "Time"];

    return (
        <div className="w-100">
            <FacetcherDrawer route={USERS_LOGS}>
                <div className="p-5 pb-0 w-100 d-flex justify-content-start align-items-center flex-column h-100">
                    <div className="w-100 d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fs-3 fw-bold m-0">Users Logs</h1>
                    </div>
                    <form
                        onSubmit={formik.handleSubmit}
                        className="w-100 d-flex justify-content-between align-items-end"
                    >
                        <FacetcherSearchComponent
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            placeHolder="User name"
                        />
                        <div className="w-50 d-flex justify-content-around">
                            <FacetcherSelectComponent
                                width="25"
                                label="Activity"
                                name="activity"
                                value={formik.values.activity}
                                onChange={formik.handleChange}
                                options={[
                                    "Default",
                                    "Login",
                                    "Logout",
                                ]}
                            />
                            <FacetcherSelectComponent
                                width="25"
                                label="Date"
                                name="date"
                                value={formik.values.date}
                                onChange={formik.handleChange}
                                options={[
                                    "Default",
                                    "Newest",
                                    "Latest",
                                ]}
                            />
                        </div>
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
                    {filteredUsersLogs && <div className="w-100 mt-5 overflowY-scroll ">
                        <FacetcherTable
                            table={2}
                            headerArray={headerArray}
                            dataLength={filteredUsersLogs.length}
                            initialPage={currentPage}
                            handlePageClick={(e) =>
                                setCurrentPage(e.selected)
                            }
                        >
                            {filteredUsersLogs
                                .slice(startIndex, endIndex)
                                .map((userLog, index) => (
                                    <tr className="h-25" key={index}
                                    >
                                        <td>{userLog.id}</td>
                                        <td className="text-capitalize">
                                            {userLog.user.firstName}{" "}{userLog.user.lastName}
                                        </td>
                                        <td className="text-capitalize">
                                            {userLog.logStatus}
                                        </td>
                                        <td className="text-capitalize">
                                            {new Date(userLog.creationDate).toDateString()}
                                        </td>
                                        <td className="text-capitalize">
                                            {new Date(userLog.creationDate).toLocaleTimeString()}
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
export default checkAuthentication(UsersLogs);
