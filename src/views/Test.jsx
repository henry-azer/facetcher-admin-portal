import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
     addUser,
     deleteUser,
     //      addUserRole,
     getAllUsers,
} from "../store/actions/users/users-actions";
import { getAllSubmissions, getAllUsersSubmissionsById } from "../store/actions/submission/submission-actions";

const Test = () => {
     const dispatch = useDispatch();
     const [isDataFetched, setIsDataFetched] = useState(false);

     // useEffect(() => {});
     // const submissions = useSelector((state) => state);
     // console.log(submissions);
     // const [fetchingData, setFetchingData] = useState(true);
     // useEffect(() => {
     //      if (fetchingData) {
     //           //    dispatch(addUserRole(1));
     //           dispatch(getAllUsers());
     //           setFetchingData(false);
     //      }
     // });

     const testFunction = () => {
          dispatch(getAllUsersSubmissionsById(1));
     };

     return (
          <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
               <button
                    className="btn btn-lg btn-light"
                    onClick={() => testFunction()}
               >
                    Test
               </button>
          </div>
     );
};
export default Test;
