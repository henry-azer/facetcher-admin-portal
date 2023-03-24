import React from "react";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
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
     Legend,
} from "recharts";
import FacetcherDrawer from "../components/drawer/drawer";
import {
     CYAN,
     DARKGREY2,
     LIGHTGREY,
     LIGHTGREY10T,
     ORANGE,
} from "../constants/app_colors";
import { getCurrentUser } from "../store/actions/auth/auth-actions";
import { getAllSubmissions } from "../store/actions/submission/submission-actions";

const Home = () => {
     const state = useSelector((state) => state);
     const dispatch = useDispatch();

     console.log(state);
     // const { t } = useTranslation();
     const adminName = "Admin Name";
     const dataView = () => {
          const data = [];
          for (let index = 0; index < 30; index++) {
               const val = Math.ceil(Math.random() * 11);
               const val2 = Math.ceil(Math.random() * 11);
               data.push({
                    day: index + 1,
                    value: val,
                    value2: val2,
                    value3: val + val2,
               });
          }
          // console.log(data);

          return data;
     };

     return (
          <div>
               <FacetcherDrawer>
                    <div>
                         <h1 className="my-0 fs-4 fw-bold">Dashboard</h1>
                         <p className="text-cyan fs-6">
                              Welcome,
                              <span className="fw-bold"> {adminName}</span>
                         </p>
                    </div>
                    <div className="row justify-content-center align-items-center g-2">
                         <div className="col-8 bg-dark-grey mx-2 p-3">
                              <div>
                                   <ResponsiveContainer
                                        width="70%"
                                        height={300}
                                   >
                                        <LineChart data={dataView()}>
                                             <Line
                                                  type="monotone"
                                                  dataKey="value"
                                                  stroke={CYAN}
                                                  strokeWidth="2"
                                                  dot={false}
                                             />
                                             <Line
                                                  type="monotone"
                                                  dataKey="value2"
                                                  stroke={ORANGE}
                                                  strokeWidth="2"
                                                  dot={false}
                                                  // strokeDasharray="5 5"
                                             />
                                             <Line
                                                  activeDot={{ r: 8 }}
                                                  type="monotone"
                                                  dataKey="value3"
                                                  stroke={LIGHTGREY}
                                                  strokeWidth="2"
                                                  dot={false}
                                             />
                                             <XAxis
                                                  dataKey="day"
                                                  stroke={LIGHTGREY}
                                                  tickLine={false}
                                             />
                                             <YAxis
                                                  tickCount={8}
                                                  dataKey="value3"
                                                  stroke={LIGHTGREY}
                                                  tickLine={false}
                                             />
                                             <Tooltip
                                                  contentStyle={{
                                                       background: DARKGREY2,
                                                       border: "none",
                                                  }}
                                             />
                                             <CartesianGrid
                                                  stroke={LIGHTGREY10T}
                                                  vertical={false}
                                                  strokeDasharray="5 5"
                                             />
                                             <Legend
                                                  align="right"
                                                  iconType="rect"
                                                  verticalAlign="top"
                                                  height={36}
                                             />
                                        </LineChart>
                                   </ResponsiveContainer>
                              </div>
                         </div>
                         <div className="col bg-dark-grey mx-2 p-3">
                              <button
                                   onClick={() => dispatch(getCurrentUser())}
                              >
                                   Get Current User
                              </button>
                              <button
                                   onClick={() => dispatch(getAllSubmissions())}
                              >
                                   Get All Trails
                              </button>
                         </div>
                    </div>
               </FacetcherDrawer>
          </div>
     );
};

export default Home;
