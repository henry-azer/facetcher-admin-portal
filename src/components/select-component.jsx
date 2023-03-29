import React from "react";

const FacetcherSelectComponent = (props) => {
     return (
          <div className="w-100">
               <h1 className="fs-6">{props.label}</h1>
               <select className="bg-transparent light-grey-border p-1 rounded-pill text-light-grey w-50">
                    {props.options.map((option) => (
                         <option value={option} className=" bg-dark-grey">
                              {option}
                         </option>
                    ))}
               </select>
          </div>
     );
};
export default FacetcherSelectComponent;
