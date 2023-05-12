import React, { useEffect, useState } from "react";
import FacetcherDrawer from "../components/drawer/drawer";
import FacetcherSearchComponent from "../components/search-component";
import FacetcherSelectComponent from "../components/select-component";
import FacetcherTable from "../components/tables/table";
import { SUBMISSIONS, itemsPerPage } from "../constants/app_constants";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/actions/auth/auth-actions";
import { getAllSubmissions } from "../store/actions/submission/submission-actions";
import { getAllUsers } from "../store/actions/users/users-actions";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const Submissions = () => {
     const headerArray = [
          "ID",
          "Submission Title",
          "Date",
          "Time",
          "Drawing Gender",
          "Submitted",
     ];

     const dispatch = useDispatch();
     const navigate = useNavigate();
     const [fetchingData, setFetchingData] = useState(true);
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

     useEffect(() => {
          document.title = "Submissions | Facetcher";

          if (fetchingData) {
               dispatch(getCurrentUser());
               dispatch(getAllSubmissions());
               setFetchingData(false);
          }
     }, []);

     const allPureSubmissions = useSelector(
          (state) => state.submissions.allSubmissions
     );
     let allSubmissions;
     if (allPureSubmissions) allSubmissions = [...allPureSubmissions];
     if (filtered) {
          if (filtered.date !== "newest") {
               allSubmissions = allSubmissions.reverse();
          }
          if (filtered.gender !== "gender ...") {
               if (filtered.gender === "male") {
                    allSubmissions = allSubmissions.filter((obj) => {
                         return obj.gender === "MALE";
                    });
               } else {
                    allSubmissions = allSubmissions.filter((obj) => {
                         return obj.gender === "FEMALE";
                    });
               }
          }
          if (filtered.name !== "") {
               allSubmissions = allSubmissions.filter((obj) => {
                    return obj.title
                         .toLowerCase()
                         .includes(filtered.name.toLowerCase());
               });
          }
     } else if (filtered === null) {
          allSubmissions = allPureSubmissions;
     }
     console.log(allSubmissions);

     return (
          <div className="w-100">
               <FacetcherDrawer route={SUBMISSIONS}>
                    <div className="p-5 pb-0 w-100 d-flex justify-content-start align-items-center flex-column h-100">
                         <div className="w-100 d-flex justify-content-between align-items-center mb-5">
                              <h1 className="fs-3 fw-bold m-0">Submissions</h1>
                         </div>
                         <form
                              onSubmit={formik.handleSubmit}
                              className="w-100 d-flex justify-content-between align-items-end"
                         >
                              <FacetcherSearchComponent
                                   placeHolder="Search by submission title"
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
                                   table={2}
                                   headerArray={headerArray}
                                   dataLength={
                                        allSubmissions && allSubmissions.length
                                   }
                                   initialPage={currentPage}
                                   handlePageClick={(e) =>
                                        setCurrentPage(e.selected)
                                   }
                              >
                                   {allSubmissions &&
                                        allSubmissions
                                             .slice(startIndex, endIndex)
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
                                                            {submission.title}
                                                       </td>
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
                                                       <td className="text-lowercase">
                                                            {submission.gender}
                                                       </td>
                                                       <td>
                                                            {submission.submitted
                                                                 ? "Yes"
                                                                 : "No"}
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
