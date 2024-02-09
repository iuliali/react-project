import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
} from '@chakra-ui/react';
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { useDispatch} from 'react-redux';
import { addJournal } from '../store/journals.reducer';

const CreateJournalForm = () => {
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const collectionRef = collection(db, "journals");
    const dispatch = useDispatch();
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        const newJournal = {
            date: new Date(),
            title: title,
            author: {
                name: auth.currentUser.displayName || auth.currentUser.email, 
                id: auth.currentUser.uid
            },
            private: true
        };
        const journal = await addDoc(collectionRef, 
            newJournal
            );
        const subCollectionRef = collection(db, "journals", journal.id, "pages");
        const newPage ={
            date: new Date(),
            title: "First Page",
            content: "Welcome to your journal!",
            color: "green",
            author: {
                name: auth.currentUser.displayName || auth.currentUser.email, 
                id: auth.currentUser.uid
            },
        };
        const page = await addDoc(subCollectionRef, newPage);
        newJournal.id = journal.id;
        dispatch(addJournal(newJournal));
        navigate('/journal/' + journal.id);
    };

    return (
        <Box maxWidth="400px" margin="0 auto" textAlign="center" bg="white" p={4} borderRadius="md">
            <Heading as="h2" size="lg" mb={4}> Create a new journal</Heading>
            <FormControl>
                <FormLabel htmlFor="title">Title:</FormLabel>
                <Input
                    type="text"
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                />
            </FormControl>
            <Button type="submit" onClick={handleSubmit} mt={4} colorScheme="teal">
                Add Journal
            </Button>
        </Box>
    );
};

export default CreateJournalForm;
