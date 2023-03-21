import React from "react";

import { useTranslation } from "react-i18next";
import {
     Tooltip,
     CartesianGrid,
     Line,
     LineChart,
     XAxis,
     AreaChart,
     ResponsiveContainer,
     Area,
     YAxis,
} from "recharts";
import FacetcherDrawer from "../components/drawer/drawer";
import { CYAN, LIGHTGREY, LIGHTGREY10T, ORANGE } from "../constants/app_colors";

const Home = () => {
     // const { t } = useTranslation();
     const adminName = "Admin Name";
     const dataView = () => {
          const data = [];
          for (let index = 0; index < 30; index++) {
               const val = Math.random() * 11;
               const val2 = Math.random() * 11;
               data.push({
                    day: index + 1,
                    value: val,
                    value2: val2,
                    value3: val + val2,
               });
          }
          console.log(data);

          return data;
     };

     return (
          <div>
               <FacetcherDrawer>
                    <div>
                         <h1 className="my-0 fw-bold">Dashboard</h1>
                         <p className="text-cyan fs-5">
                              Welcome,
                              <span className="fw-bold"> {adminName}</span>
                         </p>
                    </div>
                    <div className="row justify-content-center align-items-center g-2">
                         <div className="col-9 bg-dark-grey mx-2 p-3">
                              <div>
                                   <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                   >
                                        <AreaChart data={dataView()}>
                                             <Area
                                                  dataKey="value"
                                                  stroke={CYAN}
                                                  strokeWidth="2"
                                                  fill="transparent"
                                             />
                                             <Area
                                                  dataKey="value2"
                                                  stroke={ORANGE}
                                                  strokeWidth="2"
                                                  fill="transparent"
                                             />
                                             <Area
                                                  dataKey="value3"
                                                  stroke={LIGHTGREY}
                                                  strokeWidth="2"
                                                  fill="transparent"
                                             />
                                             <XAxis
                                                  dataKey="day"
                                                  stroke={LIGHTGREY}
                                                  tickLine={false}
                                             />
                                             <YAxis
                                                  dataKey="value3"
                                                  stroke={LIGHTGREY}
                                                  tickLine={false}
                                             />
                                             <Tooltip />
                                             <CartesianGrid
                                                  stroke={LIGHTGREY10T}
                                                  vertical={false}
                                             />
                                        </AreaChart>
                                   </ResponsiveContainer>
                              </div>
                         </div>
                         <div className="col bg-dark-grey mx-2 p-3">Column</div>
                    </div>
               </FacetcherDrawer>
          </div>
     );
};

export default Home;
