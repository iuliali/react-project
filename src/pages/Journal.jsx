import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../lib/firebase";
import { getDoc, getDocs, doc, collection } from "firebase/firestore";
import JournalPage from "../components/JournalPage";
import { Box, GridItem, Divider , Grid, AbsoluteCenter, Spacer} from '@chakra-ui/react';
import CreateJournalPage from "../components/CreateJournalPageForm";
import { useSelector, useDispatch } from "react-redux";
import {addJournal, setPages} from "../store/journals.reducer";

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
                        date: doc.data().date
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
                <AbsoluteCenter bg='white' px='10' fontSize={40}>
                    {journal.title}
                </AbsoluteCenter>

             </Box>
             <Spacer />

        <Grid templateColumns='repeat(2, 1fr)' gap={100}>
            {pages.map((page) => (
                <GridItem w='100%' h='100%' bg='' key={page.id} >
                    <JournalPage page={page}>    </JournalPage>
                </GridItem>
            ))
            }
        </Grid>
        <Divider />

        <CreateJournalPage journalId={journalId} /> 
        </Box>


    );
};
export default Journal;