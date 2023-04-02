import React from "react";
import FacetcherDrawer from "../components/drawer/drawer";
import FacetcherSearchComponent from "../components/search-component";
import FacetcherSelectComponent from "../components/select-component";
import FacetcherTable from "../components/tables/table";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { ALL_ADMINS } from "../constants/app_constants";

const AllAdmins = () => {
     const headerArray = [
          "ID",
          "Admin Name",
          "Rank",
          "No. of uses",
          "Gender",
          "Efficiency",
     ];

     return (
          <div className="w-100">
               <FacetcherDrawer route={ALL_ADMINS}>
                                       <div className="p-5 pb-0 w-100 d-flex justify-content-start align-items-center flex-column h-100">

                         <div className="w-100 d-flex justify-content-between align-items-center mb-5">
                              <h1 className="fs-3 fw-bold m-0">All Admins</h1>
                              <button className="btn bg-transparent border border-grey light-grey-border fw-bold px-3 rounded-pill text-light-grey">
                                   <PersonAddAltIcon /> Create New Admin
                              </button>
                         </div>
                         <form className="w-100 d-flex justify-content-between align-items-end">
                              <FacetcherSearchComponent placeHolder="Search by admin name" />
                              <div className="w-50 d-flex justify-content-around">
                                   <FacetcherSelectComponent
                                        width="25"
                                        label="Alphabetic"
                                        options={[
                                             "Alphabetic ...",
                                             "A-Z",
                                             "Z-A",
                                        ]}
                                   />
                                   <FacetcherSelectComponent
                                        width="25"
                                        label="Gender"
                                        options={[
                                             "Gender ...",
                                             "Male",
                                             "Female",
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
                              >
                                   <tr>
                                        <td>Col1</td>
                                        <td>Col2</td>
                                        <td>Col3</td>
                                        <td>Col4</td>
                                        <td>Col5</td>
                                        <td>Col6</td>
                                   </tr>
                              </FacetcherTable>
                         </div>
                    </div>
               </FacetcherDrawer>
          </div>
     );
};
export default AllAdmins;
