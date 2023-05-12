import React, { useEffect, useState } from "react";
import FacetcherDrawer from "../components/drawer/drawer";
import FacetcherSearchComponent from "../components/search-component";
import FacetcherSelectComponent from "../components/select-component";
import FacetcherTable from "../components/tables/table";
import { USERS_LOGS, itemsPerPage } from "../constants/app_constants";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/actions/auth/auth-actions";
import { getAllLogs } from "../store/actions/logs/logs-actions";
import { useFormik } from "formik";

const UserLogs = () => {
     const state = useSelector((state) => state);
     const headerArray = ["ID", "User Name", "Activity", "Date", "Time"];

     const [fetchingData, setFetchingData] = useState(true);
     const dispatch = useDispatch();
     const [currentPage, setCurrentPage] = useState(0);
     const [filtered, setFiltered] = useState(null);

     const startIndex = currentPage * itemsPerPage;
     const endIndex = startIndex + itemsPerPage;
     useEffect(() => {
          document.title = "All Admins | Facetcher";

          if (fetchingData) {
               dispatch(getCurrentUser());
               dispatch(getAllLogs());
               // dispatch(getAllUsers());
               setFetchingData(false);
          }
     }, []);

     const formik = useFormik({
          initialValues: {
               name: "",
               date: "newest",
               activity: "activity ...",
          },
          onSubmit: (values) => {
               if (
                    values.date === "newest" &&
                    values.activity === "activity ..." &&
                    values.name === ""
               ) {
                    setFiltered(null);
               } else {
                    setFiltered(values);
               }
          },
     });

     const pureLogs = state.logs.allLogs;
     let logs;

     if (pureLogs) logs = [...pureLogs];
     if (filtered) {
          if (filtered.date !== "newest") {
               logs = logs.reverse();
          }
          if (filtered.activity !== "activity ...") {
               if (filtered.activity === "login") {
                    logs = logs.filter((obj) => {
                         return obj.logStatus === "LOGIN";
                    });
               } else {
                    logs = logs.filter((obj) => {
                         return obj.logStatus === "LOGOUT";
                    });
               }
          }
          if (filtered.name !== "") {
               logs = logs.filter((obj) => {
                    return obj.user.firstName
                         .toLowerCase()
                         .includes(filtered.name.toLowerCase());
               });
          }
     } else if (filtered === null) {
          logs = pureLogs;
     }

     return (
          <div className="w-100">
               <FacetcherDrawer route={USERS_LOGS}>
                    <div className="p-5 pb-0 w-100 d-flex justify-content-start align-items-center flex-column h-100">
                         <div className="w-100 d-flex justify-content-between align-items-center mb-5">
                              <h1 className="fs-3 fw-bold m-0">User Logs</h1>
                         </div>
                         <form
                              onSubmit={formik.handleSubmit}
                              className="w-100 d-flex justify-content-between align-items-end"
                         >
                              <FacetcherSearchComponent
                                   name="name"
                                   value={formik.values.name}
                                   onChange={formik.handleChange}
                                   placeHolder="Search by user name"
                              />
                              <div className="w-50 d-flex justify-content-around">
                                   <FacetcherSelectComponent
                                        width="25"
                                        label="Date"
                                        options={["Newest", "Latest"]}
                                        name="date"
                                        value={formik.values.date}
                                        onChange={formik.handleChange}
                                   />

                                   <FacetcherSelectComponent
                                        width="25"
                                        label="Activity"
                                        name="activity"
                                        value={formik.values.activity}
                                        onChange={formik.handleChange}
                                        options={[
                                             "Activity ...",
                                             "Login",
                                             "Logout",
                                        ]}
                                   />
                              </div>
                              <div className="w-25 d-flex justify-content-end">
                                   <button
                                        onClick={() => setCurrentPage(0)}
                                        className="btn bg-cyan rounded-pill px-5 text-light-grey fw-bold"
                                   >
                                        Search
                                   </button>
                              </div>
                         </form>
                         <div className="w-100 mt-5 overflowY-scroll ">
                              <FacetcherTable
                                   hover
                                   table={2}
                                   headerArray={headerArray}
                                   dataLength={logs && logs.length}
                                   initialPage={currentPage}
                                   handlePageClick={(e) =>
                                        setCurrentPage(e.selected)
                                   }
                              >
                                   {logs &&
                                        logs
                                             .slice(startIndex, endIndex)
                                             .map((log, index) => (
                                                  <tr
                                                       className="h-25"
                                                       key={index}
                                                  >
                                                       <td>{log.id}</td>
                                                       <td className="text-capitalize">
                                                            {log.user.firstName}{" "}
                                                            {log.user.lastName}
                                                       </td>
                                                       <td className="text-capitalize">
                                                            {log.logStatus}
                                                       </td>
                                                       <td className="text-capitalize">
                                                            {new Date(
                                                                 log.creationDate
                                                            ).toDateString()}
                                                       </td>
                                                       <td className="text-capitalize">
                                                            {new Date(
                                                                 log.creationDate
                                                            ).toLocaleTimeString()}
                                                       </td>
                                                  </tr>
                                             ))}
                              </FacetcherTable>
                         </div>
                    </div>
               </FacetcherDrawer>
          </div>
     );
};
export default UserLogs;
