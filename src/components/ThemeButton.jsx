import { useContext } from 'react';
import { ThemeContext } from '../store/Theme.context';
import { Box, Image } from "@chakra-ui/react";
import palette from "../assets/paint-palette.svg";

const ThemeButton = () => {
  const { theme, switchTheme } = useContext(ThemeContext);
  const imagePath = palette;

  return (
    <Box as="button" onClick={switchTheme}>
      <Image src={imagePath} alt="Theme switch button" width="30px" height="30px" />
    </Box>
  );
};

export default ThemeButton;