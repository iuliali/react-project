import React, { useEffect } from 'react';
import { db } from '../lib/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { Box, GridItem, Divider , Grid, AbsoluteCenter, Spacer} from '@chakra-ui/react';
import JournalDisplay from '../components/JournalDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { setJournals } from '../store/journals.reducer';
import CreateJournalForm from '../components/CreateJournalForm';

const Journals = () => {
    const journals = useSelector((state) => state.journals.journals) ?? [];
    const collectionRef = collection(db, 'journals');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const q = query(collectionRef, where('author.id', '==', user.id));
                const response = await getDocs(q);
                const data = response.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                    author: doc.data().author.name ?? null,
                }));
                dispatch(setJournals(data));
                
            } catch (error) {
                console.error('Error fetching journals:', error);
            }
        };
        if (journals.length === 0) {
            fetchJournals();
        }
    }, []);

    return (
        <Box  ml="10vw" mr="10vw">
            <Box position='relative' padding='100'>
                <Divider />
                <AbsoluteCenter bg='white' px='10' fontSize={40} borderRadius={"md"}>
                    My Journals
                </AbsoluteCenter>
             </Box>
             <Spacer />

    
        <Grid templateColumns='repeat(4, 1fr)' gap={100}>
            {journals.map((journal) => (
                <GridItem w='100%' h='100%' bg='' >
                    <JournalDisplay journal = {journal}>    </JournalDisplay>
                    <Spacer />

                </GridItem>

            ))
            }
        </Grid> 
        <Spacer />

        <Divider />
        <Spacer />

        <CreateJournalForm />
    
    </Box>
    );
};

export default Journals;
