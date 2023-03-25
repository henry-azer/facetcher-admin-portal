import React, { useEffect, useState } from "react";
import FacetcherDrawer from "../components/drawer/drawer";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/actions/auth/auth-actions";
import { Formik, useFormik } from "formik";

const Profile = () => {
     const store = useSelector((state) => state);
     const dispatch = useDispatch();

     const [isUserFetched, setIsUserFetched] = useState(false);

     useEffect(() => {
          document.title = "User Profile | Facetcher";

          if (!isUserFetched) {
               dispatch(getCurrentUser());
               setIsUserFetched(true);
          }
     });

     const user = store.auth.authenticatedUser;

     // const formik = useFormik({
     //      initialValues: {
     //           name: "",
     //           phoneNumber: "",
     //           email: "",
     //           password: "",
     //      },
     // });

     console.log(user);

     return (
          <div>
               <FacetcherDrawer>
                    <div className="row h-100 justify-content-center align-items-center gx-2 mt-5 overflowY-scroll">
                         {user && (
                              <div className="col-4 bg-dark-grey mx-2 p-3 position-relative d-flex justify-content-center h-100 overflow-hidden">
                                   <div className=" bg-dark-grey2 w-100 h-20 user-profile-pic position-absolute top-0"></div>
                                   <div className=" rounded-circle bg-cyan grey-border user-profile-pic position-absolute top-0 overflow-hidden">
                                        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                                             {user.profilePictureUrl ? (
                                                  <img
                                                       src={`${user.profilePictureUrl}`}
                                                  />
                                             ) : (
                                                  <PersonIcon
                                                       sx={{ fontSize: 160 }}
                                                  />
                                             )}
                                        </div>
                                   </div>
                                   <div className=" align-self-end h-75 pt-5 text-center">
                                        <h1 className="mt-3 fs-4 fw-bold text-capitalize">
                                             {user.firstName +
                                                  " " +
                                                  user.lastName}
                                        </h1>
                                        <h1 className="fs-6 text-cyan">
                                             {user.email}
                                        </h1>

                                        <Formik
                                             initialValues={{
                                                  userName: `${user.firstName +
                                                       " " +
                                                       user.lastName}`,
                                                  phoneNumber: user.phoneNumber,
                                                  email: user.email,
                                                  password: user.password,
                                             }}
                                             enableReinitialize
                                        >
                                             {({ values, handleChange }) => (
                                                  <form className="d-flex justify-content-center align-items-center flex-column mx-2">
                                                       <div className="row justify-content-center align-items-center h-75">
                                                            <div className="col-6">
                                                                 <input
                                                                      type="text"
                                                                      placeholder="User Name"
                                                                      className="form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-100"
                                                                      name="userName"
                                                                      onChange={
                                                                           handleChange
                                                                      }
                                                                      defaultValue={
                                                                           values.userName
                                                                      }
                                                                 />
                                                            </div>
                                                            <div className="col-6">
                                                                 <input
                                                                      type="text"
                                                                      placeholder="Phone number"
                                                                      className="form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-100"
                                                                      onChange={
                                                                           handleChange
                                                                      }
                                                                      defaultValue={
                                                                           values.phoneNumber
                                                                      }
                                                                 />
                                                            </div>
                                                       </div>
                                                       <input
                                                            type="email"
                                                            placeholder="Email address"
                                                            className="form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-100"
                                                            onChange={
                                                                 handleChange
                                                            }
                                                            defaultValue={
                                                                 values.email
                                                            }
                                                       />
                                                       <div className="w-100 d-flex justify-content-between align-items-center">
                                                            <input
                                                                 type="password"
                                                                 className="form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-50 me-2"
                                                                 disabled
                                                                 defaultValue={
                                                                      values.password
                                                                 }
                                                            />
                                                            <button className="btn btn-sm bg-cyan text-light-grey rounded-pill w-50">
                                                                 Reset Password
                                                            </button>
                                                       </div>
                                                       <div className="w-100 d-flex justify-content-between mt-4">
                                                            <input
                                                                 type="submit"
                                                                 value="Save Changes"
                                                                 className="btn bg-cyan text-light-grey rounded-pill w-50 me-2 fw-bold"
                                                            />
                                                            <button className="btn bg-orange text-light-grey rounded-pill w-50 ms-2 fw-bold">
                                                                 Delete User
                                                            </button>
                                                       </div>
                                                  </form>
                                             )}
                                        </Formik>
                                   </div>
                              </div>
                         )}
                         <div className="col bg-dark-grey mx-2 p-3 h-100 overflowY-scroll">
                              <button
                                   onClick={() => {
                                        dispatch(getCurrentUser());
                                        console.log(store);
                                   }}
                              >
                                   Get User
                              </button>
                         </div>
                    </div>
               </FacetcherDrawer>
          </div>
     );
};
export default Profile;
