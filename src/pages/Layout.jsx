import { Box } from "@chakra-ui/react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import "../index.css";

const Layout = ({ children }) => {
  return (
    <Box layerStyle={'cool'} position="relative" minH ="100vh" minW="100vw" >
      <Header />
      <Outlet />
    </Box>
  );
};

export default Layout;