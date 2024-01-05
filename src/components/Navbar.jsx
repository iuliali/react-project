import { Box, Button, HStack} from "@chakra-ui/react";
import { Link, useMatch } from "react-router-dom";
import { auth } from "../lib/firebase";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { useContext } from 'react';
import { ThemeContext } from '../store/Theme.context';
import NavElement  from "./NavElement";

const Navbar = () => {
  const { theme, _ } = useContext(ThemeContext);
  const homeMatch = useMatch("/");
  const counterMatch = useMatch("/counter");
  const themeNav = theme + ".100";
  return (
    <Flex>
    <Box h="100vh" w="10vw" position="fixed">
      <HStack spacing="24px" align="start" p={5}>
        <NavElement to={homeMatch} name="Home" />
        <Box>
          <Button
            colorScheme="red"
            variant="ghost"
            width="100%"
            onClick={() => auth.signOut()}
            _hover={{ bg: "red.600", color: "white" }}
          >
            Logout
          </Button>
        </Box>
      </HStack>
    </Box>
    <Box ml="10vw" w="90vw" mt="10vh">
      <Outlet />  
    </Box>
    </Flex>
  );
};

export default Navbar;