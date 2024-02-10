import { Box, Heading } from "@chakra-ui/react";
import { FaSadTear } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <Box textAlign="center" mt={10}>
      <Heading as="h1" size="xl" color="red.500">
        Page not found! <FaSadTear />
      </Heading>
    </Box>
  );
};

export default PageNotFound;
