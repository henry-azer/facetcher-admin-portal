import React, { useEffect, useState } from "react";
import FacetcherDrawer from "../components/drawer/drawer";
import FacetcherSearchComponent from "../components/search-component";
import FacetcherSelectComponent from "../components/select-component";
import FacetcherTable from "../components/tables/table";
import { FAILED_TRIALS, itemsPerPage } from "../constants/app_constants";
import { getCurrentUser } from "../store/actions/auth/auth-actions";
import { useDispatch, useSelector } from "react-redux";
import { getAllFailedTrials } from "../store/actions/trials/trials-action";

const FailedTrials = () => {
     const headerArray = [
          "ID",
          "Date",
          "Time",
          "Submission Title",
          "Drawing Gender",
          "Preview",
     ];
     const imgSize = 350;

     const [fetchingData, setFetchingData] = useState(true);
     const [isUsersFetched, setIsUsersFetched] = useState(false);
     const [currentPage, setCurrentPage] = useState(0);

     const dispatch = useDispatch();
     const state = useSelector((state) => state);

     useEffect(() => {
          document.title = "All Admins | Facetcher";

          if (fetchingData) {
               dispatch(getCurrentUser());
               dispatch(getAllFailedTrials());
               setFetchingData(false);
          }
     });

     const failedTrials = state.trials.allFailedTrials;

     return (
          <div className="w-100">
               <FacetcherDrawer route={FAILED_TRIALS}>
                    <div className="p-5 pb-0 w-100 d-flex justify-content-start align-items-center flex-column h-100">
                         <div className="w-100 d-flex justify-content-between align-items-center mb-5">
                              <h1 className="fs-3 fw-bold m-0">
                                   Failed Trials
                              </h1>
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
                                   hover
                                   table={2}
                                   headerArray={headerArray}
                                   dataLength={
                                        failedTrials && failedTrials.length
                                   }
                                   initialPage={currentPage}
                                   handlePageClick={(e) =>
                                        setCurrentPage(
                                             (e.selected * itemsPerPage) %
                                                  failedTrials.length
                                        )
                                   }
                              >
                                   {failedTrials &&
                                        failedTrials.map((trial, index) => (
                                             <tr className="h-25" key={index}>
                                                  <td>{trial.id}</td>
                                                  <td className="text-capitalize">
                                                       {new Date(
                                                            trial.creationDate
                                                       ).toDateString()}
                                                  </td>
                                                  <td className="text-capitalize">
                                                       {new Date(
                                                            trial.creationDate
                                                       ).toLocaleTimeString()}
                                                  </td>
                                                  <td className="text-capitalize">
                                                       {trial.title}
                                                  </td>
                                                  <td className="text-lowercase">
                                                       {trial.gender}
                                                  </td>
                                                  <td>
                                                       <img
                                                            className="rounded-4"
                                                            src={
                                                                 trial
                                                                      .inputImage
                                                                      .imageUrl
                                                            }
                                                            style={{
                                                                 width:
                                                                      imgSize /
                                                                      3,
                                                                 height:
                                                                      imgSize /
                                                                      3,
                                                            }}
                                                       />
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
export default FailedTrials;
