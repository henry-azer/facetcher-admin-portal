import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {
    getAllUserSubmissionsById,
    clearGetAllUserSubmissionsById,
} from "../store/actions/submission/submission-actions";
import {
    getFailedUserTrialsCount,
    clearGetFailedUserTrialsCount,
    getSucceededUserTrialsCount,
    clearGetSucceededUserTrialsCount,
} from "../store/actions/trials/trials-action";
import {
    getCurrentUser,
} from "../store/actions/auth/auth-actions";
import {
    updateUser,
    clearUpdateUser,
    getUserById,
    clearGetUserById,
    toggleUserAccountDeletion,
    clearToggleUserAccountDeletion,
} from "../store/actions/users/users-actions";

import checkAuthentication from "../authentication/check-authentication";

import FacetcherDrawer from "../components/drawer/drawer";
import PersonIcon from "@mui/icons-material/Person";

import FacetcherTable from "../components/tables/table";
import FacetcherCircularChart from "../components/charts/circularChart";

const User = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(0);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [isUserToggledDeletion, setIsUserToggledDeletion] = useState(null);

    let user = useSelector((state) => state.user.userById);
    const userSubmissions = useSelector((state) => state.submissions.allUserSubmissions);
    const userFailedTrialsCount = useSelector((state) => state.trials.failedUserCount);
    const userSucceededTrialsCount = useSelector((state) => state.trials.succeededUserCount);

    const updatedUser = useSelector((state) => state.user.updatedUser);
    const updateUserRequest = useSelector((state) => state.user.updateUserRequest);
    const updateUserError = useSelector((state) => state.user.updateUserError);
    const updateUserErrorOccurred = useSelector((state) => state.user.updateUserErrorOccurred);
    const updatedUserMessage = useSelector((state) => state.user.updatedUserMessage);

    const toggleDeletionUserRequest = useSelector((state) => state.user.toggleDeletionUserRequestRequest);
    const toggleDeletionUserError = useSelector((state) => state.user.toggleDeletionUserError);
    const toggleDeletionUserErrorOccurred = useSelector((state) => state.user.toggleDeletionUserErrorOccurred);
    const toggleDeletionUserMessage = useSelector((state) => state.user.toggleDeletionUserMessage);

    useEffect(() => {
        if (location.state === null) navigate("/error");
        else {
            document.title = location.state.userType
                ? `${location.state.userType} Profile | Facetcher`
                : "Profile | Facetcher";

            if (!isDataFetched) {
                dispatch(getCurrentUser());
                dispatch(getUserById(location.state.user.id));
                setIsUserToggledDeletion(location.state.user.markedAsDeleted)
                setIsDataFetched(true);
            }
        }
    }, [dispatch, location]);

    useEffect(() => {
        if (user && user.id) {
            dispatch(getFailedUserTrialsCount(user.id));
            dispatch(getAllUserSubmissionsById(user.id));
            dispatch(getSucceededUserTrialsCount(user.id));
        }
    }, [dispatch, user]);

    useEffect(() => {
        return () => {
            dispatch(clearUpdateUser());
            dispatch(clearGetUserById());
            dispatch(clearToggleUserAccountDeletion());
            dispatch(clearGetFailedUserTrialsCount());
            dispatch(clearGetAllUserSubmissionsById());
            dispatch(clearGetSucceededUserTrialsCount());
        };
    }, []);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        phoneNumber: Yup.string().required('Phone Number is required'),
    });

    const handleSubmit = (values) => {
        dispatch(clearUpdateUser());
        user.firstName = values.firstName;
        user.lastName = values.lastName;
        user.phoneNumber = values.phoneNumber;
        dispatch(updateUser(user));
        user = updatedUser;
    };

    const handleToggleUserAccountDeletion = () => {
        dispatch(clearToggleUserAccountDeletion());
        dispatch(toggleUserAccountDeletion(user.id));
        setIsUserToggledDeletion(!isUserToggledDeletion);
    }

    const itemsPerPage = 3;
    const startIndex = currentPage * (itemsPerPage - 1);
    const endIndex = startIndex + itemsPerPage;
    const headerArray = ["ID", "User ID", "Title", "Date", "Time", "Gender", "Trials Count", "Submitted"];

    return (
        <FacetcherDrawer>
            <div className="row h-100 justify-content-center align-items-center gx-2 mt-5 overflowY-scroll">
                {user && (
                    <div className="col-lg-4 col-12 bg-dark-grey mx-2 p-3 position-relative d-flex justify-content-center h-100 overflow-hidden">
                        <div className=" bg-dark-grey2 w-100 h-20 user-profile-pic position-absolute top-0"></div>
                        <div className=" rounded-circle bg-cyan grey-border user-profile-pic position-absolute top-0 overflow-hidden">
                            <div className="w-100 h-100 d-flex justify-content-center align-items-center overflow-hidden position-relative">
                                {user.profilePictureUrl ? (
                                    <img src={user.profilePictureUrl}
                                        alt="User Profile"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }} />
                                ) : (<PersonIcon sx={{ fontSize: 160, }} />)}
                            </div>
                        </div>
                        <div className=" align-self-end h-75 pt-5 text-center">
                            <h1 className="mt-3 fs-4 fw-bold">{user.firstName} {" "} {user.lastName}</h1>
                            <h1 className="fs-6 text-cyan">{user.email}</h1>
                            <div className="d-flex justify-content-center align-items-center mx-2">
                                {user.userRoles.map((userRole, index) => (
                                    <div key={index}>
                                        {index !== 0 && <span className="mx-1">-</span>}
                                        <span className="text-capitalize">{userRole.role.name.toLowerCase()}</span>
                                    </div>
                                ))}
                            </div>
                            <Formik
                                initialValues={{
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    phoneNumber: user.phoneNumber
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ errors, touched }) => (
                                    <Form className="d-flex justify-content-center align-items-center flex-column mx-5 mt-3">
                                        {!updateUserErrorOccurred && !updateUserRequest && updatedUserMessage && (<h6>* {updatedUserMessage}</h6>)}
                                        {updateUserErrorOccurred && <h6>* {updateUserError}</h6>}
                                        {!toggleDeletionUserErrorOccurred && !toggleDeletionUserRequest && toggleDeletionUserMessage && (<h6>* {toggleDeletionUserMessage}</h6>)}
                                        {toggleDeletionUserErrorOccurred && <h6>* {toggleDeletionUserError}</h6>}
                                        <div className="row justify-content-center align-items-center">
                                            <div className="col-lg-6 col-12">
                                                <Field
                                                    type="text"
                                                    name="firstName"
                                                    placeholder="First Name"
                                                    className={`form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-100 ${errors.firstName && touched.firstName ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="col-lg-6 col-12">
                                                <Field
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="Last Name"
                                                    className={`form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-100 ${errors.lastName && touched.lastName ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <Field
                                            type="text"
                                            name="phoneNumber"
                                            placeholder="Phone Number"
                                            className={`form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-100 ${errors.phoneNumber && touched.phoneNumber ? 'is-invalid' : ''}`}
                                        />
                                        <ErrorMessage name="phoneNumber" component="div" className="invalid-feedback" />
                                        <div className="w-100 d-flex justify-content-between gap-4">
                                            <button
                                                type="submit"
                                                className="btn bg-cyan text-light-grey rounded-pill w-50 mt-4 fw-bold"
                                            >
                                                {updateUserRequest ? "Loading ..." : `Save Changes`}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleToggleUserAccountDeletion()}
                                                className={`btn text-light-grey rounded-pill w-50 mt-4 fw-bold ${isUserToggledDeletion ? "bg-green" : "bg-orange"}`}>
                                                {isUserToggledDeletion ? "Enable Account" : "Disable Account"}
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                )}
                {user && (
                    <div className="col bg-dark-grey mx-2 p-3 h-100 overflowY-scroll px-5 pt-3 pb-5">
                        <div className="row justify-content-center align-items-center h-25 w-100">
                            <div className="col-6 ">
                                <h1 className=" fs-3 fw-bold">
                                    Total User Trials:{" "} {userSucceededTrialsCount + userFailedTrialsCount}
                                </h1>
                                <h1 className="fs-5 text-cyan fw-bold">
                                    Succeeded Trials:{" "} {userSucceededTrialsCount}
                                </h1>
                                <h1 className="fs-5 text-orange fw-bold">
                                    Failed Trials: {userFailedTrialsCount}
                                </h1>
                            </div>
                            <div className="col-3 d-flex justify-content-center align-items-center">
                                <FacetcherCircularChart
                                    width={75}
                                    color="cyan"
                                    strokeWidth={6}
                                    value={userSucceededTrialsCount}
                                    maxValue={userSucceededTrialsCount + userFailedTrialsCount}
                                />
                            </div>
                            <div className="col-3 d-flex justify-content-center align-items-center">
                                <FacetcherCircularChart
                                    width={75}
                                    color="orange"
                                    strokeWidth={6}
                                    value={userFailedTrialsCount}
                                    maxValue={userSucceededTrialsCount + userFailedTrialsCount}
                                />
                            </div>
                        </div>
                        <div className="pt-5 mb-5">
                            <h1 className="fs-3 fw-bold py-4">Submissions History</h1>
                            <div>
                                {userSubmissions && (
                                    <FacetcherTable
                                        table={1}
                                        dataLength={userSubmissions.length}
                                        initialPage={currentPage}
                                        handlePageClick={(e) => setCurrentPage(e.selected)}
                                        headerArray={headerArray}
                                        headerColor="bg-dark-grey2"
                                        bodyColor="bg-dark-grey"
                                    >
                                        {userSubmissions
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
                                                    <td>{submission.title}</td>
                                                    <td>{new Date(submission.creationDate).toDateString()}</td>
                                                    <td>{new Date(submission.creationDate).toLocaleTimeString()}</td>
                                                    <td className="text-lowercase">{submission.gender}</td>
                                                    <td className="text-capitalize">{submission.trialCount === null ? 0 : submission.trialCount}</td>
                                                    <td>{`${submission.submitted}`}</td>
                                                </tr>
                                            ))}
                                    </FacetcherTable>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </FacetcherDrawer >
    );
};

export default checkAuthentication(User);