import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
     addUser,
     deleteUser,
     //      addUserRole,
     getAllUsers,
} from "../store/actions/users/users-actions";
import {
     getAllSubmissions,
     getAllUsersSubmissionsById,
} from "../store/actions/submission/submission-actions";
import { useRef } from "react";

const Test = () => {
     const dispatch = useDispatch();
     const [isDataFetched, setIsDataFetched] = useState(false);
     const fileInput = useRef(null);

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
          // dispatch(getAllUsersSubmissionsById(1));
          // dispatch(
          //      // addUser(
          //      //      {
          //      //           firstName: "Bavly",
          //      //           lastName: "Ashraf",
          //      //           email: "bavly@facetcher.com",
          //      //           password: "admin@facetcher",
          //      //           phoneNumber: "+201271931937",
          //      //           gender: "MALE",
          //      //      },
          //      //      2
          //      // )
          //      addUser(
          //           {
          //                email: "bavly@facetcher.com",
          //                firstName: "Bavly",
          //                gender: "MALE",
          //                lastName: "Ashraf",
          //                password: "admin@facetcher",
          //                phoneNumber: "+201271931937",
          //           },
          //           2
          //      )
          // );
     };

     return (
          <form
               className="vh-100 w-100 d-flex justify-content-center align-items-center"
               onSubmit={(e) => {
                    e.preventDefault();
                    console.log(fileInput.current.files[0]);
               }}
          >
               <input type="file" ref={fileInput} />

               <button
                    type="submit"
                    className="btn btn-lg btn-light"
                    // onClick={() => testFunction()}
               >
                    Test
               </button>
          </form>
     );
};
export default Test;
