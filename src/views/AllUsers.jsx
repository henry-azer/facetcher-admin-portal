import React, { useEffect, useState } from "react";
import FacetcherDrawer from "../components/drawer/drawer";
import FacetcherSearchComponent from "../components/search-component";
import FacetcherSelectComponent from "../components/select-component";
import FacetcherTable from "../components/tables/table";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store/actions/users/users-actions";
import { ALL_USERS, itemsPerPage } from "../constants/app_constants";
import { getCurrentUser } from "../store/actions/auth/auth-actions";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const AllUsers = () => {
     const dispatch = useDispatch();
     const [isUsersFetched, setIsUsersFetched] = useState(false);
     const [currentPage, setCurrentPage] = useState(0);
     const [filtered, setFiltered] = useState(null);
     const navigate = useNavigate();
     const formik = useFormik({
          initialValues: {
               name: "",
               alphabetic: "alphabetic ...",
               gender: "gender ...",
          },
          onSubmit: (values) => {
               setFiltered(values);
          },
     });

     // console.log(formik.values);

     useEffect(() => {
          document.title = "All User | Facetcher";

          if (!isUsersFetched) {
               dispatch(getAllUsers());
               dispatch(getCurrentUser());
               setIsUsersFetched(true);
          }
     });

     const allPureUsers = useSelector((state) => state.user.allUsers);
     let allUsers = allPureUsers;
     if (filtered) {
          if (filtered.alphabetic !== "alphabetic ...") {
               if (filtered.alphabetic === "a-z")
                    allUsers = allUsers.sort(function(a, b) {
                         if (
                              a.firstName.toLowerCase() <
                              b.firstName.toLowerCase()
                         ) {
                              return -1;
                         }
                    });
               else if (filtered.alphabetic === "z-a")
                    allUsers = allUsers.sort(function(a, b) {
                         if (
                              a.firstName.toLowerCase() >
                              b.firstName.toLowerCase()
                         ) {
                              return -1;
                         }
                    });
          }
          if (filtered.gender !== "gender ...") {
               if (filtered.gender === "male") {
                    allUsers = allUsers.filter((obj) => {
                         return obj.gender === "MALE";
                    });
               } else {
                    allUsers = allUsers.filter((obj) => {
                         return obj.gender === "FEMALE";
                    });
               }
          }
          if (filtered.name !== "") {
               allUsers = allUsers.filter((obj) => {
                    return obj.firstName
                         .toLowerCase()
                         .includes(filtered.name.toLowerCase());
               });
          }
     }

     console.log(allUsers);

     const headerArray = ["ID", "First Name", "Last Name", "Email", "Gender"];

     return (
          <div>
               <FacetcherDrawer route={ALL_USERS}>
                    <div className="p-5 pb-0 w-100 d-flex justify-content-start align-items-center flex-column h-100">
                         <div className="w-100 d-flex justify-content-between align-items-center mb-5">
                              <h1 className="fs-3 fw-bold m-0">All Users</h1>
                              <button
                                   onClick={() =>
                                        navigate("/create-user", {
                                             state: { userType: "User" },
                                        })
                                   }
                                   className="btn bg-transparent border border-grey light-grey-border fw-bold px-3 rounded-pill text-light-grey"
                              >
                                   <PersonAddAltIcon /> Create New User
                              </button>
                         </div>
                         <form
                              onSubmit={formik.handleSubmit}
                              className="w-100 d-flex justify-content-between align-items-end"
                         >
                              <FacetcherSearchComponent
                                   name="name"
                                   value={formik.values.name}
                                   onChange={formik.handleChange}
                                   placeHolder="Search by user name"
                              />
                              <div className="w-50 d-flex justify-content-around">
                                   <FacetcherSelectComponent
                                        width="25"
                                        label="Alphabetic"
                                        name="alphabetic"
                                        value={formik.values.alphabetic}
                                        onChange={formik.handleChange}
                                        options={[
                                             "Alphabetic ...",
                                             "A-Z",
                                             "Z-A",
                                        ]}
                                   />

                                   <FacetcherSelectComponent
                                        width="25"
                                        label="Gender"
                                        name="gender"
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}
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
                                   dataLength={
                                        allUsers &&
                                        allUsers.filter((obj) => {
                                             return (
                                                  obj.userRoles[0].role.name !==
                                                  "ADMIN"
                                             );
                                        }).length
                                   }
                                   initialPage={currentPage}
                                   handlePageClick={(e) =>
                                        setCurrentPage(
                                             (e.selected * itemsPerPage) %
                                                  allUsers.filter((obj) => {
                                                       return (
                                                            obj.userRoles[0]
                                                                 .role.name !==
                                                            "ADMIN"
                                                       );
                                                  }).length
                                        )
                                   }
                              >
                                   {allUsers &&
                                        allUsers
                                             .filter((obj) => {
                                                  return (
                                                       obj.userRoles[0].role
                                                            .name !== "ADMIN"
                                                  );
                                             })
                                             .map((user, index) => (
                                                  <tr
                                                       className="h-25"
                                                       key={index}
                                                       onClick={() =>
                                                            navigate(
                                                                 "/profile",
                                                                 {
                                                                      state: {
                                                                           id:
                                                                                user.id,
                                                                      },
                                                                 }
                                                            )
                                                       }
                                                  >
                                                       <td>{user.id}</td>
                                                       <td className="text-capitalize">
                                                            {user.firstName}
                                                       </td>
                                                       <td className="text-capitalize">
                                                            {user.lastName}
                                                       </td>
                                                       <td className="text-lowercase">
                                                            {user.email}
                                                       </td>

                                                       <td className="text-lowercase">
                                                            {user.gender}
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
export default AllUsers;
