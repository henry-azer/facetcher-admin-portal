import React from "react";

import Logo from "../assets/logo/logo.svg";
import LogoText from "../assets/logo/logo-text.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../store/actions/auth/auth-actions";

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
          onSubmit: () => {
               dispatch(authenticateUser());
          },
     });

     const dispatch = useDispatch();

     console.log(formik.values);

     return (
          <div className="d-flex">
               <div className="d-flex flex-column justify-content-center align-items-center vh-100 w-50">
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
               <div className="bg-dark-grey vh-100 w-50 d-flex justify-content-center align-items-center flex-column">
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
                         />
                         <input
                              type="text"
                              className=" rounded-pill bg-transparent form-control grey-border w-75 p-2 px-3 fs-5 text-grey my-3"
                              name="password"
                              placeholder="Password"
                              onChange={formik.handleChange}
                              value={formik.values.password}
                         />
                         <input
                              type="submit"
                              className="btn bg-cyan rounded-pill h-25 px-5 text-light-grey my-3 fw-bold"
                              title="Login"
                              value="Login"
                         />
                    </form>
               </div>
          </div>
     );
};
export default Login;
