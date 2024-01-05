// HomePage.jsx
import { Box, Center, VStack, Text } from "@chakra-ui/react";
import Header from "../components/Header";

const HomePage = () => {
  return (
    <Box position="relative">
      <Center>
        <VStack>
          <Text>welcome to your mental health journal</Text>
        </VStack>
      </Center>
    </Box>
  );
};

export default HomePage;