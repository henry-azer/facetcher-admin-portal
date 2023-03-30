import React from "react";
import FacetcherDrawer from "../components/drawer/drawer";
import FacetcherSearchComponent from "../components/search-component";
import FacetcherSelectComponent from "../components/select-component";
import FacetcherTable from "../components/tables/table";

const Submissions = () => {
     const headerArray = [
          "ID",
          "Date",
          "User",
          "Submission Name",
          "Gender",
          "Preview",
     ];

     return (
          <div className="w-100">
               <FacetcherDrawer>
                    <div className="p-5 w-100 d-flex justify-content-center align-items-center flex-column">
                         <div className="w-100 d-flex justify-content-between align-items-center mb-5">
                              <h1 className="fs-3 fw-bold m-0">Submissions</h1>
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
                                   <button className="btn bg-cyan rounded-pill px-5 text-light-grey">
                                        Search
                                   </button>
                              </div>
                         </form>

                         <div className="w-100 my-5">
                              <FacetcherTable
                                   table={2}
                                   headerArray={headerArray}
                              >
                                   <tr>
                                        <td>Col1</td>
                                        <td>Col2</td>
                                        <td>Col3</td>
                                        <td>Col4</td>
                                        <td>Col5</td>
                                        <td>Col6</td>
                                   </tr>
                              </FacetcherTable>
                         </div>
                    </div>
               </FacetcherDrawer>
          </div>
     );
};
export default Submissions;
