import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupsIcon from "@mui/icons-material/Groups";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import "./../../Styles/Dashboard.css";

const drawerWidth = 255.5;

const primaryPropsStyle = {
  fontFamily: "'Josefin Sans', sans-serif !important",
  fontSize: "13px",
  fontWeight: "600 !important",
};

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const isScreenSmall = useMediaQuery("(max-width:1280px)");

  const handleModalToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(!isScreenSmall);
  }, [isScreenSmall]);

  const handleListItemClick = (index) => {
    setActiveItem(index);
  };

  //   const Logout = () => {
  //     showLoader();
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("user");
  //     const navigate = useNavigate();
  //     hideLoader();
  //     navigate("/login");
  //   };

  return (
    <>
      <div>
        <Box sx={{ display: "flex", overflow: "auto" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            style={{
              zIndex: 999,
              paddingLeft: isScreenSmall ? "0px" : drawerWidth,
            }}
          >
            <Toolbar className="toolBarStyle">
              <div className="appBar-logo-container">
                <p className="appBarTitle">Heliverse</p>
              </div>

              <Button className="appBarAdmin"></Button>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleModalToggle}
                edge="start"
                className="hamburger-menu"
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <Drawer
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                backgroundColor: "transparent",
                width: drawerWidth,
              },
              border: "none",
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader className="bg-[#1d72cd]"></DrawerHeader>
            <Divider />

            <Box className="drawerListBoxStyle bg-white">
              <List>
                <Box sx={{ padding: "0px 8px" }}>
                  <Link to={""}>
                    <ListItem
                      disablePadding
                      sx={{ "&:hover": { background: "none !imporatant" } }}
                      className={activeItem === 1 ? "itemBackground" : ""}
                      onClick={() => handleListItemClick(1)}
                    >
                      <ListItemButton className="listItemButtonStyle">
                        <ListItemIcon className="menuIcon">
                          <GroupsIcon />
                        </ListItemIcon>
                        <ListItemText
                          className="sideBarTitle"
                          primary="All Users"
                          primaryTypographyProps={primaryPropsStyle}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link to={"addUser"}>
                    <ListItem
                      disablePadding
                      sx={{ "&:hover": { background: "none !imporatant" } }}
                      className={activeItem === 2 ? "itemBackground" : ""}
                      onClick={() => handleListItemClick(2)}
                    >
                      <ListItemButton className="listItemButtonStyle">
                        <ListItemIcon className="menuIcon">
                          <PersonAddAltIcon />
                        </ListItemIcon>
                        <ListItemText
                          className="sideBarTitle"
                          primary="Add User"
                          primaryTypographyProps={primaryPropsStyle}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link to={"createTeam"}>
                    <ListItem
                      disablePadding
                      sx={{ "&:hover": { background: "none !imporatant" } }}
                      className={activeItem === 3 ? "itemBackground" : ""}
                      onClick={() => handleListItemClick(3)}
                    >
                      <ListItemButton className="listItemButtonStyle">
                        <ListItemIcon className="menuIcon">
                          <Diversity3Icon />
                        </ListItemIcon>
                        <ListItemText
                          className="sideBarTitle"
                          primary="Create Team"
                          primaryTypographyProps={primaryPropsStyle}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link to={"allTeams"}>
                    <ListItem
                      disablePadding
                      sx={{ "&:hover": { background: "none !imporatant" } }}
                      className={activeItem === 4 ? "itemBackground" : ""}
                      onClick={() => handleListItemClick(4)}
                    >
                      <ListItemButton className="listItemButtonStyle">
                        <ListItemIcon className="menuIcon">
                          <Diversity3Icon />
                        </ListItemIcon>
                        <ListItemText
                          className="sideBarTitle"
                          primary="Teams"
                          primaryTypographyProps={primaryPropsStyle}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                </Box>
              </List>
              <List sx={{ marginTop: "auto" }}>
                <Box>
                  <Link>
                    <ListItem disablePadding>
                      <ListItemButton
                        sx={{
                          padding: "0px 12px !important",
                          marginBottom: "12px !important",
                        }}
                      >
                        {/* <Button
                          startIcon={<ExitToAppIcon />}
                          fullWidth
                          variant="outlined"
                          className="btnLogoutStyle"
                        >
                          Logout
                        </Button> */}
                      </ListItemButton>
                    </ListItem>
                  </Link>
                </Box>
              </List>
            </Box>
          </Drawer>

          <Main
            className="main-body mx-auto"
            style={{
              marginLeft: isScreenSmall ? "0px" : drawerWidth,
              transition: "margin 0.5s",
              width: "100%",
              background: "#f5f5f5",
              minHeight: "100vh",
            }}
          >
            <DrawerHeader />
            <Outlet />
          </Main>
        </Box>
      </div>
    </>
  );
}
