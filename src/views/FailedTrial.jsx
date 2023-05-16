import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { getTrialById, clearTrialById } from "../store/actions/trials/trials-action";
import { getCurrentUser } from "../store/actions/auth/auth-actions";

import checkAuthentication from "../authentication/check-authentication";

import FacetcherDrawer from "../components/drawer/drawer";

const FailedTrial = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [isDataFetched, setIsDataFetched] = useState(false);

    const failedTrial = useSelector((state) => state.trials.trial);

    useEffect(() => {
        document.title = "Failed Trial Details | Facetcher";
    });

    useEffect(() => {
        if (location.state === null) navigate("/error");
        else {
            let trial = location.state.trial;
            if (!isDataFetched) {
                dispatch(getCurrentUser());
                dispatch(getTrialById(trial.id));
                setIsDataFetched(true);
            }
        }
    }, [dispatch, isDataFetched, location]);

    useEffect(() => {
        return () => {
            dispatch(clearTrialById());
        };
    }, []);

    const imgSize = 300;

    return (
        <div className="w-100">
            <FacetcherDrawer>
                {failedTrial && (
                    <div className="w-100 h-100 overflowY-scroll mt-3 p-5">
                        <div className="w-100 d-flex justify-content-between align-items-center mb-4">
                            <h1 className="fs-3 fw-bold m-0">Failed Trial Details</h1>
                        </div>
                        <div className="w-10 d-flex justify-content-around align-items-center">
                            <table className="w-50 mx-3 mb-4" style={{ borderCollapse: "collapse" }}>
                                <tbody>
                                    <tr style={{ border: "1px solid white" }}>
                                        <td style={{ border: "1px solid white", width: "1" }}>ID</td>
                                        <td style={{ border: "1px solid white", width: "3" }}>{failedTrial.id}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid white" }}>
                                        <td style={{ border: "1px solid white", width: "1" }}>User ID</td>
                                        <td style={{ border: "1px solid white", width: "3" }}>{failedTrial.userId}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid white" }}>
                                        <td style={{ border: "1px solid white", width: "1" }}>Gender</td>
                                        <td className="text-lowercase" style={{ border: "1px solid white", width: "3" }}>{failedTrial.gender}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid white" }}>
                                        <td style={{ border: "1px solid white", width: "1" }}>Trial Title</td>
                                        <td style={{ border: "1px solid white", width: "3" }}>{failedTrial.title}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid white" }}>
                                        <td style={{ border: "1px solid white", width: "1" }}>Trial Description</td>
                                        <td style={{ border: "1px solid white", width: "3" }}>{failedTrial.description}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid white" }}>
                                        <td style={{ border: "1px solid white", width: "1" }}>Trial Date</td>
                                        <td style={{ border: "1px solid white", width: "3" }}>{new Date(failedTrial.trialDate).toDateString()}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid white" }}>
                                        <td style={{ border: "1px solid white", width: "1" }}>Trial Time</td>
                                        <td style={{ border: "1px solid white", width: "3" }}>{new Date(failedTrial.trialDate).toLocaleTimeString()}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid white" }}>
                                        <td style={{ border: "1px solid white", width: "1" }}>Exception Occurred</td>
                                        <td style={{ border: "1px solid white", width: "3" }}>{`${failedTrial.exceptionOccurred}`}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid white" }}>
                                        <td style={{ border: "1px solid white", width: "1" }}>Exception Message</td>
                                        <td style={{ border: "1px solid white", width: "3" }}>{failedTrial.exceptionMessage}</td>
                                    </tr>
                                </tbody>
                            </table>
                            {failedTrial.inputImage ||
                                failedTrial.inputImage ? (
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
                                                src={failedTrial.inputImage.imageUrl}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (<div></div>)}
                        </div>
                    </div>
                )}
            </FacetcherDrawer>
        </div>
    );
};

export default checkAuthentication(FailedTrial);