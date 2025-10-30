import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Switch,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItemText,
  Collapse,
  ListItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ExpandMore,
  ExpandLess,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { useState } from "react";
import { useThemeContext } from "~/providers/theme-provider";
import { useNavigate } from "react-router-dom";
const AppBar = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileRegistrationOpen, setMobileRegistrationOpen] = useState(false);

  const registrationOpen = Boolean(anchorEl);

  const handleRegistrationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRegistrationClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileRegistrationToggle = () => {
    setMobileRegistrationOpen(!mobileRegistrationOpen);
  };

  const registrationOptions = [
    { label: "მენტორისთვის", value: "mentor" },
    { label: "ტუტორისთვის", value: "tutor" },
    { label: "მენტისთვის", value: "mentee" },
    { label: "ტუტისთვის", value: "tutee" },
  ];

  const menuItems = [
    { label: "პროექტის შესახებ", path: "/home" },
    { label: "რეგისტრაცია", path: "#registration", hasDropdown: true },
    { label: "გალერეა", path: "#gallery" },
    { label: "კონტაქტი", path: "#contact" },
  ];

  // Desktop Menu
  const desktopMenu = (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {menuItems.map((item) =>
        item.hasDropdown ? (
          <Box key={item.label}>
            <Button
              color="inherit"
              onClick={handleRegistrationClick}
              endIcon={<ExpandMore />}
              sx={{
                fontWeight: 500,
                fontSize: "1rem",
                color: theme.palette.text.primary,
              }}
            >
              {item.label}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={registrationOpen}
              onClose={handleRegistrationClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 2,
                  minWidth: 200,
                },
              }}
            >
              {registrationOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={handleRegistrationClose}
                  sx={{
                    py: 1.5,
                    px: 2,
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                    },
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ) : (
          <Button
            key={item.label}
            color="inherit"
            onClick={() => navigate(item.path)}
            sx={{
              fontWeight: 500,
              fontSize: "1rem",
              color: theme.palette.text.primary,
            }}
          >
            {item.label}
          </Button>
        )
      )}
      <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
        <IconButton
          onClick={toggleDarkMode}
          color="inherit"
          sx={{ color: theme.palette.text.primary }}
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Switch checked={darkMode} onChange={toggleDarkMode} />
      </Box>
    </Box>
  );

  // Mobile Drawer
  const mobileDrawer = (
    <Drawer
      anchor="right"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      PaperProps={{
        sx: {
          width: 280,
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton
            onClick={toggleDarkMode}
            color="inherit"
            sx={{ color: theme.palette.text.primary }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </Box>
        <List>
          {menuItems.map((item) =>
            item.hasDropdown ? (
              <Box key={item.label}>
                <ListItem
                  onClick={handleMobileRegistrationToggle}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      fontSize: "1rem",
                    }}
                  />
                  {mobileRegistrationOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                  in={mobileRegistrationOpen}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {registrationOptions.map((option) => (
                      <ListItem
                        key={option.value}
                        sx={{
                          pl: 4,
                          borderRadius: 1,
                          mb: 0.5,
                        }}
                        onClick={handleDrawerToggle}
                      >
                        <ListItemText
                          primary={option.label}
                          primaryTypographyProps={{
                            fontSize: "0.95rem",
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ) : (
              <ListItem
                key={item.label}
                component="a"
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    fontSize: "1rem",
                  }}
                />
              </ListItem>
            )
          )}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      <MuiAppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.1rem", sm: "1.3rem" },
              color: theme.palette.primary.main,
              textDecoration: "none",
              letterSpacing: "0.5px",
            }}
          >
            BSU პროექტი
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open menu"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ color: theme.palette.text.primary }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            desktopMenu
          )}
        </Toolbar>
      </MuiAppBar>
      {isMobile && mobileDrawer}
    </>
  );
};

export default AppBar;
