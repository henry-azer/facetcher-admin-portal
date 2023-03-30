import React from "react";

const FacetcherTable = (props) => {
     return (
          <div className="w-100">
               <table
                    className={`table custom-table text-light-grey text-center bg-dark-grey${
                         props.table === 2 ? "2" : ""
                    }`}
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
                    <tbody>{props.children}</tbody>
               </table>
          </div>
     );
};
export default FacetcherTable;
