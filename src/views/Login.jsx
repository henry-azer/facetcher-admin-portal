import React, { useEffect } from "react";

import Logo from "../assets/logo/logo.svg";
import LogoText from "../assets/logo/logo-text.svg";
import { useFormik } from "formik";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../store/actions/auth/auth-actions";
import { ACCESSTOKEN } from "../constants/app_constants";
import { useNavigate } from "react-router-dom";
import { isUserAuthenticated } from "../utils/util";

const Login = () => {
     const formik = useFormik({
          initialValues: {
               email: "",
               password: "",
          },
          validationSchema: Yup.object({
               email: Yup.string()
                    .email("Invalid Email Address")
                    .required("Email is required"),
               password: Yup.string().required("Password is required"),
          }),
          onSubmit: (values, { setSubmitting }) => {
               dispatch(authenticateUser(values));
               setTimeout(() => {
                    setSubmitting(false);
               }, 1000);
          },
     });

     const cookies = new Cookies();
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const err = false;

     useEffect(() => {
          document.title = "Sign In | Facetcher";

          if (isUserAuthenticated()) {
               navigate("/");
          }
     });

     return (
          <div className="row row-cols-lg-2 row-cols-md-1 row-cols-sm-1 row-cols-1 justify-content-center align-items-center m-0">
               <div className="col d-flex flex-column justify-content-center align-items-center vh-100">
                    <div className="logo w-25 mb-5">
                         <img src={Logo} alt="logo" className="w-100 mb-4" />
                         <img
                              src={LogoText}
                              alt="logo-text"
                              className="w-100"
                         />
                    </div>
                    <p className="fs-4 text-center w-75 px-5 text-grey">
                         What we try to do is to reach the criminal together and
                         get the best result in the shortest time.
                    </p>
               </div>
               <div className="col bg-dark-grey vh-100 d-flex justify-content-center align-items-center flex-column">
                    <p className="fs-2 w-75 text-center mb-5">
                         Please Login with your generated account that you
                         received
                    </p>
                    <form
                         onSubmit={formik.handleSubmit}
                         className="d-flex justify-content-center align-items-center flex-column w-100 h-25 justify-content-between"
                    >
                         <input
                              type="text"
                              className=" rounded-pill bg-transparent form-control grey-border w-75 p-2 px-3 fs-5 text-grey my-3"
                              name="email"
                              placeholder="Email"
                              onChange={formik.handleChange}
                              value={formik.values.email}
                              onBlur={formik.handleBlur}
                         />
                         {formik.errors.email && formik.touched.email && (
                              <p>{formik.errors.email}</p>
                         )}
                         <input
                              type="password"
                              className=" rounded-pill bg-transparent form-control grey-border w-75 p-2 px-3 fs-5 text-grey my-3"
                              name="password"
                              placeholder="Password"
                              onChange={formik.handleChange}
                              value={formik.values.password}
                              onBlur={formik.handleBlur}
                         />
                         {formik.errors.password && formik.touched.password && (
                              <p>{formik.errors.password}</p>
                         )}
                         {err && <p>Invalid Email or Password</p>}
                         <button
                              type="submit"
                              disabled={formik.isSubmitting}
                              className="btn d-flex justify-content-center align-items-center bg-cyan rounded-pill h-25 px-5 text-light-grey my-3 fw-bold"
                         >
                              Login
                         </button>
                    </form>
               </div>
          </div>
     );
};
export default Login;
