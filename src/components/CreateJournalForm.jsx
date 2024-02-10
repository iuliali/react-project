import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Box,
    Text,
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
import { set } from 'date-fns';

const CreateJournalForm = () => {
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const collectionRef = collection(db, "journals");
    const dispatch = useDispatch();

    const validateTitle = (title) => {
        if (title.length > 50) {
            setError("Title is too long");
            return false;
        } else {
            if (title.length < 5) {
                setError("Title is too short");
                return false;
            }
        }
        return true;
    };
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        if (validateTitle(title)) {
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        if (!validateTitle(title)) {
            setError("Title is invalid");
            return;
        } else {
            setError("");
        }
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
            content: "Welcome to your journal!\n" +
            "Writing in a daily journal is important but the reason why I journal is because I can read my own writing after many months have passed by. I\'m able to reflect on my life, my actions, my behaviors, my memories and also the behavior of others around me.— Nando Prudhomme",
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
        <Box maxWidth="400px" margin="0 auto" textAlign="center" p={4} borderRadius="md" boxShadow="lg"
        _hover={{layerStyle : 'cool'}}>
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
            {error && <Text color="red">{error}</Text>}
            <Button type="submit" onClick={handleSubmit} mt={4} colorScheme="teal">
                Add Journal
            </Button>
        </Box>
    );
};

export default CreateJournalForm;
