import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { getAllSubmissions } from "../store/actions/submission/submission-actions";
import { getCurrentUser } from "../store/actions/auth/auth-actions";

import checkAuthentication from "../authentication/check-authentication";

import FacetcherTable from "../components/tables/table";
import FacetcherDrawer from "../components/drawer/drawer";
import FacetcherSearchComponent from "../components/search-component";
import FacetcherSelectComponent from "../components/select-component";

import { SUBMISSIONS, itemsPerPage } from "../constants/app_constants";

const Submissions = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [filter, setFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const submissions = useSelector((state) => state.submissions.allSubmissions);

    useEffect(() => {
        document.title = "Submissions | Facetcher";
    });

    useEffect(() => {
        if (!isDataFetched) {
            dispatch(getCurrentUser());
            dispatch(getAllSubmissions());
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

    let filteredSubmissions = [];
    if (submissions) filteredSubmissions = [...submissions];
    if (filter) {
        if (filter.date === "latest") {
            filteredSubmissions = filteredSubmissions.reverse();
        }
        if (filter.gender !== "all") {
            if (filter.gender === "male") {
                filteredSubmissions = filteredSubmissions.filter((submission) => {
                    return submission.gender === "MALE";
                });
            } else if (filter.gender === "female") {
                filteredSubmissions = filteredSubmissions.filter((submission) => {
                    return submission.gender === "FEMALE";
                });
            }
        }
        if (filter.title !== "") {
            filteredSubmissions = filteredSubmissions.filter((submission) => {
                return (submission.title.toLowerCase().includes(filter.title.toLowerCase()));
            });
        }
    } else if (filter === null) {
        filteredSubmissions = submissions;
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const headerArray = ["ID", "User ID", "Title", "Date", "Time", "Gender", "Trials Count", "Submitted"];

    return (
        <div className="w-100">
            <FacetcherDrawer route={SUBMISSIONS}>
                <div className="p-5 pb-0 w-100 d-flex justify-content-start align-items-center flex-column h-100">
                    <div className="w-100 d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fs-3 fw-bold m-0">Submissions</h1>
                    </div>
                    <form
                        onSubmit={formik.handleSubmit}
                        className="w-100 d-flex justify-content-between align-items-end"
                    >
                        <FacetcherSearchComponent
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            placeHolder="Submission Title"
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
                    {filteredSubmissions && <div className="w-100 mt-5 overflowY-scroll ">
                        <FacetcherTable
                            table={2}
                            headerArray={headerArray}
                            dataLength={filteredSubmissions.length}
                            initialPage={currentPage}
                            handlePageClick={(e) =>
                                setCurrentPage(e.selected)
                            }
                        >
                            {filteredSubmissions &&
                                filteredSubmissions
                                    .slice(startIndex, endIndex)
                                    .map((submission, index) => (
                                        <tr
                                            className="h-25"
                                            key={index}
                                            onClick={() => {
                                                navigate(`/submissions/` + submission.title.replace(/\s+/g, "-").toLowerCase(),
                                                    { state: { submission: submission, }, }
                                                );
                                            }}
                                        >
                                            <td>{submission.id}</td>
                                            <td>{submission.userId}</td>
                                            <td>
                                                {submission.title}
                                            </td>
                                            <td>
                                                {new Date(submission.creationDate).toDateString()}
                                            </td>
                                            <td>
                                                {new Date(submission.creationDate).toLocaleTimeString()}
                                            </td>
                                            <td className="text-lowercase">{submission.gender}</td>
                                            <td className="text-capitalize">{submission.trialCount === null ? 0 : submission.trialCount}</td>
                                            <td>{`${submission.submitted}`}</td>
                                        </tr>
                                    ))}
                        </FacetcherTable>
                    </div>}
                </div>
            </FacetcherDrawer>
        </div>
    );
};
export default checkAuthentication(Submissions);
