import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppBar from "~/components/appbar";

const Layout = () => {
  return (
    <Box>
      <AppBar />
      <Outlet />
    </Box>
  );
};

export default Layout;
