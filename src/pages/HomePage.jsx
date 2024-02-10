import CreateJournalForm from "../components/CreateJournalForm";
import { Box, Center, VStack, Text, Spacer, Heading, Divider, AbsoluteCenter, HStack} from "@chakra-ui/react";
import abstract_journal from "../assets/journal-abstract.jpeg";
import { Image } from "@chakra-ui/react";
import MoodForm from "../components/MoodForm";

const HomePage = () => {
  return (
    <Box position="relative" height="100vh" width="100wh" >
     <Image position="absolute" objectFit="cover"
          src={abstract_journal} alt="abstract journal" width="100%" height="100%" />
      <Center>
        <VStack position='relative' mt="10vh">
        <Box padding='0' position="relative">

        <Box position='relative' padding='50'>
                <Center bg='white' px='10' fontSize={40} borderRadius="md" opacity={0.6}
                _hover={{opacity:1}}>
                  <VStack>
                  <Text>“Your journal will stand as a chronicle of your growth, your hopes, your fears, your dreams, 
                  your ambitions, your sorrows, your serendipities.” </Text>
                  <Text right="5">- Kathleen Adams</Text>
                </VStack>
                </Center>
        </Box>
        </Box>
        <HStack>
            <Box 
              p={4} borderRadius="md"
                _hover={{
                  layerStyle:'cool',
              }}
              boxShadow="lg">
                  <MoodForm />
             </Box>

            <CreateJournalForm/>
            </HStack>
        </VStack>

      </Center>
      
    </Box>
  );
};

export default HomePage;