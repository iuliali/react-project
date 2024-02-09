import React, { useEffect, useState } from 'react';
import { Box, Heading, FormControl, 
    FormLabel, Input, Textarea, Button, Select } from '@chakra-ui/react';
import { addDoc, collection, getDocs, getDoc , query, where} from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { useNavigate } from 'react-router-dom';
import ColorPicker from './ColorPicker';
import { useDispatch, useSelector } from 'react-redux';
import { addPage, setJournals } from '../store/journals.reducer';
import { inverseColor } from '../components/util';

const CreateJournalPage = (props) => {
    const journalId = props.journalId;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [journal, setJournal] = useState(journalId);
    const journalsRef = collection(db, 'journals');
    const [color, setColor] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const journals = useSelector((state) => state.journals.journals ?? []) ;
    
    const handleChangeJournal = (e) => {
        console.log(e.target.value);
        setJournal(e.target.value);
    }
    const handleSubmit = async (e) => {
        console.log('submitting')

        if (!title || !content || !color || !journal) {
            return;
        }
        const id = journal;
        const path = `journals/${id}/pages`;
        const journalPagesRef = collection(db, path);
        const page = {
            date: new Date(),
            title: title,
            content: content,
            color: color,
            author: {
                name: auth.currentUser.displayName || auth.currentUser.email, 
                id: auth.currentUser.uid
            }};

        const {id:newPage} = await addDoc(journalPagesRef, page);
       
        dispatch(addPage({id:journal, page: page}));
        console.log(newPage);

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
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Box bg={color} 
            color={inverseColor(color)} 
            borderRadius="md" p={4}>
                <Heading justifyContent="center"> new journal page </Heading>
                <br />
                    <FormControl>
                        <FormLabel htmlFor="title"></FormLabel>
                        <Input
                            placeholder='Title of the page...'
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            borderColor={inverseColor(color)} 
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="content"></FormLabel>
                        <Textarea 
                            placeholder='Write your thoughts here...'
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
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
                    <Box display="flex" justifyContent="center"> 
                        <Button onClick={handleSubmit}>Add Journal Page</Button>
                    </Box> 

            </Box>
        </Box>
    );
};

export default CreateJournalPage;
