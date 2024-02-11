import CreateJournalForm from "../components/CreateJournalForm";
import { Box, Center, VStack, Text, HStack, Button } from "@chakra-ui/react";
import abstract_journal from "../assets/journal-abstract.jpeg";
import { Image } from "@chakra-ui/react";
import MoodForm from "../components/MoodForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuotes } from "../store/quotes.reducer";
import { useState } from "react";
import { randomIndex } from "../components/util";
import { FaRandom } from "react-icons/fa";

const HomePage = ({ isPrivate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quotes = useSelector((state) => state.quotes.quotes);
  const [randomQuote, setRandomQuote] = useState(quotes[randomIndex(quotes)]);

  const chooseRandomQuote = () => {
    setRandomQuote(quotes[randomIndex(quotes)]);
    return;
  }

  useEffect(() => {
    const api = "https://zenquotes.io/api/quotes";
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        dispatch(setQuotes(data));
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };
    if (quotes.length === 0) {
      console.log("fetching quotes");
      fetchData();
    }   
  }, []);

  return (
    <Box position="relative" height="100vh" width="100wh" >
     <Image position="absolute" objectFit="cover"
          src={abstract_journal} alt="abstract journal" width="100%" height="100%" />
      <Center>
        <VStack position='relative' mt="10vh">
        <Box padding='0' position="relative">

        <Box position='relative' padding='50'>
                <Box bg='white' px='10' fontSize={40} borderRadius="md" opacity={0.6} color="new.900"
                maxW="60vw"
                _hover={{opacity:1}}>
                  {quotes && randomQuote && 
                  <VStack>
                    <Text> {randomQuote.q}  </Text>
                    <HStack position="relative" ml={0}> 
                            <Text right="5"> - {randomQuote.a}</Text> 
                            <Button right="0" onClick={chooseRandomQuote}> <FaRandom/></Button> 
                    </HStack>
                  </VStack>}
                  {(!quotes || !randomQuote) && <VStack>
                    <Text>“Your journal will stand as a chronicle of your growth, your hopes, your fears, your dreams, 
                  your ambitions, your sorrows, your serendipities.” </Text>
                  <Text right="5">- Kathleen Adams</Text>
                </VStack>}
                </Box>
        </Box>
        </Box>
        {isPrivate &&<HStack>
            <Box 
              p={4} borderRadius="md"
                _hover={{
                  layerStyle:'cool',
              }}
              boxShadow="lg">
                  <MoodForm />
             </Box>

            <CreateJournalForm/>
            </HStack>}
          {
          !isPrivate && <Button fontSize="20px" color="new.900" onClick={() => {navigate("/login")}} > Log in to access your journals </Button>
          }
        </VStack>

      </Center>
      
    </Box>
  );
};

export default HomePage;