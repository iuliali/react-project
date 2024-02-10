import { Box } from "@chakra-ui/react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import "../index.css";

const Layout = ({ children }) => {
  return (
    <Box layerStyle={'cool'} position="relative" height ="100%" minW="100vw" minH="100vh">
      <Outlet />
      <Header />
    </Box>
  );
};

export default Layout;