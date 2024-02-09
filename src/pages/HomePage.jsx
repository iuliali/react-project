import CreateJournalForm from "../components/CreateJournalForm";
import { Box, Center, VStack, Text, Spacer, Divider, AbsoluteCenter } from "@chakra-ui/react";
import abstract_journal from "../assets/journal-abstract.jpeg";
import { Image } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Box position="relative" height="100vh" width="100wh">
     <Image position="absolute" objectFit="cover"
          src={abstract_journal} alt="abstract journal" width="100%" height="100%" />
      <Center>
        <VStack position='relative'>

        <Box padding='100' position="relative">
                <Divider />
                <AbsoluteCenter bg='white' px='10' fontSize={20}>
                  <Text>welcome to your mental health journal</Text>
                </AbsoluteCenter>

        </Box>
             <Spacer />

            <CreateJournalForm />
        </VStack>

      </Center>
      
    </Box>
  );
};

export default HomePage;