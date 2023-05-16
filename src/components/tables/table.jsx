import React from "react";
import ReactPaginate from "react-paginate";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { itemsPerPage } from "../../constants/app_constants";

const FacetcherTable = (props) => {
     return (
          <div className="w-100 disableSelection">
               <table
                    className={`table text-light-grey text-center bg-dark-grey${props.table === 2 ? "2" : ""
                         } ${props.dataLength && "custom-table"}`}
               >
                    <thead
                         className={`bg-dark-grey${props.table === 1 ? "2" : ""
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
                    <tbody className={!props.hover ? "table-hover" : ""}>
                         {props.children && props.dataLength !== 0 ? (
                              props.children
                         ) : (
                              <tr>
                                   {props.error ? (
                                        <td
                                             colSpan={props.headerArray.length}
                                             className="cursor-default"
                                        >
                                             {props.error}
                                        </td>
                                   ) : (
                                        <td
                                             colSpan={props.headerArray.length}
                                             className="cursor-default"
                                        >
                                             No data is present within this table.
                                        </td>
                                   )}
                              </tr>
                         )}
                         {props.dataLength > 0 && (
                              <tr
                                   className={`last-tr-hover${props.table === 2 ? "1" : "2"} cursor-default`}
                              >
                                   <td colSpan={props.headerArray.length}>
                                        <div className=" d-flex justify-content-center align-items-center">
                                             <ReactPaginate
                                                  breakLabel="..."
                                                  pageCount={Math.ceil(
                                                       props.dataLength /
                                                       itemsPerPage
                                                  )}
                                                  pageRangeDisplayed={3}
                                                  marginPagesDisplayed={1}
                                                  previousLabel={
                                                       <ArrowBackIosIcon fontSize="small" />
                                                  }
                                                  nextLabel={
                                                       <ArrowForwardIosIcon fontSize="small" />
                                                  }
                                                  renderOnZeroPageCount={null}
                                                  containerClassName="pagination d-flex justify-content-between align-items-center w-25"
                                                  forcePage={props.initialPage}
                                                  disabledClassName="disabled"
                                                  disabledLinkClassName="disabled"
                                                  onPageChange={
                                                       props.handlePageClick
                                                  }
                                                  activeClassName="bg-cyan rounded-circle active-num"
                                                  previousLinkClassName="text-decoration-none text-light-grey"
                                                  nextLinkClassName="text-decoration-none text-light-grey"
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
