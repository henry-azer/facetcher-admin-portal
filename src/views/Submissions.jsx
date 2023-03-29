import React from "react";
import FacetcherDrawer from "../components/drawer/drawer";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
import FacetcherSearchComponent from "../components/search-component";

const Submissions = () => {
     const tableTitles = [
          "ID",
          "Date",
          "User",
          "Submission Name",
          "Gender",
          "Preview",
     ];

     return (
          <div className="w-100">
               <FacetcherDrawer>
                    <div className="p-5 w-100 d-flex justify-content-center align-items-center flex-column">
                         <div className="w-100 d-flex justify-content-between align-items-center mb-5">
                              <h1 className="fs-3 fw-bold m-0">Submissions</h1>
                              {/* <button className="btn bg-transparent border border-grey light-grey-border fw-bold px-3 rounded-pill text-light-grey">
                                   <PersonAddAltIcon /> Create New User
                              </button> */}
                         </div>
                         <div className="w-100 d-flex justify-content-between align-items-end">
                              <FacetcherSearchComponent placeHolder="Search by drawing title" />
                              <div className="w-50">
                                   <div>
                                        <h1 className="fs-6">Date</h1>
                                        <select className="bg-transparent light-grey-border p-1 rounded-pill text-light-grey w-25">
                                             <option value="newest">
                                                  Newest
                                             </option>
                                             <option value="latest">
                                                  Latest
                                             </option>
                                        </select>
                                   </div>
                              </div>
                         </div>
                    </div>
               </FacetcherDrawer>
          </div>
     );
};
export default Submissions;
