import { Box, Button, HStack} from "@chakra-ui/react";
import { auth } from "../lib/firebase";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import NavElement  from "./NavElement";

const Navbar = () => {
  return (
    <Flex>
    <Box ml="0vw" w="100vw" mt="0vh" >
      <Outlet />  
    </Box>
    <Box h="100vh" w="10vw" position="fixed">
      <HStack spacing="24px" align="start" p={5}>
        <NavElement to="/" name="Home" />
        <NavElement to="/journals" name="Journals" />
        <NavElement to="/create-journal-page" name="Add page" />
        <NavElement to="/mood-tracker" name="Mood Tracker" />
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
    </Flex>
  );
};

export default Navbar;