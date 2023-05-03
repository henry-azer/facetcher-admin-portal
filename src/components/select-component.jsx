import React from "react";

const FacetcherSelectComponent = (props) => {
     return (
          <div className={`w-${props.width}`}>
               {props.label && <h1 className="fs-6">{props.label}</h1>}
               <select
                    value={props.value && props.value}
                    className="bg-transparent light-grey-border p-1 rounded-pill text-light-grey w-100"
               >
                    {props.options.map((option, index) => (
                         <option
                              key={index}
                              value={`${option}`.toLowerCase()}
                              className=" bg-dark-grey"
                         >
                              {option}
                         </option>
                    ))}
               </select>
          </div>
     );
};
export default FacetcherSelectComponent;
