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
import CircleIcon from "@mui/icons-material/Circle";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import {
     CYAN,
     DARKGREY2,
     LIGHTGREY,
     LIGHTGREY10T,
} from "../../constants/app_colors";
import Logo from "../../assets/logo/logo.svg";
import LogoText from "../../assets/logo/logo-text.svg";

const drawerWidth = 240;

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
                    <Toolbar>
                         <Box
                              sx={{
                                   display: "flex",
                                   flexDirection: "row-reverse",
                                   width: "100%",
                              }}
                         >
                              <Box>
                                   <Box
                                        component="div"
                                        sx={{
                                             width: "30px",
                                             height: "30px",
                                             borderRadius: "50%",
                                             backgroundColor: `${CYAN}`,
                                             display: "flex",
                                             justifyContent: "center",
                                             alignItems: "center",
                                        }}
                                   >
                                        <PermIdentityIcon
                                             sx={{ color: `${LIGHTGREY}` }}
                                        />
                                   </Box>
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
                    <Divider />

                    <List>
                         {[
                              "Dashboard",
                              "All Drawings",
                              "Recent Drawings",
                              "All Users",
                              "Top Users",
                              "All Admins",
                         ].map((text, index) => (
                              <ListItem key={text} disablePadding>
                                   <ListItemButton>
                                        <ListItemText primary={text} />
                                   </ListItemButton>
                              </ListItem>
                         ))}
                    </List>
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
