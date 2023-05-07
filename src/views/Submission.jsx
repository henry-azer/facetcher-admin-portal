import React, { useEffect, useState } from "react";
import FacetcherDrawer from "../components/drawer/drawer";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/actions/auth/auth-actions";
import { useLocation, useNavigate } from "react-router-dom";
import { getSubmissionById } from "../store/actions/submission/submission-actions";
import FacetcherTable from "../components/tables/table";
import { itemsPerPage } from "../constants/app_constants";

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
          "Submission Title",
          "Drawing Gender",
          "Submitted",
     ];
     const [currentPage, setCurrentPage] = useState(0);

     useEffect(() => {
          document.title = "All User | Dashboard";

          if (fetchingData) {
               //    if (!location.state) {
               //         navigate("/");
               //    }
               // else{

               dispatch(getCurrentUser());
               dispatch(getSubmissionById(33));
               setFetchingData(false);
               // }
          }
     }, []);

     const submission = useSelector(
          (state) => state.submissions.submissionById
     );
     console.log(submission);

     return (
          <FacetcherDrawer>
               {submission && (
                    <div className="w-100 h-100 overflowY-scroll mt-3 p-5">
                         <h1 className="fs-3 fw-bold m-0">
                              Submission Title: {submission.title}
                         </h1>
                         <div className="w-50 d-flex justify-content-between my-4">
                              <h1 className="text-grey fs-6">
                                   Gender: {submission.gender}
                              </h1>
                              <h1 className="text-grey fs-6">
                                   Number Of trials: 0
                              </h1>
                         </div>
                         <h1 className="text-grey fs-6">
                              Description: {submission.description}
                         </h1>
                         <div className="w-100 d-flex justify-content-center align-items-center">
                              {submission.inputImage ||
                              submission.inputImage ? (
                                   <div className="w-75 my-3 d-flex justify-content-around align-items-center">
                                        <div
                                             className="overflow-hidden rounded-4"
                                             style={{
                                                  width: imgSize,
                                                  height: imgSize,
                                             }}
                                        >
                                             <img
                                                  className="w-100 rounded-4"
                                                  src={
                                                       submission.inputImage
                                                            .imageUrl
                                                  }
                                             />
                                        </div>
                                        <div
                                             className="overflow-hidden rounded-4"
                                             style={{
                                                  width: imgSize,
                                                  height: imgSize,
                                             }}
                                        >
                                             <img
                                                  className="w-100 rounded-4"
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
                              table={2}
                              headerArray={headerArray}
                              error="No trails in this submission"
                              // dataLength={
                              //      allSubmissions && allSubmissions.length
                              // }
                              initialPage={currentPage}
                              // handlePageClick={(e) =>
                              //      setCurrentPage(
                              //           (e.selected * itemsPerPage) %
                              //                allSubmissions.length
                              //      )
                              // }
                         >
                              {/* {submissionTrails &&
                                        submissionTrails
                                             .slice(
                                                  currentPage,
                                                  currentPage + itemsPerPage
                                             )
                                             .map((submission, index) => (
                                                  <tr
                                                       className="h-25"
                                                       key={index}
                                                       onClick={() => {
                                                            navigate(
                                                                 "/submission",
                                                                 {
                                                                      state: {
                                                                           id:
                                                                                submission.id,
                                                                      },
                                                                 }
                                                            );
                                                       }}
                                                  >
                                                       <td>{submission.id}</td>
                                                       <td className="text-capitalize">
                                                            {new Date(
                                                                 submission.creationDate
                                                            ).toDateString()}
                                                       </td>
                                                       <td className="text-capitalize">
                                                            {new Date(
                                                                 submission.creationDate
                                                            ).toLocaleTimeString()}
                                                       </td>
                                                       <td className="text-capitalize">
                                                            {submission.title}
                                                       </td>
                                                       <td className="text-lowercase">
                                                            {submission.gender}
                                                       </td>
                                                       <td>
                                                            {submission.submitted
                                                                 ? "Yes"
                                                                 : "No"}
                                                       </td>
                                                  </tr>
                                             ))} */}
                         </FacetcherTable>
                    </div>
               )}
          </FacetcherDrawer>
     );
};
export default Submission;
