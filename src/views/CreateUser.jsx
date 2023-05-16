import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { createUser } from "../store/actions/users/users-actions";
import { getCurrentUser } from "../store/actions/auth/auth-actions";

import checkAuthentication from "../authentication/check-authentication";

import FacetcherSelectComponent from "../components/select-component";

import FacetcherDrawer from "../components/drawer/drawer";
import PersonIcon from "@mui/icons-material/Person";

const CreateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const createdUserMessage = useSelector((state) => state.user.createdUserMessage);
    const createUserRequest = useSelector((state) => state.user.createUserRequest);
    const createUserError = useSelector((state) => state.user.createUserError);
    const createUserErrorOccurred = useSelector((state) => state.user.createUserErrorOccurred);

    useEffect(() => {
        if (location.state === null) navigate("/error");
        else {
            document.title = location.state.userType
                ? `Create ${location.state.userType} | Facetcher`
                : "Create | Facetcher";
            dispatch(getCurrentUser());
        }
    }, [dispatch, location]);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
        phoneNumber: Yup.string().required('Phone Number is required'),
        gender: Yup.string().oneOf(['Male', 'Female'], 'Invalid gender').required('Gender is required'),
        maritalStatus: Yup.string().oneOf(['Single', 'Married'], 'Invalid marital status').required('Marital Status is required'),
    });

    const initialValues = {
        roleId: `${String(location.state.userType).toLowerCase() === 'user' ? 1 : 2}`,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        gender: 'Gender',
        maritalStatus: 'Marital Status',
    };

    const handleSubmit = (values, { resetForm }) => {
        const user = {
            ...values,
            gender: String(values.gender).toUpperCase(),
            maritalStatus: String(values.maritalStatus).toUpperCase(),
        };
        delete user.roleId;
        dispatch(createUser(user, values.roleId));
        resetForm();
    };

    return (
        <div>
            <FacetcherDrawer>
                <div className="row h-100 justify-content-center align-items-center mt-3 overflowY-scroll">
                    <Formik
                        onSubmit={handleSubmit}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {({ values, handleChange, handleSubmit, errors, touched }) => (
                            <div className="w-50 bg-dark-grey mx-5 position-relative d-flex justify-content-center align-items-center flex-column h-100 overflow-hidden">
                                <div className="bg-dark-grey2 w-100 h-25 user-profile-pic position-absolute top-0"></div>
                                <div className="rounded-circle bg-cyan grey-border user-profile-pic position-absolute top-0 overflow-hidden">
                                    <div className="w-100 h-100 d-flex justify-content-center align-items-center overflow-hidden position-relative">
                                        <PersonIcon sx={{ fontSize: 160 }} />
                                    </div>
                                </div>
                                <Form className="w-50 mx-5 d-flex justify-content-center flex-column align-items-center text-center" style={{marginTop: 180}}>
                                    {!createUserErrorOccurred && !createUserRequest && createdUserMessage && (<h6>* {createdUserMessage}</h6>)}
                                    {createUserErrorOccurred && <h6>* {createUserError}</h6>}
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
                                        type="email"
                                        name="email"
                                        placeholder="Email address"
                                        className={`form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-100 ${errors.email && touched.email ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className={`form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-100 ${errors.password && touched.password ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    <Field
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Phone Number"
                                        className={`form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-100 ${errors.phoneNumber && touched.phoneNumber ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="phoneNumber" component="div" className="invalid-feedback" />
                                    <div className="w-100 d-flex justify-content-between gap-5 align-items-start">
                                        <div className="w-100 my-4">
                                            <FacetcherSelectComponent
                                                onChange={handleChange}
                                                name="gender"
                                                value={values.gender}
                                                defaultValue="Gender"
                                                options={["Gender", "Male", "Female"]}
                                                className={`form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-100 ${errors.gender && touched.gender ? 'is-invalid' : ''}`}
                                            />
                                            <ErrorMessage name="gender" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="w-100 my-4">
                                            <FacetcherSelectComponent
                                                onChange={handleChange}
                                                name="Marital Status"
                                                value={values.maritalStatus}
                                                defaultValue="Marital Status"
                                                options={["Marital Status", "Single", "Married"]}
                                                className={`form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-100 ${errors.maritalStatus && touched.maritalStatus ? 'is-invalid' : ''}`}
                                            />
                                            <ErrorMessage name="maritalStatus" component="div" className="invalid-feedback" />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="btn bg-cyan text-light-grey rounded-pill w-50 mt-4 fw-bold"
                                    >
                                        {createUserRequest ? "Loading ..." : `Create New ${location.state.userType}`}
                                    </button>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </FacetcherDrawer>
        </div>
    );
};
export default checkAuthentication(CreateUser);
