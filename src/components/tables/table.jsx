import React from "react";

const FacetcherTable = (props) => {
     return (
          <div className="table-responsive w-100">
               <table
                    className={`table text-light-grey text-center bg-dark-grey${
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
                                   <th key={index}>{header}</th>
                              ))}
                         </tr>
                    </thead>
                    <tbody>{props.children}</tbody>
               </table>
          </div>
     );
};
export default FacetcherTable;
