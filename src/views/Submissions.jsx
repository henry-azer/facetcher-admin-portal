import React, { useEffect, useState } from "react";
import FacetcherDrawer from "../components/drawer/drawer";
import FacetcherSearchComponent from "../components/search-component";
import FacetcherSelectComponent from "../components/select-component";
import FacetcherTable from "../components/tables/table";
import { SUBMISSIONS } from "../constants/app_constants";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/actions/auth/auth-actions";
import { getAllSubmissions } from "../store/actions/submission/submission-actions";
import { getAllUsers } from "../store/actions/users/users-actions";

const Submissions = () => {
     const headerArray = ["ID", "Date", "Submission Title", "Drawing Gender"];

     const dispatch = useDispatch();
     const [fetchingData, setFetchingData] = useState(true);

     useEffect(() => {
          document.title = "Submissions | Facetcher";

          if (fetchingData) {
               dispatch(getCurrentUser());
               dispatch(getAllSubmissions());
               setFetchingData(false);
          }
     });

     const allSubmissions = useSelector(
          (state) => state.submissions.allSubmissions
     );
     console.log(allSubmissions);

     return (
          <div className="w-100">
               <FacetcherDrawer route={SUBMISSIONS}>
                    <div className="p-5 pb-0 w-100 d-flex justify-content-start align-items-center flex-column h-100">
                         <div className="w-100 d-flex justify-content-between align-items-center mb-5">
                              <h1 className="fs-3 fw-bold m-0">Submissions</h1>
                         </div>
                         <form className="w-100 d-flex justify-content-between align-items-end">
                              <FacetcherSearchComponent placeHolder="Search by drawing title" />
                              <div className="w-50 d-flex justify-content-around">
                                   <FacetcherSelectComponent
                                        width="25"
                                        label="Date"
                                        options={["Newest", "Latest"]}
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
                                   dataLength={2}
                              >
                                   {allSubmissions &&
                                        allSubmissions
                                             .sort(
                                                  (objA, objB) =>
                                                       Number(
                                                            new Date(
                                                                 objB.creationDate
                                                            )
                                                       ) -
                                                       Number(
                                                            new Date(
                                                                 objA.creationDate
                                                            )
                                                       )
                                             )
                                             // .filter((obj) => {
                                             //      return (
                                             //           obj.markedAsDeleted ===
                                             //                false &&
                                             //           obj.userRoles[0] &&
                                             //           obj.userRoles[0].role
                                             //                .name !== "ADMIN"
                                             //      );
                                             // })
                                             .map((submission, index) => (
                                                  <tr
                                                       className="h-25"
                                                       key={index}
                                                  >
                                                       <td>{submission.id}</td>
                                                       <td className="text-capitalize">
                                                            {new Date(
                                                                 submission.creationDate
                                                            ).toDateString()}
                                                       </td>
                                                       <td className="text-capitalize">
                                                            {submission.title}
                                                       </td>
                                                       <td className="text-lowercase">
                                                            {submission.gender}
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
export default Submissions;
