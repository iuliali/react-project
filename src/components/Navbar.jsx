import { Box, Button, HStack} from "@chakra-ui/react";
import { auth } from "../lib/firebase";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import NavElement  from "./NavElement";

const Navbar = () => {
  return (
    <Flex>
    <Box h="100vh" w="10vw" position="fixed">
      <HStack spacing="24px" align="start" p={5}>
        <NavElement to="/" name="Home" />
        <NavElement to="/journals" name="Journals" />
        <NavElement to="/create-journal-page" name="Add page" />
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
    <Box ml="0vw" w="100vw" mt="10vh" >
      <Outlet />  
    </Box>
    </Flex>
  );
};

export default Navbar;