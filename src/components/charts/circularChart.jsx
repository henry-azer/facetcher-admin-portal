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
                    text={
                         props.text !== "none" &&
                         `${(props.value * 100) / props.maxValue}%`
                    }
                    className={`w-${props.width}`}
                    styles={{
                         path: {
                              stroke: `url(#${props.color}Gradient)`,
                              strokeWidth: props.strokeWidth,
                              transition:
                                   "stroke-dashoffset 0.5s ease-in-out 0s",
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

               <svg style={{ width: 0, height: 0 }}>
                    <defs>
                         <linearGradient
                              id="cyanGradient"
                              gradientTransform="rotate(70)"
                         >
                              <stop stopColor={DARKCYAN} />
                              <stop stopColor={DARKCYAN} />
                              <stop offset="1" stopColor={CYAN} />
                         </linearGradient>
                    </defs>
               </svg>
               <svg style={{ width: 0, height: 0 }}>
                    <defs>
                         <linearGradient
                              id="orangeGradient"
                              gradientTransform="rotate(70)"
                         >
                              <stop stopColor={DARKORANGE} />
                              <stop stopColor={DARKORANGE} />
                              <stop offset="1" stopColor={ORANGE} />
                         </linearGradient>
                    </defs>
               </svg>
          </>
     );
};
export default FacetcherCircularChart;
