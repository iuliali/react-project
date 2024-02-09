import React from 'react';
import { Box, HStack } from '@chakra-ui/react';
import {FC} from 'react';
import {FaBeer} from 'react-icons/fa';

const IconPicker: FC <{value: any| undefined, onChange: (value:any) => void}> = ({value, onChange}) => {
    const icons = [FaBeer];
    const selectedIcon = value ?? icons[0];
    return (
        <Box>
            <HStack>
                {icons.map((icon) => (
                    <Box id="icon"
                        w="30px"
                        h="30px"
                        borderRadius="50%"
                        onClick={() => onChange(icon)}
                        cursor="pointer"
                        border={selectedIcon === icon ? '2px solid white' : ''}
                    ></Box>
                ))}
            </HStack>
        </Box>
    );
};

export default IconPicker;