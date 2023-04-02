import React from "react";
import FacetcherDrawer from "../components/drawer/drawer";
import FacetcherSearchComponent from "../components/search-component";
import FacetcherSelectComponent from "../components/select-component";
import FacetcherTable from "../components/tables/table";
import { USERS_LOGS } from "../constants/app_constants";

const UserLogs = () => {
     const headerArray = ["ID", "User Name", "Activity", "Date and Time"];

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
                                             "Login",
                                             "Log Out",
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
                                   table={2}
                                   headerArray={headerArray}
                                   dataLength={2}

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
                              </FacetcherTable>
                         </div>
                    </div>
               </FacetcherDrawer>
          </div>
     );
};
export default UserLogs;
