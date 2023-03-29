import React from "react";

const FacetcherSelectComponent = (props) => {
     return (
          <div className={`w-${props.width}`}>
               <h1 className="fs-6">{props.label}</h1>
               <select className="bg-transparent light-grey-border p-1 rounded-pill text-light-grey w-100">
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
