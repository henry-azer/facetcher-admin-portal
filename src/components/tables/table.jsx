import React from "react";

const FacetcherTable = (props) => {
     return (
          <div className="table-responsive">
               <table className="table text-light-grey text-center">
                    <thead className="bg-dark-grey2">
                         <tr>
                              {props.headerArray.map((header) => (
                                   <th >
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
