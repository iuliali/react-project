import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { getDoc, getDocs, doc, collection } from "firebase/firestore";
import { Box, GridItem, Divider , Grid, AbsoluteCenter, Spacer, Center} from '@chakra-ui/react';
import CreateJournalPage from "../components/CreateJournalPageForm";
import { useSelector, useDispatch } from "react-redux";
import {addJournal, setPages} from "../store/journals.reducer";
import JournalPageDisplay from "../components/JournalPageDisplay";

const Journal = () => {
    const params = useParams();
    const journalId = params.id;
    const path = `journals/${journalId}/pages`;
    const journalPagesRef = collection(db, path);
    const journal = useSelector((state) => state.journals.journals.find((journal) => journal.id === journalId) ?? {}) ;
    var pages = useSelector((state) => state.journals.pages[journalId] ?? []);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchJournal = async () => {
            try {
                const docRef = doc(db, "journals", journalId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    dispatch(addJournal(data));
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching journal:", error);
            }
        };
        if (journal == {}) {
            fetchJournal();
        }
    }, []);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const response = await getDocs(journalPagesRef);
                const data = response.docs.map((doc) => (
                    {
                        id: doc.id,
                        author: doc.data().author,
                        title: doc.data().title,
                        content: doc.data().content,
                        color: doc.data().color,
                        date: new Date(doc.data().date.seconds * 1000)
                    }
                ));
                
            dispatch(setPages({id: journalId, pages: data}));
        
            } catch (error) {
                console.error("Error fetching journal:", error);
            }
        };
        if (pages.length === 0) {
            fetchPages();
        }
        
    }, []);

    return (
        <Box ml="10vw" mr="10vw">
            <Box position='relative' padding='100'>
                <Divider />
                <AbsoluteCenter bg='white' px='10' fontSize={40} borderRadius="md">
                    {journal.title}
                </AbsoluteCenter>

             </Box>

        {/* <Center p={10}>
            <CreateJournalPage journalId={journalId} /> 
        </Center>

        <Spacer /> */}

        <Grid templateColumns='repeat(2, 1fr)' gap={100}>
            <GridItem w='100%' h='100%' height='400px' minW="500px" >
                <Box >
                    <CreateJournalPage journalId={journalId} /> 
                </Box>
            </GridItem>
            {pages.map((page) => (
                <GridItem w='100%' h='100%' bg='' key={page.id} height="400px" minW="500px" >
                <Box> 
                    <JournalPageDisplay page={page} journalId={journalId} inJournal={true}>    </JournalPageDisplay>
                </Box>
                </GridItem>
            ))
            }
             
        </Grid>
        <br />
        <Divider />
        </Box>

    );
};
export default Journal;