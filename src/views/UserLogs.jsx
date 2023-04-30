import React, { useEffect, useState } from "react";
import FacetcherDrawer from "../components/drawer/drawer";
import FacetcherSearchComponent from "../components/search-component";
import FacetcherSelectComponent from "../components/select-component";
import FacetcherTable from "../components/tables/table";
import { USERS_LOGS, itemsPerPage } from "../constants/app_constants";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/actions/auth/auth-actions";
import { getAllLogs } from "../store/actions/logs/logs-actions";

const UserLogs = () => {
     const state = useSelector((state) => state);
     const headerArray = ["ID", "User Name", "Activity", "Date", "Time"];

     const [fetchingData, setFetchingData] = useState(true);
     const dispatch = useDispatch();
     const [currentPage, setCurrentPage] = useState(0);

     useEffect(() => {
          document.title = "All Admins | Facetcher";

          if (fetchingData) {
               dispatch(getCurrentUser());
               dispatch(getAllLogs());
               // dispatch(getAllUsers());
               setFetchingData(false);
          }
     });

     const logs = state.logs.allLogs;

     return (
          <div className="w-100">
               <FacetcherDrawer route={USERS_LOGS}>
                    <div className="p-5 pb-0 w-100 d-flex justify-content-start align-items-center flex-column h-100">
                         <div className="w-100 d-flex justify-content-between align-items-center mb-5">
                              <h1 className="fs-3 fw-bold m-0">User Logs</h1>
                         </div>
                         <form className="w-100 d-flex justify-content-between align-items-end">
                              <FacetcherSearchComponent placeHolder="Search by user name" />
                              <div className="w-50 d-flex justify-content-around">
                                   <FacetcherSelectComponent
                                        width="25"
                                        label="Alphabetic"
                                        options={[
                                             "Alphabetic...",
                                             "A-z",
                                             "Z-A",
                                        ]}
                                   />
                                   <FacetcherSelectComponent
                                        width="25"
                                        label="Activity"
                                        options={[
                                             "Activity ...",
                                             "LOGIN",
                                             "LOGOUT",
                                        ]}
                                   />
                              </div>
                              <div className="w-25 d-flex justify-content-end">
                                   <button className="btn bg-cyan rounded-pill px-5 text-light-grey fw-bold">
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
                                        setCurrentPage(
                                             (e.selected * itemsPerPage) %
                                                  logs.length
                                        )
                                   }
                              >
                                   {logs &&
                                        logs
                                             .slice(
                                                  currentPage,
                                                  currentPage + itemsPerPage
                                             )
                                             .map((log, index) => (
                                                  <tr
                                                       className="h-25"
                                                       key={index}
                                                  >
                                                       <td>{log.id}</td>
                                                       <td className="text-capitalize">
                                                            {log.user.firstName}
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
