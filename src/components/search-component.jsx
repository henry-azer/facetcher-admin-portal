import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function FacetcherSearchComponent(props) {
     return (
          <div className="w-25 d-flex align-items-center">
               <SearchIcon fontSize={"large"} />

               <input
                    type="text"
                    name={props.name && props.name}
                    value={props.value && props.value}
                    onChange={props.onChange}
                    className="bg-transparent light-grey-border border-top-0 border-start-0 border-end-0 pe-3 ps-1 w-75 text-light-grey"
                    placeholder={props.placeHolder}
               />
          </div>
     );
}
export default FacetcherSearchComponent;
