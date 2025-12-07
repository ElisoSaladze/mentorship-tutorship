import { JSX, useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Person,
  Dashboard,
  Description,
  Settings,
  Logout,
} from "@mui/icons-material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "~/providers/auth";

const DRAWER_WIDTH = 260;

interface NavItem {
  title: string;
  path: string;
  icon: JSX.Element;
}

const DashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const { unauthorize } = useAuthContext();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Navigation items
  const navItems: NavItem[] = [
    { title: "მთავარი", path: "/dashboard", icon: <Dashboard /> },
    { title: "ჩემი პროფილი", path: "/dashboard/profile", icon: <Person /> },
    { title: "სქემები", path: "/dashboard/schemas", icon: <Description /> },
    { title: "პარამეტრები", path: "/dashboard/settings", icon: <Settings /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Sidebar Header */}
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          color="primary.main"
          sx={{ textAlign: "center" }}
        >
          Mentorship & Tutorship
        </Typography>
      </Box>

      <Divider />

      {/* Navigation Items */}
      <List sx={{ px: 2, py: 2, flexGrow: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? "primary.main" : "transparent",
                  color: isActive ? "white" : "text.primary",
                  "&:hover": {
                    bgcolor: isActive ? "primary.dark" : "action.hover",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "white" : "text.secondary",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* Logout Button */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<Logout />}
          onClick={unauthorize}
          sx={{
            borderRadius: 2,
            py: 1.2,
            fontWeight: 600,
            textTransform: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "error.main",
              color: "white",
              borderColor: "error.main",
              transform: "scale(1.02)",
            },
          }}
        >
          გასვლა
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* AppBar - Mobile Only */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            color: "text.primary",
            boxShadow: 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1 }}>
              Mentorship & Tutorship
            </Typography>
            {/* Logout button in mobile AppBar */}
            <IconButton
              color="error"
              onClick={unauthorize}
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "error.main",
                  color: "white",
                },
              }}
            >
              <Logout />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{
          width: { md: DRAWER_WIDTH },
          flexShrink: { md: 0 },
        }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        {/* Spacer for mobile AppBar */}
        {isMobile && <Toolbar />}

        {/* Page Content */}
        <Box
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            handleNavigation("/dashboard/profile");
            handleProfileMenuClose();
          }}
        >
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          პროფილი
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleNavigation("/dashboard/settings");
            handleProfileMenuClose();
          }}
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          პარამეტრები
        </MenuItem>
        <Divider />
        <MenuItem onClick={unauthorize}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          გასვლა
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default DashboardLayout;
