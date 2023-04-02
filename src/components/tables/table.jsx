import React from "react";

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
                                        1, 2, 3, 4
                                   </td>
                              </tr>
                         )}
                    </tbody>
               </table>
          </div>
     );
};
export default FacetcherTable;
