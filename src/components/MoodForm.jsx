import React, { useEffect, useState } from 'react';
import MoodPicker from './MoodPicker';
import { useSelector } from 'react-redux';
import { Box, HStack, FormControl, Button, Heading } from '@chakra-ui/react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useDispatch } from 'react-redux';
import { setMood, updateMood } from '../store/moodtracker.reducer';
import { getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { setMoodHistory } from '../store/moodtracker.reducer';
import { GrCheckmark, GrUpdate } from "react-icons/gr";

const MoodForm = () => {
    const dispatch = useDispatch();
    const moodCurrent = useSelector((state) => state.mood.currentMood);
    const [selectedMood, setSelectedMood] = useState(moodCurrent ? moodCurrent.mood : "");
    const user = useSelector((state) => state.auth.user);
    const moodHistory = useSelector((state) => state.mood.moodHistory);
    const moodCollectionRef = collection(db, 'moods');

    useEffect(() => {
        const fetchMoods = async () => {
            const q = query(moodCollectionRef, where('user', '==', user.id));
            const response = await getDocs(q);
            const data = response.docs.map((doc) => (
                {
                    id: doc.id,
                    date: new Date(doc.data().date.seconds * 1000),
                    mood: doc.data().mood,
                    user: doc.data().user
                }
            ));
            console.log(data);
            dispatch(setMoodHistory(data));
        }
        fetchMoods();    
    }, []);


    const handleSubmit = async (event) => {
        if (!user || !selectedMood) {
            return;
        }
        const date = new Date();
        const mood = {
            mood: selectedMood,
            date: date,
            user: user.id
        };
        console.log(mood);

        if (moodHistory.length > 0) {
            console.log("here");
            const lastMood = moodHistory[moodHistory.length - 1];
            console.log("lastmood");
            console.log(lastMood);
            if (lastMood.date.toDateString() === date.toDateString()) {
                console.log("updating");
                const moodRef = doc(db, 'moods', lastMood.id);
                await updateDoc(moodRef, {
                    mood: selectedMood,
                    date: date
                });
                mood.id = lastMood.id;
                dispatch(updateMood(mood));
                return;
            }
    }
        const newMood = await addDoc(moodCollectionRef, mood);
        mood.id = newMood.id;
        dispatch(setMood(mood));
    };

    return (
        <Box justifyContent={"center"}>
                <Heading>How do you feel today ? </Heading>
                <HStack p={15}>
                    <FormControl>
                        <MoodPicker value={selectedMood} onChange={setSelectedMood} />
                    </FormControl>

                    <Button type="submit" onClick={handleSubmit} borderRadius={50}>
                        {!moodCurrent && <GrCheckmark />}
                        {moodCurrent && <GrUpdate />}
                    </Button>
                </HStack>
        </Box>
    );
};

export default MoodForm;