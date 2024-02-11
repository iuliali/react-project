import React from 'react';
import { Box, HStack, useToken } from '@chakra-ui/react';
import {FC} from 'react';


const ColorPicker: FC <{value: string| undefined, onChange: (value:string) => void}> = ({value, onChange}) => {
    const colors = useToken('colors', ['new.50', 'new.100', 'new.200', 'new.300', 'new.400', 'new.500', 'new.600', 'new.700', 'new.800', 'new.900']);
    const selectedColor = value == null || value.length == 0 ? "" : value;
    return (
        <Box>
            <HStack justifyContent="center">
                {colors.map((color) => (
                    <Box id="color"
                        key={color}
                        w="30px"
                        h="30px"
                        borderRadius="50%"
                        bg={color}
                        onClick={() => onChange(color)}
                        cursor="pointer"
                        border={selectedColor === color ? '1px solid black' : ''}
                    ></Box>
                ))}
            </HStack>
        </Box>
    );
};

export default ColorPicker;