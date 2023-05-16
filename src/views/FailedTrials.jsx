import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { getAllFailedTrials } from "../store/actions/trials/trials-action";
import { getCurrentUser } from "../store/actions/auth/auth-actions";

import checkAuthentication from "../authentication/check-authentication";

import FacetcherTable from "../components/tables/table";
import FacetcherDrawer from "../components/drawer/drawer";
import FacetcherSearchComponent from "../components/search-component";
import FacetcherSelectComponent from "../components/select-component";

import { FAILED_TRIALS, itemsPerPage } from "../constants/app_constants";

const FailedTrials = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [filter, setFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const failedTrials = useSelector((state) => state.trials.allFailedTrials);

    useEffect(() => {
        document.title = "Failed Trials | Facetcher";
    });

    useEffect(() => {
        if (!isDataFetched) {
            dispatch(getCurrentUser());
            dispatch(getAllFailedTrials());
            setIsDataFetched(true);
        }
    }, [dispatch, isDataFetched]);

    const formik = useFormik({
        initialValues: {
            title: "",
            gender: "all",
            date: "default",
        },
        onSubmit: (values) => {
            if (values.title === "" && values.gender === "all" && values.date === "default") resetFilter();
            else setFilter(values);
        },
    });

    const resetFilter = () => {
        formik.resetForm();
        setFilter(null);
    };

    let filteredFailedTrials = [];
    if (failedTrials) filteredFailedTrials = [...failedTrials];
    if (filter) {
        if (filter.date === "latest") {
            filteredFailedTrials = filteredFailedTrials.reverse();
        }
        if (filter.gender !== "all") {
            if (filter.gender === "male") {
                filteredFailedTrials = filteredFailedTrials.filter((failedTrial) => {
                    return failedTrial.gender === "MALE";
                });
            } else if (filter.gender === "female") {
                filteredFailedTrials = filteredFailedTrials.filter((failedTrial) => {
                    return failedTrial.gender === "FEMALE";
                });
            }
        }
        if (filter.title !== "") {
            filteredFailedTrials = filteredFailedTrials.filter((failedTrial) => {
                return (failedTrial.title.toLowerCase().includes(filter.title.toLowerCase()));
            });
        }
    } else if (filter === null) {
        filteredFailedTrials = failedTrials;
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const headerArray = ["ID", "User ID", "Title", "Date", "Time", "Gender", "Exception Occurred"];

    return (
        <div className="w-100">
            <FacetcherDrawer route={FAILED_TRIALS}>
                <div className="p-5 pb-0 w-100 d-flex justify-content-start align-items-center flex-column h-100">
                    <div className="w-100 d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fs-3 fw-bold m-0">Failed Trials</h1>
                    </div>
                    <form
                        onSubmit={formik.handleSubmit}
                        className="w-100 d-flex justify-content-between align-items-end"
                    >
                        <FacetcherSearchComponent
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            placeHolder="Trial Title"
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
                    {filteredFailedTrials && <div className="w-100 mt-5 overflowY-scroll ">
                        <FacetcherTable
                            table={2}
                            headerArray={headerArray}
                            dataLength={filteredFailedTrials.length}
                            initialPage={currentPage}
                            handlePageClick={(e) =>
                                setCurrentPage(e.selected)
                            }
                        >
                            {filteredFailedTrials
                                .slice(startIndex, endIndex)
                                .map((trial, index) => (
                                    <tr className="h-25" key={index} onClick={() => {
                                        navigate(`/failed-trials/` + trial.title.replace(/\s+/g, "-").toLowerCase(),
                                            { state: { trial: trial, }, }
                                        );
                                    }}>
                                        <td>{trial.id}</td>
                                        <td>{trial.userId}</td>
                                        <td>{trial.title}</td>
                                        <td>{new Date(trial.creationDate).toDateString()}</td>
                                        <td>{new Date(trial.creationDate).toLocaleTimeString()}</td>
                                        <td className="text-lowercase">{trial.gender}</td>
                                        <td>{`${trial.exceptionOccurred}`}</td>
                                    </tr>
                                ))}
                        </FacetcherTable>
                    </div>}
                </div>
            </FacetcherDrawer>
        </div>
    );
};
export default checkAuthentication(FailedTrials);
