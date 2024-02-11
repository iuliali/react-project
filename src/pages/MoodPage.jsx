import { AbsoluteCenter, Heading, Text} from '@chakra-ui/react';
import MoodGraph from '../components/MoodGraph';
import { useSelector } from 'react-redux'; 
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useDispatch } from 'react-redux';
import { setMoodHistory } from '../store/moodtracker.reducer';
import { query, where } from 'firebase/firestore';
import MoodForm from '../components/MoodForm';

const MoodPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const moodData = useSelector((state) => state.mood.moodHistory);
    const moodCollectionRef = collection(db, 'moods');

    const moodToScore = (mood) => {
        switch (mood) {
            case 'sad':
                return 1;
            case 'neutral':
                return 2;
            case 'happy':
                return 3;
            default:
                return 0;
        }
    };

    useEffect(() => {
        const currentMonth = new Date().getMonth();
        const fetchMoods = async () => {
            console.log("fetching moods");
            const q = query(moodCollectionRef, where('user', '==', user.id));
            const response = await getDocs(q);
            const data = response.docs.map((doc) => (
                {
                    id: doc.id,
                    date: new Date(doc.data().date.seconds * 1000),
                    mood: doc.data().mood,
                    user: doc.data().user
                }
            )).filter((mood) => mood.date.getMonth() === currentMonth);

            console.log(data);
            dispatch(setMoodHistory(data));
        }

        fetchMoods();
        
    }, []);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const monthData = [];

    for (let day = 1; day <= currentDay; day++) {
        const date = new Date(currentDate.getFullYear(), currentMonth, day);
        const mood = moodData.find((mood) => mood.date.getDate() == day);

        monthData.push({
            date: date,
            mood: mood ? moodToScore(mood.mood) : 0
        });
    }

    console.log(monthData);

    return (
        <AbsoluteCenter bgColor={"white"} opacity={0.9} p={30} borderRadius={"md"}>
            <Heading fontSize={30} mb={10} justifyContent={"center"}>Mood Tracker</Heading>
            <Text fontSize={20} >Track your mood over time</Text>
            {moodData.length !== 0 &&<Text fontSize={20} >Here you can see current month moods</Text>}
            {moodData.length !== 0 && <MoodGraph data={monthData} />}
            {moodData.length !== 0 &&<Text fontSize={20} mb={10}>Cheer up! Progress is the key !</Text>}
            <MoodForm />
        </AbsoluteCenter>
    );
};

export default MoodPage;