import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {
    getAllUserSubmissionsById,
} from "../store/actions/submission/submission-actions";
import {
    getFailedUserTrialsCount,
    getSucceededUserTrialsCount,
} from "../store/actions/trials/trials-action";
import {
    getCurrentUser,
} from "../store/actions/auth/auth-actions";
import {
    updateUser,
    clearUpdateUser,
    uploadUserProfilePicture,
    toggleUserAccountDeletion,
    clearToggleUserAccountDeletion,
} from "../store/actions/users/users-actions";

import checkAuthentication from "../authentication/check-authentication";

import FacetcherDrawer from "../components/drawer/drawer";
import PersonIcon from "@mui/icons-material/Person";

import FacetcherTable from "../components/tables/table";
import FacetcherCircularChart from "../components/charts/circularChart";

import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { DARKGREY2, LIGHTGREY } from "../constants/app_colors";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [imgW, setImgW] = useState(0);
    const [imgH, setImgH] = useState(0);
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [isUserToggledDeletion, setIsUserToggledDeletion] = useState(null);
    const [userProfilePictureImageURL, setUserProfilePictureImageURL] = useState('');
    const [userProfilePictureImage, setUserProfilePictureImage] = useState(null);

    let currentUser = useSelector((state) => state.auth.currentUser);
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
        document.title = "Profile | Facetcher";
    });

    useEffect(() => {
        if (!isDataFetched) {
            dispatch(getCurrentUser());
            setIsDataFetched(true);
        }
    }, [dispatch, isDataFetched]);

    useEffect(() => {
        if (currentUser && currentUser.id) {
            dispatch(getFailedUserTrialsCount(currentUser.id));
            dispatch(getAllUserSubmissionsById(currentUser.id));
            dispatch(getSucceededUserTrialsCount(currentUser.id));
        }
    }, [dispatch, currentUser]);

    useEffect(() => {
        return () => {
            dispatch(clearUpdateUser());
            dispatch(clearToggleUserAccountDeletion());
        };
    }, []);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        phoneNumber: Yup.string().required('Phone Number is required'),
    });

    const handleSubmit = (values) => {
        dispatch(clearUpdateUser());
        dispatch(uploadUserProfilePicture(userProfilePictureImage));
        currentUser.firstName = values.firstName;
        currentUser.lastName = values.lastName;
        currentUser.phoneNumber = values.phoneNumber;
        dispatch(updateUser(currentUser));
        currentUser = updatedUser;
    };

    const handleToggleUserAccountDeletion = () => {
        dispatch(clearToggleUserAccountDeletion());
        dispatch(toggleUserAccountDeletion(currentUser.id));
        setIsUserToggledDeletion(!isUserToggledDeletion);
    }

    const itemsPerPage = 3;
    const startIndex = currentPage * (itemsPerPage - 1);
    const endIndex = startIndex + itemsPerPage;
    const headerArray = ["ID", "User ID", "Title", "Date", "Time", "Gender", "Trials Count", "Submitted"];

    return (
        <div>
            <FacetcherDrawer>
                <div className="row h-100 justify-content-center align-items-center gx-2 mt-5 overflowY-scroll">
                    {currentUser && (
                        <div className="col-lg-4 col-12 bg-dark-grey mx-2 p-3 position-relative d-flex justify-content-center h-100 overflow-hidden">
                            <div className=" bg-dark-grey2 w-100 h-20 user-profile-pic position-absolute top-0"></div>
                            <div className=" rounded-circle bg-cyan grey-border user-profile-pic position-absolute top-0 overflow-hidden">
                                <div className="w-100 h-100 d-flex justify-content-center align-items-center overflow-hidden position-relative">
                                    <button
                                        className="btn bg-black bg-opacity-75 position-absolute bottom-0 h-100 w-100 rounded-pill text-light-grey custom-btn"
                                        onClick={() => setOpen(true)}
                                    >
                                        <EditIcon fontSize="small" />
                                        Edit
                                    </button>
                                    {userProfilePictureImageURL ? (
                                        <img
                                            alt="user profile"
                                            src={userProfilePictureImageURL}
                                            className={`${imgH > imgW ? 'w-100' : 'h-100'} d-flex justify-content-center align-items-center`}
                                        />
                                    ) : currentUser.profilePictureUrl ?
                                        (<img
                                            alt="user profile"
                                            src={currentUser.profilePictureUrl}
                                            className={`${imgH > imgW ? 'w-100' : 'h-100'} d-flex justify-content-center align-items-center`}
                                        />
                                        ) : (<PersonIcon sx={{ fontSize: 160, }} />)}
                                </div>
                            </div>
                            <div className=" align-self-end h-75 pt-5 text-center">
                                <h1 className="mt-3 fs-4 fw-bold">{currentUser.firstName} {" "} {currentUser.lastName}</h1>
                                <h1 className="fs-6 text-cyan">{currentUser.email}</h1>
                                <div className="d-flex justify-content-center align-items-center mx-2">
                                    {currentUser.userRoles.map((userRole, index) => (
                                        <div key={index}>
                                            {index !== 0 && <span className="mx-1">-</span>}
                                            <span className="text-capitalize">{userRole.role.name.toLowerCase()}</span>
                                        </div>
                                    ))}
                                </div>
                                <Formik
                                    initialValues={{
                                        firstName: currentUser.firstName,
                                        lastName: currentUser.lastName,
                                        phoneNumber: currentUser.phoneNumber,
                                        profilePicture: currentUser.profilePictureUrl,
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ setFieldValue, errors, touched }) => (
                                        <Form className="d-flex justify-content-center align-items-center flex-column mx-5 mt-3">
                                            <Dialog
                                                open={open}
                                                onClose={() => setOpen(false)}
                                                PaperProps={{
                                                    sx: {
                                                        bgcolor: LIGHTGREY,
                                                        color: DARKGREY2,
                                                        paddingY: 2,
                                                        borderRadius: 3,
                                                    },
                                                }}
                                            >
                                                <DialogTitle className="d-flex w-100 px-5 justify-content-between fw-bold">
                                                    Edit Profile Picture
                                                    <CloseIcon
                                                        className="cursor-pointer text-dark-grey2"
                                                        onClick={() => setOpen(false)}
                                                    />
                                                </DialogTitle>
                                                <DialogContent className="d-flex w-100 px-5 flex-column">
                                                    <DialogContentText className="pb-3">
                                                        Please, Add the picture that you want to make a profile picture for the user.
                                                    </DialogContentText>
                                                    <div>
                                                        <input
                                                            type="file"
                                                            name="image"
                                                            onChange={(event) => {
                                                                const image = event.currentTarget.files[0];
                                                                const reader = new FileReader();
                                                                setUserProfilePictureImage(image);
                                                                reader.onloadend = () => {
                                                                    const imageDataURL = reader.result;
                                                                    setOpen(false);
                                                                    setImgW(new Image(image).width);
                                                                    setImgH(new Image(image).height);
                                                                    setUserProfilePictureImageURL(imageDataURL);
                                                                };
                                                                reader.readAsDataURL(image);
                                                            }}
                                                        />
                                                    </div>
                                                </DialogContent>
                                                <DialogActions></DialogActions>
                                            </Dialog>
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
                    {currentUser && (
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
                                        strokeWidth={4}
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
        </div >
    );
};
export default checkAuthentication(Profile);
