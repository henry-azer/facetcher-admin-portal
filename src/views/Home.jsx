import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getUsersLogs } from "../store/actions/users-logs/users-logs-actions";
import { getCurrentUser } from "../store/actions/auth/auth-actions";

import FacetcherCircularChart from "../components/charts/circularChart";
import FacetcherDrawer from "../components/drawer/drawer";

import checkAuthentication from "../authentication/check-authentication";
import { DASHBOARD } from "../constants/app_constants";

import {
    getAllTrials,
    getAllFailedTrials,
} from "../store/actions/trials/trials-action";

import {
    Line,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
    LineChart,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

import {
    CYAN,
    ORANGE,
    DARKGREY2,
    LIGHTGREY,
    LIGHTGREY10T,
} from "../constants/app_colors";

const Home = () => {
    const dispatch = useDispatch();

    const [isDataFetched, setIsDataFetched] = useState(false);

    const user = useSelector((state) => state.auth.currentUser);
    const logs = useSelector((state) => state.logs.usersLogs);
    const trials = useSelector((state) => state.trials);

    useEffect(() => {
        document.title = "Dashboard | Facetcher";
    });

    useEffect(() => {
        if (!isDataFetched) {
            dispatch(getCurrentUser());
            dispatch(getUsersLogs());
            dispatch(getAllTrials());
            dispatch(getAllFailedTrials());
            setIsDataFetched(true);
        }
    }, [dispatch, isDataFetched]);

    const dataView = () => {
        const data = [];
        const allTrials = trials.allTrials;
        const allFailedTrials = trials.allFailedTrials;

        const result = allTrials
            .sort(
                (objA, objB) =>
                    Number(new Date(objA.creationDate)) -
                    Number(new Date(objB.creationDate))
            )
            .reduce((accumulator, currentValue) => {
                const date = new Date(
                    currentValue.creationDate
                ).toDateString();
                (accumulator[date]
                    ? accumulator[date]
                    : (accumulator[date] = null || [])
                ).push(currentValue);
                return accumulator;
            }, {});

        const failedResult = allFailedTrials
            .sort(
                (objA, objB) =>
                    Number(new Date(objA.creationDate)) -
                    Number(new Date(objB.creationDate))
            )
            .reduce((accumulator, currentValue) => {
                const date = new Date(
                    currentValue.creationDate
                ).toDateString();
                (accumulator[date]
                    ? accumulator[date]
                    : (accumulator[date] = null || [])
                ).push(currentValue);
                return accumulator;
            }, {});

        Object.keys(result).forEach((trial) => {
            const date = trial;
            let TotalTrials = result[trial].length;
            let SucceededTrials = result[trial].length;
            let FailedTrials = 0;

            if (failedResult[trial]) {
                FailedTrials = failedResult[trial].length;
                SucceededTrials =
                    result[trial].length - failedResult[trial].length;
            }

            data.push({
                date: `${date.toString().slice(4)}`,
                tt: TotalTrials,
                st: SucceededTrials,
                ft: FailedTrials,
            });
        });

        if (data.length >= 7) return data.slice(-7);
        else return data;
    };

    return (
        <div>
            {user && (
                <FacetcherDrawer route={DASHBOARD}>
                    <div className="mt-3">
                        <h1 className="my-0 fs-4 fw-bold">Dashboard</h1>
                        <p className="text-cyan fs-6">
                            Welcome, {" "}
                            <span className="fw-bold">
                                {user.firstName + " " + user.lastName}
                            </span>
                        </p>
                    </div>
                    <div className="row h-100 justify-content-center align-items-center g-2">
                        {trials.allTrials && trials.allFailedTrials && (
                            <div className="col-8 h-100 me-2 d-flex flex-column align-items-center">
                                <div className="w-100 h-75 bg-dark-grey p-4 mb-2">
                                    <h1 className="fs-3 my-0 fw-bold">
                                        Trials
                                    </h1>
                                    <h1 className="fs-6 fw-bold text-cyan">
                                        Statistics of last users’
                                        trials
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
                                                dataKey="tt"
                                                stroke={LIGHTGREY}
                                                strokeWidth="2"
                                                dot={false}
                                            />
                                            <Line
                                                name="Succeeded Trials"
                                                type="monotone"
                                                dataKey="st"
                                                stroke={CYAN}
                                                strokeWidth="2"
                                                dot={false}
                                            />
                                            <Line
                                                name="Failed Trials"
                                                type="monotone"
                                                dataKey="ft"
                                                stroke={ORANGE}
                                                strokeWidth="2"
                                                dot={false}
                                            />
                                            <XAxis
                                                dataKey="date"
                                                stroke={LIGHTGREY}
                                                tickLine={false}
                                                style={{
                                                    fontSize: 10,
                                                }}
                                                tickMargin={15}
                                            />
                                            <YAxis
                                                tickCount={8}
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
                                                stroke={
                                                    LIGHTGREY10T
                                                }
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
                                            <h1 className="fs-6 m-0 fw-bold d-flex flex-column">
                                                Succeed trials
                                                <span className="fw-bold text-cyan">
                                                    Succeed
                                                    Percentage
                                                </span>
                                            </h1>
                                            <div className="w-100 d-flex justify-content-end">
                                                <FacetcherCircularChart
                                                    value={
                                                        trials
                                                            .allTrials
                                                            .length -
                                                        trials
                                                            .allFailedTrials
                                                            .length
                                                    }
                                                    maxValue={
                                                        trials
                                                            .allTrials
                                                            .length
                                                    }
                                                    color="cyan"
                                                    width={25}
                                                    strokeWidth={6}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-50 h-100 ps-2">
                                        <div className="w-100 h-100 bg-dark-grey p-3">
                                            <h1 className="fs-6 m-0 fw-bold d-flex flex-column">
                                                Failed trials
                                                <span className="fw-bold text-orange">
                                                    Failed
                                                    Percentage
                                                </span>
                                            </h1>
                                            <div className="w-100 d-flex justify-content-end">
                                                <FacetcherCircularChart
                                                    value={
                                                        trials
                                                            .allFailedTrials
                                                            .length
                                                    }
                                                    maxValue={
                                                        trials
                                                            .allTrials
                                                            .length
                                                    }
                                                    color="orange"
                                                    width={25}
                                                    strokeWidth={6}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="col h-100 bg-dark-grey ms-2 p-3">
                            <h1 className="fw-bold fs-4 d-flex flex-column">
                                Recent Logs
                                <span className="text-cyan fs-6 fw-bold">
                                    Recent Users’ Logs
                                </span>
                            </h1>
                            {logs && (
                                <>
                                    {logs
                                        .slice(0, 8)
                                        .map((log, index) => (
                                            <div
                                                key={index}
                                                className="my-3"
                                            >
                                                <h1 className="fs-5 d-flex flex-column">
                                                    {`${log.user
                                                        .firstName +
                                                        " " +
                                                        log.user
                                                            .lastName}`}

                                                    <span className="text-cyan fs-6 d-flex justify-content-between w-100">
                                                        {
                                                            `${log.lastModificationDate}`
                                                                .replace(
                                                                    "T",
                                                                    " "
                                                                )
                                                                .split(
                                                                    "."
                                                                )[0]
                                                        }
                                                        <span className="text-capitalize w-20 text-start">
                                                            {log.logStatus.toLowerCase()}
                                                        </span>
                                                    </span>
                                                </h1>
                                            </div>
                                        ))}
                                </>
                            )}
                            <Link
                                to="/users-logs"
                                className="text-light-grey"
                            >
                                See More
                            </Link>
                        </div>
                    </div>
                </FacetcherDrawer>
            )}
        </div>
    );
};

export default checkAuthentication(Home);
