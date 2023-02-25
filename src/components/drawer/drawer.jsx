import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// import CssBaseline from '@mui/material/CssBaseline';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
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
     DARKGREY2,
     GREY,
     LIGHTGREY,
     LIGHTGREY10T,
} from "../../constants/app_colors";
import Logo from "../../assets/logo/logo.svg";
import LogoText from "../../assets/logo/logo-text.svg";

const drawerWidth = 240;

const drawerCategories = [
     { header: "Analysis", subHeaders: ["Dashboard"] },
     { header: "Drawings", subHeaders: ["All Drawings", "Recent Drawings"] },
     { header: "Analysis", subHeaders: ["All Users", "Top Users"] },
     { header: "Admins", subHeaders: ["All Admins"] },
];

const FacetcherDrawer = () => {
     return (
          <Box sx={{ display: "flex" }}>
               {/* <CssBaseline /> */}
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
                                   <Typography sx={{ marginRight: "10px" }}>
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
                              backgroundColor: `${DARKGREY2}`,
                              width: drawerWidth,
                              boxSizing: "border-box",
                         },
                    }}
                    variant="permanent"
                    anchor="left"
               >
                    <Toolbar
                         sx={{
                              backgroundColor: `${LIGHTGREY10T}`,
                              display: "flex",
                         }}
                    >
                         <Box
                              component="img"
                              src={Logo}
                              sx={{ marginRight: "15px" }}
                         />
                         <Box component="img" src={LogoText} />
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
                                                  fontSize: "15px",
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
                                                                      "20px",
                                                                 fontWeight:
                                                                      "Bold",
                                                            }}
                                                            primary={subHeader}
                                                       />
                                                  </ListItemButton>
                                             </ListItem>
                                        )
                                   )}
                              </List>
                         ))}
                    </Box>
               </Drawer>
               <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Typography paragraph>
                         Lorem ipsum dolor sit amet, consectetur adipiscing
                         elit, sed do eiusmod tempor incididunt ut labore et
                         dolore magna aliqua. Rhoncus dolor purus non enim
                         praesent elementum facilisis leo vel. Risus at ultrices
                         mi tempus imperdiet. Semper risus in hendrerit gravida
                         rutrum quisque non tellus. Convallis convallis tellus
                         id interdum velit laoreet id donec ultrices. Odio morbi
                         quis commodo odio aenean sed adipiscing. Amet nisl
                         suscipit adipiscing bibendum est ultricies integer
                         quis. Cursus euismod quis viverra nibh cras. Metus
                         vulputate eu scelerisque felis imperdiet proin
                         fermentum leo. Mauris commodo quis imperdiet massa
                         tincidunt. Cras tincidunt lobortis feugiat vivamus at
                         augue. At augue eget arcu dictum varius duis at
                         consectetur lorem. Velit sed ullamcorper morbi
                         tincidunt. Lorem donec massa sapien faucibus et
                         molestie ac.
                    </Typography>
                    <Typography paragraph>
                         Consequat mauris nunc congue nisi vitae suscipit.
                         Fringilla est ullamcorper eget nulla facilisi etiam
                         dignissim diam. Pulvinar elementum integer enim neque
                         volutpat ac tincidunt. Ornare suspendisse sed nisi
                         lacus sed viverra tellus. Purus sit amet volutpat
                         consequat mauris. Elementum eu facilisis sed odio
                         morbi. Euismod lacinia at quis risus sed vulputate
                         odio. Morbi tincidunt ornare massa eget egestas purus
                         viverra accumsan in. In hendrerit gravida rutrum
                         quisque non tellus orci ac. Pellentesque nec nam
                         aliquam sem et tortor. Habitant morbi tristique
                         senectus et. Adipiscing elit duis tristique
                         sollicitudin nibh sit. Ornare aenean euismod elementum
                         nisi quis eleifend. Commodo viverra maecenas accumsan
                         lacus vel facilisis. Nulla posuere sollicitudin aliquam
                         ultrices sagittis orci a.
                    </Typography>
               </Box>
          </Box>
     );
};

export default FacetcherDrawer;
