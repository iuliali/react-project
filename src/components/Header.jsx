import { Box, Heading, useColorMode } from "@chakra-ui/react";
import ThemeButton from "./ThemeButton";

const Header = () => {

  return (
    <Box position="absolute" top="1" right="1">
      <ThemeButton/>
    </Box>
  );
};

export default Header;