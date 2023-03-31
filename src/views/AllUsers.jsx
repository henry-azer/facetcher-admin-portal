import React, { useEffect, useState } from "react";
import FacetcherDrawer from "../components/drawer/drawer";
import FacetcherSearchComponent from "../components/search-component";
import FacetcherSelectComponent from "../components/select-component";
import FacetcherTable from "../components/tables/table";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store/actions/users/users-actions";
import FacetcherCircularChart from "../components/charts/circularChart";

const AllUsers = () => {
     const dispatch = useDispatch();
     const [isUsersFetched, setIsUsersFetched] = useState(false);

     useEffect(() => {
          document.title = "All User | Facetcher";

          if (!isUsersFetched) {
               dispatch(getAllUsers());
               setIsUsersFetched(true);
          }
     });

     const allUsers = useSelector((state) => state.user.allUsers);
     console.log(allUsers);

     // const users =

     const headerArray = [
          "ID",
          "User Name",
          "Role",
          "No. of uses",
          "Gender",
          "Efficiency",
     ];

     return (
          <div>
               <FacetcherDrawer>
                    <div className="p-5 w-100 d-flex justify-content-center align-items-center flex-column vh-100">
                         <div className="w-100 d-flex justify-content-between align-items-center mb-5">
                              <h1 className="fs-3 fw-bold m-0">All Users</h1>
                              <button className="btn bg-transparent border border-grey light-grey-border fw-bold px-3 rounded-pill text-light-grey">
                                   <PersonAddAltIcon /> Create New User
                              </button>
                         </div>
                         <form className="w-100 d-flex justify-content-between align-items-end">
                              <FacetcherSearchComponent placeHolder="Search by user name" />
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
                                        label="Efficiency"
                                        options={[
                                             "Efficiency ...",
                                             "Best",
                                             "Worst",
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
                                   <button className="btn bg-cyan rounded-pill px-5 text-light-grey">
                                        Search
                                   </button>
                              </div>
                         </form>

                         <div className="w-100 my-5 overflowY-scroll ">
                              <FacetcherTable
                                   table={2}
                                   headerArray={headerArray}
                                   dataLength={allUsers && allUsers.length}
                              >
                                   {allUsers &&
                                        allUsers
                                             .filter((obj) => {
                                                  return (
                                                       obj.markedAsDeleted ===
                                                       false
                                                  );
                                             })
                                             .map((user, index) => (
                                                  <tr
                                                       className="h-25"
                                                       key={index}
                                                  >
                                                       <td>{user.id}</td>
                                                       <td className="text-capitalize">
                                                            {user.firstName +
                                                                 " " +
                                                                 user.lastName}
                                                       </td>
                                                       <td className="text-capitalize">
                                                            {user
                                                                 .userRoles[0] &&
                                                                 user
                                                                      .userRoles[0]
                                                                      .role
                                                                      .name}
                                                       </td>
                                                       <td className="text-capitalize">
                                                            {}
                                                       </td>
                                                       <td>{user.gender}</td>
                                                       <td>
                                                            <FacetcherCircularChart
                                                                 value={50}
                                                                 maxValue={200}
                                                                 color="cyan"
                                                                 width={25}
                                                                 strokeWidth={
                                                                      14
                                                                 }
                                                                 text={"none"}
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
export default AllUsers;
