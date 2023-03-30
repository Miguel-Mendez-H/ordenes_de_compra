import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";

//services
import getMenus from "../../services/drawerData";

const drawerWidth = 240;

//vistas con urls 
function ResponsiveDrawer(props) {
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [open, setOpen] = React.useState(true);

  const handleClick = (index) => {
    setOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const [selectedIndex, setSelectedIndex] = React.useState({});

  const handleListItemClick = (event, index) => {
    setSelectedIndex(prevState => {
      // Des-selecciona el elemento previamente seleccionado
      const updatedState = { ...prevState };
      Object.keys(updatedState).forEach(key => {
        updatedState[key] = false;
      });
      // Selecciona el nuevo elemento
      updatedState[index] = true;
      return updatedState;
    });
  };

  const handleDrawerToggle = (index) => {
    setMobileOpen(!mobileOpen);
  };

// data menus
  const [menus, setMenus] = React.useState([]);

  React.useEffect(() => {
    getMenus()
      .then(response => {
        setMenus(response);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const drawer = (
    <div>
      <Toolbar
        sx={{
          bgcolor: "#1c2536",
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "8px",
            borderStyle: "solid",
            borderWidth: "1px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "primary.dark",
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        />
        <div style={{ marginLeft: 16 }}>
          <Box
            sx={{
              // convertimos este css a sx -webkit-box-flex: 1 y flex-grow: 1
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              fontFamily: "Plus Jakarta Sans",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              margin={0}
              sx={{
                color: "#fff",
              }}
            >
              Hi-App
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              margin={0}
              sx={{
                color: "#989fa9",
              }}
            >
              Production
            </Typography>
          </Box>
        </div>
      </Toolbar>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "#1c2536", height:"100%"}}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {menus.map(
          (menu, index) => (
            <React.Fragment key={index}>
              <ListItemButton
                onClick={(event) => {
                  handleClick(index);
                  handleListItemClick(event, index);
                }}
                selected={selectedIndex[index]}
                sx={{ color: "#989fa9" }}
              >
                <ListItemIcon>
                  <InboxIcon
                    sx={{
                      color: "#989fa9",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={menu.nombre}
                  sx={{
                    color: "#989fa9",
                  }}
                />
                {open[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                {menu.submenus.map((subMenu, subIndex) => (
                  <ListItemButton key={subIndex} sx={{ pl: 4, color: "#989fa9" }}>
                    <ListItemIcon>
                      <StarBorder sx={{ color: "#989fa9" }} />
                    </ListItemIcon>
                    <ListItemText primary= {subMenu.nombre}/>
                  </ListItemButton>
                ))}
                </List>
              </Collapse>
            </React.Fragment>
          )
        )}
      </List>
    </div>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", bgcolor: "#989fa9" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"></Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "#1c2536",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
