import React, { useLayoutEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../../store/actions/auth/auth-actions";

import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";

import {
    GREY,
    ORANGE,
    DARKGREY,
    LIGHTGREY,
    LIGHTGREY10T,
} from "../../constants/app_colors";

import {
    USERS,
    ADMINS,
    DASHBOARD,
    FAILED_TRIALS,
    SUBMISSIONS,
    USERS_LOGS,
    USERS_MESSAGES,
} from "../../constants/app_constants";

import Logo from "../../assets/logo/logo.svg";
import LogoText from "../../assets/logo/logo-text.svg";

const drawerWidth = 200;

const drawerCategories = [
    { header: "Analysis", subHeaders: [DASHBOARD] },
    { header: "Users", subHeaders: [USERS, USERS_LOGS] },
    { header: "Drawings", subHeaders: [SUBMISSIONS, FAILED_TRIALS] },
    { header: "Admins", subHeaders: [ADMINS] },
    { header: "Support", subHeaders: [USERS_MESSAGES] },
];

const FacetcherDrawer = (props) => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [height, setHeight] = useState(0);

    const currentUser = useSelector((state) => state.auth.currentUser);
    const logoutRequest = useSelector((state) => state.auth.logoutRequest);
    const logoutError = useSelector((state) => state.auth.logoutError);
    const logoutErrorOccurred = useSelector((state) => state.auth.logoutErrorOccurred);

    useLayoutEffect(() => {
        setHeight(ref.current.offsetHeight);
    });

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                elevation={0}
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                    backgroundColor: `${LIGHTGREY10T}`,
                }}
            >
                <Toolbar sx={{ width: "100%", justifyContent: "end" }}>
                    <Box
                        ref={ref}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "end",
                            width: "100%",
                            marginRight: "3%",
                        }}
                    >
                        {currentUser && (
                            <Box
                                component="div"
                                className="d-flex justify-content-end align-items-center cursor-pointer"
                            >
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        width: "100%",
                                    }}
                                    onClick={() =>
                                        navigate("/profile", {
                                            state: {
                                                id: "current",
                                            },
                                        })
                                    }
                                >
                                    {currentUser.firstName +
                                        " " +
                                        currentUser.lastName}
                                </Typography>
                                {currentUser.profilePictureUrl ? (
                                    <div style={{
                                        width: '50px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'start'
                                    }}>
                                        <img src={currentUser.profilePictureUrl}
                                            alt="User Profile"
                                            style={{
                                                width: '60px',
                                                height: '50px',
                                                objectFit: 'cover'
                                            }} />
                                    </div>
                                ) : (
                                    <Box
                                        component="div"
                                        sx={{
                                            width: "55px",
                                            height: "40px",
                                        }}
                                        className="d-flex bg-cyan justify-content-center align-items-center rounded-circle"
                                        onClick={() =>
                                            navigate("/profile", {
                                                state: {
                                                    id: "current",
                                                },
                                            })
                                        }
                                    >
                                        <PermIdentityIcon
                                            fontSize="large"
                                            sx={{
                                                color: `${LIGHTGREY}`,
                                            }}
                                        />
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    border: "none",
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        border: "none",
                        color: `${LIGHTGREY}`,
                        backgroundColor: `${DARKGREY}`,
                        width: drawerWidth,
                        boxSizing: "border-box",
                        overflowY: "hidden",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar
                    sx={{
                        backgroundColor: `${LIGHTGREY10T}`,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        className="d-flex justify-content-center align-items-center cursor-pointer"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        <Box
                            component="img"
                            src={Logo}
                            sx={{ marginRight: "15px" }}
                        />
                        <Box component="img" src={LogoText} />
                    </div>
                </Toolbar>
                <Box
                    component="div"
                    sx={{
                        marginTop: "5%",
                        marginLeft: "8%",
                    }}
                >
                    {drawerCategories.map((category, index) => (
                        <List disablePadding key={index}>
                            <ListItem>
                                <ListItemText
                                    primaryTypographyProps={{
                                        fontSize: "12px",
                                    }}
                                    sx={{ color: `${GREY}` }}
                                    primary={category.header}
                                />
                            </ListItem>
                            {category.subHeaders.map((subHeader, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton
                                        onClick={() =>
                                            navigate(
                                                `/${subHeader !== DASHBOARD
                                                    ? subHeader
                                                        .toLowerCase()
                                                        .replace(" ", "-")
                                                    : ""
                                                }`
                                            )
                                        }
                                    >
                                        <ListItemText
                                            primaryTypographyProps={{
                                                fontSize: "15px",
                                                fontWeight: "Bold",
                                            }}
                                            primary={subHeader}
                                            className={`${props.route &&
                                                props.route === subHeader &&
                                                "active_sub_header"}`}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    ))}
                </Box>
                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        marginBottom: "20%",
                        marginRight: "10%",
                    }}
                >
                    {logoutErrorOccurred && <h6>* {logoutError}</h6>}
                    <Button variant="contained" style={{ backgroundColor: ORANGE }} onClick={() => dispatch(logoutUser())}>{logoutRequest ? "Loading..." : "Logout"}</Button>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    overflow: "hidden",
                    height: `calc(100vh - ${height}px)`,
                }}
            >
                <div
                    className=" overflow-hidden d-flex justify-content-center align-items-center h-100"
                    style={{
                        marginTop: `${height}px`,
                    }}
                >
                    <div className="w-100 h-100">{props.children}</div>
                </div>
            </Box>
        </Box>
    );
};

export default FacetcherDrawer;
