import React, { useLayoutEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// import CssBaseline from '@mui/material/CssBaseline';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import {
     CYAN,
     DARKGREY,
     GREY,
     LIGHTGREY,
     LIGHTGREY10T,
} from "../../constants/app_colors";
import Logo from "../../assets/logo/logo.svg";
import LogoText from "../../assets/logo/logo-text.svg";

const drawerWidth = 190;

const drawerCategories = [
     { header: "Analysis", subHeaders: ["Dashboard"] },
     { header: "Users", subHeaders: ["All Users", "Users Logs"] },
     { header: "Drawings", subHeaders: ["Submissions", "Failed Trials"] },
     { header: "Admins", subHeaders: ["All Admins"] },
];

const FacetcherDrawer = ({ children }) => {
     const ref = useRef(null);

     const [height, setHeight] = useState(0);

     useLayoutEffect(() => {
          setHeight(ref.current.offsetHeight);
     }, []);

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
                                   justifyContent: "space-between",
                                   width: "17%",
                                   marginX: "3%",
                              }}
                         >
                              <LightModeOutlinedIcon
                                   sx={{
                                        color: `${LIGHTGREY}`,
                                   }}
                              />
                              <Box
                                   component="div"
                                   sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                   }}
                              >
                                   <Typography
                                        sx={{
                                             marginRight: "10px",
                                             fontSize: "12px",
                                        }}
                                   >
                                        Admin Name
                                   </Typography>
                                   <Box
                                        component="div"
                                        sx={{
                                             width: "40px",
                                             height: "40px",
                                             borderRadius: "50%",
                                             backgroundColor: `${CYAN}`,
                                             display: "flex",
                                             justifyContent: "center",
                                             alignItems: "center",
                                        }}
                                   >
                                        <PermIdentityIcon
                                             fontSize="large"
                                             sx={{ color: `${LIGHTGREY}` }}
                                        />
                                   </Box>
                                   <KeyboardArrowDownIcon
                                        sx={{ color: `${LIGHTGREY}` }}
                                   />
                              </Box>
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
                         <div className="d-flex justify-content-center align-items-center">
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
                              marginLeft: "5%",
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
                                   {category.subHeaders.map(
                                        (subHeader, index) => (
                                             <ListItem
                                                  key={index}
                                                  disablePadding
                                             >
                                                  <ListItemButton>
                                                       <ListItemText
                                                            primaryTypographyProps={{
                                                                 fontSize:
                                                                      "15px",
                                                                 fontWeight:
                                                                      "Bold",
                                                            }}
                                                            primary={subHeader}
                                                            className="active_sub_header"
                                                       />
                                                  </ListItemButton>
                                             </ListItem>
                                        )
                                   )}
                              </List>
                         ))}
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
                         <div className="w-100 h-100">
                              {children}
                         </div>
                    </div>
               </Box>
          </Box>
     );
};

export default FacetcherDrawer;
