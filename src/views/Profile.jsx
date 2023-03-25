import React, { useEffect, useState } from "react";
import FacetcherDrawer from "../components/drawer/drawer";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/actions/auth/auth-actions";

const Profile = () => {
     const store = useSelector((state) => state);
     const dispatch = useDispatch();

     const [isUserFetched, setIsUserFetched] = useState(false);

     useEffect(() => {
          document.title = "User Profile | Facetcher";

          if (!isUserFetched) {
               dispatch(getCurrentUser());
               setIsUserFetched(true);
          }
     });

     const user = store.auth.authenticatedUser;
     console.log(user);

     return (
          <div>
               <FacetcherDrawer>
                    <div className="row h-100 justify-content-center align-items-center gx-2 h-75 mt-5">
                         {user && (
                              <div className="col-4 bg-dark-grey mx-2 p-3 position-relative d-flex justify-content-center h-100">
                                   <div className=" bg-dark-grey2 w-100 h-20 user-profile-pic position-absolute top-0"></div>
                                   <div className=" rounded-circle bg-cyan grey-border user-profile-pic position-absolute top-0 overflow-hidden">
                                        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                                             {user.profilePictureUrl ? (
                                                  <img
                                                       src={`${user.profilePictureUrl}`}
                                                  />
                                             ) : (
                                                  <PersonIcon
                                                       sx={{ fontSize: 160 }}
                                                  />
                                             )}
                                        </div>
                                   </div>
                                   <div className=" align-self-end h-75 pt-5 text-center">
                                        <h1 className="mt-3 fs-4 fw-bold text-capitalize">
                                             {user.firstName + " " + user.lastName}
                                        </h1>
                                        <h1 className="fs-6 text-cyan">
                                             {user.email}
                                        </h1>
                                   </div>
                              </div>
                         )}
                         <div className="col bg-dark-grey mx-2 p-3 h-100">
                              <button
                                   onClick={() => {
                                        dispatch(getCurrentUser());
                                        console.log(store);
                                   }}
                              >
                                   Get User
                              </button>
                         </div>
                    </div>
               </FacetcherDrawer>
          </div>
     );
};
export default Profile;
