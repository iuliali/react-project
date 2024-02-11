import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box bg="" p={3} textAlign="center" position="absolute" width="100vw" bottom="0">
            <Text fontFamily="Arial" fontSize="14px" color="white" mt={2}>
                &copy; {currentYear} Iulia-Georgana Talpalariu
            </Text>
        </Box>
    );
};

export default Footer;