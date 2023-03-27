import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import {
     CYAN,
     DARKCYAN,
     DARKORANGE,
     GREY,
     ORANGE,
} from "../../constants/app_colors";

const FacetcherCircularChart = (props) => {
     return (
          <>
               <CircularProgressbar
                    value={props.value}
                    maxValue={props.maxValue}
                    text={`${(props.value * 100) / props.maxValue}%`}
                    className={`w-${props.width}`}
                    styles={{
                         path: {
                              stroke: `url(#${props.color}Gradient)`,
                              strokeWidth:props.strokeWidth,
                              transition: "stroke-dashoffset 0.5s ease 0s",
                              filter: `drop-shadow(0px 0px 6px ${
                                   props.color === "cyan" ? CYAN : ORANGE
                              })`,
                         },
                         trail: {
                              stroke: `${GREY}`,
                              strokeWidth: 2,
                         },
                         text: {
                              fill: `${GREY}`,
                              fontSize: "16px",
                         },
                         root: {
                              overflow: "visible",
                         },
                    }}
               />

               <svg>
                    <defs>
                         <linearGradient
                              id="cyanGradient"
                              gradientTransform="rotate(70)"
                         >
                              <stop stop-color={DARKCYAN} />
                              <stop stop-color={DARKCYAN} />
                              <stop offset="1" stop-color={CYAN} />
                         </linearGradient>
                    </defs>
               </svg>
               <svg>
                    <defs>
                         <linearGradient
                              id="orangeGradient"
                              gradientTransform="rotate(70)"
                         >
                              <stop stop-color={DARKORANGE} />
                              <stop stop-color={DARKORANGE} />
                              <stop offset="1" stop-color={ORANGE} />
                         </linearGradient>
                    </defs>
               </svg>
          </>
     );
};
export default FacetcherCircularChart;
