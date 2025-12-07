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
import { useState, useEffect } from "react";
import { useThemeContext } from "~/providers/theme-provider";
import { useLanguage } from "~/providers/language-provider";
import { useNavigate } from "react-router-dom";
import { paths } from "~/app/routes/paths";

const AppBar = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useThemeContext();
  const { language, setLanguage, t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileRegistrationOpen, setMobileRegistrationOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleRegistrationOptionClick = (type: string) => {
    navigate("/register", { state: { type } });
    handleRegistrationClose();
  };

  const handleMobileRegistrationOptionClick = (type: string) => {
    navigate("/register", { state: { type } });
    handleDrawerToggle();
  };

  const registrationOptions = [
    { label: t.appBar.mentor, value: "mentor" },
    { label: t.appBar.tutor, value: "tutor" },
    { label: t.appBar.seeker, value: "seeker" },
  ];

  const menuItems = [
    { label: t.appBar.aboutProject, path: paths.home },
    { label: "სქემები", path: paths.schemes },
    { label: t.appBar.registration, path: "#registration", hasDropdown: true },
    { label: t.appBar.gallery, path: paths.gallery },
    { label: t.appBar.contact, path: paths.contact },
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
                  onClick={() => handleRegistrationOptionClick(option.value)}
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
      <Box sx={{ display: "flex", alignItems: "center", ml: 2, gap: 2 }}>
        {/* Language Switcher */}
        <Button
          onClick={() => setLanguage(language === "en" ? "ka" : "en")}
          variant="outlined"
          size="small"
          sx={{
            minWidth: 60,
            fontWeight: 600,
            fontSize: "0.875rem",
            borderRadius: "20px",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          {language === "en" ? "GEO" : "ENG"}
        </Button>

        {/* Dark Mode Switch */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
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
          boxShadow: darkMode
            ? "0 8px 32px rgba(0, 0, 0, 0.6)"
            : "0 8px 32px rgba(0, 0, 0, 0.15)",
        },
      }}
      transitionDuration={400}
    >
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          {/* Language Switcher */}
          <Button
            onClick={() => setLanguage(language === "en" ? "ka" : "en")}
            variant="outlined"
            size="small"
            sx={{
              minWidth: 60,
              fontWeight: 600,
              fontSize: "0.875rem",
              borderRadius: "20px",
            }}
          >
            {language === "en" ? "GEO" : "ENG"}
          </Button>

          {/* Dark Mode Switch */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleMobileRegistrationOptionClick(option.value)
                        }
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
                onClick={() => {
                  navigate(item.path);
                  handleDrawerToggle();
                }}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  cursor: "pointer",
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
      <MuiAppBar
        position="sticky"
        sx={{
          transition: "all 0.3s ease",
          boxShadow: scrolled
            ? darkMode
              ? "0 4px 12px rgba(0, 0, 0, 0.5)"
              : "0 4px 12px rgba(0, 0, 0, 0.1)"
            : "none",
        }}
      >
        <Toolbar
          sx={{ justifyContent: "space-between", py: { xs: 1.5, sm: 2 } }}
        >
          <Box
            component="a"
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 1.5 },
              textDecoration: "none",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          >
            <Box
              component="img"
              src="/bsu-logo.png"
              alt="BSU Logo"
              sx={{
                height: { xs: 40, sm: 50 },
                width: "auto",
                transition: "filter 0.3s ease",
                "&:hover": {
                  filter: "brightness(1.1)",
                },
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1rem", sm: "1.3rem" },
                color: theme.palette.primary.main,
                letterSpacing: "0.5px",
                transition: "color 0.3s ease",
              }}
            >
              Mentorship & Tutorship
            </Typography>
          </Box>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open menu"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{
                color: theme.palette.text.primary,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                  transform: "rotate(90deg)",
                },
              }}
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
