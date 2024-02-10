import React from "react";
import { Box, Button, HStack, Heading, Text, VStack, Spacer, Flex, Divider} from "@chakra-ui/react";
import { inverseColor } from "./util";
import { useNavigate } from "react-router-dom";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useDispatch } from "react-redux";
import { deletePage } from "../store/journals.reducer";

const JournalPageDisplay = (props) => {
    const page = props.page;
    const journalId = props.journalId;
    const inJournal = props.inJournal;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const limitContentHeight = (content) => {
        if (content.length > 700) {
            return content.slice(0, 700) + "...";
        }
        return content;
    };

    const handleClick = (pageId) => {
        if (!journalId) {
            return;
        }
        navigate('/journal/' + journalId + '/page/' + pageId)
    }
    const editPage = () => {
        navigate('/journal/' + journalId + '/page/' + page.id + '/edit');
    }

    const deletePageFirebase = async () => {
        try {
            const pageIdDeleted = page.id;
            await deleteDoc(doc(db, `journals/${journalId}/pages/${pageIdDeleted}`));

            console.log("Deleted page:", pageIdDeleted);
            dispatch(deletePage({id:journalId, pageId: pageIdDeleted}));

        } catch (error) {
            console.error("Error deleting page:", error);
        }
        navigate("/journal/" + journalId);
    }

    return (
        <Box display="flex" flexDirection="column" justifyContent="space-between"
            minH="400px"
            sx={{
                backgroundColor: page.color,
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                color: inverseColor(page.color),
            }}
        >
            <Box>
                <Heading >{page.title}</Heading>
                <Text>{inJournal && limitContentHeight(page.content)}</Text>
                <Text>{!inJournal && page.content }</Text>
            </Box>
            <Spacer/>
            <Divider/>
            <Flex bottom = "0" fontSize="15px">
                <VStack mb={0}>
                    <Text> {page.date.toLocaleString()} </Text>
                    <Text>by {page.author.name}</Text>
                </VStack>
            <Spacer/>
            <HStack  mb={0} right="0">
                {inJournal && <Button onClick={() => handleClick(page.id)} _hover={{bgColor:"new.100"}} > View</Button>}
                <Button onClick={editPage} position="relative" _hover={{bgColor:"yellow.100"}}><EditIcon/></Button>
                <Button onClick={deletePageFirebase} position="relative" _hover={{bgColor:"red"}}><DeleteIcon/></Button>
            </HStack>
            </Flex>
        </Box>
    );
};
export default JournalPageDisplay;