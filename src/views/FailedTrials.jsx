import React, { useEffect, useState } from "react";
import FacetcherDrawer from "../components/drawer/drawer";
import FacetcherSearchComponent from "../components/search-component";
import FacetcherSelectComponent from "../components/select-component";
import FacetcherTable from "../components/tables/table";
import { FAILED_TRIALS, itemsPerPage } from "../constants/app_constants";
import { getCurrentUser } from "../store/actions/auth/auth-actions";
import { useDispatch, useSelector } from "react-redux";
import { getAllFailedTrials } from "../store/actions/trials/trials-action";
import { useFormik } from "formik";

const FailedTrials = () => {
     const headerArray = [
          "ID",
          "Submission Title",
          "Date",
          "Time",
          "Drawing Gender",
          "Preview",
     ];
     const imgSize = 350;

     const [fetchingData, setFetchingData] = useState(true);
     const [isUsersFetched, setIsUsersFetched] = useState(false);
     const [currentPage, setCurrentPage] = useState(0);
     const startIndex = currentPage * itemsPerPage;
     const endIndex = startIndex + itemsPerPage;
     const [filtered, setFiltered] = useState(null);
     const formik = useFormik({
          initialValues: {
               name: "",
               date: "newest",
               gender: "gender ...",
          },
          onSubmit: (values) => {
               if (
                    values.date === "newest" &&
                    values.gender === "gender ..." &&
                    values.name === ""
               ) {
                    setFiltered(null);
               } else {
                    setFiltered(values);
               }
          },
     });

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

     const pureFailedTrials = state.trials.allFailedTrials;
     let failedTrials;
     if (pureFailedTrials) failedTrials = [...pureFailedTrials];
     if (filtered) {
          if (filtered.date !== "newest") {
               failedTrials = failedTrials.reverse();
          }
          if (filtered.gender !== "gender ...") {
               if (filtered.gender === "male") {
                    failedTrials = failedTrials.filter((obj) => {
                         return obj.gender === "MALE";
                    });
               } else {
                    failedTrials = failedTrials.filter((obj) => {
                         return obj.gender === "FEMALE";
                    });
               }
          }
          if (filtered.name !== "") {
               failedTrials = failedTrials.filter((obj) => {
                    return obj.title
                         .toLowerCase()
                         .includes(filtered.name.toLowerCase());
               });
          }
     } else if (filtered === null) {
          failedTrials = pureFailedTrials;
     }

     return (
          <div className="w-100">
               <FacetcherDrawer route={FAILED_TRIALS}>
                    <div className="p-5 pb-0 w-100 d-flex justify-content-start align-items-center flex-column h-100">
                         <div className="w-100 d-flex justify-content-between align-items-center mb-5">
                              <h1 className="fs-3 fw-bold m-0">
                                   Failed Trials
                              </h1>
                         </div>
                         <form
                              onSubmit={formik.handleSubmit}
                              className="w-100 d-flex justify-content-between align-items-end"
                         >
                              <FacetcherSearchComponent
                                   placeHolder="Search by drawing title"
                                   name="name"
                                   value={formik.values.name}
                                   onChange={formik.handleChange}
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
                                        label="Gender"
                                        options={[
                                             "Gender ...",
                                             "Male",
                                             "Female",
                                        ]}
                                        name="gender"
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}
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
                                   dataLength={
                                        failedTrials && failedTrials.length
                                   }
                                   initialPage={currentPage}
                                   handlePageClick={(e) =>
                                        setCurrentPage(e.selected)
                                   }
                              >
                                   {failedTrials &&
                                        failedTrials.slice(startIndex, endIndex).map((trial, index) => (
                                             <tr className="h-25" key={index}>
                                                  <td>{trial.id}</td>
                                                  <td className="text-capitalize">
                                                       {trial.title}
                                                  </td>
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
