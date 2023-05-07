import React, { useEffect, useState } from "react";
import FacetcherDrawer from "../components/drawer/drawer";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/actions/auth/auth-actions";
import { useLocation, useNavigate } from "react-router-dom";
import { getSubmissionById } from "../store/actions/submission/submission-actions";
import FacetcherTable from "../components/tables/table";
import { itemsPerPage } from "../constants/app_constants";
import { trialsBySubmissionId } from "../store/actions/trials/trials-action";

const Submission = () => {
     const state = useSelector((state) => state);
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const [fetchingData, setFetchingData] = useState(true);
     const location = useLocation();
     const imgSize = 350;
     const headerArray = [
          "ID",
          "Date",
          "Time",
          // "Trial Title",
          "Drawing Gender",
          "Preview",
     ];
     const [currentPage, setCurrentPage] = useState(0);

     useEffect(() => {
          document.title = "All User | Dashboard";

          if (fetchingData) {
               if (!location.state) {
                    navigate("/");
               } else {
                    dispatch(getCurrentUser());
                    dispatch(getSubmissionById(location.state.id));
                    dispatch(trialsBySubmissionId(location.state.id));
                    setFetchingData(false);
               }
          }
     }, [location.state && location.state.id]);

     const submission = useSelector(
          (state) => state.submissions.submissionById
     );
     const trials = useSelector((state) => state.trials.trialsBySubmissionId);
     console.log(trials);

     return (
          <FacetcherDrawer>
               {submission && trials && (
                    <div className="w-100 h-100 overflowY-scroll mt-3 p-5">
                         <h1 className="fs-3 fw-bold m-0">
                              Submission Title: {submission.title}
                         </h1>
                         <div className="w-50 d-flex justify-content-between my-4">
                              <h1 className="text-grey fs-6">
                                   Gender: {submission.gender}
                              </h1>
                              <h1 className="text-grey fs-6">
                                   Number Of trials: {trials.length}
                              </h1>
                         </div>
                         <h1 className="text-grey fs-6">
                              Description: {submission.description}
                         </h1>
                         <div className="w-100 d-flex justify-content-center align-items-center">
                              {submission.inputImage ||
                              submission.inputImage ? (
                                   <div className="w-75 my-4 d-flex justify-content-around align-items-center">
                                        <div
                                             className="overflow-hidden rounded-5 grey-border"
                                             style={{
                                                  width: imgSize,
                                                  height: imgSize,
                                             }}
                                        >
                                             <img
                                                  className="w-100 rounded-5"
                                                  src={
                                                       submission.inputImage
                                                            .imageUrl
                                                  }
                                             />
                                        </div>
                                        <div
                                             className="overflow-hidden rounded-5 grey-border"
                                             style={{
                                                  width: imgSize,
                                                  height: imgSize,
                                             }}
                                        >
                                             <img
                                                  className="w-100 rounded-5"
                                                  src={
                                                       submission.outputImage
                                                            .imageUrl
                                                  }
                                             />
                                        </div>
                                   </div>
                              ) : (
                                   <div
                                        className="d-flex justify-content-center align-items-center"
                                        style={{ height: imgSize / 1.5 }}
                                   >
                                        {" "}
                                        <h1 className="fs-5">
                                             No Images for this Submission
                                        </h1>
                                   </div>
                              )}
                         </div>
                         <FacetcherTable
                              hover
                              table={2}
                              headerArray={headerArray}
                              error="No trails in this submission"
                              dataLength={trials && trials.length}
                              initialPage={currentPage}
                              handlePageClick={(e) =>
                                   setCurrentPage(
                                        (e.selected * itemsPerPage) %
                                             trials.length
                                   )
                              }
                         >
                              {trials &&
                                   trials
                                        .slice(
                                             currentPage,
                                             currentPage + itemsPerPage
                                        )
                                        .map((trial, index) => (
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
                                                  {/* <td className="text-capitalize">
                                                       {trial.title}
                                                  </td> */}
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
               )}
          </FacetcherDrawer>
     );
};
export default Submission;
