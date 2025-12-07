import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppBar from "~/components/appbar";
import Footer from "~/components/footer";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <AppBar />
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
