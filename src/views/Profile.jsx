import React, { useEffect, useState } from "react";
import FacetcherDrawer from "../components/drawer/drawer";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/actions/auth/auth-actions";
import { Field, Formik } from "formik";

import "react-circular-progressbar/dist/styles.css";
import FacetcherCircularChart from "../components/charts/circularChart";
import { navigateToLogin } from "../utils/util";
import FacetcherTable from "../components/tables/table";

const Profile = () => {
     useEffect(() => navigateToLogin(), []);

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

     console.log(user);
     const headerArray = ["ID", "Date and Time", "Gender", "Preview"];

     return (
          <div>
               <FacetcherDrawer>
                    <div className="row h-100 justify-content-center align-items-center gx-2 mt-5 overflowY-scroll">
                         {user && (
                              <div className="col-lg-4 col-12 bg-dark-grey mx-2 p-3 position-relative d-flex justify-content-center h-100 overflow-hidden">
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
                                             enableReinitialize={true}
                                        >
                                             {({
                                                  values,
                                                  handleChange,
                                                  setFieldValue,
                                             }) => (
                                                  <form className="d-flex justify-content-center align-items-center flex-column mx-2">
                                                       <div className="row justify-content-center align-items-center h-75">
                                                            <div className="col-6">
                                                                 <input
                                                                      type="text"
                                                                      name="userName"
                                                                      placeholder="User Name"
                                                                      className="form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-100"
                                                                      onChange={
                                                                           handleChange
                                                                      }
                                                                      defaultValue={
                                                                           values.userName
                                                                      }
                                                                 />
                                                            </div>
                                                            <div className="col-lg-6 col-12">
                                                                 <input
                                                                      type="text"
                                                                      name="phoneNumber"
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
                                                            name="email"
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
                                                            <Field
                                                                 type="password"
                                                                 name="password"
                                                                 className="form-control bg-transparent fs-6 grey-border border-top-0 border-start-0 border-end-0 w-75 px-2 fs-5 text-light-grey my-3 rounded-0 w-50 me-2"
                                                            />
                                                            <button
                                                                 onClick={(
                                                                      e
                                                                 ) => {
                                                                      e.preventDefault();
                                                                      setFieldValue(
                                                                           "password",
                                                                           "facetcher@admin"
                                                                      );
                                                                      console.log(
                                                                           values
                                                                      );
                                                                 }}
                                                                 className="btn btn-sm bg-cyan text-light-grey rounded-pill w-50"
                                                            >
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
                         <div className="col bg-dark-grey mx-2 p-3 h-100 overflowY-scroll px-5 pt-3 pb-5">
                              <div className="row justify-content-center align-items-center h-25 w-100">
                                   <div className="col-6 ">
                                        <h1 className=" fs-3 fw-bold">
                                             Total Trials: 80
                                        </h1>
                                        <h1 className="fs-5 text-cyan fw-bold">
                                             Succeed Trials: 56
                                        </h1>
                                        <h1 className="fs-5 text-orange fw-bold">
                                             Failed Trials: 24
                                        </h1>
                                   </div>
                                   <div className="col-3 d-flex justify-content-center align-items-center">
                                        <FacetcherCircularChart
                                             value={150}
                                             maxValue={200}
                                             color="cyan"
                                             width={75}
                                             strokeWidth={14}
                                        />
                                   </div>
                                   <div className="col-3 d-flex justify-content-center align-items-center">
                                        <FacetcherCircularChart
                                             value={50}
                                             maxValue={200}
                                             color="orange"
                                             width={75}
                                             strokeWidth={14}
                                        />
                                   </div>
                              </div>
                              <div className="pt-5 mb-5">
                                   <h1 className="fs-3 fw-bold py-4">
                                        Drawings History
                                   </h1>
                                   <div>
                                        <FacetcherTable
                                        table={1}
                                             headerArray={headerArray}
                                             headerColor="bg-dark-grey2"
                                             bodyColor="bg-dark-grey"
                                        >
                                             <tr>
                                                  <td>Col1</td>
                                                  <td>Col2</td>
                                                  <td>Col3</td>
                                                  <td>Col4</td>
                                             </tr>
                                             <tr>
                                                  <td>Col1</td>
                                                  <td>Col2</td>
                                                  <td>Col3</td>
                                                  <td>Col4</td>
                                             </tr>
                                             <tr>
                                                  <td>Col1</td>
                                                  <td>Col2</td>
                                                  <td>Col3</td>
                                                  <td>Col4</td>
                                             </tr>
                                             <tr>
                                                  <td>Col1</td>
                                                  <td>Col2</td>
                                                  <td>Col3</td>
                                                  <td>Col4</td>
                                             </tr>
                                             <tr>
                                                  <td>Col1</td>
                                                  <td>Col2</td>
                                                  <td>Col3</td>
                                                  <td>Col4</td>
                                             </tr>
                                             <tr>
                                                  <td>Col1</td>
                                                  <td>Col2</td>
                                                  <td>Col3</td>
                                                  <td>Col4</td>
                                             </tr>
                                             <tr>
                                                  <td>Col1</td>
                                                  <td>Col2</td>
                                                  <td>Col3</td>
                                                  <td>Col4</td>
                                             </tr>
                                             <tr>
                                                  <td>Col1</td>
                                                  <td>Col2</td>
                                                  <td>Col3</td>
                                                  <td>Col4</td>
                                             </tr>
                                             <tr>
                                                  <td>Col8</td>
                                                  <td>Col9</td>
                                                  <td>Col10</td>
                                                  <td>Col11</td>
                                             </tr>
                                        </FacetcherTable>
                                   </div>
                              </div>
                         </div>
                    </div>
               </FacetcherDrawer>
          </div>
     );
};
export default Profile;
