import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import {inverseColor} from "../components/util";

const JournalPage = (page) => {
    page = page.page;
    
    return (
        <Box
            sx={{
                backgroundColor: page.color,
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                color: inverseColor(page.color)
            }}
        >
            <Heading>{page.title}</Heading>
            <Text>{page.content}</Text>
        </Box>
    );
};
export default JournalPage;