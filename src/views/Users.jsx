import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { getUsers } from "../store/actions/users/users-actions";
import { getCurrentUser } from "../store/actions/auth/auth-actions";

import checkAuthentication from "../authentication/check-authentication";

import FacetcherTable from "../components/tables/table";
import FacetcherDrawer from "../components/drawer/drawer";
import FacetcherSearchComponent from "../components/search-component";
import FacetcherSelectComponent from "../components/select-component";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import { USERS, itemsPerPage } from "../constants/app_constants";

const Users = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [filter, setFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const users = useSelector((state) => state.user.users);

    useEffect(() => {
        document.title = "Users | Facetcher";
    });

    useEffect(() => {
        if (!isDataFetched) {
            dispatch(getCurrentUser());
            dispatch(getUsers());
            setIsDataFetched(true);
        }
    }, [dispatch, isDataFetched]);

    const formik = useFormik({
        initialValues: {
            name: "",
            gender: "all",
            alphabetic: "default",
        },
        onSubmit: (values) => {
            if (values.name === "" && values.gender === "all" && values.alphabetic === "default") resetFilter();
            else setFilter(values);
        },
    });

    const resetFilter = () => {
        formik.resetForm();
        setFilter(null);
    };

    let filteredUsers = [];
    if (users) filteredUsers = [...users];
    if (filter) {
        if (filter.alphabetic === "a-z")
            filteredUsers = filteredUsers.sort(function (a, b) {
                if (
                    a.firstName.toLowerCase() <
                    b.firstName.toLowerCase()
                ) {
                    return -1;
                }
                return 0;
            });
        else if (filter.alphabetic === "z-a")
            filteredUsers = filteredUsers.sort(function (a, b) {
                if (
                    a.firstName.toLowerCase() >
                    b.firstName.toLowerCase()
                ) {
                    return -1;
                }
                return 0;
            });
        if (filter.gender !== "all") {
            if (filter.gender === "male") {
                filteredUsers = filteredUsers.filter((user) => {
                    return user.gender === "MALE";
                });
            } else if (filter.gender === "female") {
                filteredUsers = filteredUsers.filter((user) => {
                    return user.gender === "FEMALE";
                });
            }
        }
        if (filter.name !== "") {
            filteredUsers = filteredUsers.filter((user) => {
                return (
                    user.firstName.toLowerCase().includes(filter.name.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(filter.name.toLowerCase()) ||
                    user.email.toLowerCase().includes(filter.name.toLowerCase())
                );
            });
        }
    } else if (filter === null) {
        filteredUsers = users;
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const headerArray = ["ID", "First Name", "Last Name", "Email", "Gender", "Created Date", "Disabled"];

    return (
        <div className="w-100">
            <FacetcherDrawer route={USERS}>
                <div className="p-5 pb-0 w-100 d-flex justify-content-start align-items-center flex-column h-100">
                    <div className="w-100 d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fs-3 fw-bold m-0">Users</h1>
                        <button
                            onClick={() =>
                                navigate("/create-user", {
                                    state: { userType: "User" },
                                })
                            }
                            className="btn bg-transparent border border-grey light-grey-border fw-bold px-3 rounded-pill text-light-grey"
                        >
                            <PersonAddAltIcon /> Create New User
                        </button>
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
                                label="Gender"
                                name="gender"
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                options={[
                                    "All",
                                    "Male",
                                    "Female",
                                ]}
                            />
                            <FacetcherSelectComponent
                                width="25"
                                label="Alphabetic"
                                name="alphabetic"
                                value={formik.values.alphabetic}
                                onChange={formik.handleChange}
                                options={[
                                    "Default",
                                    "A-Z",
                                    "Z-A",
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
                    {filteredUsers &&
                        <div className="w-100 mt-5 overflowY-scroll ">
                            <FacetcherTable
                                table={2}
                                headerArray={headerArray}
                                dataLength={filteredUsers.length}
                                initialPage={currentPage}
                                handlePageClick={(e) =>
                                    setCurrentPage(e.selected)
                                }
                            >
                                {filteredUsers
                                    .slice(startIndex, endIndex)
                                    .map((user, index) => (
                                        <tr
                                            className="h-25"
                                            key={index}
                                            onClick={() => {
                                                navigate(`/users/` + user.firstName.replace(/\s+/g, "-").toLowerCase()
                                                    + "-" + user.lastName.replace(/\s+/g, "-").toLowerCase(),
                                                    { state: { user: user, userType: "User" }, }
                                                );
                                            }}
                                        >
                                            <td>{user.id}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td className="text-lowercase">{user.gender}</td>
                                            <td>
                                                {new Date(user.creationDate).toDateString()}
                                            </td>
                                            <td className="text-capitalize">
                                                {`${user.markedAsDeleted}`}
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

export default checkAuthentication(Users);