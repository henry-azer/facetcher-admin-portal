import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { getSubmissionById, clearSubmissionById } from "../store/actions/submission/submission-actions";
import { trialsBySubmissionId, clearTrialsBySubmissionId } from "../store/actions/trials/trials-action";
import { getCurrentUser } from "../store/actions/auth/auth-actions";

import checkAuthentication from "../authentication/check-authentication";

import FacetcherTable from "../components/tables/table";
import FacetcherDrawer from "../components/drawer/drawer";

import { itemsPerPage } from "../constants/app_constants";

const Submission = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(0);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const submission = useSelector((state) => state.submissions.submissionById);
    const submissionTrials = useSelector((state) => state.trials.trialsBySubmissionId);

    useEffect(() => {
        document.title = "Submission Details | Facetcher";
    });

    useEffect(() => {
        if (location.state === null) navigate("/error");
        else {
            let submission = location.state.submission;
            if (!isDataFetched) {
                dispatch(getCurrentUser());
                dispatch(getSubmissionById(submission.id));
                dispatch(trialsBySubmissionId(submission.id));
                setIsDataFetched(true);
            }
        }
    }, [dispatch, isDataFetched, location]);

    useEffect(() => {
        return () => {
            dispatch(clearSubmissionById());
            dispatch(clearTrialsBySubmissionId());
        };
    }, []);

    const imgSize = 300;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const headerArray = ["ID", "User ID", "Date", "Time", "Gender", "Drawing", "Output"];

    return (
        <div className="w-100">
            <FacetcherDrawer>
                {submission && submissionTrials && (
                    <div className="w-100 h-100 overflowY-scroll mt-3 p-5">
                        <div className="w-100 d-flex justify-content-between align-items-center mb-4">
                            <h1 className="fs-3 fw-bold m-0">Submission Details</h1>
                        </div>
                        <div className="w-100 d-flex justify-content-center align-items-center">
                            <table className="w-50 mx-3 mb-4" style={{ borderCollapse: "collapse" }}>
                                <tbody>
                                    <tr style={{ border: "1px solid white" }}>
                                        <td style={{ border: "1px solid white", width: "1" }}>ID</td>
                                        <td style={{ border: "1px solid white", width: "3" }}>{submission.id}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid white" }}>
                                        <td style={{ border: "1px solid white", width: "1" }}>User ID</td>
                                        <td style={{ border: "1px solid white", width: "3" }}>{submission.userId}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid white" }}>
                                        <td style={{ border: "1px solid white", width: "1" }}>Gender</td>
                                        <td className="text-lowercase" style={{ border: "1px solid white", width: "3" }}>{submission.gender}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid white" }}>
                                        <td style={{ border: "1px solid white", width: "1" }}>Submitted</td>
                                        <td style={{ border: "1px solid white", width: "3" }}>{`${submission.submitted}`}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid white" }}>
                                        <td style={{ border: "1px solid white", width: "1" }}>Trials Count</td>
                                        <td style={{ border: "1px solid white", width: "3" }}>{submission.trialCount === null ? 0 : submission.trialCount}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid white" }}>
                                        <td style={{ border: "1px solid white", width: "1" }}>Submission Title</td>
                                        <td style={{ border: "1px solid white", width: "3" }}>{submission.title}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid white" }}>
                                        <td style={{ border: "1px solid white", width: "1" }}>Submission Description</td>
                                        <td style={{ border: "1px solid white", width: "3" }}>{submission.description}</td>
                                    </tr>
                                </tbody>
                            </table>
                            {submission.inputImage ||
                                submission.inputImage ? (
                                <div className="gap-5 my-4 d-flex justify-content-around align-items-center">
                                    <div className="text-center">
                                        <h2>Drawing</h2>
                                        <div
                                            className="overflow-hidden rounded-5 grey-border bg-white d-flex justify-content-center align-items-center"
                                            style={{
                                                width: imgSize,
                                                height: imgSize,
                                            }}
                                        >
                                            <img
                                                style={{
                                                    width: imgSize,
                                                    height: imgSize,
                                                }}
                                                alt="drawing"
                                                src={submission.inputImage.imageUrl}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h2>Output</h2>
                                        <div
                                            className="overflow-hidden rounded-5 grey-border"
                                            style={{
                                                width: imgSize,
                                                height: imgSize,
                                            }}
                                        >
                                            <img
                                                className="w-100 rounded-5"
                                                src={submission.outputImage.imageUrl}
                                                alt="output"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (<div></div>)}
                        </div>
                        <FacetcherTable
                            hover
                            table={2}
                            headerArray={headerArray}
                            error="No trails in this submission"
                            dataLength={submissionTrials && submissionTrials.length}
                            initialPage={currentPage}
                            handlePageClick={(e) =>
                                setCurrentPage(e.selected)

                            }
                        >
                            {submissionTrials &&
                                submissionTrials
                                    .slice(startIndex, endIndex)
                                    .map((trial, index) => (
                                        <tr className="h-25" key={index}>
                                            <td>{trial.id}</td>
                                            <td>
                                                {trial.userId}
                                            </td>
                                            <td>
                                                {new Date(trial.creationDate).toDateString()}
                                            </td>
                                            <td>
                                                {new Date(trial.creationDate).toLocaleTimeString()}
                                            </td>
                                            <td className="text-lowercase">
                                                {trial.gender}
                                            </td>
                                            <td>
                                                <img
                                                    className="rounded-4"
                                                    alt="drawing"
                                                    src={trial.inputImage.imageUrl}
                                                    style={{
                                                        width: imgSize / 3,
                                                        height: imgSize / 3,
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <img
                                                    className="rounded-4"
                                                    alt="output"
                                                    src={trial.outputImage.imageUrl}
                                                    style={{
                                                        width: imgSize / 3,
                                                        height: imgSize / 3,
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                        </FacetcherTable>
                    </div>
                )}
            </FacetcherDrawer>
        </div>
    );
};
export default checkAuthentication(Submission);
