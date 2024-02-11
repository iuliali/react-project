import React, { useEffect, useState } from 'react';
import { Box, Heading, FormControl, 
    FormLabel, Input, Textarea, Button, Select, Text } from '@chakra-ui/react';
import { addDoc, collection, getDocs , query, updateDoc, where, doc} from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { useNavigate } from 'react-router-dom';
import ColorPicker from './ColorPicker';
import { useDispatch, useSelector } from 'react-redux';
import { addPage, setJournals } from '../store/journals.reducer';
import { inverseColor } from '../components/util';
import { updatePage } from '../store/journals.reducer';
import { set } from 'date-fns';

const CreateJournalPage = (props) => {
    const edit = props.edit;
    const page = props.page;
    const journalId = props.journalId;
    const [title, setTitle] = useState(page ? page.title : "");
    const [content, setContent] = useState( page ? page.content : "");
    const [journal, setJournal] = useState(journalId);
    const [error, setError] = useState("");
    const journalsRef = collection(db, 'journals');
    const [color, setColor] = useState( page ? page.color : "");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const journals = useSelector((state) => state.journals.journals ?? []) ;

    const handleChangeJournal = (e) => {
        console.log(e.target.value);
        setJournal(e.target.value);
    }

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
    }

    const validateContent = (content) => {
        if (content === "") {
            setError("Content cannot be empty");
            return false;
        }
        if (content.length > 1000) {
            setError("Content is too long");
            return false;
        } else {
            if (content.length < 50) {
                setError("Content is too short to be a journal entry")
                return false;
            }
        }
        return true;
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        if (validateTitle(e.target.value)) {
            setError("");
        }
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
        if (validateContent(e.target.value)) {
            setError("");
        }
    }


    const handleSubmit = async (e) => {
        console.log('submitting')
        if (validateTitle(title) && validateContent(content)) {
            if (color == "") {
                setError("Please select a color");
                return;
            } else {
                setError("");
            }
        } else {
            return;
        }
            
        console.log(error);
        if (error || !journal || !title || !content || !color) {
            return;
        }

        const id = journal;
        const path = `journals/${id}/pages`;
        const journalPagesRef = collection(db, path);
        const newOrEditedPage = {
            date: new Date(),
            title: title,
            content: content,
            color: color,
            author: {
                name: auth.currentUser.displayName || auth.currentUser.email, 
                id: auth.currentUser.uid
            }};
        console.log(newOrEditedPage);

        if (edit) {
            // Update page
            const pageRef = doc(db, `journals/${journal}/pages/${page.id}`);
            newOrEditedPage.id = page.id;
            try{
                await updateDoc(pageRef, newOrEditedPage);
            } catch (error) {
                console.error('Error updating page:', error);
            }
            dispatch(updatePage({id:journal, page: newOrEditedPage}));
            navigate(-1);
            return;
        }
        const addedPage = await addDoc(journalPagesRef, newOrEditedPage);
        newOrEditedPage.id = addedPage.id;
        dispatch(addPage({id:journal, page: newOrEditedPage}));
        setTitle("");
        setContent("");
        setColor("");
        navigate('/journal/' + journal);
    };

    useEffect(() => {
        const fetchJournals = async () => {
            const q = query(journalsRef, where('author.id', '==', auth.currentUser.uid));
            try {
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                    title: doc.data().title ?? null
                }));
                dispatch(setJournals(data));
            } catch (error) {
                console.error('Error fetching journals:', error);
            }
        };
        if (journals == []) {
            fetchJournals();
        }
    }, []);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" mt={journal==null && "15vh"}>
            <Box bg={color} minW="500px" maxH="80vh"
            color={inverseColor(color)} 
            borderRadius="md" p={journalId == null ? 100 : 4}>
                {!edit && <Heading justifyContent="center"> new journal page </Heading>}
                {edit && <Heading justifyContent="center"> edit journal page </Heading>}
                <br />
                    <FormControl>
                        <FormLabel htmlFor="title"></FormLabel>
                        <Input
                            placeholder='Title of the page...'
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            borderColor={inverseColor(color)} 
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="content"></FormLabel>
                        <Textarea 
                            placeholder='Write your thoughts here...'
                            id="content"
                            value={content}
                            onChange={handleContentChange}
                            borderColor={inverseColor(color)}
                        ></Textarea>
                    </FormControl>
                    <br />
                    
                    <ColorPicker value={color} onChange={setColor}></ColorPicker>
                    
                    <br />
                    { journalId == null && <FormControl>
                    <FormLabel htmlFor="journal"> Journal: </FormLabel>
                    <Select spacing={3} onChange={handleChangeJournal} borderColor={inverseColor(color)} >
                        {journals.map((journal) => (
                            <option
                            value={journal.id} key={journal.id}>{journal.title}</option>
                        ))}
                    </Select>
                    </FormControl>  }
                    <br />
                    {error && <Text align="center" color="red">{error}</Text>}
                    <br />
                    <Box display="flex" justifyContent="center"> 
                        {!edit && <Button onClick={handleSubmit}>Add Journal Page</Button>}
                        {edit && <Button onClick={handleSubmit}>Edit Journal Page</Button>}
                    </Box> 

            </Box>
        </Box>
    );
};

export default CreateJournalPage;
