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
  Description,
  Logout,
  AdminPanelSettings,
  Group,
  School,
} from "@mui/icons-material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "~/providers/auth";
import { useLanguage } from "~/providers/language-provider";
import { paths } from "~/app/routes/paths";

const DRAWER_WIDTH = 260;
const MOBILE_DRAWER_WIDTH = 280;

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
  const { unauthorize, isAdmin, isLoggingOut } = useAuthContext();
  const { t } = useLanguage();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Navigation items
  const navItems: NavItem[] = [
    { title: t.dashboard.myProfile, path: paths.userDetails, icon: <Person /> },
    { title: t.dashboard.schemes, path: paths.manageSchemes, icon: <Description /> },
    {
      title: t.dashboard.academicStaff,
      path: paths.academicStaff,
      icon: <Group />,
    },
    ...(isAdmin
      ? [
          {
            title: t.admin?.pageTitle || "User Management",
            path: paths.adminUsers,
            icon: <AdminPanelSettings />,
          },
          {
            title: t.adminSchemes?.pageTitle || "Schemes & Courses",
            path: paths.adminSchemes,
            icon: <School />,
          },
        ]
      : []),
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
      <Box
        sx={{
          p: { xs: 2, sm: 2.5 },
          pt: { xs: 3, sm: 2.5 },
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          component="img"
          src="/bsu-logo.png"
          alt="BSU Logo"
          sx={{
            height: 40,
            width: "auto",
          }}
        />
        <Typography
          variant="h6"
          fontWeight={700}
          color="primary.main"
          sx={{
            fontSize: { xs: "0.95rem", sm: "1rem" },
            lineHeight: 1.3,
          }}
        >
          {t.common.appTitle}
        </Typography>
      </Box>

      <Divider />

      {/* Navigation Items */}
      <List sx={{ px: { xs: 1.5, sm: 2 }, py: 2, flexGrow: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  minHeight: 48,
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
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* Logout Button */}
      <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<Logout />}
          onClick={unauthorize}
          disabled={isLoggingOut}
          sx={{
            borderRadius: 2,
            py: 1.2,
            minHeight: 48,
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
          {isLoggingOut ? "..." : t.dashboard.logout}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar - Mobile Only */}

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
              width: { xs: "80vw", sm: MOBILE_DRAWER_WIDTH },
              maxWidth: 300,
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
          width: { xs: "100%", md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: "100vh",
          bgcolor: "background.default",
          overflow: "auto",
        }}
      >
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
            <Toolbar
              sx={{ minHeight: { xs: 56, sm: 64 }, px: { xs: 1, sm: 2 } }}
            >
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 1, width: 44, height: 44 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ flexGrow: 1, fontSize: { xs: "1rem", sm: "1.25rem" } }}
              >
                {t.common.appTitle}
              </Typography>
            </Toolbar>
          </AppBar>
        )}
        {/* Spacer for mobile AppBar */}
        {isMobile && <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }} />}

        {/* Page Content */}
        <Box
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            maxWidth: { xs: "100%", lg: 1200 },
            mx: "auto",
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
            handleNavigation("/homepage/profile");
            handleProfileMenuClose();
          }}
        >
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          {t.dashboard.profile}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleNavigation("/homepage/settings");
            handleProfileMenuClose();
          }}
        >
          <ListItemIcon>
            <Group fontSize="small" />
          </ListItemIcon>
          {t.dashboard.academicStaff}
        </MenuItem>
        <Divider />
        <MenuItem onClick={unauthorize}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t.dashboard.logout}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default DashboardLayout;
