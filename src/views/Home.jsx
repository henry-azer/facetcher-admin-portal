import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
     Tooltip,
     CartesianGrid,
     Line,
     LineChart,
     XAxis,
     ResponsiveContainer,
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
import { DASHBOARD } from "../constants/app_constants";
import FacetcherCircularChart from "../components/charts/circularChart";
import { getAllLogs } from "../store/actions/logs/logs-actions";

const Home = () => {
     const state = useSelector((state) => state);
     const dispatch = useDispatch();
     const [fetchingData, setFetchingData] = useState(true);

     useEffect(() => {
          document.title = "All User | Dashboard";

          if (fetchingData) {
               dispatch(getAllLogs());
               setFetchingData(false);
          }
     });

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
                    SucceededTrials: val,
                    FailedTrials: val2,
                    TotalTrials: val + val2,
               });
          }
          // console.log(data);

          return data;
     };

     return (
          <div>
               <FacetcherDrawer route={DASHBOARD}>
                    <div className="mt-3">
                         <h1 className="my-0 fs-4 fw-bold">Dashboard</h1>
                         <p className="text-cyan fs-6">
                              Welcome,
                              <span className="fw-bold"> {adminName}</span>
                         </p>
                    </div>
                    <div className="row h-100 justify-content-center align-items-center g-2">
                         <div className="col-8 h-100 me-2 d-flex flex-column align-items-center">
                              <div className="w-100 h-75 bg-dark-grey p-4 mb-2">
                                   <h1 className="fs-2 my-0 fw-bold">Trails</h1>
                                   <h1 className="fs-5 fw-bold text-cyan">
                                        Statistics of last users’ trails
                                   </h1>
                                   <ResponsiveContainer
                                        width="90%"
                                        height={300}
                                   >
                                        <LineChart data={dataView()}>
                                             <Line
                                                  name="Total Trials"
                                                  activeDot={{ r: 8 }}
                                                  type="monotone"
                                                  dataKey="TotalTrials"
                                                  stroke={LIGHTGREY}
                                                  strokeWidth="2"
                                                  dot={false}
                                             />
                                             <Line
                                                  name="Succeeded Trials"
                                                  type="monotone"
                                                  dataKey="SucceededTrials"
                                                  stroke={CYAN}
                                                  strokeWidth="2"
                                                  dot={false}
                                             />
                                             <Line
                                                  name="Failed Trials"
                                                  type="monotone"
                                                  dataKey="FailedTrials"
                                                  stroke={ORANGE}
                                                  strokeWidth="2"
                                                  dot={false}
                                                  // strokeDasharray="5 5"
                                             />
                                             <XAxis
                                                  dataKey="day"
                                                  stroke={LIGHTGREY}
                                                  tickLine={false}
                                             />
                                             <YAxis
                                                  tickCount={8}
                                                  dataKey="TotalTrials"
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
                              <div className=" w-100 mt-2 h-50 d-flex">
                                   <div className="w-50 h-100 pe-2">
                                        <div className="w-100 h-75 bg-dark-grey p-3">
                                             <h1 className="fs-5 m-0 fw-bold d-flex flex-column">
                                                  Succeed Trails{" "}
                                                  <span className=" text-cyan">
                                                       Succeed Percentage
                                                  </span>
                                             </h1>
                                             <div className="w-100 d-flex justify-content-end">
                                                  <FacetcherCircularChart
                                                       value={150}
                                                       maxValue={200}
                                                       color="cyan"
                                                       width={25}
                                                       strokeWidth={14}
                                                  />
                                             </div>
                                        </div>
                                   </div>
                                   <div className="w-50 h-100 ps-2">
                                        <div className="w-100 h-100 bg-dark-grey p-3">
                                             <h1 className="fs-5 m-0 fw-bold d-flex flex-column">
                                                  Failed Trails{" "}
                                                  <span className=" text-orange">
                                                       Failed Percentage
                                                  </span>
                                             </h1>
                                             <div className="w-100 d-flex justify-content-end">
                                                  <FacetcherCircularChart
                                                       value={150}
                                                       maxValue={200}
                                                       color="orange"
                                                       width={25}
                                                       strokeWidth={14}
                                                  />
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className="col h-100 bg-dark-grey ms-2 p-3">
                              <button
                                   onClick={() => dispatch(getCurrentUser())}
                              >
                                   Get Current User
                              </button>
                              <button
                                   onClick={() => dispatch(getAllSubmissions())}
                              >
                                   Get All Trialsss
                              </button>
                         </div>
                    </div>
               </FacetcherDrawer>
          </div>
     );
};

export default Home;
