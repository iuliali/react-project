import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import book from "../assets/PngItem_1365495.png";
import { useNavigate } from "react-router-dom";
const JournalDisplay = (journal) => {
    const navigate = useNavigate();
    const imagePath = book;
    const journalId = journal.journal.id;
    const journalTitle = journal.journal.title;
    const navigateRoute = "/journal/" + journalId;
    const handleClick = () => {
        navigate(navigateRoute);
    }
    return (
        <Box _hover={{
            transform: "scale(1.1)",
            transition: "transform 0.2s",
            cursor: "pointer"
          }}
        width="200px" height="200px"> 
            <Image onClick={handleClick}

            src={imagePath} alt="Journal" width="200px" height="200px" />
            <Text onClick={handleClick}
                pos="relative"  color="white" transform="translate(25%,-500%)">
                {journalTitle}
            </Text>
            <Text></Text>
        </Box>
    );
    };
export default JournalDisplay;