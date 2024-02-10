import { Center, HStack, IconButton } from '@chakra-ui/react';
import { FaSmile, FaMeh, FaFrown } from 'react-icons/fa';
import { FC } from 'react';

const MoodPicker : FC <{value: string| undefined, onChange: (value:string) => void}> = ({value, onChange})=> {
    const moods = ['happy', 'neutral', 'sad'];
    const colors = ['green', 'yellow', "blue" ];
    const getMoodIcon = (mood: string) => {
        switch (mood) {
            case 'happy':
                return <FaSmile/>;
            case 'neutral':
                return <FaMeh/>;
            case 'sad':
                return <FaFrown/>;
            default:
                return <FaSmile/>;
        }
    }
    const selectedValue = value;
    return (
        <Center>
        <HStack >
            {moods.map((mood, index) => (
                <IconButton borderRadius={100}
                    key={mood}
                    value={mood}
                    aria-label={mood}
                    icon={getMoodIcon(mood)}
                    onClick={() => onChange(mood)}
                    colorScheme={selectedValue === mood ? colors[index] : 'gray'}
                ></IconButton>
            ))}
        </HStack>
        </Center>
       
    );
};

export default MoodPicker;