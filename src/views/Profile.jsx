import React, { useEffect, useState, useRef } from "react";
import FacetcherDrawer from "../components/drawer/drawer";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import {
    // addProfilePicture,
    getCurrentUser,
} from "../store/actions/auth/auth-actions";
import { Field, Formik } from "formik";

import "react-circular-progressbar/dist/styles.css";
import FacetcherCircularChart from "../components/charts/circularChart";
import { navigateToLogin } from "../utils/util";
import FacetcherTable from "../components/tables/table";
import FacetcherSelectComponent from "../components/select-component";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DARKGREY2, LIGHTGREY } from "../constants/app_colors";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import {
    getUserById,
    uploadUserProfilePicture,
} from "../store/actions/users/users-actions";
import {
    getAllUsersSubmissionsById,
    getCurrentUserSubmissions,
} from "../store/actions/submission/submission-actions";
import { itemsPerPage } from "../constants/app_constants";
import {
    getFailedCurrentTrialsCount,
    getFailedUserTrialsCount,
    getSucceededCurrentTrialsCount,
    getSucceededUserTrialsCount,
} from "../store/actions/trials/trials-action";

const Profile = () => {
    useEffect(() => navigateToLogin(), []);

    const formData = new FormData();

    const store = useSelector((state) => state);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [imgW, setImgW] = useState(0);
    const [imgH, setImgH] = useState(0);
    const [isUserFetched, setIsUserFetched] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();

    const location = useLocation();
    const [userImage, setUserImage] = useState(null);
    const currentUser = store.auth.authenticatedUser;

    // useEffect(() => {
    //      dispatch(getCurrentUser());
    // });
    useEffect(() => {
        dispatch(getCurrentUser());
        setIsUserFetched(true);
        // if (location.state === "undefined") navigate("/");
    }, []);

    useEffect(() => {
        document.title = "User Profile | Facetcher";

        // if (!isUserFetched) {
        if (location.state) {
            if (location.state.id !== "current") {
                dispatch(getUserById(location.state.id));
                dispatch(getAllUsersSubmissionsById(location.state.id));
            } else {
                dispatch(getCurrentUserSubmissions());
                // dispatch(getSucceededCurrentTrialsCount());
                // dispatch(getFailedCurrentTrialsCount());
            }
        } else {
            navigate("/");
        }

        // setIsUserFetched(true);
        // }
    }, [location.state && location.state.id]);

    let user;
    let submissions;

    // if (location.state) {
    //      user = store.user.userById;
    //      submissions = store.submissions.allSubmissionsById;
    // } else {
    //      user = store.auth.authenticatedUser;
    //      submissions = store.submissions.allCurrentSubmissions;
    // }

    if (location.state) {
        if (location.state.id !== "current") {
            user = store.user.userById;
            submissions = store.submissions.allSubmissionsById;
        } else {
            user = store.auth.authenticatedUser;
            submissions = store.submissions.allCurrentSubmissions;
        }
    } else navigate("/");

    console.log(store.auth.authenticatedUser);
    // Handle image size width and height
    if (user && user.profilePictureUrl) {
        const img = new Image();
        img.onload = () => {
            setImgH(img.height);
            setImgW(img.width);
        };
        img.src = user.profilePictureUrl;
    }

    useEffect(() => {
        if (user) {
            if (user.id) {
                dispatch(getSucceededUserTrialsCount(user.id));
                dispatch(getFailedUserTrialsCount(user.id));
            }
        }
    }, [user && user.id]);

    const succeededTrials = store.trials.succeededUserCount;
    const failedTrials = store.trials.failedUserCount;

    // console.log(location.state.id);
    console.log(store);
    const headerArray = ["ID", "Title", "Gender", "Date", "Time"];

    return (
        <div>
            <FacetcherDrawer>
                <div className="row h-100 justify-content-center align-items-center gx-2 mt-5 overflowY-scroll">
                    {user && (
                        <Formik
                            onSubmit={() => {
                                // e.preventDefault();
                                // console.log(userImage);
                                // const image = new FormData().append(
                                //      "image",
                                //      userImage
                                // );
                                dispatch(uploadUserProfilePicture(userImage));
                                console.log("Saved");
                            }}
                            initialValues={{
                                id: user.id,
                                roleId: user.roleId,
                                userName: `${user.firstName +
                                    " " +
                                    user.lastName}`,
                                // phoneNumber: user.phoneNumber,
                                phoneNumber: "0",
                                email: user.email,
                                password: user.password,
                                profilePicture: user.profilePictureUrl,
                            }}
                            enableReinitialize={true}
                        >
                            {({
                                values,
                                handleChange,
                                setFieldValue,
                                handleSubmit,
                            }) => (
                                <div className="col-lg-4 col-12 bg-dark-grey mx-2 p-3 position-relative d-flex justify-content-center h-100 overflow-hidden">
                                    <div className=" bg-dark-grey2 w-100 h-20 user-profile-pic position-absolute top-0"></div>
                                    <div className=" rounded-circle bg-cyan grey-border user-profile-pic position-absolute top-0 overflow-hidden">
                                        <div className="w-100 h-100 d-flex justify-content-center align-items-center overflow-hidden position-relative">
                                            <button
                                                className={`btn bg-black bg-opacity-75 position-absolute bottom-0 h-100 w-100 rounded-pill text-light-grey custom-btn ${currentUser &&
                                                    currentUser.id !==
                                                        values.id &&
                                                    "d-none"}`}
                                                onClick={() => setOpen(true)}
                                            >
                                                <EditIcon fontSize="small" />
                                                Edit
                                            </button>

                                            {values.profilePicture ? (
                                                <img
                                                    src={`${values.profilePicture}`}
                                                    className={`${
                                                        imgH > imgW
                                                            ? "w-100"
                                                            : "h-100"
                                                    } d-flex justify-content-center align-items-center`}
                                                />
                                            ) : (
                                                <PersonIcon
                                                    sx={{
                                                        fontSize: 160,
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>

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
                                        {" "}
                                        <DialogTitle className="d-flex w-100 px-5 justify-content-between fw-bold">
                                            Edit Profile Picture
                                            <CloseIcon
                                                className="cursor-pointer text-dark-grey2"
                                                onClick={() => setOpen(false)}
                                            />
                                        </DialogTitle>
                                        <DialogContent className="d-flex w-100 px-5 flex-column">
                                            <DialogContentText className="pb-3">
                                                Please, Add the picture that you
                                                want to make a profile picture
                                                for the user.
                                            </DialogContentText>

                                            <div>
                                                <input
                                                    name="image"
                                                    type="file"
                                                    onChange={(event) => {
                                                        setUserImage(
                                                            event.currentTarget
                                                                .files[0]
                                                        );
                                                        formData.append(
                                                            "image",
                                                            event.currentTarget
                                                                .files[0]
                                                        );
                                                        const imageUrl = URL.createObjectURL(
                                                            event.currentTarget
                                                                .files[0]
                                                        );
                                                        setFieldValue(
                                                            "profilePicture",
                                                            imageUrl
                                                        );
                                                        setOpen(false);
                                                        setImgW(
                                                            new Image(
                                                                event.currentTarget.files[0]
                                                            ).width
                                                        );
                                                        setImgH(
                                                            new Image(
                                                                event.currentTarget.files[0]
                                                            ).height
                                                        );
                                                        return () =>
                                                            URL.revokeObjectURL(
                                                                imageUrl
                                                            );
                                                    }}
                                                />
                                                {values.profilePicture && (
                                                    <button
                                                        className="btn rounded-pill bg-orange text-light-grey"
                                                        onClick={() => {
                                                            setFieldValue(
                                                                "profilePicture",
                                                                null
                                                            );
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        Delete Profile Picture
                                                    </button>
                                                )}
                                            </div>
                                        </DialogContent>
                                        <DialogActions></DialogActions>
                                    </Dialog>

                                    <div className=" align-self-end h-75 pt-5 text-center">
                                        <h1 className="mt-3 fs-4 fw-bold text-capitalize">
                                            {user.firstName +
                                                " " +
                                                user.lastName}
                                        </h1>
                                        <h1 className="fs-6 text-cyan">
                                            {user.email}
                                        </h1>

                                        <form className="d-flex justify-content-center align-items-center flex-column mx-2">
                                            <div className="w-25 mt-2">
                                                <FacetcherSelectComponent
                                                    value={`${user.userRoles[0].role.name}`.toLowerCase()}
                                                    options={["User", "Admin"]}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="row justify-content-center align-items-center h-75">
                                                <div className="col-6">
                                                    <input
                                                        type="text"
                                                        name="userName"
                                                        placeholder="User Name"
                                                        className="form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-100"
                                                        onChange={handleChange}
                                                        value={values.userName}
                                                    />
                                                </div>
                                                <div className="col-lg-6 col-12">
                                                    <input
                                                        type="text"
                                                        name="phoneNumber"
                                                        placeholder="Phone number"
                                                        className="form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-100"
                                                        onChange={handleChange}
                                                        value={
                                                            values.phoneNumber
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email address"
                                                className="form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-100"
                                                onChange={handleChange}
                                                value={values.email}
                                            />
                                            <div className="w-100 d-flex justify-content-between align-items-center">
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    className="form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-50 me-2"
                                                />
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setFieldValue(
                                                            "password",
                                                            "facetcher@admin"
                                                        );
                                                        console.log(values);
                                                    }}
                                                    className="btn btn-sm bg-cyan text-light-grey rounded-pill w-50"
                                                >
                                                    Reset Password
                                                </button>
                                            </div>
                                            <div className="w-100 d-flex justify-content-between mt-4">
                                                <button
                                                    type="button"
                                                    onClick={handleSubmit}
                                                    className="btn bg-cyan text-light-grey rounded-pill w-50 me-2 fw-bold"
                                                >
                                                    Save Changes
                                                </button>
                                                <button className="btn bg-orange text-light-grey rounded-pill w-50 ms-2 fw-bold">
                                                    Delete User
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </Formik>
                    )}
                    {user && submissions && (
                        <div className="col bg-dark-grey mx-2 p-3 h-100 overflowY-scroll px-5 pt-3 pb-5">
                            <div className="row justify-content-center align-items-center h-25 w-100">
                                <div className="col-6 ">
                                    <h1 className=" fs-3 fw-bold">
                                        Total Trials:{" "}
                                        {succeededTrials + failedTrials}
                                    </h1>
                                    <h1 className="fs-5 text-cyan fw-bold">
                                        Succeed Trials: {succeededTrials}
                                    </h1>
                                    <h1 className="fs-5 text-orange fw-bold">
                                        Failed Trials: {failedTrials}
                                    </h1>
                                </div>

                                <div className="col-3 d-flex justify-content-center align-items-center">
                                    <FacetcherCircularChart
                                        value={succeededTrials}
                                        maxValue={
                                            succeededTrials + failedTrials
                                        }
                                        color="cyan"
                                        width={75}
                                        strokeWidth={14}
                                    />
                                </div>
                                <div className="col-3 d-flex justify-content-center align-items-center">
                                    <FacetcherCircularChart
                                        value={failedTrials}
                                        maxValue={
                                            succeededTrials + failedTrials
                                        }
                                        color="orange"
                                        width={75}
                                        strokeWidth={14}
                                    />
                                </div>
                            </div>

                            <div className="pt-5 mb-5">
                                <h1 className="fs-3 fw-bold py-4">
                                    Submissions History
                                </h1>
                                <div>
                                    <FacetcherTable
                                        dataLength={submissions.length}
                                        initialPage={currentPage}
                                        handlePageClick={(e) =>
                                            setCurrentPage(
                                                (e.selected * itemsPerPage) %
                                                    submissions.length
                                            )
                                        }
                                        table={1}
                                        headerArray={headerArray}
                                        headerColor="bg-dark-grey2"
                                        bodyColor="bg-dark-grey"
                                    >
                                        {submissions
                                            .slice(
                                                currentPage,
                                                currentPage + itemsPerPage
                                            )
                                            .map((submission, index) => (
                                                <tr
                                                    className="h-25"
                                                    key={index}
                                                    onClick={() => {
                                                        navigate(
                                                            "/submission",
                                                            {
                                                                state: {
                                                                    id:
                                                                        submission.id,
                                                                },
                                                            }
                                                        );
                                                    }}
                                                >
                                                    <td>{submission.id}</td>
                                                    <td className="text-capitalize">
                                                        {submission.title}
                                                    </td>

                                                    <td className="text-lowercase">
                                                        {submission.gender}
                                                    </td>
                                                    <td className="text-capitalize">
                                                        {new Date(
                                                            submission.creationDate
                                                        ).toDateString()}
                                                    </td>
                                                    <td className="text-capitalize">
                                                        {new Date(
                                                            submission.creationDate
                                                        ).toLocaleTimeString()}
                                                    </td>
                                                </tr>
                                            ))}
                                    </FacetcherTable>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </FacetcherDrawer>
        </div>
    );
};
export default Profile;
