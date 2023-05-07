import React, { useEffect, useState } from "react";
import FacetcherDrawer from "../components/drawer/drawer";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/actions/auth/auth-actions";
import { Form, Formik } from "formik";

import "react-circular-progressbar/dist/styles.css";

import { navigateToLogin } from "../utils/util";

import FacetcherSelectComponent from "../components/select-component";

import { useLocation, useNavigate } from "react-router-dom";
import { addUser } from "../store/actions/users/users-actions";
const CreateUser = () => {
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

     console.log(location);

     useEffect(() => {
          document.title = "Create | Facetcher";
          //     if (location.state === null) navigate("/");
          if (!isUserFetched) {
               dispatch(getCurrentUser());
               setIsUserFetched(true);
          }
     });

     // console.log(location.state.id);
     //      console.log(store);
     return (
          <div>
               <FacetcherDrawer>
                    <div className="row h-100 justify-content-center align-items-center gx-2 mt-5 overflowY-scroll">
                         <Formik
                              initialValues={{
                                   roleId: `${
                                        String(
                                             location.state.userType
                                        ).toLowerCase() === "user"
                                             ? 1
                                             : 2
                                   }`,
                                   firstName: "",
                                   lastName: "",
                                   phoneNumber: "",
                                   email: "",
                                   password: `${String(
                                        location.state.userType
                                   ).toLowerCase()}@facetcher`,
                                   gender: "",
                              }}
                              // enableReinitialize={true}
                              onSubmit={(values) => {
                                   console.log(values);
                                   const user = {
                                        ...values,
                                        gender: String(
                                             values.gender
                                        ).toUpperCase(),
                                   };
                                   delete user.roleId;
                                   console.log(user)
                                   console.log(values.roleId)
                                   dispatch(addUser(user, values.roleId));
                              }}
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
                                                  <PersonIcon
                                                       sx={{
                                                            fontSize: 160,
                                                       }}
                                                  />
                                             </div>
                                        </div>

                                        <div className=" align-self-end h-75 pt-5 text-center">
                                             <form className="d-flex justify-content-center align-items-center flex-column mx-2">
                                                  <div className="row justify-content-center align-items-center h-75">
                                                       <div className="col-6">
                                                            <input
                                                                 type="text"
                                                                 name="firstName"
                                                                 placeholder="First Name"
                                                                 className="form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-100"
                                                                 onChange={
                                                                      handleChange
                                                                 }
                                                                 value={
                                                                      values.firstName
                                                                 }
                                                            />
                                                       </div>
                                                       <div className="col-lg-6 col-12">
                                                            <input
                                                                 type="text"
                                                                 name="lastName"
                                                                 placeholder="Last Name"
                                                                 className="form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-100"
                                                                 onChange={
                                                                      handleChange
                                                                 }
                                                                 value={
                                                                      values.lastName
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
                                                  <input
                                                       type="text"
                                                       name="phoneNumber"
                                                       placeholder="Phone Number"
                                                       className="form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-100"
                                                       onChange={handleChange}
                                                       value={
                                                            values.phoneNumber
                                                       }
                                                  />
                                                  <div className="w-100 my-5">
                                                       <FacetcherSelectComponent
                                                            onChange={
                                                                 handleChange
                                                            }
                                                            name="gender"
                                                            defaultValue="Choose Gender ..."
                                                            options={[
                                                                 "Choose Gender ...",
                                                                 "Male",
                                                                 "Female",
                                                            ]}
                                                       />
                                                  </div>

                                                  <button
                                                       onClick={handleSubmit}
                                                       className="btn bg-cyan text-light-grey rounded-pill w-50 me-2 fw-bold"
                                                  >{`Create New ${location.state.userType}`}</button>
                                             </form>
                                        </div>
                                   </div>
                              )}
                         </Formik>
                    </div>
               </FacetcherDrawer>
          </div>
     );
};
export default CreateUser;
