import React from "react";
import ReactPaginate from "react-paginate";

const FacetcherTable = (props) => {
     return (
          <div className="w-100">
               <table
                    className={`table text-light-grey text-center bg-dark-grey${
                         props.table === 2 ? "2" : ""
                    } ${props.dataLength && "custom-table"}`}
               >
                    <thead
                         className={`bg-dark-grey${
                              props.table === 1 ? "2" : ""
                         }`}
                    >
                         <tr>
                              {props.headerArray.map((header, index) => (
                                   <th className="fw-bold" key={index}>
                                        {header}
                                   </th>
                              ))}
                         </tr>
                    </thead>
                    <tbody className="table-hover">
                         {props.children}

                         {props.dataLength > 0 && (
                              <tr
                                   className={`last-tr-hover${
                                        props.table === 2 ? "1" : "2"
                                   }`}
                              >
                                   <td colSpan={props.headerArray.length}>
                                        <div className=" d-flex justify-content-center align-items-center">
                                             <ReactPaginate
                                                  pageCount={20}
                                                  pageRangeDisplayed={5}
                                                  marginPagesDisplayed={0}
                                                  previousLabel="<"
                                                  nextLabel=">"
                                                  breakLabel=""
                                                  renderOnZeroPageCount={null}
                                                  containerClassName="pagination d-flex justify-content-between align-items-center w-25"
                                             />
                                        </div>
                                   </td>
                              </tr>
                         )}
                    </tbody>
               </table>
          </div>
     );
};
export default FacetcherTable;
